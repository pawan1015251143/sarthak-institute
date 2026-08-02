const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getNotes);
router.post('/', protect, adminOnly, upload.single('pdfFile'), createNote);
router.delete('/:id', protect, adminOnly, deleteNote);

module.exports = router;
