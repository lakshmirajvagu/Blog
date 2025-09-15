const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true }, // generated
  content: { type: String, required: true }, // sanitized HTML or markdown
  tags: [{ type: String, lowercase: true, trim: true }],
  imageUrl: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  commentsCount: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

// text index for search - title, tags, content
PostSchema.index({ title: 'text', tags: 'text', content: 'text' });

// pre-save: sanitize content and generate slug
PostSchema.pre('validate', function(next) {
  if (this.content) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img','h1','h2']),
      allowedAttributes: {
        a: ['href','name','target'],
        img: ['src','alt']
      }
    });
  }

  if (this.isModified('title') || !this.slug) {
    const base = slugify(this.title || 'post', { lower: true, strict: true });
    // add timestamp to reduce collisions
    this.slug = `${base}-${Date.now().toString(36).slice(-6)}`;
  }

  next();
});

module.exports = mongoose.model('Post', PostSchema);
