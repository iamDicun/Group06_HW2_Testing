# TC-UC-FR07-02: Thêm sản phẩm mới vào giỏ

**Flow:** A1 – Thêm sản phẩm lần đầu

## FR-07 Liên quan
- Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới.
- (FR-06) Nút "Thêm vào giỏ hàng" — phản hồi trực quan sau khi bấm.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng đang trống

## Dữ liệu kiểm thử
- Tai nghe AirPods Pro 2: 6,000,000₫
- Bàn phím cơ Keychron Q1: 4,000,000₫

## Các bước thực hiện
1. Đăng nhập, vào trang chi tiết Tai nghe AirPods Pro 2
2. Click **Thêm vào giỏ hàng**
3. Quan sát phản hồi
4. Vào trang chi tiết Bàn phím cơ Keychron Q1, click **Thêm vào giỏ hàng**
5. Vào trang Giỏ hàng

## Kết quả mong đợi
- [ ] Lần 1: phản hồi trực quan (toast/badge) xuất hiện
- [ ] Lần 2: badge giỏ hàng tăng lên
- [ ] Trang Giỏ hàng hiển thị 2 dòng: AirPods Pro 2 (1) + Keychron Q1 (1)
- [ ] Thành tiền: AirPods = 6,000,000₫, Keychron = 4,000,000₫
- [ ] Tổng cộng = 10,000,000₫

## Kết quả thực tế (Actual Results)
- [ ] Lần 1: **Không có toast/badge** (addToCart từ Home gọi trực tiếp, không feedback)
- [ ] Lần 2: badge giỏ hàng **không hiển thị** (Header không có badge component)
- [x] Trang Giỏ hàng hiển thị 2 dòng: AirPods Pro 2 (1) + Keychron Q1 (1)
- [x] Thành tiền: AirPods = 6,000,000, Keychron = 4,000,000
- [x] Tổng cộng = 10,000,000
- [ ] **Lưu ý:** Nút "Thêm vào giỏ hàng" ở ProductDetail yêu cầu **click 2 lần** mới hoạt động
