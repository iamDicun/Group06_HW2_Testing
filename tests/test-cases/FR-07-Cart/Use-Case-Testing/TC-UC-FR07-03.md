# TC-UC-FR07-03: Thêm trùng sản phẩm

**Flow:** A2 – Thêm sản phẩm đã có trong giỏ

## FR-07 Liên quan
- Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới.

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng đang có Samsung Galaxy S24 Ultra (số lượng 1)

## Dữ liệu kiểm thử
- Samsung Galaxy S24 Ultra: 28,000,000₫

## Các bước thực hiện
1. Đăng nhập, thêm Samsung Galaxy S24 Ultra vào giỏ (lần 1)
2. Vào lại trang chi tiết Samsung Galaxy S24 Ultra, click **Thêm vào giỏ hàng** (lần 2)
3. Vào lại trang chi tiết, click **Thêm vào giỏ hàng** (lần 3)
4. Vào trang Giỏ hàng

## Kết quả mong đợi
- [ ] Giỏ hàng chỉ có **1 dòng** Samsung Galaxy S24 Ultra (không bị trùng lặp)
- [ ] Số lượng = **3**
- [ ] Thành tiền = **84,000,000₫** (28,000,000₫ × 3)
- [ ] Tổng cộng = **84,000,000₫**

## Kết quả thực tế (Actual Results)
- [ ] Giỏ hàng hiển thị **3 dòng riêng biệt** Samsung Galaxy S24 Ultra (addToCart không merge, append từng lần)
- [ ] Mỗi dòng có số lượng = 1
- [ ] Thành tiền mỗi dòng = 28,000,000
- [ ] Tổng cộng = 84,000,000 (tổng đúng nhưng hiển thị sai cấu trúc)
- [ ] **BUG:** addToCart không merge sản phẩm trùng → tạo nhiều dòng thay vì tăng số lượng
