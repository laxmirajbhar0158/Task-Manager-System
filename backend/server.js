
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDB } = require('./db');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const PORT = process.env.PORT || 4000;

(async () => {
  const app = express();
  await initDB();

  app.use(cors());
  app.use(bodyParser.json({ limit: '5mb' }));

  app.use('/static', express.static('public'));

  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', tasksRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/', (req, res) => res.json({ message: 'Task Manager Pro API running!' }));

  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
})();
