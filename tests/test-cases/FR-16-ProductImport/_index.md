# Test Cases Index — Product Import (FR-16)

Date: 2026-07-06
Spec Version: v1.0
Created by: Khoa (Group 06)
Standard: ISTQB Foundation Level
Technique: Use Case Testing

---

## Summary

| Item | Value |
|------|-------|
| Scope | API CSV Product Import Use Case Testing |
| Total Test Cases | 8 |
| Positive | 2 |
| Negative | 6 |
| Boundary | 1 |
| Related Requirements | FR-16 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-IMPORT-001 | Import sản phẩm thành công với file CSV hợp lệ (Happy Path) | Positive | Use Case | High | Not Run |
| TC-IMPORT-002 | Import thất bại do định dạng file không phải CSV | Negative | Use Case | High | Not Run |
| TC-IMPORT-003 | Import thất bại do sai cấu trúc header file CSV | Negative | Use Case | Medium | Not Run |
| TC-IMPORT-004 | Hủy bỏ (Rollback) toàn bộ khi có dòng dữ liệu thiếu tên sản phẩm | Negative | Use Case | High | Not Run |
| TC-IMPORT-005 | Hủy bỏ (Rollback) toàn bộ khi có dòng dữ liệu có giá bằng hoặc nhỏ hơn 0 | Negative | Use Case | High | Not Run |
| TC-IMPORT-006 | Chặn import khi không có quyền Admin | Negative | Use Case | High | Not Run |
| TC-IMPORT-007 | Phân tích thành công mô tả chứa dấu phẩy bọc trong nháy kép | Positive | Use Case | Medium | Not Run |
| TC-IMPORT-008 | Chặn import khi tải lên file CSV trống | Negative | Use Case | Medium | Not Run |

---

## Notes & Risks

- **Giao dịch Nguyên tử (Atomic Rollback)**: Yêu cầu cốt lõi là cơ chế transaction rollback. Nếu có bất kỳ dòng nào bị lỗi, cơ sở dữ liệu phải được khôi phục về trạng thái trước đó, không được chèn một phần.
- **Bảo mật và phân quyền**: API import chỉ chấp nhận request từ tài khoản Admin có token JWT hợp lệ.
- **Xử lý chuỗi CSV**: Đảm bảo thư viện/logic phân tích cú pháp CSV ở Client hoạt động đúng theo chuẩn RFC 4180 để tránh lệch cột khi chuỗi chứa ký tự đặc biệt (dấu phẩy, dấu xuống dòng).
