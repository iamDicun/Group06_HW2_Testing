# Ma Trận Truy Vết - HW02 Domain Testing

**Phạm vi:** Chỉ bao gồm các chức năng Cường được phân công.  
**Hình thức kiểm thử:** Black-box UI testing.  
**Trạng thái hiện tại:** Đã ghi nhận kết quả manual black-box UI cho phạm vi của Cường.

| Requirement | Khoảng Test Case ID | Kỹ thuật bao phủ | Kết quả | Bug Issue | Trạng thái |
|-------------|---------------------|------------------|---------|-----------|------------|
| FR-03 Quên mật khẩu | TC-FORGOT_PW-001..016 | EP + BVA | 6 Pass / 6 Fail / 4 Blocked | BUG-FR03-003, BUG-FR03-004, BUG-FR03-005 | Đã chạy |
| FR-09 Coupon | TC-COUPON-001..015 | EP + BVA | 8 Pass / 7 Fail | BUG-FR09-001, BUG-FR09-002, BUG-FR09-003 | Đã chạy / reuse defect mở rộng |
| FR-15 Quản lý sản phẩm | TC-PROD_MGMT-001..018 | EP + BVA | 8 Pass / 8 Fail / 2 Blocked | BUG-FR15-002, BUG-FR15-003, BUG-FR15-004 | Đã chạy |
| Mobile FR-03 Quên mật khẩu | TC-MOBILE_FORGOT_PW-001..011 | EP + BVA | 5 Pass / 3 Fail / 3 Blocked | BUG-MOBILE-FR03-001 | Đã chạy |

## File Chi Tiết

| Chức năng | File test case | Test run |
|-----------|----------------|----------|
| FR-03 Quên mật khẩu | `tests/test-cases/FR-03-ForgotPassword/TC-FORGOT_PW-SUITE.md` | `tests/test-runs/cuong-hw02-blackbox-ui-manual.md` |
| FR-09 Coupon | `tests/test-cases/FR-09-Coupon/TC-COUPON-SUITE.md` | `tests/test-runs/cuong-hw02-blackbox-ui-manual.md` |
| FR-15 Quản lý sản phẩm | `tests/test-cases/FR-15-ProductMgmt/TC-PROD_MGMT-SUITE.md` | `tests/test-runs/cuong-hw02-blackbox-ui-manual.md` |
| Mobile FR-03 Quên mật khẩu | `tests/test-cases/MOBILE-App/TC-MOBILE_FORGOT_PW-SUITE.md` | `tests/test-runs/cuong-hw02-blackbox-ui-manual.md` |

## Chú Thích

- **EP** = Equivalence Partitioning / Domain Testing.
- **BVA** = Boundary Value Analysis.
- **TBD** = Chưa điền hoặc cần xác minh thêm.

## Tổng Kết

| Chỉ số | Số lượng |
|--------|----------|
| Tổng test cases đã thiết kế | 60 |
| Pass | 27 |
| Fail | 24 |
| Blocked | 9 |
| Not Run | 0 |
| Confirmed bugs | 10 |
| Candidate bug cần xác minh | 1 |
