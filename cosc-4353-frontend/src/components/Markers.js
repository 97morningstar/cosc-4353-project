import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";

import { Marker } from "react-map-gl";
import alertmarker from '../assets/alert-icon-1559-min.png';

import ViewMarker from '../dialog/ViewMarker';
import PostMarker from '../dialog/PostMarker';
import AuthProvider, { AuthContext } from '../context/AuthContext';
import { MarkChatReadSharp } from "@mui/icons-material";


const Markers = (props) => {

  const { currentUser, allMarkers, setAllMarkers } = React.useContext(AuthContext);

  const { setMarker, marker, openPostMarker, setOpenPostMarker } = props;

  //Place Markers


  const [markers, setMarkers] = useState([]); // Give all markers

  const [ownMarkers, setOwnMarkers] = useState([]); // Give own markers

  const [openViewMarker, setViewMarker] = useState(false);
  const [information, setInformation] = useState({});

  const handleOpenViewMarker = (datum) => {
    setViewMarker(true);
    setInformation(datum);
 
  }

  const handleCloseViewMarker = () => {
    setViewMarker(false);
  }

  useEffect(() => {
    if(currentUser){
      setOwnMarkers(currentUser.markers);

     // setAllMarkers(allMarkers);
    
    }
    else{
      console.log('No user')
    }
  })

  useEffect(() => {
    console.log("Component has updated");
}, [markers]);

  return (
    <>
      <PostMarker
        marker={marker}
        setMarker={setMarker}
        setAllMarkers={setAllMarkers}
        setOwnMarkers={setOwnMarkers}
        openPostMarker={openPostMarker}
        setOpenPostMarker={setOpenPostMarker}
      />

      <ViewMarker
        handleCloseViewMarker={handleCloseViewMarker}
        openViewMarker={openViewMarker}
        information={information} />

      {allMarkers.map(datum => (
        <Marker key={datum.id} longitude={datum.longitude} latitude={datum.latitude} >
          <div className={"marker-container " + datum.severity} >
            <img width="25px" src={alertmarker} onClick={() => handleOpenViewMarker(datum)} />
          </div>
        </Marker>
      ))}
    </>
  )

}

export default Markers;