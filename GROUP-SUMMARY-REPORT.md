# Báo Cáo Tổng Hợp Kiểm Thử — Nhóm 06 (EShop)

**Nguồn dữ liệu:** tổng hợp từ 5 file summary cá nhân đặt ở thư mục gốc repo:

| MSSV | Thành viên |
|---|---|---|
| 23127031 | Nguyễn Ngọc Minh Châu |
| 23127033 | Bùi Dương Duy Cường |
| 23127391 | Nguyễn Anh Khoa |
| 23127459 | Huỳnh Vương Thụy Quân |
| 21127498 | Trần Quang Đạo |

**Kỹ thuật kiểm thử trong phạm vi:** EP (Equivalence Partitioning), BVA (Boundary Value Analysis), DT (Decision Table), PT (Pairwise Testing), ST (State Transition Testing), UC (Use Case Testing).

---

## 16. Tổng số Test Case của nhóm & theo từng người

| MSSV | Số TC | Tỉ lệ trên tổng nhóm |
|---|---:|---:|
| 23127033 | 115 | 29.3% |
| 23127391 | 111 | 28.3% |
| 23127459 | 68 | 17.3% |
| 23127031 | 62 | 15.8% |
| 21127498 | 36 | 9.2% |
| **TỔNG NHÓM** | **392** | **100%** |

---

## 17. Coverage của Test Case

### 17.1 Theo Feature Requirement (FR)

| FR | Chức năng | Người phụ trách (MSSV) | Số TC | Ghi chú |
|---|---|---|---:|---|
| FR-01 | Account Registration | 21127498 | 2 | EP(1) + BVA(1) |
| FR-02 | Login & Lockout (Web) | 23127031 | ≥23 rõ ràng (ST 11 + DT-PT 7 + UC 5) + một phần trong 39 TC EP/BVA gộp chung FR-02/08/14/Mobile | Nguồn không tách EP/BVA theo từng FR |
| FR-02 (Mobile) | Login (Mobile) | 23127031 | nằm trong 39 TC EP/BVA gộp | Không tách riêng được |
| FR-03 | Forgot Password (Web) | 23127033 (EP/BVA/STT/UCT) + 23127459 (DT/Pairwise) | 54 + 9 = **63** | 2 người cùng test FR-03 bằng kỹ thuật khác nhau — xem ghi chú 17.3 |
| FR-03 (Mobile) | Forgot Password (Mobile) | 23127033 | 11 | EP + BVA |
| FR-04 (Web+Mobile) | Personal Profile | 23127391 | 21 + 15 = **36** | |
| FR-05 | Product Search (Web) | 23127459 | 10 | EP(9)+BVA(1) |
| FR-05 (Mobile) | Product Search (Mobile) | 23127459 | 9 | EP(8)+BVA(1) |
| FR-07 | Shopping Cart | 23127459 (UC+ST) + 21127498 (kỹ thuật không ghi rõ) | 20 + 1 = **21** | |
| FR-08 | Checkout | 23127391 (10) + 23127031 (một phần trong 39 TC gộp) | ≥10 | Phần của 23127031 không tách được số chính xác |
| FR-09 | Discount Coupon (Checkout) | 23127033 (EP/BVA/DT/Pairwise) | 32 | 23127459 có 2 bug gắn nhãn FR-09 nhưng **không có dòng TC riêng cho FR-09** trong file gốc — khoảng trống dữ liệu |
| FR-10 | Order State Machine | 23127391 (31) + 21127498 (15, ST) | **46** | |
| FR-11 | Order History | 23127459 | 6 | EP(5)+BVA(1) |
| FR-12 | Access Control | 23127391 | 8 | |
| FR-14 | Category Management | 23127031 | nằm trong 39 TC EP/BVA gộp | Không tách riêng được |
| FR-15 | Product Management | 23127033 | 18 | EP+BVA |
| FR-16 | Product Import (CSV) | 23127391 (8) + 21127498 (18: DT 12 + UC 6) | **26** | 2 người cùng test FR-16 |
| FR-17 | Coupon Management | 23127459 | 14 | |
| FR-19 | User Management | 23127391 | 18 | |

