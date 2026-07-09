const express = require('express');
const upload = require('../services/upload.service');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// General upload route (Admin only)
router.post('/', protect, authorize('admin', 'editor'), (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) return res.status(400).json({ success: false, error: err.message || err });
    if (!req.file) return res.status(400).json({ success: false, error: 'Please upload a file' });
    res.status(200).json({ success: true, data: `/uploads/${req.file.filename}` });
  });
});

// Public upload route (For application CVs)
router.post('/public', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) return res.status(400).json({ success: false, error: err.message || err });
    if (!req.file) return res.status(400).json({ success: false, error: 'Please upload a file' });
    res.status(200).json({ success: true, data: `/uploads/${req.file.filename}` });
  });
});

module.exports = router;
