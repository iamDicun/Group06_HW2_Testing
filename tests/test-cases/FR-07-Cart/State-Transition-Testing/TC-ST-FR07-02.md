# TC-ST-FR07-02: S1 (no event) → S1

**Mô tả:** Giỏ trống → Vào Cart xác nhận giỏ đang ở trạng thái Empty

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S1 (Cart_Empty) |
| **Event** | Không có (trạng thái tĩnh) |
| **Verification** | View Cart để xác nhận S1 |
| **End State** | S1 (Cart_Empty) |

## FR-07 Liên quan
- Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng trống (S1)

## Các bước thực hiện
1. Đăng nhập vào hệ thống
2. Điều hướng đến trang Giỏ hàng

## Kết quả mong đợi
- [ ] Giỏ hàng ở trạng thái Empty (S1)
- [ ] Hiển thị **hình minh họa** (icon/illustration)
- [ ] Có **thông báo rõ ràng** (VD: "Giỏ hàng của bạn đang trống")
- [ ] Có nút/link để quay lại mua sắm
- [ ] **Không** hiển thị danh sách sản phẩm, bảng tổng tiền

## Kết quả thực tế
- [x] Giỏ hàng ở trạng thái Empty (S1)
- [ ] **FAIL:** Không có hình minh họa — chỉ text
- [x] Có thông báo "Giỏ hàng của bạn đang trống"
- [x] Có link "Tiếp tục mua sắm"
- [x] Không hiển thị danh sách SP, bảng tiền
