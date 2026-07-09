const Ministry = require('../models/Ministry');

// @desc    Get Ministry settings
// @route   GET /api/ministry
// @access  Public
exports.getMinistrySettings = async (req, res, next) => {
  try {
    let ministry = await Ministry.findOne();
    if (!ministry) {
      // Create default settings if none exist
      ministry = await Ministry.create({});
    }
    res.status(200).json({ success: true, data: ministry });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Ministry settings
// @route   PUT /api/ministry
// @access  Private/Editor/Admin
exports.updateMinistrySettings = async (req, res, next) => {
  try {
    let ministry = await Ministry.findOne();
    if (!ministry) {
      ministry = await Ministry.create(req.body);
    } else {
      ministry = await Ministry.findByIdAndUpdate(ministry._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: ministry });
  } catch (err) {
    next(err);
  }
};
