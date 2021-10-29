import React from "react";
import FloodMap from "./map/FloodMap";
import Home from "./components/Home";
import PrivateRoute from './private-routes/PrivateRoute';

// Sign In

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const App = () => {
  const history = useHistory();


  // This is ready to add more components
  return (<>
   <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={LogIn} />

        {/** Chanege to Route as anyone can access the map */}
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
 * 3. When you click on a post you can see the info stored in it on a popup DONE
 * 4. Firebase authorization and authentication part DONE
 * 5. Navbar to go to user settings menu DONE
 * 6. Divide the code into smaller component files to increase readability DONE
 * 7. Work on efficiency/performance of the markers DONE
 *
 * What is missing?
 * 
 * 1. "Is this event still happening?" question on the form
 * 2. Ability to filter data in the UI. All in the browser
 * 3. Photos and camera modes (look into this) Amazon S3 maybe?
 * 4. Button that will enable the posting feature
 * 
 * 5. You can only edit you own posts
 * 
 * 
 */