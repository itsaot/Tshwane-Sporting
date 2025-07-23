const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createGalleryItem, getGallery, likeImage } = require('../controllers/galleryController');

// View gallery
router.get('/', authMiddleware, getGallery);

// Admin-only: upload image
router.post('/', authMiddleware, isAdmin, upload.single('image'), createGalleryItem);

// Like an image
router.post('/:id/like', authMiddleware, likeImage);

module.exports = router;
