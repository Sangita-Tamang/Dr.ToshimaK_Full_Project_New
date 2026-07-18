const Blog = require('../models/Blog');
const { normalizeImageUrl } = require('../services/cloudinary.service');

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    
    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    query = Blog.find(JSON.parse(queryStr));

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-publishedDate');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const startIndex = (page - 1) * limit;
    const total = await Blog.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const blogs = await query;

    // Pagination result
    const pagination = {};
    if (startIndex + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      pagination,
      data: blogs.map((item) => {
        const data = item.toObject();
        data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
        data.authorImage = normalizeImageUrl(data.authorImage, { width: 160, height: 160, crop: 'fill', gravity: 'face' });
        return data;
      })
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog post
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    const data = blog.toObject();
    data.image = normalizeImageUrl(data.image, { width: 1200, height: 675, crop: 'fill', gravity: 'auto' });
    data.authorImage = normalizeImageUrl(data.authorImage, { width: 160, height: 160, crop: 'fill', gravity: 'face' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Create blog post
// @route   POST /api/blogs
// @access  Private/Editor/Admin
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    const data = blog.toObject();
    data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private/Editor/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    const data = blog.toObject();
    data.image = normalizeImageUrl(data.image, { width: 800, height: 500, crop: 'fill', gravity: 'auto' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Editor/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
