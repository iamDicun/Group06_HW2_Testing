# FR-09 Coupon - Bộ Test Case Black-box UI

**Tester:** Cường  
**Chức năng:** Discount Coupons  
**Bề mặt kiểm thử:** Chỉ thao tác qua Checkout UI  
**Trạng thái:** Đã chạy bởi Cường qua Checkout UI

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Dữ liệu test | Kết quả mong đợi | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|--------------|------------------|------------|---------------|
| TC-COUPON-001 | EP | No | Apply khi ô coupon trống | empty code | Nút Apply bị disable hoặc hiển thị validation | Pass | None |
| TC-COUPON-002 | EP | No | Apply coupon không tồn tại | `NO_SUCH`, total 500,000 | Coupon bị từ chối với thông báo rõ ràng | Pass | None |
| TC-COUPON-003 | EP | No | Apply coupon hết hạn | `EXPIRED`, total 200,000 | Coupon bị từ chối vì hết hạn | Pass | None |
| TC-COUPON-004 | BVA | Yes | SAVE10 dưới minimum | `SAVE10`, total 299,999 | Coupon bị từ chối vì tổng dưới 300,000 | Pass | None |
| TC-COUPON-005 | BVA | Yes | SAVE10 tại minimum | `SAVE10`, total 300,000 | Coupon được chấp nhận vì requirement là `>=` minimum | Fail | BUG-FR09-001 |
| TC-COUPON-006 | BVA | Yes | SAVE10 trên minimum | `SAVE10`, total 300,001 | Coupon được chấp nhận và tổng tiền giảm 10% | Fail | BUG-FR09-002 |
| TC-COUPON-007 | BVA | Yes | BIGBUY dưới minimum | `BIGBUY`, total 499,999 | Coupon bị từ chối vì tổng dưới 500,000 | Pass | None |
| TC-COUPON-008 | BVA | Yes | BIGBUY tại minimum | `BIGBUY`, total 500,000 | Coupon được chấp nhận và giảm 50,000 | Fail | BUG-FR09-001 |
| TC-COUPON-009 | EP | No | Apply coupon khi chưa đăng nhập | `SAVE10`, valid cart | Hệ thống yêu cầu đăng nhập trước khi apply coupon | Fail | BUG-FR09-003 |
| TC-COUPON-010 | EP | No | Apply coupon viết thường | `save10`, valid total | Hệ thống normalize hoặc chấp nhận mã tương đương hợp lệ | Pass | None |
| TC-COUPON-011 | EP | No | Apply fixed coupon trên minimum | `VIP100`, total 350,000 | Tổng tiền giảm 100,000 | Pass | None |
| TC-COUPON-012 | BVA | Yes | Dùng coupon sau khi đạt max uses | `VIP100` sau 2 lần dùng | Lần dùng thứ 3 bị từ chối | Pass | None |
| TC-COUPON-013 | EP | No | Tính phần trăm SAVE10 với tổng lớn hơn | `SAVE10`, total 500,000 | Discount là 50,000 và final amount là 450,000 | Fail | BUG-FR09-002 |
| TC-COUPON-014 | EP | No | Tính phần trăm SAVE10 tại 1,000,000 | `SAVE10`, total 1,000,000 | Discount là 100,000 và final amount là 900,000 | Fail | BUG-FR09-002 |
| TC-COUPON-015 | EP | No | Tính SAVE10 sau khi normalize lowercase | `save10`, total 500,000 | Code được chấp nhận và discount là 50,000 | Fail | BUG-FR09-002 |

## Ghi Chú

- BVA áp dụng cho ngưỡng minimum order và số lần sử dụng tối đa.
- BVA không áp dụng cho coupon trống/không tồn tại/hết hạn/trạng thái login/coupon lowercase vì đó là phân vùng hoặc trạng thái.

## Ghi Chú Thực Thi

- TC-COUPON-005 và TC-COUPON-008 fail vì coupon bị từ chối tại đúng minimum threshold, trong khi FR-09 yêu cầu `>= min_order_amount`.
- TC-COUPON-006 fail vì UI hiển thị sai số tiền giảm phần trăm, ví dụ `Tiết kiệm` là `2,700,009` cho `SAVE10` trên minimum.
- TC-COUPON-009 fail vì voucher có thể áp dụng khi user chưa đăng nhập.
- TC-COUPON-013, TC-COUPON-014 và TC-COUPON-015 mở rộng cùng lỗi tính phần trăm đã xác nhận cho `SAVE10`; reuse evidence của `BUG-FR09-002` nếu không cần screenshot riêng cho từng input.
