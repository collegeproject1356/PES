const express = require('express');
const router = express.Router();
const { login, googleLogin, forgotPassword, register, resetPassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:token', resetPassword); 

module.exports = router;