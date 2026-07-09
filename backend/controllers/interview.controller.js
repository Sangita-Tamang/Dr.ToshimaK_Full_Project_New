const Interview = require('../models/Interview');
const logger = require('../config/logger');

// @desc    Submit interview request
// @route   POST /api/interviews
// @access  Public
exports.submitInterviewRequest = async (req, res, next) => {
  try {
    const interview = await Interview.create(req.body);
    logger.info(`New interview request from ${interview.reporterName} representing ${interview.mediaOutlet}`);
    res.status(201).json({ success: true, data: interview });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all interview requests
// @route   GET /api/interviews
// @access  Private/Editor/Admin
exports.getInterviewRequests = async (req, res, next) => {
  try {
    let query;
    if (req.query.status) {
      query = Interview.find({ status: req.query.status });
    } else {
      query = Interview.find();
    }
    
    // Sort by proposed date
    query = query.sort('-proposedDate');
    
    const interviews = await query;
    res.status(200).json({ success: true, count: interviews.length, data: interviews });
  } catch (err) {
    next(err);
  }
};

// @desc    Update interview request status
// @route   PUT /api/interviews/:id
// @access  Private/Editor/Admin
exports.updateInterviewStatus = async (req, res, next) => {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!interview) {
      return res.status(404).json({ success: false, error: 'Interview request not found' });
    }
    res.status(200).json({ success: true, data: interview });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete interview request
// @route   DELETE /api/interviews/:id
// @access  Private/Admin
exports.deleteInterviewRequest = async (req, res, next) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, error: 'Interview request not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
