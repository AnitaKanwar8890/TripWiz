const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const upload = multer({ dest: UPLOAD_DIR });
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Malformed token' });
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.user = payload; next();
  } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
}

// helpers
function rowToTrip(r) {
  return {
    id: r.id,
    user_id: r.user_id,
    title: r.title,
    destination: r.destination,
    start_date: r.start_date,
    end_date: r.end_date,
    notes: r.notes,
    image_url: r.image_url,
    latitude: r.latitude,
    longitude: r.longitude,
    created_at: r.created_at
  };
}

// Public: list (only user's trips if ?mine=true)
router.get('/', (req, res) => {
  const mine = req.query.mine === 'true';
  if (mine) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const token = auth.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      const rows = db.prepare('SELECT * FROM trips WHERE user_id = ? ORDER BY start_date').all(payload.id);
      return res.json(rows.map(rowToTrip));
    } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
  }
  const rows = db.prepare('SELECT * FROM trips ORDER BY start_date').all();
  res.json(rows.map(rowToTrip));
});

// Get single
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(rowToTrip(row));
});

// Create (authenticated)
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  const { title, destination, start_date, end_date, notes, latitude, longitude } = req.body;
  if (!title || !destination || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  let image_url = null;
  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }
  const stmt = db.prepare('INSERT INTO trips (user_id, title,destination,start_date,end_date,notes,image_url,latitude,longitude) VALUES (?,?,?,?,?,?,?,?,?)');
  const info = stmt.run(req.user.id, title, destination, start_date, end_date, notes || '', image_url, latitude || null, longitude || null);
  const created = db.prepare('SELECT * FROM trips WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(rowToTrip(created));
});

// Update
router.put('/:id', authMiddleware, upload.single('image'), (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  if (existing.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const { title, destination, start_date, end_date, notes, latitude, longitude } = req.body;
  let image_url = existing.image_url;
  if (req.file) image_url = `/uploads/${req.file.filename}`;
  const stmt = db.prepare('UPDATE trips SET title=?, destination=?, start_date=?, end_date=?, notes=?, image_url=?, latitude=?, longitude=? WHERE id=?');
  const info = stmt.run(title, destination, start_date, end_date, notes || '', image_url, latitude || null, longitude || null, id);
  const updated = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
  res.json(rowToTrip(updated));
});

// Delete
router.delete('/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  if (existing.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const info = db.prepare('DELETE FROM trips WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
