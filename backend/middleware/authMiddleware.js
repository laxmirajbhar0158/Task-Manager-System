
const jwt = require('jsonwebtoken');
const { db } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_real_secret';

async function ensureAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    await db.read();
    const user = db.data.users[payload.username];
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { ensureAuth };
