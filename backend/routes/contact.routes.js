const express = require('express');
const { submitContact, getContacts, updateContactStatus, deleteContact } = require('../controllers/contact.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, authorize('admin', 'editor'), getContacts);

router.route('/:id')
  .put(protect, authorize('admin', 'editor'), updateContactStatus)
  .delete(protect, authorize('admin'), deleteContact);

module.exports = router;
