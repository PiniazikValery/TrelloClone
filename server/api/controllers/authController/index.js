const User = require('../../../models/account/user');
const userProfile = require('../../../models/account/userProfile');
const passportLocal = require('../../../passportStrategies/localStrategy');
const config = require('../../../config');
exports.is_user_authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({
            error: 'Authentication needed'
        });
    }
};

exports.registerUser = (req, res) => {
    const { email, name, password, password2 } = req.body;
    let errors = [];

    switch (true) {
        case !name || !email || !password || !password2:
            errors.push({ msg: 'Please enter all fields' });
            break;
        case password != password2:
            errors.push({ msg: 'Passwords do not match' });
            break;
        case password.length < 6:
            errors.push({ msg: 'Password must be at least 6 characters' });
            break;
        default:
            break;
    }

    if (errors.length > 0) {
        res.status(500).json({
            register_errors: errors,
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.status(500).json({
                    register_errors: errors,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    profile: new userProfile({
                        avatar: null,
                        description: 'No description',
                        shortName: name.match(/\b(\w)/g).join('').toUpperCase()
                    })
                });
                newUser
                    .save()
                    .then(user => {
                        res.status(201).json({
                            message: `User with name ${name} has been created`,
                        });
                    });
            }
        });
    }
};

exports.loginUser = (req, res, next) => {
    passportLocal.authenticate('local', {
        failureRedirect: '/api/user/failurelogin'
    })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
    req.logout();
    res.cookie('isAuthenticated', false);
    res.status(205).json({
        message: 'User successfully loged out'
    });
};

exports.failureLogin = (req, res, next) => {
    res.status(403).json({
        message: 'Failure login'
    });
};

exports.successLogin = (req, res, next) => {
    res.cookie('isAuthenticated', true);
    res.status(200).json({
        message: 'Success login'
    });
};

exports.googleLogin = (req, res, next) => {
    console.log('hit');
    res.cookie('isAuthenticated', true);
    const io = req.app.get('io');
    io.in(req.session.socketId).emit('successGoogleAuth');
    next();
};
