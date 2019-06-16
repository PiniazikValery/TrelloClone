import React from 'react';
import { AuthRoutes } from './authRoutes';
import { AppRoutes } from './appRoutes';
import { TrelloNotifier } from '../components/trello/trelloNotifier';

export const Routes = () => {
    return (
        <div>
            <TrelloNotifier />
            <AppRoutes />
            <AuthRoutes />
        </div>
    );
};