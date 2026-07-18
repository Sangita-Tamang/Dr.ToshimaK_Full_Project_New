const express = require('express');
const router = express.Router();
const {
  getGalleryImages,
  getNewsImages,
  getBlogImages,
  getMediaImages,
} = require('../controllers/images.controller');

// GET /api/images/gallery — optimized Cloudinary URLs for all 15 gallery photos
router.get('/gallery', getGalleryImages);

// GET /api/images/news — optimized Cloudinary URLs for all 15 news images
router.get('/news', getNewsImages);

// GET /api/images/blogs — optimized Cloudinary URLs for blog images
router.get('/blogs', getBlogImages);

// GET /api/images/media — optimized Cloudinary URLs for media thumbnails
router.get('/media', getMediaImages);

module.exports = router;

