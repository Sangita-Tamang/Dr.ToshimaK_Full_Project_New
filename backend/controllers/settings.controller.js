const Settings = require('../models/Settings');
const { normalizeImageUrl } = require('../services/cloudinary.service');

const withImageUrls = (settings) => {
  const data = settings.toObject();
  data.logo = normalizeImageUrl(data.logo, { width: 300, crop: 'fit' });
  data.seo.ogImage = normalizeImageUrl(data.seo.ogImage, { width: 1200, crop: 'fill', gravity: 'auto' });
  data.seo.twitterCardImage = normalizeImageUrl(data.seo.twitterCardImage, { width: 1200, crop: 'fill', gravity: 'auto' });
  return data;
};

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, data: withImageUrls(settings) });
  } catch (err) {
    next(err);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ success: true, data: withImageUrls(settings) });
  } catch (err) {
    next(err);
  }
};
