
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

// Firebase Code
import AuthProvider, { AuthContext } from '../context/AuthContext';
import {
  useHistory,
} from 'react-router-dom';

// Success/Error Alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function LogIn() {
  const { login } = React.useContext(AuthContext);

  const [openError, setOpenError] = React.useState(false);
  const [error, setError] = React.useState("");

  const history = useHistory();

  const findError = (err) => {
    let errorMessage = "";
  
    switch (err.code) {
      case "auth/invalid-email":
        errorMessage = "Please provide a valid email address";
        break;
      case "auth/internal-error":
        errorMessage = "Please provide a password";
        break;
      case "auth/user-not-found":
        errorMessage = "You don't have an account with us. Please sign up.";
        break;
      case "auth/wrong-password":
        errorMessage = "Wrong password. Please try again.";
        break;
      default:
        errorMessage = "An undefined error happened.";
    }
    return errorMessage;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login(data.get('email'), data.get('password'))
      .then(user => {
      
        localStorage.setItem("token", user.user.accessToken);
        history.push('/map')
        setOpenError(false)
      }).catch(err => {
        console.log(err);
        setError(findError(err)); //Change later
        setOpenError(true)
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

        <Typography component="h1" variant="h5" style={{color:"#000000"}}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/signup" variant="body2" style={{color:"#000000"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}