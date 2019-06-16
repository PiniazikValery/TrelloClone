import React from 'react';
import { Board } from '../pages/board';
import { AvaliableBoards } from '../pages/availableBoards';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoutes } from './authRoutes';
import { PrivateRoute, RequireAuth } from './routesProtection';
import { TrelloNotifier } from '../components/trello/trelloNotifier';

export const Routes = () => {
    return (
        <div>
            <TrelloNotifier />
            <Switch>
                <PrivateRoute exact path="/board/:id" component={RequireAuth(Board)} />
                <PrivateRoute exact path="/home" component={RequireAuth(AvaliableBoards)} />
                <PrivateRoute exact path="/">
                    <Redirect to="/home" />
                </PrivateRoute>
                <AuthRoutes />
            </Switch>
        </div>
    );
};