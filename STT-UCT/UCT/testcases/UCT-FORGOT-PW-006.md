# UCT-FORGOT-PW-006 - Email chưa đăng ký khi yêu cầu OTP

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Exception Flow |
| Flow ID | EF3 |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận hệ thống không cho chuyển sang bước reset và không sinh OTP dùng được khi email chưa đăng ký.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Email `missing@example.com` chưa tồn tại trong hệ thống.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `missing@example.com` |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Rẽ nhánh EF3: Email chưa đăng ký.
4. Người dùng nhập email chưa đăng ký `missing@example.com` và gửi yêu cầu OTP.
5. Hệ thống kiểm tra email không tồn tại trong hệ thống.

## Kết quả mong đợi

- Hệ thống hiển thị lỗi phù hợp hoặc không cho chuyển sang Bước 2/2.
- Hệ thống không sinh OTP dùng được.
- Hệ thống không thay đổi mật khẩu của bất kỳ tài khoản nào.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `EF3`
