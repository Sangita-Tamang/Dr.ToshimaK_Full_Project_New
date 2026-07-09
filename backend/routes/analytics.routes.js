const express = require('express');
const { getAnalyticsSummary } = require('../controllers/analytics.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin', 'editor'), getAnalyticsSummary);

module.exports = router;
