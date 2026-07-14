# CSS Optimization Guide

## Current CSS Structure

The website uses multiple CSS files:
- `index.css` - Global styles (~15KB)
- Component-specific CSS files (Party.css, Ministry.css, Parliament.css, About.css, etc.)

## ✅ Implemented CSS Optimizations

### 1. Critical CSS Loading
All CSS is currently loaded synchronously, which is fine for the current size, but can be improved.

### 2. Animation Optimization
- Uses GPU-accelerated properties (transform, opacity)
- Shimmer animations are efficient
- Smooth transitions with proper easing

## 🚀 Production CSS Optimizations

### Option 1: PurgeCSS (Automated Unused CSS Removal)

Install PurgeCSS:
```bash
npm install -D @fullhuman/postcss-purgecss
```

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [
          'active',
          'loaded',
          'animate-show',
          'animate-hidden',
          'fade-in-up',
          'shimmer',
        ],
        deep: [/^fas/, /^fa-/], // Keep Font Awesome classes
        greedy: [/^btn-/, /^hero-/, /^stat-/]
      }
    })
  ]
}
```

**Expected savings: 30-40% reduction in CSS size**

### Option 2: Manual CSS Audit

#### Remove Unused Styles

1. **Search for unused classes:**
```bash
# In project root
grep -r "className=\"hero-badge" frontend/src --include="*.jsx"
# If no results, the class is unused
```

2. **Common unused patterns to check:**
- Old hero badge styles (if badge was removed)
- Unused color variations
- Legacy component styles

#### Consolidate Duplicate Styles

Current duplications found:
```css
/* These patterns appear multiple times - can be consolidated */

/* Loading states - appears in multiple files */
.loader { ... }
.spinner { ... }
.shimmer { ... }

/* Button styles - can be unified */
.btn-primary { ... }
.btn-secondary { ... }
.btn-outline { ... }

/* Card styles - similar across components */
.card { ... }
```

**Recommendation:** Create a `_shared.css` file for common components.

### Option 3: CSS Minification (Built-in with Vite)

Vite automatically minifies CSS in production build. No action needed.

Current settings in `vite.config.js` handle this automatically.

### Option 4: Critical CSS Inlining

For faster First Contentful Paint, inline critical above-the-fold CSS.

Create `src/styles/critical.css`:
```css
/* Only styles needed for initial render */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; }
.loader { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
.spinner { width: 40px; height: 40px; border: 3px solid #e0e0e0; border-top-color: #C8102E; border-radius: 50%; animation: spin 0.8s linear infinite; }
```

Then inline in `index.html`:
```html
<head>
  <style>
    /* Critical CSS here */
  </style>
  <link rel="stylesheet" href="/src/index.css">
</head>
```

## CSS Performance Best Practices

### 1. Avoid Heavy Selectors

❌ **Bad:**
```css
div > ul > li > a:hover { color: red; }
.parent .child .grandchild .great-grandchild { ... }
```

✅ **Good:**
```css
.nav-link:hover { color: red; }
.card-title { ... }
```

### 2. Use CSS Containment

Add to large components:
```css
.party-page {
  contain: layout style paint;
}

.principle-card {
  contain: content;
}
```

This tells the browser to isolate the component for better performance.

### 3. Optimize Animations

✅ **Currently using GPU-accelerated properties:**
```css
/* Good - uses transform and opacity */
.animate-show {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
```

❌ **Avoid animating expensive properties:**
```css
/* Bad - causes layout recalculation */
.bad-animation {
  transition: width 0.3s, height 0.3s, margin 0.3s;
}
```

### 4. Reduce CSS Specificity

Current specificity is good, but can be improved in some areas:

❌ **High specificity:**
```css
.party-page .section-padding .party-section .party-about .split-grid { ... }
```

✅ **Lower specificity:**
```css
.about-split { ... }
```

## Font Loading Optimization

### Current Font Loading
```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
```

### Optimization: font-display Strategy

The `display=swap` parameter is already being used ✅

This prevents invisible text while fonts load.

### Alternative: Self-Host Fonts (Advanced)

For even better performance, self-host fonts:

1. Download font files from Google Fonts
2. Add to `public/fonts/`
3. Use `@font-face`:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-regular.woff2') format('woff2');
}
```

**Benefit:** Eliminates external DNS lookup and connection time.

## Responsive CSS Optimization

### Current Approach: Multiple Media Queries

The site has good responsive CSS with proper breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1120px
- Desktop: > 1120px

### Optimization: Consolidate Media Queries

Instead of multiple `@media` blocks scattered throughout, consider:

```css
/* Desktop-first approach - base styles for desktop */
.hero-title { font-size: 3rem; }

/* Then override for smaller screens */
@media (max-width: 768px) {
  .hero-title { font-size: 1.875rem; }
  /* All mobile overrides in one place */
}
```

**Current CSS is already well-organized ✅**

## CSS Performance Checklist

### Before Deployment:
- [ ] Run PurgeCSS to remove unused styles
- [ ] Verify all animations use transform/opacity
- [ ] Check for duplicate CSS rules
- [ ] Consolidate media queries
- [ ] Inline critical CSS (optional)
- [ ] Self-host fonts (optional)

### Testing:
- [ ] Check CSS bundle size: `npm run build` (should be <50KB gzipped)
- [ ] Test paint performance with DevTools Performance tab
- [ ] Verify no layout shifts (CLS score)
- [ ] Check font loading doesn't cause FOIT (Flash of Invisible Text)

## Quick CSS Audit Commands

```bash
# Check CSS file sizes
find frontend/src -name "*.css" -exec du -h {} + | sort -rh

# Count total CSS lines
find frontend/src -name "*.css" -exec wc -l {} + | tail -1

# Find potential duplicate selectors
grep -h "^\." frontend/src/**/*.css | sort | uniq -d

# Check for !important usage (should be minimal)
grep -r "!important" frontend/src --include="*.css" | wc -l
```

## Expected CSS Performance Improvements

### Before Optimization:
- Total CSS: ~50-60KB minified
- First Paint: Includes all CSS
- Unused styles: ~30-40%

### After Optimization:
- Total CSS: ~30-35KB minified (40% reduction)
- Critical CSS: ~5KB inlined
- Unused styles: <5%
- First Paint: 200-300ms faster

## Browser Support

Current CSS is compatible with:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

No legacy browser support needed - all modern features are supported.

## Performance Monitoring

### CSS-specific metrics to track:

1. **CSSOM construction time:**
```javascript
performance.getEntriesByType('resource')
  .filter(e => e.name.endsWith('.css'))
  .forEach(e => console.log(e.name, e.duration));
```

2. **First Contentful Paint (FCP):**
Should be <1.8s on desktop, <2.5s on mobile

3. **Cumulative Layout Shift (CLS):**
Should be <0.1 (animations shouldn't cause layout shifts)

## Resources

- [CSS Containment Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
- [Critical CSS Tools](https://web.dev/extract-critical-css/)
- [CSS Performance Tips](https://web.dev/optimize-css/)
- [Font Loading Best Practices](https://web.dev/font-best-practices/)
