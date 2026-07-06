# TC-CHECKOUT-006: Thanh toán thất bại do Token xác thực hết hạn đột ngột

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Security / State Transition

## Priority
High

## Preconditions
- Người dùng đã đăng nhập và đang ở trang Checkout Summary (S3).
- Token JWT bị hết hạn đột ngột (hoặc bị sửa đổi/mất hiệu lực trước khi bấm nút Đặt hàng).

## Test Data
| Field | Value |
|---|---|
| Authorization Header | "Bearer expired_token..." |
| shipping_address | "123 Le Loi, TP.HCM" |

## Test Steps
1. Người dùng đang ở màn hình Thanh toán (S3).
2. Token JWT hết hạn đột ngột (giả lập bằng cách gửi token hết hạn hoặc token sai chữ ký qua API).
3. Người dùng bấm nút "Đặt hàng" (E4) gửi request `POST /api/checkout`.
4. Backend nhận request và chạy middleware xác thực (S4). Quá trình kiểm tra token thất bại (kích hoạt E6: VALIDATION_FAIL / AUTH_FAIL).
5. Hệ thống từ chối xử lý và chuyển sang trạng thái lỗi (S6: CHECKOUT_FAILED).

## Expected Result
- API trả về mã lỗi HTTP 401 Unauthorized hoặc 403 Forbidden.
- Không có đơn hàng mới nào được tạo trong cơ sở dữ liệu.
- Client chuyển hướng người dùng sang trang đăng nhập và bảo lưu giỏ hàng của họ.

## Actual Result (filled after execution)
- API trả về mã lỗi HTTP 403 Forbidden. Request thanh toán bị chặn đúng như kỳ vọng do token hết hạn.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra tính bảo mật liên tục của phiên giao dịch tại thời điểm thực tế gửi request thanh toán.
