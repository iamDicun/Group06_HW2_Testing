# TC-UC-FR07-06: Xóa sản phẩm cuối cùng

**Flow:** A5 – Xóa sản phẩm duy nhất → Giỏ hàng về trạng thái rỗng

## FR-07 Liên quan
- Nút **Xóa sản phẩm** phải có dialog xác nhận.
- Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng chỉ có 1 sản phẩm

## Dữ liệu kiểm thử
- Bàn phím cơ Keychron Q1: 4,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm Bàn phím cơ Keychron Q1 vào giỏ, vào trang Giỏ hàng
2. Click nút **Xóa** của Keychron Q1
3. Dialog xuất hiện, click **Xác nhận**

## Kết quả mong đợi
- [ ] Dialog xác nhận hiển thị
- [ ] Sau khi xác nhận, Keychron Q1 bị xóa
- [ ] Giỏ hàng chuyển sang trạng thái **rỗng**:
  - Hình minh họa (icon/illustration)
  - Thông báo rõ ràng (VD: "Giỏ hàng trống")
  - Có gợi ý / nút quay lại mua sắm
- [ ] Không hiển thị danh sách sản phẩm, bảng tổng tiền
- [ ] Badge trên navbar về 0 hoặc không hiển thị

## Kết quả thực tế (Actual Results)
- [ ] **Không có dialog xác nhận** — xóa ngay lập tức
- [x] Keychron Q1 bị xóa
- [ ] Giỏ hàng chuyển sang trạng thái **rỗng**:
  - **Không có hình minh họa** (chỉ text "Giỏ hàng của bạn đang trống")
  - [x] Thông báo rõ ràng: "Giỏ hàng của bạn đang trống"
  - [x] Có link "Tiếp tục mua sắm" (dạng text link, không phải nút)
- [ ] **BUG:** Thiếu dialog xác nhận; thiếu hình minh họa cho empty state
