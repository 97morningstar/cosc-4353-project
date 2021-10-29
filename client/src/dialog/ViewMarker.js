import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import BootstrapDialog, { BootstrapDialogTitle } from './BootstrapDialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import AuthProvider, { AuthContext } from '../context/AuthContext';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewMarker = (props) => {

  const { currentUser } = React.useContext(AuthContext);
  const { handleCloseViewMarker, openViewMarker, information } = props

  let today = new Date().toLocaleDateString().slice(0, 10)

  return (
    <BootstrapDialog
      onClose={handleCloseViewMarker}
      aria-labelledby="customized-dialog-title"
      open={openViewMarker}
      TransitionComponent={Transition}

    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseViewMarker}>
        <Typography id="transition-modal-title" >
          Marker Details
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers >
        <br />
        <br />
        <Typography id="transition-modal-title" variant="h6" component="h6">
          Description:
        </Typography>
        <Typography id="transition-modal-title" variant="p" component="p">
          {information.description ? (
            <>
              {` ${information.description}`}
            </>
          ) : (<>
            No description provided for this event.
          </>
          )
          }
        </Typography>
        <br />
        <Typography id="transition-modal-title" variant="h6" component="h6">
          Created On:
        </Typography>
        <Typography id="transition-modal-title" variant="body2" >

          {information.created_on ? (
            <>
              {` ${information.created_on}`}
            </>
          ) : (
            <>
              {`${today}`}
            </>
          )
          }
        </Typography>
        <br />

        <Typography id="transition-modal-title" variant="h6" component="h6">
          Level of Severity:
        </Typography>
        <Typography className={"typography" + information.severity} id="transition-modal-title" variant="h6" component="h6">

          {information && (
            <>
              {` ${information.severity}`}
            </>
          )
          }
        </Typography>
          <br/>
        <Typography id="transition-modal-title" variant="caption" >
          {currentUser && information.user_id == currentUser.uid ? (
            <>
            This marker was posted by you
            </>
          ) : (
            <>
            This marker was posted by one of the members of our community
            </>
          )

            }
        </Typography>

      </DialogContent>
    </BootstrapDialog>


  )
}

export default ViewMarker;