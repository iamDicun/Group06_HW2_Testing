# Skill: State Transition Testing — FR-07 Cart

## Description
Hướng dẫn chi tiết để một Agent khác có thể thiết kế và thực thi kiểm thử State Transition Testing cho chức năng **FR-07: Giỏ Hàng (Cart)**.

## Mục tiêu
Bao phủ tất cả các chuyển đổi hợp lệ giữa các trạng thái của giỏ hàng dưới tác động của các sự kiện người dùng, đảm bảo hệ thống xử lý đúng hành vi ở mỗi trạng thái.

---

## 1. Phân tích Trạng thái & Sự kiện

### 1.1. Xác định trạng thái (States)

Quan sát ứng dụng để xác định các trạng thái có thể có của giỏ hàng:

| Ký hiệu | Trạng thái | Mô tả | Dấu hiệu nhận biết |
|---------|-----------|-------|-------------------|
| **S1** | Cart rỗng | Không có sản phẩm nào | Hiển thị thông báo "Không có sản phẩm nào trong giỏ hàng" |
| **S2** | Cart có sản phẩm | Có ít nhất 1 sản phẩm | Hiển thị danh sách sản phẩm kèm số lượng |

### 1.2. Xác định sự kiện (Events)

| Ký hiệu | Sự kiện | Mô tả | Hành động trên UI |
|---------|---------|-------|-------------------|
| **E1** | Add to cart | Thêm sản phẩm | Click "Mua ngay" trên Home |
| **E2** | Delete confirm | Xoá SP + xác nhận | Click icon thùng rác → "Có" |
| **E3** | Delete cancel | Xoá SP + huỷ | Click icon thùng rác → "Huỷ" |
| **E4** | Click "+" | Tăng số lượng | Click nút "+" trên cart |
| **E5** | Click "−" | Giảm số lượng | Click nút "−" trên cart |
| **E6** | Continue shopping | Quay lại mua sắm | Click "← Mua tiếp" |

---

## 2. Xây dựng Ma trận Chuyển Trạng Thái

### 2.1. Vẽ sơ đồ chuyển trạng thái

```
                    E1 (add first item)
                    ┌──────────┐
                    ▼          │
                  ┌────┐       │
           ┌──────│ S1 │───────┘
           │      └────┘
           │        │
           │        │ E1 (add another)
           │        ▼
           │      ┌────┐  E2 (delete, still items) ──┐
           │      │    │◄─────────────────────────────┤
           └──────│ S2 │  E3 (delete cancel) ─────────┤
                  │    │◄─────────────────────────────┤
                  └────┘  E4 (click "+") ─────────────┤
                    │     E5 (click "−") ─────────────┤
                    │     E6 (continue shopping) ─────┘
                    │
                    │ E2 (delete last item)
                    └──────────► S1
```

### 2.2. Ma trận chuyển tiếp (Transition Matrix)

| Trạng thái hiện tại | E1 | E2 | E3 | E4 | E5 | E6 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **S1** | **S2** | — | — | — | — | — |
| **S2** | S2 | **S1** / S2 | S2 | S2 | S2 | S2 |

> Lưu ý: E2 từ S2 có thể dẫn đến **S1** (nếu xoá SP cuối) hoặc **S2** (nếu còn SP). Cần 2 test case riêng cho 2 trường hợp này.

---

## 3. Xác định Test Cases từ Ma trận

Duyệt từng ô trong ma trận có chuyển tiếp hợp lệ:

| # | Từ | Sự kiện | Đến | Mô tả | TC ID |
|---|-----|---------|-----|-------|-------|
| 1 | S1 | E1 | S2 | Thêm SP đầu tiên — rỗng → có SP | TC-CART-12 |
| 2 | S1 | — | S1 | Ở lại S1 — kiểm tra giỏ rỗng | TC-CART-13 |
| 3 | S2 | E1 | S2 | Thêm SP trùng — merge số lượng | TC-CART-14 |
| 4 | S2 | E2 | S2 | Xoá SP (còn SP) — confirm "Có" | TC-CART-15 |
| 5 | S2 | E2 | S1 | Xoá SP cuối — có SP → rỗng | TC-CART-16 |
| 6 | S2 | E3 | S2 | Xoá SP — huỷ "Huỷ" | TC-CART-17 |
| 7 | S2 | E4 | S2 | Tăng số lượng bằng "+" | TC-CART-18 |
| 8 | S2 | E5 | S2 | Giảm số lượng bằng "−" | TC-CART-19 |
| 9 | S2 | E6 | S2 | Tiếp tục mua sắm | TC-CART-20 |

> **Giải thích TC-CART-13:** Dù không có sự kiện nào thay đổi trạng thái, vẫn cần test S1 khi người dùng vào giỏ hàng rỗng để verify empty state và các chức năng phụ trợ (logout, redirect).

