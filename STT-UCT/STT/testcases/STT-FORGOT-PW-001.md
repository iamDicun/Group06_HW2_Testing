# STT-FORGOT-PW-001 - Đạt tới trạng thái Login

| Thuộc tính | Giá trị |
|---|---|
| Module | FR-03 Forgot Password & Reset |
| Kỹ thuật | State Transition Testing |
| Loại phủ | 0-switch (phủ trạng thái) |
| Ưu tiên | Trung bình |
| Trạng thái | Not Run |

## Tiền điều kiện / Thiết lập
- Hệ thống ở trạng thái khởi tạo (initial state).

## Bước thực hiện
Quan sát trạng thái hiện tại của hệ thống.

## Kết quả mong đợi
Hệ thống đang ở trạng thái **Login**.

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