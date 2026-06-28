# [BUG][Mobile FR-03] Luồng quên mật khẩu mobile thiếu OTP demo và các thành phần phục hồi bắt buộc

GitHub Issue: https://github.com/iamDicun/Group06_HW2_Testing/issues/33

## Test Case Phát Hiện
TC-MOBILE_FORGOT_PW-002, TC-MOBILE_FORGOT_PW-010, TC-MOBILE_FORGOT_PW-011

Các case liên quan bị chặn: TC-MOBILE_FORGOT_PW-006, TC-MOBILE_FORGOT_PW-007, TC-MOBILE_FORGOT_PW-009

## Yêu Cầu Liên Quan
FR-03 Forgot Password & Reset, Mobile FR-03

## Mức Độ / Độ Ưu Tiên
Major / P2

## Môi Trường
- Thiết bị/Trình chạy: Mobile app UI
- Hệ điều hành: TODO
- App: Expo / React Native mobile app
- Backend: EShop backend
- Tài khoản test: `test@eshop.com`

## Các Bước Tái Hiện
1. Mở mobile app.
2. Từ màn hình Login, bấm `Quên mật khẩu?`.
3. Nhập email đã đăng ký `test@eshop.com`.
4. Bấm `Lấy mã OTP`.
5. Quan sát màn hình reset và các trường/nút điều hướng đang có.

## Kết Quả Mong Đợi
- Mobile app phải cung cấp OTP demo dùng được hoặc hướng dẫn rõ ràng để tester/người dùng có thể hoàn tất đặt lại mật khẩu trong môi trường test.
- Form reset phải có ô Xác nhận mật khẩu và phải từ chối khi xác nhận mật khẩu không khớp.
- Luồng quên mật khẩu/reset phải có hành động rõ ràng để quay lại Login.

## Kết Quả Thực Tế
- App chuyển sang bước reset nhưng không hiển thị OTP dùng được cho demo testing.
- Form reset không có ô Xác nhận mật khẩu.
- Luồng quên mật khẩu/reset không có hành động quay lại Login rõ ràng.
- Vì vậy, các case thành công với OTP đúng và mật khẩu hợp lệ không thể được xác minh đầy đủ qua Mobile UI.

## Bằng Chứng
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-confirm-password.png`
- `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-back-to-login.png`

## Labels
- `type: bug`
- `module: mobile`
- `module: forgot-pw`
- `severity: major`
- `priority: P2`
- `status: new`
- `found-by: test-case`
