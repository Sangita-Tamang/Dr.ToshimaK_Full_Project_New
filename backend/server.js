const express = require('express');
const path = require('path');
const cors = require('cors');
const env = require('./config/env');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const logger = require('./config/logger');

// Connect to MongoDB
connectDB();

// Route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/about.routes');
const ministryRoutes = require('./routes/ministry.routes');
const parliamentRoutes = require('./routes/parliament.routes');
const newsRoutes = require('./routes/news.routes');
const blogRoutes = require('./routes/blog.routes');
const mediaRoutes = require('./routes/media.routes');
const galleryRoutes = require('./routes/gallery.routes');
const contactRoutes = require('./routes/contact.routes');
const interviewRoutes = require('./routes/interview.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const uploadRoutes = require('./routes/upload.routes');
const settingsRoutes = require('./routes/settings.routes');
const internshipRoutes = require('./routes/internship.routes');
const internshipApplicationRoutes = require('./routes/internship-application.routes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Serve static assets/uploads
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/ministry', ministryRoutes);
app.use('/api/parliament', parliamentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/internship-applications', internshipApplicationRoutes);

// Log requests middleware in development mode
if (env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// Global error handler
app.use(errorHandler);

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection Error: ${err.message}`);
  logger.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
