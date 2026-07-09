const express = require('express');
const { getGalleryList, getGalleryItem, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/gallery.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getGalleryList)
  .post(protect, authorize('admin', 'editor'), createGalleryItem);

router.route('/:id')
  .get(getGalleryItem)
  .put(protect, authorize('admin', 'editor'), updateGalleryItem)
  .delete(protect, authorize('admin', 'editor'), deleteGalleryItem);

module.exports = router;
