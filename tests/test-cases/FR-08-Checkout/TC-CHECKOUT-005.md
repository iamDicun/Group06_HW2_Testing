# TC-CHECKOUT-005: Thanh toán thất bại do địa chỉ giao hàng rỗng

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
- Đang ở màn hình Thanh toán (S3: CHECKOUT_SUMMARY) hiển thị tóm tắt đơn hàng.

## Test Data
| Field | Value |
|---|---|
| shipping_address (Request Body) | "" (chuỗi rỗng) |
| total_amount (Request Body) | 200000 |

## Test Steps
1. Tại trang tóm tắt thanh toán (S3), người dùng xóa trống trường "Địa chỉ giao hàng" (hoặc truyền `""` hoặc `null` thông qua API).
2. Người dùng bấm nút "Đặt hàng" (E4), gửi request `POST /api/checkout` với trường `shipping_address` rỗng.
3. Backend nhận request và thực hiện validate dữ liệu (S4). Do địa chỉ rỗng, backend validate thất bại (kích hoạt E6: VALIDATION_FAIL).
4. Hệ thống chuyển sang trạng thái lỗi (S6: CHECKOUT_FAILED) và báo lỗi cho người dùng.

## Expected Result
- API trả về mã lỗi HTTP 400 Bad Request.
- Phản hồi trả về thông báo lỗi phù hợp (ví dụ: "Địa chỉ giao hàng không được để trống").
- Không có đơn hàng mới nào được tạo trong cơ sở dữ liệu.
- Giỏ hàng của người dùng được giữ nguyên, không bị xóa.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK và tạo đơn hàng thành công mặc dù shipping_address truyền vào rỗng.

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-002

## Notes
- Kiểm tra tính chặt chẽ trong khâu validate trường bắt buộc (`shipping_address`) của API Backend.
