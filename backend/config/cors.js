const cors = require('cors');

const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite standard port
  'http://localhost:5000',
  'https://toshimakarki.gov.np',
  'https://www.toshimakarki.gov.np'
];

// Allow configuring allowed origins via environment variable (comma-separated)
// e.g. ALLOWED_ORIGINS="https://my-app.vercel.app,https://admin.myapp.com"
const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
  : [];

const allowedOrigins = Array.from(new Set([...DEFAULT_ORIGINS, ...envOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
