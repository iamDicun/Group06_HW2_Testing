# STT-FORGOT-PW-009 - Reset Password Form --[Submit valid OTP and matching strong password]--> Reset Completed

| Thuộc tính | Giá trị |
|---|---|
| Module | FR-03 Forgot Password & Reset |
| Kỹ thuật | State Transition Testing |
| Loại phủ | 1-switch (phủ chuyển tiếp) |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Tiền điều kiện / Thiết lập
- Từ trạng thái **Login**, kích hoạt sự kiện **Open Forgot Password** → hệ thống chuyển sang **Forgot Password - Email Form**.
- Từ trạng thái **Forgot Password - Email Form**, kích hoạt sự kiện **Submit registered email** (điều kiện: email tồn tại trong hệ thống, ví dụ test@eshop.com) → hệ thống chuyển sang **Reset Password Form**.

## Bước thực hiện
Kích hoạt sự kiện **Submit valid OTP and matching strong password** (điều kiện: OTP đúng 6 chữ số; password mạnh tối thiểu 8 ký tự; confirm password khớp).

## Kết quả mong đợi
Hệ thống chuyển sang trạng thái **Reset Completed**. Hệ thống thực hiện: Đổi mật khẩu thành công và hiển thị xác nhận hoàn tất..

## Dữ liệu test gợi ý
- Email đã đăng ký: `test@eshop.com`
- Email sai định dạng: `abc`
- Email chưa đăng ký: `missing@example.com`
- OTP hợp lệ: OTP demo đúng 6 chữ số
- OTP không hợp lệ: `12345`, `1234567`, hoặc OTP sai
- Password hợp lệ: `Abc1!xyz`
- Password yếu: `Abc1xyza`
- Confirm mismatch: `Abc1!xyZ`

## Truy vết
- Spec: `../forgot_password_state_spec.json`
- Generated source: `../generated_testcases.json`