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
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmailTyping = this.handleEmailTyping.bind(this);
        this.handlePasswordTyping = this.handlePasswordTyping.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.goToRegisterPage = this.goToRegisterPage.bind(this);
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
            });
    }

    goToRegisterPage() {
        this.props.history.push('/user/register');
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
                        <GoogleLoginButtonWrapper>
                            <a href="http://localhost:5000/api/user/auth/google">
                                <GoogleLoginButton />
                            </a>
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

export default Login;