import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TrelloActionForm } from '../trelloActionForm';
import { Draggable } from 'react-beautiful-dnd';
import { editCardText } from '../../../actions'
import { CardContainer, Card } from './TrelloCardStyledComponents';

class TrelloCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            cardFromText: this.props.text
        }
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    openForm() {
        this.setState({
            formOpen: true
        });
    }

    closeForm() {
        const { lists } = this.props;
        const cardTextFromReducer = lists.find(list => list.id === this.props.listId).cards.find(card => card.id === this.props.id).text;
        this.setState({
            formOpen: false,
            cardFromText: cardTextFromReducer
        });
    }

    handleInputChange(e) {
        this.setState({
            cardFromText: e.target.value,
        });
    }

    saveForm() {
        const { editCardText } = this.props;
        editCardText(this.props.listId, this.props.id, this.state.cardFromText)
    }

    renderCard() {
        const { lists } = this.props;
        return (
            <Draggable draggableId={String(this.props.id)} index={this.props.index}>
                {provided => (
                    <CardContainer
                        onClick={this.openForm}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {lists.find(list => list.id === this.props.listId).cards.find(card => card.id === this.props.id).text}
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
                value={this.state.cardFromText}
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
    lists: state.lists
});

const mapDispatchToProps = dispatch => ({
    editCardText: bindActionCreators(editCardText, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrelloCard);