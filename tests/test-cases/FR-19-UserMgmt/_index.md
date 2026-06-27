# Test Cases Index — User Management (FR-19)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | API User Management & Web Admin Navigation Testing (Domain Testing) |
| Total Test Cases | 22 |
| Positive | 2 |
| Negative | 15 |
| Boundary | 2 |
| UI/UX | 3 |
| Security | 1 |
| Related Requirements | FR-19 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-USERMGMT-001 | Kiểm tra xóa người dùng thành công khi ID hợp lệ, tồn tại và không phải tài khoản hiện tại | Positive | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-002 | Kiểm tra xóa người dùng khi ID hợp lệ nhưng không tồn tại trong CSDL | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-003 | Kiểm tra xóa người dùng khi ID bằng 0 | Boundary | Boundary Value Analysis | Medium | Not Run |
| TC-USERMGMT-004 | Kiểm tra xóa người dùng khi ID là số nguyên âm | Boundary | Boundary Value Analysis | Medium | Not Run |
| TC-USERMGMT-005 | Kiểm tra xóa người dùng khi ID sai kiểu dữ liệu | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-006 | Kiểm tra xóa người dùng khi không truyền Authorization Header | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-007 | Kiểm tra xóa người dùng với Authorization Header sai định dạng | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-008 | Kiểm tra xóa người dùng với Authorization Header chứa Token hết hạn hoặc không hợp lệ | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-009 | Kiểm tra xóa người dùng khi tài khoản thực hiện có vai trò là User | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-010 | Kiểm tra xóa người dùng khi tài khoản thực hiện có vai trò không hợp lệ hoặc không xác định | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-011 | Kiểm tra xóa người dùng khi tài khoản thực hiện bị thiếu vai trò trong token | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-012 | Kiểm tra lấy danh sách người dùng thành công khi dùng Token Admin hợp lệ | Positive | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-013 | Kiểm tra lấy danh sách người dùng khi không truyền Authorization Header | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-014 | Kiểm tra lấy danh sách người dùng với Authorization Header sai định dạng | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-015 | Kiểm tra lấy danh sách người dùng với Authorization Header chứa Token hết hạn hoặc không hợp lệ | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-016 | Kiểm tra lấy danh sách người dùng khi tài khoản thực hiện có vai trò là User | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-017 | Kiểm tra lấy danh sách người dùng khi tài khoản thực hiện có vai trò không hợp lệ hoặc không xác định | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-018 | Kiểm tra chặn hành vi Admin tự xóa tài khoản của chính mình (Self-deletion) | Negative | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-019 | Kiểm tra hiển thị nút Xóa trên giao diện Web Admin đối với các tài khoản khác | UI/UX | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-020 | Kiểm tra ẩn hoặc vô hiệu hóa nút Xóa trên giao diện Web Admin đối với tài khoản Admin hiện tại | UI/UX | Equivalence Partitioning | High | Not Run |
| TC-USERMGMT-021 | Kiểm tra xuất hiện hộp thoại xác nhận khi thực hiện hành động Xóa trên Web Admin | UI/UX | Equivalence Partitioning | Medium | Not Run |
| TC-USERMGMT-022 | Kiểm tra bảo mật cấu trúc dữ liệu phản hồi của API lấy danh sách người dùng (Không chứa trường password) | Security | Equivalence Partitioning | High | Not Run |

---

## Notes & Risks

- **Phân quyền và bảo mật**: Endpoint Admin phải được bảo vệ nghiêm ngặt bằng vai trò 'admin' trong token xác thực để tránh việc leo thang đặc quyền từ user thông thường.
- **Ràng buộc tự xóa**: Cơ chế tự xóa tài khoản của chính mình (Self-deletion) phải được kiểm tra cẩn thận ở cả backend (API trả về 400 Bad Request) và frontend (ẩn hoặc disable nút xóa).
- **An toàn thông tin**: API lấy danh sách người dùng không được phép để lộ thông tin nhạy cảm như mật khẩu (kể cả dạng hash) trong JSON response.
