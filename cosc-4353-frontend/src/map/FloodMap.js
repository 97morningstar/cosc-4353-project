import "mapbox-gl/dist/mapbox-gl.css";
import '../react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Markers from '../components/Markers';


import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";


// Firebase Code
import { AuthContext } from '../context/AuthContext';

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
  const { currentUser } = React.useContext(AuthContext);


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
    setMarker({ longitude, latitude })

    setOpenPostMarker(true);
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
        <div
          ref={geocoderContainerRef}
          style={{ position: "absolute", top: 20, width: "90%", zIndex: 1 }}
        />

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