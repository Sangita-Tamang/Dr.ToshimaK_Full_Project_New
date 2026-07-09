const express = require('express');
const { getNews, getSingleNews, createNews, updateNews, deleteNews } = require('../controllers/news.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, authorize('admin', 'editor'), createNews);

router.route('/:id')
  .get(getSingleNews)
  .put(protect, authorize('admin', 'editor'), updateNews)
  .delete(protect, authorize('admin', 'editor'), deleteNews);

module.exports = router;
