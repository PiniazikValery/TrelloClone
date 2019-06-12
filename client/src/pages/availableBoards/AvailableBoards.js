import React, { Component } from 'react';
import { BoardsContainer } from './AvailableBoardsStyledComponents';
import { TrelloBoard } from '../../components/trello/trelloBoard';
import { TrelloAddBoardButton } from '../../components/trello/trelloAddBoardButton';
import axios from 'axios';

class AvaliableBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
        this.deleteBoard = this.deleteBoard.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        axios.get('/api/board/avaliable')
            .then(result => this.setState({ boards: result.data }))
    }

    deleteBoard(boardId) {
        axios.delete(`/api/board/${boardId}`)
            .then(() => {
                const updatedBoards = this.state.boards.filter(board => board._id !== boardId);
                this.setState({
                    boards: updatedBoards
                });
            })
    }

    createBoard(boardName) {
        axios.post('/api/board/', {
            boardName
        })
            .then((res) => {
                const updatedBoards = this.state.boards;
                updatedBoards.push(res.data.board);
                this.setState({
                    boards: updatedBoards
                });
            });
    }

    render() {
        return (
            <BoardsContainer>
                {this.state.boards.map(board => <TrelloBoard history={this.props.history} key={board._id} onBoardDelete={this.deleteBoard} boardName={board.boardName} boardId={board._id} />)}
                <TrelloAddBoardButton onBoardCreate={this.createBoard} />
            </BoardsContainer>
        );
    }
}

export default AvaliableBoards;