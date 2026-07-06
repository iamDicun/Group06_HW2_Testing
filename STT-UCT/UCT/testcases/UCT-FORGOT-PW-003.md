# UCT-FORGOT-PW-003 - Quay lại đăng nhập từ bước đặt lại mật khẩu

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, FR-23 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Alternate Flow |
| Flow ID | AF2 |
| Ưu tiên | Trung bình |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận người dùng có thể hủy luồng đặt lại mật khẩu và quay lại màn hình Đăng nhập sau khi đã yêu cầu OTP nhưng chưa submit dữ liệu reset hợp lệ.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Tài khoản `test@eshop.com` đã tồn tại trong hệ thống.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Hành động | Chọn `Quay lại đăng nhập` ở Bước 2/2 |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Người dùng nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
4. Hệ thống xác thực email tồn tại, sinh OTP ngẫu nhiên 6 chữ số và gắn OTP với email vừa yêu cầu.
5. Hệ thống hiển thị/gửi OTP demo và chuyển sang Bước 2/2 với các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
6. Rẽ nhánh AF2: Quay lại đăng nhập từ bước đặt lại mật khẩu.
7. Người dùng chọn nút/liên kết Quay lại đăng nhập khi đang ở Bước 2/2.
8. Hệ thống hủy thao tác đặt lại mật khẩu hiện tại và điều hướng về màn hình Đăng nhập.

## Kết quả mong đợi

- Người dùng quay lại màn hình Đăng nhập.
- Mật khẩu không bị thay đổi khi người dùng chưa submit dữ liệu reset hợp lệ.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `AF2`
