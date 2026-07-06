# BUG-CHECKOUT-003: API chấp nhận và lưu giá trị total_amount giả mạo từ phía Client

## Found by Test Case
TC-CHECKOUT-008

## Requirement Related
FR-08

## Severity / Priority
Critical / P1

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** test@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản `test@eshop.com`.
2. Thêm sản phẩm có tổng giá trị thực tế là 30,000,000 ₫ (ví dụ: iPhone 15 Pro Max) vào giỏ hàng.
3. Gửi request `POST /api/checkout` thanh toán nhưng cố tình sửa giá trị trường `total_amount` thành `1000` trong JSON payload.

## Expected Result
- Theo đặc tả yêu cầu của hệ thống: *Backend phải tự tính lại tổng tiền; không chấp nhận giá trị total_amount do client gửi lên*.
- Do đó, đơn hàng được tạo trong cơ sở dữ liệu phải lưu đúng tổng tiền là 30,000,000 ₫ (truy vấn trực tiếp từ bảng sản phẩm). Hoặc API phải từ chối xử lý khi phát hiện sai lệch.

## Actual Result
- API trả về HTTP 200 OK thông báo đặt hàng thành công.
- Trong cơ sở dữ liệu bảng `orders`, đơn hàng mới được tạo được ghi nhận số tiền `total_amount` là `1000` ₫ thay vì 30,000,000 ₫. Lập trình viên đã bỏ qua bước tự tính toán lại giá trị thực tế từ DB giỏ hàng.

## Evidence
```bash
# Gửi request checkout với số tiền giả mạo (1000đ thay vì 30tr)
curl.exe -X POST http://localhost:3000/api/checkout \
  -H "Authorization: Bearer <user_token>" \
  -H "Content-Type: application/json" \
  -d '{"total_amount": 1000, "shipping_address": "123 Le Loi, TP.HCM"}'

# Response nhận được
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Checkout successful",
  "orderId": 7
}

# Truy vấn đơn hàng vừa tạo trong DB
curl.exe -X GET http://localhost:3000/api/orders/7 \
  -H "Authorization: Bearer <user_token>"

# Response chi tiết đơn hàng
{
  "id": 7,
  "user_id": 2,
  "total_amount": 1000,
  "status": "pending",
  "shipping_address": "123 Le Loi, TP.HCM",
  "created_at": "2026-07-06 09:16:30"
}
```

## Labels
- `type: bug`
- `module: CHECKOUT`
- `severity: Critical`
- `priority: P1`
- `status: new`
- `found-by: test-case TC-CHECKOUT-008`
