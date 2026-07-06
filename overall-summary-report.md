# Báo Cáo Tổng Hợp Kiểm Thử (Overall Test Summary Report)

**Sinh viên:** Bùi Dương Duy Cường - `23127033` | **Nhóm:** 06 | **Hệ thống:** EShop
**Ngày tổng hợp:** 2026-07-06

**Phạm vi tổng hợp:** báo cáo này gộp số liệu từ 3 nguồn kiểm thử đã thực hiện trong repo:

| Nguồn | Kỹ thuật | Thư mục |
|---|---|---|
| EP & BVA | Equivalence Partitioning + Boundary Value Analysis | `EP & BVA/`, `tests/test-cases/FR-03/09/15/MOBILE` |
| STT-UCT | State Transition Testing + Use Case Testing | `STT-UCT/STT/`, `STT-UCT/UCT/` |
| FR-09 Coupon DT-PT | Decision Table + Pairwise Testing | `tests/test-cases/FR-09-Coupon-DT-PT/` |

---

## 1. Tổng Số Test Case

| Nguồn | Chức năng | Kỹ thuật | Số TC |
|---|---|---|---:|
| EP & BVA | FR-03 Quên mật khẩu (Web) | EP + BVA | 16 |
| EP & BVA | FR-09 Mã giảm giá (Checkout UI) | EP + BVA | 15 |
| EP & BVA | FR-15 Quản lý sản phẩm (Admin UI) | EP + BVA | 18 |
| EP & BVA | Mobile FR-03 Quên mật khẩu | EP + BVA | 11 |
| **EP & BVA subtotal** | | | **60** |
| STT | FR-03 Quên mật khẩu (state machine) | State Transition Testing | 28 |
| UCT | FR-03 / UC03 Yêu cầu OTP & quên mật khẩu | Use Case Testing | 10 |
| **STT-UCT subtotal** | | | **38** |
| FR-09 DT-PT | FR-09 Mã giảm giá — bảng rút gọn | Decision Table | 7 |
| FR-09 DT-PT | FR-09 Mã giảm giá — mở rộng tương tác | Pairwise Testing | 10 |
| **FR-09 DT-PT subtotal** | | | **17** |
| **TỔNG CỘNG** | | | **115** |

> Ghi chú: `TC-COUPON-SUITE.md` trong thư mục `FR-09-Coupon-DT-PT` là bản sao tham chiếu của đúng 15 TC EP+BVA đã có trong `EP & BVA` (cùng ID, cùng kết quả) — không tính trùng vào tổng trên. 17 TC Decision Table/Pairwise (`testcases/TC-COUPON-001..017.md`) là bộ TC độc lập, khác nội dung dù trùng dải ID.

### Coverage theo Requirement (FR)

| FR | Bề mặt | Kỹ thuật áp dụng | Tổng TC |
|---|---|---|---:|
| FR-03 Quên mật khẩu | Web UI | EP, BVA, STT, UCT | 16 + 28 + 10 = **54** |
| FR-03 Quên mật khẩu (Mobile) | Mobile UI | EP, BVA | **11** |
| FR-09 Mã giảm giá | Checkout UI + API/code | EP, BVA, Decision Table, Pairwise | 15 + 17 = **32** |
| FR-15 Quản lý sản phẩm | Admin UI | EP, BVA | **18** |

### Coverage theo Test Design Technique

| Kỹ thuật | Số TC | Tỉ lệ |
|---|---:|---:|
| Equivalence Partitioning (EP) | ~36 | 31% |
| Boundary Value Analysis (BVA) | ~24 | 21% |
| State Transition Testing (STT) | 28 | 24% |
| Use Case Testing (UCT) | 10 | 9% |
| Decision Table | 7 | 6% |
| Pairwise Testing | 10 | 9% |

*(EP/BVA không tách riêng 100% trong từng TC vì nhiều TC EP&BVA gắn nhãn kép "EP" hoặc "BVA" theo bảng gốc; số liệu trên lấy theo nhãn kỹ thuật chính của từng TC trong các suite gốc.)*

---

## 2. Trạng Thái Thực Thi Test Case

| Nguồn | Pass | Fail | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| EP & BVA (đã chạy manual black-box UI) | 27 | 24 | 9 | 0 | 60 |
| STT-UCT (chưa chạy thủ công, chỉ đối chiếu spec) | 0 | 0 | 0 | 38 | 38 |
| FR-09 DT-PT (chưa chạy, kết luận qua phân tích code) | 0 | 0 | 0 | 17 | 17 |
| **TỔNG** | **27** | **24** | **9** | **55** | **115** |

