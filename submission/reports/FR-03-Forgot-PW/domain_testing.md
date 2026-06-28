# FR-03 Quên Mật Khẩu - Báo Cáo Domain Testing

**Chức năng:** Forgot Password & Reset  
**Mã module:** `FORGOT_PW`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Nguồn yêu cầu:** FR-03, FR-01 password rule  
**Trạng thái:** Đã ghi nhận kết quả manual black-box Web UI

---

## Tóm Tắt Yêu Cầu

Người dùng có thể yêu cầu OTP bằng email, nhập OTP và đặt mật khẩu mới hợp lệ. Luồng phải có xác nhận mật khẩu và đường quay lại Login rõ ràng.

## Phân Vùng Đầu Vào

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Email | Email đã đăng ký | Email chưa đăng ký, trống, sai format |
| OTP | OTP đúng 6 chữ số | OTP sai, 5 chữ số, 7 chữ số |
| Password | Password mạnh tối thiểu 8 ký tự | Ngắn hơn 8 ký tự, thiếu nhóm ký tự |
| Confirm Password | Khớp password | Thiếu field hoặc không khớp |
| Navigation | Có đường quay lại Login | Không có đường quay lại rõ ràng |

## Test Case Được Chọn

| Test Case ID | Phân vùng bao phủ | Kết quả | Bug liên quan |
|--------------|-------------------|---------|---------------|
| TC-FORGOT_PW-001..004 | Request OTP theo email | Pass | |
| TC-FORGOT_PW-005..008 | OTP boundary/wrong OTP | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-009 | Password min-1 | Pass | |
| TC-FORGOT_PW-010, TC-FORGOT_PW-013..015 | Password hợp lệ | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-011 | Confirm password | Fail | BUG-FR03-003 |
| TC-FORGOT_PW-012 | Back to Login | Fail | BUG-FR03-004 |
| TC-FORGOT_PW-016 | Password thiếu ký tự đặc biệt | Pass | |

## Nhận Xét Human Review

Ba lỗi đã được xác nhận qua Web UI: thiếu ô confirm password, thiếu back-to-login, và password hợp lệ bị từ chối. Lỗi password làm các case OTP không thể được cô lập đầy đủ.
