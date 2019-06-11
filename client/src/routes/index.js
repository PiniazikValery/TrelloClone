import React from 'react';
import { Home } from '../pages/home';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import { PrivateRoute, RequireAuth } from './routesProtection';

export const Routes = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/home" component={RequireAuth(Home)} />
            <PrivateRoute exact path="/">
                <Redirect to="/home" />
            </PrivateRoute>
            <AuthRoutes />
        </Switch>
    );
};