const InternshipProgram = require('../models/InternshipProgram');
const InternshipApplication = require('../models/InternshipApplication');

// @desc    Get all internship programs
// @route   GET /api/internships
// @access  Public
exports.getInternships = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.isFeatured) query.isFeatured = req.query.isFeatured === 'true';

    const programs = await InternshipProgram.find(query).sort('-createdAt');

    // Attach application count per program
    const programsWithCount = await Promise.all(
      programs.map(async (prog) => {
        const count = await InternshipApplication.countDocuments({ positionId: prog._id });
        return { ...prog.toObject(), applicationCount: count };
      })
    );

    res.status(200).json({ success: true, count: programs.length, data: programsWithCount });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single internship program
// @route   GET /api/internships/:id
// @access  Public
exports.getSingleInternship = async (req, res, next) => {
  try {
    const program = await InternshipProgram.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, error: 'Internship program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Create internship program
// @route   POST /api/internships
// @access  Private/Admin
exports.createInternship = async (req, res, next) => {
  try {
    const program = await InternshipProgram.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Update internship program
// @route   PUT /api/internships/:id
// @access  Private/Admin
exports.updateInternship = async (req, res, next) => {
  try {
    const program = await InternshipProgram.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!program) {
      return res.status(404).json({ success: false, error: 'Internship program not found' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete internship program
// @route   DELETE /api/internships/:id
// @access  Private/Admin
exports.deleteInternship = async (req, res, next) => {
  try {
    const program = await InternshipProgram.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, error: 'Internship program not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle internship program status (open/closed)
// @route   PATCH /api/internships/:id/status
// @access  Private/Admin
exports.toggleInternshipStatus = async (req, res, next) => {
  try {
    const program = await InternshipProgram.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, error: 'Internship program not found' });
    }
    program.status = req.body.status || (program.status === 'Open' ? 'Closed' : 'Open');
    await program.save();
    res.status(200).json({ success: true, data: program });
  } catch (err) {
    next(err);
  }
};

// @desc    Get dashboard stats for internships
// @route   GET /api/internships/stats
// @access  Private/Admin
exports.getInternshipStats = async (req, res, next) => {
  try {
    const totalPrograms = await InternshipProgram.countDocuments();
    const activePrograms = await InternshipProgram.countDocuments({ status: 'Open' });
    const closedPrograms = await InternshipProgram.countDocuments({ status: 'Closed' });
    const totalApplications = await InternshipApplication.countDocuments();
    const pendingApplications = await InternshipApplication.countDocuments({ status: 'Pending' });
    const underReview = await InternshipApplication.countDocuments({ status: 'Under Review' });
    const shortlisted = await InternshipApplication.countDocuments({ status: 'Shortlisted' });
    const accepted = await InternshipApplication.countDocuments({ status: 'Accepted' });
    const rejected = await InternshipApplication.countDocuments({ status: 'Rejected' });

    res.status(200).json({
      success: true,
      data: {
        totalPrograms, activePrograms, closedPrograms,
        totalApplications, pendingApplications, underReview,
        shortlisted, accepted, rejected
      }
    });
  } catch (err) {
    next(err);
  }
};
