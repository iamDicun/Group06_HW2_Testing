# UCT-FORGOT-PW-001 - UC03 thành công

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Basic Flow / Happy Path |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận người dùng có thể yêu cầu OTP bằng email đã đăng ký và đặt lại mật khẩu thành công khi OTP, password và confirm password đều hợp lệ.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Tài khoản `test@eshop.com` đã tồn tại trong hệ thống.
- OTP demo được hiển thị trực tiếp trên màn hình sau khi yêu cầu thành công.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| OTP | OTP demo đúng 6 chữ số được hệ thống hiển thị |
| Mật khẩu mới | `Abc1!xyz` |
| Xác nhận mật khẩu mới | `Abc1!xyz` |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Người dùng nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
4. Hệ thống xác thực email tồn tại, sinh OTP ngẫu nhiên 6 chữ số và gắn OTP với email vừa yêu cầu.
5. Hệ thống hiển thị/gửi OTP demo và chuyển sang Bước 2/2 với các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
6. Người dùng nhập OTP đúng 6 chữ số, mật khẩu mới mạnh `Abc1!xyz`, và xác nhận mật khẩu khớp `Abc1!xyz`.
7. Hệ thống xác thực OTP đúng cho email đã yêu cầu, mật khẩu đạt chính sách mạnh và hai trường mật khẩu khớp.
8. Hệ thống cập nhật mật khẩu mới, vô hiệu hóa OTP đã dùng và hiển thị thông báo đặt lại mật khẩu thành công.

## Kết quả mong đợi

- Mật khẩu của tài khoản yêu cầu được cập nhật bằng mật khẩu mới hợp lệ.
- OTP đã dùng không còn được chấp nhận cho lần reset tiếp theo.
- Người dùng thấy thông báo đặt lại mật khẩu thành công và có thể quay lại Đăng nhập.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `Basic Flow`
