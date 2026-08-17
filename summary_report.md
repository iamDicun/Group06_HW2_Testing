# TEST SUMMARY REPORT

## EShop E-Commerce Platform — Báo cáo Tổng kết Kiểm thử Phần mềm

| | |
|---|---|
| **Hệ thống kiểm thử (SUT)** | EShop — nền tảng thương mại điện tử (demo) — `github.com/ttbhanh/eshop-sut` |
| **Người thực hiện** | Trần Quang Đạo — MSSV 21127498 |
| **Đơn vị** | Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (VNU-HCM) |
| **Môn học** | Kiểm thử Phần mềm (Software Testing) |
| **Giai đoạn kiểm thử** | Tháng 06/2026 – Tháng 08/2026 (HW02 – HW05) |
| **Ngày lập báo cáo** | 17/08/2026 |
| **Phiên bản** | 1.0 |

> Tài liệu tổng hợp từ 4 đợt bài tập kiểm thử: HW02 (Domain/State-Transition/Use-Case Testing), HW03 (GUI Usability Testing), HW04 (Automation Testing), HW05 (Performance Testing).

---

## Mục lục

1. [Mục đích Tài liệu](#1-mục-đích-tài-liệu-purpose-of-the-document)
2. [Tổng quan Ứng dụng](#2-tổng-quan-ứng-dụng-application-overview)
3. [Phạm vi Kiểm thử](#3-phạm-vi-kiểm-thử-testing-scope)
4. [Chỉ số Kiểm thử](#4-chỉ-số-kiểm-thử-metrics)
5. [Các Loại Kiểm thử đã Thực hiện](#5-các-loại-kiểm-thử-đã-thực-hiện-types-of-testing-performed)
6. [Môi trường & Công cụ Kiểm thử](#6-môi-trường--công-cụ-kiểm-thử-test-environment--tools)
7. [Bài học Kinh nghiệm](#7-bài-học-kinh-nghiệm-lessons-learned)
8. [Khuyến nghị](#8-khuyến-nghị-recommendations)
9. [Thực hành Tốt](#9-thực-hành-tốt-best-practices)
10. [Tiêu chí Hoàn thành](#10-tiêu-chí-hoàn-thành-exit-criteria)
11. [Kết luận / Ký duyệt](#11-kết-luận--ký-duyệt-conclusion--sign-off)
12. [Định nghĩa, Từ viết tắt](#12-định-nghĩa-từ-viết-tắt-definitions-acronyms-abbreviations)

---

## 1. Mục đích Tài liệu (Purpose of the Document)

Tài liệu này tổng hợp và trình bày kết quả của toàn bộ hoạt động kiểm thử phần mềm được thực hiện trên hệ thống **EShop** — một nền tảng thương mại điện tử dùng làm System Under Test (SUT) cho môn Kiểm thử Phần mềm — trải qua 4 đợt bài tập độc lập, áp dụng 4 nhóm kỹ thuật kiểm thử khác nhau: **thiết kế test case chức năng** (Domain Testing, Boundary Value Analysis, State Transition Testing, Use-Case Testing), **kiểm thử khả dụng** (GUI Usability Testing), **kiểm thử tự động hoá** (Automation Testing với Playwright), và **kiểm thử hiệu năng** (Performance Testing với k6).

Mục tiêu của báo cáo là cung cấp cho giảng viên/các bên liên quan một bức tranh tổng thể, khách quan về: những gì đã được kiểm thử, kết quả đạt được, các lỗi (bug) đã phát hiện, giới hạn còn tồn tại, và khuyến nghị cho các đợt kiểm thử tiếp theo.

---

## 2. Tổng quan Ứng dụng (Application Overview)

**EShop** là một nền tảng thương mại điện tử phiên bản demo dành cho mục đích giảng dạy kiểm thử phần mềm, bao gồm 4 thành phần độc lập:

| Thành phần | Công nghệ | URL mặc định |
|---|---|---|
| Backend API | Node.js + Express + SQLite | `http://localhost:3000` |
| Frontend Web (khách hàng) | React + Vite + Tailwind CSS | `http://localhost:5173` |
| Web Admin | React + Vite + Tailwind CSS | `http://localhost:5174` |
| Mobile App | React Native + Expo | IP LAN của máy chủ |

Hệ thống cung cấp các nghiệp vụ thương mại điện tử tiêu chuẩn: đăng ký/đăng nhập tài khoản (với cơ chế khoá tài khoản sau đăng nhập sai), quên/đặt lại mật khẩu qua OTP, tìm kiếm & xem chi tiết sản phẩm, giỏ hàng, mã giảm giá, thanh toán (checkout), quản lý trạng thái đơn hàng (state machine: `pending → confirmed → shipping → delivered`, hoặc `canceled`), cùng khu vực quản trị (Admin) cho quản lý danh mục, sản phẩm (kể cả import CSV hàng loạt), mã giảm giá, đơn hàng và người dùng.

---

## 3. Phạm vi Kiểm thử (Testing Scope)

### 3.1 Trong phạm vi (In-Scope)

- **Chức năng (Functional):** FR-01 Đăng ký tài khoản, FR-02 Đăng nhập & khoá tài khoản, FR-06 Xem chi tiết sản phẩm, FR-07 Giỏ hàng, FR-09 Mã giảm giá (Coupon), FR-10 Quản lý trạng thái đơn hàng (State Machine), UC-16 Import sản phẩm từ CSV (Admin).
- **Khả dụng (Usability):** Luồng "Thêm sản phẩm vào giỏ → áp mã giảm giá → thanh toán" trên Frontend Web, với 5 người dùng thật thuộc nhiều nhóm nhân khẩu học khác nhau.
- **Tự động hoá (Automation):** FR-01 Đăng ký tài khoản (đầy đủ, data-driven 12 kịch bản); FR-07 Giỏ hàng (đã thiết kế Page Object, chưa hoàn thiện thực thi).
- **Hiệu năng (Performance):** Toàn bộ Backend API theo luồng nghiệp vụ chính `Login → Product Search → Product Detail → Add to Cart → Checkout`, với 4 loại kiểm thử: Load, Stress, Spike, Endurance.

### 3.2 Ngoài phạm vi (Out of Scope)

- Kiểm thử ứng dụng Mobile App (React Native/Expo).
- Kiểm thử bảo mật chuyên sâu (penetration testing) — lỗ hổng SQL Injection tại `/api/products?search=` đã được ghi nhận nhưng **cố ý không khai thác** trong phạm vi các đợt kiểm thử này.
- Kiểm thử hiệu năng cho Frontend Web/Admin (chỉ kiểm thử Backend API).
- Kiểm thử tự động hoá đa trình duyệt (Firefox, WebKit) — mới thực thi trên Chromium.

### 3.3 Hạng mục chưa kiểm thử (Items Not Tested)

- Tự động hoá cho FR-07 (Giỏ hàng): Page Object (`CartPage`) đã được xây dựng dựa trên tài liệu đặc tả, nhưng các kịch bản kiểm thử (`test()`) tương ứng với 18 test case dữ liệu trong `cart.csv` **chưa được thực thi** — nhiều locator còn ở trạng thái `TODO(verify)`, cần xác nhận trên UI thật trước khi chạy.
- Điểm giới hạn tải thực sự (breaking point) của hệ thống ở Stress Test **chưa được xác định** — xem mục 7 và 8.
- Nguyên nhân gốc của 5 lỗi tại `/api/cart` trong Endurance Test chưa được điều tra đầy đủ.

---

## 4. Chỉ số Kiểm thử (Metrics)

| Chỉ số tổng quan | Giá trị |
|---|---|
| Test case chức năng được thiết kế (HW02) | 37 |
| Bug được xác nhận qua Usability Testing | 3 |
| Test case tự động hoá đã thực thi (FR-01) | 12 |
| Test Plan hiệu năng đạt Threshold (k6) | 4/4 |

### 4.1 Thiết kế Test Case Chức năng (HW02)

| Kỹ thuật | Đối tượng | Số test case / kịch bản |
|---|---|---|
| State Transition Testing | FR-10 — Order State Machine | 15 test case (5 valid transition + 10 invalid/0-switch) |
| Use-Case Testing | UC-16 — Import sản phẩm từ CSV | 6 kịch bản (1 main flow, 1 alternate flow, 4 exception flow) |
| Domain Testing / BVA | FR-01, FR-07, FR-12 (thiết kế, tài liệu riêng theo nhóm) | Không định lượng trong bản nộp cá nhân đính kèm |

### 4.2 GUI Usability Testing (HW03)

| Chỉ số | Giá trị |
|---|---|
| Số người tham gia (participants) | 5 (đa dạng độ tuổi & mức độ am hiểu IT) |
| Tỷ lệ hoàn thành task | 100% (cả 5 người đều hoàn thành được task) |
| Điểm UEQ-S — Pragmatic Quality (Tính thực dụng) | +0.80 (Trung bình / Neutral) |
| Điểm UEQ-S — Hedonic Quality (Tính kích thích) | −0.55 (Trung bình, thiên hướng tiêu cực) |
| Điểm UEQ-S — Overall | +0.125 (Trung lập) |
| Bug/Lỗi được xác nhận | 1 Critical, 1 Major, 1 Minor (chi tiết mục 5.2) |

### 4.3 Automation Testing (HW04)

| Chỉ số | Giá trị |
|---|---|
| Feature đã tự động hoá hoàn chỉnh | 1/2 (FR-01 Đăng ký — hoàn chỉnh; FR-07 Giỏ hàng — scaffold, chưa chạy) |
| Test case FR-01 (data-driven từ CSV) | 12 (2 Positive, 8 Negative, 2 Boundary/Edge case) |
| Kết quả lần chạy gần nhất (Chromium) | 11 pass / 1 fail |
| Trình duyệt đã thực thi | Chromium (Firefox, WebKit: chưa chạy) |

### 4.4 Performance Testing (HW05 — k6)

| Test Plan | VU đỉnh | Thời lượng | Tổng Requests | Error Rate (nghiệp vụ) | Kết quả Threshold |
|---|---|---|---|---|---|
| Load Test | 50 | ~9 phút | 15,140 | 0.00% | **PASS** |
| Stress Test | 800 (100→300→500→800) | ~23 phút | 521,265 | 0.00%* | **PASS** |
| Spike Test | 400 (baseline 10) | ~5.5 phút | 33,035 | 0.00%* | **PASS** |
| Endurance Test | 800 (giữ 14 phút) | ~14 phút | 263,500 | 0.00% (5 lỗi tại `/api/cart`) | **PASS** |

\* 12 lỗi ghi nhận trong mỗi lần chạy Stress/Spike đều thuộc scenario `lockout_probe` (cố ý đăng nhập sai để kiểm chứng bug khoá tài khoản) — không tính vào lỗi nghiệp vụ của `main_workflow`.

---

## 5. Các Loại Kiểm thử đã Thực hiện (Types of Testing Performed)

### 5.1 Thiết kế Test Case Chức năng (Domain / State Transition / Use-Case Testing) — HW02

Áp dụng kỹ thuật **State Transition Testing** cho FR-10 (Order State Machine): xây dựng sơ đồ trạng thái với 5 trạng thái (`pending, confirmed, shipping, delivered, canceled`), phân tích đầy đủ 5 transition hợp lệ và 10 transition không hợp lệ theo 0-switch coverage, bao gồm các ràng buộc quan trọng như quyền hạn theo vai trò (User không được huỷ đơn khi ở trạng thái `shipping`, trong khi Admin vẫn được phép) và ràng buộc Final State.

Áp dụng kỹ thuật **Use-Case Testing** cho UC-16 (Import sản phẩm từ CSV — chức năng Admin): thiết kế 6 kịch bản bao phủ main flow (import file hợp lệ), alternate flow (trường dữ liệu có dấu phẩy được bọc ngoặc kép theo RFC 4180) và 4 exception flow (sai định dạng file, thiếu header, dữ liệu lỗi cần rollback toàn bộ giao dịch, lỗi hệ thống trong quá trình import).

Các test case này ở giai đoạn **thiết kế** (test design), phục vụ làm cơ sở đầu vào cho các đợt thực thi kiểm thử tiếp theo (thủ công hoặc tự động hoá).

### 5.2 GUI Usability Testing — HW03

**Kịch bản kiểm thử:** "Thêm sản phẩm vào giỏ hàng, áp dụng mã giảm giá và tiến hành thanh toán", thực hiện với 5 người tham gia thật đại diện cho các nhóm người dùng khác nhau (người học/làm IT có và không học Testing, người trung niên, thanh thiếu niên), theo phương pháp **moderated think-aloud**, có ghi hình phiên kiểm thử.

**Kết quả định lượng (UEQ-S):** điểm Pragmatic Quality (+0.80) cho thấy người dùng đánh giá thao tác khá rõ ràng, dễ dùng ở mức trung bình; điểm Hedonic Quality (−0.55) cho thấy giao diện bị đánh giá đơn điệu, thiếu hấp dẫn; điểm Overall (+0.125) ở mức trung lập.

**Lỗi hệ thống/logic (Genuine Bug) xác nhận:**

| Mô tả | Mức độ | Trạng thái |
|---|---|---|
| Mã giảm giá `SAVE10` tính toán sai — với đơn hàng 580,000,000₫, hệ thống hiển thị "Tiết kiệm: −522,000,000₫" thay vì đúng 58,000,000₫ (10%) | **Critical (P0)** | Đã báo cáo lên GitHub Issue |

**Vấn đề thiết kế giao diện/trải nghiệm (Systemic Design Issue):**

| Mô tả | Mức độ | Đề xuất giải pháp |
|---|---|---|
| Nút "Thêm vào giỏ" không có phản hồi/thông báo trực quan (animation, toast) sau khi bấm | **Major (P1)** | Bổ sung Toast notification góc màn hình ngay sau khi thêm thành công |
| Thêm cùng một sản phẩm nhiều lần tạo nhiều dòng riêng biệt trong giỏ hàng thay vì cộng dồn số lượng | Minor (P2) | Gom nhóm (group by) sản phẩm theo ID và cộng dồn số lượng |

Cả 3 phát hiện đều đã được lập thành GitHub Issue kèm bằng chứng (screenshot/video recording phiên kiểm thử).

### 5.3 Automation Testing (Playwright) — HW04

**FR-01 — Đăng ký tài khoản:** tự động hoá hoàn chỉnh, data-driven từ `register.csv` với 12 test case (2 Positive, 8 Negative bao phủ các quy tắc mật khẩu mạnh/email/xác nhận mật khẩu, 2 Boundary/Edge case ở ngưỡng độ dài mật khẩu tối thiểu). Lần chạy gần nhất trên Chromium ghi nhận **1 lỗi**: test case `FR01-TC-003` (từ chối khi bỏ trống họ tên) kỳ vọng thông báo *"Mật khẩu quá yếu!"* nhưng hệ thống thực tế hiển thị *"Mật khẩu yếu!"* — chênh lệch do sai lệch giữa văn bản thông báo dự kiến trong test case và văn bản thực tế trên UI, cần cập nhật lại test case hoặc xác nhận với yêu cầu gốc.

**FR-07 — Giỏ hàng:** đã xây dựng Page Object Model (`CartPage`) và bộ dữ liệu `cart.csv` với 18 test case, nhưng các bước thực thi (`test()`) **chưa được viết/chạy** — nhiều locator được đánh dấu `TODO(verify)`, yêu cầu xác nhận thủ công trên UI thật (DevTools) trước khi hoàn thiện.

> **Trạng thái:** Automation Testing cho EShop đang ở giai đoạn **hoàn thành một phần (partial)** — 1/2 feature trong phạm vi đã có kết quả thực thi; ma trận đa trình duyệt (Chromium/Firefox/WebKit) theo yêu cầu đề bài chưa được thực hiện đầy đủ.

### 5.4 Performance Testing (k6) — HW05

Bốn loại kiểm thử hiệu năng được thực hiện trên Backend API (`server.js`, Node.js + SQLite), theo luồng nghiệp vụ chuẩn `Login → Product Search → Product Detail → Add to Cart → Checkout`, ánh xạ theo 3 nhóm endpoint: Auth-heavy (`/api/login`), Read-heavy (`/api/products`), Transactional (`/api/cart`, `/api/checkout`).

**a) Load Test (50 VU, giữ tải ~9 phút)**
Toàn bộ threshold đạt với biên độ rất lớn: p95 thực tế = **21.92ms** (threshold <500ms), p99 = **33.15ms** (threshold <1000ms), tỷ lệ lỗi 0.00%. Hệ thống phản hồi nhanh và ổn định ở mức tải kỳ vọng thông thường.

**b) Stress Test (100→300→500→800 VU theo bậc)**
Không có bậc tải nào (kể cả 800 VU) khiến hệ thống lỗi vượt threshold (`rate<0.10`, đạt 0.00%). Checkout là endpoint chậm nhất ở mọi mức tải (p95 = 4,762ms tại đỉnh) — phù hợp với giả thuyết nghẽn cổ chai do SQLite single-writer. **Điểm giới hạn tải thực sự (breaking point) chưa được xác định** trong phạm vi đã thử.

**c) Spike Test (baseline 10 VU → đỉnh 400 VU trong 15 giây)**
Đạt threshold (`rate<0.15`, đạt 0.00%). Thời gian phục hồi sau đỉnh (`post_spike_duration`) rất thấp (p95 = 32ms), cho thấy hệ thống phục hồi gần như tức thời, không có dấu hiệu memory leak hay giữ lại connection pool sau cú sốc tải.

**d) Endurance Test (800 VU, giữ tải liên tục 14 phút)**
Đạt threshold (`rate<0.05`, đạt 0.00%). Tuy nhiên latency có xu hướng **tăng dần theo thời gian dưới tải bền vững** so với cùng mức 800 VU trong Stress Test (checkout p95 tăng từ 4.76s lên 5.44s; login p95 tăng từ 3.58s lên 4.19s) — tín hiệu degradation cần theo dõi. 5 lỗi duy nhất trong toàn bộ 4 bài test đều xảy ra tại `/api/cart`, nghi ngờ liên quan đến cấu trúc `userCarts` lưu trong RAM phình to theo thời gian.

**e) Lockout Probe — Bằng chứng thực nghiệm cho bug đã biết**
Song song với Stress và Spike Test, scenario `lockout_probe` (3 VU độc lập, cố ý đăng nhập sai 3 lần) xác nhận bằng dữ liệu thực nghiệm: hệ thống khoá tài khoản sau **2 lần đăng nhập sai** (không phải 3 như đặc tả FR-02) và khoá trong **180 giây** (không phải 30 giây như tài liệu README) — đã được lập thành GitHub Issue riêng.

---

## 6. Môi trường & Công cụ Kiểm thử (Test Environment & Tools)

| Hạng mục | Chi tiết |
|---|---|
| SUT — Backend | Node.js + Express + SQLite, `http://localhost:3000` |
| SUT — Frontend Web | React + Vite + Tailwind CSS, `http://localhost:5173` |
| SUT — Web Admin | React + Vite + Tailwind CSS, `http://localhost:5174` |
| Thiết kế test case / quản lý bug | Markdown test case template, GitHub Issues (labels theo Type/Severity/Priority/Status/Module) |
| Kiểm thử tự động hoá | Playwright + TypeScript, dữ liệu ngoài (CSV) cho data-driven testing |
| Kiểm thử hiệu năng | k6 (script JavaScript, output JSON & HTML Dashboard, `--summary-export`) |
| Theo dõi tài nguyên hệ thống | PowerShell script tuỳ biến (`Get-CimInstance Win32_PerfFormattedData_PerfProc_Process`), log CPU/RAM 5 giây/mẫu, đối chiếu thủ công qua Task Manager |
| Khảo sát khả dụng | UEQ-S (User Experience Questionnaire — Short), Google Sheets/Forms |
| Trợ lý AI hỗ trợ kiểm thử | GitHub Copilot Agent (custom agents cho State Transition/Use-Case testing), Claude — có nhật ký tương tác (AI Audit Report) và đánh giá phản biện (AI Critique) đính kèm từng đợt bài tập |

---

## 7. Bài học Kinh nghiệm (Lessons Learned)

- **CPU thấp không đồng nghĩa hệ thống còn dư tải:** trong Performance Testing, chỉ số CPU gần 0% ở phần lớn thời gian gây hiểu nhầm là hệ thống chưa bị áp lực. Thực tế nghẽn cổ chai nằm ở I/O/lock của SQLite (thể hiện qua latency Checkout tăng cao dù CPU thấp) — bài học: cần đối chiếu nhiều chỉ số (latency theo endpoint, error rate, CPU/RAM) thay vì chỉ dựa vào một chỉ số duy nhất.
- **Script theo dõi tài nguyên cần gắn đúng PID:** phiên bản đầu của script PowerShell không gắn theo PID cụ thể nên đọc nhầm chỉ số CPU của tiến trình `node.exe` khác khi có nhiều tiến trình cùng tên — quá trình debug qua 3 lần lặp (từ `Get-Counter` không gắn PID → `Get-CimInstance` lọc theo PID → chuẩn hoá theo số lõi CPU) là một phần giá trị của phương pháp luận thu thập bằng chứng.
- **Stress Test chỉ hoàn thành mục tiêu khi tìm được breaking point:** việc hệ thống không lỗi ở 800 VU không có nghĩa là "hệ thống mạnh hơn dự kiến" — kết luận đúng đắn duy nhất khi chưa tìm được điểm giới hạn là "chưa xác định được giới hạn trong phạm vi tải đã thử".
- **Locator suy đoán từ tài liệu cần được xác nhận trên UI thật:** việc xây dựng Page Object (`CartPage`) chỉ dựa trên mô tả trong README (chưa mở DevTools xác nhận) tạo ra rủi ro locator sai — cần luôn đối chiếu với UI thực tế trước khi coi automation là hoàn chỉnh.
- **Định dạng output công cụ khác nhau cần xác nhận sớm với giảng viên:** k6 không tạo file `.jtl` (định dạng độc quyền của JMeter); `--out json` tạo raw log tương đương về vai trò nhưng khác cấu trúc lưu trữ — cần làm rõ ngay từ đầu liệu định dạng thay thế có được chấp nhận hay không, tránh phát sinh rủi ro về sau khi nộp bài.
- **Kiểm thử khả dụng với người dùng đa dạng bộc lộ vấn đề mà kiểm thử chức năng thuần tuý bỏ sót:** lỗi tính toán mã giảm giá SAVE10 (Critical) được phát hiện qua quan sát hành vi người dùng thật trong lúc thanh toán, không phải qua kiểm thử chức năng riêng lẻ.

---

## 8. Khuyến nghị (Recommendations)

1. **Hoàn thiện Automation cho FR-07 (Giỏ hàng):** xác nhận toàn bộ locator còn đánh dấu `TODO(verify)` qua DevTools trên UI thật, viết thân các `test()` tương ứng với 18 test case trong `cart.csv`, và chạy trên đủ 3 trình duyệt (Chromium, Firefox, WebKit) theo đúng yêu cầu đề bài.
2. **Sửa lại thông báo lỗi trong test case FR01-TC-003** (hoặc xác nhận với đặc tả gốc) để văn bản kỳ vọng khớp với văn bản thực tế trên UI ("Mật khẩu yếu!" thay vì "Mật khẩu quá yếu!"), tránh false negative khi chạy CI/CD.
3. **Chạy thêm 1–2 bậc tải cao hơn cho Stress Test** (ví dụ 1200, 1600 VU) hoặc đến khi tài nguyên máy chạy k6 (không phải server) trở thành giới hạn, nhằm thu hẹp khoảng chưa xác định về breaking point thực sự của hệ thống.
4. **Điều tra nguyên nhân gốc của 5 lỗi tại `/api/cart`** trong Endurance Test, đặc biệt giả thuyết liên quan đến cấu trúc `userCarts` lưu trong RAM phình to theo thời gian dưới tải bền vững kéo dài.
5. **Ưu tiên khắc phục bug Critical (mã giảm giá SAVE10)** trước khi tiếp tục các đợt kiểm thử khác, vì đây là lỗi ảnh hưởng trực tiếp đến tính đúng đắn của giao dịch tài chính.
6. **Xác nhận với giảng viên về định dạng báo cáo hiệu năng** (k6 JSON/HTML thay cho `.jtl`/HTML report folder của JMeter) trước khi nộp bài chính thức, để tránh rủi ro không được chấp nhận về mặt định dạng dù nội dung đầy đủ.
7. **Bổ sung threshold latency riêng cho Load Test** theo 3 nhóm endpoint (Auth-heavy, Read-heavy, Transactional) như đề xuất ở báo cáo hiệu năng, thay vì dùng một ngưỡng chung cho toàn hệ thống.

---

## 9. Thực hành Tốt (Best Practices)

- Sử dụng dữ liệu kiểm thử ngoài (external CSV) cho toàn bộ test case data-driven (Register, Cart, Load Test workflow) — giúp tách biệt logic kiểm thử khỏi dữ liệu, dễ mở rộng thêm case mới mà không sửa mã nguồn kịch bản.
- Phân loại rõ lỗi nghiệp vụ (`main_workflow`) và lỗi cố ý phát sinh từ kịch bản kiểm thử bảo mật/nghiệp vụ khác (`lockout_probe`) trong cùng một lần chạy k6, tránh làm sai lệch số liệu error rate tổng thể.
- Ghi lại đầy đủ nhật ký tương tác với công cụ AI hỗ trợ (AI Audit Report, AI Critique) cho từng đợt bài tập, tạo minh bạch về việc AI được dùng ở đâu và người thực hiện đã phản biện/xác minh kết quả AI như thế nào.
- Kết hợp nhiều nguồn bằng chứng cho kiểm thử khả dụng: video ghi hình phiên kiểm thử, khảo sát định lượng UEQ-S, và quan sát định tính — giúp phân biệt "Genuine Bug" (lỗi hệ thống) với "Systemic Design Issue" (vấn đề thiết kế trải nghiệm) một cách có căn cứ.
- Đối chiếu nhiều lần chạy (Stress vs. Endurance ở cùng mức 800 VU) để phát hiện tín hiệu degradation theo thời gian mà một lần chạy đơn lẻ không thể bộc lộ.

---

## 10. Tiêu chí Hoàn thành (Exit Criteria)

| Tiêu chí | Trạng thái |
|---|---|
| Tất cả test case chức năng đã thiết kế được thực thi ít nhất 1 lần | **MỘT PHẦN** — HW02 mới ở giai đoạn thiết kế, chưa có kết quả thực thi thủ công đầy đủ |
| Tất cả lỗi Critical/Major đã được xác minh và đóng | **CHƯA ĐẠT** — 1 Critical (SAVE10) và 1 Major (thiếu phản hồi "Thêm vào giỏ") đang ở trạng thái mở, chờ khắc phục |
| Lỗi mức Trivial còn mở có kế hoạch hành động rõ ràng | **ĐẠT** — bug Minor (không cộng dồn số lượng) đã có đề xuất giải pháp cụ thể |
| Toàn bộ Test Plan hiệu năng đạt threshold cấu hình | **ĐẠT** — 4/4 Test Plan (Load, Stress, Spike, Endurance) đạt threshold |
| Automation Testing bao phủ toàn bộ feature trong phạm vi | **CHƯA ĐẠT** — 1/2 feature (FR-01) hoàn chỉnh; FR-07 còn ở dạng scaffold |

> Vì còn 2 lỗi mức Critical/Major đang mở và Automation Testing chưa hoàn thiện, hệ thống **chưa đáp ứng đầy đủ Exit Criteria để đề xuất "Go Live"** ở thời điểm lập báo cáo. Khuyến nghị hoàn tất các hạng mục ở mục 8 trước khi tiến hành vòng kiểm thử chấp nhận (UAT) tiếp theo.

---

## 11. Kết luận / Ký duyệt (Conclusion / Sign-off)

Qua 4 đợt kiểm thử áp dụng các kỹ thuật khác nhau (thiết kế test case chức năng, kiểm thử khả dụng, kiểm thử tự động hoá, kiểm thử hiệu năng), hệ thống EShop cho thấy **nền tảng backend ổn định về mặt hiệu năng** (không có lỗi hệ thống ở bất kỳ mức tải nào đã thử, kể cả 800 VU đồng thời), nhưng còn **một số lỗi nghiệp vụ và trải nghiệm người dùng cần khắc phục** trước khi có thể coi là sẵn sàng cho môi trường sản xuất, đặc biệt là lỗi Critical trong tính toán mã giảm giá.

Theo Exit Criteria ở mục 10, hệ thống **chưa đủ điều kiện đề xuất "Go Live"**. Cần hoàn tất khắc phục bug Critical/Major, hoàn thiện automation cho FR-07, và làm rõ điểm giới hạn tải thực sự trước khi tiến hành vòng kiểm thử chấp nhận tiếp theo.

<br>

| | |
|---|---|
| _______________________________ | _______________________________ |
| **Người thực hiện kiểm thử** | **Giảng viên / Người xét duyệt** |
| Trần Quang Đạo — 21127498 | |

---

## 12. Định nghĩa, Từ viết tắt (Definitions, Acronyms, Abbreviations)

| Thuật ngữ | Giải thích |
|---|---|
| SUT | System Under Test — hệ thống đang được kiểm thử (EShop) |
| FR | Functional Requirement — yêu cầu chức năng |
| UC | Use Case — kịch bản sử dụng |
| VU | Virtual User — người dùng ảo, đơn vị đo tải trong k6 |
| BVA | Boundary Value Analysis — kỹ thuật phân tích giá trị biên |
| UEQ-S | User Experience Questionnaire — Short — bộ khảo sát trải nghiệm người dùng rút gọn |
| p95 / p99 | Percentile thứ 95 / 99 của độ trễ (latency) — 95%/99% request có độ trễ thấp hơn hoặc bằng giá trị này |
| Threshold | Ngưỡng đạt/không đạt được cấu hình sẵn trong kịch bản kiểm thử hiệu năng (k6) |
| main_workflow / lockout_probe | Hai scenario song song trong kịch bản k6: luồng nghiệp vụ chính và luồng cố ý kiểm chứng bug khoá tài khoản |
| Breaking Point | Điểm tải mà tại đó hệ thống bắt đầu suy giảm hiệu năng hoặc phát sinh lỗi vượt threshold |
| Page Object Model | Mẫu thiết kế trong kiểm thử tự động hoá, đóng gói locator và hành vi của một trang/thành phần UI vào một class riêng |

---

*— Hết báo cáo —*
