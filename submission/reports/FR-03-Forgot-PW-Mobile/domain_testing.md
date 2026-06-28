# Mobile FR-03 Quên Mật Khẩu - Báo Cáo Domain Testing

**Chức năng:** Mobile Forgot Password & Reset  
**Mã module:** `MOBILE_FORGOT_PW`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Nguồn yêu cầu:** FR-03, FR-20, FR-22, FR-23  
**Trạng thái:** Đã ghi nhận kết quả manual black-box Mobile UI

---

## Tóm Tắt Yêu Cầu

Mobile forgot password phải hỗ trợ luồng quên/reset tương tự FR-03. App cần hiển thị OTP dùng được trong demo mode, dùng OTP 6 chữ số, có confirm password, có indicator/luồng rõ ràng và có đường quay lại Login.

## Phân Vùng Đầu Vào

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Email | Email đã đăng ký | Email chưa đăng ký/trống/sai format |
| OTP | OTP đúng 6 chữ số | OTP sai/ngắn/dài |
| Password | Password mạnh | Password yếu |
| UI state | Có các field và navigation bắt buộc | Thiếu field/navigation/instruction |

## Test Case Được Chọn

| Test Case ID | Phân vùng bao phủ | Kết quả | Bug liên quan |
|--------------|-------------------|---------|---------------|
| TC-MOBILE_FORGOT_PW-001 | Mở màn hình forgot password | Pass | |
| TC-MOBILE_FORGOT_PW-002 | Request OTP với email đã đăng ký | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-003..004 | Email trống và sai format | Pass | |
| TC-MOBILE_FORGOT_PW-005 | OTP dưới biên | Pass | |
| TC-MOBILE_FORGOT_PW-006..007 | OTP tại/trên biên | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-008 | Password min-1 | Pass | |
| TC-MOBILE_FORGOT_PW-009 | Password minimum hợp lệ | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-010 | Confirm password mismatch | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-011 | Back-to-login navigation | Fail | BUG-MOBILE-FR03-001 |

## Nhận Xét Human Review

Manual Mobile UI execution xác nhận một lỗi mobile flow: request email đã đăng ký không cung cấp OTP demo dùng được, thiếu ô confirm password và thiếu hành động quay lại Login rõ ràng.
