const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin', 'editor'), createBlog);

router.route('/:id')
  .get(getBlog)
  .put(protect, authorize('admin', 'editor'), updateBlog)
  .delete(protect, authorize('admin', 'editor'), deleteBlog);

module.exports = router;
