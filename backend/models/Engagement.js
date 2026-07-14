const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an engagement title'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please add an engagement date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time'],
    trim: true
  },
  endTime: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  locationSub: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  openTo: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Engagement', EngagementSchema);
