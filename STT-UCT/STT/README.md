# State Transition Testing - FR-03 Forgot Password & Reset

## Phạm vi

- **SUT:** EShop Web UI
- **Module:** FR-03 Forgot Password & Reset
- **Kỹ thuật:** State Transition Testing
- **Trạng thái khởi tạo:** `Login`
- **Nguồn spec:** `forgot_password_state_spec.json`

## Artefacts

| File/Thư mục | Nội dung |
|---|---|
| `forgot_password_state_spec.json` | Spec máy trạng thái dùng làm single source of truth |
| `state-diagram.md` | State diagram dạng Mermaid |
| `transition-tables.md` | Valid transition table và invalid transition table |
| `bug-report.md` | Đối chiếu STT test case với bug report FR-03 trong `EP & BVA` |
| `generated_testcases.json` | Output JSON từ generator của skill |
| `testcases/` | Mỗi test case là một file Markdown riêng |

## Coverage Summary

| Nhóm phủ | Số TC | Mục tiêu |
|---|---:|---|
| 0-switch | 4 | Mỗi trạng thái đạt được ít nhất một lần |
| 1-switch | 8 | Mỗi transition hợp lệ được kiểm thử ít nhất một lần |
| Invalid transition | 16 | Mỗi tổ hợp trạng thái-sự kiện không định nghĩa phải bị từ chối/không chuyển trạng thái |
| **Tổng** | **28** | STT suite cho FR-03 |

## Test Case Index

| TC ID | Loại phủ | Mục tiêu |
|---|---|---|
| [STT-FORGOT-PW-001](testcases/STT-FORGOT-PW-001.md) | 0-switch | Đạt tới trạng thái Login |
| [STT-FORGOT-PW-002](testcases/STT-FORGOT-PW-002.md) | 0-switch | Đạt tới trạng thái Forgot Password - Email Form |
| [STT-FORGOT-PW-003](testcases/STT-FORGOT-PW-003.md) | 0-switch | Đạt tới trạng thái Reset Password Form |
| [STT-FORGOT-PW-004](testcases/STT-FORGOT-PW-004.md) | 0-switch | Đạt tới trạng thái Reset Completed |
| [STT-FORGOT-PW-005](testcases/STT-FORGOT-PW-005.md) | 1-switch | Login -- Open Forgot Password --> Forgot Password - Email Form |
| [STT-FORGOT-PW-006](testcases/STT-FORGOT-PW-006.md) | 1-switch | Forgot Password - Email Form -- Submit registered email --> Reset Password Form |
| [STT-FORGOT-PW-007](testcases/STT-FORGOT-PW-007.md) | 1-switch | Forgot Password - Email Form -- Submit invalid/unregistered email --> Forgot Password - Email Form |
| [STT-FORGOT-PW-008](testcases/STT-FORGOT-PW-008.md) | 1-switch | Forgot Password - Email Form -- Back to Login --> Login |
| [STT-FORGOT-PW-009](testcases/STT-FORGOT-PW-009.md) | 1-switch | Reset Password Form -- Submit valid OTP/password --> Reset Completed |
| [STT-FORGOT-PW-010](testcases/STT-FORGOT-PW-010.md) | 1-switch | Reset Password Form -- Submit invalid reset data --> Reset Password Form |
| [STT-FORGOT-PW-011](testcases/STT-FORGOT-PW-011.md) | 1-switch | Reset Password Form -- Back to Login --> Login |
| [STT-FORGOT-PW-012](testcases/STT-FORGOT-PW-012.md) | 1-switch | Reset Completed -- Back to Login --> Login |
| [STT-FORGOT-PW-013](testcases/STT-FORGOT-PW-013.md) | Invalid transition | Login nhận Submit registered email |
| [STT-FORGOT-PW-014](testcases/STT-FORGOT-PW-014.md) | Invalid transition | Login nhận Submit invalid/unregistered email |
| [STT-FORGOT-PW-015](testcases/STT-FORGOT-PW-015.md) | Invalid transition | Login nhận Submit valid OTP/password |
| [STT-FORGOT-PW-016](testcases/STT-FORGOT-PW-016.md) | Invalid transition | Login nhận Submit invalid reset data |
| [STT-FORGOT-PW-017](testcases/STT-FORGOT-PW-017.md) | Invalid transition | Login nhận Back to Login |
| [STT-FORGOT-PW-018](testcases/STT-FORGOT-PW-018.md) | Invalid transition | Email Form nhận Open Forgot Password |
| [STT-FORGOT-PW-019](testcases/STT-FORGOT-PW-019.md) | Invalid transition | Email Form nhận Submit valid OTP/password |
| [STT-FORGOT-PW-020](testcases/STT-FORGOT-PW-020.md) | Invalid transition | Email Form nhận Submit invalid reset data |
| [STT-FORGOT-PW-021](testcases/STT-FORGOT-PW-021.md) | Invalid transition | Reset Form nhận Open Forgot Password |
| [STT-FORGOT-PW-022](testcases/STT-FORGOT-PW-022.md) | Invalid transition | Reset Form nhận Submit registered email |
| [STT-FORGOT-PW-023](testcases/STT-FORGOT-PW-023.md) | Invalid transition | Reset Form nhận Submit invalid/unregistered email |
| [STT-FORGOT-PW-024](testcases/STT-FORGOT-PW-024.md) | Invalid transition | Reset Completed nhận Open Forgot Password |
| [STT-FORGOT-PW-025](testcases/STT-FORGOT-PW-025.md) | Invalid transition | Reset Completed nhận Submit registered email |
| [STT-FORGOT-PW-026](testcases/STT-FORGOT-PW-026.md) | Invalid transition | Reset Completed nhận Submit invalid/unregistered email |
| [STT-FORGOT-PW-027](testcases/STT-FORGOT-PW-027.md) | Invalid transition | Reset Completed nhận Submit valid OTP/password |
| [STT-FORGOT-PW-028](testcases/STT-FORGOT-PW-028.md) | Invalid transition | Reset Completed nhận Submit invalid reset data |

## Notes

- Các transition có guard về OTP length, password strength và confirm password nên được kết hợp thêm BVA khi chạy manual.
- Invalid transition được hiểu là UI không cho thao tác, báo lỗi phù hợp, hoặc giữ nguyên trạng thái; không được crash hoặc chuyển trạng thái ngầm.
