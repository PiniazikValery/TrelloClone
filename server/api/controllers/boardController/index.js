const Board = require('../../../models/trello/board');

exports.getAvaliableBoards = (req, res) => {
    Board.find({ users: req.user.id })
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
        res.status(422).json({
            create_board_errors: errors,
        });
    } else {
        const newBoard = new Board({
            boardName,
            users: [req.user.id]
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

exports.getBoardById = (req, res) => {
    const { boardId } = req.params;

    let errors = [];

    switch (true) {
        case !boardId: {
            errors.push({ msg: 'Please enter board id param' });
            break;
        }
        default: {
            break;
        }
    }

    if (errors.length > 0) {
        res.status(422).json({
            get_board_errors: errors,
        });
    } else {
        Board.findOne({ '_id': boardId, users: req.user.id })
            .select('-users')
            .populate({ path: 'lists', select: '-users', populate: { path: 'cards', select: '-users' } })
            .then((foundBoard) => {
                if (foundBoard) {
                    res.status(200).json({
                        board: foundBoard
                    });
                } else {
                    res.status(404).json({
                        error: 'Cant find board'
                    });
                }
            });
    }
};

exports.renameBoard = (req, res) => {
    const { boardName } = req.body;
    const { boardId } = req.params;

    let errors = [];

    switch (true) {
        case !boardId: {
            errors.push({ msg: 'Please enter board id param' });
            break;
        }
        case !boardName: {
            errors.push({ msg: 'Please enter board name field' });
            break;
        }
        default: {
            break;
        }
    }

    if (errors.length > 0) {
        res.status(422).json({
            rename_board_errors: errors,
        });
    } else {
        Board.findOneAndUpdate({ '_id': boardId, users: req.user.id }, { boardName: boardName })
            .then(board => {
                if (board) {
                    res.status(200).json({
                        message: `Board has been successfully renamed with ${boardName} name`
                    });
                } else {
                    res.status(404).json({
                        message: `Cant find board`
                    });
                }
            });
    }
};

exports.deleteBoard = (req, res) => {
    const { boardId } = req.params;

    let errors = [];

    switch (true) {
        case !boardId: {
            errors.push({ msg: 'Please enter board id param' });
            break;
        }
        default: {
            break;
        }
    }

    if (errors.length > 0) {
        res.status(422).json({
            delete_board_errors: errors,
        });
    } else {
        Board.findOne({ '_id': boardId, users: req.user.id })
            .then(board => {
                if (board) {
                    board.remove()
                        .then(() => {
                            res.status(200).json({
                                message: `Board has been successfully removed with ${board.boardName} name`
                            });
                        });
                } else {
                    res.status(404).json({
                        message: `Cant find board`
                    });
                }
            });
    }
};

exports.performeDrag = (req, res) => {
    const {
        boardId,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
    } = req.body;

    switch (true) {
        case type === 'list': {
            Board.findOne({ '_id': boardId, users: req.user.id })
                .then(foundBoard => {
                    const list = foundBoard.lists.splice(droppableIndexStart, 1);
                    foundBoard.lists.splice(droppableIndexEnd, 0, ...list);
                    foundBoard.save();
                });
            break;
        }
        case droppableIdStart === droppableIdEnd: {
            Board.findOne({ '_id': boardId, users: req.user.id })
                .populate({ path: 'lists', populate: { path: 'cards' } })
                .then(foundBoard => {
                    const list = foundBoard.lists.find(list => droppableIdStart === list.id);
                    const card = list.cards.splice(droppableIndexStart, 1);
                    list.cards.splice(droppableIndexEnd, 0, ...card);
                    list.save();
                });
            break;
        }
        case droppableIdStart !== droppableIdEnd: {
            Board.findOne({ '_id': boardId, users: req.user.id })
                .populate({ path: 'lists', populate: { path: 'cards' } })
                .then(foundBoard => {
                    const listStart = foundBoard.lists.find(list => droppableIdStart === list.id);
                    const card = listStart.cards.splice(droppableIndexStart, 1);
                    const listEnd = foundBoard.lists.find(list => droppableIdEnd === list.id);
                    listEnd.cards.splice(droppableIndexEnd, 0, ...card);
                    listStart.save();
                    listEnd.save();
                });
            break;
        }
        default: {
            res.status(200).json({
                message: 'Nothing to drag'
            });
            break;
        }
    }
    res.status(200).json({
        message: 'Sorted'
    });
};