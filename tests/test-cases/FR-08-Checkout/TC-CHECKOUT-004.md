# TC-CHECKOUT-004: Hủy thanh toán tại trang Checkout Summary quay về giỏ hàng

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Functional / State Transition

## Priority
Medium

## Preconditions
- Người dùng đã đăng nhập.
- Đang ở màn hình Thanh toán (S3: CHECKOUT_SUMMARY) hiển thị tóm tắt đơn hàng.

## Test Data
None

## Test Steps
1. Người dùng đang xem thông tin thanh toán tại trang tóm tắt (S3) nhưng quyết định thay đổi sản phẩm hoặc không mua nữa.
2. Người dùng bấm nút "Quay lại Giỏ hàng" hoặc logo cửa hàng để hủy checkout (kích hoạt E7).
3. Hệ thống điều hướng người dùng quay lại màn hình giỏ hàng (S1: CART_ACTIVE).

## Expected Result
- Người dùng được chuyển hướng thành công về trang Giỏ hàng.
- Toàn bộ sản phẩm trong giỏ hàng được bảo toàn đúng trạng thái trước khi bấm thanh toán.

## Actual Result (filled after execution)
- Khi bấm quay lại từ trang tóm tắt thanh toán, giao diện điều hướng về trang giỏ hàng thành công, giỏ hàng được giữ nguyên.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra tính bảo toàn của giỏ hàng khi người dùng chủ động hủy thanh toán ở bước tóm tắt đơn hàng.
