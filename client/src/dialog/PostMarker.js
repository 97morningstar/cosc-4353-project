import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import BootstrapDialog, { BootstrapDialogTitle } from './BootstrapDialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// Success/Error Alerts 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../context/AuthContext';

import { db } from '../firebase/firebase'
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import AWS from 'aws-sdk'
//import S3FileUpload from 'react-s3'

import socketIOClient from "socket.io-client";
import socketClient from "socket.io-client";
import { io } from 'socket.io-client'

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const PostMarker = (props) => {
    const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME,
    const REGION = 'us-east-2'
    const urlPath = 'https://floodimagebucket.s3.us-east-2.amazonaws.com/'

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    })

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION
    })

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const [imageUrl, setImageUrl] = useState(null)


    const uploadFile = (file) => {
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };
        setImageUrl({
            imageUrl: urlPath+params.Key
        })
        console.log(params.Key)
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
        //imageUrl = ("https://floodimagebucket.s3.us-east-2.amazonaws.com/" + params.Key)
        //console.log(imageUrl)
    }
    const { currentUser } = React.useContext(AuthContext);
    const { marker, setMarker, setAllMarkers, openPostMarker, setOpenPostMarker, setOwnMarkers } = props;

    // Success/Error
    const [successSave, setSuccess] = useState(false);
    const [errorSave, setError] = useState();

    const [thing, setThing] = useState('');


    const handleClosePostMarker = () => {
        setOpenPostMarker(false);
    }

    const handleMarkerChange = (e) => {
        setMarker({
            ...marker,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSave = () => {

        if (currentUser) {

            if (marker.severity) {


                let severityArray = ['none', 'low', 'moderate', 'major', 'critical'];

                // console.log(severityArray.indexOf(marker.severity.toString()))

                const data = {
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    user_id: currentUser.uid,
                    description: marker.description ? marker.description : "",
                    severity: severityArray.indexOf(marker.severity.toString()),
                    image: imageUrl ? imageUrl : "" 
                }

                axios.post("http://localhost:4000/api/create_point", data)
                    .then((res) => {
                        //console.log(res);
                        //console.log(marker);

                        setOwnMarkers(markers => [...markers, marker])
                        setAllMarkers(markers => [...markers, marker]);
                        setOpenPostMarker(false);
                        setSuccess(true);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                // Update markers array in firestore
                /*  const markerRef = doc(db, 'users', currentUser.userid);
   
                   updateDoc(markerRef,
                       {
                           markers: arrayUnion(data)
                       }
                   ).then(res => {
                       setOwnMarkers(markers => [...   markers, marker])
                      // setMarkers(markers => [...markers, marker]); // success
   
                      setAllMarkers(markers => markers.concat(marker));
   
                       setOpenPostMarker(false);
                       setSuccess(true);
                   })
                       .catch(err => {
                           console.log(err)
                       })*/




                // axios.post('url', data).









            } else {
                // error
                setError(true);
            }
        } else {
            console.log("No account")
        }
    }


    const handleCloseSuccess = () => {
        setSuccess(false);
    }

    const handleCloseError = () => {
        setError(false);
    }




    return (<>
        <BootstrapDialog
            onClose={handleClosePostMarker}
            aria-labelledby="customized-dialog-title"
            open={openPostMarker}
            TransitionComponent={Transition}
        >

            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClosePostMarker}>
                <Typography id="transition-modal-title" style={{color:"#000000"}} >
                    Thank you for using our product!
                </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <TextField
                    id="outlined-helperText"
                    label="Description"
                    multiline
                    rows={4}
                    maxRows={6}
                    name="description"
                    onChange={handleMarkerChange}
                    style={{ width: '100%' }}
                    helperText="Please describe any details that could be important about this Flood"
                />
                <br />
                <br />

                <Typography id="transition-modal-title" variant="h6" component="h6" style={{color:"#000000"}}>
                    Please describe the level of severity of this Flood
                </Typography>

                <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    id="severity"
                    name="severity"
                    row
                    onChange={handleMarkerChange}

                >
                    <FormControlLabel value="none" control={
                        <Radio
                            required={true}
                            sx={{
                                color: '#353932',
                                '&.Mui-checked': {
                                    color: '#353932',
                                },
                            }}
                        />} label="None" />
                    <FormControlLabel value="low" control={
                        <Radio
                            required={true}
                            sx={{
                                color: '#353932',
                                '&.Mui-checked': {
                                    color: '#0aa14f',
                                },
                            }}
                        />} label="Low" />
                    <FormControlLabel value="moderate" control={
                        <Radio
                            required={true}
                            sx={{
                                color: '#353932',
                                '&.Mui-checked': {
                                    color: '#1388d7',
                                },
                            }}
                        />} label="Moderate" />
                    <FormControlLabel value="major" control={
                        <Radio
                            required={true}
                            sx={{
                                color: '#353932',
                                '&.Mui-checked': {
                                    color: '#efb90f',
                                },
                            }}
                        />} label="Major" />
                    <FormControlLabel value="critical" control={
                        <Radio
                            required={true}
                            sx={{
                                color: '#353932',
                                '&.Mui-checked': {
                                    color: '#e50000',
                                },
                            }} />} label="Critical"

                    />
                </RadioGroup>


                <Typography id="transition-modal-title" variant="h6" component="h6">
                    Please include any images of the Flood
                </Typography>

                <div>Upload Progress: {progress}%</div>
                <input type="file" onChange={handleFileInput}/>
                {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3 </button> */}

            </DialogContent>
            <DialogActions>
                <Stack spacing={2} direction="row">
                    <Button type="submit" onClick={() => {handleSave(); uploadFile(selectedFile);}} autoFocus variant="contained" color="primary" size="large" endIcon={<SendIcon />}>
                        POST
                    </Button>
                    <Button onClick={handleClosePostMarker} variant="outlined" color="error" size="large" endIcon={<CancelIcon />}>
                        CANCEL
                    </Button>
                </Stack>
            </DialogActions>

        </BootstrapDialog>


        <Snackbar open={successSave} autoHideDuration={8000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                You have posted a new marker! Thank you for contributing to the safety of our community!
            </Alert>
        </Snackbar>
        <Snackbar open={errorSave} autoHideDuration={8000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                You need to verify your form! The level of severity is required. Thank you for contributing to the safety of our community!
            </Alert>
        </Snackbar>



    </>
    )
}

export default PostMarker;