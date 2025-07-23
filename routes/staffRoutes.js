const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Admin: get all staff
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  const staff = await User.find({ role: 'staff' }).select('-passwordHash');
  res.json(staff);
});

// Admin: delete staff
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Staff removed' });
});

module.exports = router;
