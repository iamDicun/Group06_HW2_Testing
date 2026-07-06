# BUG-CHECKOUT-002: API cho phép đặt hàng thành công khi địa chỉ giao hàng rỗng

## Found by Test Case
TC-CHECKOUT-005

## Requirement Related
FR-08

## Severity / Priority
Medium / P3

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** test@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản `test@eshop.com` để nhận token.
2. Thêm sản phẩm vào giỏ hàng.
3. Gửi request `POST /api/checkout` với trường `shipping_address` là một chuỗi rỗng `""`.

## Expected Result
- API phải từ chối xử lý và trả về mã phản hồi HTTP 400 Bad Request do thiếu địa chỉ nhận hàng bắt buộc.
- Không có đơn hàng mới nào được tạo trong cơ sở dữ liệu.

## Actual Result
- API trả về HTTP 200 OK thông báo đặt hàng thành công (`Checkout successful`) và sinh ra ID đơn hàng mới.
- Đơn hàng được lưu vào cơ sở dữ liệu bảng `orders` với trường `shipping_address` bị để trống.

## Evidence
```bash
# Gửi request checkout với địa chỉ rỗng
curl.exe -X POST http://localhost:3000/api/checkout \
  -H "Authorization: Bearer <user_token>" \
  -H "Content-Type: application/json" \
  -d '{"total_amount": 200000, "shipping_address": ""}'

# Response nhận được
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "message": "Checkout successful",
  "orderId": 6
}
```

## Labels
- `type: bug`
- `module: CHECKOUT`
- `severity: Medium`
- `priority: P3`
- `status: new`
- `found-by: test-case TC-CHECKOUT-005`
