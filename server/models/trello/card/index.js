const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    text: String
}, { versionKey: false });

CardSchema.pre('remove', function (next) {
    const card = this;    
    card.model('List').update(
        { cards: card._id },
        { $pull: { cards: card._id } },
        { multi: true },
        next
    );
});

module.exports = mongoose.model('Card', CardSchema);