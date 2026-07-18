/**
 * Cloudinary Service
 * Reusable helper to generate optimized Cloudinary image URLs.
 * All URLs automatically include f_auto (format) and q_auto (quality).
 *
 * Public IDs follow the convention: "dr-tk/<filename>"
 * e.g. dr-tk/home.hero, dr-tk/image1, dr-tk/about.hero
 *
 * Adjust CLOUD_FOLDER and the public ID strings in IMAGE_PUBLIC_IDS
 * to match your actual Cloudinary Media Library.
 */

const cloudinary = require('../config/cloudinary');

// ─── Folder prefix ────────────────────────────────────────────────────────────
// Change this if your images live in a different Cloudinary folder.
const CLOUD_FOLDER = 'dr-tk';

// ─── Public ID registry ───────────────────────────────────────────────────────
// Maps semantic names → Cloudinary public IDs (without extension).
const IMAGE_PUBLIC_IDS = {
  // Hero images
  homeHero:       `${CLOUD_FOLDER}/home.hero`,
  aboutHero:      `${CLOUD_FOLDER}/about.hero`,
  ministryHero:   `${CLOUD_FOLDER}/ministry.hero`,
  parliamentHero: `${CLOUD_FOLDER}/parliment.hero`,   // note: typo preserved from local filename
  partyHero:      `${CLOUD_FOLDER}/party.hero`,

  // Gallery / general images
  image1:  `${CLOUD_FOLDER}/image1`,
  image2:  `${CLOUD_FOLDER}/image2`,
  image3:  `${CLOUD_FOLDER}/image3`,
  image4:  `${CLOUD_FOLDER}/image4`,
  image5:  `${CLOUD_FOLDER}/image5`,
  image6:  `${CLOUD_FOLDER}/image6`,
  image7:  `${CLOUD_FOLDER}/image7`,
  image8:  `${CLOUD_FOLDER}/image8`,
  image9:  `${CLOUD_FOLDER}/image9`,
  image10: `${CLOUD_FOLDER}/image10`,
  image11: `${CLOUD_FOLDER}/image11`,
  image12: `${CLOUD_FOLDER}/image12`,
  image13: `${CLOUD_FOLDER}/image13`,
  image14: `${CLOUD_FOLDER}/image14`,
  image15: `${CLOUD_FOLDER}/image15`,
  image16: `${CLOUD_FOLDER}/image16`,
  image17: `${CLOUD_FOLDER}/image17`,
  image18: `${CLOUD_FOLDER}/image18`,

  // Misc
  templeBg: `${CLOUD_FOLDER}/temple_bg`,
};

// ─── Core URL builder ─────────────────────────────────────────────────────────

/**
 * Generate a Cloudinary URL with automatic format and quality.
 * @param {string} publicId  - Cloudinary public ID (e.g. "dr-tk/image1")
 * @param {object} options   - Optional transformation overrides
 * @param {number} [options.width]
 * @param {number} [options.height]
 * @param {string} [options.crop]    - Default: "fill"
 * @param {string} [options.gravity] - Default: "auto"
 * @returns {string} Fully qualified Cloudinary URL
 */
const getImageUrl = (publicId, options = {}) => {
  const transformation = {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  };

  return cloudinary.url(publicId, {
    transformation: [transformation],
    secure: true,
  });
};

// ─── Preset helpers ───────────────────────────────────────────────────────────

/**
 * Hero image — full-width, 1920px wide, prioritizes the face/center.
 */
const getHeroUrl = (publicId) =>
  getImageUrl(publicId, { width: 1920, crop: 'fill', gravity: 'auto' });

/**
 * Gallery card — 800px wide thumbnail.
 */
const getGalleryUrl = (publicId) =>
  getImageUrl(publicId, { width: 800, crop: 'fill', gravity: 'auto' });

/**
 * Contribution card — 720px wide, landscape crop.
 */
const getContributionUrl = (publicId) =>
  getImageUrl(publicId, { width: 720, height: 480, crop: 'fill', gravity: 'auto' });

/**
 * Portrait / profile — 600px square crop.
 */
const getPortraitUrl = (publicId) =>
  getImageUrl(publicId, { width: 600, height: 600, crop: 'fill', gravity: 'face' });

/**
 * Wide banner / quote background.
 */
const getBannerUrl = (publicId) =>
  getImageUrl(publicId, { width: 1200, crop: 'fill', gravity: 'auto' });

// ─── Convenience accessors ────────────────────────────────────────────────────

/** Returns all hero URLs keyed by page */
const getAllHeroUrls = () => ({
  home:       getHeroUrl(IMAGE_PUBLIC_IDS.homeHero),
  about:      getHeroUrl(IMAGE_PUBLIC_IDS.aboutHero),
  ministry:   getHeroUrl(IMAGE_PUBLIC_IDS.ministryHero),
  parliament: getHeroUrl(IMAGE_PUBLIC_IDS.parliamentHero),
  party:      getHeroUrl(IMAGE_PUBLIC_IDS.partyHero),
});

/**
 * Returns an array of gallery image URLs for images 1–N.
 * @param {number} count - how many images to include (max 18)
 */
const getGalleryImageUrls = (count = 18) => {
  return Array.from({ length: count }, (_, i) => {
    const key = `image${i + 1}`;
    return getGalleryUrl(IMAGE_PUBLIC_IDS[key]);
  });
};

/**
 * Returns a specific gallery image URL by 1-based index.
 * @param {number} index - 1-based image number
 */
const getGalleryImageUrl = (index) => {
  const key = `image${index}`;
  return getGalleryUrl(IMAGE_PUBLIC_IDS[key]);
};

/**
 * Returns a specific contribution card image URL by 1-based index.
 * @param {number} index - 1-based image number
 */
const getContributionImageUrl = (index) => {
  const key = `image${index}`;
  return getContributionUrl(IMAGE_PUBLIC_IDS[key]);
};

module.exports = {
  IMAGE_PUBLIC_IDS,
  getImageUrl,
  getHeroUrl,
  getGalleryUrl,
  getContributionUrl,
  getPortraitUrl,
  getBannerUrl,
  getAllHeroUrls,
  getGalleryImageUrls,
  getGalleryImageUrl,
  getContributionImageUrl,
};
