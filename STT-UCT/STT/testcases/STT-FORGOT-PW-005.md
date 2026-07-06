# STT-FORGOT-PW-005 - Login --[Open Forgot Password]--> Forgot Password - Email Form

| Thuộc tính | Giá trị |
|---|---|
| Module | FR-03 Forgot Password & Reset |
| Kỹ thuật | State Transition Testing |
| Loại phủ | 1-switch (phủ chuyển tiếp) |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Tiền điều kiện / Thiết lập
- Hệ thống ở trạng thái khởi tạo (initial state).

## Bước thực hiện
Kích hoạt sự kiện **Open Forgot Password**.

## Kết quả mong đợi
Hệ thống chuyển sang trạng thái **Forgot Password - Email Form**. Hệ thống thực hiện: Mở màn hình yêu cầu email khôi phục mật khẩu..

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