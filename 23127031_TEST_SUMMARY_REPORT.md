# Test Summary Report

**Dự án:** EShop — Kiểm thử phần mềm (Group06_HW2_Testing)
**MSSV:** 23127031
**Nhánh nguồn dữ liệu:** `23127031`, `HW3-23127031`, `HW4-23127031`, `HW5-23127031`
**Ngày lập báo cáo:** 17/08/2026
**SUT (System Under Test):** EShop — web bán hàng (Frontend web + Backend Node.js/Express + SQLite)

---

## 1. Purpose of the Document

Tài liệu này tổng hợp toàn bộ hoạt động kiểm thử đã thực hiện trên hệ thống **EShop**, trải qua 4 giai đoạn (tương ứng 4 nhánh git của MSSV 23127031):

1. **Thiết kế test case thủ công** (nhánh `23127031`) — Domain Testing, Boundary Value Analysis, State Transition Testing, Use Case Testing cho chức năng Đăng nhập (FR-02), kèm thực thi thủ công và báo cáo lỗi.
2. **GUI Checklist & Usability Testing có hỗ trợ AI** (nhánh `HW3-23127031`) — kiểm thử giao diện Đăng ký/Đăng nhập và đánh giá khả năng sử dụng (usability) với 7 participants.
3. **Automation Testing bằng AI (Playwright)** (nhánh `HW4-23127031`) — tự động hóa kiểm thử cho FR-02 (Login), FR-08 (Checkout), FR-14 (Category) trên 3 trình duyệt.
4. **Performance Testing bằng AI (JMeter)** (nhánh `HW5-23127031`) — kiểm thử Load/Stress/Spike/Soak cho luồng end-to-end của hệ thống.

Mục tiêu là cung cấp cho các bên liên quan (giảng viên, người đánh giá) một bức tranh tổng thể, dựa trên số liệu thật, về mức độ hoàn thành và chất lượng của hệ thống EShop sau các đợt kiểm thử.

---

## 2. Application Overview

**EShop** là một ứng dụng web bán hàng (e-commerce) gồm:
- **Frontend:** giao diện Đăng ký, Đăng nhập, Danh sách sản phẩm, Chi tiết sản phẩm, Giỏ hàng, Thanh toán, Quản lý đơn hàng, Quản lý danh mục.
- **Backend:** Node.js/Express + SQLite (không có connection pool thật, không timeout, không circuit breaker).

Các chức năng chính (FR) được kiểm thử trong dự án:

| FR | Chức năng |
|----|-----------|
| FR-01 | Đăng ký tài khoản (Registration) |
| FR-02 | Đăng nhập & Khóa tài khoản sau 3 lần sai (Login & Account Lockout) |
| FR-08 | Thanh toán (Checkout) |
| FR-14 | Quản lý danh mục sản phẩm (Category Management) |

Luồng end-to-end chính được kiểm thử xuyên suốt các giai đoạn: **Đăng ký → Đăng nhập → Tìm/Xem sản phẩm → Thêm vào giỏ hàng → Thanh toán → Quản lý đơn hàng**.

---

## 3. Testing Scope

### In-Scope
- **Functional Testing (thủ công):** FR-02 — Đăng nhập & khóa tài khoản (Domain Testing, Boundary Value Analysis, State Transition Testing, Use Case Testing).
- **GUI Testing:** FR-01 (Đăng ký), FR-02 (Đăng nhập) — 70 hạng mục checklist.
- **Usability Testing:** Luồng Đăng ký → Đăng nhập → Tìm sản phẩm → Xem chi tiết → Thêm giỏ hàng → Kiểm tra giỏ hàng, với 7 participants, đo bằng thang SUS.
- **Automation Testing (Playwright, cross-browser: Chromium, Firefox, WebKit):** FR-02 (Login), FR-08 (Checkout), FR-14 (Category).
- **Performance Testing (JMeter):** Load, Stress, Spike, Soak trên luồng Login → ProductList → ProductDetail → AddToCart → Checkout → MyOrders → CancelOrder.

