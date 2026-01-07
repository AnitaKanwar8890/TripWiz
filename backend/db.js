const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_PATH = process.env.DATABASE || path.join(__dirname, 'tripwhiz.db');

function init() {
  const exists = fs.existsSync(DB_PATH);
  const db = new Database(DB_PATH);
  if (!exists) {
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', 'init.sql'), 'utf8');
    db.exec(sql);
    console.log('Database created and initialised at', DB_PATH);
  }
  return db;
}

const db = init();
module.exports = db;
