# FR-15 Quản Lý Sản Phẩm - Báo Cáo Boundary Value Analysis

**Chức năng:** Product Management CRUD  
**Kỹ thuật:** Boundary Value Analysis

---

## Biến Biên

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| Product name | Tối đa 255 ký tự | 0, 255, 256 ký tự | 0 pass reject; 255 pass accept; 256 fail vì vẫn accepted |
| Price | Phải `> 0` | -1, 0, 1, non-numeric | -1 fail; 0 fail; 1 pass; non-numeric bị UI chặn |

## BVA Test Cases

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-PROD_MGMT-004 | name empty | Reject | Pass | |
| TC-PROD_MGMT-005 | name 255 | Accept | Pass | |
| TC-PROD_MGMT-006 | name 256 | Reject | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-007 | price 0 | Reject | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-008 | price 1 | Accept | Pass | |
| TC-PROD_MGMT-017 | price -1 | Reject | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-018 | non-numeric price | Reject | Pass | |

## Kết Luận

BVA xác nhận lỗi validate name và price: name vượt 255 ký tự, price 0 và price âm vẫn được chấp nhận qua Admin UI.
