// utils/upsertUser.js
const User = require('../models/User');

// Accepts the decoded Firebase token (req.user) and upserts a local User doc.
async function upsertUserFromFirebase(decodedToken) {
  if (!decodedToken) throw new Error('No firebase token provided');

  const uid = decodedToken.uid || decodedToken.user_id || decodedToken.sub;
  const email = decodedToken.email;
  const name = decodedToken.name || decodedToken.displayName || '';
  const photoURL = decodedToken.picture || decodedToken.photoURL || '';

  const update = {
    uid,
    email,
    name,
    photoURL
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const user = await User.findOneAndUpdate({ uid }, update, options);
  return user;
}

module.exports = upsertUserFromFirebase;
