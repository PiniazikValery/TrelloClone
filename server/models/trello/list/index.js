const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: String,    
    cards: [{
        cardId: mongoose.Schema.Types.ObjectId
    }],
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('List', ListSchema);