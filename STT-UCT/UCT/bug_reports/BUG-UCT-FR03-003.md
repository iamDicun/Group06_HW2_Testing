# [BUG][UCT][Quên Mật Khẩu Web] Mật khẩu hợp lệ bị từ chối khi đặt lại mật khẩu

GitHub Issue liên quan: https://github.com/iamDicun/Group06_HW2_Testing/issues/26

## Test Case Phát Hiện

- `UCT-FORGOT-PW-001` - UC03 thành công
- `UCT-FORGOT-PW-007` - OTP sai hoặc sai độ dài
- `UCT-FORGOT-PW-010` - OTP không thuộc email đã yêu cầu

## Yêu Cầu Liên Quan

- FR-03: Quên mật khẩu & Đặt lại mật khẩu
- FR-01: Chính sách mật khẩu mạnh
- SEC-07: OTP đặt lại mật khẩu

## Mức Độ / Độ Ưu Tiên

Major / P1

## Môi Trường

- Trình duyệt: TODO
- Hệ điều hành: TODO
- URL: `http://localhost:5173/forgot-password`
- Build/Commit: TODO
- Tài khoản test: `test@eshop.com`

## Các Bước Tái Hiện

1. Mở Web UI tại màn hình Đăng nhập.
2. Chọn liên kết/nút `Quên mật khẩu`.
3. Nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
4. Nhập OTP được hiển thị trên màn hình demo.
5. Nhập mật khẩu mới hợp lệ `Abc1!xyz`.
6. Nếu form có trường xác nhận mật khẩu, nhập `Abc1!xyz` vào trường xác nhận.
7. Bấm đặt lại mật khẩu.

## Kết Quả Mong Đợi

Mật khẩu `Abc1!xyz` phải được chấp nhận vì đáp ứng chính sách:

- Có 8 ký tự.
- Có chữ hoa.
- Có chữ thường.
- Có chữ số.
- Có ký tự đặc biệt `!`.

Với `UCT-FORGOT-PW-001`, luồng reset phải hoàn tất nếu OTP đúng và confirm khớp. Với các TC kiểm tra OTP như `UCT-FORGOT-PW-007` và `UCT-FORGOT-PW-010`, hệ thống phải cho phép cô lập lỗi OTP thay vì chặn trước ở validation mật khẩu hợp lệ.

## Kết Quả Thực Tế

Form hiển thị lỗi mật khẩu và không chấp nhận mật khẩu hợp lệ `Abc1!xyz`. Lỗi này làm `UCT-FORGOT-PW-001` không thể hoàn tất happy path và cũng làm các TC kiểm tra OTP bị blocked vì không thể cô lập hành vi OTP.

## Tác Động

- Người dùng không thể đặt lại mật khẩu dù nhập mật khẩu hợp lệ.
- Happy path của UC03 bị fail.
- Các exception flow liên quan OTP bị blocked hoặc không thể kết luận chính xác.

## Bằng Chứng

`EP & BVA/evidence/FR03/BUG-FR03-005-valid-password-rejected.png`

## Bug Gốc Tương Ứng

- `EP & BVA/bug_reports/BUG-FR03-005.md`

## Labels

- `type: bug`
- `module: forgot-pw`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
- `technique: UCT`
