import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RequireAuth } from '../routesProtection';
import { AppLayout } from '../routesLayouts'
import { Board } from '../../pages/board';
import { AvaliableBoards } from '../../pages/availableBoards';
import { Profile } from '../../pages/profile';

export const AppRoutes = () => {
    return (
        <Switch>
            <AppLayout exact path="/board/:id" component={RequireAuth(Board)} />
            <AppLayout exact path="/home" component={RequireAuth(AvaliableBoards)} />
            <AppLayout exact path="/">
                <Redirect to="/home" />
            </AppLayout>
            <AppLayout exact path="/profile" component={RequireAuth(Profile)} />
        </Switch>
    );
};