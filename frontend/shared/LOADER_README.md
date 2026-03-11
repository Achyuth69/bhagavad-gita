# Universal Page Loader

A responsive, device-friendly page loader for the Bhagavad Gita project.

## Features

✅ **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
✅ **Smooth Animations** - Beautiful rotating chakra with golden glow
✅ **Smart Loading** - Automatically hides when page is ready
✅ **Fallback Protection** - Force hides after 5 seconds max
✅ **Progress Tracking** - Optional progress bar for resource loading
✅ **Accessibility** - Respects reduced motion preferences
✅ **Performance** - Minimal impact on page load time

## Device Support

- 📱 Mobile (Portrait & Landscape)
- 📱 Tablets (Portrait & Landscape)
- 💻 Desktops & Laptops
- 🖥️ Large Screens (4K+)
- 🎨 High DPI/Retina Displays

## Usage

### 1. Include CSS
```html
<link rel="stylesheet" href="../shared/universal-loader.css">
```

### 2. Add HTML
```html
<div class="page-loader">
    <div class="loader-chakra"></div>
    <div class="loader-text">Loading...</div>
</div>
```

### 3. Include JavaScript
```html
<script src="../shared/universal-loader.js"></script>
```

## Customization

### Change Loader Text
```javascript
window.pageLoader.updateText('Loading Chapters...');
```

### Manual Control
```javascript
// Hide loader manually
window.pageLoader.hide();

// Show loader again
window.pageLoader.show();
```

## Configuration

Edit `universal-loader.js` to adjust:
- `minDisplayTime`: Minimum display duration (default: 500ms)
- `maxDisplayTime`: Maximum display duration (default: 5000ms)
- `fadeOutDuration`: Fade animation duration (default: 500ms)

## Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet Portrait**: 481px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Screen**: > 1441px

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Loader removes itself from DOM after hiding
- Uses CSS transforms for smooth animations
- Respects `prefers-reduced-motion`
- Minimal JavaScript overhead

## Troubleshooting

### Loader not hiding?
- Check browser console for errors
- Verify all scripts are loaded
- Check if `universal-loader.js` is included

### Loader hiding too fast?
- Increase `minDisplayTime` in config
- Add preload links for critical resources

### Loader showing too long?
- Decrease `maxDisplayTime` in config
- Optimize resource loading

## Files

- `universal-loader.css` - Styles and animations
- `universal-loader.js` - Loading logic and control
- `LOADER_README.md` - This documentation

## Integration Status

✅ Dashboard (`frontend/Dashboard/index.html`)
✅ Chapters List (`frontend/Chapters/chapters.html`)
✅ Chapter View (`frontend/Chapters/chapter.html`)
✅ Translation (`frontend/BV/translation.html`)

---

**Made with 🙏 for the Bhagavad Gita project**