### Out of Scope
- Performance Testing không được thực hiện cho toàn bộ ứng dụng — chỉ giới hạn ở luồng end-to-end chính (7 sampler nêu trên), không bao phủ các API quản trị (admin) khác.
- Security Testing (penetration testing) chưa được thực hiện như một hạng mục riêng biệt; một số phát hiện liên quan bảo mật (ví dụ mật khẩu hiển thị plaintext) chỉ được ghi nhận nhân tiện qua GUI Checklist, không phải qua security test có hệ thống.
- Automation Testing chỉ bao phủ 3/4+ chức năng chính (FR-02, FR-08, FR-14) — FR-01 (Đăng ký) chưa có automation script riêng.

### Items Not Tested / Constraints
- Test case thủ công (State Transition, Use Case) cho FR-02 ở nhánh `23127031` được **thiết kế** đầy đủ (25 test case: 9 Domain/Boundary + 11 State Transition + 5 Use Case) nhưng **không có trường Actual Result/Pass-Fail** đính kèm trong các file test case — kết quả thực thi thật chỉ được ghi nhận tổng hợp trong `Chau/MainReport.md` và `Chau/BugReport.md` (7 bug cụ thể).
- Load balancing / khả năng mở rộng (scalability) ngoài phạm vi test đã chạy (tối đa 100 threads) chưa được xác minh — báo cáo Performance ghi rõ: "vẫn còn nhiều dư địa giữa mức chạy ổn định lâu dài và điểm bắt đầu suy giảm rõ rệt", nhưng chưa xác định breaking point thật.

---

## 4. Metrics

### 4.1 Manual Functional Testing — FR-02 (nhánh `23127031`)

| Kỹ thuật thiết kế | Số test case |
|---|---|
| Domain Testing / Boundary Value Analysis (DT-PT) | 9 |
| State Transition Testing (ST) | 11 |
| Use Case Testing (UC) | 5 |
| **Tổng** | **25** |

Bug phát hiện qua thực thi thủ công (ghi nhận trong `tests/test-cases/Chau/BugReport.md`):

| Bug ID | Chức năng | Mô tả | Severity |
|---|---|---|---|
| BUG-01 | FR-02 | Không thông báo lỗi định dạng email | Minor |
| BUG-02 | FR-02 | Đăng nhập sai 2 lần đã bị khóa (sai ngưỡng, đúng ra phải là 3 lần) | Major |
| BUG-03 | FR-02 | Sau 30s/31s bị khóa, tài khoản vẫn không mở lại được | **Critical** |
| BUG-04 | FR-08 | Sửa giá tiền thanh toán ở client vẫn thanh toán được (không validate server-side) | **Critical** |
| BUG-05 | FR-08 | Sản phẩm đã thanh toán không bị xóa khỏi giỏ hàng | Major |
| BUG-06 | FR-08 | Giỏ hàng trống nhưng vẫn thanh toán được (qua URL trực tiếp) | Minor |
| BUG-07 | FR-14 | Tên danh mục rỗng vẫn thêm được | **Critical** |

**Tổng: 7 bug** (3 Critical, 2 Major, 2 Minor).

### 4.2 GUI Checklist Testing (nhánh `HW3-23127031`)

| Màn hình | Checklist thiết kế | Checklist thực thi | Pass | Fail |
|---|---|---|---|---|
| Registry (FR-01) | 40 | 40 | 30 | 10 |
| Login (FR-02) | 30 | 30 | 22 | 8 |
| **Tổng** | **70** | **70** | **52 (74.3%)** | **18 (25.7%)** |

Bug GUI phát hiện: **10** (2 Critical: BUG-02 thiếu trường Xác nhận mật khẩu, BUG-08 mật khẩu hiển thị plaintext; 8 Major).

### 4.3 Usability Testing (nhánh `HW3-23127031`)

| Chỉ số | Giá trị |
|---|---|
| Số participants | 7 |
| Điểm SUS trung bình | **58.9 / 100** (dưới benchmark ngành 68, theo Bangor et al.) |
| Điểm SUS từng participant | P1: 67.5, P2: 80, P3: 65, P4: 72.5, P5: 32.5, P6: 57.5, P7: 37.5 |
| Tỷ lệ hoàn thành bước Đăng ký không cần hỗ trợ | **0/7 (0%)** |
| Bug usability phát hiện | 5 (1 Blocker, 3 Major, 1 Minor) |

**Phát hiện chính:** 100% participant không thể tự hoàn tất bước Đăng ký tài khoản mà không cần hỗ trợ; thông báo lỗi trong toàn luồng không hướng dẫn cách khắc phục.

