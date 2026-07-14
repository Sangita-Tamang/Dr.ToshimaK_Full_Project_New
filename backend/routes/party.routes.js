const express = require('express');
const { getPartySettings, updatePartySettings } = require('../controllers/party.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getPartySettings)
  .put(protect, authorize('admin', 'editor'), updatePartySettings);

module.exports = router;
