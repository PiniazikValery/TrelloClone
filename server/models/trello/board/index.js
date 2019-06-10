const mongoose = require('mongoose');
const List = require('../list');
const async = require('async');

const BoardSchema = new mongoose.Schema({
    boardName: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],
}, { versionKey: false });

BoardSchema.pre('remove', { query: true }, function deleteLists(nextAction) {
    async.each(this.lists, function (listId, next) {
        List.findById(listId).exec((err, list) => {
            list.remove();
            next();
        });
    }, () => { nextAction() });
});

module.exports = mongoose.model('Board', BoardSchema);