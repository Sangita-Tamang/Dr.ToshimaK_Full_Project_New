const Parliament = require('../models/Parliament');
const { getHeroUrl, IMAGE_PUBLIC_IDS } = require('../services/cloudinary.service');

// @desc    Get Parliament settings
// @route   GET /api/parliament
// @access  Public
exports.getParliamentSettings = async (req, res, next) => {
  try {
    let parliament = await Parliament.findOne();
    if (!parliament) {
      // Create default settings if none exist
      parliament = await Parliament.create({});
    }

    // Inject optimized Cloudinary image URLs
    const cloudinaryImages = {
      heroImage: getHeroUrl(IMAGE_PUBLIC_IDS.parliamentHero),
    };

    res.status(200).json({ success: true, data: parliament, cloudinaryImages });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Parliament settings
// @route   PUT /api/parliament
// @access  Private/Editor/Admin
exports.updateParliamentSettings = async (req, res, next) => {
  try {
    let parliament = await Parliament.findOne();
    if (!parliament) {
      parliament = await Parliament.create(req.body);
    } else {
      parliament = await Parliament.findByIdAndUpdate(parliament._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: parliament });
  } catch (err) {
    next(err);
  }
};
