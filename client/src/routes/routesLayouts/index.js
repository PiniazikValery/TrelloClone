import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import { AppBar } from '../../components/layout/appBar';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Content = styled.div`    
    width: 100%;
    overflow: auto;
    &&::-webkit-scrollbar {
        display: none;
    }
`

export const AppLayout = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (Cookies.get('isAuthenticated') === 'false')
            ? <Redirect to="/user/login" />
            : <div><AppBar /><Content><Component {...props} /></Content></div>
    )} />
);