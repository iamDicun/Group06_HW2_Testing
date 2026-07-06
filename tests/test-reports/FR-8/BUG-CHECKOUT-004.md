# BUG-CHECKOUT-004: API cho phép đặt hàng khi giỏ hàng trống rỗng

## Found by Test Case
TC-CHECKOUT-007

## Requirement Related
FR-08

## Severity / Priority
Major / P2

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** test@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản `test@eshop.com`.
2. Kiểm tra/đảm bảo giỏ hàng trống rỗng (`GET /api/cart` trả về `[]`).
3. Gửi request `POST /api/checkout` để thực hiện thanh toán với địa chỉ và số tiền ngẫu nhiên.

## Expected Result
- API phải chặn tiến trình thanh toán và trả về mã lỗi HTTP 400 Bad Request cùng thông điệp lỗi: "Giỏ hàng rỗng, không thể thanh toán".
- Không có đơn hàng mới nào được tạo trong hệ thống.

## Actual Result
- API trả về HTTP 200 OK thông báo đặt hàng thành công (`Checkout successful`) và tạo ra một đơn hàng ảo mới trong bảng `orders` của DB. Backend hoàn toàn thiếu bước kiểm tra giỏ hàng của người dùng trước khi tiến hành chèn đơn hàng.

## Evidence
```bash
# 1. Truy vấn giỏ hàng trống
curl.exe -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer <user_token>"
# Response: []

# 2. Gửi request checkout
curl.exe -X POST http://localhost:3000/api/checkout \
  -H "Authorization: Bearer <user_token>" \
  -H "Content-Type: application/json" \
  -d '{"total_amount": 200000, "shipping_address": "123 Le Loi, TP.HCM"}'

# Response nhận được
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Checkout successful",
  "orderId": 8
}
```

## Labels
- `type: bug`
- `module: CHECKOUT`
- `severity: Major`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-CHECKOUT-007`
