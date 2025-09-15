// utils/upsertUser.js
const User = require('./models/User');

async function upsertUserFromFirebase(firebaseUser) {
  const filter = { uid: firebaseUser.uid };
  const update = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.name || firebaseUser.displayName || '',
    photoURL: firebaseUser.picture || firebaseUser.photoURL || ''
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const user = await User.findOneAndUpdate(filter, update, options);
  return user;
}

module.exports = upsertUserFromFirebase;
