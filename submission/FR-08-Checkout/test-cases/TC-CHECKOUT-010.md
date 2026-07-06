# TC-CHECKOUT-010: Ngăn chặn tạo đơn hàng trùng lặp khi bấm Đặt hàng liên tục

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Robustness / State Transition

## Priority
High

## Preconditions
- Người dùng đã đăng nhập và có token JWT hợp lệ.
- Đang ở màn hình Checkout Summary (S3) với giỏ hàng có sản phẩm.

## Test Data
| Field | Value |
|---|---|
| shipping_address | "123 Le Loi, TP.HCM" |
| total_amount | 200000 |

## Test Steps
1. Tại trang tóm tắt thanh toán (S3), người dùng bấm liên tiếp 2 hoặc nhiều lần (double click) vào nút "Đặt hàng" (E4) trong thời gian cực ngắn (dưới 500ms) trước khi trang kịp chuyển hướng hoặc bị vô hiệu hóa nút bấm.
2. Hệ thống chuyển sang trạng thái xử lý Backend (S4) cho các request được gửi lên.
3. Backend nhận đồng thời nhiều request `POST /api/checkout` của cùng một user và giỏ hàng.
4. Kiểm tra số lượng đơn hàng mới được tạo trong cơ sở dữ liệu.

## Expected Result
- Chỉ có duy nhất 1 đơn hàng được tạo thành công trong cơ sở dữ liệu.
- Các request gửi sau phải bị hệ thống từ chối (trả về lỗi 400 hoặc 409 Conflict) do giỏ hàng đã bị xóa ngay sau request đầu tiên được xử lý thành công.
- Giao diện người dùng không bị hiển thị lỗi hệ thống nghiêm trọng và chỉ điều hướng sang trang thành công của đúng đơn hàng duy nhất đó.

## Actual Result (filled after execution)
- Cả 2 request gửi liên tiếp đều trả về HTTP 200 OK và tạo ra 2 đơn hàng giống hệt nhau trong bảng `orders` của DB.

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-005

## Notes
- Kiểm tra tính bền vững của hệ thống (Robustness) trước các thao tác nhấp đúp hoặc race condition khi tạo đơn hàng.
