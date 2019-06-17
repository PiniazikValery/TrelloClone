import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { RootBar, Title, AppBar } from './AppBarStyledComponents';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initUserProfile } from '../../../actions'
import axios from 'axios';
import Cookies from 'js-cookie';

class _AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    componentDidMount() {
        axios.get('/api/userInfo/profile')
            .then(res => this.props.initUserProfile(res.data.user.profile));
    }


    handleMenu(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    handleLogOutClick() {
        axios.post('/api/user/logout')
            .then(() => {
                Cookies.set('isAuthenticated', false);
                this.props.history.push('/user/login');
            });
    }

    handleProfileClick() {
        this.handleClose();
        this.props.history.push('/profile');
    }

    render() {
        return (
            <RootBar>
                <AppBar position="static">
                    <Toolbar>
                        <Title variant="h6">
                            Trello Clone
                        </Title>
                        <div>
                            <IconButton
                                aria-label="Account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <Avatar alt="Remy Sharp" src={this.props.userProfile.avatar ? '/api/userInfo/avatar' : undefined} >{this.props.userProfile.shortName}</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
                                <MenuItem onClick={this.handleLogOutClick}>Log out</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </RootBar>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initUserProfile: bindActionCreators(initUserProfile, dispatch),
});

const mapStateToProps = state => ({
    userProfile: state.userProfile
});

export default connect(mapStateToProps, mapDispatchToProps)(_AppBar);