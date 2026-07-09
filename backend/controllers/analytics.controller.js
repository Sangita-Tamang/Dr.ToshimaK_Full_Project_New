const Contact = require('../models/Contact');
const Interview = require('../models/Interview');
const Blog = require('../models/Blog');
const News = require('../models/News');
const Media = require('../models/Media');
const Gallery = require('../models/Gallery');

// @desc    Get dashboard analytics/summary stats
// @route   GET /api/analytics
// @access  Private/Editor/Admin
exports.getAnalyticsSummary = async (req, res, next) => {
  try {
    const contactCount = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: 'new' });
    const interviewCount = await Interview.countDocuments();
    const pendingInterviews = await Interview.countDocuments({ status: 'pending' });
    const blogCount = await Blog.countDocuments();
    const newsCount = await News.countDocuments();
    const mediaCount = await Media.countDocuments();
    const galleryCount = await Gallery.countDocuments();

    // Sum blog views
    const blogs = await Blog.find({}, 'views');
    const totalBlogViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalContacts: contactCount,
        pendingContacts,
        totalInterviews: interviewCount,
        pendingInterviews,
        totalBlogs: blogCount,
        totalBlogViews,
        totalNews: newsCount,
        totalMedia: mediaCount,
        totalGallery: galleryCount
      }
    });
  } catch (err) {
    next(err);
  }
};
