const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. users.csv
const userRows = ['email,password,name'];
for (let i = 1; i <= 500; i++) {
  const padded = String(i).padStart(4, '0');
  userRows.push(`perf_user_${padded}@eshop.local,Password123!,Perf User ${padded}`);
}
fs.writeFileSync(path.join(dataDir, 'users.csv'), userRows.join('\n'), 'utf8');
console.log('Created users.csv (500 rows)');

// 2. products.csv (Search keywords and product IDs)
const productRows = [
  'search_query,expected_id,expected_name,price',
  'iPhone,1,iPhone 15 Pro Max,30000000',
  'Samsung,2,Samsung Galaxy S24 Ultra,28000000',
  'MacBook,3,MacBook Pro M3,45000000',
  'Sony,4,Sony WH-1000XM5,8500000',
  'iPad,5,iPad Air M2,17000000',
  'Phone,1,iPhone 15 Pro Max,30000000',
  'Laptop,3,MacBook Pro M3,45000000',
  'Headphones,4,Sony WH-1000XM5,8500000'
];
fs.writeFileSync(path.join(dataDir, 'products.csv'), productRows.join('\n'), 'utf8');
console.log('Created products.csv (8 rows)');

// 3. orders.csv (Checkout addresses and quantities)
const orderRows = [
  'shipping_address,quantity,coupon_code',
  '123 Le Loi St District 1 Ho Chi Minh City,1,SAVE10',
  '456 Nguyen Trai St District 5 Ho Chi Minh City,2,TET2025',
  '789 Tran Hung Dao St District 1 Ho Chi Minh City,1,',
  '12 Vo Van Kiet St District 1 Ho Chi Minh City,3,',
  '34 Hoang Dieu St District 4 Ho Chi Minh City,1,SAVE10',
  '56 Cach Mang Thang 8 St District 3 Ho Chi Minh City,2,',
  '78 Dien Bien Phu St Binh Thanh District Ho Chi Minh City,1,TET2025',
  '90 Phan Dang Luu St Phu Nhuan District Ho Chi Minh City,2,'
];
fs.writeFileSync(path.join(dataDir, 'orders.csv'), orderRows.join('\n'), 'utf8');
console.log('Created orders.csv (8 rows)');