### 4.4 Automation Testing — Playwright (nhánh `HW4-23127031`)

Test case tự động hóa theo test-cases/ (thiết kế): **37** (FR-02: 13, FR-08: 12, FR-14: 12).

Kết quả thực thi thật (trích từ Playwright HTML report, chạy trên 3 trình duyệt: Chromium, Firefox, WebKit):

| Module | Total (3 browsers) | Passed | Failed | Pass Rate |
|---|---|---|---|---|
| FR-02 (Login) | 42 | 24 | 18 | 57.1% |
| FR-08 (Checkout) | 36 | 30 | 6 | 83.3% |
| FR-14 (Category) | 39 | 35 | 4 | 89.7% |
| **Tổng** | **117** | **89** | **28** | **76.1%** |

Chi tiết theo từng trình duyệt:

| Module | Chromium (P/F) | Firefox (P/F) | WebKit (P/F) |
|---|---|---|---|
| FR-02 | 8/6 | 9/5 | 8/6 |
| FR-08 | 10/2 | 10/2 | 10/2 |
| FR-14 | 11/2 | 12/1 | 11/2 |

**Nhận xét:** FR-02 (Login) có tỷ lệ fail cao nhất (42.9%), nhất quán trên cả 3 trình duyệt — phù hợp với các bug Critical đã ghi nhận ở mục 4.1 và 4.2 liên quan đến cơ chế khóa tài khoản.

### 4.5 Performance Testing — JMeter (nhánh `HW5-23127031`)

| Kịch bản | Threads | Samples | Duration | p50 | p95 | p99 | Error % | Avg RPS |
|---|---|---|---|---|---|---|---|---|
| Load | 5 | 105 | 20.2s | 4ms | 54.4ms | 88.6ms | 0.00% | 5.20 |
| Stress | 100 | 3500 | 54.0s | 460ms | 1188ms | 1485ms | 0.00% | 64.86 |
| Spike | 100 (ramp-up 2s) | 1400 | 20.6s | 648ms | 3250ms | 4268ms | 0.00% | 67.82 |
| Soak | 15 (15 phút) | 24716 | 899.9s | 22ms | 127ms | 208ms | 0.00% | 27.46 |

Chi tiết sampler chậm nhất (CancelOrder):

| Kịch bản | CancelOrder p95 | CancelOrder Max |
|---|---|---|
| Load | 26ms | 26ms |
| Stress | 1548ms | 1808ms |
| Spike | 4285ms | 4497ms |

**Nhận xét:** Error rate luôn 0% ở mọi kịch bản (kể cả 100 threads / Spike) — nhưng đây là do backend không có timeout/circuit breaker nên hệ thống degrade êm qua độ trễ (CancelOrder Max tăng gấp 173 lần từ Load lên Spike) thay vì trả lỗi. Bug phát hiện qua performance testing: **0**.

---

## 5. Types of Testing Performed

**a) Manual Functional Testing (Black-box)**
- Domain Testing / Equivalence Partitioning
- Boundary Value Analysis
- State Transition Testing
- Use Case Testing

**b) GUI Testing**
- Checklist-based testing (70 hạng mục, có AI hỗ trợ tạo checklist ban đầu, sinh viên bổ sung 3 hạng mục: keyboard-only navigation, hover state, zoom 200%)

**c) Usability Testing**
- Task-based evaluation với 7 participants ngoài lớp học
- System Usability Scale (SUS) — thang đo chuẩn hóa 10 câu

**d) Automation Testing**
- End-to-end UI automation bằng Playwright, cross-browser (Chromium, Firefox, WebKit)
- Data-driven testing (test data tách riêng theo file JSON)

**e) Performance Testing**
- Load Testing (5 threads, tải ổn định)
- Stress Testing (100 threads, ramp-up 20s)
- Spike Testing (100 threads, ramp-up 2s — mô phỏng flash-sale)
- Soak Testing (15 threads, 15 phút — kiểm tra memory leak / resource exhaustion)

---

## 6. Test Environment & Tools

