import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Cookies.get('isAuthenticated')
            ? <Component {...props} />
            : <Redirect to='/user/login' />
    )} />
);

export default PrivateRoute;