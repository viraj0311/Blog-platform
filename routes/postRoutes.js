const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { validate, schemas } = require('../middleware/validationMiddleware');

router.post('/createPost', authMiddleware, validate(schemas.post), postController.createPost);
router.get('/getAllPost', postController.getAllPosts);
router.get('/getPostById', postController.getPostById);
router.put('/updatePost', authMiddleware, postController.updatePost);
router.delete('/deletePost', authMiddleware, roleMiddleware(['admin']), postController.deletePost);

module.exports = router;