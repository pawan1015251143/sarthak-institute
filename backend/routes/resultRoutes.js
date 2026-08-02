const express = require('express');
const router = express.Router();
const {
  getResults,
  submitTestAttempt,
} = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getResults);
router.post('/submit', protect, submitTestAttempt);

module.exports = router;
