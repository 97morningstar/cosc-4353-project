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

//Drawer
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import Image from '../components/elements/Image';
import LogoImg from './NextFlood.png';

import {
  useHistory,
} from 'react-router-dom';

// Firebase Code
import { AuthContext } from '../context/AuthContext';

// @ts-ignore
import mapboxgl from "mapbox-gl";
import axios from "axios";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// Drawer
const drawerWidth = 440;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

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

  const handleLogOut = () => {
    logout()
      .then(res => {
        localStorage.clear();
        history.push('/')
      })
      .catch(err => {

      });
  }

  // Handle drawer
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [alerts, setAlert] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    let url = "https://api.weather.gov/alerts?point=" + viewport.latitude + "," + viewport.longitude

    console.log(url)
    axios.get(url)
      .then(res => {

        setAlert(res.data.features)
        console.log(res.data.features)
      })
      .catch(err => {

      })
  }, [viewport])


  return (
    <>
      <div style={{ position: 'relative', height: "100vh", display: "flex", justifyContent: "center" }}>



        <AppBar

          position="fixed" style={{
            background: "#21317e",
            display: "flex",
            width: "100%",
            height: '60px'
          }}>

          <Toolbar>
            <Grid item xs={1}>
              <Link href="/" style={{ color: '#fff' }}>
              <Image
         
            src={LogoImg}
            alt="Open"
            width={82}
            height={82} />
          
              </Link>
            </Grid>
            <Grid ref={geocoderContainerRef} item xs={8} justifyContent="flex-end" style={{ marginRight: '20px' }}>

            </Grid>

            {currentUser ? (
              <>
                <Grid item xs={2} style={{ textAlign: 'end' }}>
                  Hello {currentUser.firstName}!
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'end' }}>
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

        <Button style={{
          position: "absolute",
          left: "5em",
          bottom: "2em",

        }} onClick={handleDrawerOpen} variant="contained" endIcon={<AnnouncementIcon />}>
          Open Alerts
        </Button>





        <Drawer
          sx={{
            zIndex: '0',
            position: 'absolute',

            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: '3em !important',

            },

          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader>
            <AnnouncementIcon />
            <Typography component="h1" variant="h6" sx={{ fontSize: '20px',margin: '10px', color:"#000000"}}  >
              Weather Alerts for this location
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {alerts && alerts.length > 0 ? (
            alerts.map(item => {

              return <>
                <Grid container spacing={2} sx={{ whiteSpace: 'pre-wrap', padding: '10px', fontSize: '15px' }}>
                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}> {item.properties.headline} </Grid>

                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Event:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.event}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Certainty:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.certainty}
                    </Typography>
                  </Grid>


                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Effective Date:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.effective}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Expiration Date:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.expires}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Response:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.response}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Severity:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.severity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Status:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Urgency:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.urgency}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      Issuing Institution:
                    </Typography>
                    <Typography variant="span" sx={{ marginLeft: '5px' }}>
                      {item.properties.senderName}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="span" >
                      {item.properties.description}
                    </Typography>
                  </Grid>


                </Grid>
                <Divider />
              </>
            })

          ) : (
            <Typography variant="caption" sx={{ margin: '10px' }} >
              There are no current weather alerts issued by weather.gov
            </Typography>
          )}



        </Drawer>
      </div>
    </>
  );
}

export default FloodMap;