import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showWrongEmailOrPasswordMessage: false,
        };
        this.handleEmailTyping = this.handleEmailTyping.bind(this);
        this.handlePasswordTyping = this.handlePasswordTyping.bind(this);
        this.onLogin = this.onLogin.bind(this);
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
            .catch(error => {
                this.setState({
                    showWrongEmailOrPasswordMessage: true,
                });
            });
    }

    render() {
        return (
            <div id="loginForm">
                <h4>Login</h4>
                {this.state.showWrongEmailOrPasswordMessage ? <h6 className="warning_message">Wrong email of password</h6> : undefined}
                <ul id="formFields">
                    <li>
                        <input onChange={this.handleEmailTyping} placeholder="Email" />
                    </li>
                    <li>
                        <input onChange={this.handlePasswordTyping} placeholder="Password" />
                    </li>
                </ul>
                <button onClick={this.onLogin} >Login user</button>
                <a href="http://localhost:5000/api/user/auth/google">
                    <button>Login via google</button>
                </a>
            </div>
        );
    }
}

export default Login;