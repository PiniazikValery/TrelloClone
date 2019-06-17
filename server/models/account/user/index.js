const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userProfile = require('../userProfile');

const UserSchema = new mongoose.Schema({
    name: String,
    userid: String,
    email: String,
    password: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    updated_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function hashPassword(next) {
    if (this.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                this.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.pre('save', function hashPassword(next) {
    userProfile.create(this.profile);
    next();
});

module.exports = mongoose.model('User', UserSchema);