const express = require('express');
const { login, register } = require('../controllers/authController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/register', authMiddleware, isAdmin, register); // Admin-only
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
