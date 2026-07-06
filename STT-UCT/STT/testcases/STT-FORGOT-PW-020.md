# STT-FORGOT-PW-020 - Forgot Password - Email Form nhận sự kiện KHÔNG hợp lệ Submit invalid OTP, weak password, or mismatched confirm password

| Thuộc tính | Giá trị |
|---|---|
| Module | FR-03 Forgot Password & Reset |
| Kỹ thuật | State Transition Testing |
| Loại phủ | Chuyển tiếp không hợp lệ |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Tiền điều kiện / Thiết lập
- Từ trạng thái **Login**, kích hoạt sự kiện **Open Forgot Password** → hệ thống chuyển sang **Forgot Password - Email Form**.

## Bước thực hiện
Kích hoạt sự kiện **Submit invalid OTP, weak password, or mismatched confirm password**.

## Kết quả mong đợi
Hệ thống PHẢI từ chối / báo lỗi và giữ nguyên trạng thái **Forgot Password - Email Form** (không có transition nào định nghĩa cho tổ hợp này — cần xác nhận đây là hành vi mong muốn).

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