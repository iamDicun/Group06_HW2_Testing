# TC-ST-FR07-03: S2 --E1--> S2

**Mô tả:** Giỏ có Samsung S24 Ultra → Thêm cùng SP → Vào Cart xác nhận S2 (số lượng tăng, không tạo dòng mới)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E1 (AddItem) |
| **Verification** | View Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng đang có Samsung Galaxy S24 Ultra (SL 1)

## Dữ liệu kiểm thử
- Samsung Galaxy S24 Ultra: 28,000,000₫

## Các bước thực hiện
1. Đăng nhập, thêm Samsung Galaxy S24 Ultra vào giỏ (SL 1)
2. Vào lại trang chi tiết Samsung Galaxy S24 Ultra
3. Click **Thêm vào giỏ hàng**
4. Vào trang Giỏ hàng để verify

## Kết quả mong đợi
- [ ] Transition S2 → S2 — giỏ vẫn có SP
- [ ] Chỉ hiển thị **1 dòng** Samsung Galaxy S24 Ultra
- [ ] Số lượng = **2** (tăng từ 1 lên 2)
- [ ] Thành tiền = **56,000,000₫**
- [ ] Tổng cộng = **56,000,000₫**

## Kết quả thực tế
- [x] Transition S2 → S2 — giỏ vẫn có SP
- [ ] **FAIL:** Hiển thị **2 dòng** riêng biệt, mỗi dòng SL 1
- [ ] **BUG:** addToCart không merge sản phẩm trùng
- [x] Tổng cộng = 56,000,000 (đúng số nhưng sai cấu trúc bảng)
