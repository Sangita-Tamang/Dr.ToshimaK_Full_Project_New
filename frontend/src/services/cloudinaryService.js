/**
 * Frontend Cloudinary URL helper
 *
 * The backend is the PRIMARY source for all Cloudinary URLs.
 * This helper is provided as a client-side emergency fallback
 * (e.g. if the API call fails and you need to build a URL directly in the browser).
 *
 * Usage:
 *   import { getCloudinaryUrl } from '../services/cloudinaryService';
 *   const src = getCloudinaryUrl('dr-tk/home.hero', { width: 1920 });
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dapavb1fs';
const CLOUD_FOLDER = 'dr-tk';

/**
 * Build an optimized Cloudinary URL on the client side.
 * @param {string} publicId - e.g. "dr-tk/image1"
 * @param {object} options
 * @param {number}  [options.width]
 * @param {number}  [options.height]
 * @param {string}  [options.crop]    - Default: "fill"
 * @param {string}  [options.gravity] - Default: "auto"
 * @returns {string} Fully qualified Cloudinary URL
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  if (!CLOUD_NAME) {
    console.warn('[cloudinaryService] VITE_CLOUDINARY_CLOUD_NAME is not set.');
    return '';
  }

  const { width, height, crop = 'fill', gravity = 'auto' } = options;

  const transforms = ['f_auto', 'q_auto'];
  if (width)   transforms.push(`w_${width}`);
  if (height)  transforms.push(`h_${height}`);
  if (width || height) {
    transforms.push(`c_${crop}`);
    transforms.push(`g_${gravity}`);
  }

  const transformStr = transforms.join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`;
};

// ─── Preset helpers ───────────────────────────────────────────────────────────

export const getHeroUrl = (publicId) =>
  getCloudinaryUrl(publicId, { width: 1920, crop: 'fill', gravity: 'auto' });

export const getGalleryUrl = (publicId) =>
  getCloudinaryUrl(publicId, { width: 800, crop: 'fill', gravity: 'auto' });

export const getPortraitUrl = (publicId) =>
  getCloudinaryUrl(publicId, { width: 600, height: 600, crop: 'fill', gravity: 'face' });

// ─── Public ID registry (must match backend) ──────────────────────────────────
export const IMAGE_IDS = {
  homeHero:       `${CLOUD_FOLDER}/home.hero`,
  aboutHero:      `${CLOUD_FOLDER}/about.hero`,
  ministryHero:   `${CLOUD_FOLDER}/ministry.hero`,
  parliamentHero: `${CLOUD_FOLDER}/parliment.hero`,
  partyHero:      `${CLOUD_FOLDER}/party.hero`,
};
