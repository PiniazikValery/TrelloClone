const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/account/user');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false);
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;