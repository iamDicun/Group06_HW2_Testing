# Test Run — FR-08 Checkout — Sprint 1

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|-------------|--------|--------|--------|-------------|------|
| TC-CHECKOUT-001 | Checkout | Khoa | FAILED | BUG-CHECKOUT-001 | Đặt hàng thành công nhưng không dọn sạch giỏ hàng |
| TC-CHECKOUT-002 | Checkout | Khoa | FAILED | BUG-CHECKOUT-001 | Checkout thành công sau login nhưng không dọn sạch giỏ hàng |
| TC-CHECKOUT-003 | Checkout | Khoa | PASSED | | Giỏ hàng được giữ nguyên khi hủy đăng nhập |
| TC-CHECKOUT-004 | Checkout | Khoa | PASSED | | Giỏ hàng được giữ nguyên khi hủy checkout ở bước tóm tắt |
| TC-CHECKOUT-005 | Checkout | Khoa | FAILED | BUG-CHECKOUT-002 | Cho phép checkout thành công với địa chỉ rỗng |
| TC-CHECKOUT-006 | Checkout | Khoa | PASSED | | Bị chặn truy cập chính xác khi token hết hạn |
| TC-CHECKOUT-007 | Checkout | Khoa | FAILED | BUG-CHECKOUT-004 | Cho phép đặt hàng khi giỏ hàng trống |
| TC-CHECKOUT-008 | Checkout | Khoa | FAILED | BUG-CHECKOUT-003 | Chấp nhận số tiền total_amount giả mạo từ client |
| TC-CHECKOUT-009 | Checkout | Khoa | FAILED | BUG-CHECKOUT-001 | Không dọn giỏ hàng sau khi checkout thành công |
| TC-CHECKOUT-010 | Checkout | Khoa | FAILED | BUG-CHECKOUT-005 | Bấm đặt hàng nhanh liên tiếp sinh ra 2 đơn hàng trùng lặp |

## Result Legend
- **PASSED** — Test executed successfully, matches expected result
- **FAILED** — Test executed but did not match expected result
- **BLOCKED** — Cannot execute due to external issue (e.g., environment, dependency)
- **Not Run** — Not yet executed

## Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | 10 |
| Passed | 3 |
| Failed | 7 |
| Blocked | 0 |
| Not Run | 0 |
| Bugs Found | 5 |
