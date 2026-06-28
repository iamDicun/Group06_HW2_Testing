# FR-09 Coupon - AI Gap Analysis

**Chức năng:** Discount Coupons  
**Trạng thái:** Đã review và chỉnh sửa theo Checkout UI

---

## Các Gap Trong Output AI

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Nguyên nhân | Cách Cường sửa |
|--------|--------------|-------------------|-------------|----------------|
| FR09-GAP-01 | Chưa nhấn mạnh exact minimum | Điều kiện requirement là `>=`, rất dễ lỗi off-by-one | AI thường chọn below/above nhưng quên equal | Thêm TC-COUPON-005 và TC-COUPON-008 |
| FR09-GAP-02 | Chưa kiểm tra số tiền giảm hiển thị | Apply thành công chưa đủ; amount phải đúng | AI có thể chỉ kiểm tra message | Thêm các case SAVE10 calculation |
| FR09-GAP-03 | Chưa xét trạng thái chưa đăng nhập | Coupon có điều kiện login | AI bỏ sót user state | Thêm TC-COUPON-009 |
| FR09-GAP-04 | Chưa mở rộng lowercase/usage | Cần bao phủ partition phụ | AI chọn ít dữ liệu đại diện | Thêm TC-COUPON-010..012 và 015 |

## Bài Học

Với rule nhiều điều kiện, AI hữu ích để liệt kê partition nhưng dễ bỏ sót kiểm tra boundary bằng UI. FR-09 cho thấy cần test exact threshold, arithmetic hiển thị và trạng thái logged-out bằng thao tác Checkout UI thủ công.
