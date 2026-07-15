# Responsive Design Testing Checklist

## Quick Testing Guide for Mobile Header & Hero Optimizations

---

## 🖥️ Browser DevTools Testing

### Chrome DevTools
1. Open DevTools (F12 or Cmd+Option+I)
2. Click "Toggle Device Toolbar" (Cmd+Shift+M)
3. Test these preset devices:
   - iPhone SE (375×667)
   - iPhone 12 Pro (390×844)
   - iPhone 14 Pro Max (430×932)
   - Pixel 5 (393×851)
   - iPad Mini (768×1024)
   - iPad Pro (1024×1366)

### Custom Viewport Testing
Test these specific widths in responsive mode:
```
320px  - Minimum mobile width
375px  - Standard iPhone
390px  - iPhone 14
430px  - iPhone 14 Pro Max
768px  - Tablet portrait
1024px - Tablet landscape / Small laptop
1440px - Desktop
1920px - Large desktop
```

---

## ✅ Mobile Header Checklist

### Visual Inspection (320px - 768px)

#### Logo
- [ ] Logo is visible and not cut off
- [ ] Logo size is appropriate (44-48px)
- [ ] Logo maintains aspect ratio
- [ ] Logo has proper spacing around it

#### Text
- [ ] Website title doesn't truncate
- [ ] Subtitle doesn't truncate
- [ ] Text is readable and legible
- [ ] Proper spacing between title and subtitle
- [ ] Text color has good contrast

#### Hamburger Menu
- [ ] Menu button is visible
- [ ] Size is appropriate (38-42px)
- [ ] Icon is centered in button
- [ ] Button is easily tappable
- [ ] Active state provides feedback

#### Layout
- [ ] All elements fit within viewport
- [ ] No horizontal scrolling
- [ ] Proper alignment between logo, text, and menu
- [ ] Consistent spacing at all breakpoints
- [ ] Header shadow is visible

### Interaction Testing

#### Touch Targets
- [ ] Hamburger button is tappable (min 44px)
- [ ] Logo is tappable for preview
- [ ] No accidental taps on nearby elements

#### Menu Behavior
- [ ] Hamburger opens mobile menu
- [ ] Menu slides in smoothly
- [ ] Menu items are all visible
- [ ] Submenu toggles work correctly
- [ ] Language selector is accessible
- [ ] Menu closes when clicking outside

---

## ✅ Hero Section Checklist

### Visual Quality

#### Background Image
- [ ] Image loads quickly (< 1 second on 3G)
- [ ] Image is not pixelated
- [ ] Image covers entire hero area
- [ ] Image doesn't overflow horizontally

#### Text Readability
- [ ] Title is clearly readable
- [ ] Description text has good contrast
- [ ] Text has proper shadow for readability
- [ ] No text overlapping issues
- [ ] Text doesn't truncate unexpectedly

#### Buttons
- [ ] Buttons are visible and prominent
- [ ] Button text is readable
- [ ] Buttons stack vertically on mobile
- [ ] Buttons are side-by-side on desktop
- [ ] Proper spacing between buttons

### Responsive Behavior

#### 320px - 480px (Small Mobile)
- [ ] Hero height: 60-65vh
- [ ] Title: 1.65-1.75rem
- [ ] Description: 0.8-0.875rem
- [ ] Buttons: Full width, stacked
- [ ] All content fits without scroll

#### 481px - 768px (Large Mobile)
- [ ] Hero height: 70vh
- [ ] Title: 1.875-2rem
- [ ] Description: 0.9-0.925rem
- [ ] Buttons: Full width, stacked
- [ ] Proper padding around content

#### 769px - 1024px (Tablet)
- [ ] Hero height: 75vh
- [ ] Title: 2.5-3rem
- [ ] Description: 1rem
- [ ] Buttons: Side by side
- [ ] Content panel width: ~540px

#### 1025px+ (Desktop)
- [ ] Hero height: 75-80vh, max 800px
- [ ] Title: 3-3.5rem
- [ ] Description: 1-1.1rem
- [ ] Buttons: Side by side
- [ ] Gradient overlay provides contrast

### Interaction Testing

#### Button Interactions
- [ ] Hover state works on desktop
- [ ] Active state (press) works on mobile
- [ ] Buttons respond to click/tap
- [ ] No lag or delay in interaction
- [ ] Visual feedback is immediate

---

## 🎨 Design Consistency Checklist

### Typography
- [ ] Font sizes scale smoothly
- [ ] Line heights are consistent
- [ ] Text color is consistent
- [ ] Font weights are appropriate

### Spacing
- [ ] Padding is consistent
- [ ] Margins are appropriate
- [ ] Gap between elements is balanced
- [ ] No overlapping elements

### Colors
- [ ] Brand colors are correct
- [ ] Contrast meets WCAG standards
- [ ] Hover states are visible
- [ ] Active states provide feedback

### Transitions
- [ ] Animations are smooth
- [ ] No janky scrolling
- [ ] Transitions have appropriate duration
- [ ] No unnecessary motion

---

## 🚀 Performance Checklist

