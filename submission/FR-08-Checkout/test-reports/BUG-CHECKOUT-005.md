# BUG-CHECKOUT-005: Cho phép tạo nhiều đơn hàng trùng lặp khi bấm Đặt hàng liên tiếp (Race Condition)

## Found by Test Case
TC-CHECKOUT-010

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
2. Thêm sản phẩm vào giỏ hàng.
3. Gửi đồng thời hoặc liên tiếp 2 request `POST /api/checkout` với cùng một JWT token và payload địa chỉ, số tiền trong khoảng thời gian cực ngắn (dưới 100ms) để giả lập thao tác click đúp của người dùng.

## Expected Result
- Chỉ có 1 đơn hàng duy nhất được tạo thành công trong hệ thống.
- Các request gửi sau phải bị hệ thống từ chối (trả về lỗi HTTP 400 Bad Request hoặc 409 Conflict) vì giỏ hàng đã bị xóa ngay sau khi request đầu tiên xử lý thành công.

## Actual Result
- Cả hai request đều trả về HTTP 200 OK và sinh ra 2 ID đơn hàng khác nhau trong cơ sở dữ liệu bảng `orders` cho cùng một phiên mua hàng. Không có bất kỳ cơ chế khóa (locking) hoặc dọn dẹp giỏ hàng kịp thời để chặn các request tiếp theo.

## Evidence
```bash
# Gửi đồng thời hai request checkout bằng curl song song hoặc gửi rất nhanh liên tiếp
curl.exe -X POST http://localhost:3000/api/checkout -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"total_amount": 200000, "shipping_address": "123 Le Loi"}'
# Response 1: {"message": "Checkout successful", "orderId": 9}

curl.exe -X POST http://localhost:3000/api/checkout -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"total_amount": 200000, "shipping_address": "123 Le Loi"}'
# Response 2: {"message": "Checkout successful", "orderId": 10}
```

## Labels
- `type: bug`
- `module: CHECKOUT`
- `severity: Major`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-CHECKOUT-010`
