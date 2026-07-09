const User = require('../models/User');
const Contact = require('../models/Contact');
const News = require('../models/News');
const Blog = require('../models/Blog');
const Media = require('../models/Media');
const Gallery = require('../models/Gallery');
const InternshipProgram = require('../models/InternshipProgram');
const InternshipApplication = require('../models/InternshipApplication');
const logger = require('../config/logger');

// @desc    Get simple collection counts for debugging
// @route   GET /api/debug/stats
// @access  Private (admin/editor)
exports.getStats = async (req, res, next) => {
  try {
    const [users, contacts, news, blogs, media, gallery, internships, internshipApps] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      News.countDocuments(),
      Blog.countDocuments(),
      Media.countDocuments(),
      Gallery.countDocuments(),
      InternshipProgram.countDocuments(),
      InternshipApplication.countDocuments()
    ]);

    const data = {
      users,
      contacts,
      news,
      blogs,
      media,
      gallery,
      internships,
      internshipApplications: internshipApps
    };

    logger.info(`Debug stats requested by ${req.user?.email || 'unknown'}`);

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
