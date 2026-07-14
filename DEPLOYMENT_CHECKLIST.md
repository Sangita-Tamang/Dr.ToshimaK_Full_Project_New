# Production Deployment Checklist

Complete checklist for deploying the optimized website to production.

## 📋 Pre-Deployment Checklist

### Frontend Optimization

#### 1. Image Optimization
- [ ] Run image compression script: `npm run optimize-images`
- [ ] Verify hero images are <200KB each
- [ ] Verify thumbnail/card images are <50KB each
- [ ] Check all images have proper alt text
- [ ] Test lazy loading works on all pages
- [ ] Verify blur placeholders appear during load

```bash
# Check image sizes
cd frontend/src/assets/images
ls -lh *.{jpg,png,webp} | awk '{print $5 "\t" $9}'
```

#### 2. Code Optimization
- [ ] Build production bundle: `npm run build`
- [ ] Analyze bundle size: `npm run analyze`
- [ ] Verify bundle is split (react-vendor, axios-vendor chunks)
- [ ] Check no console.logs in production build
- [ ] Test all lazy-loaded routes work correctly
- [ ] Verify error boundaries catch loading errors

```bash
cd frontend
npm run build
ls -lh dist/assets/*.js | head -10
```

**Target bundle sizes:**
- Main bundle: <300KB
- React vendor chunk: <150KB
- Axios vendor chunk: <50KB
- Each route chunk: <100KB

#### 3. CSS Optimization
- [ ] Run CSS audit: Check for unused styles
- [ ] Verify animations use GPU-accelerated properties
- [ ] Check no duplicate CSS rules
- [ ] Test responsive design on all breakpoints
- [ ] Verify no layout shifts during page load

#### 4. Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on slow 3G network (Chrome DevTools)
- [ ] Verify all images load properly
- [ ] Check all links work
- [ ] Test form submissions
- [ ] Verify 404 page redirects to home

### Backend Optimization

#### 1. Database Optimization
```javascript
// Add these indexes in MongoDB
db.news.createIndex({ createdAt: -1 });
db.news.createIndex({ published: 1, createdAt: -1 });
db.blog.createIndex({ createdAt: -1 });
db.blog.createIndex({ published: 1, createdAt: -1 });
db.gallery.createIndex({ createdAt: -1 });
db.media.createIndex({ type: 1, createdAt: -1 });
```

- [ ] Add database indexes for frequently queried fields
- [ ] Test query performance with `explain()`
- [ ] Implement pagination for large datasets
- [ ] Use `.lean()` for read-only queries
- [ ] Cache frequently accessed data

#### 2. API Optimization
- [ ] Enable compression middleware
- [ ] Set proper cache headers
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable CORS properly
- [ ] Test API response times (<200ms)

Add to `backend/server.js`:
```javascript
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Enable gzip compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Cache headers for static assets
app.use('/uploads', express.static('uploads', {
  maxAge: '1y',
  immutable: true
}));
```

#### 3. Security
- [ ] Update all dependencies: `npm audit fix`
- [ ] Set secure headers (helmet.js)
- [ ] Enable HTTPS only
- [ ] Sanitize user inputs
- [ ] Implement CSRF protection
- [ ] Set secure cookie flags

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Environment Configuration

#### 1. Environment Variables
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database URL
- [ ] Set secure JWT secret
- [ ] Configure CORS origins
- [ ] Set API rate limits

Create `.env.production`:
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://your-production-db
JWT_SECRET=your-secure-secret-here
FRONTEND_URL=https://your-domain.com
PORT=5050
```

#### 2. Build Configuration
- [ ] Verify `vite.config.js` has production optimizations
- [ ] Check terser removes console.logs
- [ ] Verify source maps are disabled
- [ ] Test production build locally: `npm run preview`

## 🚀 Deployment Steps

### Option 1: Deploy to Vercel/Netlify (Frontend)

#### Vercel Deployment
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Node Version: 18.x

#### Netlify Deployment
```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Configuration:**
- Build Command: `npm run build`
- Publish Directory: `dist`
- Node Version: 18

### Option 2: Deploy to VPS (Full Stack)

#### 1. Server Setup
```bash
# SSH into server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get install nginx
```

