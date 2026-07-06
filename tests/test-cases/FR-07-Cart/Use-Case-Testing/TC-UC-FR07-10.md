# TC-UC-FR07-10: Tiếp tục mua sắm

**Flow:** A9 – Click "Tiếp tục mua sắm" → Trang chủ

## FR-07 Liên quan
- Có nút **Tiếp tục mua sắm** để quay về trang chủ.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có ít nhất 1 sản phẩm

## Dữ liệu kiểm thử
- iPhone 15 Pro Max: 30,000,000₫ (x1)

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max vào giỏ, vào trang Giỏ hàng
2. Click nút **Tiếp tục mua sắm**
3. Quan sát trang hiện tại
4. Thêm Samsung Galaxy S24 Ultra vào giỏ từ trang chủ
5. Vào lại trang Giỏ hàng

## Kết quả mong đợi
- [ ] Click "Tiếp tục mua sắm" → chuyển về **trang chủ**
- [ ] Giỏ hàng giữ nguyên iPhone 15 Pro Max (không bị xóa)
- [ ] Sau khi thêm Samsung Galaxy S24 Ultra, giỏ hàng có cả 2 SP
- [ ] Badge trên navbar cập nhật đúng số lượng

## Kết quả thực tế (Actual Results)
- [x] Nút **← Mua tiếp** (tên khác "Tiếp tục mua sắm") → chuyển về trang chủ
- [x] Giỏ hàng giữ nguyên iPhone 15 Pro Max
- [x] Sau khi thêm SP, giỏ hàng có cả 2 SP
- [ ] Badge trên navbar **không hiển thị** (Header không có badge component)
- [ ] **Lưu ý:** Nhãn nút là "← Mua tiếp", không phải "Tiếp tục mua sắm"
