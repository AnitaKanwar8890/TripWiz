-- users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- trips table
CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  notes TEXT,
  image_url TEXT,
  latitude REAL,
  longitude REAL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- sample seed user (password placeholder)
INSERT OR IGNORE INTO users (id, username, password_hash, created_at)
VALUES (1, 'demo', 'demohashplaceholder', CURRENT_TIMESTAMP);

-- sample trips (without image)
INSERT INTO trips (user_id, title, destination, start_date, end_date, notes, latitude, longitude)
VALUES
(1, 'Weekend at Goa', 'Goa, India', '2025-12-12', '2025-12-15', 'Book beach shack', 15.4909, 73.8278),
(1, 'Himalayan Trek', 'Manali, India', '2026-01-05', '2026-01-12', 'Carry warm clothes', 32.2432, 77.1892);
