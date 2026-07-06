# TC-UC-FR07-11: Giỏ hàng trống

**Flow:** A10 – Truy cập giỏ hàng khi không có sản phẩm

## FR-07 Liên quan
- Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.
- (FR-23) Link "Giỏ hàng" hiển thị badge số lượng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng trống

## Các bước thực hiện
1. Đăng nhập, xem badge giỏ hàng trên navbar
2. Điều hướng đến trang Giỏ hàng

## Kết quả mong đợi
- [ ] Badge giỏ hàng trên navbar không hiển thị số (hoặc = 0)
- [ ] Trang giỏ hàng hiển thị **hình minh họa**
- [ ] Có **thông báo rõ ràng** (VD: "Giỏ hàng trống", "Chưa có sản phẩm")
- [ ] Có nút/gợi ý để quay lại mua sắm
- [ ] **Không** hiển thị danh sách sản phẩm, bảng tổng tiền, nút thanh toán

## Kết quả thực tế (Actual Results)
- [ ] Badge trên navbar **không hiển thị** (Header không có badge component)
- [ ] **Không có hình minh họa** — chỉ hiển thị text
- [x] Có thông báo: "Giỏ hàng của bạn đang trống"
- [x] Có link "Tiếp tục mua sắm" để quay lại trang chủ
- [x] Không hiển thị danh sách sản phẩm, bảng tổng tiền
- [ ] **BUG:** Thiếu hình minh họa cho empty state; thiếu badge trên navbar
