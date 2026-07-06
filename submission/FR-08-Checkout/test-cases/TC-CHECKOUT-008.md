# TC-CHECKOUT-008: Backend tự động tính toán lại tổng tiền từ DB giỏ hàng

## Requirement ID
FR-08

## Feature
Thanh toán (Checkout)

## Module / Test Type / Technique
Checkout / Security / State Transition

## Priority
High

## Preconditions
- Người dùng đã đăng nhập và có token JWT hợp lệ.
- Giỏ hàng của người dùng đang có sản phẩm có giá trị thực tế là 300,000 ₫ trong DB/RAM.

## Test Data
| Field | Value |
|---|---|
| shipping_address | "123 Le Loi, TP.HCM" |
| total_amount (Payload giả mạo) | 1000 (cố ý truyền giá trị cực thấp nhằm chiếm đoạt) |

## Test Steps
1. Người dùng có giỏ hàng trị giá 300,000 ₫ (S1).
2. Người dùng đi tới trang Checkout Summary (S3).
3. Sử dụng công cụ (như Postman) hoặc can thiệp payload gửi request `POST /api/checkout` (E4), gửi trường `total_amount` giả mạo là `1000`.
4. Backend nhận request và thực hiện kiểm tra (S4). Theo đặc tả, backend phải bỏ qua giá trị `total_amount` từ Client gửi lên, tự truy vấn giá tiền sản phẩm từ DB và tính toán lại tổng tiền thực tế.
5. So khớp điều kiện hợp lệ và thực hiện lưu đơn hàng (E5 -> S5).

## Expected Result
- API trả về HTTP 200 OK.
- Đơn hàng mới được tạo trong CSDL phải có tổng tiền (`total_amount`) được ghi đúng là 300,000 ₫ (tổng thực tế từ DB), không phải giá trị 1,000 ₫ do client gửi lên.
- Giỏ hàng của người dùng bị xóa hoàn toàn.

## Actual Result (filled after execution)
- API trả về HTTP 200 OK. Đơn hàng được tạo trong DB ghi nhận tổng tiền là 1000 ₫ đúng theo payload giả mạo của Client gửi lên thay vì tự tính toán lại giá trị thực từ DB giỏ hàng.

## Status
FAILED

## Related Bugs
BUG-CHECKOUT-003

## Notes
- Kiểm thử bảo mật chống lỗi giả mạo tham số tiền (Parameter Tampering) ở phía client.
