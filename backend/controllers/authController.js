// controllers/authController.js
const { auth, admin } = require('../lib/firebaseAdmin'); // expects { admin, auth }
const upsertUserFromFirebase = require('../utils/upsertUser');

// Signup: create Firebase user (server-side) and local user
// BODY: { email, password, name }
async function signup(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email & password required' });

    // Create the Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name || undefined,
    });

    // Upsert into local DB
    const decoded = { uid: userRecord.uid, email: userRecord.email, name: userRecord.displayName };
    const user = await upsertUserFromFirebase(decoded);

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    // Firebase will throw descriptive errors (duplicate email etc.)
    next(err);
  }
}

// Verify token: Accept idToken in body or Authorization header, verify, upsert user, return user
// BODY (optional): { idToken }
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const tokenFromHeader = (authHeader.match(/^Bearer (.+)$/) || [])[1];
    const idToken = req.body.idToken || tokenFromHeader;

    if (!idToken) return res.status(400).json({ error: 'idToken required' });

    const decoded = await auth.verifyIdToken(idToken);
    const user = await upsertUserFromFirebase(decoded);

    res.json({ ok: true, decoded, user });
  } catch (err) {
    next(err);
  }
}

// Optional: Session cookie flow (web apps that want httpOnly cookie sessions)
async function sessionLogin(req, res, next) {
  try {
    const idToken = req.body.idToken;
    if (!idToken) return res.status(400).json({ error: 'idToken required' });

    // set cookie TTL (e.g. 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    // Set cookie; secure:true in production (HTTPS)
    res.cookie('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: false });
    res.json({ message: 'Session cookie created' });
  } catch (err) {
    next(err);
  }
}

async function sessionLogout(req, res) {
  // Clear cookie
  res.clearCookie('session');
  res.json({ message: 'Logged out' });
}

module.exports = {
  signup,
  verifyToken,
  sessionLogin,
  sessionLogout
};
