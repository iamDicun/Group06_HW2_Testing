# TC-UC-FR07-09: Giảm số lượng khi đang = 1

**Flow:** A8 – Ràng buộc số lượng tối thiểu

## FR-07 Liên quan
- (FR-06) Số lượng chỉ nhận số nguyên dương, tối thiểu là 1.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có Bàn phím cơ Keychron Q1 (4,000,000₫, số lượng 1)

## Các bước thực hiện
1. Đăng nhập, thêm Keychron Q1 vào giỏ, vào trang Giỏ hàng
2. Click nút **-** khi số lượng đang là 1
3. Thử nhập giá trị 0 vào ô số lượng (nếu input editable)

## Kết quả mong đợi
- [ ] Nút **-** bị **disabled** khi số lượng = 1
- [ ] Hoặc nếu click -, số lượng không giảm dưới 1
- [ ] Nếu nhập 0 → từ chối hoặc tự động đặt về 1
- [ ] Sản phẩm không bị tự động xóa khi cố giảm dưới 1
- [ ] Thành tiền (4,000,000₫) và Tổng cộng không thay đổi

## Kết quả thực tế (Actual Results)
- [ ] **Không có nút +/-** — không thể kiểm tra ràng buộc số lượng tối thiểu
- [ ] Số lượng chỉ hiển thị dưới dạng text, không có cơ chế điều chỉnh
- [ ] **BUG:** Thiếu nút +/-; ràng buộc số lượng không thể kiểm tra ở giao diện cart
