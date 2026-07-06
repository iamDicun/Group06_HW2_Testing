# Use Case Testing - UC03 Yêu cầu OTP và Quên mật khẩu

## Phạm vi

| Thuộc tính | Giá trị |
|---|---|
| SUT | EShop Web UI |
| Requirement | FR-03: Quên mật khẩu & Đặt lại mật khẩu |
| Use Case | UC03 - Yêu cầu OTP và Quên mật khẩu |
| Kỹ thuật | Use Case Testing |
| Actor chính | Người dùng đã đăng ký |
| Nguồn yêu cầu | `application/README.md`, mục FR-03 |
| Spec dùng để sinh TC | `usecase03_forgot_password_spec.json` |
| Output generator | `generated_usecase_testcases.json` |

## Mục tiêu Use Case

Người dùng quên mật khẩu có thể yêu cầu OTP bằng email đã đăng ký, nhập OTP cùng mật khẩu mới hợp lệ, xác nhận mật khẩu mới và hoàn tất đặt lại mật khẩu.

## Tiền điều kiện

- Hệ thống EShop Web UI và Backend API đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập và chưa đăng nhập.
- Tài khoản `test@eshop.com` đã tồn tại trong hệ thống.
- Trong môi trường demo, OTP được hiển thị trực tiếp trên màn hình sau khi yêu cầu thành công.

## Hậu điều kiện

| Loại | Hậu điều kiện |
|---|---|
| Thành công | Mật khẩu của tài khoản yêu cầu được cập nhật bằng mật khẩu mới hợp lệ. |
| Thành công | OTP đã dùng không còn được chấp nhận cho lần reset tiếp theo. |
| Thành công | Người dùng thấy thông báo đặt lại mật khẩu thành công và có thể quay lại Đăng nhập. |
| Thất bại | Mật khẩu hiện tại của tài khoản không bị thay đổi. |
| Thất bại | Hệ thống hiển thị thông báo validation/lỗi phù hợp và không hoàn tất đặt lại mật khẩu. |

## Luồng chính

| Bước | Hành động |
|---:|---|
| 1 | Người dùng chọn liên kết/nút `Quên mật khẩu` trên màn hình Đăng nhập. |
| 2 | Hệ thống hiển thị Bước 1/2 với form nhập Email và nút Quay lại đăng nhập. |
| 3 | Người dùng nhập email đã đăng ký `test@eshop.com` và gửi yêu cầu OTP. |
| 4 | Hệ thống xác thực email tồn tại, sinh OTP ngẫu nhiên 6 chữ số và gắn OTP với email vừa yêu cầu. |
| 5 | Hệ thống hiển thị/gửi OTP demo và chuyển sang Bước 2/2 với các trường OTP, Mật khẩu mới, Xác nhận mật khẩu mới. |
| 6 | Người dùng nhập OTP đúng 6 chữ số, mật khẩu mới mạnh `Abc1!xyz`, và xác nhận mật khẩu khớp `Abc1!xyz`. |
| 7 | Hệ thống xác thực OTP đúng cho email đã yêu cầu, mật khẩu đạt chính sách mạnh và hai trường mật khẩu khớp. |
| 8 | Hệ thống cập nhật mật khẩu mới, vô hiệu hóa OTP đã dùng và hiển thị thông báo đặt lại mật khẩu thành công. |

## Điểm quyết định và luồng rẽ nhánh

| Điểm quyết định | Rủi ro kiểm thử | Luồng phủ |
|---|---|---|
| Bước 2 - người dùng có thể hủy ở form email | Thiếu đường quay lại Login hoặc hủy sinh trạng thái không nhất quán | AF1 |
| Bước 2 - submit email trống/sai định dạng | Hệ thống cho qua bước OTP dù dữ liệu chưa hợp lệ | EF1, EF2 |
| Bước 3 - email không tồn tại | Sinh OTP cho email không đăng ký hoặc thông báo sai | EF3 |
| Bước 5 - người dùng có thể hủy ở form reset | Thiếu đường quay lại Login sau khi đã yêu cầu OTP | AF2 |
| Bước 7 - OTP không hợp lệ | Reset mật khẩu bằng OTP sai/sai độ dài | EF4 |
| Bước 7 - password yếu | Cho phép mật khẩu không đạt FR-01 | EF5 |
| Bước 7 - confirm mismatch | Không kiểm tra xác nhận mật khẩu | EF6 |
| Bước 7 - OTP không gắn đúng email | OTP bị dùng chéo giữa các email | EF7 |

