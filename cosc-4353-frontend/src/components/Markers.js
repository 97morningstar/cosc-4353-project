import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";

import { Marker } from "react-map-gl";
import alertmarker from '../assets/alert-icon-1559-min.png';

import ViewMarker from '../dialog/ViewMarker';
import PostMarker from '../dialog/PostMarker';

const Markers = (props) => {

  const { setMarker, marker, openPostMarker, setOpenPostMarker } = props;

  //Place Markers
  const [markers, setMarkers] = useState([]);
  const [openViewMarker, setViewMarker] = useState(false);
  const [information, setInformation] = useState({});

  const handleOpenViewMarker = (datum) => {
    setViewMarker(true);
    setInformation(datum);
    console.log(datum)
  }

  const handleCloseViewMarker = () => {
    setViewMarker(false);
  }

  return (
    <>
      <PostMarker
        marker={marker}
        setMarker={setMarker}
        setMarkers={setMarkers}
        openPostMarker={openPostMarker}
        setOpenPostMarker={setOpenPostMarker}
      />

      <ViewMarker
        handleCloseViewMarker={handleCloseViewMarker}
        openViewMarker={openViewMarker}
        information={information} />

      {markers.map(datum => (
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