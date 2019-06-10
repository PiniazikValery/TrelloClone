import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TrelloActionButton } from '../../components/trello/trelloActionButton';
import { TrelloList } from '../../components/trello/trelloList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../../actions'
import { ListContainer } from './HomeStyledComponents';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    onDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        const { sort } = this.props;

        if (!destination) {
            return;
        }

        sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        );
    }

    render() {
        const { board } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="Home">
                    <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                        {provided => (
                            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                                {board.lists.map((list, index) => <TrelloList listID={list.id} key={list.id} title={list.title} cards={list.cards} index={index} />)}
                                {provided.placeholder}
                                <TrelloActionButton list />
                            </ListContainer>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        );
    }
}

const mapStateToProps = state => ({
    board: state.board
});

const mapDispatchToProps = dispatch => ({
    sort: bindActionCreators(sort, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);