**Nhận xét:** một số FR được **2 thành viên cùng test bằng kỹ thuật khác nhau** (FR-03, FR-07, FR-08, FR-10, FR-16) — có thể là chủ đích cross-validate (giống cách 23127033 tự dùng cả EP/BVA lẫn DT/Pairwise cho FR-09), nhưng cũng có thể là trùng phân công ngoài dự kiến so với bảng phân công gốc trong `README.md` (mỗi FR chỉ nên có 1 người phụ trách chính). Nhóm nên rà soát lại.

### 17.2 Theo Test Design Technique (toàn nhóm)

| Kỹ thuật | Tổng TC (nhóm) | Tỉ lệ |
|---|---:|---:|
| EP + BVA (Domain Testing) | 225 | 57.4% |
| State Transition Testing (ST) | 73 | 18.6% |
| Use Case Testing (UC) | 40 | 10.2% |
| Decision Table (bao gồm phần Pairwise không tách được) | 39 | 9.9% |
| Pairwise Testing (tách riêng được) | 14 | 3.6% |
| Không rõ kỹ thuật (thiếu field trong file gốc) | 1 | 0.3% |
| **TỔNG** | **392** | **100%** |

*Chi tiết theo từng người:*

| MSSV | EP+BVA | ST | UC | DT (+PT gộp nếu có) | PT riêng | Khác |
|---|---:|---:|---:|---:|---:|---:|
| 23127033 | 60 | 28 | 10 | 7 | 10 | 0 |
| 23127031 | 39 | 11 | 5 | 7 (DT-PT gộp) | — | 0 |
| 23127459 | 39 | 9 | 11 | 5 | 4 | 0 |
| 23127391 | 85 | 10 | 8 | 8 | — | 0 |
| 21127498 | 2 | 15 | 6 | 12 (gồm Pairwise cho R5) | — | 1 (FR-07, functional, không ghi kỹ thuật) |

**Nhận xét:** Domain Testing (EP+BVA) chiếm hơn nửa số TC toàn nhóm (57%), phù hợp vì đây là kỹ thuật bắt buộc áp dụng cho mọi FR theo yêu cầu bài tập; State Transition và Use Case Testing được dùng nhiều nhất ở các FR có máy trạng thái/luồng nghiệp vụ phức tạp (FR-02, FR-03, FR-07, FR-10, FR-16).

---

## 18. Status của Test Case

| MSSV | Passed | Failed | Blocked | Not Run | Chưa có dữ liệu thực thi (chỉ thiết kế) | Tổng |
|---|---:|---:|---:|---:|---:|---:|
| 23127033 | 27 | 24 | 9 | 55 | 0 | 115 |
| 23127031 | 36 | 14 | 12 | 0 | 0 | 62 |
| 23127459 | 35 | 33 | 0 | 0 | 0 | 68 |
| 23127391 | 51 | 45 | 15 | 0 | 0 | 111 |
| 21127498 | 0 | 2 | 0 | 1 | 33 | 36 |
| **TỔNG NHÓM** | **149** | **118** | **36** | **56** | **33** | **392** |

- **Passed:** 149/392 (38.0%)
- **Failed:** 118/392 (30.1%)
- **Blocked:** 36/392 (9.2%)
- **Not Run / chưa có dữ liệu thực thi:** 89/392 (22.7%) — chủ yếu từ 23127033 (STT-UCT + FR-09 DT-PT chưa chạy tay, chỉ đối chiếu) và 21127498 (33 TC Decision Table/ST/UC chỉ ở dạng thiết kế, chưa thực thi).

**Nhận xét:** Trong số TC **đã thực sự có kết quả thi hành** (149+118+36 = 303/392), tỉ lệ Fail+Blocked là **154/303 (50.8%)** — cho thấy SUT có mật độ lỗi khá cao trên các luồng đã kiểm thử. Gần 1/4 tổng số TC của nhóm (89/392) vẫn chưa có bằng chứng thực thi độc lập, tập trung ở các kỹ thuật mới hơn (ST, UC, DT, Pairwise) — đây là khoảng trống chung cần nhóm bổ sung trước khi coi là kết quả kiểm thử đầy đủ.

---

## 19. Tổng số Bug nhóm tìm được & theo từng người

| MSSV | Số Bug | Ghi chú |
|---|---:|---|
| 23127033 | 10 (+ 1 candidate chưa confirm) | Tất cả có GitHub Issue + evidence UI |
| 23127459 | 25 | |
| 23127391 | 25 | |
| 23127031 | 7 | Tổng theo severity trong file gốc chỉ cộng ra 6 — thiếu severity cho 1 bug (đã tự flag trong file gốc) |
| 21127498 | 1 | File gốc tự flag bug này bị **gắn sai vị trí** (tên bug liên quan Register nhưng gắn vào TC Cart) |
| **TỔNG NHÓM** | **68** (bugs confirmed, chưa tính 1 candidate của 23127033) | |

