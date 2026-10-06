
const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { ensureAuth } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

router.get('/me/settings', ensureAuth, async (req, res) => {
  await db.read();
  const username = req.user.username;
  const settings = db.data.settings[username] || { theme: 'corporate-blue' };
  res.json({ settings });
});

router.post('/me/settings', ensureAuth, async (req, res) => {
  await db.read();
  const username = req.user.username;
  db.data.settings[username] = { ...(db.data.settings[username] || {}), ...req.body };
  await db.write();
  res.json({ settings: db.data.settings[username] });
});

router.post('/me/avatar', ensureAuth, async (req, res) => {
  const { avatar } = req.body;
  await db.read();
  const username = req.user.username;
  db.data.users[username].avatar = avatar;
  await db.write();
  res.json({ avatar });
});

router.post('/me/password', ensureAuth, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ error: 'Weak password' });
  await db.read();
  const username = req.user.username;
  const hashed = await bcrypt.hash(newPassword, 10);
  db.data.users[username].password = hashed;
  await db.write();
  res.json({ success: true });
});

router.delete('/me', ensureAuth, async (req, res) => {
  await db.read();
  const username = req.user.username;
  delete db.data.users[username];
  delete db.data.tasks[username];
  delete db.data.settings[username];
  await db.write();
  res.json({ success: true });
});

module.exports = router;