| Hạng mục | Chi tiết |
|---|---|
| Backend | Node.js/Express + SQLite |
| Trình duyệt (Automation & GUI) | Chrome, Firefox, WebKit (qua Playwright) |
| OS | Windows 11 |
| Automation Framework | Playwright (TypeScript) |
| Performance Tool | Apache JMeter (kịch bản `.jmx`, kết quả `.jtl`) |
| Hỗ trợ AI | opencode — dùng để hỗ trợ sinh GUI checklist, thiết kế JMeter test plan, và phân tích kết quả hiệu năng (có Human Review đối chiếu lại với artifact thật) |
| Quản lý mã nguồn | Git — mỗi giai đoạn kiểm thử trên một nhánh riêng (`23127031`, `HW3-23127031`, `HW4-23127031`, `HW5-23127031`) |

---

## 7. Lessons Learned

- **AI hallucination trong phân tích hiệu năng:** Khi được yêu cầu phân tích số liệu JMeter, AI đã tự bịa ra chi tiết "staged ramp-up 5 giai đoạn" với số liệu SQLite lock queue depth cụ thể — hoàn toàn không có trong file `.jmx` thật. Bài học: luôn đối chiếu output phân tích của AI với artifact gốc trước khi tin.
- **AI suy diễn vượt quá dữ liệu thu thập được:** AI kết luận "hệ thống overload, không phục hồi kịp" từ việc RPS giảm ở cuối bài Spike test, trong khi thực chất chỉ vì test kết thúc, không có cửa sổ quan sát sau đỉnh tải.
- **Checklist do AI tạo tự động thường bỏ sót các hạng mục về khả năng tiếp cận (accessibility)** như điều hướng bằng bàn phím, hiệu ứng hover, và zoom 200% — cần bổ sung thủ công.
- **Error rate 0% không đồng nghĩa hệ thống an toàn:** backend không có timeout/circuit breaker khiến hệ thống "degrade êm" qua độ trễ thay vì trả lỗi rõ ràng khi quá tải — cần đọc metrics latency song song với error rate, không chỉ nhìn error rate.
- **Bug ở bước đầu luồng (Đăng ký) có tác động lan tỏa lớn nhất:** usability testing cho thấy 2 participant có điểm SUS thấp nhất đều là người gặp khó khăn rõ rệt nhất ở bước đăng ký — xác nhận rằng lỗi chặn ở đầu luồng ảnh hưởng trực tiếp đến cảm nhận usability tổng thể.

---

## 8. Recommendations

1. **Ưu tiên sửa các bug Critical trước khi Go Live:**
   - BUG-03 (FR-02): tài khoản bị khóa vĩnh viễn, không tự mở khóa sau 30s.
   - BUG-04 (FR-08): có thể sửa giá thanh toán ở client — lỗ hổng bảo mật nghiêm trọng, cần validate giá ở server-side.
   - BUG-07 (FR-14): danh mục rỗng vẫn được tạo — cần validate input bắt buộc.
   - BUG-02/HW3 & BUG-08/HW3 (GUI): thiếu trường Xác nhận mật khẩu, và mật khẩu hiển thị dạng plaintext (rủi ro bảo mật/riêng tư).
2. **Cải thiện luồng Đăng ký trước tiên** — đây là điểm nghẽn usability nghiêm trọng nhất (0/7 participant tự hoàn tất được).
3. **Bổ sung automation test cho FR-01 (Đăng ký)** — hiện automation mới bao phủ FR-02, FR-08, FR-14.
4. **Áp dụng đề xuất tối ưu hiệu năng đã được đánh giá khả thi:** SQLite WAL mode, DB Index, response caching, request timeout (để error rate phản ánh đúng tình trạng quá tải thay vì để độ trễ tăng vô hạn).
5. **Triển khai continuous performance testing** theo đề xuất trong `23127031_HW05_AI_Performance_090/docs/main_report.md`: bắt đầu bằng chạy Nightly + chỉ cảnh báo, sau khi hiểu rõ baseline nhiễu của môi trường CI mới chuyển sang chặn cứng.

---

## 9. Best Practices

