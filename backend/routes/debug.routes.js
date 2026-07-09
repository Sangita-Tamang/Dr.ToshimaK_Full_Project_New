const express = require('express');
const { getStats } = require('../controllers/debug.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', protect, authorize('admin', 'editor'), getStats);

module.exports = router;
