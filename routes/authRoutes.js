const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validationMiddleware');

router.post('/register', validate(schemas.registration), authController.register);
router.post('/login', validate(schemas.login), authController.login);
router.post('/forgot-password', validate(schemas.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(schemas.resetPassword), authController.resetPassword);


module.exports = router;