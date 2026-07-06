# FR-03 Quên Mật Khẩu - Bộ Test Case Black-box UI

**Tester:** Cường  
**Chức năng:** Forgot Password & Reset  
**Bề mặt kiểm thử:** Chỉ thao tác qua Web UI  
**Trạng thái:** Đã chạy manual black-box Web UI

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Dữ liệu test | Kết quả mong đợi | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|--------------|------------------|------------|---------------|
| TC-FORGOT_PW-001 | EP | No | Request OTP với email đã đăng ký | `test@eshop.com` | Hiển thị bước reset/OTP đúng kỳ vọng | Pass | None |
| TC-FORGOT_PW-002 | EP | No | Request OTP với email chưa đăng ký | `missing@example.com` | Hiển thị lỗi hoặc không cho tiếp tục | Pass | None |
| TC-FORGOT_PW-003 | EP | No | Request OTP với email trống | empty | Hiển thị validation bắt buộc nhập email | Pass | None |
| TC-FORGOT_PW-004 | EP | No | Request OTP với email sai format | `abc` | Hiển thị validation email không hợp lệ | Pass | None |
| TC-FORGOT_PW-005 | BVA | Yes | OTP dưới biên độ dài | 5 digits | Từ chối OTP ngắn hơn 6 chữ số | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-006 | BVA | Yes | OTP tại biên độ dài | correct 6 digits | Chấp nhận OTP đúng 6 chữ số nếu password hợp lệ | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-007 | BVA | Yes | OTP trên biên độ dài | 7 digits | Từ chối OTP dài hơn 6 chữ số | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-008 | EP | No | OTP sai | wrong OTP | Từ chối OTP sai | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-009 | BVA | Yes | Password min-1 | `Abc1!xy` | Từ chối password ngắn hơn 8 ký tự | Pass | None |
| TC-FORGOT_PW-010 | BVA | Yes | Password tại minimum | `Abc1!xyz` | Chấp nhận password 8 ký tự đủ mạnh nếu OTP đúng | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-011 | EP | No | Confirm password không khớp | `Abc1!xyz` / `Abc1!xyZ` | Từ chối mismatch | Fail | BUG-FR03-003 |
| TC-FORGOT_PW-012 | EP | No | Quay lại Login | bấm back/login | Có hành động quay lại Login rõ ràng | Fail | BUG-FR03-004 |
| TC-FORGOT_PW-013 | EP | No | Reset với password hợp lệ dùng ký tự đặc biệt `@` | `Abc1@xyz` | Chấp nhận password hợp lệ nếu OTP đúng | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-014 | EP | No | Reset với password hợp lệ dùng ký tự đặc biệt `$` | `Abc1$xyz` | Chấp nhận password hợp lệ nếu OTP đúng | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-015 | BVA | Yes | Reset với password length min+1 | `Abc1!xyza` | Chấp nhận password mạnh 9 ký tự nếu OTP đúng | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-016 | EP | No | Reset với password thiếu ký tự đặc biệt | `Abc1xyza` | Từ chối password thiếu ký tự đặc biệt | Pass | None |

## Ghi Chú

- BVA áp dụng cho độ dài OTP và độ dài password.
- OTP cases TC-FORGOT_PW-005..008 bị blocked vì lỗi password hợp lệ bị từ chối xuất hiện trước, nên không thể cô lập hành vi OTP.
- TC-FORGOT_PW-013, TC-FORGOT_PW-014 và TC-FORGOT_PW-015 tái hiện cùng lỗi password như TC-FORGOT_PW-010 nên reuse `BUG-FR03-005`.
- TC-FORGOT_PW-016 pass vì password thiếu ký tự đặc biệt bị từ chối đúng kỳ vọng.
