const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { projects: [], messages: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (err) {
    return { projects: [], messages: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

module.exports = { readDB, writeDB, generateId };
