import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editListTitle } from '../../../actions'
import { TrelloCard } from '../trelloCard'
import { bindActionCreators } from 'redux';
import { TrelloActionButton } from '../trelloActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListContainer, TitleContainer, StyledInput, ListTitle } from './TrelloListStyledComponents';

class TrelloList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            isEditing: false,
        }
        this.handleFinishEditing = this.handleFinishEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        editListTitle(this.props.listID, this.state.title);        
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
                                            <TitleContainer onClick={() => this.setState({ isEditing: true })}>
                                                <ListTitle>{this.state.title}</ListTitle>
                                            </TitleContainer>
                                        )}
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.cards.map((card, index) => <TrelloCard listId={this.props.listID} index={index} id={card.id} key={card.id} text={card.text} />)}
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
});

export default connect(undefined, mapDispatchToProps)(TrelloList);