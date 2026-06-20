const express = require('express');
const router = express.Router();
const { readDB, writeDB, generateId } = require('../db');

// Get all projects
router.get('/', (req, res) => {
  const db = readDB();
  const sorted = db.projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
});

// Create project
router.post('/', (req, res) => {
  const db = readDB();
  const project = {
    _id: generateId(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.projects.push(project);
  writeDB(db);
  res.status(201).json(project);
});

// Delete project
router.delete('/:id', (req, res) => {
  const db = readDB();
  const index = db.projects.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });
  db.projects.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
