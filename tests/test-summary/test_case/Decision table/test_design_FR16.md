# Test Design — FR-16: Import Sản phẩm từ CSV (EShop)

> **Tài liệu tham chiếu:** EShop SRS v2.0 (2026-05-14), Mục 6 — FR-16  
> **Phạm vi:** Chức năng Import Sản phẩm hàng loạt từ file CSV (Web Admin)  
> **Phương pháp:** Black-box Testing — Decision Table (kết hợp Pairwise cho lỗi đồng thời)  
> **Người thiết kế:** AI Agent (skill: eshop-decision-table-test-design v1.1)  
> **Ngày tạo:** 2026-06-29

---

## 1. Phân tích Kỹ thuật Kiểm thử

### 1.1 Kỹ thuật áp dụng

**Kỹ thuật chính: Decision Table**

FR-16 được chọn dùng Decision Table vì:
- Chức năng có **nhiều lớp validation tuần tự và phân cấp**: validation cấp file (extension, header) → validation cấp dòng dữ liệu (`name`, `price`) → validation chuẩn định dạng (RFC 4180).
- Mỗi lớp validation thất bại đều dẫn đến **kết quả hoàn toàn khác nhau** (từ chối ngay lập tức vs. rollback sau khi xử lý vs. thành công).
- Có quy tắc **atomic transaction (all-or-nothing)**: chỉ cần 1 dòng sai → toàn bộ import bị rollback.

**Kỹ thuật bổ sung: Pairwise (kết hợp lỗi đồng thời)**

Hai điều kiện C3 (`name`) và C4 (`price`) nằm cùng cấp độ validation (row-level), độc lập nhau và có thể **cùng sai trong một file**. Phải thêm rule R5 (C3=N ∧ C4=N) để xác minh hệ thống báo cáo **tất cả lỗi** của từng dòng, không dừng ở lỗi đầu tiên phát hiện được.

---

### 1.2 Xác định Conditions (Điều kiện)

| Mã | Điều kiện | Nguồn đặc tả | Giá trị |
|----|-----------|-------------|---------|
| **C1** | File được tải lên có đuôi `.csv` | FR-16: "Đuôi file phải là `.csv`" | Y / N |
| **C2** | Dòng đầu tiên (header) đúng định dạng: `name,price,description,imageUrl,category_id` | FR-16: "Dòng đầu tiên là header" | Y / N |
| **C3** | Tất cả dòng dữ liệu có trường `name` không rỗng | FR-16: "`name` không được rỗng" | Y / N |
| **C4** | Tất cả dòng dữ liệu có trường `price` là số dương (> 0) | FR-16: "`price` phải là số dương" | Y / N |
| **C5** | Trường có chứa dấu phẩy bên trong được bọc trong dấu nháy kép (RFC 4180) | FR-16: "Hỗ trợ các trường có chứa dấu phẩy nếu được bọc trong dấu nháy kép (RFC 4180)" | Y / N / `-` |

> **Ghi chú C5:** C5 chỉ có giá trị N khi tồn tại ít nhất một trường chứa dấu phẩy mà **không** được bọc nháy kép. Khi không có trường nào chứa dấu phẩy bên trong → C5 = Y (mặc định hợp lệ).

---

### 1.3 Xác định Actions (Hành động)

| Mã | Hành động | Mô tả chi tiết |
|----|-----------|---------------|
| **A1** | Import thành công — lưu toàn bộ dữ liệu vào DB | Tất cả sản phẩm trong file được tạo mới trong CSDL |
| **A2** | Rollback toàn bộ — không có dữ liệu nào được lưu | Transaction bị hủy, CSDL không thay đổi |
| **A3** | Hiển thị thông báo lỗi rõ ràng | Thông báo mô tả loại lỗi (không phải thông báo chung chung) |
| **A4** | Hiển thị báo cáo: số dòng lỗi + lý do cụ thể từng dòng | FR-16: "báo cáo rõ ràng: bao nhiêu dòng lỗi và lý do" |
| **A5** | Hiển thị báo cáo: số dòng thành công | FR-16: "bao nhiêu dòng thành công" |

---

## 2. Test Design — Decision Table

### 2.1 Decision Table đầy đủ

| | **R1** | **R2** | **R3** | **R4** | **R5** | **R6** | **R7** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **ĐIỀU KIỆN** | | | | | | | |
| C1: File extension = `.csv` | N | Y | Y | Y | Y | Y | Y |
| C2: Header đúng định dạng | `-` | N | Y | Y | Y | Y | Y |
| C3: Tất cả `name` ≠ rỗng | `-` | `-` | N | Y | N | Y | Y |
| C4: Tất cả `price` > 0 | `-` | `-` | Y | N | N | Y | Y |
| C5: RFC 4180 (field có phẩy → có nháy kép) | `-` | `-` | Y | Y | Y | N | Y |
| **HÀNH ĐỘNG** | | | | | | | |
| A1: Import thành công (lưu DB) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | **✓** |
| A2: Rollback toàn bộ | ✗ | ✗ | **✓** | **✓** | **✓** | **✓** | ✗ |
| A3: Thông báo lỗi | **✓** | **✓** | **✓** | **✓** | **✓** | **✓** | ✗ |
| A4: Báo cáo dòng lỗi + lý do từng dòng | ✗ | ✗ | **✓** | **✓** | **✓** | **✓** | ✗ |
| A5: Báo cáo số dòng thành công | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | **✓** |

