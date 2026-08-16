/**
 * Reset account lockout status and attempts for all performance users
 */
const path = require('path');
const sqlite3 = require(path.resolve(__dirname, '../../application/backend/node_modules/sqlite3')).verbose();

const dbPath = path.resolve(__dirname, '../../application/backend/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  console.log('Resetting login attempts and locked_until for all users...');
  db.run('UPDATE users SET login_attempts = 0, locked_until = NULL', function (err) {
    if (err) {
      console.error('Failed to reset lockouts:', err.message);
    } else {
      console.log(`Lockouts successfully reset. Affected users: ${this.changes}`);
    }
  });
});

db.close();
