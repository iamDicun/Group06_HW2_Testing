---
title: "[BUG][FR-16]: Violation of Atomic All-or-Nothing Transaction on Product CSV Batch Import"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-IMPORT-ST-002` (và `TC-IMPORT-ST-003`, `TC-IMPORT-ST-004`)

### Requirement Related
`FR-16` (Product Import CSV/JSON) & Database Transactional Integrity

### Severity
Major

### Priority
P1

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/admin/import-products`
- **Test Account**: `admin@test.com` (Role: `admin`, Student ID: `23127391`)

### Steps to Reproduce
1. Đăng nhập với tài khoản Admin để lấy token.
2. Gửi request `POST /api/admin/import-products` với một lô gồm 3 sản phẩm, trong đó sản phẩm thứ 2 bị lỗi (ví dụ thiếu tên hoặc giá không hợp lệ):
   ```json
   {
     "products": [
       { "name": "San Pham Hop Le 1", "price": 100000, "category_id": 1 },
       { "name": "", "price": 150000, "category_id": 1 },
       { "name": "San Pham Hop Le 3", "price": 200000, "category_id": 1 }
     ]
   }
   ```
3. Kiểm tra số lượng bản ghi trả về trong `inserted` và danh sách lỗi `errors`.
4. Gửi `GET /api/products` để kiểm tra các sản phẩm đã được lưu trong CSDL SQLite.

### Expected Result
- Theo đặc tả FR-16: Quá trình import batch phải tuân thủ nguyên tắc **Giao dịch nguyên tử (All-or-Nothing Rollback)**.
- Nếu có bất kỳ dòng nào trong file/batch bị lỗi, toàn bộ quá trình import phải bị hủy bỏ (Rollback), **không một sản phẩm nào trong lô được phép lưu vào CSDL** (`inserted = 0`).
- Server phải thông báo lỗi chi tiết cho các dòng vi phạm để người dùng chỉnh sửa và import lại.

### Actual Result
- Backend không sử dụng Database Transaction mà dùng vòng lặp `rows.forEach` chèn từng dòng một.
- Sản phẩm 1 và Sản phẩm 3 vẫn được lưu thành công vào CSDL (`inserted = 2`), trong khi chỉ dòng 2 bị ghi nhận vào mảng `errors`.
- Dữ liệu bị chèn dở dang (partial insert), dẫn đến trùng lặp dữ liệu khi người dùng sửa lỗi và import lại toàn bộ file CSV.

### Evidence

#### 1. Request & Response Log
```http
POST /api/admin/import-products HTTP/1.1
Host: localhost:3000
Authorization: Bearer <admin_token>
Content-Type: application/json
X-Student-Id: 23127391

{
  "products": [
    { "name": "San Pham Hop Le 1", "price": 100000, "category_id": 1 },
    { "name": "", "price": 150000, "category_id": 1 },
    { "name": "San Pham Hop Le 3", "price": 200000, "category_id": 1 }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Import hoàn tất: 2/3 sản phẩm được thêm",
  "inserted": 2,
  "errors": [
    "Hàng 3: Thiếu tên sản phẩm"
  ]
}
```

#### 2. Lỗi kiến trúc trong mã nguồn Backend (`application/backend/server.js:212-233`)
```javascript
// LỖ HỔNG: Không mở Transaction BEGIN TRANSACTION ... COMMIT / ROLLBACK
rows.forEach((row, index) => {
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
  stmt.run(row.name, row.price, row.description || "", row.imageUrl || "", row.category_id || 1, function (err) {
    if (err) {
      errors.push(`Hàng ${index + 2}: ${err.message}`);
    } else {
      inserted++;
    }
  });
});
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-IMPORT-ST-002: Atomic rollback on invalid batch
  AssertionError: expected inserted count to be 0 (All-or-Nothing) but got 2
```

#### 4. Khuyến nghị khắc phục
- Thực hiện validation toàn bộ lô sản phẩm trước khi chèn vào DB.
- Bao bọc toàn bộ thao tác ghi vào SQLite Transaction:
  ```javascript
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    // Validate và Insert
    // Nếu có bất kỳ lỗi nào -> db.run("ROLLBACK")
    // Nếu toàn bộ thành công -> db.run("COMMIT")
  });
  ```
