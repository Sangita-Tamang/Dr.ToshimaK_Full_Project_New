/**
 * Images Controller
 * Provides pre-built Cloudinary URL sets for the Gallery and News pages.
 * These endpoints serve the static image sets that were previously hardcoded
 * as local imports in the frontend.
 *
 * GET /api/images/gallery  → returns 15 gallery image URLs with metadata
 * GET /api/images/news     → returns 15 news image URLs
 */

const {
  getGalleryImageUrl,
  getContributionImageUrl,
  getBannerUrl,
  IMAGE_PUBLIC_IDS,
  getImageUrl,
} = require('../services/cloudinary.service');

// ─── Gallery image set ─────────────────────────────────────────────────────────
// Mirrors the REAL_GALLERY array previously hardcoded in frontend/Gallery.jsx

const GALLERY_METADATA = [
  { index: 1,  titleEn: 'Hospital Inspection and Monitoring Visit',          titleNp: 'अस्पताल निरीक्षण तथा अनुगमन',                          category: 'Health Programs',      date: '2024-05-20' },
  { index: 2,  titleEn: 'State Ministry of Health Office Work',              titleNp: 'स्वास्थ्य मन्त्रालयको कार्यकक्षमा',                    category: 'Leadership Moments',   date: '2023-02-10' },
  { index: 3,  titleEn: 'Interaction with Lalitpur Community Members',       titleNp: 'ललितपुरका नागरिकहरूसँग अन्तरक्रिया',                   category: 'Public Meetings',      date: '2024-04-25' },
  { index: 4,  titleEn: 'Official Portrait of Dr. Toshima Karki',            titleNp: 'डा. तोसिमा कार्कीको आधिकारिक तस्विर',                  category: 'Leadership Moments',   date: '2022-12-10' },
  { index: 5,  titleEn: 'Working on Health Policies at Desk',                titleNp: 'स्वास्थ्य नीति लेखन तथा अध्ययनमा',                     category: 'Leadership Moments',   date: '2024-03-10' },
  { index: 6,  titleEn: 'Healthcare Camp for Underprivileged Citizens',      titleNp: 'विपन्न नागरिकका लागि निःशुल्क स्वास्थ्य शिविर',        category: 'Health Programs',      date: '2024-02-28' },
  { index: 7,  titleEn: 'Addressing a Public Health Awareness Program',      titleNp: 'स्वास्थ्य सचेतना कार्यक्रममा सम्बोधन',                 category: 'Health Programs',      date: '2024-02-14' },
  { index: 8,  titleEn: 'Press Conference on Healthcare Reforms',            titleNp: 'स्वास्थ्य सुधार सम्बन्धी पत्रकार सम्मेलन',            category: 'Media Events',         date: '2024-01-30' },
  { index: 9,  titleEn: 'International Delegation on Public Health',         titleNp: 'अन्तर्राष्ट्रिय स्वास्थ्य प्रतिनिधिमण्डलसँग बैठक',   category: 'Media Events',         date: '2023-12-15' },
  { index: 10, titleEn: 'Dr. Toshima Karki Official Portrait Red Blazer',   titleNp: 'डा. तोसिमा कार्की — रातो कोटमा',                      category: 'Leadership Moments',   date: '2022-11-20' },
  { index: 11, titleEn: 'Speaking in the Federal Parliament of Nepal',       titleNp: 'प्रतिनिधि सभा बैठकमा मन्तव्य राख्दै',                  category: 'Parliament Sessions',  date: '2024-06-04' },
  { index: 12, titleEn: 'National TV Interview on Medical Policy',           titleNp: 'राष्ट्रिय टेलिभिजनमा नीतिगत बहस',                     category: 'Media Events',         date: '2024-05-15' },
  { index: 13, titleEn: 'Maternal Healthcare Awareness Campaign',            titleNp: 'मातृ स्वास्थ्य सचेतना अभियान',                         category: 'Health Programs',      date: '2024-03-12' },
  { index: 14, titleEn: 'Policy Discussion with Lawmakers',                  titleNp: 'सांसदहरूसँग नीतिगत छलफल',                              category: 'Parliament Sessions',  date: '2024-06-11' },
  { index: 15, titleEn: 'Addressing Public Assembly in Lalitpur',            titleNp: 'ललितपुरमा आयोजित आमसभामा सम्बोधन',                    category: 'Public Meetings',      date: '2024-05-18' },
];

// ─── News image set ────────────────────────────────────────────────────────────
// Mirrors the image assignments in frontend/News.jsx
// Images 1–15 are mapped to news items n1–n15 in the same order

const NEWS_IMAGE_COUNT = 15;

// @desc    Get optimized Cloudinary URLs for gallery images
// @route   GET /api/images/gallery
// @access  Public
exports.getGalleryImages = (req, res) => {
  const items = GALLERY_METADATA.map(meta => ({
    _id:       String(meta.index),
    mediaUrl:  getGalleryImageUrl(meta.index),
    titleEn:   meta.titleEn,
    titleNp:   meta.titleNp,
    category:  meta.category,
    date:      meta.date,
  }));

  res.status(200).json({ success: true, count: items.length, data: items });
};

// @desc    Get optimized Cloudinary URLs for news card images
// @route   GET /api/images/news
// @access  Public
exports.getNewsImages = (req, res) => {
  const urls = Array.from({ length: NEWS_IMAGE_COUNT }, (_, i) =>
    getGalleryImageUrl(i + 1)
  );
  res.status(200).json({ success: true, count: urls.length, data: urls });
};

// @desc    Get optimized Cloudinary URLs for blog images
// @route   GET /api/images/blogs
// @access  Public
exports.getBlogImages = (req, res) => {
  // Returns URLs for blog cards (mapping images 1-6 + author portrait image4)
  const images = {
    img1: getGalleryImageUrl(1),
    img2: getGalleryImageUrl(2),
    img3: getGalleryImageUrl(3),
    img4: getGalleryImageUrl(4),
    img5: getGalleryImageUrl(5),
    img6: getGalleryImageUrl(6),
  };
  res.status(200).json({ success: true, data: images });
};

// @desc    Get optimized Cloudinary URLs for media page thumbnails
// @route   GET /api/images/media
// @access  Public
exports.getMediaImages = (req, res) => {
  // Returns URLs for media thumbnails
  const images = {
    img1: getGalleryImageUrl(1),
    img2: getGalleryImageUrl(2),
    img4: getGalleryImageUrl(4),
    img6: getGalleryImageUrl(6),
    img8: getGalleryImageUrl(8),
    img11: getGalleryImageUrl(11),
    img12: getGalleryImageUrl(12),
    img13: getGalleryImageUrl(13),
  };
  res.status(200).json({ success: true, data: images });
};

