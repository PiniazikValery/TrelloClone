const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/account/user');

passport.use(new GoogleStrategy({
    clientID: "615285115671-qemmmfs1a3elq97jpji5lg86kuqtblk9.apps.googleusercontent.com",
    clientSecret: "4W5Ex6ly1R7f3AiUM1RsbZ-6",
    callbackURL: "/user/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ userid: profile.id }, (find_user_err, found_user) => {
            if (!found_user) {
                User.create({ name: profile.displayName, userid: profile.id }, (create_user_err, created_user) => {
                    return done(create_user_err, created_user)
                });
            } else {                
                return done(find_user_err, found_user);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});


passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;
