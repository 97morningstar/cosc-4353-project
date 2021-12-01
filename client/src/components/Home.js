import React, { useState, useRef, useCallback } from "react";


// Main page
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MainPage from '../assets/video.mp4';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../App.css'


// Sign In

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from 'react-router-dom';

// Elements
import Header from './layout/Header';
import Footer from './layout/Footer';
import Hero from './sections/Hero';

import FeaturesSplit from '../components/sections/FeaturesSplit';

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
        <Header navPosition="right" className="reveal-from-bottom" />
        <Hero className="illustration-section-01"  style={{ marginTop: '40px'}}/>
        <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
        <Footer />
















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