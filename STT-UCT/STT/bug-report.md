# STT Bug Report - FR-03 Forgot Password & Reset

## Mục đích

Report này đối chiếu bộ test State Transition Testing trong `STT-UCT/STT/testcases` với các bug report FR-03 đã có trong `EP & BVA/bug_reports` để xác định test case STT nào sẽ phát hiện bug hoặc bị blocked bởi bug đã biết.

## Nguồn đối chiếu

| Bug nguồn | Tiêu đề | Issue | Severity/Priority |
|---|---|---|---|
| `EP & BVA/bug_reports/BUG-FR03-003.md` | Thiếu ô xác nhận mật khẩu | https://github.com/iamDicun/Group06_HW2_Testing/issues/24 | Major / P1 |
| `EP & BVA/bug_reports/BUG-FR03-004.md` | Thiếu chức năng quay lại đăng nhập | https://github.com/iamDicun/Group06_HW2_Testing/issues/25 | Minor / P2 |
| `EP & BVA/bug_reports/BUG-FR03-005.md` | Mật khẩu hợp lệ bị từ chối khi đặt lại mật khẩu | https://github.com/iamDicun/Group06_HW2_Testing/issues/26 | Major / P1 |

## STT Test Cases Tạo Thành Bug

| STT TC | Loại phủ | Expected theo STT | Actual theo bug EP & BVA | Kết luận | Bug liên quan |
|---|---|---|---|---|---|
| `STT-FORGOT-PW-006` | 1-switch | Submit email đã đăng ký phải chuyển sang Reset Password Form và form có OTP, mật khẩu mới, xác nhận mật khẩu | Reset form không hiển thị ô xác nhận mật khẩu | Fail | `BUG-FR03-003` |
| `STT-FORGOT-PW-008` | 1-switch | Từ Email Form, sự kiện Back to Login phải chuyển về Login | Luồng quên mật khẩu không có hành động quay lại Login rõ ràng | Fail | `BUG-FR03-004` |
| `STT-FORGOT-PW-009` | 1-switch | Từ Reset Password Form, OTP đúng + password mạnh + confirm khớp phải chuyển sang Reset Completed | Password hợp lệ như `Abc1!xyz` bị reject; thiếu confirm password cũng làm luồng không đúng kỳ vọng | Fail | `BUG-FR03-005`, `BUG-FR03-003` |
| `STT-FORGOT-PW-010` | 1-switch | Dữ liệu reset không hợp lệ, gồm confirm mismatch, phải bị validation và giữ ở Reset Password Form | Không có ô confirm password nên không thể kiểm thử đúng nhánh confirm mismatch như đặc tả STT | Fail/Partially Blocked | `BUG-FR03-003` |
| `STT-FORGOT-PW-011` | 1-switch | Từ Reset Password Form, sự kiện Back to Login phải chuyển về Login | Luồng quên mật khẩu không có hành động quay lại Login rõ ràng | Fail | `BUG-FR03-004` |

## STT Test Cases Bị Blocked Do Bug Đã Biết

| STT TC | Loại phủ | Lý do blocked | Bug chặn |
|---|---|---|---|
| `STT-FORGOT-PW-004` | 0-switch | Muốn đạt trạng thái Reset Completed cần submit OTP đúng và password hợp lệ, nhưng password hợp lệ bị reject | `BUG-FR03-005` |
| `STT-FORGOT-PW-012` | 1-switch | Muốn test transition Reset Completed -> Login cần vào được Reset Completed trước, nhưng reset hợp lệ không hoàn tất được | `BUG-FR03-005`; sau khi fix cần retest thêm `BUG-FR03-004` |

## Bug Report Chi Tiết Theo STT

### STT-BUG-FR03-001 - Reset form thiếu confirm password làm sai transition sang Reset Password Form

**STT TC phát hiện:** `STT-FORGOT-PW-006`, `STT-FORGOT-PW-010`, ảnh hưởng `STT-FORGOT-PW-009`

**Bug nguồn:** `BUG-FR03-003`

**Môi trường:**

- URL: `http://localhost:5173/forgot-password`
- Tài khoản test: `test@eshop.com`
- Trình duyệt/HĐH/Build: xem bug nguồn hoặc điền khi chạy lại manual

**Các bước tái hiện theo STT:**

1. Ở trạng thái `Login`, kích hoạt `Open Forgot Password`.
2. Ở trạng thái `Forgot Password - Email Form`, submit email đã đăng ký `test@eshop.com`.
3. Quan sát form ở trạng thái `Reset Password Form`.

