import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Optimized Image Component with Lazy Loading and Fade-in Animation
 * Prevents layout shift and provides smooth loading experience
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  style = {},
  aspectRatio = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  lazy = true,
  fadeIn = true,
  onLoad,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

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
    transition: fadeIn ? 'opacity 0.3s ease-in' : 'none',
  };

  return (
    <div ref={imgRef} style={containerStyle} className={className}>
      {!isLoaded && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          style={imgStyle}
          onLoad={handleLoad}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      )}
    </div>
  );
}

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
  onLoad: PropTypes.func,
};
