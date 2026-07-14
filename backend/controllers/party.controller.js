const Party = require('../models/Party');

// @desc    Get Party page settings
// @route   GET /api/party
// @access  Public
exports.getPartySettings = async (req, res, next) => {
  try {
    let party = await Party.findOne();
    if (!party) {
      party = await Party.create({});
    }
    res.status(200).json({ success: true, data: party });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Party page settings
// @route   PUT /api/party
// @access  Private/Editor/Admin
exports.updatePartySettings = async (req, res, next) => {
  try {
    let party = await Party.findOne();
    if (!party) {
      party = await Party.create(req.body);
    } else {
      req.body.updatedAt = Date.now();
      party = await Party.findByIdAndUpdate(party._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: party });
  } catch (err) {
    next(err);
  }
};
