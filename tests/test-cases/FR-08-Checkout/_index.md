# Test Cases Index — Checkout Management (FR-08)

Date: 2026-07-06
Spec Version: v1.0
Created by: Khoa (Group 06)
Standard: ISTQB Foundation Level
Technique: State Transition Testing

---

## Summary

| Item | Value |
|------|-------|
| Scope | API Checkout State Transition Testing |
| Total Test Cases | 10 |
| Positive | 4 |
| Negative | 6 |
| Boundary | 2 |
| Related Requirements | FR-08 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-CHECKOUT-001 | Thanh toán thành công khi đã đăng nhập (Happy Path) | Positive | State Transition | High | Not Run |
| TC-CHECKOUT-002 | Thanh toán thành công sau khi chuyển hướng đăng nhập | Positive | State Transition | High | Not Run |
| TC-CHECKOUT-003 | Hủy thanh toán tại trang Đăng nhập quay về giỏ hàng | Negative | State Transition | Medium | Not Run |
| TC-CHECKOUT-004 | Hủy thanh toán tại trang Checkout Summary quay về giỏ hàng | Positive | State Transition | Medium | Not Run |
| TC-CHECKOUT-005 | Thanh toán thất bại do địa chỉ giao hàng rỗng | Negative | State Transition | High | Not Run |
| TC-CHECKOUT-006 | Thanh toán thất bại do Token xác thực hết hạn đột ngột | Negative | State Transition | High | Not Run |
| TC-CHECKOUT-007 | Thanh toán thất bại do giỏ hàng rỗng | Negative | State Transition | High | Not Run |
| TC-CHECKOUT-008 | Backend tự động tính toán lại tổng tiền từ DB giỏ hàng | Positive | State Transition | High | Not Run |
| TC-CHECKOUT-009 | Giỏ hàng của người dùng được xóa sạch sau khi checkout thành công | Positive | State Transition | High | Not Run |
| TC-CHECKOUT-010 | Ngăn chặn tạo đơn hàng trùng lặp khi bấm Đặt hàng liên tục | Negative | State Transition | High | Not Run |

---

## Notes & Risks

- **Đồng bộ hóa Trạng thái**: Sau khi checkout thành công, giỏ hàng của người dùng trên RAM/DB phải được xóa hoàn toàn.
- **Tính toán lại giá ở Backend**: Backend bắt buộc phải tự tính lại tổng giá trị đơn hàng từ danh sách sản phẩm trong giỏ hàng lưu ở DB, tuyệt đối không tin cậy trường `total_amount` được gửi từ Client để tránh các vụ tấn công giả mạo giá tiền.
- **Race Condition**: Đơn hàng không được phép tạo trùng lặp nếu người dùng nhấp đúp (double click) vào nút Đặt hàng.
