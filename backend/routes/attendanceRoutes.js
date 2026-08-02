const express = require('express');
const router = express.Router();
const {
  getAttendance,
  recordAttendance,
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', protect, getAttendance);
router.post('/', protect, adminOnly, recordAttendance);

module.exports = router;
