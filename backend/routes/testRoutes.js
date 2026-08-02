const express = require('express');
const router = express.Router();
const {
  getTests,
  createTest,
  deleteTest,
} = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getTests);
router.post('/', protect, adminOnly, createTest);
router.delete('/:id', protect, adminOnly, deleteTest);

module.exports = router;
