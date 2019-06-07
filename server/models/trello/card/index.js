const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('Card', CardSchema);