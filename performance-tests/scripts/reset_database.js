/**
 * Full Database Reset Script for EShop
 * Drops and re-creates all tables (orders, carts, users, products, coupons) and seeds fresh data
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

console.log('Resetting entire EShop SQLite database to fresh initial state...');

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS coupon_usage');
  db.run('DROP TABLE IF EXISTS coupons');
  db.run('DROP TABLE IF EXISTS users');
  db.run('DROP TABLE IF EXISTS products');
  db.run('DROP TABLE IF EXISTS categories');
  db.run('DROP TABLE IF EXISTS orders');

  // Categories
  db.run(`CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  // Coupons
  db.run(`CREATE TABLE coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    type TEXT DEFAULT 'percent',
    discount_value INTEGER,
    min_order_amount INTEGER DEFAULT 0,
    expired_at DATETIME,
    is_active INTEGER DEFAULT 1,
    max_uses_per_user INTEGER DEFAULT 1
  )`);

  // Coupon Usage
  db.run(`CREATE TABLE coupon_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coupon_id INTEGER,
    user_id INTEGER,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Users
  db.run(`CREATE TABLE users (
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

  // Products
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    description TEXT,
    imageUrl TEXT,
    category_id INTEGER
  )`);

  // Orders
  db.run(`CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_amount INTEGER,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Seed Categories
  const insertCat = db.prepare('INSERT INTO categories (name) VALUES (?)');
  insertCat.run('Điện thoại');
  insertCat.run('Laptop');
  insertCat.run('Phụ kiện');
  insertCat.finalize();

  // Seed Admin & Test User
  const insertUser = db.prepare('INSERT INTO users (name, email, password, role, shipping_address, phone) VALUES (?, ?, ?, ?, ?, ?)');
  insertUser.run('Admin User', 'admin@eshop.com', 'Admin123!', 'admin', '123 Le Loi, Q1, TP.HCM', '0912345678');
  insertUser.run('Test User', 'test@eshop.com', 'Test1234!', 'user', '456 Nguyen Trai, Q5, TP.HCM', '0901234567');

  // Seed 500 Performance Users
  for (let i = 1; i <= 500; i++) {
    const padded = String(i).padStart(4, '0');
    insertUser.run(
      `Perf User ${padded}`,
      `perf_user_${padded}@eshop.local`,
      'Password123!',
      'user',
      `${i} Nguyen Hue St, District 1, Ho Chi Minh City`,
      `090${String(1000000 + i).slice(1)}`
    );
  }
  insertUser.finalize();

  // Seed Products
  const insertProd = db.prepare('INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)');
  insertProd.run('iPhone 15 Pro Max', 30000000, 'Điện thoại cao cấp của Apple', 'https://placehold.co/300x300/png?text=iPhone+15', 1);
  insertProd.run('Samsung Galaxy S24 Ultra', 28000000, 'Màn hình hiển thị xuất sắc, camera siêu zoom', 'https://placehold.co/300x300/png?text=Samsung+S24', 1);
  insertProd.run('MacBook Pro M3', 45000000, 'Laptop chuyên nghiệp mạnh mẽ', 'https://placehold.co/300x300/png?text=Macbook+Pro', 2);
  insertProd.run('Tai nghe AirPods Pro 2', 6000000, 'Chống ồn chủ động xuất sắc', 'https://placehold.co/300x300/png?text=AirPods+Pro', 3);
  insertProd.run('Bàn phím cơ Keychron Q1', 4000000, 'Gõ cực sướng, thiết kế kim loại', 'https://placehold.co/300x300/png?text=Keychron+Q1', 3);
  insertProd.finalize();

  // Seed Coupons
  const insertCoupon = db.prepare('INSERT INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertCoupon.run('SAVE10', 'percent', 10, 300000, '2099-12-31', 1, 1);
  insertCoupon.run('BIGBUY', 'fixed', 50000, 500000, '2099-12-31', 1, 1);
  insertCoupon.run('VIP100', 'fixed', 100000, 300000, '2099-12-31', 1, 2);
  insertCoupon.run('EXPIRED', 'percent', 20, 100000, '2020-01-01', 1, 1);
  insertCoupon.finalize();

  console.log('Database successfully reset and re-seeded with clean data.');
});

db.close();
