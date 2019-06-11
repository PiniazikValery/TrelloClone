import React, { Component } from 'react';
import { BoardsContainer } from './AvailableBoardsStyledComponents';

class AvaliableBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        };
    }

    componentDidMount() {

    }

    renderBoards() {
        return (
            <BoardsContainer>

            </BoardsContainer>
        );
    }

    render() {
        return this.renderBoards();
    }
}

export default AvaliableBoards;