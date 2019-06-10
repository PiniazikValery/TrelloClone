const List = require('../../../models/trello/list');
const Board = require('../../../models/trello/board');

exports.renameList = (req, res) => {
    const { listId } = req.params;
    const { listTitle } = req.body;

    let errors = [];

    switch (true) {
        case !listId:
            errors.push({ msg: 'Please enter list id param' });
            break;
        case !listTitle:
            errors.push({ msg: 'Please enter list title field' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(422).json({
            rename_list_errors: errors,
        });
    } else {
        List.findOneAndUpdate({ '_id': listId, users: req.user.id }, { title: listTitle })
            .then(list => {
                if (list) {
                    res.status(200).json({
                        message: `List has been successfully renamed with ${listTitle} name`
                    });
                } else {
                    res.status(404).json({
                        message: `Cant find list`
                    });
                }
            });
    }
};

exports.deleteList = (req, res) => {
    const { listId } = req.params;

    let errors = [];

    switch (true) {
        case !listId:
            errors.push({ msg: 'Please enter list id param' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(422).json({
            delete_list_errors: errors,
        });
    } else {
        List.findOne({ '_id': listId, users: req.user.id })
            .then(list => {
                if (list) {
                    list.remove()
                        .then(() => {
                            res.status(200).json({
                                message: `List has been successfully deleted`
                            });
                        });
                } else {
                    res.status(404).json({
                        message: `Cant find list`
                    });
                }
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
        res.status(422).json({
            create_list_errors: errors,
        });
    } else {
        const newList = new List({
            title: listTitle,
            owner: req.user.id
        });
        newList
            .save()
            .then(list => {
                Board.findOneAndUpdate({ _id: boardId, users: req.user.id },
                    { $push: { lists: list } }
                )
                    .then(board => {
                        if (board) {
                            List.findByIdAndUpdate(list.id, { $set: { users: board.users } })
                                .then(updatedList => {
                                    updatedList.users.push(board.users);
                                    res.status(201).json({
                                        message: `List with title ${listTitle} has been created`,
                                        list: updatedList
                                    });
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