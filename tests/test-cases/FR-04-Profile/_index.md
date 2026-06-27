# Test Cases Index — Profile Management (FR-04 & Mobile Profile)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | Web/API & Mobile Profile Management Testing (Domain Testing) |
| Total Test Cases | 29 |
| Positive | 10 |
| Negative | 19 |
| Boundary | 12 |
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
| TC-PROFILE-021 | Kiểm tra cấu hình bàn phím số (phone-pad) cho trường Số điện thoại trên Mobile App | UX | Equivalence Partitioning | Medium | Not Run |
| TC-PROFILE-022 | Kiểm tra chặn nhập quá 11 ký tự số điện thoại tại Client Mobile App | UX | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-023 | Kiểm tra validate Số điện thoại chứa chữ cái khi paste từ clipboard trên Mobile App | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-PROFILE-024 | Kiểm tra TextInput Địa chỉ hỗ trợ nhập nhiều dòng (multiline) trên Mobile App | UX | Equivalence Partitioning | Low | Not Run |
| TC-PROFILE-025 | Kết nối API thành công qua dải mạng LAN cùng subnet hoặc URL Ngrok | Positive | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-026 | Kết nối API thất bại khi dùng Localhost IP trên thiết bị di động thật | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-027 | Cập nhật hồ sơ khi thiết bị ở trạng thái ngoại tuyến (Offline mode) | Negative | Equivalence Partitioning | High | Not Run |
| TC-PROFILE-028 | Xử lý timeout 10 giây khi kết nối mạng chập chờn trên Mobile App | Negative | Boundary Value Analysis | Medium | Not Run |
| TC-PROFILE-029 | Kiểm tra co giãn giao diện (KeyboardAvoidingView) khi mở bàn phím ảo trên Mobile App | UX | Equivalence Partitioning | Medium | Not Run |

---

## Notes & Risks

- **Môi trường kết nối di động**: Đảm bảo thiết bị di động thật và máy chủ backend chạy trên PC đang kết nối chung một mạng Wi-Fi (cùng subnet) để kiểm tra các test case mạng LAN.
- **Tính năng chặn kí tự**: Bàn phím ảo loại numeric/phone-pad chặn việc nhập chữ, nhưng việc sao chép/dán (paste) từ clipboard vẫn có thể đưa kí tự lạ vào, cần kiểm thử kĩ case này.
- **Keyboard Viewport**: Kiểm thử trên cả iOS và Android do cơ chế xử lý Viewport khi bàn phím mở trên 2 nền tảng khác nhau.
