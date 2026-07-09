const express = require('express');
const {
  getInternships,
  getSingleInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  toggleInternshipStatus,
  getInternshipStats
} = require('../controllers/internship.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', protect, authorize('admin'), getInternshipStats);

router.route('/')
  .get(getInternships)
  .post(protect, authorize('admin'), createInternship);

router.route('/:id')
  .get(getSingleInternship)
  .put(protect, authorize('admin'), updateInternship)
  .delete(protect, authorize('admin'), deleteInternship);

router.patch('/:id/status', protect, authorize('admin'), toggleInternshipStatus);

module.exports = router;
