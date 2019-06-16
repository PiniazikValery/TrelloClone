import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper, Avatar, Form, Button, Link } from './RegisterStyledComponents';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showNotification } from '../../../actions'
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: ''
        };
        this.goToLoginPage = this.goToLoginPage.bind(this);
        this.handleEmailTyping = this.handleEmailTyping.bind(this);
        this.handleNameTyping = this.handleNameTyping.bind(this);
        this.handlePasswordTyping = this.handlePasswordTyping.bind(this);
        this.handlePassword2Typing = this.handlePassword2Typing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleEmailTyping(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleNameTyping(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handlePasswordTyping(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handlePassword2Typing(event) {
        this.setState({
            password2: event.target.value,
        });
    }

    goToLoginPage() {
        this.props.history.push('/user/login');
    }

    handleSubmit() {
        axios.post('/api/user/register', {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password2: this.state.password2,
        })
            .then(() => {
                this.props.showNotification(`User ${this.state.name} has been successfully created`, 'success', 6000);
                this.props.history.push('/user/login');
            })
            .catch(err => this.props.showNotification(err.response.data.register_errors[0].msg, 'error', 6000));
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
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
                        Sign up
                </Typography>
                    <Form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyPress={this.handleKeyPress}
                                    autoComplete="fname"
                                    onChange={this.handleNameTyping}
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyPress={this.handleKeyPress}
                                    variant="outlined"
                                    onChange={this.handleEmailTyping}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyPress={this.handleKeyPress}
                                    variant="outlined"
                                    onChange={this.handlePasswordTyping}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyPress={this.handleKeyPress}
                                    variant="outlined"
                                    onChange={this.handlePassword2Typing}
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Repeat password"
                                    type="password"
                                    id="password2"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            onClick={this.handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={this.goToLoginPage} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showNotification: bindActionCreators(showNotification, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Register);
