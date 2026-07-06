# TC-UC-FR07-01: Xem giỏ hàng có sản phẩm

**Flow:** Basic – Xem danh sách sản phẩm trong giỏ hàng

## FR-07 Liên quan
- Hiển thị danh sách sản phẩm với các cột: Sản phẩm, Đơn giá, Số lượng (+/-), Thành tiền, Thao tác
- Tổng tiền hiển thị nhãn "Tổng cộng"
- Có nút "Tiếp tục mua sắm"

## Tiền điều kiện
- Người dùng đã đăng nhập
- Giỏ hàng có 2 sản phẩm

## Dữ liệu kiểm thử
| Sản phẩm | Đơn giá | SL | Thành tiền |
|----------|---------|----|------------|
| iPhone 15 Pro Max | 30,000,000₫ | 2 | 60,000,000₫ |
| MacBook Pro M3 | 45,000,000₫ | 1 | 45,000,000₫ |
| **Tổng cộng** | | | **105,000,000₫** |

## Các bước thực hiện
1. Đăng nhập, thêm iPhone 15 Pro Max (x2) và MacBook Pro M3 (x1) vào giỏ
2. Điều hướng đến trang Giỏ hàng

## Kết quả mong đợi
- [ ] Hiển thị 2 dòng sản phẩm với đủ 5 cột
- [ ] Cột **Sản phẩm**: tên + ảnh iPhone 15 Pro Max, MacBook Pro M3
- [ ] Cột **Đơn giá**: 30,000,000₫ và 45,000,000₫ (định dạng ₫, phân cách nghìn)
- [ ] Cột **Số lượng**: có nút +/-; iPhone = 2, MacBook = 1
- [ ] Cột **Thành tiền**: iPhone = 60,000,000₫, MacBook = 45,000,000₫
- [ ] Cột **Thao tác**: có nút Xóa cho mỗi sản phẩm
- [ ] **Tổng cộng** = 105,000,000₫, nhãn là "Tổng cộng"
- [ ] Nút **"Tiếp tục mua sắm"** hiển thị

## Kết quả thực tế (Actual Results)
- [x] Hiển thị 2 dòng sản phẩm với đủ 5 cột
- [x] Cột **Sản phẩm**: hiển thị tên sản phẩm (không có ảnh trong cart)
- [x] Cột **Đơn giá**: 30,000,000 và 45,000,000 (không có ký hiệu ₫, chỉ số)
- [ ] Cột **Số lượng**: **KHÔNG có nút +/-**, chỉ hiển thị số plain text
- [x] Cột **Thành tiền**: iPhone = 60,000,000, MacBook = 45,000,000
- [x] Cột **Thao tác**: có nút Xóa
- [ ] **Tổng cộng**: nhãn là **"Tổng tạm tính"** thay vì "Tổng cộng"
- [x] Nút **← Mua tiếp** (khác nhãn "Tiếp tục mua sắm") hiển thị
