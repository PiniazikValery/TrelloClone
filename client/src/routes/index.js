import React from 'react';
import { Home } from '../pages/home';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import ProtectedRoute from './ProtectedRoute';

export const Routes = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/">
                <Redirect to="/home" />
            </ProtectedRoute>
            <AuthRoutes />
        </Switch>
    );
};