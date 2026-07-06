# TC-UC-FR07-05: Xóa sản phẩm – Hủy bỏ

**Flow:** A4 – Click Xóa → Hủy dialog → Không thay đổi

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
3. Trong dialog xác nhận, click **Hủy**

## Kết quả mong đợi
- [ ] Dialog xác nhận hiển thị khi click Xóa
- [ ] Click Hủy → dialog đóng
- [ ] iPhone 15 Pro Max **vẫn còn** trong giỏ hàng
- [ ] Giỏ hàng không thay đổi: vẫn 2 sản phẩm, tổng cộng = 75,000,000₫

## Kết quả thực tế (Actual Results)
- [ ] **Không có dialog xác nhận** — click Xóa → xóa ngay, không có cơ hội Hủy
- [ ] iPhone 15 Pro Max bị xóa ngay khi click
- [ ] Giỏ hàng chỉ còn MacBook Pro M3
- [ ] **BUG:** Không có dialog xác nhận, luồng Hủy không thể thực hiện
