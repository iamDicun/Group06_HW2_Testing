# TC-CHECKOUT-009: Giỏ hàng của người dùng được xóa sạch sau khi checkout thành công

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
- Giỏ hàng đang có sản phẩm (S1: CART_ACTIVE).

## Test Data
| Field | Value |
|---|---|
| shipping_address | "123 Le Loi, TP.HCM" |
| total_amount | 200000 |

## Test Steps
1. Gửi request `POST /api/checkout` để thực hiện thanh toán thành công (chuyển sang S5: ORDER_PLACED).
2. Hệ thống thực hiện hành động xóa sạch giỏ hàng.
3. Người dùng quay trở lại màn hình Giỏ hàng hoặc gửi request `GET /api/cart`.
4. Kiểm tra trạng thái của giỏ hàng mới.

## Expected Result
- Request `GET /api/cart` trả về mảng rỗng `[]` (hoặc giỏ hàng rỗng).
- Trên giao diện người dùng, badge số lượng sản phẩm trên icon Giỏ hàng chuyển về số 0.
- Trang giỏ hàng hiển thị trạng thái trống kèm theo thông báo và hình ảnh minh họa phù hợp.

## Actual Result (filled after execution)
- API thanh toán thành công, nhưng giỏ hàng của người dùng không hề bị dọn dẹp (khi GET /api/cart vẫn trả về danh sách các sản phẩm cũ).

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-001

## Notes
- Kiểm tra tính đồng bộ và dọn dẹp tài nguyên giỏ hàng sau khi quy trình thanh toán kết thúc thành công.
