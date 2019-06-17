const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/userController');
const authMiddleware = require('../../middlewares/authentication');
const AvatarStorage = require('../../../models/fileStorageFacilities/avatarStorage');
const avatarStorageMiddleware = require('../../middlewares/avatarStorage');

const avatarStorage = new AvatarStorage();

router.get('/profile', authMiddleware.requiresAuthentication, userApiController.getUser);
router.post(
    '/avatar',
    authMiddleware.requiresAuthentication,
    avatarStorage.getUpload().single('file'),
    avatarStorageMiddleware.handleMaxFileSizeError,
    avatarStorageMiddleware.handleFileUploadError,
    userApiController.uploadAvatar
);
router.get(
    '/avatar',
    authMiddleware.requiresAuthentication,
    userApiController.getUserAvatar
);
router.put(
    '/description',
    authMiddleware.requiresAuthentication,
    userApiController.setUserDescription
);

module.exports = router;