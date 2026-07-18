const Parliament = require('../models/Parliament');
const { getHeroUrl, normalizeImageUrl, IMAGE_PUBLIC_IDS } = require('../services/cloudinary.service');

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

    const data = parliament.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    data.speeches = data.speeches.map((speech) => ({ ...speech, imageUrl: normalizeImageUrl(speech.imageUrl, { width: 800, height: 500, crop: 'fill', gravity: 'auto' }) }));
    res.status(200).json({ success: true, data, cloudinaryImages });
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
    const data = parliament.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
