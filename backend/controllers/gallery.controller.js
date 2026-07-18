const Gallery = require('../models/Gallery');
const { getGalleryUrl, normalizeImageUrl } = require('../services/cloudinary.service');

/**
 * Transforms a Cloudinary URL or public ID into an optimized gallery URL.
 * If the value is already a full res.cloudinary.com URL, we leave it as-is
 * (the DB may already store optimized URLs). Otherwise we treat it as a public ID.
 */
const normalizeGalleryUrl = (mediaUrl) => {
  if (!mediaUrl) return mediaUrl;
  // Already a full Cloudinary URL — return unchanged
  return normalizeImageUrl(mediaUrl, { width: 800, crop: 'fill', gravity: 'auto' });
};


// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryList = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    query = Gallery.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-date');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const total = await Gallery.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);
    const items = await query;

    // Normalize each item's mediaUrl to an optimized Cloudinary URL
    const normalizedItems = items.map(item => {
      const obj = item.toObject();
      obj.mediaUrl = normalizeGalleryUrl(obj.mediaUrl);
      return obj;
    });

    res.status(200).json({
      success: true,
      count: normalizedItems.length,
      total,
      data: normalizedItems
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }
    const data = item.toObject();
    data.mediaUrl = normalizeGalleryUrl(data.mediaUrl);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Editor/Admin
exports.createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    const data = item.toObject();
    data.mediaUrl = normalizeGalleryUrl(data.mediaUrl);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Editor/Admin
exports.updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }
    const data = item.toObject();
    data.mediaUrl = normalizeGalleryUrl(data.mediaUrl);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Editor/Admin
exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
