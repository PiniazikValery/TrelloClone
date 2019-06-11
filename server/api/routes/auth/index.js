const express = require('express');
const router = express.Router();
const authApiController = require('../../controllers/authController');
const passportGoogle = require('../../../passportStrategies/googleStrategy');
const config = require('../../../config');

router.post('/register', authApiController.registerUser);
router.post('/login', authApiController.loginUser, authApiController.successLogin);
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passportGoogle.authenticate('google', {
    failureRedirect: `${config.get('clientAddress')}/user/login`
}), authApiController.successSocialLogin);
router.get('/failurelogin', authApiController.failureLogin);
router.get('/isauthenticated', authApiController.is_user_authenticated);

module.exports = router;