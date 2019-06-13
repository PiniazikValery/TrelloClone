import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TrelloActionForm } from '../trelloActionForm';
import { Draggable } from 'react-beautiful-dnd';
import { editCardText, deleteCard } from '../../../actions'
import { CardContainer, Card, DeleteButton } from './TrelloCardStyledComponents';
import axios from 'axios';

class TrelloCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            formText: this.props.cards[this.props.cardId].text
        };
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    openForm(e) {
        if (e.target.id !== 'deleteCard') {
            this.setState({
                formOpen: true
            });
        }
    }

    closeForm() {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange(e) {
        this.setState({
            formText: e.target.value,
        });
    }

    saveForm() {
        axios.put(`/api/card/${this.props.cardId}`, {
            cardTitle: this.state.formText
        })
            .then(() => this.props.editCardText(this.props.listId, this.props.cardId, this.state.formText));
    }

    deleteCard() {
        axios.delete(`/api/card/${this.props.cardId}`)
            .then(() => this.props.deleteCard(this.props.listId, this.props.cardId));
    }

    renderCard() {
        const { text } = this.props.cards[this.props.cardId];
        return (
            <Draggable draggableId={String(this.props.cardId)} index={this.props.index}>
                {provided => (
                    <CardContainer
                        onClick={this.openForm}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card>
                            <DeleteButton id="deleteCard" fontSize="small" onClick={this.deleteCard}>
                                delete
                            </DeleteButton>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContainer>
                )}
            </Draggable>
        );
    }

    renderForm() {
        return (
            <TrelloActionForm
                placeholder={'Enter a title for this card ...'}
                onCloseForm={this.closeForm}
                value={this.state.formText}
                onInputChange={this.handleInputChange}
                onSaveClick={this.saveForm}
                buttonTitle={'Save'}
            />
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderCard();
    }
}

const mapStateToProps = state => ({
    cards: state.cards
});

const mapDispatchToProps = dispatch => ({
    editCardText: bindActionCreators(editCardText, dispatch),
    deleteCard: bindActionCreators(deleteCard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrelloCard);