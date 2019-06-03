const express = require('express');
const router = express.Router();
const authApiController = require('../../controllers/authController');
const passportGoogle = require('../../../passportStrategies/googleStrategy');
const config = require('../../../config');
const authMiddleware = require('../../middlewares/authentication');

router.post('/register', authApiController.registerUser);
router.post('/login', authApiController.loginUser, authApiController.successLogin);
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passportGoogle.authenticate('google', {
    failureRedirect: `${config.get('clientAddress')}/user/login`
}), authApiController.successSocialLogin);
router.get('/failurelogin', authApiController.failureLogin);

module.exports = router;