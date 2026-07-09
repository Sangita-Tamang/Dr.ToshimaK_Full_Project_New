const express = require('express');
const {
  submitApplication,
  getApplications,
  getSingleApplication,
  updateApplicationStatus,
  addNotes,
  sendEmail,
  deleteApplication
} = require('../controllers/internship-application.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public
router.post('/', submitApplication);

// Admin only
router.get('/', protect, authorize('admin'), getApplications);
router.get('/:id', protect, authorize('admin'), getSingleApplication);
router.patch('/:id/status', protect, authorize('admin'), updateApplicationStatus);
router.post('/:id/notes', protect, authorize('admin'), addNotes);
router.post('/:id/email', protect, authorize('admin'), sendEmail);
router.delete('/:id', protect, authorize('admin'), deleteApplication);

module.exports = router;