**Ghi chú quan trọng về STT-UCT và FR-09 DT-PT:**
- Mỗi file test case trong `STT-UCT/` và `FR-09-Coupon-DT-PT/testcases/` đều có field `Trạng thái/Status = Not Run` — nghĩa là **chưa được thực thi thủ công độc lập** trên UI thực tế.
- Tuy nhiên cả hai bộ đều có **phân tích đối chiếu (cross-reference)** với bug đã confirmed ở `EP & BVA`:
  - `STT-UCT/STT/bug-report.md` dự đoán: **5/28 STT TC sẽ Fail** (STT-006, 008, 009, 010, 011) và **2/28 sẽ Blocked** (STT-004, STT-012) nếu chạy, do 3 bug FR-03 đã biết (`BUG-FR03-003/004/005`).
  - `STT-UCT/UCT/bug_reports/` dự đoán: **6/10 UCT TC sẽ Fail** (UCT-001, 002, 003, 007, 009, 010) vì cùng 3 bug FR-03 trên.
  - `tests/test-cases/FR-09-Coupon-DT-PT/test-design.md` phát hiện **3 lỗi logic/bảo mật qua đọc code `server.js`**, trùng root-cause với 3 bug FR-09 đã confirmed ở EP & BVA (`BUG-FR09-001/002/003`).
- Đây là minh chứng **tam giác hoá kỹ thuật (technique triangulation)**: 6/10 bug confirmed được tìm lại độc lập bằng ≥2 kỹ thuật khác nhau, nhưng chưa cộng thêm bug mới nào ngoài 10 bug đã có.

---

## 3. Tổng Hợp Bug

### 3.1 Số lượng

| Loại | Số lượng |
|---|---:|
| Bug **confirmed** (có evidence UI, GitHub Issue) | **10** |
| Bug **candidate** (chưa xác minh) | 1 (`BUG-FR03-001`) |
| Bug **được tái xác nhận qua kỹ thuật khác** (không phải bug mới) | 6 (3 qua STT/UCT, 3 qua Decision Table/Pairwise) |

### 3.2 Coverage theo FR

| FR | Số bug confirmed | Bug ID | Kỹ thuật tìm ra ban đầu | Tái xác nhận bởi |
|---|---:|---|---|---|
| FR-03 Quên mật khẩu (Web) | 3 | BUG-FR03-003, 004, 005 | EP + BVA (manual UI) | STT (bug-report.md), UCT (BUG-UCT-FR03-001/002/003) |
| FR-09 Mã giảm giá | 3 | BUG-FR09-001, 002, 003 | EP + BVA (manual Checkout UI) | Decision Table/Pairwise (code review `server.js`) |
| FR-15 Quản lý sản phẩm | 3 | BUG-FR15-002, 003, 004 | EP + BVA (manual Admin UI) | — |
| Mobile FR-03 Quên mật khẩu | 1 | BUG-MOBILE-FR03-001 | EP + BVA (manual Mobile UI) | — |
| **Tổng** | **10** | | | |

### 3.3 Coverage theo Severity

*(Severity lấy theo file bug report gốc trong `EP & BVA/bug_reports/*.md`, là nguồn xác thực nhất; bảng tổng trong `main_report.md` có 3 chỗ ghi lệch severity so với file gốc — đã hiệu chỉnh lại bên dưới.)*

| Severity | Số bug | Bug ID |
|---|---:|---|
| Critical | 1 | BUG-FR09-002 (SAVE10 tính sai % giảm giá) |
| Major | 8 | BUG-FR03-003, BUG-FR03-005, BUG-FR09-001, BUG-FR09-003, BUG-FR15-002, BUG-FR15-003, BUG-FR15-004, BUG-MOBILE-FR03-001 |
| Minor | 1 | BUG-FR03-004 (thiếu back-to-login) |

| Priority | Số bug |
|---|---:|
| P0 | 1 (BUG-FR09-002) |
| P1 | 8 |
| P2 | 1 (BUG-FR03-004) |

### 3.4 Danh sách bug confirmed (đầy đủ)

