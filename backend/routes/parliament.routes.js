const express = require('express');
const { getParliamentSettings, updateParliamentSettings } = require('../controllers/parliament.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getParliamentSettings)
  .put(protect, authorize('admin', 'editor'), updateParliamentSettings);

module.exports = router;
