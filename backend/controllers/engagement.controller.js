const Engagement = require('../models/Engagement');

const EDITABLE_FIELDS = [
  'title',
  'date',
  'startTime',
  'endTime',
  'location',
  'description',
  'image',
  'status',
  'isPublished'
];

const engagementPayload = (body) => EDITABLE_FIELDS.reduce((payload, field) => {
  if (body[field] !== undefined) payload[field] = body[field];
  return payload;
}, {});

// @desc    Get upcoming published engagement (public)
// @route   GET /api/engagements/upcoming
// @access  Public
exports.getUpcomingEngagement = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const engagement = await Engagement.findOne({
      status: 'upcoming',
      isPublished: true,
      date: { $gte: today }
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: engagement || null
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all engagements (admin)
// @route   GET /api/engagements
// @access  Private/Editor/Admin
exports.getAllEngagements = async (req, res, next) => {
  try {
    const engagements = await Engagement.find().sort('-date');
    res.status(200).json({
      success: true,
      count: engagements.length,
      data: engagements
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create engagement
// @route   POST /api/engagements
// @access  Private/Editor/Admin
exports.createEngagement = async (req, res, next) => {
  try {
    const engagement = await Engagement.create(engagementPayload(req.body));
    res.status(201).json({ success: true, data: engagement });
  } catch (err) {
    next(err);
  }
};

// @desc    Update engagement
// @route   PUT /api/engagements/:id
// @access  Private/Editor/Admin
exports.updateEngagement = async (req, res, next) => {
  try {
    const engagement = await Engagement.findByIdAndUpdate(req.params.id, engagementPayload(req.body), {
      new: true,
      runValidators: true
    });
    if (!engagement) {
      return res.status(404).json({ success: false, error: 'Engagement not found' });
    }
    res.status(200).json({ success: true, data: engagement });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete engagement
// @route   DELETE /api/engagements/:id
// @access  Private/Editor/Admin
exports.deleteEngagement = async (req, res, next) => {
  try {
    const engagement = await Engagement.findByIdAndDelete(req.params.id);
    if (!engagement) {
      return res.status(404).json({ success: false, error: 'Engagement not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
