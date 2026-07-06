# Test Run — FR-12 Access Control — Sprint 1

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-ACCESS-001 | AccessControl | Khoa | PASSED | | Truy cập API Admin với token admin hợp lệ |
| TC-ACCESS-002 | AccessControl | Khoa | PASSED | | Cập nhật sản phẩm với token admin hợp lệ |
| TC-ACCESS-003 | AccessControl | Khoa | FAILED | BUG-ACCESS-001 | Cho phép token user thường truy cập Admin Dashboard |
| TC-ACCESS-004 | AccessControl | Khoa | FAILED | BUG-ACCESS-001 | Cho phép token user thường tạo danh mục mới |
| TC-ACCESS-005 | AccessControl | Khoa | PASSED | | Chặn truy cập khi token hết hạn / sai chữ ký |
| TC-ACCESS-006 | AccessControl | Khoa | FAILED | BUG-ACCESS-002 | Cho phép xóa sản phẩm mà không gửi kèm Token |
| TC-ACCESS-007 | AccessControl | Khoa | PASSED | | Xem danh sách sản phẩm (API công khai) không cần Token |
| TC-ACCESS-008 | AccessControl | Khoa | PASSED | | Xem danh sách danh mục (API công khai) không cần Token |

## Result Legend
- **PASSED** — Test executed successfully, matches expected result
- **FAILED** — Test executed but did not match expected result
- **BLOCKED** — Cannot execute due to external issue (e.g., environment, dependency)
- **Not Run** — Not yet executed

## Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | 8 |
| Passed | 5 |
| Failed | 3 |
| Blocked | 0 |
| Not Run | 0 |
| Bugs Found | 2 |