| Bug ID | FR | Severity | Issue | Tóm tắt |
|---|---|---|---|---|
| BUG-FR03-003 | FR-03 | Major | [#24](https://github.com/iamDicun/Group06_HW2_Testing/issues/24) | Thiếu ô xác nhận mật khẩu |
| BUG-FR03-004 | FR-03 | Minor | [#25](https://github.com/iamDicun/Group06_HW2_Testing/issues/25) | Thiếu chức năng quay lại đăng nhập |
| BUG-FR03-005 | FR-03 | Major | [#26](https://github.com/iamDicun/Group06_HW2_Testing/issues/26) | Mật khẩu hợp lệ bị từ chối khi reset |
| BUG-FR09-001 | FR-09 | Major | [#27](https://github.com/iamDicun/Group06_HW2_Testing/issues/27) | Coupon bị từ chối tại đúng ngưỡng tối thiểu (dùng `>` thay vì `>=`) |
| BUG-FR09-002 | FR-09 | Critical | [#28](https://github.com/iamDicun/Group06_HW2_Testing/issues/28) | SAVE10 tính sai số tiền giảm (công thức `total * (1 - discount_value)`) |
| BUG-FR09-003 | FR-09 | Major | [#29](https://github.com/iamDicun/Group06_HW2_Testing/issues/29) | Áp dụng được coupon khi chưa đăng nhập (thiếu middleware auth) |
| BUG-FR15-002 | FR-15 | Major | [#30](https://github.com/iamDicun/Group06_HW2_Testing/issues/30) | Dữ liệu sản phẩm không hợp lệ vẫn được chấp nhận (name 256 ký tự, price 0/âm) |
| BUG-FR15-003 | FR-15 | Major | [#31](https://github.com/iamDicun/Group06_HW2_Testing/issues/31) | Chức năng chỉnh sửa sản phẩm không hoạt động |
| BUG-FR15-004 | FR-15 | Major | [#32](https://github.com/iamDicun/Group06_HW2_Testing/issues/32) | Xóa sản phẩm không có hộp thoại xác nhận |
| BUG-MOBILE-FR03-001 | Mobile FR-03 | Major | [#33](https://github.com/iamDicun/Group06_HW2_Testing/issues/33) | Thiếu OTP demo, confirm password, back-to-login trên Mobile |

**Candidate (chưa confirmed):** `BUG-FR03-001` — OTP có thể không đúng yêu cầu 6 chữ số (Major, cần thêm evidence UI).

---

## 4. Nhận Xét Tổng Thể

- **115 test case** được thiết kế trên **6 kỹ thuật thiết kế test** (EP, BVA, STT, UCT, Decision Table, Pairwise), phủ 4 chức năng: FR-03 (Web + Mobile), FR-09, FR-15.
- Chỉ **60/115 TC (52%)** đã được thực thi thủ công thật sự trên UI (khối EP & BVA); **55/115 TC (48%)** thuộc STT-UCT và FR-09 DT-PT còn ở trạng thái `Not Run` chính thức, dù đã có phân tích đối chiếu suy ra kết quả dự kiến.
- Trong số TC đã chạy thật: tỉ lệ Fail+Blocked là 33/60 (55%) — phản ánh SUT có nhiều lỗi nghiêm trọng ở các luồng được test.
- **10 bug confirmed**, phân bổ đều trên 4 chức năng (3-3-3-1); severity nghiêng về Major (80%), có 1 Critical (lỗi tính tiền coupon) và 1 Minor.
- Điểm mạnh của bộ test: 2 nhóm bug (FR-03 và FR-09, tổng 6/10 bug) được **tái xác nhận độc lập bằng kỹ thuật thứ hai** (STT/UCT cho FR-03; Decision Table/Pairwise + đọc code cho FR-09), tăng độ tin cậy rằng đây là lỗi thật chứ không phải false positive.
- Việc STT-UCT và FR-09 DT-PT chưa có lần chạy tay riêng (chỉ dựa vào đối chiếu/đọc code) là khoảng trống cần bổ sung nếu muốn coi đây là kết quả kiểm thử độc lập, thay vì suy luận từ bug đã biết.

---

## 5. Nguồn Dữ Liệu

| Nội dung | File |
|---|---|
| Chi tiết EP & BVA (4 chức năng) | `EP & BVA/main_report.md` |
| Traceability matrix EP & BVA | `tests/test-summary/traceability-matrix.md` |
| STT test case & bug đối chiếu | `STT-UCT/STT/README.md`, `STT-UCT/STT/bug-report.md` |
| UCT test case & bug report | `STT-UCT/UCT/README.md`, `STT-UCT/UCT/bug_reports/README.md` |
| FR-09 Decision Table + Pairwise design | `tests/test-cases/FR-09-Coupon-DT-PT/test-design.md` |
| FR-09 DT-PT test case chi tiết | `tests/test-cases/FR-09-Coupon-DT-PT/testcases/TC-COUPON-001..017.md` |
