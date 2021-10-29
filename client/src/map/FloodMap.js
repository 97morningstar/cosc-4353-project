import "mapbox-gl/dist/mapbox-gl.css";
import '../react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Markers from '../components/Markers';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import {
  useHistory,
} from 'react-router-dom';

// Firebase Code
import { AuthContext } from '../context/AuthContext';

// @ts-ignore
import mapboxgl from "mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGlvbmVlci1tZSIsImEiOiJja2Q0djI3eDExbDduMnhtdHdxY3BsNXZjIn0.Y6TcDT4HSICrjdzeQxRLoA";

const FloodMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 29.7589382,
    longitude: -95.3676974,
    zoom: 8
  });
  const [marker, setMarker] = useState({});
  const [openPostMarker, setOpenPostMarker] = useState(false);

  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const { currentUser, logout } = React.useContext(AuthContext);
  const history = useHistory();

  // Locate User
  const geolocateStyle = {
    bottom: 20,
    right: 20,
    margin: 10
  };
  const positionOptions = { enableHighAccuracy: true };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  // Handle Click on map
  const handleClickOnMap = ({ lngLat: [longitude, latitude] }) => {

    if (currentUser) {
      setMarker({ longitude, latitude })
      setOpenPostMarker(true);
    } else {
      console.log('No logged in user');
    }
  }

  useEffect(() => {

  }, [])

  const handleLogOut = () => {
    logout()
      .then(res => {
        localStorage.clear();
        history.push('/')
      })
      .catch(err => {

      });
  }

  return (
    <>
      <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
        <div
          style={{ position: "absolute", top: '80px', width: "90%", zIndex: 1 }}
        />


        <AppBar

          position="fixed" style={{
            background: "rgba(25,118,210,1)",
            display: "flex",
            width: "100%",
          }}>

          <Toolbar>
            <Grid item xs={1}>
              <Link href="/" style={{ color: '#fff' }}>
                NextFlood
              </Link>
            </Grid>
            <Grid ref={geocoderContainerRef} item xs={8} justifyContent="flex-end" style={{ marginRight: '20px' }}>

            </Grid>
            {currentUser ? (
              <>
                <Grid item xs={1} style={{ textAlign: 'end' }}>
                  Hello {currentUser.firstName}!
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'end' }}>
                  <Button
                    size="small"
                    color="inherit"
                    onClick={handleLogOut}
                  >
                    <ExitToAppIcon style={{ margin: '10px' }} />
                    LOG OUT
                  </Button>
                </Grid>
              </>

            ) : (
              <>
                <Grid item xs={1} style={{ textAlign: 'end' }}>
                  <Button
                    size="small"
                    color="inherit"
                    href="/login"
                  >
                    <AccountCircleIcon style={{ margin: '10px' }} />
                    Login
                  </Button>
                </Grid>

                <Grid item xs={1} style={{ textAlign: 'end' }}>
                  <Button
                    size="small"
                    color="inherit"

                    href="/signup"
                  >
                    <ExitToAppIcon style={{ margin: '10px' }} />
                    Sign Up
                  </Button>
                </Grid>
              </>
            )
            }
          </Toolbar>
        </AppBar>



        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onClick={handleClickOnMap}
          asyncRender={true}
          minZoom={8}
          maxZoom={15}
          maxPitch={65}>

          {<Markers
            marker={marker}
            setMarker={setMarker}
            openPostMarker={openPostMarker}
            setOpenPostMarker={setOpenPostMarker} />}



          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />


          <GeolocateControl
            style={geolocateStyle}
            positionOptions={positionOptions}
            trackUserLocation
          />

        </MapGL>
      </div>
    </>
  );
}

export default FloodMap;