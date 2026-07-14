/**
 * Image Optimization Utilities
 * Provides helper functions for image loading, compression, and responsive sizing
 */

/**
 * Generate srcset for responsive images
 * @param {string} imagePath - Base image path
 * @param {array} sizes - Array of widths [640, 768, 1024, 1280, 1920]
 * @returns {string} - srcset string
 */
export const generateSrcSet = (imagePath, sizes = [640, 768, 1024, 1280, 1920]) => {
  // For now, return the original image
  // In production, you would have different sized versions
  return sizes.map(size => `${imagePath} ${size}w`).join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @returns {string} - sizes string
 */
export const generateSizes = () => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
};

/**
 * Preload critical images
 * @param {array} images - Array of image paths to preload
 */
export const preloadImages = (images) => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source
 */
export const lazyLoadImage = (img, src) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.classList.add('loaded');
        observer.unobserve(image);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  observer.observe(img);
};

/**
 * Check if WebP is supported
 * @returns {Promise<boolean>}
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get optimized image format
 * @param {string} originalPath - Original image path
 * @returns {string} - Optimized image path
 */
export const getOptimizedImagePath = async (originalPath) => {
  const isWebPSupported = await supportsWebP();
  
  if (isWebPSupported && !originalPath.endsWith('.webp')) {
    // In production, you would serve WebP versions
    // For now, return original
    return originalPath;
  }
  
  return originalPath;
};

/**
 * Compress image quality for thumbnails
 * @param {string} src - Image source
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<string>} - Compressed image data URL
 */
export const compressImage = (src, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            reject(new Error('Compression failed'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Calculate aspect ratio for responsive images
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - Aspect ratio percentage
 */
export const calculateAspectRatio = (width, height) => {
  return `${(height / width) * 100}%`;
};

/**
 * Blur placeholder for progressive image loading
 * @param {string} src - Image source
 * @returns {string} - Blur data URL
 */
export const generateBlurPlaceholder = (width = 20, height = 20) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f0f0f0');
  gradient.addColorStop(1, '#e0e0e0');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

export default {
  generateSrcSet,
  generateSizes,
  preloadImages,
  lazyLoadImage,
  supportsWebP,
  getOptimizedImagePath,
  compressImage,
  calculateAspectRatio,
  generateBlurPlaceholder
};
