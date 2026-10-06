
const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_real_secret';
const SALT_ROUNDS = 10;

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { username, password, avatar } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username/password required' });
  await db.read();
  if (db.data.users[username]) return res.status(409).json({ error: 'username exists' });
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const userObj = { username, password: hashed, avatar: avatar || '👤', createdAt: new Date().toISOString(), suspended: false };
  db.data.users[username] = userObj;
  db.data.tasks[username] = [];
  db.data.settings[username] = { theme: 'corporate-blue' };
  await db.write();
  const token = createToken({ username });
  res.json({ token, user: { username, avatar: userObj.avatar } });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  await db.read();
  const user = db.data.users[username];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.suspended) return res.status(403).json({ error: 'Account suspended' });
  const token = createToken({ username });
  res.json({ token, user: { username, avatar: user.avatar } });
});

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    await db.read();
    const user = db.data.users[payload.username];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { username: user.username, avatar: user.avatar, createdAt: user.createdAt } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
