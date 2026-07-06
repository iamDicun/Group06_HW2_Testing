# UCT-FORGOT-PW-002 - Quay lại đăng nhập từ bước nhập email

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, FR-23 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Alternate Flow |
| Flow ID | AF1 |
| Ưu tiên | Trung bình |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận người dùng có thể hủy luồng quên mật khẩu và quay lại màn hình Đăng nhập ngay tại bước nhập email.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.

## Dữ liệu test

| Field | Value |
|---|---|
| Hành động | Chọn `Quay lại đăng nhập` ở Bước 1/2 |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Rẽ nhánh AF1: Quay lại đăng nhập từ bước nhập email.
4. Người dùng chọn nút/liên kết Quay lại đăng nhập khi đang ở Bước 1/2.
5. Hệ thống hủy thao tác quên mật khẩu hiện tại và điều hướng về màn hình Đăng nhập.

## Kết quả mong đợi

- Người dùng quay lại màn hình Đăng nhập.
- Không có OTP nào được sinh và mật khẩu không bị thay đổi.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `AF1`
