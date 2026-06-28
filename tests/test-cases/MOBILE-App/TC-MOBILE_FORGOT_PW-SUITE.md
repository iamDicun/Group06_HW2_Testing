# Mobile FR-03 Quên Mật Khẩu - Bộ Test Case Black-box UI

**Tester:** Cường  
**Chức năng:** Mobile Forgot Password & Reset  
**Bề mặt kiểm thử:** Chỉ thao tác qua Mobile app UI  
**Trạng thái:** Đã chạy manual black-box Mobile UI

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Dữ liệu test | Kết quả mong đợi | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|--------------|------------------|------------|---------------|
| TC-MOBILE_FORGOT_PW-001 | EP | No | Mở màn hình quên mật khẩu từ Login | bấm quên mật khẩu | Màn hình Quên Mật Khẩu mở ra | Pass | None |
| TC-MOBILE_FORGOT_PW-002 | EP | No | Request OTP với email đã đăng ký | `test@eshop.com` | App chuyển sang bước reset và cung cấp OTP demo/hướng dẫn dùng được | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-003 | EP | No | Request OTP với email trống | empty | App hiển thị validation bắt buộc nhập email | Pass | None |
| TC-MOBILE_FORGOT_PW-004 | EP | No | Request OTP với email sai format | `abc` | App hiển thị validation email không hợp lệ | Pass | None |
| TC-MOBILE_FORGOT_PW-005 | BVA | Yes | OTP dưới biên độ dài | 5 digits | App từ chối OTP ngắn hơn 6 chữ số | Pass | None |
| TC-MOBILE_FORGOT_PW-006 | BVA | Yes | OTP tại biên độ dài | 6 digits | App chấp nhận OTP đúng 6 chữ số | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-007 | BVA | Yes | OTP trên biên độ dài | 7 digits | App từ chối OTP dài hơn 6 chữ số | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-008 | BVA | Yes | Password min-1 | `Abc1!xy` | App từ chối password ngắn hơn 8 ký tự | Pass | None |
| TC-MOBILE_FORGOT_PW-009 | BVA | Yes | Password tại minimum | `Abc1!xyz` | App chấp nhận password minimum nếu OTP đúng và confirm khớp | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-010 | EP | No | Confirm password không khớp | `Abc1!xyz` / `Abc1!xyZ` | App từ chối mismatch | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-011 | EP | No | Điều hướng quay lại Login | bấm back/login | App quay lại màn hình Login | Fail | BUG-MOBILE-FR03-001 |

## Ghi Chú

- BVA áp dụng cho độ dài OTP và độ dài password.
- BVA không áp dụng cho navigation, trạng thái email đã đăng ký, lớp email sai format hoặc confirm mismatch.
- TC-MOBILE_FORGOT_PW-006 và TC-MOBILE_FORGOT_PW-009 bị blocked vì UI không cung cấp OTP demo dùng được.
- TC-MOBILE_FORGOT_PW-007 bị blocked vì tester không thể cô lập hành vi OTP 7 chữ số sau khi reset flow/password validation chặn quá trình kiểm thử.
