const Media = require('../models/Media');
const {
  getGalleryImageUrl,
  IMAGE_PUBLIC_IDS,
  getHeroUrl,
} = require('../services/cloudinary.service');

// @desc    Get all media items
// @route   GET /api/media
// @access  Public
exports.getMediaList = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    query = Media.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-publishedDate');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const total = await Media.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);
    const media = await query;

    // Inject Cloudinary image URLs for fallback thumbnails
    const cloudinaryImages = {
      heroImage: getHeroUrl(IMAGE_PUBLIC_IDS.image12),
      thumbnails: [
        getGalleryImageUrl(12), // img12 - interviews
        getGalleryImageUrl(1),  // img1
        getGalleryImageUrl(4),  // img4
        getGalleryImageUrl(11), // img11 - TV
        getGalleryImageUrl(6),  // img6 - speeches
        getGalleryImageUrl(8),  // img8
        getGalleryImageUrl(2),  // img2
        getGalleryImageUrl(13), // img13 - interviews
      ],
    };

    res.status(200).json({
      success: true,
      count: media.length,
      total,
      cloudinaryImages,
      data: media
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Get single media item
// @route   GET /api/media/:id
// @access  Public
exports.getMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media item not found' });
    }
    res.status(200).json({ success: true, data: media });
  } catch (err) {
    next(err);
  }
};

// @desc    Create media item
// @route   POST /api/media
// @access  Private/Editor/Admin
exports.createMedia = async (req, res, next) => {
  try {
    const media = await Media.create(req.body);
    res.status(201).json({ success: true, data: media });
  } catch (err) {
    next(err);
  }
};

// @desc    Update media item
// @route   PUT /api/media/:id
// @access  Private/Editor/Admin
exports.updateMedia = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media item not found' });
    }
    res.status(200).json({ success: true, data: media });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete media item
// @route   DELETE /api/media/:id
// @access  Private/Editor/Admin
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, error: 'Media item not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
