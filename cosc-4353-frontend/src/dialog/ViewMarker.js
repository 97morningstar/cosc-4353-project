import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import BootstrapDialog, { BootstrapDialogTitle } from './BootstrapDialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ViewMarker = (props) => {
    const {handleCloseViewMarker, openViewMarker, information} = props

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
            ) : ( <>
                No description provided for this event.
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


        </DialogContent>
      </BootstrapDialog>


)
}

export default ViewMarker;