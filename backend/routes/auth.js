const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?,?)');
    const info = stmt.run(username, hash);
    const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ user });
  } catch (e) {
    return res.status(400).json({ error: 'Username taken' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!row) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: row.id, username: row.username } });
});

module.exports = router;
