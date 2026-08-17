# [SEC/PERF BUG] SQL Injection & Unindexed Full-Table Scan on Product Search API

**GitHub Issue:** https://github.com/iamDicun/Group06_HW2_Testing/issues/154  
**Endpoint:** `GET /api/products?search={query}`  
**Mức độ:** Critical / P1  

## 1. Mô Tả Lỗi
Trong quá trình thực thi k6 performance test ở nhóm endpoint Read-heavy `GET /api/products?search=`, phát hiện code backend trong `application/backend/server.js` thực hiện nối chuỗi trực tiếp tham số tìm kiếm vào câu lệnh SQL query:
```javascript
const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
```

## 2. Tác Động
1. **Lỗ hổng Bảo mật (SQL Injection):** Kẻ tấn công có thể chèn các ký tự điều khiển SQL (ví dụ: `' OR 1=1 --`) để truy xuất toàn bộ dữ liệu nhạy cảm hoặc can thiệp cấu trúc database.
2. **Suy giảm Hiệu năng (Performance Degradation):** Câu lệnh `LIKE '%query%'` với dấu `%` ở đầu bắt buộc SQLite phải thực hiện **Full-Table Scan (Quét toàn bộ bảng)** mà không thể sử dụng B-Tree Index. Khi số lượng sản phẩm lớn dưới tải Stress Test, I/O đĩa và CPU của server bị đẩy lên rất cao.

## 3. Các Bước Tái Hiện
1. Khởi động Backend EShop (`node server.js`).
2. Gửi request tìm kiếm sản phẩm:
   `GET http://localhost:3000/api/products?search=iPhone'%20OR%201=1--`
3. Quan sát response trả về toàn bộ dữ liệu bảng `products`.

## 4. Giải Pháp Khắc Phục
Sử dụng Parameterized Query (Prepared Statement) để ngăn chặn SQL Injection và tối ưu hóa truy vấn:
```javascript
db.all("SELECT * FROM products WHERE name LIKE ?", [`%${searchQuery}%`], (err, rows) => { ... });
```
