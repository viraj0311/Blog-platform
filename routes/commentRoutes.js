const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate, schemas } = require('../middleware/validationMiddleware');

router.post('/addComment', authMiddleware, commentController.addComment);
router.get('/getComment', commentController.getComments);

module.exports = router;