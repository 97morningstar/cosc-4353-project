import React, { useState, useRef, useCallback } from "react";
import FloodMap from "./map/FloodMap";
import Home from "./components/Home";


// Main page
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MainPage from './assets/video.mp4';
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

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";


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

const App = () => {
  const history = useHistory();

  const handleSignUp = () => {
    history.push('/signup');
  }

  // This is ready to add more components
  return (<>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={LogIn} />
        <Route path='/map' exact component={FloodMap} />
        <Route path='/signup' exact component={SignUp} />




      </Switch>
    </Router>

  </>
  );
};

export default App;


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