import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addList, addCard } from '../../../actions';
import { OpenForButtonGroup, AddButtonText } from './TrelloActionButtonStyledComponents';
import { TrelloActionForm } from '../trelloActionForm';
import axios from 'axios';

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
            axios.post('/api/list/', {
                listTitle: text,
                boardId: this.props.board._id
            })
                .then(res => addList(text, res.data.list._id));
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
                <AddButtonText>{buttonText}</AddButtonText>
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
            text: '',
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
            <div style={list ? { marginLeft: 8, paddingRight: 10 } : {}}>
                <TrelloActionForm
                    placeholder={placeholder}
                    onCloseForm={this.closeForm}
                    value={this.state.text}
                    onInputChange={this.handleInputChange}
                    onSaveClick={list ? this.handleAddList : this.handleAddCard}
                    buttonTitle={buttonTitle}
                />
            </div>
        );
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const mapDispatchToProps = dispatch => ({
    addList: bindActionCreators(addList, dispatch),
    addCard: bindActionCreators(addCard, dispatch),
});

const mapStateToProps = state => ({
    board: state.board
});

export default connect(mapStateToProps, mapDispatchToProps)(TrelloActionButton);