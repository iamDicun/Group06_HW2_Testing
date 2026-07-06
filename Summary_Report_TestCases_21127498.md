# SUMMARY REPORT — Tổng hợp Test Case & Test Design (EShop)

**Ngày tổng hợp:** 06/07/2026
**Phạm vi:** Toàn bộ test case và test design đã cung cấp trong phiên làm việc này, gồm 4 bộ kỹ thuật thiết kế:
1. Decision Table (kết hợp Pairwise) — FR-16
2. Equivalence Partitioning (EP) & Boundary Value Analysis (BVA) — FR-01, FR-07
3. State Transition Testing — FR-10
4. Use Case Testing — UC-16 (FR-16)

> ⚠️ **Lưu ý về nguồn dữ liệu:** Báo cáo này chỉ tổng hợp **chính xác những gì có trong các file đã cung cấp**. Với các file không có trường "Status" / "Actual Result" (đa số các file Decision Table, State Transition, Use Case), báo cáo ghi nhận là **"Chưa có dữ liệu thực thi"** thay vì suy đoán kết quả.

---

## 1. Tổng số Test Case

| Bộ kỹ thuật | Số lượng TC | File nguồn |
|---|---:|---|
| Decision Table (FR-16) | 12 | TC-FR16-01 → TC-FR16-12 |
| EP & BVA (FR-01, FR-07) | 3 | TC-REGISTER-001, TC-REGISTER-002, TC-CART-001 |
| State Transition Testing (FR-10) | 15 | TC_ST_FR10_01 → TC_ST_FR10_15 |
| Use Case Testing (UC-16 / FR-16) | 6 | TC_UC_UC16_01 → TC_UC_UC16_06 |
| **TỔNG CỘNG** | **36** | |

---

## 2. Coverage theo Functional Requirement (FR)

| FR | Chức năng | Số TC | Kỹ thuật áp dụng |
|---|---|---:|---|
| **FR-01** | Account Registration (Đăng ký tài khoản) | 2 | EP (1), BVA (1) |
| **FR-07** | Shopping Cart (Giỏ hàng) | 1 | Functional (không ghi rõ kỹ thuật cụ thể — xem mục 6) |
| **FR-10** | Order State Machine (Trạng thái đơn hàng) | 15 | State Transition Testing |
| **FR-16** | Import Sản phẩm từ CSV | 18 | Decision Table (12) + Use Case Testing (6) |
| **TỔNG** | | **36** | |

**Nhận xét:** FR-16 có độ phủ kiểm thử cao nhất (18/36 ≈ 50%) vì được kiểm thử bằng **2 kỹ thuật độc lập** (Decision Table và Use Case Testing), giúp tăng độ tin cậy chéo (cross-validation) cho chức năng import CSV.

---

## 3. Coverage theo Test Design Technique

| Kỹ thuật | Số TC | FR áp dụng | Ghi chú |
|---|---:|---|---|
| Decision Table (+ Pairwise) | 12 | FR-16 | 7 Rules (R1–R7), Pairwise bổ sung cho R5 (lỗi đồng thời name + price) |
| Equivalence Partitioning | 1 | FR-01 | TC-REGISTER-001 (valid partition) |
| Boundary Value Analysis | 1 | FR-01 | TC-REGISTER-002 (6 giá trị biên độ dài password: 7/8/9/31/32/33 ký tự) |
| Functional (kỹ thuật không ghi rõ) | 1 | FR-07 | TC-CART-001 — trường "Test Type/Technique" bị bỏ trống trong file gốc |
| State Transition Testing | 15 | FR-10 | 6 valid transitions + 9 invalid transitions (0-switch & 1-switch coverage) |
| Use Case Testing | 6 | FR-16 (UC-16) | 1 Main flow, 1 Alternate flow, 4 Exception flow |
| **TỔNG** | **36** | | |

---

## 4. Phân loại Test Case theo Loại kiểm thử (Positive/Negative)

| Bộ | Positive | Negative | Ghi chú |
|---|---:|---:|---|
| Decision Table (FR-16) | 2 (TC-10, TC-11) | 10 (TC-01→09, TC-12) | TC-12 gắn nhãn "Critical" |
| EP & BVA (FR-01/07) | 1 chủ đích Positive (TC-REGISTER-001), TC-CART-001 chủ đích Positive | TC-REGISTER-002 gồm cả 2 (biên hợp lệ & không hợp lệ) | Xem thực tế thực thi ở mục 5 |
| State Transition (FR-10) | 6 (Valid transitions) | 9 (Invalid transitions) | |
| Use Case (UC-16) | 2 (Main + Alternate) | 4 (Exception) | |

---

## 5. Status của Test Case (thực thi)

> Chỉ có **3/36 file** (bộ EP & BVA) có trường "Status" và "Actual Result" được điền. **33/36 file còn lại** (Decision Table, State Transition, Use Case) chỉ là tài liệu **thiết kế test case** — chưa có bằng chứng đã thực thi (không có trường Status/Actual Result trong nội dung gốc).

| Test Case | FR | Status | Actual Result | Kết luận |
|---|---|---|---|---|
| TC-REGISTER-001 | FR-01 | Run | Đăng ký thất bại — hệ thống báo "password yếu" dù đã nhập đúng theo rule quy định | ❌ **FAILED** |
| TC-REGISTER-002 | FR-01 | Not Run | (chưa có) | ⏸️ **NOT RUN** |
| TC-CART-001 | FR-07 | Run | Số lượng sản phẩm hiển thị đúng, nhưng sản phẩm trùng nhau **không được gộp** thành 1 dòng mà bị tách nhiều dòng | ❌ **FAILED** (một phần — 1/2 expected result không đạt) |
| 33 TC còn lại (FR-16 Decision Table, FR-10 State Transition, FR-16 Use Case) | FR-16, FR-10 | **Không có dữ liệu** | **Không có dữ liệu** | ⏳ **Chưa xác định (No execution data)** |

