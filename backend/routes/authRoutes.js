// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/auth/register (회원가입)
router.post('/register', registerUser);

// POST /api/auth/login (로그인)
router.post('/login', loginUser);

module.exports = router;