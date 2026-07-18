const Home = require('../models/Home');
const { getHeroUrl, normalizeImageUrl, IMAGE_PUBLIC_IDS } = require('../services/cloudinary.service');

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

    // Inject optimized Cloudinary image URLs
    const cloudinaryImages = {
      heroImage: getHeroUrl(IMAGE_PUBLIC_IDS.homeHero),
    };

    const data = home.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data, cloudinaryImages });
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
    const data = home.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
