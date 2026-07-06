# TC-UC-FR07-07: Tăng số lượng bằng nút +

**Flow:** A6 – Điều chỉnh tăng số lượng

## FR-07 Liên quan
- Cột **Số lượng** có nút +/- để chỉnh.
- **Thành tiền** và **Tổng cộng** cập nhật tương ứng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có Tai nghe AirPods Pro 2 (6,000,000₫, số lượng 1)

## Các bước thực hiện
1. Đăng nhập, thêm Tai nghe AirPods Pro 2 vào giỏ, vào trang Giỏ hàng
2. Click nút **+** → số lượng = 2
3. Click nút **+** → số lượng = 3
4. Click nút **+** → số lượng = 5

## Kết quả mong đợi
- [ ] Số lượng tăng đúng: 1 → 2 → 3 → 5 (mỗi lần +1)
- [ ] Thành tiền cập nhật: 6,000,000₫ → 12,000,000₫ → 18,000,000₫ → 30,000,000₫
- [ ] Tổng cộng cập nhật tương ứng
- [ ] Cập nhật ngay lập tức, không cần refresh

## Kết quả thực tế (Actual Results)
- [ ] **Không có nút +/-** — không thể điều chỉnh số lượng từ trang giỏ hàng
- [ ] Chỉ hiển thị số lượng dưới dạng text
- [ ] **BUG:** Thiếu nút +/- để điều chỉnh số lượng trong giỏ hàng
