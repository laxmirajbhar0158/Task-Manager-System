
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, 'data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = {
      users: {},
      tasks: {},
      settings: {},
      admin: { username: "Abhii", seeded: true }
    };
    await db.write();
  }
}

module.exports = { db, initDB };
