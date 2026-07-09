const express = require('express');
const { getMinistrySettings, updateMinistrySettings } = require('../controllers/ministry.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMinistrySettings)
  .put(protect, authorize('admin', 'editor'), updateMinistrySettings);

module.exports = router;
