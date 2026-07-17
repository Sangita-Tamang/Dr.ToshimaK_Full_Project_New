const express = require('express');
const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityStats,
  getFeaturedActivities
} = require('../controllers/parliament-activity.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/activities', getActivities);
router.get('/activities/stats', getActivityStats);
router.get('/activities/featured', getFeaturedActivities);
router.get('/activities/:id', getActivity);

// Protected routes (Admin only)
router.post('/activities', protect, authorize('admin'), createActivity);
router.put('/activities/:id', protect, authorize('admin'), updateActivity);
router.delete('/activities/:id', protect, authorize('admin'), deleteActivity);

module.exports = router;
