const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, 'Please add a gallery title in English']
  },
  titleNp: {
    type: String
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    default: 'photo'
  },
  category: {
    type: String,
    required: [true, 'Please select a category']
  },
  mediaUrl: {
    type: String,
    required: [true, 'Please provide the image or video URL']
  },
  videoLink: {
    type: String, // Link to play video (e.g. YouTube link)
    default: ''
  },
  videoDuration: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', GallerySchema);
