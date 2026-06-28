# FR-09 Coupon - Báo Cáo Boundary Value Analysis

**Chức năng:** Discount Coupons  
**Kỹ thuật:** Boundary Value Analysis

---

## Biến Biên

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| `SAVE10` minimum order | Hợp lệ tại `300000` | `299999`, `300000`, `300001` | below-min pass; at-min fail; above-min fail do tính sai discount |
| `BIGBUY` minimum order | Hợp lệ tại `500000` | `499999`, `500000` | below-min pass; at-min fail |
| Usage count | `VIP100` tối đa 2 lần | lần 2, lần 3 | lần 3 bị reject đúng kỳ vọng |

## BVA Test Cases

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-COUPON-004 | SAVE10 total 299999 | Reject | Pass | |
| TC-COUPON-005 | SAVE10 total 300000 | Accept | Fail | BUG-FR09-001 |
| TC-COUPON-006 | SAVE10 total 300001 | Accept, giảm 10% | Fail | BUG-FR09-002 |
| TC-COUPON-007 | BIGBUY total 499999 | Reject | Pass | |
| TC-COUPON-008 | BIGBUY total 500000 | Accept | Fail | BUG-FR09-001 |
| TC-COUPON-012 | VIP100 vượt max use | Reject | Pass | |

## Kết Luận

BVA xác nhận lỗi exact-minimum cho cả SAVE10 và BIGBUY. SAVE10 cũng có lỗi tính phần trăm khi coupon đã được apply.