---

## 20. Coverage của Bug

### 20.1 Theo Feature Requirement (FR)

| FR | Số bug | Người phát hiện (MSSV) |
|---|---:|---|
| FR-01 | 1 | 21127498 *(bug bị gắn sai vị trí — xem ghi chú 19)* |
| FR-02 | 3 | 23127031 |
| FR-03 | 7 (3 + 4) | 23127033 (3), 23127459 (4) |
| FR-04 | 5 | 23127391 |
| FR-05 | 4 | 23127459 |
| FR-07 | 10 | 23127459 |
| FR-08 | 8 (3 + 5) | 23127031 (3), 23127391 (5) |
| FR-09 | 5 (3 + 2) | 23127033 (3), 23127459 (2) |
| FR-10 | 6 | 23127391 |
| FR-11 | 1 | 23127459 |
| FR-12 | 2 | 23127391 |
| FR-14 | 1 | 23127031 |
| FR-15 | 3 | 23127033 |
| FR-16 | 2 | 23127391 |
| FR-17 | 4 | 23127459 |
| FR-19 | 5 | 23127391 |
| Mobile FR-03 | 1 | 23127033 |
| **TỔNG** | **68** | |

FR có nhiều bug nhất: **FR-07 Shopping Cart (10 bug)**, kế đến **FR-03 Forgot Password (7 bug, 2 người)**, **FR-08 Checkout (8 bug, 2 người)**.

### 20.2 Theo Severity

**Severity gốc theo từng file** (mỗi người dùng thang đo hơi khác nhau — 23127459 dùng thêm High/Medium/Low ngoài Critical/Major/Minor):

| MSSV | Critical | Major | High | Medium | Minor | Low | Không xác định |
|---|---:|---:|---:|---:|---:|---:|---:|
| 23127033 | 1 | 8 | — | — | 1 | — | 0 |
| 23127031 | 3 | 2 | — | — | 1 | — | 1 |
| 23127459 | 2 | 3 | 7 | 7 | — | 6 | 0 |
| 23127391 | 9 | 9 | — | 1 | 6 | — | 0 |
| 21127498 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |

**Quy đổi gộp về 1 thang chung** (Major gộp High; Minor gộp Low — chỉ mang tính tham khảo do khác thang đo gốc):

| Severity (quy đổi) | Số bug | Tỉ lệ |
|---|---:|---:|
| Critical | 15 | 22.1% |
| Major (gồm High) | 29 | 42.6% |
| Medium | 8 | 11.8% |
| Minor (gồm Low) | 14 | 20.6% |
| Không xác định | 2 | 2.9% |
| **TỔNG** | **68** | **100%** |

**Nhận xét:** Major (gồm High) chiếm tỉ lệ cao nhất (~43%), Critical chiếm khoảng 22% — cho thấy phần lớn bug tìm được ở mức nghiêm trọng đáng phải fix trước release. FR-04 (Profile) và FR-10 (Order State) của 23127391 tập trung nhiều bug Critical/Major nhất (18/25 bug của người này ở 2 mức cao nhất).

---

## Ghi chú chung / Khuyến nghị

1. **Chuẩn hoá thang severity:** nhóm nên thống nhất 1 thang đo duy nhất (ví dụ Critical/Major/Minor theo `README.md` đã định nghĩa label GitHub) — hiện 23127459 dùng thêm High/Medium/Low gây khó tổng hợp chính xác.
2. **Rà soát trùng FR:** FR-03, FR-07, FR-08, FR-10, FR-16 đang được ≥2 người test — cần xác nhận đây là chủ đích (cross-technique) hay trùng phân công so với bảng gốc trong `README.md`.
3. **Bổ sung thực thi còn thiếu:** 89/392 TC (23%) của nhóm (chủ yếu ST/UC/DT/Pairwise ở 23127033 và 21127498) chưa có kết quả Pass/Fail thực tế.
4. **Sửa 2 lỗi liên kết dữ liệu đã tự phát hiện:** bug thiếu severity ở 23127031, và bug bị gắn nhầm TC ở 21127498.
