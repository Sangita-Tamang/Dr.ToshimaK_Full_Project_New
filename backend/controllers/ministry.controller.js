const Ministry = require('../models/Ministry');
const {
  getHeroUrl,
  getContributionImageUrl,
  normalizeImageUrl,
  IMAGE_PUBLIC_IDS,
} = require('../services/cloudinary.service');

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

    // Inject optimized Cloudinary image URLs
    // contributionImages maps to images 1–8 (matching the CONTRIBUTIONS array on the frontend)
    const cloudinaryImages = {
      heroImage: getHeroUrl(IMAGE_PUBLIC_IDS.ministryHero),
      contributionImages: Array.from({ length: 8 }, (_, i) =>
        getContributionImageUrl(i + 1)
      ),
    };

    const data = ministry.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    data.contributions = data.contributions.map((item) => ({
      ...item,
      image: normalizeImageUrl(item.image, { width: 720, height: 480, crop: 'fill', gravity: 'auto' }),
    }));
    res.status(200).json({ success: true, data, cloudinaryImages });
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
    const data = ministry.toObject();
    data.hero.image = normalizeImageUrl(data.hero.image, { width: 1920, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
