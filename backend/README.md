# Dr. Toshima Karki Official Website - Backend API

This is the Node.js/Express backend API built with MongoDB and Mongoose.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Logger**: Winston
- **Uploads**: Multer

## Project Structure
```
backend/
├── config/             # Configuration (DB, CORS, env, logger)
├── controllers/        # Express controllers (Business logic)
├── middleware/         # Custom Express middlewares (Auth, error handling)
├── models/             # Mongoose schemas/models
├── routes/             # Express routes definition
├── services/           # Helper services (Auth, Email, Upload)
├── .env                # Local environment configuration
├── seeder.js           # Database seeder script
├── server.js           # Entry point
└── package.json        # Dependencies & scripts
```

## Getting Started

### Prerequisites
- Node.js installed (v18+)
- MongoDB server running locally or a connection URI (e.g. Atlas)

### Setup & Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Seed initial data (Admin user, default structures, and initial blogs/news):
   ```bash
   node seeder.js
   ```
   *Note: This clears existing database collections and inserts fresh mockup data.*
   *Default Admin credentials created: `admin@toshimakarki.gov.np` / `password123`*

3. Run the development server (uses nodemon):
   ```bash
   npm run dev
   ```

The API will be live at `http://localhost:5000`.
