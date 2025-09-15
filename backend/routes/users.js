// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');
const { body } = require('express-validator');
const cloudinaryUpload = require('../middleware/cloudinaryUpload'); 


const upload = require('../middleware/multer'); // multer middleware


// Protected: current user
router.get('/me', authMiddleware, userController.getMe);
router.put(
  '/me',
  authMiddleware,
  upload.single('photo'),            // parses multipart/form-data and puts file in req.file
  cloudinaryUpload('profiles'),     // uploads to Cloudinary and sets req.body.photoURL & photoPublicId
  [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('bio').optional().isString().isLength({ max: 300 }).withMessage('Bio max 300 chars'),
    body('photoURL').optional().isURL().withMessage('photoURL must be a valid URL'),
  ],
  userController.updateMe
);

// Public: fetch by uid or id and their posts
router.get('/:identifier', userController.getUserProfile);
router.get('/:identifier/posts', userController.getUserPosts);

module.exports = router;
