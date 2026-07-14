import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { generateBlurPlaceholder } from '../../utils/imageOptimization';

/**
 * Enhanced Optimized Image Component
 * Features: Lazy loading, blur placeholder, error handling, responsive sizing
 */
const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  style = {},
  aspectRatio = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  lazy = true,
  fadeIn = true,
  priority = false,
  width,
  height,
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (observerRef.current && imgRef.current) {
            observerRef.current.unobserve(imgRef.current);
          }
        }
      },
      {
        rootMargin: '100px', // Load 100px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const placeholder = generateBlurPlaceholder();

  const containerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: aspectRatio === 'auto' ? 0 : aspectRatio,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    ...style,
  };

  const imgStyle = {
    width: '100%',
    height: aspectRatio === 'auto' ? 'auto' : '100%',
    position: aspectRatio === 'auto' ? 'relative' : 'absolute',
    top: 0,
    left: 0,
    objectFit,
    objectPosition,
    opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
    transition: fadeIn ? 'opacity 0.4s ease-in-out' : 'none',
    display: 'block',
  };

  return (
    <div ref={imgRef} style={containerStyle} className={className}>
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Loading shimmer */}
      {!isLoaded && !hasError && (
        <div 
          className="shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          style={imgStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          decoding="async"
          width={width}
          height={height}
          {...props}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
            color: '#999',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '8px', display: 'block' }} />
            <div>Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  objectPosition: PropTypes.string,
  lazy: PropTypes.bool,
  fadeIn: PropTypes.bool,
  priority: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func,
};

export default OptimizedImage;
