// controllers/postController.js
const Post = require('../models/Post');
const upsertUserFromFirebase = require('../utils/upsertUser');
const mongoose = require('mongoose');

// Helper: build tags array
function parseTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(t => String(t).trim().toLowerCase());
  return String(tags).split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
}

async function createPost(req, res, next) {
  try {
    const firebaseDecoded = req.user;
    const user = await upsertUserFromFirebase(firebaseDecoded);

    const { title, content, tags, imageUrl } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content required' });

    const post = new Post({
      title,
      content,
      tags: parseTags(tags),
      imageUrl: imageUrl || '',
      author: user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function getPosts(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, parseInt(req.query.limit || '10'));
    const q = req.query.q;
    const tag = req.query.tag;

    const filter = {};
    if (q) filter.$text = { $search: q };
    if (tag) filter.tags = tag;

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name photoURL'),
      Post.countDocuments(filter)
    ]);

    res.json({
      data: posts,
      meta: {
        page, limit, total, totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const id = req.params.id;
    let post;
    if (mongoose.isValidObjectId(id)) {
      post = await Post.findById(id).populate('author', 'name photoURL');
    }
    if (!post) {
      post = await Post.findOne({ slug: id }).populate('author', 'name photoURL');
    }
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const firebaseDecoded = req.user;
    const user = await upsertUserFromFirebase(firebaseDecoded);

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (!post.author.equals(user._id)) return res.status(403).json({ error: 'Not authorized' });

    const { title, content, tags, imageUrl, published } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags !== undefined) post.tags = parseTags(tags);
    if (imageUrl !== undefined) post.imageUrl = imageUrl;
    if (published !== undefined) post.published = published;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const firebaseDecoded = req.user;
    const user = await upsertUserFromFirebase(firebaseDecoded);

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (!post.author.equals(user._id)) return res.status(403).json({ error: 'Not authorized' });

    await post.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// Optional toggles
async function toggleLike(req, res, next) {
  try {
    const firebaseDecoded = req.user;
    const user = await upsertUserFromFirebase(firebaseDecoded);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.likes.findIndex(id => id.equals(user._id));
    if (idx >= 0) {
      post.likes.splice(idx, 1);
    } else {
      post.likes.push(user._id);
    }
    await post.save();
    res.json({ likesCount: post.likes.length, liked: idx < 0 });
  } catch (err) {
    next(err);
  }
}

async function toggleBookmark(req, res, next) {
  try {
    const firebaseDecoded = req.user;
    const user = await upsertUserFromFirebase(firebaseDecoded);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.bookmarks.findIndex(id => id.equals(user._id));
    if (idx >= 0) {
      post.bookmarks.splice(idx, 1);
    } else {
      post.bookmarks.push(user._id);
    }
    await post.save();
    res.json({ bookmarksCount: post.bookmarks.length, bookmarked: idx < 0 });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark
};