## Coverage Summary

| Nhóm luồng | Số TC | TC |
|---|---:|---|
| Basic Flow | 1 | UCT-FORGOT-PW-001 |
| Alternate Flow | 2 | UCT-FORGOT-PW-002, UCT-FORGOT-PW-003 |
| Exception Flow | 7 | UCT-FORGOT-PW-004..UCT-FORGOT-PW-010 |
| Tổng | 10 | 10 TC |

## Test Case Index

| TC ID | Luồng | Mục tiêu | Ưu tiên |
|---|---|---|---|
| [UCT-FORGOT-PW-001](testcases/UCT-FORGOT-PW-001.md) | Basic Flow | Reset mật khẩu thành công bằng email đăng ký, OTP đúng và password hợp lệ | Cao |
| [UCT-FORGOT-PW-002](testcases/UCT-FORGOT-PW-002.md) | AF1 | Quay lại đăng nhập từ bước nhập email | Trung bình |
| [UCT-FORGOT-PW-003](testcases/UCT-FORGOT-PW-003.md) | AF2 | Quay lại đăng nhập từ bước đặt lại mật khẩu | Trung bình |
| [UCT-FORGOT-PW-004](testcases/UCT-FORGOT-PW-004.md) | EF1 | Email trống khi yêu cầu OTP | Cao |
| [UCT-FORGOT-PW-005](testcases/UCT-FORGOT-PW-005.md) | EF2 | Email sai định dạng khi yêu cầu OTP | Cao |
| [UCT-FORGOT-PW-006](testcases/UCT-FORGOT-PW-006.md) | EF3 | Email chưa đăng ký khi yêu cầu OTP | Cao |
| [UCT-FORGOT-PW-007](testcases/UCT-FORGOT-PW-007.md) | EF4 | OTP sai hoặc sai độ dài | Cao |
| [UCT-FORGOT-PW-008](testcases/UCT-FORGOT-PW-008.md) | EF5 | Mật khẩu mới không đạt chính sách mạnh | Cao |
| [UCT-FORGOT-PW-009](testcases/UCT-FORGOT-PW-009.md) | EF6 | Xác nhận mật khẩu không khớp | Cao |
| [UCT-FORGOT-PW-010](testcases/UCT-FORGOT-PW-010.md) | EF7 | OTP không thuộc email đã yêu cầu | Cao |

## Dữ liệu kiểm thử chuẩn

| Dữ liệu | Giá trị |
|---|---|
| Email đã đăng ký | `test@eshop.com` |
| Email chưa đăng ký | `missing@example.com` |
| Email sai định dạng | `abc` |
| OTP hợp lệ | OTP demo đúng 6 chữ số hiển thị sau khi request |
| OTP sai độ dài | `12345`, `1234567` |
| Password hợp lệ | `Abc1!xyz` |
| Password ngắn | `Abc1!xy` |
| Password thiếu ký tự đặc biệt | `Abc1xyza` |
| Confirm mismatch | `Abc1!xyZ` |

## Ghi chú thiết kế

- Bộ TC này tập trung vào coverage theo luồng tương tác của Use Case Testing, không thay thế hoàn toàn EP/BVA cho từng field.
- Các biến thể chi tiết về độ dài OTP 5/6/7 và password min/min+1 đã có thể được mở rộng bằng BVA nếu cần chạy sâu hơn.
- EF7 cần môi trường có khả năng tạo/quan sát OTP cho email khác hoặc dữ liệu test tương đương; nếu môi trường demo không hỗ trợ, đánh dấu Blocked thay vì Fail.

## Bug Reports

| Bug ID | Mô tả | TC liên quan |
|---|---|---|
| [BUG-UCT-FR03-001](bug_reports/BUG-UCT-FR03-001.md) | Thiếu ô xác nhận mật khẩu trong form đặt lại mật khẩu | `UCT-FORGOT-PW-001`, `UCT-FORGOT-PW-009` |
| [BUG-UCT-FR03-002](bug_reports/BUG-UCT-FR03-002.md) | Thiếu chức năng quay lại đăng nhập trong luồng quên mật khẩu | `UCT-FORGOT-PW-002`, `UCT-FORGOT-PW-003` |
| [BUG-UCT-FR03-003](bug_reports/BUG-UCT-FR03-003.md) | Mật khẩu hợp lệ bị từ chối khi đặt lại mật khẩu | `UCT-FORGOT-PW-001`, `UCT-FORGOT-PW-007`, `UCT-FORGOT-PW-010` |