#### 2. Deploy Backend
```bash
# Clone repository
git clone https://github.com/your-repo.git
cd Dr.TK_project/backend

# Install dependencies
npm install --production

# Start with PM2
pm2 start server.js --name "dr-karki-backend"
pm2 save
pm2 startup
```

#### 3. Deploy Frontend
```bash
cd ../frontend
npm install
npm run build

# Copy to Nginx directory
sudo cp -r dist/* /var/www/html/
```

#### 4. Configure Nginx
```nginx
# /etc/nginx/sites-available/default

server {
    listen 80;
    server_name your-domain.com;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    gzip_min_length 1000;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Enable HTTPS (Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

## 📊 Post-Deployment Monitoring

### 1. Performance Testing

#### Run PageSpeed Insights
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

#### Check Core Web Vitals
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

### 2. Error Monitoring

#### Frontend Error Tracking
Add error boundary and logging:
```javascript
// src/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to your monitoring service
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

#### Backend Error Logging
```javascript
// backend/middleware/errorLogger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  next(err);
};
```

### 3. Performance Monitoring

#### Real User Monitoring (RUM)
```javascript
// Add to index.html
<script>
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  const metrics = {
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    tcp: perfData.connectEnd - perfData.connectStart,
    request: perfData.responseStart - perfData.requestStart,
    response: perfData.responseEnd - perfData.responseStart,
    dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
    total: perfData.loadEventEnd - perfData.fetchStart
  };
  
  // Send to analytics
  console.log('Performance Metrics:', metrics);
});
</script>
```

### 4. Uptime Monitoring

Use services like:
- UptimeRobot (free): https://uptimerobot.com/
- Pingdom
- StatusCake

## 🔄 Continuous Monitoring

### Daily Checks
- [ ] Server uptime: 99.9%+ target
- [ ] API response times: <200ms average
- [ ] Error rate: <0.1%
- [ ] Database connections: No leaks

### Weekly Checks
- [ ] PageSpeed Insights score
- [ ] Disk space usage
- [ ] Database size and performance
- [ ] SSL certificate expiry
- [ ] Security updates available

### Monthly Checks
- [ ] Full backup test
- [ ] Performance audit
- [ ] Dependency updates
- [ ] Security audit
- [ ] Access log analysis

## 🛠️ Maintenance Commands

```bash
# Check PM2 processes
pm2 status
pm2 logs dr-karki-backend

# Restart backend
pm2 restart dr-karki-backend

# Database backup
mongodump --uri="mongodb://your-connection-string" --out=/backup/$(date +%Y%m%d)

# Check disk usage
df -h

# Check memory usage
free -m

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Update SSL certificate
sudo certbot renew

# Clear old logs
sudo find /var/log -name "*.log" -mtime +30 -delete
```

## 📈 Performance Benchmarks

### Expected Performance (Post-Optimization)

#### Desktop (Fast Connection)
- First Contentful Paint: <0.8s
- Largest Contentful Paint: <1.5s
- Time to Interactive: <2.0s
- Total Page Size: <1.5MB

#### Mobile (3G)
- First Contentful Paint: <2.0s
- Largest Contentful Paint: <3.5s
- Time to Interactive: <4.5s
- Total Page Size: <1.0MB

## ✅ Final Verification

Before going live:
- [ ] All images optimized and loading fast
- [ ] Code splitting working (check Network tab)
- [ ] Lazy loading working for images and routes
- [ ] No console errors in production
- [ ] All links working
- [ ] Forms submitting correctly
- [ ] Mobile responsive on all pages
- [ ] HTTPS enabled
- [ ] Analytics tracking working
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] 404 page working
- [ ] Database backups automated
- [ ] Monitoring alerts configured

## 🎉 Post-Launch

1. **Monitor for 24 hours**
   - Watch error logs
   - Check performance metrics
   - Monitor server load

2. **User Testing**
   - Get feedback from real users
   - Check loading times from different locations
   - Test on various devices

3. **Optimize Further**
   - Analyze real user data
   - Identify bottlenecks
   - Implement additional optimizations

## 📞 Support

If issues arise:
1. Check error logs: PM2 logs, Nginx error logs
2. Verify database connection
3. Check API endpoints
4. Review recent changes
5. Rollback if necessary: `pm2 restart dr-karki-backend --update-env`

---

**Remember:** Performance optimization is an ongoing process. Continue monitoring and improving based on real user data.
