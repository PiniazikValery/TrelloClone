import React, { Component } from 'react';
import axios from 'axios';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (Cookies.get('isAuthenticated') === 'false')
            ? <Redirect to="user/login" />
            : <Component {...props} />
    )} />
);

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const RequireAuth = (Page) => {
    return class App extends Component {
        componentDidMount() {
            axios.get('/user/isauthenticated', {
                cancelToken: source.token
            })
                .then(() => this.setState({ isAuthenticated: true }))
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        console.log('Is user authenticated request сanceled', thrown.message);
                    } else {
                        Cookies.set('isAuthenticated', false);
                        this.props.history.push('user/login');
                    }
                });
        }

        componentWillUnmount() {
            source.cancel();
        }
        render() {
            return (<Page />);
        }
    }
}

export { RequireAuth }