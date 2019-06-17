const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    description: String,
    avatar: mongoose.Schema.Types.ObjectId,
    shortName: String
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);