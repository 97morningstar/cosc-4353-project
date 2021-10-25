
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Firebase Code
import AuthProvider, { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase'
import { collection, addDoc } from "firebase/firestore";

import {
    useHistory,
} from 'react-router-dom';

// Success/Error Alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function LogIn() {
    const { signup } = React.useContext(AuthContext);
    const history = useHistory();
    const [openError, setOpenError] = React.useState(false);
    const [error, setError] = React.useState("");

    const findError = (err) => {
       let errorMessage = "";
        switch (err.code) {
            case "auth/weak-password":
              errorMessage = "Your password is too weak! We require at least 6 characters.";
              break;
            case "auth/email-already-in-use":
              errorMessage = "This email is already in use. Please login or use another email.";
              break;
            default:
              errorMessage = "An undefined error happened.";
          }
          return errorMessage;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // It returns a Promise
        signup(data.get('email'), data.get('password'), data.get('firstName'), data.get('lastName'))
            .then(user => {

                addDoc(collection(db, "users"), {
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName'),
                    uid: user.user.uid,
                    email: user.user.email
                })
                    .then(res => {
                        console.log('User added to database')
                        history.push('/map')
                        console.log('Sign Up from Sign Up component')
                        setOpenError(false)

                    })
                    .catch(err => {
                        console.log('Error with Adding user to db');

                        setError(findError(err)); //Change later
                        setOpenError(true)
                    })



            }).catch(err => {
                console.log(findError(err));

                setError(findError(err)); //Change later
                setOpenError(true)
            });



        // eslint-disable-next-line no-console
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });


    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Collapse in={openError}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity="error"
                    >
                        {error}
                    </Alert>
                </Collapse>




                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                       
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>


    );
}