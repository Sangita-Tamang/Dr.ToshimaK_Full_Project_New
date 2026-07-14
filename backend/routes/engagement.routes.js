const express = require('express');
const {
  getUpcomingEngagement,
  getAllEngagements,
  createEngagement,
  updateEngagement,
  deleteEngagement
} = require('../controllers/engagement.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/upcoming', getUpcomingEngagement);

router.route('/')
  .get(protect, authorize('admin', 'editor'), getAllEngagements)
  .post(protect, authorize('admin', 'editor'), createEngagement);

router.route('/:id')
  .put(protect, authorize('admin', 'editor'), updateEngagement)
  .delete(protect, authorize('admin', 'editor'), deleteEngagement);

module.exports = router;
