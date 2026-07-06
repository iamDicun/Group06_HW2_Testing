# Test Run — Sprint 1 (Mobile App Profile)

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-PROFILE-MOBILE-001 | Profile | Khoa | FAILED | BUG-PROFILE-MOBILE-001 | Báo lỗi "Số điện thoại không hợp lệ" khi đăng nhập dù nhập đúng 10 chữ số |
| TC-PROFILE-MOBILE-002 | Profile | Khoa | FAILED | BUG-PROFILE-MOBILE-001 | Báo lỗi "Số điện thoại không hợp lệ" khi đăng nhập dù nhập đúng 11 chữ số |
| TC-PROFILE-MOBILE-003 | Profile | Khoa | PASSED | | Báo lỗi chính xác khi nhập 9 chữ số |
| TC-PROFILE-MOBILE-004 | Profile | Khoa | PASSED | | Chặn nhập vượt quá 11 chữ số tại ô input |
| TC-PROFILE-MOBILE-005 | Profile | Khoa | FAILED | BUG-PROFILE-MOBILE-002 | Cập nhật thành công số điện thoại bắt đầu bằng số 1 (khác 0) |
| TC-PROFILE-MOBILE-006 | Profile | Khoa | PASSED | | Hệ thống lọc chữ cái hoặc báo lỗi khi dán chữ từ clipboard |
| TC-PROFILE-MOBILE-007 | Profile | Khoa | PASSED | | Báo lỗi chính xác khi để trống Số điện thoại |
| TC-PROFILE-MOBILE-008 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Họ Tên rỗng |
| TC-PROFILE-MOBILE-009 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Họ Tên 255 ký tự |
| TC-PROFILE-MOBILE-010 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Họ Tên 256 ký tự |
| TC-PROFILE-MOBILE-011 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử XSS Họ Tên |
| TC-PROFILE-MOBILE-012 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Địa chỉ rỗng |
| TC-PROFILE-MOBILE-013 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Địa chỉ 500 ký tự |
| TC-PROFILE-MOBILE-014 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử Cập nhật Địa chỉ 501 ký tự |
| TC-PROFILE-MOBILE-015 | Profile | Khoa | BLOCKED | BUG-PROFILE-MOBILE-001 | Bị chặn từ màn hình đăng nhập nên không thể kiểm thử XSS Địa chỉ |

## Result Legend
- **PASSED** — Test executed successfully, matches expected result
- **FAILED** — Test executed but did not match expected result
- **BLOCKED** — Cannot execute due to external issue (e.g., environment, dependency)
- **Not Run** — Not yet executed

## Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | 15 |
| Passed | 4 |
| Failed | 3 |
| Blocked | 8 |
| Not Run | 0 |
| Bugs Found | 2 |
