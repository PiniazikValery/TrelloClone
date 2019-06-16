import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const RequireAuth = (Page) => {
    return class App extends Component {
        componentDidMount() {
            axios.get('/api/user/isauthenticated', {
                cancelToken: source.token
            })
                .then(() => this.setState({ isAuthenticated: true }))
                .catch((thrown) => {
                    if (!axios.isCancel(thrown)) {
                        Cookies.set('isAuthenticated', false);
                        this.props.history.push('/user/login');
                    }
                });
        }

        componentWillUnmount() {
            source.cancel();
        }
        render() {
            return (<Page match={this.props.match} history={this.props.history} />);
        }
    }
}

export { RequireAuth }