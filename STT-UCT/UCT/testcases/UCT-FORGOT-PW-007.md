# UCT-FORGOT-PW-007 - OTP sai hoặc sai độ dài

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, SEC-07 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Exception Flow |
| Flow ID | EF4 |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận hệ thống từ chối đặt lại mật khẩu khi OTP sai, ngắn hơn 6 chữ số hoặc dài hơn 6 chữ số.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Tài khoản `test@eshop.com` đã tồn tại trong hệ thống.
- Người dùng đã yêu cầu OTP thành công và đang ở Bước 2/2.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| OTP sai độ dài | `12345`, `1234567` |
| OTP sai giá trị | Một OTP 6 chữ số không khớp OTP demo |
| Mật khẩu mới | `Abc1!xyz` |
| Xác nhận mật khẩu mới | `Abc1!xyz` |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Người dùng nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
4. Hệ thống xác thực email tồn tại, sinh OTP ngẫu nhiên 6 chữ số và gắn OTP với email vừa yêu cầu.
5. Hệ thống hiển thị/gửi OTP demo và chuyển sang Bước 2/2 với các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
6. Rẽ nhánh EF4: OTP sai hoặc sai độ dài.
7. Người dùng nhập OTP sai hoặc sai độ dài, ví dụ `12345`, `1234567` hoặc OTP 6 chữ số không khớp.
8. Người dùng nhập mật khẩu mới hợp lệ `Abc1!xyz` và xác nhận khớp `Abc1!xyz`, rồi submit.
9. Hệ thống kiểm tra OTP không hợp lệ.

## Kết quả mong đợi

- Hệ thống từ chối đặt lại mật khẩu.
- Hệ thống hiển thị lỗi OTP.
- Hệ thống giữ ở Bước 2/2 và không thay đổi mật khẩu.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `EF4`
