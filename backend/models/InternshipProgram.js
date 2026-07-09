const mongoose = require('mongoose');

const InternshipProgramSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, 'Please add internship title in English'],
    trim: true
  },
  titleNp: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please specify the department'],
    default: 'General'
  },
  location: {
    type: String,
    default: 'Kathmandu, Nepal'
  },
  internshipType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Both'],
    default: 'Full-Time'
  },
  vacancies: {
    type: Number,
    default: 1
  },
  duration: {
    type: String,
    enum: ['1 Month', '2 Months', '3 Months', '6 Months'],
    default: '3 Months'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  overviewEn: {
    type: String
  },
  overviewNp: {
    type: String
  },
  responsibilitiesEn: {
    type: String
  },
  responsibilitiesNp: {
    type: String
  },
  benefitsEn: {
    type: String
  },
  benefitsNp: {
    type: String
  },
  eligibilityEn: {
    type: String
  },
  eligibilityNp: {
    type: String
  },
  requiredSkillsEn: {
    type: String
  },
  requiredSkillsNp: {
    type: String
  },
  applicationDeadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InternshipProgram', InternshipProgramSchema);
