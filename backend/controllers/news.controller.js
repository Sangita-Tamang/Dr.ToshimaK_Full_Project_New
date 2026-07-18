const News = require('../models/News');
const {
  getHeroUrl,
  getGalleryImageUrl,
  normalizeImageUrl,
  IMAGE_PUBLIC_IDS,
} = require('../services/cloudinary.service');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
exports.getNews = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    
    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    query = News.find(JSON.parse(queryStr));

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-publishedDate');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const startIndex = (page - 1) * limit;
    const total = await News.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const news = await query;

    // Pagination result
    const pagination = {};
    if (startIndex + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    // Inject Cloudinary image URLs
    const cloudinaryImages = {
      heroImage: getHeroUrl(IMAGE_PUBLIC_IDS.image13),
      newsImages: Array.from({ length: 15 }, (_, i) => getGalleryImageUrl(i + 1)),
    };

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      pagination,
      cloudinaryImages,
      data: news.map((item) => {
        const data = item.toObject();
        data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
        return data;
      })
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single news article
// @route   GET /api/news/:id
// @access  Public
exports.getSingleNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    const data = news.toObject();
    data.image = normalizeImageUrl(data.image, { width: 1200, height: 675, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Create news article
// @route   POST /api/news
// @access  Private/Editor/Admin
exports.createNews = async (req, res, next) => {
  try {
    const news = await News.create(req.body);
    const data = news.toObject();
    data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private/Editor/Admin
exports.updateNews = async (req, res, next) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    const data = news.toObject();
    data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private/Editor/Admin
exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
