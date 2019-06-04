import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import TextArea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addList, addCard } from '../../../actions';
import { OpenForButtonGroup, ActionButtonTextArea, ActionButtonCard, FormButtonGroup } from './TrelloActionButtonStyledComponents';

const mapDispatchToProps = dispatch => ({
    addList: bindActionCreators(addList, dispatch),
    addCard: bindActionCreators(addCard, dispatch),
});

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
        this.handleAddList = this.handleAddList.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
    }

    handleAddList() {
        const { addList } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ''
            });
            addList(text);
        }

        return;
    }

    handleAddCard() {
        const { addCard } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ''
            });
            addCard(this.props.listID, text);
        }

        return;
    }

    renderAddButton() {
        const { list } = this.props;
        const buttonText = list ? 'Add another list' : 'Add another card';
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? 'white' : 'inherit';
        const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';
        return (
            <OpenForButtonGroup
                onClick={this.openForm}
                style={{
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </OpenForButtonGroup>
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
                <ActionButtonCard>
                    <ActionButtonTextArea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange} />
                </ActionButtonCard>
                <FormButtonGroup>
                    <Button onMouseDown={list ? this.handleAddList : this.handleAddCard} style={{ color: "white", backgroundColor: "#5aac44" }} variant="contained">{buttonTitle}</Button>
                    <Icon style={{ marginLeft: 8, cursor: "pinter" }}>close</Icon>
                </FormButtonGroup>
            </div>
        );
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default connect(undefined, mapDispatchToProps)(TrelloActionButton);