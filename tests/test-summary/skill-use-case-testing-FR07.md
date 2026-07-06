# Skill: Use Case Testing — FR-07 Cart

## Description
Hướng dẫn chi tiết để một Agent khác có thể thiết kế và thực thi kiểm thử Use Case Testing cho chức năng **FR-07: Giỏ Hàng (Cart)**.

## Mục tiêu
Bao phủ các luồng chính (main flow) và luồng thay thế (alternative flow) của chức năng giỏ hàng dựa trên các tương tác điển hình của người dùng.

---

## 1. Phân tích Use Case

### 1.1. Xác định Actor
- **Người dùng đã đăng nhập** (Logged-in User)

### 1.2. Xác định Use Cases
Vẽ sơ đồ use case với các use case sau:

| Mã UC | Tên UC | Mô tả |
|-------|--------|-------|
| UC-01 | Xem giỏ hàng | Người dùng xem danh sách sản phẩm trong giỏ |
| UC-02 | Thêm sản phẩm mới | Người dùng thêm sản phẩm chưa có trong giỏ |
| UC-03 | Thêm sản phẩm trùng | Người dùng thêm sản phẩm đã có — merge số lượng |
| UC-04 | Xoá sản phẩm — xác nhận | Người dùng xoá SP và xác nhận "Có" |
| UC-05 | Xoá sản phẩm — huỷ | Người dùng xoá SP nhưng huỷ "Huỷ" |
| UC-06 | Xoá sản phẩm cuối | Người dùng xoá SP cuối cùng (giỏ về rỗng) |
| UC-07 | Tăng số lượng | Người dùng nhấn "+" để tăng số lượng |
| UC-08 | Giảm số lượng | Người dùng nhấn "−" để giảm số lượng |
| UC-09 | Số lượng tối thiểu = 1 | Người dùng cố gắng giảm SL xuống dưới 1 |
| UC-10 | Tiếp tục mua sắm | Người dùng nhấn nút để quay về trang chủ |
| UC-11 | Giỏ hàng rỗng | Người dùng vào giỏ khi không có sản phẩm |

### 1.3. Phân loại luồng
- **Main Flow:** UC-01, UC-02, UC-04, UC-07, UC-08, UC-10, UC-11
- **Alternative Flow:** UC-03, UC-05, UC-06, UC-09

---

## 2. Viết Test Case Template

Mỗi test case phải theo template sau:

```markdown
# TC-CART-{XX}: {Tiêu đề} (UC-{YY})

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / Use Case Testing

## Priority
{High / Medium}

## Preconditions
{Các điều kiện cần trước khi chạy}

## Test Data
{Dữ liệu đầu vào cụ thể — tên sản phẩm, giá, số lượng}

## Test Steps
{Các bước thao tác tuần tự, đánh số 1. 2. 3. ...}

## Expected Result
{Mô tả chi tiết kết quả mong đợi}

## Actual Result (filled after execution)
{Mô tả chi tiết kết quả thực tế sau khi chạy}

## Status
{Passed / Failed}

## Related Bugs
{Danh sách bug liên quan, nếu có}

## Notes
{Ghi chú bổ sung}
```

### 2.1. Quy tắc đặt ID
- `TC-CART-01` đến `TC-CART-11` cho Use Case Testing
- 01–11 tương ứng UC-01 đến UC-11

### 2.2. Xác định Status
- **Passed:** Tất cả Expected Result khớp với Actual Result
- **Failed:** Có ít nhất 1 điểm khác biệt giữa Expected và Actual

---

## 3. Ví dụ Cụ Thể

### Example 1: UC-01 — Xem giỏ hàng có sản phẩm (Main Flow)

**Preconditions:**
- User logged in, cart có >= 2 sản phẩm (iPhone 16 Pro Max × 2, AirPods Pro × 3)

**Steps:**
1. Click cart icon trên navbar
2. Verify từng dòng sản phẩm
3. Verify tổng tiền
4. Check "Tiến hành thanh toán"

**What to check (Expected):**
- Tên SP, hình ảnh, đơn giá đúng
- Có nút +/- và icon xoá (thùng rác)
- Tổng hiển thị "Tạm tính: X₫" (có ₫)
- Badge trên navbar hiển thị số lượng

### Example 2: UC-03 — Thêm sản phẩm trùng (Alternative Flow)

**Preconditions:**
- Cart có AirPods Pro (qty 1)

**Steps:**
1. Click "Mua ngay" AirPods Pro
2. Vào cart

**What to check (Expected):**
- Quantity AirPods tăng từ 1 → 2 (merge)
- Không có dòng riêng biệt thứ hai

