import React, { useState, useRef, useCallback } from "react";


// Main page
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MainPage from '../assets/video.mp4';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Sign In

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';



const VideoPlayer = styled(CardMedia)`
    position: absolute;
    top: 0px;
    filter: blur(2px);
    filter: brightness(0.4);
    zIndex: -1;
   height: 100%;
   width: 100%;
   object-fit: fill;
`;

const Home = () => {
  const history = useHistory();

  const handleLogIn = () => {
    history.push('/login');
  }

  const handleSignUp = () => {
    history.push('/signup');
  }

  const handleMap = () => {
    history.push('/map');
  }

  // This is ready to add more components
  return (<>

    <Grid container >

      <Grid item xs={12}
        style={{
          position: 'relative',

          display: 'flex',
          height: '30rem'
        }}
      >
        <Grid item xs={12} style={{ height: 'auto', height: '100%' }}>
          <VideoPlayer
            component="video"
            className='video'
            image={MainPage}
            autoPlay
            loop
          />
        </Grid>


        <Grid item xs={12}
          style={{
            position: 'absolute',
            padding: '2rem 2rem 2rem 4rem',
            bottom: '0px',
            height: 'auto',
          }}
        >
          <Typography id="transition-modal-title" variant="h3" component="h3"
            style={{
              color: '#fff'
            }}
          >
            NextFlood
          </Typography>
          <br />
          <Typography id="transition-modal-title" variant="h6" component="h6"
            style={{
              color: '#fff'
            }}
          >
            Welcome to the place where you can make our communities a safer place after rainfall events
          </Typography>
          <br />
          <Button onClick={handleLogIn} autoFocus variant="contained" color="primary" size="large" >
            GET STARTED LOG IN
          </Button>
          <br />
          <br />
          <Button onClick={handleSignUp} autoFocus variant="contained" color="primary" size="large" >
            SIGN UP
          </Button>
          <br />
          <br />

          <Button onClick={handleMap} autoFocus variant="contained" color="primary" size="large" >
            EXPLORE THE FLOOD MAP
          </Button>

        </Grid>
      </Grid>
    </Grid>




    
     
    








    {/*  <FloodMap /> */}

  </>
  );
};

export default Home;


// TODO
/**
 * 1. Don't let the user submit without the required info DONE
 * 2. Setup success/error messages DONE
 * 3. You can only edit you own posts
 * 3.5 Give each marker an id
 * 4. When you click on a post you can see the info stored in it on a popup DONE
 * 5. Button that will enable the posting feature
 * 6. Firebase authorization and authentication part
 * 7. Photos and camera modes (look into this) Amazon S3 maybe?
 * 7. Ability to filter data in the UI. All in the browser
 * 8. Navbar to go to user settings menu
 * 9. Divide the code into smaller component files to increase readability
 * 10. Work on efficiency/performance of the markers DONE
 * 11. "Is this event still happening?" question on the form
 *
 */