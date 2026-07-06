# UCT-FORGOT-PW-005 - Email sai định dạng khi yêu cầu OTP

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, FR-22 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Exception Flow |
| Flow ID | EF2 |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận hệ thống không gửi OTP khi email có định dạng không hợp lệ.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `abc` |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Rẽ nhánh EF2: Email sai định dạng.
4. Người dùng nhập email sai định dạng `abc` và gửi yêu cầu OTP.
5. Hệ thống kiểm tra định dạng email.

## Kết quả mong đợi

- Hệ thống hiển thị lỗi email không hợp lệ.
- Hệ thống giữ ở Bước 1/2.
- Hệ thống không sinh OTP và không thay đổi mật khẩu.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `EF2`
