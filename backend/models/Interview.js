const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  mediaOutlet: {
    type: String,
    required: [true, 'Please add the name of the media organization']
  },
  reporterName: {
    type: String,
    required: [true, 'Please add the reporter\'s name']
  },
  email: {
    type: String,
    required: [true, 'Please add a contact email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a contact phone number']
  },
  proposedDate: {
    type: Date,
    required: [true, 'Please propose a date and time']
  },
  topics: {
    type: String,
    required: [true, 'Please list the interview topics or questions']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);
