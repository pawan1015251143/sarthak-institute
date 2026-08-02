const express = require('express');
const router = express.Router();
const {
  getPendingRegistrations,
  approveRegistration,
  rejectRegistration,
  getProfileEditRequests,
  approveProfileEdit,
  rejectProfileEdit,
  getAdminStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// All admin endpoints require protect + adminOnly
router.use(protect, adminOnly);

router.get('/pending-registrations', getPendingRegistrations);
router.post('/approve-registration/:id', approveRegistration);
router.post('/reject-registration/:id', rejectRegistration);

router.get('/profile-edit-requests', getProfileEditRequests);
router.post('/approve-profile-edit/:id', approveProfileEdit);
router.post('/reject-profile-edit/:id', rejectProfileEdit);

router.get('/stats', getAdminStats);

module.exports = router;