### Loading Speed
- [ ] Hero image loads in < 1s on 3G
- [ ] No layout shift during load
- [ ] Text is visible before images load
- [ ] Progressive loading works correctly

### Interaction Performance
- [ ] Button clicks respond immediately
- [ ] Menu opens/closes smoothly
- [ ] Scrolling is smooth (60fps)
- [ ] No lag when typing in forms

### Browser Console
- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] No 404 errors for assets
- [ ] No mixed content warnings

---

## 📱 Physical Device Testing

### iOS Devices
- [ ] iPhone SE (2nd gen) - 375×667
- [ ] iPhone 12/13/14 - 390×844
- [ ] iPhone 14 Pro Max - 430×932
- [ ] iPad Mini - 768×1024
- [ ] iPad Pro - 1024×1366

### Android Devices
- [ ] Small phone (320-360px width)
- [ ] Standard phone (360-400px width)
- [ ] Large phone (400-430px width)
- [ ] Tablet (768px+ width)

### Testing on Real Devices
1. Open website in mobile browser
2. Check header text truncation
3. Verify touch targets work
4. Test menu open/close
5. Check hero section contrast
6. Verify buttons are tappable
7. Test in portrait and landscape
8. Check on bright screen outdoors

---

## 🌐 Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)
- [ ] Samsung Internet
- [ ] Firefox Mobile

---

## 🔍 Specific Issues to Check

### Mobile Header
```
Issue: Text truncation
Check at: 320px, 375px, 390px
Solution: Verify ellipsis shows for long text
```

### Hero Section
```
Issue: Poor contrast
Check: On bright screen
Solution: Verify text shadow and overlay work
```

### Navigation
```
Issue: Menu not opening
Check: Hamburger button click
Solution: Verify z-index and display properties
```

### Buttons
```
Issue: Small touch targets
Check: Tap buttons on real device
Solution: Verify min 44px height
```

---

## 🎯 Critical User Flows

### 1. Homepage Visit
1. [ ] Load homepage
2. [ ] Read hero title and description
3. [ ] Click CTA button
4. [ ] Verify navigation works

### 2. Mobile Navigation
1. [ ] Open hamburger menu
2. [ ] Click main nav item
3. [ ] Open submenu
4. [ ] Click submenu item
5. [ ] Close menu

### 3. Content Exploration
1. [ ] Scroll through page
2. [ ] Click card/link
3. [ ] Navigate back
4. [ ] Verify scroll position restored

---

## 📊 Testing Tools

### Manual Testing
- Chrome DevTools Device Mode
- Firefox Responsive Design Mode
- Safari Web Inspector
- BrowserStack (for multiple devices)

### Automated Testing
```bash
# Run Lighthouse audit
npm run build
npx lighthouse http://localhost:3001 --view

# Check responsive images
npx responsive-image-lint http://localhost:3001

# Accessibility check
npx pa11y http://localhost:3001
```

### Performance Testing
- Google Lighthouse
- WebPageTest.org
- GTmetrix
- PageSpeed Insights

---

## 📝 Bug Report Template

If you find issues, report using this format:

```
Device: iPhone 14 (390×844)
Browser: Safari 17.0
Issue: Header text truncates at 320px
Steps to Reproduce:
1. Open site on iPhone SE
2. View header
3. Observe title cut off

Expected: Full title visible with ellipsis
Actual: Title cut off mid-word

Screenshot: [attach screenshot]
Priority: High/Medium/Low
```

---

## ✅ Final Verification

### Before Deployment
- [ ] All checklist items passed
- [ ] No critical bugs found
- [ ] Performance targets met
- [ ] Accessibility standards met
- [ ] Design approved
- [ ] Code reviewed
- [ ] Documentation updated

### Post-Deployment
- [ ] Monitor real user metrics
- [ ] Check error logs
- [ ] Verify analytics tracking
- [ ] Test on production URL
- [ ] Check CDN cache
- [ ] Verify HTTPS works

---

## 🆘 Troubleshooting

### Header Text Still Truncating
1. Check `.site-brand-copy` has `flex: 1 1 auto`
2. Verify `overflow: hidden` is set
3. Check `min-width: 0` on text container
4. Inspect actual screen width in DevTools

### Hero Image Not Loading Fast
1. Verify image is compressed
2. Check preload hint is present
3. Test network throttling
4. Clear cache and retry

### Menu Not Opening on Mobile
1. Check hamburger button display property
2. Verify z-index is correct
3. Check JavaScript console for errors
4. Test click event binding

### Buttons Too Small
1. Verify min-height is set
2. Check padding values
3. Test on actual device
4. Use browser DevTools to inspect

---

**Quick Test Command**:
```bash
# Open in multiple viewport sizes simultaneously
open -a "Google Chrome" "http://localhost:3001" --args --window-size=375,667
open -a "Google Chrome" "http://localhost:3001" --args --window-size=768,1024
open -a "Google Chrome" "http://localhost:3001" --args --window-size=1440,900
```

---

**Last Updated**: July 15, 2026
**Testing Version**: v1.0
**Project**: Dr. Toshima Karki Official Website
