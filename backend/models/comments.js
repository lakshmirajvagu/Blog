const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// sanitize comment content before save
CommentSchema.pre('save', function(next) {
  if (this.content) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: [],
      allowedAttributes: {}
    });
  }
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);
