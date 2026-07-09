const mongoose = require('mongoose');

const InternshipApplicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Please add your full name'],
    trim: true
  },
  photo: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  nationality: {
    type: String,
    default: 'Nepali'
  },
  citizenshipNumber: {
    type: String
  },

  // Contact Information
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please add your phone number']
  },
  permanentAddress: {
    type: String
  },
  currentAddress: {
    type: String
  },

  // Educational Background
  university: {
    type: String,
    required: [true, 'Please add your university/college']
  },
  faculty: {
    type: String
  },
  degree: {
    type: String
  },
  semester: {
    type: String
  },
  gpa: {
    type: String
  },

  // Internship Details
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipProgram'
  },
  positionTitle: {
    type: String,
    required: [true, 'Please select a position']
  },
  department: {
    type: String
  },
  preferredDuration: {
    type: String,
    enum: ['1 Month', '2 Months', '3 Months', '6 Months']
  },
  preferredStartDate: {
    type: Date
  },
  availability: {
    type: String,
    enum: ['Full-Time', 'Part-Time']
  },

  // Skills
  skills: [{
    type: String
  }],

  // Experience
  previousInternship: {
    type: String
  },
  workExperience: {
    type: String
  },
  projects: {
    type: String
  },
  github: {
    type: String
  },
  linkedin: {
    type: String
  },
  portfolioWebsite: {
    type: String
  },

  // Motivation
  motivationWhy: {
    type: String,
    required: [true, 'Please explain why you want to intern here']
  },
  motivationLearn: {
    type: String
  },
  motivationSelect: {
    type: String
  },

  // Uploaded Documents
  resumeUrl: {
    type: String
  },
  coverLetterUrl: {
    type: String
  },
  transcriptUrl: {
    type: String
  },
  recommendationLetterUrl: {
    type: String
  },
  portfolioFileUrl: {
    type: String
  },

  // Declaration
  declaration: {
    type: Boolean,
    required: [true, 'You must accept the declaration']
  },

  // Admin fields
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  emailsSent: [{
    type: { type: String },
    sentAt: { type: Date, default: Date.now },
    subject: String,
    body: String
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InternshipApplication', InternshipApplicationSchema);
