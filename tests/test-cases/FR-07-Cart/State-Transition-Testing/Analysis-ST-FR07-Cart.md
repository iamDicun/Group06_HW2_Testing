# Test Case Design Analysis – State Transition: Giỏ hàng (FR-07)

## 1. Sản phẩm trong hệ thống

| ID | Tên sản phẩm | Đơn giá |
|----|-------------|---------|
| 1 | iPhone 15 Pro Max | 30,000,000₫ |
| 2 | Samsung Galaxy S24 Ultra | 28,000,000₫ |
| 3 | MacBook Pro M3 | 45,000,000₫ |
| 4 | Tai nghe AirPods Pro 2 | 6,000,000₫ |
| 5 | Bàn phím cơ Keychron Q1 | 4,000,000₫ |

## 2. Xác định trạng thái (States)

| ID | Trạng thái | Mô tả |
|----|-----------|-------|
| **S1** | Cart_Empty | Giỏ hàng trống, không có sản phẩm nào |
| **S2** | Cart_HasItems | Giỏ hàng có từ 1 sản phẩm trở lên, hiển thị danh sách |

## 3. Xác định sự kiện (Events)

| ID | Sự kiện | Mô tả |
|----|---------|-------|
| **E1** | AddItem | Người dùng thêm sản phẩm vào giỏ (từ Home hoặc ProductDetail) |
| **E2** | DeleteConfirm | Người dùng click Xóa → xác nhận trong dialog → sản phẩm bị xóa |
| **E3** | DeleteCancel | Người dùng click Xóa → hủy trong dialog → không thay đổi |
| **E4** | ClickPlus | Người dùng click nút + để tăng số lượng |
| **E5** | ClickMinus | Người dùng click nút - để giảm số lượng (≥ 2) |
| **E6** | ContinueShopping | Người dùng click "Tiếp tục mua sắm" để về trang chủ |

**Ghi chú:** Mỗi TC sau khi thực hiện event đều kết thúc bằng bước **xem giỏ hàng (ViewCart)** để xác nhận trạng thái mới.

## 4. State Transition Diagram

```
                    E1(AddItem)            E2(DeleteConfirm) [còn SP]
              ┌──────────┐               ┌──────────┐
              │          ▼               │          ▼
              │    ┌──────────────────────────────────────┐
              │    │                                      │
              │    │            S2: HasItems              │
              │    │                                      │
              │    └──────────────────────────────────────┘
              │     │  │  │  │  │         │
              │     │  │  │  │  │         │ E2(DeleteConfirm) [hết SP]
              │     │  │  │  │  │         ▼
              │     │  │  │  │  │    ┌──────────┐
              │     │  │  │  │  │    │ S1: Empty│
              │     │  │  │  │  │    └──────────┘
              │     │  │  │  │  │         │
              │     │  │  │  │  │         └── E1(AddItem) ──► S2
              │     │  │  │  │  │
              │     │  │  │  │  └── E6(ContinueShopping) ──► S2
              │     │  │  │  │
              │     │  │  │  └───── E5(ClickMinus) ──► S2 (SL ≥ 2)
              │     │  │  │
              │     │  │  └──────── E4(ClickPlus) ──► S2
              │     │  │
              │     │  └─────────── E3(DeleteCancel) ──► S2
              │     │
              │     └────────────── E2(DeleteConfirm) ──► S1
              │
              └──────────────────── E1(AddItem) ── khi thêm SP đầu tiên
                                     (S1 → S2)
```

## 5. State Transition Table

| Mã TC | State cũ | Event | State mới | Cách verify | Mô tả |
|-------|----------|-------|-----------|-------------|-------|
| TC-ST-FR07-01 | S1 | E1 | S2 | Vào Cart → thấy SP | Thêm SP đầu tiên |
| TC-ST-FR07-02 | S1 | – | S1 | Vào Cart → thấy empty | Giỏ trống (không event) |
| TC-ST-FR07-03 | S2 | E1 | S2 | Vào Cart → thấy SL tăng | Thêm SP khi đã có |
| TC-ST-FR07-04 | S2 | E2→còn SP | S2 | Vào Cart → SP biến mất | Xóa SP, còn SP khác |
| TC-ST-FR07-05 | S2 | E2→hết SP | S1 | Vào Cart → thấy empty | Xóa SP cuối |
| TC-ST-FR07-06 | S2 | E3 | S2 | Vào Cart → SP vẫn còn | Hủy xóa |
| TC-ST-FR07-07 | S2 | E4 | S2 | Vào Cart → SL tăng | Tăng SL |
| TC-ST-FR07-08 | S2 | E5 | S2 | Vào Cart → SL giảm | Giảm SL |
| TC-ST-FR07-09 | S2 | E6 | S2 | Vào Cart → SP vẫn còn | Tiếp tục mua sắm |

## 6. Chi tiết Test Case

### TC-ST-FR07-01: S1 --E1--> S2
- **Mô tả:** Giỏ trống → Thêm AirPods Pro 2 → Vào Cart xác nhận
- **Steps:**
  1. Đăng nhập, giỏ trống
  2. Vào chi tiết AirPods Pro 2, click **Thêm vào giỏ hàng** (có thể cần 2 click)
  3. Vào trang Giỏ hàng để verify
