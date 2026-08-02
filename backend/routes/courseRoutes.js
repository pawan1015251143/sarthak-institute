const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, adminOnly, createCourse);

module.exports = router;
