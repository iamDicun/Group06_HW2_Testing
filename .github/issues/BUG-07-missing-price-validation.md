---
title: "[BUG][FR-16]: Missing Validation on Product Price Permitting Negative or Zero Price Import"
labels: ["type: bug", "status: new"]
---

### Found by Test Case
`TC-IMPORT-DP-016` (và `TC-IMPORT-DP-017`)

### Requirement Related
`FR-16` (Product Import CSV/JSON) & Domain Validation (Price > 0)

### Severity
Major

### Priority
P2

### Environment
- **Client**: Postman v10.24 / Newman v6.1.3
- **Runtime**: Node.js v18.19.0 / Express.js
- **Database**: SQLite3
- **Target URL**: `http://localhost:3000/api/admin/import-products`
- **Test Account**: `admin@test.com` (Role: `admin`, Student ID: `23127391`)

### Steps to Reproduce
1. Đăng nhập với tài khoản Admin để lấy token.
2. Gửi request `POST /api/admin/import-products` với mảng sản phẩm chứa giá tiền không hợp lệ (`price = 0` hoặc `price = -50000`):
   ```json
   {
     "products": [
       { "name": "San Pham Mien Phi 0 Dong", "price": 0, "category_id": 1 },
       { "name": "San Pham Gia Am", "price": -50000, "category_id": 1 }
     ]
   }
   ```
3. Kiểm tra HTTP Status Code và Response Body trả về.
4. Gửi `GET /api/products` để kiểm tra các sản phẩm trong CSDL.

### Expected Result
- Theo đặc tả FR-16 và quy tắc nghiệp vụ sàn EShop: Giá sản phẩm (`price`) bắt buộc phải là một **số thực dương lớn hơn 0** (`price > 0`).
- Các sản phẩm có giá `= 0` hoặc `< 0` phải bị từ chối và ghi nhận vào danh sách lỗi validation (`errors`).
- Backend phải phản hồi mã lỗi hoặc từ chối chèn các sản phẩm có giá không hợp lệ.

### Actual Result
- Backend chỉ kiểm tra `if (!row.name)` mà hoàn toàn bỏ qua việc kiểm tra trường `row.price`.
- Sản phẩm có giá `0 ₫` và `-50000 ₫` được lưu thành công vào CSDL SQLite (`inserted = 2`).
- Người dùng có thể mua hàng với giá 0 ₫ hoặc nhận tiền hoàn ngược khi thanh toán đơn hàng có giá âm.

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
    { "name": "San Pham Mien Phi 0 Dong", "price": 0, "category_id": 1 },
    { "name": "San Pham Gia Am", "price": -50000, "category_id": 1 }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Import hoàn tất: 2/2 sản phẩm được thêm",
  "inserted": 2,
  "errors": []
}
```

#### 2. Lỗ hổng trong mã nguồn Backend (`application/backend/server.js:214-220`)
```javascript
rows.forEach((row, index) => {
  // LỖ HỔNG: Chỉ kiểm tra tồn tại name, không validate kiểu dữ liệu và miền giá trị của price
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
  stmt.run(
    row.name,
    row.price, // Nhận trực tiếp bất kỳ giá trị nào kể cả 0 hoặc số âm
    row.description || "",
    ...
```

#### 3. Newman Test Assertion Failure
```
FAIL - TC-IMPORT-DP-016: Reject import product with price = 0
  AssertionError: expected errors array to contain price validation error but got empty errors array
FAIL - TC-IMPORT-DP-017: Reject import product with negative price
  AssertionError: expected errors array to contain negative price error but got empty errors array
```

#### 4. Khuyến nghị khắc phục
- Bổ sung validation giá tiền trước khi chèn vào CSDL:
  ```javascript
  if (row.price === undefined || row.price === null || isNaN(row.price) || Number(row.price) <= 0) {
    errors.push(`Hàng ${index + 2}: Giá sản phẩm phải là số dương (> 0)`);
    return;
  }
  ```
