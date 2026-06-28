# Test Cases Index — Mobile App Profile (FR-04 Mobile)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | Mobile App Profile Management (FR-04 Mobile) |
| Total Test Cases | 20 |
| Positive | 8 |
| Negative | 12 |
| Boundary | 5 |
| Related Requirements | FR-04 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-MOBILE-001 | Kích hoạt bàn phím số khi nhập Số điện thoại | UX | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-002 | Ngăn chặn cấu hình bàn phím chữ mặc định cho Số điện thoại | UX | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-003 | Cập nhật hồ sơ với Số điện thoại hợp lệ 10 chữ số | Positive | Boundary Value Analysis | High | Not Run |
| TC-MOBILE-004 | Cập nhật hồ sơ với Số điện thoại hợp lệ 11 chữ số | Positive | Boundary Value Analysis | High | Not Run |
| TC-MOBILE-005 | Cập nhật hồ sơ với Số điện thoại quá ngắn 9 chữ số | Negative | Boundary Value Analysis | High | Not Run |
| TC-MOBILE-006 | Chặn nhập số điện thoại vượt quá 11 chữ số ở Client | Negative | Boundary Value Analysis | High | Not Run |
| TC-MOBILE-007 | Cập nhật hồ sơ với Số điện thoại không bắt đầu bằng số 0 | Negative | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-008 | Validate Số điện thoại chứa ký tự chữ cái khi paste từ clipboard | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-009 | Cập nhật hồ sơ với Số điện thoại để trống | Negative | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-010 | Nhập địa chỉ nhiều dòng (multiline) và cuộn xem địa chỉ dài | UX | Equivalence Partitioning | Low | Not Run |
| TC-MOBILE-011 | Kết nối API Backend thành công qua dải mạng LAN cùng subnet | Positive | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-012 | Kết nối API Backend thành công qua URL Tunnel Ngrok | Positive | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-013 | Kết nối API thất bại khi cấu hình Localhost IP trên thiết bị thật | Negative | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-014 | Kết nối API gặp lỗi timeout khi cấu hình IP khác dải mạng LAN | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-015 | Lỗi kết nối API khi cấu hình thiếu giao thức (http://) hoặc thiếu Port | Negative | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-016 | Cập nhật hồ sơ thành công khi kết nối mạng trực tuyến ổn định | Positive | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-017 | Chặn gửi request và cảnh báo khi thiết bị ngắt kết nối mạng (Offline) | Negative | Equivalence Partitioning | High | Not Run |
| TC-MOBILE-018 | Hủy request và báo lỗi khi phản hồi từ server trễ vượt quá biên 10 giây | Negative | Boundary Value Analysis | Medium | Not Run |
| TC-MOBILE-019 | Tự động co giãn màn hình (KeyboardAvoidingView) khi mở bàn phím ảo | UX | Equivalence Partitioning | Medium | Not Run |
| TC-MOBILE-020 | Ngăn chặn bàn phím ảo che khuất các ô nhập liệu và nút Lưu | UX | Equivalence Partitioning | Medium | Not Run |

---

## Notes & Risks

- **Môi trường kết nối di động**: Đảm bảo thiết bị di động thật và máy chủ backend chạy trên PC đang kết nối chung một mạng Wi-Fi (cùng subnet) để kiểm tra các test case mạng LAN.
- **Tính năng chặn kí tự**: Bàn phím ảo loại numeric/phone-pad chặn việc nhập chữ, nhưng việc sao chép/dán (paste) từ clipboard vẫn có thể đưa kí tự lạ vào, cần kiểm thử kĩ case này.
- **Keyboard Viewport**: Kiểm thử trên cả iOS và Android do cơ chế xử lý Viewport khi bàn phím mở trên 2 nền tảng khác nhau.
