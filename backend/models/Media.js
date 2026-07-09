const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, 'Please add a media title in English']
  },
  titleNp: {
    type: String
  },
  type: {
    type: String,
    required: [true, 'Please specify the media type']
  },
  sourceEn: {
    type: String,
    default: 'Official Media'
  },
  sourceNp: {
    type: String,
    default: 'आधिकारिक मिडिया'
  },
  link: {
    type: String,
    required: [true, 'Please add the media link (URL)']
  },
  thumbnail: {
    type: String,
    default: '/image/image12.png'
  },
  duration: {
    type: String, // e.g. "12:34" or "1:02:45"
    default: ''
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

module.exports = mongoose.model('Media', MediaSchema);
