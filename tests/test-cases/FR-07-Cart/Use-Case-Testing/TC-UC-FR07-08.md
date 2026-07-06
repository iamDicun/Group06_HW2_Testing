# TC-UC-FR07-08: Giảm số lượng bằng nút -

**Flow:** A7 – Điều chỉnh giảm số lượng (khi > 1)

## FR-07 Liên quan
- Cột **Số lượng** có nút +/- để chỉnh.
- **Thành tiền** và **Tổng cộng** cập nhật tương ứng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có Tai nghe AirPods Pro 2 (6,000,000₫, số lượng 5)

## Các bước thực hiện
1. Đăng nhập, thêm Tai nghe AirPods Pro 2 (x5) vào giỏ, vào trang Giỏ hàng
2. Click nút **-** → số lượng = 4
3. Click nút **-** → số lượng = 3
4. Click nút **-** → số lượng = 2

## Kết quả mong đợi
- [ ] Số lượng giảm đúng: 5 → 4 → 3 → 2
- [ ] Thành tiền cập nhật: 30,000,000₫ → 24,000,000₫ → 18,000,000₫ → 12,000,000₫
- [ ] Tổng cộng cập nhật tương ứng
- [ ] Cập nhật ngay lập tức, không cần refresh

## Kết quả thực tế (Actual Results)
- [ ] **Không có nút +/-** — không thể điều chỉnh số lượng từ trang giỏ hàng
- [ ] **BUG:** Thiếu nút +/- để điều chỉnh số lượng trong giỏ hàng
