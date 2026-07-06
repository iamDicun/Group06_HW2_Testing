# Test Run - Cường HW02 Black-box UI Manual

**Tester:** Cường  
**Ngày chạy:** TODO  
**Build/Commit:** TODO  
**Môi trường:** Web UI, Web Admin UI, Mobile App UI  
**Phạm vi:** Chỉ kiểm thử black-box. Không dùng source code hoặc backend logic làm bằng chứng bug.

---

## Quy Tắc Thực Thi

- Chỉ thao tác qua UI hiển thị.
- Nếu test fail, cần chụp screenshot và tạo/cập nhật bug report.
- Bug chỉ được tính khi đã tái hiện qua UI và có screenshot evidence.
- Video là tùy chọn; screenshot là đủ trừ khi bug cần thể hiện chuỗi thao tác/chuyển động.

---

## Kết Quả Test Run

| Test Case ID | Module | Tester | Kết quả | Bug liên quan | Bằng chứng | Ghi chú |
|--------------|--------|--------|---------|---------------|------------|--------|
| TC-FORGOT_PW-001 | Quên mật khẩu Web | Cường | Pass | | | Request OTP với email đã đăng ký đúng kỳ vọng |
| TC-FORGOT_PW-002 | Quên mật khẩu Web | Cường | Pass | | | Email chưa đăng ký bị từ chối đúng kỳ vọng |
| TC-FORGOT_PW-003 | Quên mật khẩu Web | Cường | Pass | | | Validation email trống hiển thị đúng |
| TC-FORGOT_PW-004 | Quên mật khẩu Web | Cường | Pass | | | Validation email sai format hiển thị đúng |
| TC-FORGOT_PW-005 | Quên mật khẩu Web | Cường | Blocked | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Không thể cô lập OTP 5 chữ số vì lỗi mật khẩu xuất hiện trước |
| TC-FORGOT_PW-006 | Quên mật khẩu Web | Cường | Blocked | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Không thể cô lập OTP 6 chữ số vì lỗi mật khẩu xuất hiện trước |
| TC-FORGOT_PW-007 | Quên mật khẩu Web | Cường | Blocked | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Không thể cô lập OTP 7 chữ số vì lỗi mật khẩu xuất hiện trước |
| TC-FORGOT_PW-008 | Quên mật khẩu Web | Cường | Blocked | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Không thể cô lập hành vi OTP sai vì lỗi mật khẩu xuất hiện trước |
| TC-FORGOT_PW-009 | Quên mật khẩu Web | Cường | Pass | | | Password min-1 bị từ chối đúng kỳ vọng |
| TC-FORGOT_PW-010 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Mật khẩu hợp lệ `Abc1!xyz` không được chấp nhận |
| TC-FORGOT_PW-011 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-003 | `submission/evidence/FR03/BUG-FR03-003-missing-confirm-password.png` | Thiếu ô xác nhận mật khẩu |
| TC-FORGOT_PW-012 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-004 | `submission/evidence/FR03/BUG-FR03-004-missing-back-to-login.png` | Không có hành động quay lại login rõ ràng |
| TC-FORGOT_PW-013 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Mật khẩu hợp lệ `Abc1@xyz` báo lỗi mật khẩu |
| TC-FORGOT_PW-014 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Mật khẩu hợp lệ `Abc1$xyz` báo lỗi mật khẩu |
| TC-FORGOT_PW-015 | Quên mật khẩu Web | Cường | Fail | BUG-FR03-005 | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` | Mật khẩu hợp lệ `Abc1!xyza` báo lỗi mật khẩu |
| TC-FORGOT_PW-016 | Quên mật khẩu Web | Cường | Pass | | | Mật khẩu thiếu ký tự đặc biệt bị từ chối đúng kỳ vọng |
| TC-COUPON-001 | Coupon Checkout | Cường | Pass | | | Coupon trống được xử lý đúng kỳ vọng |
| TC-COUPON-002 | Coupon Checkout | Cường | Pass | | | Coupon không tồn tại bị từ chối đúng kỳ vọng |
| TC-COUPON-003 | Coupon Checkout | Cường | Pass | | | Coupon hết hạn bị từ chối đúng kỳ vọng |
| TC-COUPON-004 | Coupon Checkout | Cường | Pass | | | SAVE10 dưới mức tối thiểu bị từ chối đúng kỳ vọng |
| TC-COUPON-005 | Coupon Checkout | Cường | Fail | BUG-FR09-001 | `submission/evidence/FR09/BUG-FR09-001-save10-at-min-rejected.png` | SAVE10 tại đúng minimum 300000 bị từ chối |
| TC-COUPON-006 | Coupon Checkout | Cường | Fail | BUG-FR09-002 | `submission/evidence/FR09/BUG-FR09-002-save10-percent-wrong.png` | SAVE10 trên minimum hiển thị số tiền giảm sai `2,700,009` |
| TC-COUPON-007 | Coupon Checkout | Cường | Pass | | | BIGBUY dưới mức tối thiểu bị từ chối đúng kỳ vọng |
| TC-COUPON-008 | Coupon Checkout | Cường | Fail | BUG-FR09-001 | `submission/evidence/FR09/BUG-FR09-001-bigbuy-at-min-rejected.png` | BIGBUY tại đúng minimum 500000 bị từ chối |
| TC-COUPON-009 | Coupon Checkout | Cường | Fail | BUG-FR09-003 | `submission/evidence/FR09/BUG-FR09-003-coupon-applied-logged-out.png` | Voucher có thể áp dụng khi chưa đăng nhập |
| TC-COUPON-010 | Coupon Checkout | Cường | Pass | | | Coupon viết thường được chấp nhận/normalize đúng kỳ vọng |
| TC-COUPON-011 | Coupon Checkout | Cường | Pass | | | VIP100 fixed discount hoạt động đúng kỳ vọng |
| TC-COUPON-012 | Coupon Checkout | Cường | Pass | | | Quy tắc max-use của VIP100 hoạt động đúng kỳ vọng |
| TC-COUPON-013 | Coupon Checkout | Cường | Fail | BUG-FR09-002 | `submission/evidence/FR09/BUG-FR09-002-save10-percent-wrong.png` | Reuse lỗi công thức SAVE10 cho tổng 500000 |
| TC-COUPON-014 | Coupon Checkout | Cường | Fail | BUG-FR09-002 | `submission/evidence/FR09/BUG-FR09-002-save10-percent-wrong.png` | Reuse lỗi công thức SAVE10 cho tổng 1000000 |
| TC-COUPON-015 | Coupon Checkout | Cường | Fail | BUG-FR09-002 | `submission/evidence/FR09/BUG-FR09-002-save10-percent-wrong.png` | SAVE10 viết thường được chấp nhận nhưng công thức phần trăm vẫn sai |
| TC-PROD_MGMT-001 | Product Admin | Cường | Pass | | | Danh sách sản phẩm mở đúng kỳ vọng |
| TC-PROD_MGMT-002 | Product Admin | Cường | Pass | | | User không phải admin bị chặn đúng kỳ vọng |
| TC-PROD_MGMT-003 | Product Admin | Cường | Pass | | | Tạo sản phẩm hợp lệ thành công |
| TC-PROD_MGMT-004 | Product Admin | Cường | Pass | | | Tên trống bị từ chối đúng kỳ vọng |
| TC-PROD_MGMT-005 | Product Admin | Cường | Pass | | | Tên 255 ký tự được chấp nhận |
| TC-PROD_MGMT-006 | Product Admin | Cường | Fail | BUG-FR15-002 | `submission/evidence/FR15/BUG-FR15-002-name-256-accepted.png` | Tên 256 ký tự vẫn được chấp nhận và tạo sản phẩm |
| TC-PROD_MGMT-007 | Product Admin | Cường | Fail | BUG-FR15-002 | `submission/evidence/FR15/BUG-FR15-002-zero-price-accepted.png` | Price `0` vẫn được chấp nhận và tạo sản phẩm |
| TC-PROD_MGMT-008 | Product Admin | Cường | Pass | | | Price `1` được chấp nhận đúng kỳ vọng |
| TC-PROD_MGMT-009 | Product Admin | Cường | Blocked | | | Dropdown category luôn có category mặc định được chọn |
| TC-PROD_MGMT-010 | Product Admin | Cường | Fail | BUG-FR15-003 | `submission/evidence/FR15/BUG-FR15-003-edit-button-not-working.png` | Nút/hành động edit không hoạt động |
| TC-PROD_MGMT-011 | Product Admin | Cường | Fail | BUG-FR15-004 | `submission/evidence/FR15/BUG-FR15-004-delete-without-confirm.png` | Xóa xảy ra ngay, không có confirmation dialog |
| TC-PROD_MGMT-012 | Product Admin | Cường | Blocked | BUG-FR15-004 | `submission/evidence/FR15/BUG-FR15-004-delete-without-confirm.png` | Không có confirmation dialog nên không thể test cancel delete |
| TC-PROD_MGMT-013 | Product Admin | Cường | Fail | BUG-FR15-003 | `submission/evidence/FR15/BUG-FR15-003-edit-button-not-working.png` | Không thể edit product price vì edit action không hoạt động |
| TC-PROD_MGMT-014 | Product Admin | Cường | Fail | BUG-FR15-003 | `submission/evidence/FR15/BUG-FR15-003-edit-button-not-working.png` | Không thể edit product description vì edit action không hoạt động |
| TC-PROD_MGMT-015 | Product Admin | Cường | Fail | BUG-FR15-003 | `submission/evidence/FR15/BUG-FR15-003-edit-button-not-working.png` | Không thể edit product category vì edit action không hoạt động |
| TC-PROD_MGMT-016 | Product Admin | Cường | Pass | | | Description 500 ký tự submit thành công |
| TC-PROD_MGMT-017 | Product Admin | Cường | Fail | BUG-FR15-002 | `submission/evidence/FR15/BUG-FR15-002-negative-price-accepted.png` | Price âm `-1` vẫn được chấp nhận và tạo sản phẩm |
| TC-PROD_MGMT-018 | Product Admin | Cường | Pass | | | Field price không cho nhập `abc` |
| TC-MOBILE_FORGOT_PW-001 | Mobile Quên mật khẩu | Cường | Pass | | | Link quên mật khẩu mở màn hình đúng kỳ vọng |
| TC-MOBILE_FORGOT_PW-002 | Mobile Quên mật khẩu | Cường | Fail | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Request email đã đăng ký không hiển thị OTP dùng được cho demo reset |
| TC-MOBILE_FORGOT_PW-003 | Mobile Quên mật khẩu | Cường | Pass | | | Validation email trống xuất hiện đúng kỳ vọng |
| TC-MOBILE_FORGOT_PW-004 | Mobile Quên mật khẩu | Cường | Pass | | | Validation email sai format xuất hiện đúng kỳ vọng |
| TC-MOBILE_FORGOT_PW-005 | Mobile Quên mật khẩu | Cường | Pass | | | OTP 5 chữ số bị từ chối đúng kỳ vọng |
| TC-MOBILE_FORGOT_PW-006 | Mobile Quên mật khẩu | Cường | Blocked | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Không thể test OTP đúng 6 chữ số vì không có OTP dùng được |
| TC-MOBILE_FORGOT_PW-007 | Mobile Quên mật khẩu | Cường | Blocked | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Không thể cô lập OTP 7 chữ số vì reset flow/password validation chặn |
| TC-MOBILE_FORGOT_PW-008 | Mobile Quên mật khẩu | Cường | Pass | | | Password `Abc1!xy` bị từ chối đúng kỳ vọng |
| TC-MOBILE_FORGOT_PW-009 | Mobile Quên mật khẩu | Cường | Blocked | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Không thể accept password min hợp lệ nếu không có OTP dùng được |
| TC-MOBILE_FORGOT_PW-010 | Mobile Quên mật khẩu | Cường | Fail | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-confirm-password.png` | Thiếu ô xác nhận mật khẩu |
| TC-MOBILE_FORGOT_PW-011 | Mobile Quên mật khẩu | Cường | Fail | BUG-MOBILE-FR03-001 | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-back-to-login.png` | Không có hành động quay lại login rõ ràng |

---

## Tổng Kết

| Chỉ số | Số lượng |
|--------|----------|
| Tổng Test Cases | 60 |
| Pass | 27 |
| Fail | 24 |
| Blocked | 9 |
| Not Run | 0 |
| Confirmed Bugs | 10 |
| Candidate Bug cần xác minh | 1 |
