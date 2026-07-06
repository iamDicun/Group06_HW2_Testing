# TC-ST-FR07-05: S2 --E2(hết SP)--> S1

**Mô tả:** Giỏ chỉ có Keychron Q1 → Xóa (confirm) → Vào Cart xác nhận S1 (Empty)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E2 (DeleteConfirm) |
| **Verification** | Quan sát Cart để xác nhận S1 |
| **End State** | S1 (Cart_Empty) |

## FR-07 Liên quan
- Nút **Xóa sản phẩm** phải có dialog xác nhận.
- Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng chỉ có 1 sản phẩm (S2 nhưng sắp về S1)

## Dữ liệu kiểm thử
- Bàn phím cơ Keychron Q1: 4,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm Bàn phím cơ Keychron Q1 vào giỏ
2. Vào trang Giỏ hàng
3. Click nút **Xóa** của Keychron Q1
4. Tại dialog xác nhận, click **Xác nhận**
5. Quan sát Cart để verify

## Kết quả mong đợi
- [ ] Transition S2 → S1 — giỏ về trạng thái rỗng
- [ ] Dialog xác nhận hiển thị
- [ ] Keychron Q1 bị xóa
- [ ] Cart ở trạng thái Empty: hình minh họa + thông báo + gợi ý mua sắm

## Kết quả thực tế
- [x] Transition S2 → S1 — giỏ về rỗng
- [ ] **FAIL:** **Không có dialog xác nhận** — xóa ngay (BUG)
- [ ] **FAIL:** Empty state **không có hình minh họa** — chỉ text (BUG)
- [x] Keychron Q1 bị xóa
- [x] Có thông báo "Giỏ hàng của bạn đang trống"
- [x] Có link "Tiếp tục mua sắm"
