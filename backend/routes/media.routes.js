const express = require('express');
const { getMediaList, getMedia, createMedia, updateMedia, deleteMedia } = require('../controllers/media.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMediaList)
  .post(protect, authorize('admin', 'editor'), createMedia);

router.route('/:id')
  .get(getMedia)
  .put(protect, authorize('admin', 'editor'), updateMedia)
  .delete(protect, authorize('admin', 'editor'), deleteMedia);

module.exports = router;
