# FR-09 Coupon - Báo Cáo Domain Testing

**Chức năng:** Discount Coupons  
**Mã module:** `COUPON`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Checkout UI

---

## Tóm Tắt Yêu Cầu

Coupon phải được kiểm tra theo trạng thái mã, minimum order, trạng thái đăng nhập, max usage và công thức giảm giá hiển thị ở Checkout.

## Phân Vùng Đầu Vào

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Coupon code | `SAVE10`, `BIGBUY`, `VIP100` | Trống, không tồn tại, hết hạn |
| Tổng giỏ hàng | Bằng hoặc lớn hơn minimum | Nhỏ hơn minimum |
| Login state | Đã đăng nhập | Chưa đăng nhập |
| Usage count | Chưa vượt max use | Đã vượt max use |
| Case sensitivity | Code viết đúng hoặc normalize lowercase | Không normalize nếu requirement không cho phép |

## Test Case Được Chọn

| Test Case ID | Phân vùng bao phủ | Kết quả | Bug liên quan |
|--------------|-------------------|---------|---------------|
| TC-COUPON-001..004 | Coupon trống/không tồn tại/hết hạn/dưới minimum | Pass | |
| TC-COUPON-005, TC-COUPON-008 | Exact minimum threshold | Fail | BUG-FR09-001 |
| TC-COUPON-006, TC-COUPON-013..015 | SAVE10 percent calculation | Fail | BUG-FR09-002 |
| TC-COUPON-007 | BIGBUY dưới minimum | Pass | |
| TC-COUPON-009 | Chưa đăng nhập | Fail | BUG-FR09-003 |
| TC-COUPON-010..012 | Lowercase, fixed discount, max use | Pass | |

## Nhận Xét Human Review

FR-09 phát hiện ba lỗi confirmed qua Checkout UI: coupon bị reject tại đúng minimum, SAVE10 tính sai phần trăm, và user chưa đăng nhập vẫn apply được voucher.
