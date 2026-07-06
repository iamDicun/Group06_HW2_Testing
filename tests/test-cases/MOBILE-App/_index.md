# Test Cases Index — Mobile App Profile (FR-04 Mobile)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | Mobile App Profile Domain Testing (EP/BVA) |
| Total Test Cases | 15 |
| Positive | 4 |
| Negative | 11 |
| Boundary | 10 |
| Related Requirements | FR-04 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-PROFILE-MOBILE-001 | Cập nhật hồ sơ với Số điện thoại hợp lệ 10 chữ số | Positive | Boundary Value Analysis | High | FAILED |
| TC-PROFILE-MOBILE-002 | Cập nhật hồ sơ với Số điện thoại hợp lệ 11 chữ số | Positive | Boundary Value Analysis | High | FAILED |
| TC-PROFILE-MOBILE-003 | Cập nhật hồ sơ với Số điện thoại quá ngắn 9 chữ số | Negative | Boundary Value Analysis | High | PASSED |
| TC-PROFILE-MOBILE-004 | Chặn nhập số điện thoại vượt quá 11 chữ số ở Client | Negative | Boundary Value Analysis | High | PASSED |
| TC-PROFILE-MOBILE-005 | Cập nhật hồ sơ với Số điện thoại không bắt đầu bằng số 0 | Negative | Equivalence Partitioning | High | FAILED |
| TC-PROFILE-MOBILE-006 | Validate Số điện thoại chứa ký tự chữ cái khi paste từ clipboard | Negative | Equivalence Partitioning | Medium | PASSED |
| TC-PROFILE-MOBILE-007 | Cập nhật hồ sơ với Số điện thoại để trống | Negative | Equivalence Partitioning | High | PASSED |
| TC-PROFILE-MOBILE-008 | Cập nhật Họ Tên rỗng | Negative | Boundary Value Analysis | High | BLOCKED |
| TC-PROFILE-MOBILE-009 | Cập nhật Họ Tên có độ dài đúng 255 ký tự | Positive | Boundary Value Analysis | Medium | BLOCKED |
| TC-PROFILE-MOBILE-010 | Cập nhật Họ Tên quá dài 256 ký tự | Negative | Boundary Value Analysis | Medium | BLOCKED |
| TC-PROFILE-MOBILE-011 | Cập nhật Họ Tên chứa thẻ HTML hoặc Script để kiểm tra XSS | Negative | Equivalence Partitioning | High | BLOCKED |
| TC-PROFILE-MOBILE-012 | Cập nhật Địa chỉ giao hàng rỗng | Negative | Boundary Value Analysis | High | BLOCKED |
| TC-PROFILE-MOBILE-013 | Cập nhật Địa chỉ giao hàng có độ dài đúng 500 ký tự | Positive | Boundary Value Analysis | Medium | BLOCKED |
| TC-PROFILE-MOBILE-014 | Cập nhật Địa chỉ giao hàng quá dài 501 ký tự | Negative | Boundary Value Analysis | Medium | BLOCKED |
| TC-PROFILE-MOBILE-015 | Cập nhật Địa chỉ giao hàng chứa thẻ HTML hoặc Script để kiểm tra XSS | Negative | Equivalence Partitioning | High | BLOCKED |

---

## Notes & Risks

- **Môi trường kết nối di động**: Đảm bảo thiết bị di động thật và máy chủ backend chạy trên PC đang kết nối chung một mạng Wi-Fi (cùng subnet) để kiểm tra các test case mạng LAN.
- **Tính năng chặn kí tự**: Bàn phím ảo loại numeric/phone-pad chặn việc nhập chữ, nhưng việc sao chép/dán (paste) từ clipboard vẫn có thể đưa kí tự lạ vào, cần kiểm thử kĩ case này.
- **Keyboard Viewport**: Kiểm thử trên cả iOS và Android do cơ chế xử lý Viewport khi bàn phím mở trên 2 nền tảng khác nhau.