---

## 4. Danh Sách Đầy Đủ 11 Test Case

| TC ID | UC | Scenario | Preconditions | Expected Key Check |
|-------|-----|---------|--------------|-------------------|
| TC-CART-01 | UC-01 | View cart with items | Cart: iPhone × 2, AirPods × 3 | Product rows, +/- buttons, total, badge |
| TC-CART-02 | UC-02 | Add new product | Cart: iPhone × 2, add AirPods | Toast, badge++, both SP in cart |
| TC-CART-03 | UC-03 | Add duplicate product | Cart: AirPods × 1, add AirPods again | Merge: qty=2, no duplicate line |
| TC-CART-04 | UC-04 | Delete with confirm "Có" | Cart: ≥ 2 SP, delete one | Dialog → "Có" → SP removed |
| TC-CART-05 | UC-05 | Delete with cancel "Huỷ" | Cart: ≥ 2 SP, attempt delete | Dialog → "Huỷ" → SP remains |
| TC-CART-06 | UC-06 | Delete last product | Cart: 1 SP (qty 1) | Empty state + illustration |
| TC-CART-07 | UC-07 | Increase qty via "+" | iPhone qty 1 → 3 | qty=3, total = 32.990.000₫ × 3 |
| TC-CART-08 | UC-08 | Decrease qty via "−" | iPhone qty 3 → 1 | qty=1, total = 32.990.000₫ |
| TC-CART-09 | UC-09 | Min qty = 1 | iPhone qty 1, try to go below 1 | Min=1, button disabled or dropdown min=1 |
| TC-CART-10 | UC-10 | Continue shopping | Cart has SP, on /cart | "← Mua tiếp" → /home |
| TC-CART-11 | UC-11 | Empty cart | Cart has 0 SP | "Không có sản phẩm..." + illustration |

---

## 5. Thực Thi

### 5.1. Chuẩn bị
1. Đăng nhập tài khoản `test01@gmail.com` / `Pass 1234`
2. Đảm bảo sản phẩm tồn tại: iPhone 16 Pro Max (32.990.000₫), AirPods Pro (5.490.000₫)
3. Sử dụng **Microsoft Edge** browser tại http://localhost:5173

### 5.2. Setup dữ liệu cho từng TC
- Dùng API hoặc UI để thêm/xoá sản phẩm theo precondition của từng TC
- Có thể dùng thẳng UI: vào Home → "Mua ngay" để thêm SP vào cart

### 5.3. Ghi nhận kết quả
- Điền `Actual Result` sau khi chạy
- So sánh với `Expected Result`
- Ghi `Status`: Passed / Failed
- Nếu Failed, ghi rõ bug vào `Related Bugs`

### 5.4. Các bug thường gặp (tham khảo)
| Bug ID | Mô tả |
|--------|-------|
| BUG-01 | Thiếu nút +/- (dùng dropdown thay thế) |
| BUG-02 | Không có dialog xác nhận khi xoá |
| BUG-03 | Nhãn tổng tiền "Tổng tạm tính" |
| BUG-04 | addToCart không merge sản phẩm trùng |
| BUG-05 | Giỏ rỗng không có hình minh hoạ |
| BUG-06 | Không có badge trên navbar |
| BUG-07 | Nhãn nút "← Mua tiếp" |
| BUG-08 | Cần click 2 lần để vào cart |
| BUG-09 | Thiếu ký hiệu ₫ |
| BUG-10 | Logout "Thoát" |

---

## 6. Kiểm Tra Chéo (Checklist)

Sau khi viết xong 11 TC, kiểm tra:
- [ ] Tất cả 11 Use Case đều có TC tương ứng
- [ ] Mỗi TC đều có `Preconditions`, `Test Steps`, `Expected Result`
- [ ] Mỗi TC đều có `Status` và `Actual Result` sau khi chạy
- [ ] Browser được ghi là **Microsoft Edge**
- [ ] Module / Test Type / Technique ghi đúng "Use Case Testing"
- [ ] File được đặt trong thư mục `Use-Case-Testing/`
- [ ] ID file đúng format `TC-CART-{01..11}.md`

---

## 7. Template TC để Copy

```markdown
# TC-CART-{XX}: {Title} (UC-{YY})

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / Use Case Testing

## Priority
{High/Medium}

## Preconditions
- User is logged in with a valid account
- {specific precondition}

## Test Data
- {data}

## Test Steps
1. {step}
2. {step}

## Expected Result
- {expected}

## Actual Result (filled after execution)
- {actual}

## Status
{Passed/Failed}

## Related Bugs
- {BUG-XX}

## Notes
- {notes}
```
