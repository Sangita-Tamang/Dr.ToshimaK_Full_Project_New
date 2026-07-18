const ParliamentActivity = require('../models/ParliamentActivity');
const { normalizeImageUrl } = require('../services/cloudinary.service');

const withImageUrl = (activity, options = { width: 800, height: 500, crop: 'fill', gravity: 'auto' }) => {
  const data = activity.toObject ? activity.toObject() : activity;
  data.image = normalizeImageUrl(data.image, options);
  return data;
};

// @desc    Get all parliament activities with filtering
// @route   GET /api/parliament/activities
// @access  Public
exports.getActivities = async (req, res, next) => {
  try {
    const { 
      tenure, 
      category, 
      year, 
      search, 
      featured,
      limit = 20,
      page = 1,
      sort = '-date'
    } = req.query;

    // Build query
    const query = { published: true };

    if (tenure) {
      query.tenure = tenure;
    }

    if (category) {
      query['category.en'] = category;
    }

    if (year) {
      query.year = parseInt(year);
    }

    if (featured) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.ne': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.ne': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const activities = await ParliamentActivity
      .find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await ParliamentActivity.countDocuments(query);

    res.status(200).json({
      success: true,
      count: activities.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: activities.map(withImageUrl)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single parliament activity
// @route   GET /api/parliament/activities/:id
// @access  Public
exports.getActivity = async (req, res, next) => {
  try {
    const activity = await ParliamentActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Increment views
    await activity.incrementViews();

    res.status(200).json({
      success: true,
      data: withImageUrl(activity, { width: 1200, height: 675, crop: 'fill', gravity: 'auto' })
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create parliament activity
// @route   POST /api/parliament/activities
// @access  Private/Admin
exports.createActivity = async (req, res, next) => {
  try {
    // Extract year from date if not provided
    if (!req.body.year && req.body.date) {
      req.body.year = new Date(req.body.date).getFullYear();
    }

    const activity = await ParliamentActivity.create(req.body);

    res.status(201).json({
      success: true,
      data: withImageUrl(activity)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update parliament activity
// @route   PUT /api/parliament/activities/:id
// @access  Private/Admin
exports.updateActivity = async (req, res, next) => {
  try {
    // Extract year from date if not provided
    if (!req.body.year && req.body.date) {
      req.body.year = new Date(req.body.date).getFullYear();
    }

    req.body.updatedAt = Date.now();

    const activity = await ParliamentActivity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      data: withImageUrl(activity)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete parliament activity
// @route   DELETE /api/parliament/activities/:id
// @access  Private/Admin
exports.deleteActivity = async (req, res, next) => {
  try {
    const activity = await ParliamentActivity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Activity deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get activity statistics
// @route   GET /api/parliament/activities/stats
// @access  Public
exports.getActivityStats = async (req, res, next) => {
  try {
    const stats = await ParliamentActivity.aggregate([
      {
        $match: { published: true }
      },
      {
        $group: {
          _id: null,
          totalActivities: { $sum: 1 },
          totalViews: { $sum: '$views' },
          firstTenureCount: {
            $sum: { $cond: [{ $eq: ['$tenure', 'first'] }, 1, 0] }
          },
          secondTenureCount: {
            $sum: { $cond: [{ $eq: ['$tenure', 'second'] }, 1, 0] }
          }
        }
      }
    ]);

    // Get category counts
    const categoryCounts = await ParliamentActivity.aggregate([
      {
        $match: { published: true }
      },
      {
        $group: {
          _id: '$category.en',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overall: stats[0] || {
          totalActivities: 0,
          totalViews: 0,
          firstTenureCount: 0,
          secondTenureCount: 0
        },
        categories: categoryCounts
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured activities
// @route   GET /api/parliament/activities/featured
// @access  Public
exports.getFeaturedActivities = async (req, res, next) => {
  try {
    const { limit = 3 } = req.query;

    const activities = await ParliamentActivity
      .find({ published: true, featured: true })
      .sort('-date')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities.map(withImageUrl)
    });
  } catch (err) {
    next(err);
  }
};
