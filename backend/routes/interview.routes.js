const express = require('express');
const { submitInterviewRequest, getInterviewRequests, updateInterviewStatus, deleteInterviewRequest } = require('../controllers/interview.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(submitInterviewRequest)
  .get(protect, authorize('admin', 'editor'), getInterviewRequests);

router.route('/:id')
  .put(protect, authorize('admin', 'editor'), updateInterviewStatus)
  .delete(protect, authorize('admin'), deleteInterviewRequest);

module.exports = router;
