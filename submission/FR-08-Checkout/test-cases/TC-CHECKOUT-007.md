# TC-CHECKOUT-007: Thanh toán thất bại do giỏ hàng rỗng

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Functional / State Transition

## Priority
High

## Preconditions
- Người dùng đã đăng nhập và có token JWT hợp lệ.
- Giỏ hàng của người dùng trống (không có sản phẩm nào).

## Test Data
| Field | Value |
|---|---|
| shipping_address | "123 Le Loi, TP.HCM" |
| total_amount | 0 |

## Test Steps
1. Đảm bảo giỏ hàng của người dùng không có sản phẩm nào.
2. Gửi request `POST /api/checkout` với body chứa thông tin thanh toán.
3. Backend nhận request và kiểm tra giỏ hàng của user trong DB/RAM (S4). Phát hiện giỏ hàng trống (kích hoạt E6: VALIDATION_FAIL).
4. Hệ thống từ chối thanh toán và chuyển sang trạng thái lỗi (S6: CHECKOUT_FAILED).

## Expected Result
- API trả về mã lỗi HTTP 400 Bad Request.
- Response chứa thông báo lỗi phù hợp (ví dụ: "Giỏ hàng rỗng, không thể thanh toán").
- Không có đơn hàng mới nào được tạo trong cơ sở dữ liệu.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK và tạo đơn hàng ảo thành công mặc dù giỏ hàng của người dùng hiện tại trống rỗng.

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-004

## Notes
- Kiểm tra tính toàn vẹn nghiệp vụ ở phía Backend, tránh việc tạo đơn hàng không có sản phẩm.
