# TC-ST-FR07-06: S2 --E3--> S2

**Mô tả:** Giỏ có iPhone + MacBook → Xóa iPhone (hủy) → Vào Cart xác nhận S2 (giỏ không đổi)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E3 (DeleteCancel) |
| **Verification** | Quan sát Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Nút **Xóa sản phẩm** phải có dialog xác nhận trước khi thực hiện.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có ≥ 1 sản phẩm

## Dữ liệu kiểm thử
- iPhone 15 Pro Max: 30,000,000₫ (x1)
- MacBook Pro M3: 45,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max và MacBook Pro M3 vào giỏ
2. Vào trang Giỏ hàng
3. Click nút **Xóa** của iPhone 15 Pro Max
4. Tại dialog xác nhận, click **Hủy** hoặc đóng dialog
5. Quan sát Cart để verify

## Kết quả mong đợi
- [ ] Transition S2 → S2 — giỏ không thay đổi
- [ ] Dialog xác nhận hiển thị
- [ ] Click Hủy → dialog đóng
- [ ] iPhone 15 Pro Max **vẫn còn** trong giỏ
- [ ] Giỏ hàng giữ nguyên: 2 SP, tổng cộng = 75,000,000₫

## Kết quả thực tế
- [ ] **FAIL:** **Không có dialog xác nhận** — không thể thực hiện E3
- [ ] Click Xóa → xóa ngay iPhone 15 Pro Max (BUG)
- [ ] **BUG:** Thiếu dialog confirm, luồng Hủy không khả thi
