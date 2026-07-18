const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, 'Please add a blog title in English']
  },
  titleNp: {
    type: String
  },
  contentEn: {
    type: String,
    required: [true, 'Please add blog content in English']
  },
  contentNp: {
    type: String
  },
  summaryEn: String,
  summaryNp: String,
  authorEn: {
    type: String,
    default: 'Dr. Toshima Karki'
  },
  authorNp: {
    type: String,
    default: 'डा. तोषिमा कार्की'
  },
  authorImage: {
    type: String,
    default: 'dr-tk/image4'
  },
  image: {
    type: String,
    default: 'dr-tk/image1'
  },
  category: {
    type: String,
    default: 'Healthcare'
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  views: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
