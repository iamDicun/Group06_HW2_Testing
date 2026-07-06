# Checklist Chạy Mobile FR-03

Dùng checklist này khi chạy `TC-MOBILE_FORGOT_PW-001..011`. Chỉ ghi nhận những gì quan sát được qua Mobile UI.

## Môi Trường

- Thiết bị/emulator:
- OS:
- Backend đang chạy: Yes / No
- Mobile API URL trong app build: `http://192.168.1.22:3000/api`
- Email test: `test@eshop.com`

## Thiết Lập Nhanh

1. Start backend từ `application/backend` bằng `node server.js`.
2. Start mobile app từ `application/frontend-mobile` bằng `npm start`.
3. Mở app bằng Expo Go hoặc emulator.
4. Xác nhận điện thoại/emulator truy cập được IP backend. Nếu request OTP fail do network, đánh dấu TC002 và các case reset phụ thuộc là Blocked.

## Kết Quả Đã Ghi Nhận

| Test Case ID | Kết quả | Bằng chứng | Ghi chú |
|--------------|---------|------------|--------|
| TC-MOBILE_FORGOT_PW-001 | Pass | | Link quên mật khẩu mở màn hình. |
| TC-MOBILE_FORGOT_PW-002 | Fail | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Request email đã đăng ký không hiển thị OTP dùng được cho demo. |
| TC-MOBILE_FORGOT_PW-003 | Pass | | Validation email trống xuất hiện. |
| TC-MOBILE_FORGOT_PW-004 | Pass | | Validation email sai format xuất hiện. |
| TC-MOBILE_FORGOT_PW-005 | Pass | | OTP 5 chữ số bị từ chối. |
| TC-MOBILE_FORGOT_PW-006 | Blocked | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Không thể test OTP đúng vì không có OTP dùng được. |
| TC-MOBILE_FORGOT_PW-007 | Blocked | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Không thể cô lập OTP 7 chữ số vì reset flow/password validation chặn. |
| TC-MOBILE_FORGOT_PW-008 | Pass | | Password `Abc1!xy` bị từ chối. |
| TC-MOBILE_FORGOT_PW-009 | Blocked | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png` | Password `Abc1!xyz` không thể accept nếu không có OTP dùng được. |
| TC-MOBILE_FORGOT_PW-010 | Fail | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-confirm-password.png` | Không có ô xác nhận mật khẩu. |
| TC-MOBILE_FORGOT_PW-011 | Fail | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-back-to-login.png` | Không có hành động quay lại login rõ ràng. |

## Tên File Evidence Dự Kiến

- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-api-not-connected.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-label-four-digits.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-confirm-password.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-back-to-login.png`

## Quy Tắc Blocked

Nếu TC002 không vào được bước reset do app không kết nối backend hoặc không có OTP dùng được, đánh dấu các case reset phụ thuộc là `Blocked`, không đánh dấu `Fail`:

- TC-MOBILE_FORGOT_PW-005
- TC-MOBILE_FORGOT_PW-006
- TC-MOBILE_FORGOT_PW-007
- TC-MOBILE_FORGOT_PW-009

TC-MOBILE_FORGOT_PW-010 vẫn có thể fail nếu màn hình reset hiển thị và thiếu ô xác nhận mật khẩu.
