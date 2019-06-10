const express = require('express');
const router = express.Router();
const listController = require('../../controllers/listController');
const authMiddleware = require('../../middlewares/authentication');

router.post('/', authMiddleware.requiresAuthentication, listController.createList);
router.put('/:listId', authMiddleware.requiresAuthentication, listController.renameList);
router.delete('/:listId', authMiddleware.requiresAuthentication, listController.deleteList);

module.exports = router;