- **Kết quả mong đợi:** S1→S2. Cart hiển thị AirPods Pro 2, SL 1, thành tiền 6,000,000₫
- **Kết quả thực tế:** PASS. Cart hiển thị AirPods Pro 2, SL 1, thành tiền 6,000,000

### TC-ST-FR07-02: S1 (no event) → S1
- **Mô tả:** Giỏ trống → Vào Cart xác nhận giỏ trống
- **Steps:**
  1. Đăng nhập, giỏ trống
  2. Vào trang Giỏ hàng
- **Kết quả mong đợi:** S1. Empty state: hình minh họa + thông báo + link mua tiếp
- **Kết quả thực tế:** FAIL. Không có hình minh họa. Chỉ text "Giỏ hàng của bạn đang trống" + link text

### TC-ST-FR07-03: S2 --E1--> S2
- **Mô tả:** Giỏ có Samsung S24 Ultra → Thêm cùng SP → Vào Cart xác nhận SL tăng
- **Steps:**
  1. Đăng nhập, thêm Samsung S24 Ultra vào giỏ (SL 1)
  2. Vào chi tiết Samsung S24 Ultra, click **Thêm vào giỏ hàng**
  3. Vào trang Giỏ hàng để verify
- **Kết quả mong đợi:** S2→S2. 1 dòng duy nhất, SL 2, thành tiền 56,000,000₫
- **Kết quả thực tế:** FAIL. Hiển thị 2 dòng riêng (merge không hoạt động)

### TC-ST-FR07-04: S2 --E2(còn SP)--> S2
- **Mô tả:** Giỏ có iPhone + MacBook → Xóa iPhone (confirm) → Vào Cart xác nhận còn MacBook
- **Steps:**
  1. Đăng nhập, thêm iPhone và MacBook vào giỏ
  2. Vào Cart, click Xóa iPhone → dialog → Xác nhận
  3. Quan sát Cart để verify
- **Kết quả mong đợi:** S2→S2. iPhone biến mất, còn MacBook, tổng cộng 45,000,000₫
- **Kết quả thực tế:** FAIL. Không có dialog. Xóa ngay. Nhưng S2→S2 đúng.

### TC-ST-FR07-05: S2 --E2(hết SP)--> S1
- **Mô tả:** Giỏ chỉ có Keychron Q1 → Xóa (confirm) → Vào Cart xác nhận empty
- **Steps:**
  1. Đăng nhập, thêm Keychron Q1 vào giỏ
  2. Vào Cart, click Xóa → dialog → Xác nhận
  3. Quan sát Cart để verify
- **Kết quả mong đợi:** S2→S1. Cart về rỗng, có hình minh họa + thông báo
- **Kết quả thực tế:** FAIL. Không dialog. Chuyển S1 đúng nhưng empty state thiếu hình minh họa.

### TC-ST-FR07-06: S2 --E3--> S2
- **Mô tả:** Giỏ có iPhone + MacBook → Xóa iPhone (hủy) → Vào Cart xác nhận giữ nguyên
- **Steps:**
  1. Đăng nhập, thêm iPhone và MacBook vào giỏ
  2. Vào Cart, click Xóa iPhone → dialog → Hủy
  3. Quan sát Cart để verify
- **Kết quả mong đợi:** S2→S2. iPhone vẫn còn, giỏ không đổi
- **Kết quả thực tế:** FAIL. Không có dialog. Không thể thực hiện E3.

### TC-ST-FR07-07: S2 --E4--> S2
- **Mô tả:** Giỏ có AirPods (SL 1) → Click + → Vào Cart xác nhận SL tăng
- **Steps:**
  1. Đăng nhập, thêm AirPods Pro 2 (SL 1) vào giỏ
  2. Vào Cart, click nút **+** hai lần
  3. Quan sát Cart để verify
- **Kết quả mong đợi:** S2→S2. SL 3, thành tiền 18,000,000₫
- **Kết quả thực tế:** FAIL. Không có nút + trong Cart.

### TC-ST-FR07-08: S2 --E5--> S2
- **Mô tả:** Giỏ có AirPods (SL 4) → Click - → Vào Cart xác nhận SL giảm
- **Steps:**
  1. Đăng nhập, thêm AirPods Pro 2 (SL 4) vào giỏ
  2. Vào Cart, click nút **-** hai lần
  3. Quan sát Cart để verify
- **Kết quả mong đợi:** S2→S2. SL 2, thành tiền 12,000,000₫
- **Kết quả thực tế:** FAIL. Không có nút - trong Cart.

### TC-ST-FR07-09: S2 --E6--> S2
- **Mô tả:** Giỏ có iPhone → Click "Tiếp tục mua sắm" → Vào lại Cart xác nhận giỏ còn SP
- **Steps:**
  1. Đăng nhập, thêm iPhone 15 Pro Max vào giỏ
  2. Vào Cart, click "Tiếp tục mua sắm" (← Mua tiếp)
  3. Xác nhận đang ở trang chủ
  4. Vào lại Cart để verify
- **Kết quả mong đợi:** S2→S2. iPhone vẫn còn trong giỏ
- **Kết quả thực tế:** PASS. Click "← Mua tiếp" → về trang chủ. Vào lại Cart thấy iPhone còn.
