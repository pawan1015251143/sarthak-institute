const express = require('express');
const router = express.Router();
const {
  getAssignments,
  createAssignment,
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getAssignments);
router.post('/', protect, adminOnly, upload.single('pdfFile'), createAssignment);

module.exports = router;
