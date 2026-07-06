# TC-ST-FR07-04: S2 --E2(còn SP)--> S2

**Mô tả:** Giỏ có iPhone + MacBook → Xóa iPhone (confirm) → Vào Cart xác nhận S2 (còn MacBook)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E2 (DeleteConfirm) |
| **Verification** | Quan sát Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Nút **Xóa sản phẩm** phải có dialog xác nhận trước khi thực hiện.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có ≥ 2 sản phẩm

## Dữ liệu kiểm thử
- iPhone 15 Pro Max: 30,000,000₫ (x1)
- MacBook Pro M3: 45,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max và MacBook Pro M3 vào giỏ
2. Vào trang Giỏ hàng
3. Click nút **Xóa** của iPhone 15 Pro Max
4. Tại dialog xác nhận, click **Xác nhận**
5. Quan sát Cart để verify

## Kết quả mong đợi
- [ ] Transition S2 → S2 — giỏ vẫn còn SP (MacBook)
- [ ] Dialog xác nhận hiển thị khi click Xóa
- [ ] iPhone 15 Pro Max bị xóa
- [ ] Chỉ còn MacBook Pro M3, tổng cộng = 45,000,000₫

## Kết quả thực tế
- [x] Transition S2 → S2 — còn MacBook
- [ ] **FAIL:** **Không có dialog xác nhận** — click Xóa → xóa ngay (BUG)
- [x] iPhone 15 Pro Max bị xóa
- [x] Chỉ còn MacBook Pro M3, tổng cộng = 45,000,000
