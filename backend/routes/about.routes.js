const express = require('express');
const { getAboutSettings, updateAboutSettings } = require('../controllers/about.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAboutSettings)
  .put(protect, authorize('admin', 'editor'), updateAboutSettings);

module.exports = router;
