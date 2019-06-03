import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import TextArea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card'
import styles from './TrelloActionButton.module.css';
import Button from '@material-ui/core/Button';

class TrelloActionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            text: ''
        };
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    renderAddButton() {
        const { list } = this.props;
        const buttonText = list ? 'Add another list' : 'Add another card';
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? 'white' : 'inherit';
        const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';
        return (
            <div
                className={styles.openForButtonGroup}
                onClick={this.openForm}
                style={{
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        );
    }

    openForm() {
        this.setState({
            formOpen: true,
        });
    }

    closeForm(e) {
        this.setState({
            formOpen: false,
        });
    }

    handleInputChange(e) {
        this.setState({
            text: e.target.value,
        });
    }

    renderForm() {
        const { list } = this.props;
        const placeholder = list ? 'Enter list title ...' : 'Enter a title for this card ...';
        const buttonTitle = list ? 'Add List' : 'Add Card';
        return (
            <div>
                <Card className={styles.card}>
                    <TextArea
                        className={styles.actionButtonTextArea}
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange} />
                </Card>
                <div className={styles.formButtonGroup}>
                    <Button style={{ color: "white", backgroundColor: "#5aac44" }} variant="contained">{buttonTitle}</Button>
                    <Icon style={{ marginLeft: 8, cursor: "pinter" }}>close</Icon>
                </div>
            </div>
        );
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default TrelloActionButton;