**Kết quả mong đợi:**

Form reset phải có OTP, mật khẩu mới và xác nhận mật khẩu mới để guard `password mạnh; confirm password khớp` có thể được kiểm thử.

**Kết quả thực tế:**

Form reset không hiển thị ô xác nhận mật khẩu mới.

**Ảnh hưởng STT:**

- `STT-FORGOT-PW-006` fail vì action mong đợi của transition `Submit registered email` không đầy đủ.
- `STT-FORGOT-PW-010` không kiểm thử được nhánh `mismatched confirm password` đúng nghĩa.
- `STT-FORGOT-PW-009` bị ảnh hưởng vì transition valid reset yêu cầu confirm password khớp.

**Bằng chứng nguồn:** `submission/evidence/FR03/BUG-FR03-003-missing-confirm-password.png`

### STT-BUG-FR03-002 - Thiếu transition Back to Login trong luồng Forgot Password

**STT TC phát hiện:** `STT-FORGOT-PW-008`, `STT-FORGOT-PW-011`; `STT-FORGOT-PW-012` cần retest sau khi reset hoàn tất được

**Bug nguồn:** `BUG-FR03-004`

**Môi trường:**

- URL: `http://localhost:5173/forgot-password`
- Tài khoản test: `test@eshop.com`
- Trình duyệt/HĐH/Build: xem bug nguồn hoặc điền khi chạy lại manual

**Các bước tái hiện theo STT:**

1. Ở trạng thái `Login`, kích hoạt `Open Forgot Password`.
2. Ở trạng thái `Forgot Password - Email Form`, tìm/kích hoạt `Back to Login`.
3. Submit email đã đăng ký để vào `Reset Password Form`, sau đó tìm/kích hoạt `Back to Login`.

**Kết quả mong đợi:**

Ở `Forgot Password - Email Form` và `Reset Password Form`, hệ thống phải có hành động quay lại Login rõ ràng và chuyển về trạng thái `Login` khi người dùng kích hoạt.

**Kết quả thực tế:**

Không có hành động quay lại Login rõ ràng trong luồng quên mật khẩu.

**Ảnh hưởng STT:**

- `STT-FORGOT-PW-008` fail vì transition `Forgot Password - Email Form -> Login` không thực hiện được.
- `STT-FORGOT-PW-011` fail vì transition `Reset Password Form -> Login` không thực hiện được.
- `STT-FORGOT-PW-012` chưa kết luận trực tiếp vì đang bị blocked bởi lỗi reset hợp lệ không hoàn tất.

**Bằng chứng nguồn:** `submission/evidence/FR03/BUG-FR03-004-missing-back-to-login.png`

### STT-BUG-FR03-003 - Password hợp lệ bị reject làm không đạt Reset Completed

**STT TC phát hiện:** `STT-FORGOT-PW-009`; blocked `STT-FORGOT-PW-004`, `STT-FORGOT-PW-012`

**Bug nguồn:** `BUG-FR03-005`

**Môi trường:**

- URL: `http://localhost:5173/forgot-password`
- Tài khoản test: `test@eshop.com`
- Trình duyệt/HĐH/Build: xem bug nguồn hoặc điền khi chạy lại manual

**Các bước tái hiện theo STT:**

1. Ở trạng thái `Login`, kích hoạt `Open Forgot Password`.
2. Ở trạng thái `Forgot Password - Email Form`, submit email đã đăng ký `test@eshop.com`.
3. Ở trạng thái `Reset Password Form`, nhập OTP đúng 6 chữ số.
4. Nhập password hợp lệ, ví dụ `Abc1!xyz`.
5. Nhập confirm password khớp nếu field tồn tại.
6. Submit reset password.

**Kết quả mong đợi:**

Hệ thống chấp nhận password hợp lệ và chuyển sang trạng thái `Reset Completed`.

**Kết quả thực tế:**

Password hợp lệ bị reject; hệ thống không hoàn tất reset password.

**Ảnh hưởng STT:**

- `STT-FORGOT-PW-009` fail vì transition `Reset Password Form -> Reset Completed` không xảy ra.
- `STT-FORGOT-PW-004` blocked/fail vì không đạt được trạng thái `Reset Completed`.
- `STT-FORGOT-PW-012` blocked vì không thiết lập được tiền điều kiện `Reset Completed`.

**Bằng chứng nguồn:** `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png`

