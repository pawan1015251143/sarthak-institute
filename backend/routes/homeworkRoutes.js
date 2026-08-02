const express = require('express');
const router = express.Router();
const {
  getHomeworks,
  createHomework,
} = require('../controllers/homeworkController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getHomeworks);
router.post('/', protect, adminOnly, createHomework);

module.exports = router;
