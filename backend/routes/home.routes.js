const express = require('express');
const { getHomeSettings, updateHomeSettings } = require('../controllers/home.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getHomeSettings)
  .put(protect, authorize('admin', 'editor'), updateHomeSettings);

module.exports = router;
