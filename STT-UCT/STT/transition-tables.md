# Transition Tables - FR-03 Forgot Password & Reset

## Valid Transition Table

| ID | From State | Event | Guard | To State | Expected Action |
|---|---|---|---|---|---|
| VT-01 | Login | Open Forgot Password | - | Forgot Password - Email Form | Mở màn hình yêu cầu email khôi phục mật khẩu |
| VT-02 | Forgot Password - Email Form | Submit registered email | Email tồn tại trong hệ thống, ví dụ `test@eshop.com` | Reset Password Form | Gửi/hiển thị OTP demo và mở form reset |
| VT-03 | Forgot Password - Email Form | Submit invalid or unregistered email | Email trống, sai định dạng hoặc chưa đăng ký | Forgot Password - Email Form | Hiển thị validation/lỗi và không cho qua bước reset |
| VT-04 | Forgot Password - Email Form | Back to Login | - | Login | Quay lại màn hình Login |
| VT-05 | Reset Password Form | Submit valid OTP and matching strong password | OTP đúng 6 chữ số, password mạnh tối thiểu 8 ký tự, confirm khớp | Reset Completed | Đổi mật khẩu thành công và hiển thị xác nhận hoàn tất |
| VT-06 | Reset Password Form | Submit invalid OTP, weak password, or mismatched confirm password | OTP sai/sai độ dài, password yếu hoặc confirm không khớp | Reset Password Form | Hiển thị validation/lỗi và giữ nguyên form reset |
| VT-07 | Reset Password Form | Back to Login | - | Login | Hủy/quay lại Login từ form reset |
| VT-08 | Reset Completed | Back to Login | - | Login | Quay lại Login để đăng nhập bằng mật khẩu mới |

## Invalid Transition Table

| ID | Current State | Invalid Event | Expected Result | TC |
|---|---|---|---|---|
| IT-01 | Login | Submit registered email | Từ chối/không cho submit email khi chưa ở email form, giữ nguyên Login | STT-FORGOT-PW-013 |
| IT-02 | Login | Submit invalid or unregistered email | Từ chối/không cho submit email khi chưa ở email form, giữ nguyên Login | STT-FORGOT-PW-014 |
| IT-03 | Login | Submit valid OTP and matching strong password | Từ chối/không cho reset khi chưa vào reset form, giữ nguyên Login | STT-FORGOT-PW-015 |
| IT-04 | Login | Submit invalid OTP, weak password, or mismatched confirm password | Từ chối/không cho reset khi chưa vào reset form, giữ nguyên Login | STT-FORGOT-PW-016 |
| IT-05 | Login | Back to Login | Không chuyển trạng thái ngầm, giữ nguyên Login | STT-FORGOT-PW-017 |
| IT-06 | Forgot Password - Email Form | Open Forgot Password | Không mở chồng luồng mới, giữ nguyên Email Form | STT-FORGOT-PW-018 |
| IT-07 | Forgot Password - Email Form | Submit valid OTP and matching strong password | Từ chối reset khi chưa qua bước email, giữ nguyên Email Form | STT-FORGOT-PW-019 |
| IT-08 | Forgot Password - Email Form | Submit invalid OTP, weak password, or mismatched confirm password | Từ chối reset khi chưa qua bước email, giữ nguyên Email Form | STT-FORGOT-PW-020 |
| IT-09 | Reset Password Form | Open Forgot Password | Không mở chồng luồng mới, giữ nguyên Reset Form | STT-FORGOT-PW-021 |
| IT-10 | Reset Password Form | Submit registered email | Từ chối submit email ở reset form, giữ nguyên Reset Form | STT-FORGOT-PW-022 |
| IT-11 | Reset Password Form | Submit invalid or unregistered email | Từ chối submit email ở reset form, giữ nguyên Reset Form | STT-FORGOT-PW-023 |
| IT-12 | Reset Completed | Open Forgot Password | Không mở luồng mới trực tiếp từ completed, giữ nguyên Reset Completed | STT-FORGOT-PW-024 |
| IT-13 | Reset Completed | Submit registered email | Từ chối submit email sau khi hoàn tất, giữ nguyên Reset Completed | STT-FORGOT-PW-025 |
| IT-14 | Reset Completed | Submit invalid or unregistered email | Từ chối submit email sau khi hoàn tất, giữ nguyên Reset Completed | STT-FORGOT-PW-026 |
| IT-15 | Reset Completed | Submit valid OTP and matching strong password | Từ chối reset lặp lại sau khi hoàn tất, giữ nguyên Reset Completed | STT-FORGOT-PW-027 |
| IT-16 | Reset Completed | Submit invalid OTP, weak password, or mismatched confirm password | Từ chối reset lặp lại sau khi hoàn tất, giữ nguyên Reset Completed | STT-FORGOT-PW-028 |

## Coverage Mapping

| Valid Transition | TC |
|---|---|
| VT-01 | STT-FORGOT-PW-005 |
| VT-02 | STT-FORGOT-PW-006 |
| VT-03 | STT-FORGOT-PW-007 |
| VT-04 | STT-FORGOT-PW-008 |
| VT-05 | STT-FORGOT-PW-009 |
| VT-06 | STT-FORGOT-PW-010 |
| VT-07 | STT-FORGOT-PW-011 |
| VT-08 | STT-FORGOT-PW-012 |
