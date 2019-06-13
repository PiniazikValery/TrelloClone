import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TrelloActionButton } from '../../components/trello/trelloActionButton';
import { TrelloList } from '../../components/trello/trelloList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, initBoard } from '../../actions'
import { ListContainer } from './BoardStyledComponents';
import axios from 'axios';

class Board extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }


    onDragEnd(result) {
        const { destination, source, draggableId, type } = result;
        const { sort } = this.props;

        if (!destination) {
            return;
        } else {
            axios.put('/api/board/drag', {
                boardId: this.props.board._id,
                type: type,
                droppableIndexStart: source.index,
                droppableIndexEnd: destination.index,
                droppableIdStart: source.droppableId,
                droppableIdEnd: destination.droppableId
            });
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            );
        }
    }

    componentDidMount() {
        const { initBoard } = this.props;
        axios.get(`/api/board/${this.props.match.params.id}`)
            .then(res => {
                initBoard(res.data.board);
            })
    }

    render() {
        const { board } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="Home">
                    <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                        {provided => (
                            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                                {board.lists.map((list, index) => <TrelloList listID={list} key={list} index={index} />)}
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
    initBoard: bindActionCreators(initBoard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);