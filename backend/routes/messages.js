const express = require('express');
const router = express.Router();
const { readDB, writeDB, generateId } = require('../db');

// Get all messages
router.get('/', (req, res) => {
  const db = readDB();
  const sorted = db.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
});

// Submit a message
router.post('/', (req, res) => {
  const db = readDB();
  const message = {
    _id: generateId(),
    name: req.body.name,
    email: req.body.email,
    service: req.body.service,
    message: req.body.message,
    read: false,
    createdAt: new Date().toISOString()
  };
  db.messages.push(message);
  writeDB(db);
  res.status(201).json(message);
});

// Mark as read
router.patch('/:id', (req, res) => {
  const db = readDB();
  const msg = db.messages.find(m => m._id === req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  msg.read = true;
  writeDB(db);
  res.json(msg);
});

module.exports = router;
