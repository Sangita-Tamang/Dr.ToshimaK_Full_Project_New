const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, register); // only logged-in users (admins) can register new users
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
