const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    lists: [{
        listId: mongoose.Schema.Types.ObjectId
    }],
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Board', BoardSchema);