const express = require('express');
const router = express.Router();
const {
  getNotices,
  createNotice,
  deleteNotice,
} = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getNotices);
router.post('/', protect, adminOnly, createNotice);
router.delete('/:id', protect, adminOnly, deleteNotice);

module.exports = router;
