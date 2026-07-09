const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, 'Please add a news title in English']
  },
  titleNp: {
    type: String
  },
  category: {
    type: String,
    default: 'General'
  },
  publisherEn: {
    type: String,
    default: 'Official News'
  },
  publisherNp: {
    type: String,
    default: 'आधिकारिक समाचार'
  },
  contentEn: {
    type: String,
    required: [true, 'Please add English news content']
  },
  contentNp: {
    type: String
  },
  image: {
    type: String,
    default: '/image/image13.png'
  },
  link: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('News', NewsSchema);
