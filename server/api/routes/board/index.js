const express = require('express');
const router = express.Router();
const boardController = require('../../controllers/boardController');
const authMiddleware = require('../../middlewares/authentication');


router.get('/avaliable', authMiddleware.requiresAuthentication, boardController.getAvaliableBoards);
router.put('/drag', authMiddleware.requiresAuthentication, boardController.performeDrag);
router.post('/', authMiddleware.requiresAuthentication, boardController.createBoard);
router.put('/:boardId', authMiddleware.requiresAuthentication, boardController.renameBoard);
router.get('/:boardId', authMiddleware.requiresAuthentication, boardController.getBoardById);
router.delete('/:boardId', authMiddleware.requiresAuthentication, boardController.deleteBoard);

module.exports = router;