- Sử dụng nhiều kỹ thuật thiết kế test case bổ trợ nhau (Domain Testing, Boundary Value Analysis, State Transition, Use Case Testing) cho cùng một chức năng (FR-02), giúp phát hiện các bug ở nhiều lớp (input validation, chuyển trạng thái, luồng nghiệp vụ).
- Data-driven testing: tách dữ liệu test ra file JSON/CSV riêng (test-data), giúp automation script và JMeter test plan dễ bảo trì, dễ mở rộng thêm case mới.
- Automation cross-browser (Chromium/Firefox/WebKit) giúp phát hiện được sự khác biệt hành vi giữa các trình duyệt (ví dụ FR-02 fail nhiều hơn ở cả 3 browser một cách nhất quán, củng cố độ tin cậy của bug thay vì nghi ngờ do môi trường).
- Luôn có bước **Human Review** đối chiếu output của AI với artifact gốc (file `.jmx`, code `server.js`) trước khi đưa vào báo cáo chính thức — phát hiện và loại bỏ được các trường hợp AI hallucination.
- Named convention nhất quán cho file test plan/kết quả (`23127031_Load_20260817.jmx`, `TC-AUTOMATION-FR-02-001.md`...) giúp truy vết dễ dàng giữa test case thiết kế, script thực thi, và báo cáo kết quả.

---

## 10. Exit Criteria

| Tiêu chí | Trạng thái |
|---|---|
| Tất cả test case đã thiết kế được thực thi? | **Có** — 25 manual TC (thực thi ghi nhận qua bug report), 70 GUI checklist (100% executed), 37 automation TC × 3 browsers = 117 lần chạy, 4 kịch bản performance |
| Không còn defect Critical/Blocker nào "OPEN"? | **Không đạt** — còn 3 bug Critical (BUG-03, BUG-04, BUG-07) và 1 bug Usability mức Blocker (BUG-US-01) chưa được xác nhận đã fix trong repo này |
| Pass rate automation đạt ngưỡng chấp nhận được? | **Không đạt đều** — FR-08 (83.3%) và FR-14 (89.7%) khá tốt, nhưng FR-02 chỉ đạt 57.1%, dưới ngưỡng thường được chấp nhận (≥ 90%) |
| Error rate performance trong ngưỡng cho phép? | **Đạt về mặt số liệu** (0.00% ở mọi kịch bản) — nhưng cần lưu ý đây là do thiếu timeout/circuit breaker, không hẳn là dấu hiệu hệ thống khỏe mạnh (xem mục 4.5, 7) |
| SUS score đạt benchmark ngành (68)? | **Không đạt** — 58.9/100, dưới benchmark |

---

## 11. Conclusion / Sign Off

Dựa trên các tiêu chí thoát (Exit Criteria) ở Mục 10, hệ thống **EShop hiện chưa đủ điều kiện đề xuất "Go Live"**.

Lý do chính:
- Còn tồn tại **3 bug mức Critical** chưa xác nhận đã khắc phục, trong đó có **1 lỗ hổng bảo mật nghiêm trọng** (BUG-04 — có thể chỉnh sửa giá thanh toán từ phía client).
- Tỷ lệ pass automation của FR-02 (Login) chỉ đạt 57.1%, thấp hơn nhiều so với 2 module còn lại.
- Điểm SUS (58.9/100) dưới benchmark ngành, với phát hiện nghiêm trọng: 0% participant tự hoàn tất được bước Đăng ký.

**Khuyến nghị:** Đội phát triển cần khắc phục các bug Critical (đặc biệt BUG-04 liên quan bảo mật thanh toán) và cải thiện luồng Đăng ký/Đăng nhập trước khi tiến hành một vòng kiểm thử hồi quy (regression) tiếp theo để đánh giá lại khả năng Go Live. Quyết định cuối cùng về việc "Go Live" thuộc về Ban Quản lý dự án/giảng viên sau khi cân nhắc các phát hiện nêu trên.

---

## 12. Definitions, Acronyms, and Abbreviations

| Từ viết tắt | Giải thích |
|---|---|
| FR | Functional Requirement — Yêu cầu chức năng |
| GUI | Graphical User Interface — Giao diện người dùng |
| SUS | System Usability Scale — Thang đo khả năng sử dụng hệ thống (0–100) |
| P1–P7 | Ký hiệu 7 participant tham gia usability testing |
| TC | Test Case — Trường hợp kiểm thử |
| RPS | Requests Per Second — Số request mỗi giây |
| p50 / p95 / p99 | Percentile 50/95/99 của thời gian phản hồi (latency) |
| JTL | JMeter Test Log — file log kết quả JMeter |
| SUT | System Under Test — Hệ thống đang được kiểm thử |
| WAL | Write-Ahead Logging — chế độ ghi log của SQLite giúp tăng hiệu năng ghi |
| CI | Continuous Integration — Tích hợp liên tục |