> **Ký hiệu:**  
> `Y` = Điều kiện thỏa mãn | `N` = Điều kiện không thỏa mãn  
> `-` = Don't care (điều kiện phân cấp đã bị từ chối trước đó)  
> `✓` = Hành động xảy ra | `✗` = Hành động không xảy ra

---

### 2.2 Sơ đồ luồng validation (tham khảo)

```
Upload file
    │
    ▼
[C1] Extension = .csv?
    │ N → A3: Báo lỗi "Sai định dạng file" (R1)
    │ Y
    ▼
[C2] Header đúng định dạng?
    │ N → A3: Báo lỗi "Header không hợp lệ" (R2)
    │ Y
    ▼
Duyệt từng dòng dữ liệu
    │
    ├─ [C3] name rỗng? → ghi nhận lỗi dòng đó
    ├─ [C4] price ≤ 0 hoặc không phải số? → ghi nhận lỗi dòng đó
    └─ [C5] field chứa phẩy không có nháy kép? → ghi nhận lỗi dòng đó
    │
    ▼
Có lỗi nào không?
    │ Có → Rollback toàn bộ + A3 + A4 (R3 / R4 / R5 / R6)
    │ Không → A1: Commit + A5 (R7)
```

---

### 2.3 Diễn giải từng Rule

| Rule | Tình huống | Hành động hệ thống | Loại |
|------|-----------|-------------------|------|
| **R1** | File tải lên không có đuôi `.csv` (ví dụ: `.xlsx`, `.txt`, `.json`) | Từ chối ngay lập tức, hiển thị lỗi định dạng file | Negative |
| **R2** | File `.csv` nhưng dòng header không đúng (thiếu cột, đổi tên cột, sai thứ tự) | Từ chối, hiển thị lỗi header không hợp lệ | Negative |
| **R3** | File hợp lệ, ít nhất 1 dòng có `name` = rỗng | Rollback toàn bộ, báo cáo dòng lỗi + lý do "name không được rỗng" | Negative |
| **R4** | File hợp lệ, ít nhất 1 dòng có `price` không hợp lệ (= 0, âm, hoặc không phải số) | Rollback toàn bộ, báo cáo dòng lỗi + lý do "price phải là số dương" | Negative |
| **R5** | File hợp lệ, ít nhất 1 dòng có **đồng thời** `name` rỗng VÀ `price` không hợp lệ *(Pairwise combined)* | Rollback toàn bộ, báo cáo **cả hai lỗi** của dòng đó | Negative |
| **R6** | File hợp lệ, có trường chứa dấu phẩy nhưng **không** được bọc nháy kép RFC 4180 | Rollback toàn bộ, báo cáo lỗi parse CSV | Negative |
| **R7** | File hoàn toàn hợp lệ (tất cả C1–C5 đều thỏa mãn) | Import thành công, báo cáo số dòng thành công | Positive |

---

## 3. Danh sách Test Cases dự kiến (từ Decision Table)

> Mỗi Test Case được thiết kế thành một file `.md` riêng biệt. Bảng dưới đây là ánh xạ từ Rule → Test Case ID để dễ truy vết (traceability).

| Test Case ID | Rule | Điều kiện kiểm tra | Loại |
|---|---|---|---|
| TC-FR16-01 | R1 | C1=N — File extension không phải `.csv` | Negative |
| TC-FR16-02 | R2 | C1=Y, C2=N — Header thiếu cột | Negative |
| TC-FR16-03 | R2 | C1=Y, C2=N — Header sai tên cột | Negative |
| TC-FR16-04 | R3 | C3=N — Một dòng có `name` rỗng | Negative |
| TC-FR16-05 | R4 | C4=N — `price` = 0 (Boundary Value) | Negative |
| TC-FR16-06 | R4 | C4=N — `price` âm | Negative |
| TC-FR16-07 | R4 | C4=N — `price` không phải số | Negative |
| TC-FR16-08 | R5 | C3=N ∧ C4=N — `name` rỗng VÀ `price` không hợp lệ *(Pairwise combined)* | Negative |
| TC-FR16-09 | R6 | C5=N — Field chứa dấu phẩy không bọc nháy kép RFC 4180 | Negative |
| TC-FR16-10 | R7 | Tất cả C1–C5=Y, không có field chứa phẩy | Positive |
| TC-FR16-11 | R7 | Tất cả C1–C5=Y, có field chứa phẩy bọc nháy kép đúng RFC 4180 | Positive |
| TC-FR16-12 | R3/R4 | Kiểm tra Atomic Transaction: nhiều dòng hợp lệ + 1 dòng lỗi cuối → rollback toàn bộ | Negative (Critical) |

---

*Tài liệu được tạo tự động bởi AI Agent theo skill: `eshop-decision-table-test-design v1.1`*  
*Phiên bản tài liệu: 1.1 | Ngày: 2026-06-29*
