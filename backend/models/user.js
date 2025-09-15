// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // firebase uid
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, default: '' },
    bio: { type: String, default: '' },

    // Image fields
    photoURL: { type: String, default: '' },         // Cloudinary secure_url
    photoPublicId: { type: String, default: '' },    // Cloudinary public_id

    role: { type: String, enum: ['user', 'author', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Optional: virtual field for number of posts
UserSchema.virtual('postsCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  count: true,
});

module.exports = mongoose.model('User', UserSchema);
