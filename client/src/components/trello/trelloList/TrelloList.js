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
            formTitle: this.props.lists[this.props.listID].title,
            isEditing: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFinishEditing = this.handleFinishEditing.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    handleFocus(e) {
        e.target.select();
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            formTitle: e.target.value
        });
    }

    handleFinishEditing() {
        this.setState({
            isEditing: false
        });
        axios.put(`/api/list/${this.props.listID}`, {
            listTitle: this.state.formTitle
        })
            .then(() => this.props.editListTitle(this.props.listID, this.state.formTitle));
    }

    deleteList() {
        axios.delete(`/api/list/${this.props.listID}`)
            .then(() => this.props.deleteList(this.props.listID));
    }

    renderEditTitleInput() {
        return (
            <form onSubmit={this.handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={this.state.formTitle}
                    onChange={this.handleChange}
                    autoFocus
                    onFocus={this.handleFocus}
                    onBlur={this.handleFinishEditing}
                />
            </form>
        );
    }

    render() {
        const { title, cards } = this.props.lists[this.props.listID];
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
                                                <ListTitle onClick={() => this.setState({ isEditing: true })}>{title}</ListTitle>
                                                <DeleteButton onClick={this.deleteList}>delete</DeleteButton>
                                            </TitleContainer>
                                        )}
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards.map((card, index) => <TrelloCard index={index} cardId={card} key={card} listId={this.props.listID} />)}
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

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);