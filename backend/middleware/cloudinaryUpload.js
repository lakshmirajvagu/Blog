// middleware/cloudinaryUpload.js
const streamifier = require('streamifier');
const cloudinary = require('../utils/cloudinary');

/**
 * Middleware factory: pass folder name optional (e.g., 'profiles')
 * Usage: router.put('/me', authMiddleware, upload.single('photo'), cloudinaryUpload('profiles'), userController.updateMe)
 */
module.exports = function cloudinaryUpload(folder = 'profiles') {
  return async (req, res, next) => {
    if (!req.file || !req.file.buffer) return next(); // nothing to upload

    try {
      const uploadFromBuffer = (buffer) =>
        new Promise((resolve, reject) => {
          const cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(cld_upload_stream);
        });

      const result = await uploadFromBuffer(req.file.buffer);
      // expose Cloudinary result to controller via req.body
      req.body.photoURL = result.secure_url;
      req.body.photoPublicId = result.public_id;
      return next();
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return next(err);
    }
  };
};
