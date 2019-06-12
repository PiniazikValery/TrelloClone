import React, { Component } from 'react';
import { Card, Typography, DeleteButton, EditButton, TrelloActionFormContainer, BoardContainer } from './TrelloBoardStyledComponents';
import { TrelloActionForm } from '../trelloActionForm';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';

class TrelloBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardId: this.props.boardId,
            formOpen: false,
            boardName: this.props.boardName,
            formBoardName: this.props.boardName
        };
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
        this.openBoard = this.openBoard.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    openForm() {
        this.setState({
            formOpen: true,
            formBoardName: this.state.boardName
        });
    }

    deleteBoard() {
        this.props.onBoardDelete(this.state.boardId);
    }

    closeForm() {
        this.setState({
            formOpen: false
        });
    }

    saveForm() {
        axios.put(`/board/${this.state.boardId}`, {
            boardName: this.state.formBoardName
        })
            .then(() => {
                this.setState({
                    boardName: this.state.formBoardName
                });
            });
    }

    handleInputChange(e) {
        this.setState({
            formBoardName: e.target.value
        });
    }

    openBoard() {
        this.props.history.push(`/board/${this.state.boardId}`)
    }

    onClick(e) {
        switch (true) {
            case e.target.id === 'delete':
                this.deleteBoard();
                break;
            case e.target.id === 'edit':
                this.openForm();
                break;
            default:
                this.openBoard();
                break;
        }
    }

    renderBoard() {
        return (
            <BoardContainer onClick={this.onClick}>
                <Card>
                    <DeleteButton fontSize="small" id="delete">
                        delete
                </DeleteButton>
                    <EditButton fontSize="small" id="edit">
                        edit
                </EditButton>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {this.state.boardName}
                        </Typography>
                    </CardContent>
                </Card>
            </BoardContainer>
        );
    }

    renderForm() {
        return (
            <TrelloActionFormContainer>
                <TrelloActionForm
                    placeholder={'Enter a name for this board ...'}
                    onCloseForm={this.closeForm}
                    value={this.state.formBoardName}
                    onInputChange={this.handleInputChange}
                    onSaveClick={this.saveForm}
                    buttonTitle={'Save'}
                />
            </TrelloActionFormContainer>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderBoard();
    }
}

export default TrelloBoard;