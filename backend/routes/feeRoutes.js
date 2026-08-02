const express = require('express');
const router = express.Router();
const { processFeePayment, getReceipts } = require('../controllers/feeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/pay', protect, processFeePayment);
router.get('/receipts', protect, getReceipts);

module.exports = router;
