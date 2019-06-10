const mongoose = require('mongoose');
const Card = require('../card');

const ListSchema = new mongoose.Schema({
    title: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
}, { versionKey: false });

ListSchema.pre('remove', function deleteCards(next) {
    Card.deleteMany({ _id: { $in: this.cards } }).exec();
    next();
});

ListSchema.pre('remove', function (next) {
    const list = this;    
    list.model('Board').update(
        { lists: list._id },
        { $pull: { lists: list._id } },
        { multi: true },
        next
    );
});

module.exports = mongoose.model('List', ListSchema);