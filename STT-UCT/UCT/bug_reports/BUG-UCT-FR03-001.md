# [BUG][UCT][Quên Mật Khẩu Web] Thiếu ô xác nhận mật khẩu trong form đặt lại mật khẩu

GitHub Issue liên quan: https://github.com/iamDicun/Group06_HW2_Testing/issues/24

## Test Case Phát Hiện

- `UCT-FORGOT-PW-001` - UC03 thành công
- `UCT-FORGOT-PW-009` - Xác nhận mật khẩu không khớp

## Yêu Cầu Liên Quan

- FR-03: Quên mật khẩu & Đặt lại mật khẩu
- FR-01: Chính sách mật khẩu và xác nhận mật khẩu

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
4. Quan sát form Bước 2/2 để đặt lại mật khẩu.
5. Theo `UCT-FORGOT-PW-009`, thử chuẩn bị kịch bản nhập `Mật khẩu mới = Abc1!xyz` và `Xác nhận mật khẩu mới = Abc1!xyZ`.

## Kết Quả Mong Đợi

Form đặt lại mật khẩu phải hiển thị đủ các trường:

- OTP.
- Mật khẩu mới.
- Xác nhận mật khẩu mới.

Hệ thống phải kiểm tra `Xác nhận mật khẩu mới` khớp với `Mật khẩu mới`. Nếu hai giá trị không khớp, hệ thống phải từ chối đặt lại mật khẩu và hiển thị lỗi phù hợp.

## Kết Quả Thực Tế

Form đặt lại mật khẩu không hiển thị ô `Xác nhận mật khẩu mới`, nên không thể thực thi đầy đủ luồng chính `UCT-FORGOT-PW-001` và không thể kiểm thử nhánh ngoại lệ confirm mismatch trong `UCT-FORGOT-PW-009`.

## Tác Động

- Người dùng có thể không được yêu cầu xác nhận mật khẩu mới trước khi reset.
- Use case không đáp ứng yêu cầu FR-03.
- TC `UCT-FORGOT-PW-009` bị fail/block tại bước cần nhập confirm password.

## Bằng Chứng

`EP & BVA/evidence/FR03/BUG-FR03-003-missing-confirm-password.png`

## Bug Gốc Tương Ứng

- `EP & BVA/bug_reports/BUG-FR03-003.md`

## Labels

- `type: bug`
- `module: forgot-pw`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
- `technique: UCT`
