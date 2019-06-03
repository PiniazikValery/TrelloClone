import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            errorMessage: '',
        };
        this.handleEmailTyping = this.handleEmailTyping.bind(this);
        this.handleNameTyping = this.handleNameTyping.bind(this);
        this.handlePasswordTyping = this.handlePasswordTyping.bind(this);
        this.handlePassword2Typing = this.handlePassword2Typing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        axios.post('/user/register', {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password2: this.state.password2,
        })
            .then(() => {
                this.props.history.push('/user/login')
            })
            .catch(error => {
                this.setState({
                    errorMessage: error,
                });
            })
    }

    render() {
        return (
            <div id="registrationForm" >
                <h4>Registration</h4>
                <ul id="formFields">
                    <li>
                        <input value={this.state.email} onChange={this.handleEmailTyping} placeholder="Type email here" />
                    </li>
                    <li>
                        <input value={this.state.name} onChange={this.handleNameTyping} placeholder="Type name here" />
                    </li>
                    <li>
                        <input value={this.state.password} onChange={this.handlePasswordTyping} placeholder="Type password here" />
                    </li>
                    <li>
                        <input value={this.state.password2} onChange={this.handlePassword2Typing} placeholder="Repeat your password here" />
                    </li>
                </ul>
                <button onClick={this.handleSubmit} >Register user</button>
            </div>
        );
    }
}

export default Register;