### Tổng hợp số liệu Status

| Trạng thái | Số lượng | Tỷ lệ trên 36 TC |
|---|---:|---:|
| Passed | 0 | 0% |
| Failed | 2 | 5.6% |
| Not Run | 1 | 2.8% |
| Không có dữ liệu thực thi (chỉ có thiết kế) | 33 | 91.6% |
| **Tổng** | **36** | **100%** |

---

## 6. Bug tìm được

### 6.1 Danh sách Bug ghi nhận được từ dữ liệu

Trong toàn bộ 36 file, **chỉ có 1 (một) bug được đặt tên/ghi nhận rõ ràng**, xuất hiện tại trường "Related Bugs" của **TC-CART-001**:

| # | Tên Bug (nguyên văn) | File tham chiếu | FR liên quan (suy luận từ tên bug) | Severity | Ghi chú |
|---|---|---|---|---|---|
| 1 | `[BUG][REGISTER] Password Validation in Login page not working properly` | TC-CART-001 (Related Bugs) | FR-01 (Register/Login — theo tên bug) | **Không ghi rõ trong file gốc** | ⚠️ Xem cảnh báo bất thường bên dưới |

### 6.2 ⚠️ Điểm bất thường cần lưu ý (Data Inconsistency)

- Bug trên có tên liên quan đến **Register/Login** (`[BUG][REGISTER]...`), nhưng lại được gắn vào **Related Bugs của TC-CART-001** (test case về Giỏ hàng — FR-07), **không liên quan về mặt chức năng**.
- Trong khi đó, **TC-REGISTER-001** — chính là test case thực sự phát hiện lỗi validate password ("password yếu" dù nhập đúng rule) — lại có trường **Related Bugs = "None"**, tức **không được gắn bug nào**, dù kết quả thực thi là FAILED.
- → Nhiều khả năng đây là **lỗi liên kết bug** (misattached bug ID) trong dữ liệu nguồn, cần đối chiếu lại với hệ thống quản lý bug thực tế (Jira/Bug tracker) để gán đúng: bug password validation nên được liên kết với **TC-REGISTER-001**, không phải TC-CART-001.
- TC-CART-001 thực chất có lỗi **riêng của nó** (sản phẩm trùng không được gộp dòng trong giỏ hàng) nhưng **chưa có bug ID riêng** được tạo/ghi nhận cho lỗi này trong dữ liệu cung cấp.

### 6.3 Coverage của Bug theo FR

| FR | Số bug ghi nhận | Ghi chú |
|---|---:|---|
| FR-01 (Register) | 1 (tên bug đề cập, nhưng gắn sai vị trí — xem 6.2) | Cần bug riêng cho lỗi thực tế phát hiện ở TC-REGISTER-001 |
| FR-07 (Cart) | 0 (chưa có bug ID chính thức) | Lỗi "không gộp dòng sản phẩm trùng" tại TC-CART-001 **chưa có bug ID** dù đã fail |
| FR-10, FR-16 | 0 | Không có dữ liệu thực thi nên chưa phát sinh bug |

### 6.4 Coverage của Bug theo Severity

| Severity | Số lượng | Ghi chú |
|---|---:|---|
| Critical | 0 | Không có thông tin |
| High | 0 | Không có thông tin |
| Medium | 0 | Không có thông tin |
| Low | 0 | Không có thông tin |
| **Không xác định** | **1** | File gốc không có trường Severity/Priority cho bug này |

> **Kết luận mục 6:** Dữ liệu cung cấp **không đủ thông tin** để phân loại Severity của bug. Cần bổ sung trường Severity/Priority trong bug tracker gốc để báo cáo đầy đủ hơn ở lần cập nhật sau.

---

## 7. Tổng kết & Khuyến nghị

| Hạng mục | Số liệu |
|---|---|
| Tổng số Test Case | 36 |
| Số FR được kiểm thử | 4 (FR-01, FR-07, FR-10, FR-16) |
| Số kỹ thuật thiết kế áp dụng | 5 (Decision Table, Pairwise, EP, BVA, State Transition, Use Case — Pairwise tính là bổ trợ cho Decision Table) |
| TC đã thực thi (Run) | 2 |
| TC Passed | 0 |
| TC Failed | 2 |
| TC Not Run | 1 |
| TC chưa có dữ liệu thực thi (chỉ ở dạng thiết kế) | 33 |
| Bug ghi nhận được | 1 (có bất thường về liên kết — xem mục 6.2) |

**Khuyến nghị:**
1. Cần thực thi (execute) 33 test case còn lại (FR-16 Decision Table, FR-10 State Transition, FR-16 Use Case) để có dữ liệu Pass/Fail thực tế, hiện báo cáo mới chỉ dừng ở mức **thiết kế test**.
2. Rà soát và sửa lại liên kết bug: gán đúng bug password validation cho TC-REGISTER-001 thay vì TC-CART-001.
3. Tạo bug ID riêng cho lỗi phát hiện tại TC-CART-001 (sản phẩm trùng không gộp dòng trong giỏ hàng).
4. Bổ sung trường Severity/Priority cho bug đã ghi nhận để phục vụ phân tích rủi ro.
5. Bổ sung trường "Test Type/Technique" còn thiếu trong TC-CART-001 để đảm bảo tính nhất quán trong tài liệu test.

---

*Báo cáo được tổng hợp tự động dựa trên toàn bộ nội dung file do người dùng cung cấp trong phiên làm việc, không suy diễn thêm dữ liệu ngoài phạm vi file gốc.*
