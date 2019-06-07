const Board = require('../../../models/trello/board');
const List = require('../../../models/trello/list');
const Card = require('../../../models/trello/card');
const mongoose = require('mongoose');

exports.getAvaliableBoards = (req, res) => {
    Board.find({ owner: req.user.id })
        .then(boards => {
            res.status(200).json(boards);
        });
};

exports.createBoard = (req, res) => {
    const { boardName } = req.body;
    let errors = [];

    switch (true) {
        case !boardName:
            errors.push({ msg: 'Please enter board name field' });
            break;
        default:
            break;
    }
    if (errors.length > 0) {
        res.status(500).json({
            create_board_errors: errors,
        });
    } else {
        const newBoard = new Board({
            boardName,
            owner: req.user.id
        });
        newBoard
            .save()
            .then(board => {
                res.status(201).json({
                    message: `Board with name ${boardName} has been created`,
                    board: board
                });
            });
    }
};

exports.createList = (req, res) => {
    const { listTitle, boardId } = req.body;
    let errors = [];

    switch (true) {
        case !listTitle:
            errors.push({ msg: 'Please enter list title field' });
            break;
        case !boardId:
            errors.push({ msg: 'Please enter board id field' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(500).json({
            create_list_errors: errors,
        });
    } else {
        const newList = new List({
            title: listTitle
        });
        newList
            .save()
            .then(list => {
                Board.findOneAndUpdate({ _id: boardId },
                    { $push: { lists: { listId: mongoose.Types.ObjectId(list.id) } } }
                )
                    .then(board => {
                        if (board) {
                            res.status(201).json({
                                message: `List with title ${listTitle} has been created`,
                                list: list
                            });
                        } else {
                            List.findByIdAndDelete(list.id).then(() => {
                                res.status(404).json({
                                    message: `Can not find specified board`,
                                });
                            });
                        }
                    })
                    .catch(error => {
                        List.findByIdAndDelete(list.id).then(() => {
                            res.status(500).json({
                                error: error
                            });
                        });
                    });
            });
    }
};

exports.createCard = (req, res) => {
    const { listId, cardText } = req.body;

    let errors = [];

    switch (true) {
        case !listId:
            errors.push({ msg: 'Please enter list id field' });
            break;
        case !cardText:
            errors.push({ msg: 'Please enter card text field' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(500).json({
            create_card_errors: errors,
        });
    } else {
        const newCard = new Card({
            text: cardText
        });

        newCard
            .save()
            .then(card => {
                List.findOneAndUpdate({ _id: listId },
                    { $push: { cards: { cardId: mongoose.Types.ObjectId(card._id) } } }
                )
                    .then(list => {
                        if (list) {
                            res.status(201).json({
                                message: `Card with text ${cardText} has been created`,
                                card: card
                            });
                        } else {
                            Card.findByIdAndDelete(card.id).then(() => {
                                res.status(404).json({
                                    message: `Can not find specified list`
                                });
                            });
                        }
                    })
                    .catch(error => {
                        Card.findByIdAndDelete(card.id).then(() => {
                            res.status(500).json({
                                error: error
                            });
                        });
                    });
            });
    }
};

exports.getBoardById = (req, res) => {
    const { boardId } = req.body;

    Board.findById(boardId)
        .then((foundBoard) => {
            let result =[];

            foundBoard.lists.map(list => {
                List.findById(list.listId, (foundList) => {
                    result.push({title: foundList.title})
                });
            })

            return result;
        })
        .then((foundBoard) => {
            res.status(200).json({
                board: foundBoard
            });
        });
};