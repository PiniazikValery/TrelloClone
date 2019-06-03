const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    userid: String,
    email: String,
    password: String,
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

module.exports = mongoose.model('User', UserSchema);