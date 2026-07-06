# TC-ST-FR07-08: S2 --E5--> S2

**Mô tả:** Giỏ có AirPods (SL 4) → Click - hai lần → Vào Cart xác nhận S2 (SL giảm)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E5 (ClickMinus) |
| **Verification** | Quan sát Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Cột **Số lượng** có nút +/- để chỉnh.
- **Thành tiền** và **Tổng cộng** cập nhật tương ứng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có AirPods Pro 2 (SL 4)

## Dữ liệu kiểm thử
- Tai nghe AirPods Pro 2: 6,000,000₫

## Các bước thực hiện
1. Đăng nhập, thêm Tai nghe AirPods Pro 2 (x4) vào giỏ
2. Vào trang Giỏ hàng
3. Click nút **-** hai lần
4. Quan sát Cart để verify

## Kết quả mong đợi
- [ ] Transition S2 → S2
- [ ] Nút **-** hiển thị và click được
- [ ] Số lượng: 4 → 3 → 2
- [ ] Thành tiền: 24,000,000₫ → 18,000,000₫ → 12,000,000₫
- [ ] Tổng cộng cập nhật

## Kết quả thực tế
- [ ] **FAIL:** **Không có nút -** trong Cart — chỉ hiển thị số text
- [ ] **BUG:** Thiếu nút +/- để điều chỉnh số lượng
- [ ] Không thể thực hiện giảm SL từ Cart
