const express = require('express');
const router = express.Router();
const cardController = require('../../controllers/cardController');
const authMiddleware = require('../../middlewares/authentication');

router.post('/', authMiddleware.requiresAuthentication, cardController.createCard);
router.put('/:cardId', authMiddleware.requiresAuthentication, cardController.renameCard);
router.delete('/:cardId', authMiddleware.requiresAuthentication, cardController.deleteCard);

module.exports = router;