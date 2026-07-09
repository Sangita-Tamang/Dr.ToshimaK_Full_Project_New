const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite standard port
  'http://localhost:5000',
  'https://toshimakarki.gov.np',
  'https://www.toshimakarki.gov.np'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
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
