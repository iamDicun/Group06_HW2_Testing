# Test Cases Index — Profile Management (FR-04 Web/API)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | Web/API Profile Management Testing (Domain Testing) |
| Total Test Cases | 20 |
| Positive | 5 |
| Negative | 15 |
| Boundary | 10 |
| Related Requirements | FR-04 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-PROFILE-001 | Cập nhật hồ sơ thành công với dữ liệu hợp lệ | Positive | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-002 | Cập nhật Họ Tên rỗng | Negative | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-003 | Cập nhật Họ Tên có độ dài đúng 255 ký tự | Positive | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-004 | Cập nhật Họ Tên quá dài 256 ký tự | Negative | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-005 | Cập nhật Họ Tên chứa thẻ HTML hoặc Script để kiểm tra XSS | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-006 | Cập nhật Số điện thoại hợp lệ 10 chữ số bắt đầu bằng 0 | Positive | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-007 | Cập nhật Số điện thoại hợp lệ 11 chữ số bắt đầu bằng 0 | Positive | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-008 | Cập nhật Số điện thoại quá ngắn 9 chữ số | Negative | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-009 | Cập nhật Số điện thoại quá dài 12 chữ số | Negative | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-010 | Cập nhật Số điện thoại không bắt đầu bằng số 0 | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-011 | Cập nhật Số điện thoại chứa ký tự không phải số | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-012 | Cập nhật Số điện thoại để trống | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-013 | Cập nhật Địa chỉ giao hàng rỗng | Negative | Boundary Value Analysis | High | Not Run |
| TC-PROFILE-014 | Cập nhật Địa chỉ giao hàng có độ dài đúng 500 ký tự | Positive | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-015 | Cập nhật Địa chỉ giao hàng quá dài 501 ký tự | Negative | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-016 | Cập nhật Địa chỉ giao hàng chứa thẻ HTML hoặc Script để kiểm tra XSS | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-017 | Cố tình thay đổi địa chỉ email trong payload gửi lên API | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-018 | Cố tình thay đổi vai trò (role) lên admin trong payload gửi lên API | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-019 | Truy cập API cập nhật profile không có Authorization header | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-020 | Truy cập API cập nhật profile với Authorization token không hợp lệ | Negative | Equivalence Partitioning | High | Not Run |

---

## Notes & Risks

- **Phạm vi kiểm thử**: Tập trung kiểm thử các biên dữ liệu cho Họ Tên, Số điện thoại và Địa chỉ giao hàng trên giao diện Web và API.
- **Bảo mật**: Kiểm thử việc gửi payload trực tiếp lên API nhằm chặn việc leo thang đặc quyền hoặc thay đổi email trái phép.
