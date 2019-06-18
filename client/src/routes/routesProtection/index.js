import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initUserProfile } from '../../actions';

const RequireAuth = (Page) => {
    const mapDispatchToProps = dispatch => ({
        initUserProfile: bindActionCreators(initUserProfile, dispatch),
    });

    const mapStateToProps = state => ({
        userProfile: state.userProfile
    });
    class App extends Component {
        constructor(props) {
            super(props);
            this.CancelToken = axios.CancelToken;
            this.source = this.CancelToken.source();
        }

        componentDidMount() {
            axios.get('/api/user/isauthenticated', {
                cancelToken: this.source.token
            })
                .then(res => {
                    this.props.initUserProfile(res.data.user.profile);
                })
                .catch((thrown) => {
                    if (!axios.isCancel(thrown)) {
                        Cookies.set('isAuthenticated', false);
                        this.props.history.push('/user/login');
                    }
                });
        }

        componentWillUnmount() {
            this.source.cancel();
        }
        render() {
            return (<Page match={this.props.match} history={this.props.history} />);
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(App)
}

export { RequireAuth }