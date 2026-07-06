# TC-ST-FR07-09: S2 --E6--> S2

**Mô tả:** Giỏ có iPhone → Click "Tiếp tục mua sắm" → Vào lại Cart xác nhận S2 (giỏ giữ nguyên)

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S2 (Cart_HasItems) |
| **Event** | E6 (ContinueShopping) |
| **Verification** | Vào lại Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Có nút **Tiếp tục mua sắm** để quay về trang chủ.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có ít nhất 1 sản phẩm

## Dữ liệu kiểm thử
- iPhone 15 Pro Max: 30,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max vào giỏ
2. Vào trang Giỏ hàng
3. Click nút **Tiếp tục mua sắm** (hoặc tương đương)
4. Xác nhận đã về trang chủ (trang Home)
5. Vào lại trang Giỏ hàng để verify

## Kết quả mong đợi
- [ ] Transition S2 → S2 — giỏ giữ nguyên
- [ ] Chuyển về **trang chủ**
- [ ] Giỏ hàng giữ nguyên iPhone 15 Pro Max
- [ ] Vào lại Cart thấy SP còn đó

## Kết quả thực tế
- [x] Transition S2 → S2 — giỏ giữ nguyên
- [x] Click "← Mua tiếp" → về trang chủ
- [x] Giỏ hàng giữ nguyên iPhone 15 Pro Max
- [ ] Lưu ý: Nhãn nút là "← Mua tiếp", không phải "Tiếp tục mua sắm"
- [ ] Badge navbar không hiển thị
