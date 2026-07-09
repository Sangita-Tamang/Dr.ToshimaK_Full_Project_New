const InternshipApplication = require('../models/InternshipApplication');

// @desc    Submit internship application (public)
// @route   POST /api/internship-applications
// @access  Public
exports.submitApplication = async (req, res, next) => {
  try {
    const application = await InternshipApplication.create(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all internship applications
// @route   GET /api/internship-applications
// @access  Private/Admin
exports.getApplications = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.positionTitle) query.positionTitle = { $regex: req.query.positionTitle, $options: 'i' };
    if (req.query.university) query.university = { $regex: req.query.university, $options: 'i' };
    if (req.query.search) {
      query.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { positionTitle: { $regex: req.query.search, $options: 'i' } },
        { university: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const applications = await InternshipApplication.find(query)
      .populate('positionId', 'titleEn department')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single application
// @route   GET /api/internship-applications/:id
// @access  Private/Admin
exports.getSingleApplication = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id)
      .populate('positionId', 'titleEn titleNp department');
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Update application status
// @route   PATCH /api/internship-applications/:id/status
// @access  Private/Admin
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    application.status = req.body.status;
    await application.save();
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Add admin notes to application
// @route   POST /api/internship-applications/:id/notes
// @access  Private/Admin
exports.addNotes = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    application.adminNotes = req.body.notes;
    await application.save();
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Send email notification (simulated — stores record)
// @route   POST /api/internship-applications/:id/email
// @access  Private/Admin
exports.sendEmail = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    application.emailsSent.push({
      type: req.body.type,
      subject: req.body.subject,
      body: req.body.body,
      sentAt: new Date()
    });
    await application.save();
    res.status(200).json({ success: true, message: 'Email logged successfully', data: application });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete application
// @route   DELETE /api/internship-applications/:id
// @access  Private/Admin
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
