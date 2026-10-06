
const express = require('express');
const router = express.Router();
const { db } = require('../db');

function ensureAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  const ADMIN_KEY = process.env.ADMIN_KEY || 'default-admin-key';
  if (key !== ADMIN_KEY) return res.status(403).json({ error: 'Forbidden' });
  next();
}

router.get('/users', ensureAdmin, async (req, res) => {
  await db.read();
  const allUsers = Object.keys(db.data.users).map(username => {
    const user = db.data.users[username];
    const tasks = db.data.tasks[username] || [];
    const settings = db.data.settings[username] || {};
    return {
      username,
      avatar: user.avatar,
      taskCount: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      pendingTasks: tasks.filter(t => t.status !== 'completed').length,
      highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
      lastActive: tasks.length > 0 ? tasks.sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt))[0].updatedAt : user.createdAt,
      theme: settings.theme || 'corporate-blue',
      suspended: user.suspended || false
    };
  });
  res.json({ users: allUsers });
});

router.delete('/users/:username', ensureAdmin, async (req, res) => {
  const { username } = req.params;
  await db.read();
  delete db.data.users[username];
  delete db.data.tasks[username];
  delete db.data.settings[username];
  await db.write();
  res.json({ success: true });
});

module.exports = router;
