const User = require('../../../models/account/user');
const passportLocal = require('../../../passportStrategies/localStrategy');
const config = require('../../../config');

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
                    password
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
        failureRedirect: '/user/failurelogin'
    })(req, res, next);
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

exports.successSocialLogin = (req, res, next) => {
    res.cookie('isAuthenticated', true);
    res.redirect(`${config.get("clientAddress")}/home`);
};
