const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerStudent,
  getCurrentUser,
  updateProfile,
  requestProfileEdit,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerStudent);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.post('/request-edit', protect, requestProfileEdit);

module.exports = router;
