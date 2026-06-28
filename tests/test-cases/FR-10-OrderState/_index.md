# Test Cases Index — Order State Management (FR-10)

Date: 2026-06-27
Spec Version: v1.0
Created by: Antigravity AI
Standard: ISTQB Foundation Level

---

## Summary

| Item | Value |
|------|-------|
| Scope | API Order State Machine & Cancel Request Testing (Domain Testing) |
| Total Test Cases | 31 |
| Positive | 10 |
| Negative | 21 |
| Boundary | 3 |
| Related Requirements | FR-10 |

---

## Test Case List

| TC ID | Short Description | Test Type | Technique | Priority | Status |
|-------|------------------|-----------|-----------|----------|--------|
| TC-ORDERSTATE-001 | Kiểm tra cập nhật trạng thái đơn hàng khi ID hợp lệ và tồn tại trong CSDL | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-002 | Kiểm tra cập nhật trạng thái đơn hàng khi ID là số nguyên dương nhưng không tồn tại trong CSDL | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-003 | Kiểm tra cập nhật trạng thái đơn hàng khi ID bằng 0 | Negative | Boundary Value Analysis | High | FAILED |
| TC-ORDERSTATE-004 | Kiểm tra cập nhật trạng thái đơn hàng khi ID là số nguyên âm | Negative | Boundary Value Analysis | High | FAILED |
| TC-ORDERSTATE-005 | Kiểm tra cập nhật trạng thái đơn hàng khi ID sai kiểu dữ liệu | Negative | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-006 | Kiểm tra cập nhật trạng thái đơn hàng với trạng thái mới không nằm trong enum cho phép | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-007 | Kiểm tra cập nhật trạng thái đơn hàng với trạng thái mới là chuỗi rỗng | Negative | Boundary Value Analysis | High | PASSED |
| TC-ORDERSTATE-008 | Kiểm tra cập nhật trạng thái đơn hàng khi thiếu trường status trong body | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-009 | Kiểm tra cập nhật trạng thái đơn hàng khi status sai kiểu dữ liệu | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-010 | Cập nhật trạng thái đơn hàng thành công từ pending sang confirmed | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-011 | Cập nhật trạng thái đơn hàng thành công từ confirmed sang shipping | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-012 | Cập nhật trạng thái đơn hàng thành công từ shipping sang delivered | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-013 | Cập nhật trạng thái đơn hàng thành công từ pending sang canceled (bởi Admin) | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-014 | Cập nhật trạng thái đơn hàng thành công từ confirmed sang canceled (bởi Admin) | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-015 | Cập nhật trạng thái nhảy bước không hợp lệ từ pending sang shipping | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-016 | Cập nhật trạng thái đi ngược không hợp lệ từ confirmed sang pending | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-017 | Cập nhật trạng thái đi ngược không hợp lệ từ shipping sang confirmed | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-018 | Cập nhật trạng thái từ trạng thái kết thúc delivered sang canceled không hợp lệ | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-019 | Cập nhật trạng thái từ trạng thái kết thúc canceled sang pending không hợp lệ | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-020 | Cập nhật trạng thái từ shipping sang canceled bị chặn bởi Admin | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-021 | Người dùng hủy đơn hàng của chính mình ở trạng thái pending thành công | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-022 | Người dùng hủy đơn hàng của chính mình ở trạng thái confirmed thành công | Positive | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-023 | Người dùng cố gắng hủy đơn hàng của chính mình ở trạng thái shipping | Negative | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-024 | Người dùng cố gắng hủy đơn hàng của người khác | Negative | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-025 | Admin hủy đơn hàng của người khác ở trạng thái pending thành công | Positive | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-026 | Admin hủy đơn hàng của người khác ở trạng thái confirmed thành công | Positive | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-027 | Admin cố gắng hủy đơn hàng của người khác ở trạng thái shipping không thành công | Negative | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-028 | Cập nhật trạng thái đơn hàng khi thiếu Authorization Header | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-029 | Cập nhật trạng thái đơn hàng với Token sai định dạng (thiếu tiền tố Bearer) | Negative | Equivalence Partitioning | High | PASSED |
| TC-ORDERSTATE-030 | Cập nhật trạng thái đơn hàng với Token hết hạn hoặc không hợp lệ | Negative | Equivalence Partitioning | High | FAILED |
| TC-ORDERSTATE-031 | Người dùng thông thường cố gắng truy cập API Admin cập nhật trạng thái đơn hàng | Negative | Equivalence Partitioning | High | FAILED |

---

## Notes & Risks

- **Quy trình chuyển đổi trạng thái**: Hệ thống có sơ đồ chuyển đổi trạng thái nghiêm ngặt, bất kỳ sự sai lệch nào (như bỏ bước hay đi ngược quy trình) cần phải được chặn từ tầng API.
- **Phân quyền và sở hữu**: Admin có quyền hủy đơn của bất kỳ ai (Admin override), nhưng User chỉ được quyền hủy đơn hàng của chính mình (ownership check) và cả hai đều không thể hủy khi trạng thái đã là `shipping`.
- **Ràng buộc an toàn**: Các trường hợp input không hợp lệ (sai type, rỗng, âm) cần trả về lỗi 400 Bad Request thích hợp để tránh lỗi dữ liệu hoặc crash hệ thống.
