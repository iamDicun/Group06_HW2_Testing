# UCT-FORGOT-PW-008 - Mật khẩu mới không đạt chính sách mạnh

| Thuộc tính | Giá trị |
|---|---|
| Requirement ID | FR-03, FR-01 |
| Feature | Forgot Password & Reset |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Loại luồng | Exception Flow |
| Flow ID | EF5 |
| Ưu tiên | Cao |
| Trạng thái | Not Run |

## Mục tiêu

Xác nhận hệ thống từ chối đặt lại mật khẩu khi mật khẩu mới không đạt chính sách mạnh của FR-01.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Tài khoản `test@eshop.com` đã tồn tại trong hệ thống.
- Người dùng đã yêu cầu OTP thành công và đang ở Bước 2/2.

## Dữ liệu test

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| OTP | OTP demo đúng 6 chữ số được hệ thống hiển thị |
| Password ngắn | `Abc1!xy` |
| Password thiếu ký tự đặc biệt | `Abc1xyza` |
| Confirm password | Cùng giá trị với password yếu được chọn |

## Bước thực hiện

1. Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập.
2. Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập.
3. Người dùng nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
4. Hệ thống xác thực email tồn tại, sinh OTP ngẫu nhiên 6 chữ số và gắn OTP với email vừa yêu cầu.
5. Hệ thống hiển thị/gửi OTP demo và chuyển sang Bước 2/2 với các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
6. Rẽ nhánh EF5: Mật khẩu mới không đạt chính sách mạnh.
7. Người dùng nhập OTP đúng 6 chữ số.
8. Người dùng nhập mật khẩu yếu, ví dụ `Abc1!xy` hoặc `Abc1xyza`, và xác nhận cùng giá trị.
9. Hệ thống kiểm tra mật khẩu không đạt chính sách tối thiểu 8 ký tự và đủ chữ hoa, chữ thường, chữ số, ký tự đặc biệt.

## Kết quả mong đợi

- Hệ thống từ chối đặt lại mật khẩu.
- Hệ thống hiển thị lỗi mật khẩu.
- Hệ thống giữ ở Bước 2/2 và không thay đổi mật khẩu.

## Actual Result

Not Run

## Related Bugs

None

## Truy vết

- Use case spec: `../usecase03_forgot_password_spec.json`
- Generated source: `../generated_usecase_testcases.json`
- Flow ID: `EF5`
