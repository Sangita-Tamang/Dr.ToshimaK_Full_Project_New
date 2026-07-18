const Party = require('../models/Party');
const {
  getHeroUrl,
  getPortraitUrl,
  normalizeImageUrl,
  IMAGE_PUBLIC_IDS,
} = require('../services/cloudinary.service');

// @desc    Get Party page settings
// @route   GET /api/party
// @access  Public
exports.getPartySettings = async (req, res, next) => {
  try {
    let party = await Party.findOne();
    if (!party) {
      party = await Party.create({});
    }

    // Inject optimized Cloudinary image URLs
    const cloudinaryImages = {
      heroImage:       getHeroUrl(IMAGE_PUBLIC_IDS.partyHero),
      fallbackPortrait: getPortraitUrl(IMAGE_PUBLIC_IDS.image10),
    };

    const data = party.toObject();
    data.hero.backgroundImage = normalizeImageUrl(data.hero.backgroundImage, { width: 1920, crop: 'fill', gravity: 'auto' });
    data.hero.logoImage = normalizeImageUrl(data.hero.logoImage, { width: 500, crop: 'fit' });
    data.leadership = data.leadership.map((member) => ({ ...member, photo: normalizeImageUrl(member.photo, { width: 600, height: 600, crop: 'fill', gravity: 'face' }) }));
    data.gallery = data.gallery.map((item) => ({ ...item, mediaUrl: normalizeImageUrl(item.mediaUrl, { width: 800, crop: 'fill', gravity: 'auto' }) }));
    data.latestNews = data.latestNews.map((item) => ({ ...item, image: normalizeImageUrl(item.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' }) }));
    data.seo.ogImage = normalizeImageUrl(data.seo.ogImage, { width: 1200, crop: 'fill', gravity: 'auto' });
    data.seo.twitterImage = normalizeImageUrl(data.seo.twitterImage, { width: 1200, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data, cloudinaryImages });
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
    const data = party.toObject();
    data.hero.backgroundImage = normalizeImageUrl(data.hero.backgroundImage, { width: 1920, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
