import React, { Component } from 'react';
import { TrelloCard } from '../trelloCard'
import { TrelloActionButton } from '../trelloActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListContainer } from './TrelloListStyledComponents';


class TrelloList extends Component {
    render() {
        return (
            <Draggable draggableId={String(this.props.listID)} index={this.props.index}>
                {provided => (
                    <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(this.props.listID)}>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <h4>{this.props.title}</h4>
                                    {this.props.cards.map((card, index) => <TrelloCard index={index} id={card.id} key={card.id} text={card.text} />)}
                                    {provided.placeholder}
                                    <TrelloActionButton listID={this.props.listID} />
                                </div>
                            )}
                        </Droppable>
                    </ListContainer>
                )}
            </Draggable>
        );
    }
}

export default TrelloList;