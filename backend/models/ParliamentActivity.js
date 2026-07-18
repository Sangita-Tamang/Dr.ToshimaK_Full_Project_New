const mongoose = require('mongoose');

const ParliamentActivitySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ne: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ne: { type: String, required: true }
  },
  category: {
    en: { 
      type: String, 
      required: true,
      enum: [
        'Healthcare',
        'Health Reform', 
        'Public Issues',
        'Governance',
        'Citizen Welfare',
        'Parliamentary Debate',
        'Health Policy',
        'Health Governance',
        'Citizen Issues',
        'Healthcare Reform',
        'Parliamentary Representation',
        'Education Policy',
        'Infrastructure',
        'Social Welfare',
        'Committee Work',
        'Good Governance',
        'Health Innovation',
        'Youth Development'
      ]
    },
    ne: { type: String, required: true }
  },
  tenure: {
    type: String,
    required: true,
    enum: ['first', 'second'],
    default: 'first'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: '/assets/images/parliament-activity-default.jpg'
  },
  sourceUrl: {
    type: String,
    required: true
  },
  sourceType: {
    type: String,
    enum: ['video', 'news', 'document'],
    default: 'video'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
ParliamentActivitySchema.index({ tenure: 1, date: -1 });
ParliamentActivitySchema.index({ 'category.en': 1 });
ParliamentActivitySchema.index({ year: 1 });
ParliamentActivitySchema.index({ featured: 1, published: 1 });

// Virtual for formatted date
ParliamentActivitySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to increment views
ParliamentActivitySchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('ParliamentActivity', ParliamentActivitySchema);
