const express = require('express');
const router = express.Router();
const {
  getGallery,
  uploadGalleryImage,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
router.post('/', protect, adminOnly, upload.single('imageFile'), uploadGalleryImage);

module.exports = router;
