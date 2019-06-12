import React, { Component } from 'react';
import { Card, Content, AddIcon, TrelloActionFormContainer } from './TrelloAddBoardButtonStyledComponents';
import { TrelloActionForm } from '../trelloActionForm';

class TrelloAddBoardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            newBoardName: ''
        };
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    openForm() {
        this.setState({
            newBoardName: '',
            formOpen: true
        });
    }

    closeForm() {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange(e) {
        this.setState({
            newBoardName: e.target.value
        });
    }

    saveForm() {
        this.props.onBoardCreate(this.state.newBoardName);
    }

    renderButton() {
        return (
            <Card onClick={this.openForm}>
                <AddIcon >
                    add
                </AddIcon>
                <Content>Add board</Content>
            </Card>
        );
    }

    renderForm() {
        return (
            <TrelloActionFormContainer>
                <TrelloActionForm
                    placeholder={'Enter a name for this board ...'}
                    onCloseForm={this.closeForm}
                    value={this.state.newBoardName}
                    onInputChange={this.handleInputChange}
                    onSaveClick={this.saveForm}
                    buttonTitle={'Save'}
                />
            </TrelloActionFormContainer>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderButton();
    }
}

export default TrelloAddBoardButton;