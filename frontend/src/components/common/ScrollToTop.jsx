import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to top when route changes
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Reset before the browser paints the new route so the previous page's
  // scroll position never flashes during navigation.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
