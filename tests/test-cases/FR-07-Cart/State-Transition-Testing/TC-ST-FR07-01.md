# TC-ST-FR07-01: S1 --E1--> S2

**Mô tả:** Giỏ trống → Thêm AirPods Pro 2 → Vào Cart xác nhận trạng thái chuyển sang HasItems

## Thông tin Transition

| Thuộc tính | Giá trị |
|-----------|---------|
| **Start State** | S1 (Cart_Empty) |
| **Event** | E1 (AddItem) |
| **Verification** | View Cart để xác nhận S2 |
| **End State** | S2 (Cart_HasItems) |

## FR-07 Liên quan
- Thêm sản phẩm vào giỏ hàng.
- Có phản hồi trực quan sau khi thêm.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng trống (S1)

## Dữ liệu kiểm thử
- Tai nghe AirPods Pro 2: 6,000,000₫

## Các bước thực hiện
1. Đăng nhập, xác nhận giỏ trống
2. Vào trang chi tiết Tai nghe AirPods Pro 2
3. Click **Thêm vào giỏ hàng** (có thể cần click 2 lần do bug)
4. Vào trang Giỏ hàng để verify trạng thái

## Kết quả mong đợi
- [ ] Transition S1 → S2 thành công
- [ ] Cart hiển thị AirPods Pro 2, số lượng = 1
- [ ] Thành tiền = 6,000,000₫
- [ ] Tổng cộng = 6,000,000₫
- [ ] Có phản hồi trực quan khi thêm

## Kết quả thực tế
- [x] Transition S1 → S2 thành công
- [x] Cart hiển thị AirPods Pro 2, SL 1, thành tiền 6,000,000
- [ ] Không có toast/badge feedback
- [ ] Cần click 2 lần "Thêm vào giỏ hàng" do bug clickCount
