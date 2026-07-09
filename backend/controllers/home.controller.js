const Home = require('../models/Home');

// @desc    Get Home settings
// @route   GET /api/home
// @access  Public
exports.getHomeSettings = async (req, res, next) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      // Create default settings if none exist
      home = await Home.create({});
    }
    res.status(200).json({ success: true, data: home });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Home settings
// @route   PUT /api/home
// @access  Private/Editor/Admin
exports.updateHomeSettings = async (req, res, next) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create(req.body);
    } else {
      home = await Home.findByIdAndUpdate(home._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: home });
  } catch (err) {
    next(err);
  }
};
