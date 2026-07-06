# TC-CHECKOUT-001: Thanh toán thành công khi đã đăng nhập (Happy Path)

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
- Giỏ hàng của người dùng đang có ít nhất 1 sản phẩm (S1: CART_ACTIVE).

## Test Data
| Field | Value |
|---|---|
| shipping_address (Request Body) | "123 Le Loi, TP.HCM" |
| total_amount (Request Body) | 200000 |

## Test Steps
1. Gửi request `POST /api/cart` để thêm sản phẩm trị giá 200,000 ₫ vào giỏ hàng.
2. Gửi request `GET /api/cart` để kiểm tra giỏ hàng có sản phẩm.
3. Người dùng bấm nút "Thanh toán" (kích hoạt E1). Hệ thống chuyển sang xác thực token (S2) và chấp nhận (E2) vì token hợp lệ.
4. Hệ thống hiển thị trang tóm tắt thanh toán (S3: CHECKOUT_SUMMARY).
5. Người dùng nhập địa chỉ giao hàng và bấm nút "Đặt hàng" (kích hoạt E4), gửi request `POST /api/checkout` với body chứa thông tin thanh toán.
6. Backend nhận request và thực hiện tính toán xác thực (S4). Vì thông tin hợp lệ (E5), hệ thống chuyển sang trạng thái đặt hàng thành công (S5).

## Expected Result
- API trả về HTTP 200 OK.
- Response chứa thông báo "Checkout successful" và trả về `orderId` tương ứng.
- Đơn hàng mới với `status = "pending"` và thông tin đúng được lưu vào CSDL.
- Giỏ hàng của người dùng bị xóa hoàn toàn.

## Actual Result (filled after execution)
- API trả về mã HTTP 200 và thông báo "Checkout successful". Tuy nhiên, giỏ hàng của người dùng không hề được xóa sạch (khi gọi GET /api/cart vẫn trả về các mặt hàng cũ).

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-001

## Notes
- Kiểm thử luồng thành công cơ bản (happy path) cho quy trình chuyển đổi trạng thái của checkout.
