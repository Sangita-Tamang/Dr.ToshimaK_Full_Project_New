const About = require('../models/About');
const {
  getHeroUrl,
  getPortraitUrl,
  getBannerUrl,
  getGalleryUrl,
  IMAGE_PUBLIC_IDS,
} = require('../services/cloudinary.service');

// @desc    Get About page settings
// @route   GET /api/about
// @access  Public
exports.getAboutSettings = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default settings if none exist
      about = await About.create({});
    }

    // Inject optimized Cloudinary image URLs
    const cloudinaryImages = {
      heroImage:       getHeroUrl(IMAGE_PUBLIC_IDS.aboutHero),
      profileImage:    getPortraitUrl(IMAGE_PUBLIC_IDS.image5),
      quoteBgImage:    getBannerUrl(IMAGE_PUBLIC_IDS.image3),
      lookingAheadImage: getGalleryUrl(IMAGE_PUBLIC_IDS.image6),
      storyImage:      getPortraitUrl(IMAGE_PUBLIC_IDS.image4),
    };

    res.status(200).json({ success: true, data: about, cloudinaryImages });
  } catch (err) {
    next(err);
  }
};

// @desc    Update About page settings
// @route   PUT /api/about
// @access  Private/Editor/Admin
exports.updateAboutSettings = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: about });
  } catch (err) {
    next(err);
  }
};
