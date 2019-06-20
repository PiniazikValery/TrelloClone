import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper, Avatar, Form, Button, Link, GoogleLoginButtonWrapper } from './LoginStyledComponents';
import { GoogleLoginButton } from '../../../components/google/loginButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showNotification } from '../../../actions';
import Cookies from 'js-cookie';
import io from 'socket.io-client'
import { API_URL } from '../../../config'
import axios from 'axios';


const socket = io(API_URL);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            googleLoginButtonIsDisabled: false
        };
        this.handleEmailTyping = this.handleEmailTyping.bind(this);
        this.handlePasswordTyping = this.handlePasswordTyping.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.goToRegisterPage = this.goToRegisterPage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.startGoogleAuth = this.startGoogleAuth.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.checkPopup = this.checkPopup.bind(this);
    }

    componentDidMount() {
        socket.on('successGoogleAuth', () => {
            if (this.popup) {
                this.popup.close();
            }
            Cookies.set('isAuthenticated', true);
            this.props.history.push('/home');
        })
    }

    handleEmailTyping(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handlePasswordTyping(event) {
        this.setState({
            password: event.target.value,
        });
    }

    onLogin() {
        axios.post('/api/user/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(() => {
                this.props.history.push('/home')
            })
            .catch(() => {
                this.props.showNotification('Wrong email or password', 'error', 6000);
            });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.onLogin();
        }
    }

    goToRegisterPage() {
        this.props.history.push('/user/register');
    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({ googleLoginButtonIsDisabled: false })
            }
        }, 1000)
    }

    openPopup() {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/api/user/auth/google?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
    }

    startGoogleAuth(e) {
        if (!this.state.googleLoginButtonIsDisabled) {
            e.preventDefault()
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({ googleLoginButtonIsDisabled: true })
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper>
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form noValidate>
                        <TextField
                            onKeyPress={this.handleKeyPress}
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleEmailTyping}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onKeyPress={this.handleKeyPress}
                            variant="outlined"
                            margin="normal"
                            onChange={this.handlePasswordTyping}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            onClick={this.onLogin}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <GoogleLoginButtonWrapper onClick={this.state.googleLoginButtonIsDisabled ? undefined : this.startGoogleAuth}>
                            <GoogleLoginButton />
                        </GoogleLoginButtonWrapper>
                        <Grid container>
                            <Grid item>
                                <Link onClick={this.goToRegisterPage} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
                <Box mt={5}>
                </Box>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showNotification: bindActionCreators(showNotification, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Login);