# [BUG][UCT][Quên Mật Khẩu Web] Thiếu chức năng quay lại đăng nhập trong luồng quên mật khẩu

GitHub Issue liên quan: https://github.com/iamDicun/Group06_HW2_Testing/issues/25

## Test Case Phát Hiện

- `UCT-FORGOT-PW-002` - Quay lại đăng nhập từ bước nhập email
- `UCT-FORGOT-PW-003` - Quay lại đăng nhập từ bước đặt lại mật khẩu

## Yêu Cầu Liên Quan

- FR-03: Quên mật khẩu & Đặt lại mật khẩu
- FR-23: Navigation Requirements

## Mức Độ / Độ Ưu Tiên

Minor / P2

## Môi Trường

- Trình duyệt: TODO
- Hệ điều hành: TODO
- URL: `http://localhost:5173/forgot-password`
- Build/Commit: TODO
- Tài khoản test: `test@eshop.com`

## Các Bước Tái Hiện

1. Mở Web UI tại màn hình Đăng nhập.
2. Chọn liên kết/nút `Quên mật khẩu`.
3. Ở Bước 1/2, quan sát xem có nút/liên kết `Quay lại đăng nhập` hay không.
4. Nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP.
5. Ở Bước 2/2, quan sát xem có nút/liên kết `Quay lại đăng nhập` hay không.

## Kết Quả Mong Đợi

Luồng quên mật khẩu phải có hành động quay lại màn hình Đăng nhập rõ ràng:

- Tại Bước 1/2 trước khi sinh OTP, để người dùng hủy thao tác yêu cầu OTP.
- Tại Bước 2/2 sau khi yêu cầu OTP, để người dùng hủy thao tác đặt lại mật khẩu.

Khi người dùng chọn quay lại, hệ thống phải điều hướng về màn hình Đăng nhập và không thay đổi mật khẩu.

## Kết Quả Thực Tế

Không có hành động quay lại Đăng nhập rõ ràng trong luồng quên mật khẩu. Vì vậy `UCT-FORGOT-PW-002` và `UCT-FORGOT-PW-003` không thể hoàn tất theo expected result.

## Tác Động

- Người dùng không có đường thoát rõ ràng khỏi luồng quên mật khẩu.
- Navigation không đáp ứng FR-03/FR-23.
- Hai alternate flow của UC03 bị fail.

## Bằng Chứng

`EP & BVA/evidence/FR03/BUG-FR03-004-missing-back-to-login.png`

## Bug Gốc Tương Ứng

- `EP & BVA/bug_reports/BUG-FR03-004.md`

## Labels

- `type: bug`
- `module: forgot-pw`
- `severity: minor`
- `priority: P2`
- `status: new`
- `found-by: test-case`
- `technique: UCT`
