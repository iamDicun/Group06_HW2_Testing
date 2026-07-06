# Test Run — FR-16 Product Import — Sprint 1

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-IMPORT-001 | ProductImport | Khoa | PASSED | | Tải lên file CSV hợp lệ thành công |
| TC-IMPORT-002 | ProductImport | Khoa | PASSED | | Client chặn tải lên file .xlsx thành công |
| TC-IMPORT-003 | ProductImport | Khoa | FAILED | BUG-IMPORT-001 | Báo thành công 0/1 sản phẩm thay vì báo lỗi cấu trúc file |
| TC-IMPORT-004 | ProductImport | Khoa | FAILED | BUG-IMPORT-001 | Thiếu tính nguyên tử, sản phẩm hợp lệ vẫn được thêm dù có hàng lỗi |
| TC-IMPORT-005 | ProductImport | Khoa | FAILED | BUG-IMPORT-002 | Chấp nhận import sản phẩm có giá trị âm hoặc bằng 0 |
| TC-IMPORT-006 | ProductImport | Khoa | PASSED | | Chặn request import từ user thường thành công |
| TC-IMPORT-007 | ProductImport | Khoa | PASSED | | Phân tích đúng mô tả chứa dấu phẩy bọc trong nháy kép |
| TC-IMPORT-008 | ProductImport | Khoa | PASSED | | Chặn đúng file CSV trống |

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
