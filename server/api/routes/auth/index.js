const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authentication');
const authApiController = require('../../controllers/authController');
const userApiController = require('../../controllers/userController');
const passportGoogle = require('../../../passportStrategies/googleStrategy');
const googleAuth = passportGoogle.authenticate('google', { scope: ['profile'] });
const config = require('../../../config');

router.post('/register', authApiController.registerUser);
router.post('/login', authApiController.loginUser, authApiController.successLogin);
router.post('/logout', authApiController.logoutUser);
router.get('/auth/google', authMiddleware.addSocketIdtoSession, googleAuth);
router.get('/auth/google/callback', googleAuth, authApiController.googleLogin);
router.get('/failurelogin', authApiController.failureLogin);
router.get('/isauthenticated', authApiController.is_user_authenticated, userApiController.getUser);

module.exports = router;