---

## 4. Viết Test Case Template

Mỗi test case phải theo template sau:

```markdown
# TC-CART-{XX}: {Mô tả ngắn} (ST-{YY})

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / State Transition Testing

## Priority
{High / Medium}

## Preconditions
- User is logged in with a valid account
- Cart is in state {S1 / S2}

## Test Data
- {dữ liệu sản phẩm}

## State Transition
{Trạng thái gốc} → [{sự kiện}] → {trạng thái đích}

## Test Steps
1. {step}
2. {step}

## Expected Result
- {expected outcome}
- System transitions from {gốc} to {đích}

## Actual Result (filled after execution)
- {actual outcome}

## Status
{Passed / Failed}

## Related Bugs
- {BUG-XX}

## Notes
- {ghi chú}
```

### 4.1. Lưu ý quan trọng
- **State Transition** field là duy nhất cho ST testing — ghi rõ ví dụ: `S1 (empty) → [Add product] → E1 (add to cart) → S2 (has items)`
- Precondition phải nói rõ trạng thái hiện tại (S1/S2)
- Expected Result phải bao gồm cả kết quả chức năng và xác nhận chuyển trạng thái

---

## 5. Ví dụ Cụ Thể

### Example 1: TC-CART-12 — S1 → S2 (E1: add first item)

**State Transition:** `S1 (empty) → [Add product] → E1 (add to cart) → S2 (has items)`

**Preconditions:**
- Logged in, cart is S1 (empty), on Home page

**Steps:**
1. Click "Mua ngay" on AirPods Pro
2. Observe toast
3. Click cart icon
4. Verify cart page

**Expected:**
- Toast "Đã thêm AirPods Pro vào giỏ hàng!"
- Badge = 1
- Cart shows AirPods Pro, qty=1, price=5.490.000₫
- S1 → S2

### Example 2: TC-CART-13 — S1 → S1 (stay in empty)

**State Transition:** `S1 (empty) → [Do nothing] → S1 (stay in empty)`

**Preconditions:**
- Logged in, cart is S1 (empty)

**Steps:**
1. Click cart icon
2. Observe empty state
3. Click logout
4. Confirm logout
5. Try /cart while logged out

**Expected:**
- "Không có sản phẩm nào trong giỏ hàng" + illustration
- Logout dialog → redirect to /login
- /cart → redirect to /login
- S1 → S1

---

## 6. Thực Thi

### 6.1. Chuẩn bị
1. Đăng nhập tài khoản `test01@gmail.com` / `Pass 1234`
2. Sử dụng **Microsoft Edge** browser tại http://localhost:5173

### 6.2. Setup trạng thái
- **S1 (rỗng):** Xoá hết SP trong cart (dùng UI hoặc API)
- **S2 (có SP):** Thêm iPhone và/hoặc AirPods qua "Mua ngay"

### 6.3. Chạy tuần tự
- Các test case ST có thể ảnh hưởng lẫn nhau (vd: TC-CART-16 xoá SP cuối làm S2 → S1)
- Chạy từng TC và reset trạng thái về đúng precondition trước mỗi TC

### 6.4. Ghi nhận kết quả
- Điền `Actual Result` sau khi chạy
- Ghi `Status`: Passed / Failed
- Ghi `Related Bugs` nếu có

---

## 7. Kiểm Tra Chéo (Checklist)

Sau khi viết xong 9 TC, kiểm tra:
- [ ] Tất cả chuyển tiếp hợp lệ trong ma trận đều có TC
- [ ] Cả 2 nhánh của E2 (xoá → S1 và xoá → S2) đều được test
- [ ] Mỗi TC đều có `State Transition` field
- [ ] Precondition ghi rõ trạng thái (S1/S2)
- [ ] Expected Result xác nhận chuyển trạng thái
- [ ] Browser được ghi là **Microsoft Edge**
- [ ] Module / Test Type / Technique ghi đúng "State Transition Testing"
- [ ] File được đặt trong thư mục `State-Transition-Testing/`
- [ ] ID file đúng format `TC-CART-{12..20}.md`

---

## 8. Template TC để Copy

```markdown
# TC-CART-{XX}: {Title} (ST-{YY})

## Requirement ID
FR-07

## Feature
Cart

## Module / Test Type / Technique
Cart / Functional / State Transition Testing

## Priority
{High/Medium}

## Preconditions
- User is logged in with a valid account
- Cart is in state {S1/S2}
- {specific precondition}

## Test Data
- {data}

## State Transition
{From} → [{Event}] → {To}

## Test Steps
1. {step}
2. {step}

## Expected Result
- {expected}
- System transitions from {From} to {To}

## Actual Result (filled after execution)
- {actual}

## Status
{Passed/Failed}

## Related Bugs
- {BUG-XX}

## Notes
- {notes}
```
