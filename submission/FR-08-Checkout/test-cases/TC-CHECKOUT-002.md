# TC-CHECKOUT-002: Thanh toán thành công sau khi chuyển hướng đăng nhập

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Functional / State Transition

## Priority
High

## Preconditions
- Người dùng chưa đăng nhập (không có token JWT).
- Giỏ hàng của người dùng đang có sản phẩm (S1: CART_ACTIVE - lưu ở client session).

## Test Data
| Field | Value |
|---|---|
| email | "test@eshop.com" |
| password | "Test1234!" |
| shipping_address | "123 Le Loi, TP.HCM" |

## Test Steps
1. Người dùng ở trạng thái giỏ hàng có sản phẩm (S1) bấm nút "Thanh toán" (E1).
2. Hệ thống kiểm tra xác thực (S2) và phát hiện chưa đăng nhập (E3: AUTH_FAIL).
3. Hệ thống chuyển hướng người dùng sang trang đăng nhập (S6: CHECKOUT_FAILED / AUTH_REDIRECT).
4. Người dùng điền email/password và bấm "Đăng nhập" (kích hoạt E8: RELOGIN_SUCCESS).
5. Hệ thống khôi phục session giỏ hàng, chuyển người dùng đến trang tóm tắt thanh toán (S3: CHECKOUT_SUMMARY).
6. Người dùng điền địa chỉ giao hàng và bấm "Đặt hàng" (E4), gửi request `POST /api/checkout`.
7. Backend xác thực (S4) thành công (E5) và lưu đơn hàng, xóa giỏ hàng (S5: ORDER_PLACED).

## Expected Result
- Người dùng bị chặn ở bước Checkout ban đầu và chuyển hướng đúng sang trang Login.
- Sau khi đăng nhập thành công, hệ thống dẫn tiếp tục tới trang Checkout mà không làm mất sản phẩm trong giỏ hàng.
- Bấm Đặt hàng thành công, Backend tạo đơn hàng `pending` và trả về HTTP 200 OK.
- Giỏ hàng của người dùng bị xóa hoàn toàn.

## Actual Result (filled after execution)
- Người dùng chuyển hướng đăng nhập và quay lại checkout thành công. Nhưng giỏ hàng của người dùng không bị xóa sạch sau khi checkout (GET /api/cart vẫn còn sản phẩm).

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-001

## Notes
- Kiểm tra tích hợp giữa phân hệ đăng nhập và checkout, đảm bảo trải nghiệm liền mạch của khách hàng.
