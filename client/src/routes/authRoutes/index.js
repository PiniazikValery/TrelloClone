import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Register } from '../../pages/auth/register'
import { Login } from '../../pages/auth/login';

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={Login} />
        </Switch>
    );
};