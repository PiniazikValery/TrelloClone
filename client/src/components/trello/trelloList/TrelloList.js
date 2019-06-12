import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editListTitle, deleteList } from '../../../actions'
import { TrelloCard } from '../trelloCard'
import { bindActionCreators } from 'redux';
import { TrelloActionButton } from '../trelloActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListContainer, TitleContainer, StyledInput, ListTitle, DeleteButton } from './TrelloListStyledComponents';
import axios from 'axios';

class TrelloList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            isEditing: false,
        }
        this.handleFinishEditing = this.handleFinishEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    handleFocus(e) {
        e.target.select();
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        });
    }

    handleFinishEditing() {
        const { editListTitle } = this.props;
        this.setState({
            isEditing: false
        });
        axios.put(`/api/list/${this.props.listID}`, {
            listTitle: this.state.title
        })
            .then(() => editListTitle(this.props.listID, this.state.title));
    }

    deleteList() {
        const { deleteList, listID } = this.props;
        axios.delete(`/api/list/${listID}`)
            .then(() => deleteList(listID));
    }

    renderEditTitleInput() {
        return (
            <form onSubmit={this.handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    autoFocus
                    onFocus={this.handleFocus}
                    onBlur={this.handleFinishEditing}
                />
            </form>
        );
    }

    render() {
        return (
            <Draggable draggableId={String(this.props.listID)} index={this.props.index}>
                {provided => (
                    <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(this.props.listID)}>
                            {provided => (
                                <div>
                                    {this.state.isEditing ? (
                                        this.renderEditTitleInput()
                                    ) : (
                                            <TitleContainer>
                                                <ListTitle onClick={() => this.setState({ isEditing: true })}>{this.state.title}</ListTitle>
                                                <DeleteButton onClick={this.deleteList}>delete</DeleteButton>
                                            </TitleContainer>
                                        )}
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.cards.map((card, index) => <TrelloCard listId={this.props.listID} index={index} _id={card._id} key={card._id} text={card.text} />)}
                                        {provided.placeholder}
                                        <TrelloActionButton listID={this.props.listID} />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </ListContainer>
                )}
            </Draggable>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editListTitle: bindActionCreators(editListTitle, dispatch),
    deleteList: bindActionCreators(deleteList, dispatch),
});

export default connect(undefined, mapDispatchToProps)(TrelloList);