# Test Run — User Management (FR-19) — Sprint 2

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-USERMGMT-001 | UserMgmt | Khoa | PASSED | | API xóa người dùng thành công khi ID hợp lệ và tồn tại |
| TC-USERMGMT-002 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-001 | Xóa người dùng không tồn tại trả về 200 thay vì 404 |
| TC-USERMGMT-003 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-001 | Xóa người dùng với ID = 0 trả về 200 thay vì 400 |
| TC-USERMGMT-004 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-001 | Xóa người dùng với ID số nguyên âm trả về 200 thay vì 400 |
| TC-USERMGMT-005 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-001 | Xóa người dùng với ID là chữ/chuỗi trả về 200 thay vì 400 |
| TC-USERMGMT-006 | UserMgmt | Khoa | PASSED | | Trả về 401 khi thiếu Authorization Header |
| TC-USERMGMT-007 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-002 | Vẫn nhận dạng token khi dùng tiền tố Token thay vì Bearer |
| TC-USERMGMT-008 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-003 | Trả về 403 thay vì 401 khi token sai chữ ký/hết hạn |
| TC-USERMGMT-009 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-004 | Quyền User thường vẫn gọi được API Admin DELETE để xóa người dùng khác |
| TC-USERMGMT-010 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-004 | Quyền Guest vẫn gọi được API Admin DELETE để xóa người dùng |
| TC-USERMGMT-011 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-004 | Token thiếu trường role vẫn được thực thi API Admin DELETE để xóa |
| TC-USERMGMT-012 | UserMgmt | Khoa | PASSED | | Admin lấy danh sách người dùng thành công |
| TC-USERMGMT-013 | UserMgmt | Khoa | PASSED | | GET danh sách người dùng không token trả về 401 |
| TC-USERMGMT-014 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-002 | GET danh sách với Token định dạng sai vẫn được chấp nhận |
| TC-USERMGMT-015 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-003 | GET danh sách với token invalid trả về 403 thay vì 401 |
| TC-USERMGMT-016 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-004 | User thường vẫn lấy được toàn bộ danh sách người dùng (Privilege Escalation) |
| TC-USERMGMT-017 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-004 | Guest vẫn lấy được toàn bộ danh sách người dùng (Privilege Escalation) |
| TC-USERMGMT-018 | UserMgmt | Khoa | FAILED | BUG-USERMGMT-005 | Admin tự xóa chính mình qua API trả về 200 OK thành công |

## Result Legend
- **PASSED** — Test executed successfully, matches expected result
- **FAILED** — Test executed but did not match expected result
- **BLOCKED** — Cannot execute due to external issue (e.g., environment, dependency)
- **Not Run** — Not yet executed

## Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | 18 |
| Passed | 4 |
| Failed | 14 |
| Blocked | 0 |
| Not Run | 0 |
| Bugs Found | 5 |
