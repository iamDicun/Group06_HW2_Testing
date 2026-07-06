# Bug Reports - Use Case Testing UC03

## Phạm vi

Các bug report trong thư mục này được viết lại theo góc nhìn Use Case Testing cho `UC03 - Yêu cầu OTP và Quên mật khẩu`, dựa trên:

- Test case UCT trong `../testcases/`.
- Bug report FR-03 đã có trong `EP & BVA/bug_reports/`.
- Evidence đã có trong `EP & BVA/evidence/FR03/`.

## Danh sách bug

| Bug ID | Tiêu đề | UCT TC liên quan | Root cause tương ứng |
|---|---|---|---|
| [BUG-UCT-FR03-001](BUG-UCT-FR03-001.md) | Thiếu ô xác nhận mật khẩu trong form đặt lại mật khẩu | `UCT-FORGOT-PW-001`, `UCT-FORGOT-PW-009` | `BUG-FR03-003` |
| [BUG-UCT-FR03-002](BUG-UCT-FR03-002.md) | Thiếu chức năng quay lại đăng nhập trong luồng quên mật khẩu | `UCT-FORGOT-PW-002`, `UCT-FORGOT-PW-003` | `BUG-FR03-004` |
| [BUG-UCT-FR03-003](BUG-UCT-FR03-003.md) | Mật khẩu hợp lệ bị từ chối khi đặt lại mật khẩu | `UCT-FORGOT-PW-001`, `UCT-FORGOT-PW-007`, `UCT-FORGOT-PW-010` | `BUG-FR03-005` |

## Ghi chú

- Không tạo bug mới cho các TC UCT chưa có bằng chứng thực thi riêng.
- Các bug này dùng lại evidence/root cause từ EP & BVA nhưng thay phần truy vết sang bộ test case UCT.
