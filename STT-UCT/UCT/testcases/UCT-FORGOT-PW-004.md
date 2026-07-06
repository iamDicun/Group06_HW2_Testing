# UCT-FORGOT-PW-004 - Email trống khi yêu cầu OTP

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, FR-22 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Exception Flow |
| Flow ID | EF1 |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận hệ thống không gửi OTP khi người dùng submit form yêu cầu OTP với email trống.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | Empty |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Rẽ nhánh EF1: Email trống.
4. Người dùng để trống email và gửi yêu cầu OTP.
5. Hệ thống kiểm tra trường bắt buộc.

## Kết quả mong đợi

- Hệ thống hiển thị lỗi bắt buộc nhập email.
- Hệ thống giữ ở Bước 1/2.
- Hệ thống không sinh OTP và không thay đổi mật khẩu.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `EF1`
