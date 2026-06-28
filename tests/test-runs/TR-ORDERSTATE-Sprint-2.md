# Test Run — Sprint 2

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-ORDERSTATE-001 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-002 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-003 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-001 | API trả về 404 thay vì 400 |
| TC-ORDERSTATE-004 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-001 | API trả về 404 thay vì 400 |
| TC-ORDERSTATE-005 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-001 | API trả về 404 thay vì 400 |
| TC-ORDERSTATE-006 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-007 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-008 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-009 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-010 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-011 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-012 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-013 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-014 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-015 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-016 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-017 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-018 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-019 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-020 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-021 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-022 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-023 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-002 | Cho phép hủy đơn hàng ở trạng thái shipping |
| TC-ORDERSTATE-024 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-003 | Trả về 404 thay vì 403 hoặc 400 |
| TC-ORDERSTATE-025 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-004 | Admin không hủy được đơn của người khác bằng API cancel của user (trả về 404) |
| TC-ORDERSTATE-026 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-004 | Admin không hủy được đơn của người khác bằng API cancel của user (trả về 404) |
| TC-ORDERSTATE-027 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-004 | Admin không hủy được đơn của người khác bằng API cancel của user (trả về 404) |
| TC-ORDERSTATE-028 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-029 | OrderState | Khoa | PASSED | | |
| TC-ORDERSTATE-030 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-005 | Trả về 403 thay vì 401 |
| TC-ORDERSTATE-031 | OrderState | Khoa | FAILED | BUG-ORDERSTATE-006 | Privilege Escalation: User thường đổi được status đơn hàng qua API admin |

## Result Legend
- **PASSED** — Test executed successfully, matches expected result
- **FAILED** — Test executed but did not match expected result
- **BLOCKED** — Cannot execute due to external issue (e.g., environment, dependency)
- **Not Run** — Not yet executed

## Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | 31 |
| Passed | 21 |
| Failed | 10 |
| Blocked | 0 |
| Not Run | 0 |
| Bugs Found | 6 |
