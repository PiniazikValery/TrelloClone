const express = require('express');
const router = express.Router();
const boardController = require('../../controllers/boardController');
const authMiddleware = require('../../middlewares/authentication');


router.get('/avaliable', authMiddleware.requiresAuthentication, boardController.getAvaliableBoards);
router.post('/board', authMiddleware.requiresAuthentication, boardController.createBoard);
router.get('/board', authMiddleware.requiresAuthentication, boardController.getBoardById);
router.post('/list', authMiddleware.requiresAuthentication, boardController.createList);
router.post('/card', authMiddleware.requiresAuthentication, boardController.createCard);

module.exports = router;