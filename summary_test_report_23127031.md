# Summary Test Report — EShop

Ngày báo cáo: 06/07/2026
Phạm vi: Tổng hợp toàn bộ hoạt động kiểm thử đã thực hiện từ đầu tới thời điểm hiện tại.

---

## 1. Tổng quan số lượng Test Case

| Chỉ số | Giá trị |
|--------|---------|
| **Tổng số Test Case** | **62** |
| Số FR được cover | 4 FR |

### Coverage theo Functional Requirement

| FR | Tên | Số TC liên quan |
|----|-----|-------------------|
| FR-02 | Đăng nhập & Khóa tài khoản | (EP/BVA + ST + DT/PT + UC, xem chi tiết Mục 2) |
| FR-08 | Thanh toán (Checkout) | EP/BVA |
| FR-14 | Quản lý Danh mục (Category CRUD) | EP/BVA |
| FR-02 (Mobile) | Đăng nhập trên phân hệ Mobile | EP/BVA |

---

## 2. Test Design Techniques đã áp dụng

| Kỹ thuật | Viết tắt | Số TC | FR áp dụng |
|----------|----------|-------|------------|
| Equivalence Partitioning & Boundary Value Analysis | EP, BVA | **39** | FR-02, FR-08, FR-14, FR-02 (Mobile) — cả 4 FR |
| State Transition Testing | ST | **11** | FR-02 |
| Decision Table / Pairwise Testing | DT-PT | **7** | FR-02 |
| Use Case Testing | UC | **5** | FR-02 |
| **Tổng cộng** | | **62** | |

**Nhận xét**: FR-02 (Đăng nhập & Khóa tài khoản) là FR được kiểm thử kỹ nhất, áp dụng đủ **4 kỹ thuật khác nhau** (ST + DT-PT + UC + một phần EP/BVA) — phù hợp vì đây là chức năng có nhiều điều kiện/trạng thái/luồng phức tạp nhất trong toàn bộ đặc tả. FR-08 và FR-14 hiện mới chỉ được cover bằng EP/BVA.

---

## 3. Trạng thái thực thi Test Case

| Trạng thái | Số lượng | Tỷ lệ |
|------------|----------|-------|
| **Passed** | 36 | 58.1% |
| **Failed** | 14 | 22.6% |
| **Blocked** | 12 | 19.3% |
| **Tổng** | 62 | 100% |

> Passed = 62 − 14 (Failed) − 12 (Blocked) = **36**.

**Nhận xét**: Tỷ lệ Failed + Blocked chiếm gần **42%** tổng số test case — khá cao. Cần làm rõ nguyên nhân của 12 TC bị Blocked (do phụ thuộc môi trường, phụ thuộc TC khác, hay chưa có điều kiện thực thi) để phân biệt với Failed thực sự.

---

## 4. Tổng hợp Bug tìm được

| Chỉ số | Giá trị |
|--------|---------|
| **Tổng số Bug** | **7** |
| Số FR có bug | 3 FR (FR-02, FR-08, FR-14) |

### Phân bổ Bug theo FR

| FR | Số Bug |
|----|--------|
| FR-02 | 3 |
| FR-08 | 3 |
| FR-14 | 1 |
| **Tổng** | **7** |

### Phân bổ Bug theo mức độ nghiêm trọng (Severity)

| Severity | Số lượng |
|----------|----------|
| Critical | 3 |
| Major | 2 |
| Minor | 1 |
| **Tổng ghi nhận** | **6** |

> ⚠️ **Lưu ý cần rà soát lại**: Tổng theo Severity (3 + 2 + 1 = 6) hiện đang **thiếu 1 bug** so với tổng số bug đã ghi nhận (7). Đề nghị kiểm tra lại xem có 1 bug chưa được gắn Severity, hoặc có sai lệch số liệu khi tổng hợp — nên bổ sung cho khớp trước khi đưa vào báo cáo chính thức.

---

## 5. Nhận xét & Đề xuất chung

- **FR-02** là điểm nóng nhất về chất lượng: vừa được test nhiều nhất (28/62 TC, chiếm ~45%), vừa có nhiều bug nhất (3/7 bug) — 3 bug đã xác nhận trước đó (BUG-01: email không validate HTML5; BUG-02: khóa tài khoản sau 2 lần sai thay vì 3; BUG-03: không tự mở khóa sau 30s) đều thuộc FR-02, mức Cao/Critical.
- **FR-08 (Checkout)** phát sinh 3 bug dù chưa có báo cáo chi tiết từng bug trong hệ thống hiện tại — cần bổ sung bug report riêng cho từng bug này (theo format 1 file/bug đã dùng cho FR-02) để đầy đủ traceability.
- **FR-14 (Category CRUD)** có 1 bug — mức độ ảnh hưởng thấp hơn nhưng vẫn cần bug report riêng.
- **12 TC Blocked** cần được làm rõ nguyên nhân chặn (dependency, môi trường, dữ liệu test...) và có kế hoạch un-block để không làm sai lệch bức tranh chất lượng thực tế.
- Tỷ lệ Pass 58.1% hiện ở mức **cần cải thiện trước khi release** — đặc biệt với các bug Critical đang tập trung ở luồng đăng nhập (FR-02), nên ưu tiên fix và re-test nhóm này trước.

---

## 6. Việc cần làm tiếp theo
1. Xác nhận và bổ sung đúng Severity cho bug còn thiếu (Mục 4).
2. Viết bug report chi tiết (1 file/bug) cho 3 bug của FR-08 và 1 bug của FR-14, theo cùng format đã áp dụng cho FR-02.
3. Làm rõ nguyên nhân của 12 TC Blocked, xác định TC nào có thể un-block ngay.
4. Re-test lại sau khi fix BUG-02, BUG-03 (ưu tiên cao nhất vì chặn hoàn toàn luồng đăng nhập lại của user hợp lệ).
