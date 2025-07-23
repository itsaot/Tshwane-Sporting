const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  requestPasswordReset
} = require('../controllers/authController');



router.post('/login', login);
router.post('/register', authMiddleware, isAdmin, register); // Admin-only
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
