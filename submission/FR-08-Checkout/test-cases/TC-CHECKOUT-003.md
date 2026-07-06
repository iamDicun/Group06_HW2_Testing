# TC-CHECKOUT-003: Hủy thanh toán tại trang Đăng nhập quay về giỏ hàng

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Functional / State Transition

## Priority
Medium

## Preconditions
- Người dùng chưa đăng nhập.
- Giỏ hàng đang có ít nhất 1 sản phẩm (S1: CART_ACTIVE).

## Test Data
None

## Test Steps
1. Người dùng ở trang giỏ hàng (S1) bấm nút "Thanh toán" (E1).
2. Hệ thống kiểm tra (S2), do chưa đăng nhập (E3) nên chuyển hướng sang trang Login (S6: CHECKOUT_FAILED).
3. Tại trang Đăng nhập, người dùng không muốn đăng nhập nữa nên bấm nút "Quay lại Giỏ hàng" hoặc "Quay lại" (kích hoạt E7).
4. Hệ thống điều hướng người dùng quay lại màn hình giỏ hàng ban đầu (S1: CART_ACTIVE).

## Expected Result
- Người dùng được chuyển hướng trở lại trang Giỏ hàng.
- Tất cả sản phẩm và số lượng trong giỏ hàng được giữ nguyên, không bị mất mát hay thay đổi.

## Actual Result (filled after execution)
- Khi bấm quay lại từ trang đăng nhập, người dùng được điều hướng về giỏ hàng. Toàn bộ sản phẩm được giữ nguyên.

## Status
PASSED

## Related Bugs
None

## Notes
- Kiểm tra tính bảo toàn dữ liệu giỏ hàng của client-side session khi hủy tiến trình đăng nhập giữa chừng.
