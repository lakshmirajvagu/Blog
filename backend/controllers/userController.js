// controllers/userController.js
const upsertUserFromFirebase = require('../utils/upsertUser');
const User = require('../models/User');
const Post = require('../models/Post');

async function getMe(req, res, next) {
  try {
    const decoded = req.user;
    const user = await upsertUserFromFirebase(decoded);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    const decoded = req.user;
    const user = await upsertUserFromFirebase(decoded);

    const updatable = {};
    if (req.body.name !== undefined) updatable.name = req.body.name;
    if (req.body.bio !== undefined) updatable.bio = req.body.bio;
    if (req.body.photoURL !== undefined) updatable.photoURL = req.body.photoURL;

    const updated = await User.findByIdAndUpdate(user._id, updatable, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Public: get a user's profile by uid or user id
async function getUserProfile(req, res, next) {
  try {
    const identifier = req.params.identifier;
    // allow either uid or Mongo _id
    let user = null;
    user = await User.findOne({ uid: identifier }).select('-__v');
    if (!user && mongoose.isValidObjectId(identifier)) {
      user = await User.findById(identifier).select('-__v');
    }
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getUserPosts(req, res, next) {
  try {
    const identifier = req.params.identifier;
    let user = await User.findOne({ uid: identifier });
    if (!user && mongoose.isValidObjectId(identifier)) {
      user = await User.findById(identifier);
    }
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 }).populate('author','name photoURL');
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMe,
  updateMe,
  getUserProfile,
  getUserPosts
};
