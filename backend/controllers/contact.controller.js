const Contact = require('../models/Contact');
const logger = require('../config/logger');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    logger.info(`New contact message received from ${contact.email} with priority ${contact.priority}`);
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Editor/Admin
exports.getContacts = async (req, res, next) => {
  try {
    let query;
    if (req.query.status) {
      query = Contact.find({ status: req.query.status });
    } else {
      query = Contact.find();
    }
    
    // Sort by newest first
    query = query.sort('-createdAt');
    
    const contacts = await query;
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    next(err);
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Private/Editor/Admin
exports.updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true
    });
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact message not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact message not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
