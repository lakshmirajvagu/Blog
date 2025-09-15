// scripts/seed.js
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('./models/User');
const Post = require('./models/Post');

async function seed() {
  await connectDB();

  const user = await User.findOneAndUpdate(
    { email: 'seed@example.com' },
    { uid: 'seed-uid', email: 'seed@example.com', name: 'Seed User' },
    { upsert: true, new: true }
  );

  await Post.create({
    title: 'Hello world',
    content: '<p>This is seed post</p>',
    tags: ['intro'],
    author: user._id
  });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
