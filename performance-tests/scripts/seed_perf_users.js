/**
 * Seed 500 test users for k6 performance testing
 * Ensures unique accounts for all virtual users to prevent concurrency lockout collisions
 */
const path = require('path');
const sqlite3 = require(path.resolve(__dirname, '../../application/backend/node_modules/sqlite3')).verbose();

const dbPath = path.resolve(__dirname, '../../application/backend/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
    process.exit(1);
  }
  console.log('Connected to database at:', dbPath);
});

const USER_COUNT = 500;
const DEFAULT_PASSWORD = 'Password123!';

db.serialize(() => {
  console.log(`Seeding ${USER_COUNT} performance testing users...`);

  // Ensure users table exists
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user',
    login_attempts INTEGER DEFAULT 0,
    locked_until DATETIME,
    reset_token TEXT,
    shipping_address TEXT,
    phone TEXT
  )`);

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO users (name, email, password, role, login_attempts, locked_until, shipping_address, phone)
    VALUES (?, ?, ?, 'user', 0, NULL, ?, ?)
  `);

  for (let i = 1; i <= USER_COUNT; i++) {
    const padded = String(i).padStart(4, '0');
    const name = `Perf User ${padded}`;
    const email = `perf_user_${padded}@eshop.local`;
    const address = `${i} Nguyen Hue St, District 1, Ho Chi Minh City`;
    const phone = `090${String(1000000 + i).slice(1)}`;

    stmt.run(name, email, DEFAULT_PASSWORD, address, phone);
  }

  stmt.finalize((err) => {
    if (err) {
      console.error('Error finalizing user inserts:', err);
    } else {
      console.log(`Successfully seeded ${USER_COUNT} users (perf_user_0001@eshop.local -> perf_user_0500@eshop.local)`);
    }
  });

  // Verify product seeds exist
  db.all('SELECT COUNT(*) as count FROM products', [], (err, rows) => {
    if (err) {
      console.error('Error checking products:', err);
    } else if (rows[0].count === 0) {
      console.log('Products table empty, inserting standard products...');
      const insertProduct = db.prepare('INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)');
      insertProduct.run('iPhone 15 Pro Max', 30000000, 'Apple Flagship Smartphone', 'https://placehold.co/300x300/png?text=iPhone+15', 1);
      insertProduct.run('Samsung Galaxy S24 Ultra', 28000000, 'AI Camera Zoom Smartphone', 'https://placehold.co/300x300/png?text=Samsung+S24', 1);
      insertProduct.run('MacBook Pro M3', 45000000, 'Apple Silicon Laptop', 'https://placehold.co/300x300/png?text=Macbook+Pro', 2);
      insertProduct.run('Sony WH-1000XM5', 8500000, 'Noise Cancelling Headphones', 'https://placehold.co/300x300/png?text=Sony+Headphones', 3);
      insertProduct.run('iPad Air M2', 17000000, 'Tablet for creators', 'https://placehold.co/300x300/png?text=iPad+Air', 1);
      insertProduct.finalize();
    } else {
      console.log(`Products table has ${rows[0].count} products.`);
    }
  });
});

db.close((err) => {
  if (err) console.error('Error closing database:', err);
  else console.log('Database connection closed.');
});
