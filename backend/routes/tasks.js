
const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { ensureAuth } = require('../middleware/authMiddleware');
const { nanoid } = require('nanoid');

router.get('/', ensureAuth, async (req, res) => {
  await db.read();
  const username = req.user.username;
  const tasks = db.data.tasks[username] || [];
  res.json({ tasks });
});

router.post('/', ensureAuth, async (req, res) => {
  const taskData = req.body;
  await db.read();
  const username = req.user.username;
  const newTask = { id: nanoid(), ...taskData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), completedAt: null };
  db.data.tasks[username] = db.data.tasks[username] || [];
  db.data.tasks[username].push(newTask);
  await db.write();
  res.json({ task: newTask });
});

router.put('/:taskId', ensureAuth, async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;
  await db.read();
  const username = req.user.username;
  const tasks = db.data.tasks[username] || [];
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const updated = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString(), completedAt: updates.status === 'completed' ? new Date().toISOString() : tasks[idx].completedAt };
  tasks[idx] = updated;
  db.data.tasks[username] = tasks;
  await db.write();
  res.json({ task: updated });
});

router.delete('/:taskId', ensureAuth, async (req, res) => {
  const { taskId } = req.params;
  await db.read();
  const username = req.user.username;
  db.data.tasks[username] = (db.data.tasks[username] || []).filter(t => t.id !== taskId);
  await db.write();
  res.json({ success: true });
});

module.exports = router;
