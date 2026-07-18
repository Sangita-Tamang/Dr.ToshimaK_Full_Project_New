const express = require('express');
const path = require('path');
const cors = require('cors');
const env = require('./config/env');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const logger = require('./config/logger');
const User = require('./models/User');

const ensureDefaultAdmin = async () => {
    try {
        const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@toshimakarki.gov.np').toLowerCase();
        const defaultPassword = process.env.ADMIN_PASSWORD || 'password123';

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            return existingAdmin;
        }

        const existingByEmail = await User.findOne({ email: defaultEmail });
        if (existingByEmail) {
            existingByEmail.role = 'admin';
            await existingByEmail.save();
            return existingByEmail;
        }

        const adminUser = await User.create({
            name: 'Administrator',
            email: defaultEmail,
            password: defaultPassword,
            role: 'admin'
        });

        logger.info(`Default admin account ensured: ${adminUser.email}`);
        return adminUser;
    } catch (error) {
        logger.error(`Admin bootstrap failed: ${error.message}`);
        console.error(`Admin bootstrap failed: ${error.message}`);
    }
};

// Connect MongoDB
connectDB().then(() => ensureDefaultAdmin());

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/about.routes');
const ministryRoutes = require('./routes/ministry.routes');
const parliamentRoutes = require('./routes/parliament.routes');
const parliamentActivityRoutes = require('./routes/parliament-activity.routes');
const partyRoutes = require('./routes/party.routes');
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
const debugRoutes = require('./routes/debug.routes');
const engagementRoutes = require('./routes/engagement.routes');
const imagesRoutes = require('./routes/images.routes');


const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(cors());


// Health check route
app.get('/', (req,res)=>{
    res.status(200).json({
        message:"Dr. Toshima Karki API is running 🚀",
        status:"success",
        environment: env.NODE_ENV
    });
});


// Static uploads
app.use('/uploads',
    express.static(path.join(__dirname,'../frontend/public/uploads'))
);


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/ministry', ministryRoutes);
app.use('/api/parliament', parliamentRoutes);
app.use('/api/parliament', parliamentActivityRoutes);
app.use('/api/party', partyRoutes);
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
app.use('/api/debug', debugRoutes);
app.use('/api/engagements', engagementRoutes);
app.use('/api/images', imagesRoutes);


// Error handler
app.use(errorHandler);


const PORT = env.PORT || 5050;


const server = app.listen(PORT,()=>{
    console.log(
      `Server running in ${env.NODE_ENV} mode on port ${PORT}`
    );

    logger.info(
      `Server running in ${env.NODE_ENV} mode on port ${PORT}`
    );
});


// Handle errors
process.on('unhandledRejection',(err)=>{

    console.log(
      `Unhandled Rejection Error: ${err.message}`
    );

    logger.error(
      `Unhandled Rejection Error: ${err.message}`
    );

    server.close(()=>{
        process.exit(1);
    });

});
