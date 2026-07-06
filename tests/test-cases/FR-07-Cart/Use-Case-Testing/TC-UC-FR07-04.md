# TC-UC-FR07-04: Xóa sản phẩm – Xác nhận

**Flow:** A3 – Click Xóa → Xác nhận → Sản phẩm bị xóa

## FR-07 Liên quan
- Nút **Xóa sản phẩm** phải có dialog xác nhận trước khi thực hiện.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có 2 sản phẩm

## Dữ liệu kiểm thử
- iPhone 15 Pro Max: 30,000,000₫ (x1)
- MacBook Pro M3: 45,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max và MacBook Pro M3 vào giỏ, vào trang Giỏ hàng
2. Click nút **Xóa** của iPhone 15 Pro Max
3. Quan sát dialog xác nhận
4. Click **Xác nhận**

## Kết quả mong đợi
- [ ] Dialog xác nhận hiển thị với nội dung rõ ràng
- [ ] Dialog có 2 nút: Xác nhận và Hủy
- [ ] Sau khi xác nhận, iPhone 15 Pro Max biến mất khỏi giỏ
- [ ] Giỏ hàng chỉ còn MacBook Pro M3, tổng cộng = 45,000,000₫

## Kết quả thực tế (Actual Results)
- [ ] **Không có dialog xác nhận** — click Xóa → xóa ngay lập tức
- [ ] iPhone 15 Pro Max bị xóa khỏi giỏ ngay khi click
- [ ] Giỏ hàng còn MacBook Pro M3
- [ ] Tổng cộng = 45,000,000
- [ ] **BUG:** Thiếu confirmation dialog trước khi xóa sản phẩm
