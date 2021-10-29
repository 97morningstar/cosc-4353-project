import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { currentUser } = React.useContext(AuthContext);


    return (
        <Route
            {...rest}
            {...console.log('currentUser from', currentUser)}
            render={(props) => {
                return localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }}
        ></Route>
    )
}

export default PrivateRoute;