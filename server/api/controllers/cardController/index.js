const Card = require('../../../models/trello/card');
const List = require('../../../models/trello/list');

exports.renameCard = (req, res) => {
    const { cardId } = req.params;
    const { cardTitle } = req.body;

    let errors = [];

    switch (true) {
        case !cardId:
            errors.push({ msg: 'Please enter card id param' });
            break;
        case !cardTitle:
            errors.push({ msg: 'Please enter card title field' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(422).json({
            rename_card_errors: errors,
        });
    } else {
        Card.findOneAndUpdate({ '_id': cardId, users: req.user.id }, { text: cardTitle })
            .then(card => {
                if (card) {
                    res.status(200).json({
                        message: `Card has been successfully renamed with ${cardTitle} name`
                    });
                } else {
                    res.status(404).json({
                        message: `Cant find card`
                    });
                }
            })
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
        res.status(422).json({
            create_card_errors: errors,
        });
    } else {
        const newCard = new Card({
            text: cardText,
            owner: req.user.id
        });

        newCard
            .save()
            .then(card => {
                List.findOneAndUpdate({ _id: listId, users: req.user.id },
                    { $push: { cards: card } }
                )
                    .then(list => {
                        if (list) {
                            Card.findByIdAndUpdate(card.id, { $set: { users: list.users } })
                                .then(updatedCard => {
                                    updatedCard.users.push(list.users);
                                    res.status(201).json({
                                        message: `Card with text ${cardText} has been created`,
                                        card: updatedCard
                                    });
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

exports.deleteCard = (req, res) => {
    const { cardId } = req.params;

    let errors = [];

    switch (true) {
        case !cardId:
            errors.push({ msg: 'Please enter card id param' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(422).json({
            delete_card_errors: errors,
        });
    } else {
        Card.findOne({ '_id': cardId, users: req.user.id })
            .then(card => {
                if (card) {
                    card.remove()
                        .then(() => {
                            res.status(200).json({
                                message: `Card has been successfully deleted`
                            });
                        });
                } else {
                    res.status(404).json({
                        message: `Cant find card`
                    });
                }
            });
    }
};