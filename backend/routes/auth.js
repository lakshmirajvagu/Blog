// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/verifyToken   (body: { idToken } or Authorization: Bearer <idToken>)
router.post('/verifyToken', authController.verifyToken);

// Optional cookie session endpoints:
router.post('/sessionLogin', authController.sessionLogin);
router.post('/sessionLogout', authController.sessionLogout);

module.exports = router;
