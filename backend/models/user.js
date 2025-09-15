const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // firebase uid
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: '' },
  photoURL: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, enum: ['user','author','admin'], default: 'user' },
}, { timestamps: true });

// optional virtual for posts count (requires populate or separate aggregation)
UserSchema.virtual('postsCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  count: true
});

module.exports = mongoose.model('User', UserSchema);
