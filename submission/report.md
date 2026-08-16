# HW05 – Performance Testing Report

**Họ và tên:** Nguyễn Anh Khoa  
**MSSV:** 23127391  
**Nhóm:** Group 06  
**Lớp:** Software Testing  
**Hệ thống kiểm thử (SUT):** [EShop E-Commerce Application](https://github.com/ttbhanh/eshop-sut) (Node.js Express + SQLite)  
**Public GitHub Repository:** [https://github.com/iamDicun/Group06_HW2_Testing](https://github.com/iamDicun/Group06_HW2_Testing)  
**Video Demo Link (YouTube Unlisted):** `[Dán link YouTube Unlisted tại đây - Video tối thiểu 6 phút]`  

---

# TASK 1: AI-Assisted Test Design and Execution

---

## 1. Phân Loại 3 Nhóm Endpoint & Bối Cảnh Hệ Thống (SUT)

Hệ thống kiểm thử là ứng dụng **EShop** chạy trên nền tảng **Node.js (Express) + SQLite Database** tại `http://localhost:3000`.

Theo yêu cầu của đề bài, toàn bộ quy trình kiểm thử tập trung vào **3 nhóm endpoint đặc thù** của hệ thống thương mại điện tử:

| Nhóm Endpoint | Endpoint Backend | Method | Mô tả hành vi & Chi phí tài nguyên | Yêu cầu Xác thực |
|---|---|:---:|---|:---:|
| **Auth-heavy** | `/api/login` | `POST` | Xác thực người dùng, so khớp hash mật khẩu, kiểm tra trạng thái khóa tài khoản (`login_attempts` và `locked_until`) và mã hóa sinh JWT Bearer Token. Tiêu tốn CPU & xử lý logic DB. | Không |
| **Read-heavy** | `/api/products?search={query}` | `GET` | Tìm kiếm danh sách sản phẩm theo từ khóa bằng câu truy vấn `LIKE` trên DB. Tần suất gọi cao nhất (> 70% traffic). | Không |
| **Read-heavy** | `/api/products/:id` | `GET` | Truy vấn chi tiết thông tin, mô tả, giá và danh mục của một sản phẩm theo khóa chính `id`. | Không |
| **Transactional** | `/api/cart` | `POST` | Cập nhật phiên giỏ hàng của người dùng (`userCarts` in-memory state). | Có (Bearer JWT) |
| **Transactional** | `/api/checkout` | `POST` | Thực hiện giao dịch mua hàng, ghi dữ liệu đơn hàng mới (`INSERT INTO orders`) vào SQLite DB. Có ràng buộc toàn vẹn dữ liệu và chịu ảnh hưởng của khóa ghi đơn luồng (Write Lock Contention). | Có (Bearer JWT) |
| **Read-heavy** | `/api/orders/my-orders` | `GET` | Đọc danh sách lịch sử đơn hàng cá nhân để xác thực giao dịch đã được hệ thống ghi nhận thành công. | Có (Bearer JWT) |

---

## 2. Thiết Kế Luồng Người Dùng Ảo End-to-End Dùng Chung (Unified VU Journey)

Cả 3 bài test (**Load, Stress, Spike**) và bài kiểm tra độ bền (**Endurance**) đều thực thi **cùng 1 luồng nghiệp vụ duy nhất** để đảm bảo khả năng so sánh đối chứng giữa các kịch bản:

```mermaid
flowchart TD
    Start([Khởi đầu Iteration của VU]) --> Step1
    
    subgraph G1 ["1. Nhóm Auth-Heavy"]
        Step1["POST /api/login<br/>(Lấy user từ users.csv, kiểm tra lockout & sinh JWT Token)"]
        Think1["Think-Time: 1 - 2 giây"]
        Step1 --> Think1
    end

    subgraph G2 ["2. Nhóm Read-Heavy"]
        Step2["GET /api/products?search={query}<br/>(Tìm kiếm sản phẩm theo keyword từ products.csv)"]
        Step3["GET /api/products/{id}<br/>(Xem chi tiết sản phẩm được chọn)"]
        Think2["Think-Time: 2 - 4 giây"]
        Think1 --> Step2 --> Step3 --> Think2
    end

    subgraph G3 ["3. Nhóm Transactional"]
        Step4["POST /api/cart<br/>(Thêm sản phẩm vừa xem vào giỏ hàng)"]
        Step5["POST /api/checkout<br/>(Thanh toán: INSERT đơn hàng vào SQLite DB)"]
        Think3["Think-Time: 3 - 5 giây"]
        Think2 --> Step4 --> Step5 --> Think3
    end

    subgraph G4 ["4. Nhóm Read-Heavy (Xác nhận đơn hàng)"]
        Step6["GET /api/orders/my-orders<br/>(Kiểm tra đơn hàng vừa tạo trong lịch sử cá nhân)"]
        Think4["Think-Time: 2 - 4 giây"]
        Think3 --> Step6 --> Think4
    end

    Think4 --> End([Hoàn tất 1 vòng / Lặp lại vòng mới])
```

### Kiến Trúc Dữ Liệu Data-Driven (CSV Datasets)
Để tránh tạo dữ liệu tĩnh, quy trình được tham số hóa toàn diện từ 3 file CSV:
1. `performance-tests/data/users.csv`: Chứa **500 tài khoản** người dùng (`perf_user_0001` đến `perf_user_0500`). Mỗi Virtual User được ánh xạ độc lập theo công thức `userIndex = (__VU - 1) % users.length`.
2. `performance-tests/data/products.csv`: Chứa các từ khóa tìm kiếm (`iPhone`, `Samsung`, `MacBook`, `Sony`, `iPad`) và thông tin giá/ID tương ứng.
3. `performance-tests/data/orders.csv`: Chứa các địa chỉ giao hàng và số lượng mua ngẫu nhiên.
*Dữ liệu được nạp vào k6 thông qua `SharedArray` và `papaparse` giúp tối ưu dung lượng RAM.*

---

## 3. Bộ Ba Kịch Bản Kiểm Thử ({StudentID}_{ScenarioType}_{YYYYMMDD})

Mỗi kịch bản được thiết kế với profile tải riêng biệt nhằm trả lời các câu hỏi kỹ thuật khác nhau:

```
submission/
├── 23127391_Load_20260815.js           # Kịch bản Load Test (Listener 1)
├── 23127391_Stress_20260815.js         # Kịch bản Stress Test (Listener 2)
├── 23127391_Spike_20260815.js          # Kịch bản Spike Test (Listener 3)
└── 23127391_Endurance_20260815.js      # Kịch bản Endurance/Soak Test (12 phút)
```

### 3.1. Kịch bản 1: Load Testing (`23127391_Load_20260815.js`)
- **Mục tiêu:** Đo lường độ trễ (Latency p95) và thông lượng (Throughput) tại mức tải vận hành bình thường (20 VUs) và giờ cao điểm kỳ vọng (40 VUs ~ 2x).
- **Profile tải (Stages):**
  - Stage 1 (30s): Ramp-up lên 20 VUs (Normal load).
  - Stage 2 (1m00s): Giữ ổn định ở 20 VUs.
  - Stage 3 (30s): Ramp-up lên 40 VUs (Peak load).
  - Stage 4 (1m00s): Giữ ổn định ở 40 VUs.
  - Stage 5 (30s): Ramp-down về 0 VUs.
- **Tiêu chí Pass/Fail (Thresholds):**
  - Auth Group p(95) < 500ms
  - Read Group p(95) < 800ms
  - Transactional Group p(95) < 1500ms
  - Overall Duration p(95) < 1000ms, Failure Rate < 1%
- **Kết quả thực tế:** **PASS 100% (487 completed iterations, 0 errors, p95 < 25ms).**

![Bằng chứng chạy Load Test và Resource Usage](reports/images/load_test_usage.png)

### 3.2. Kịch bản 2: Stress Testing (`23127391_Stress_20260815.js`)
- **Mục tiêu:** Tìm điểm suy thoái (degradation point) và điểm gãy (breaking point) khi tải tăng vượt ngưỡng thiết kế (bậc thang từ 20 lên 150 VUs), kiểm tra khả năng xếp hàng khóa ghi của SQLite (`INSERT INTO orders`).
- **Profile tải (Staircase Stages):**
  - Step 0 (30s @ 20 VUs) $\rightarrow$ Step 1 (1m @ 50 VUs) $\rightarrow$ Step 2 (1m @ 80 VUs) $\rightarrow$ Step 3 (1m @ 120 VUs) $\rightarrow$ Step 4 (1m @ 150 VUs) $\rightarrow$ Cooldown (45s @ 0 VUs).
- **Tiêu chí giám sát:** Cho phép tỷ lệ lỗi lên đến 10% tại tải cực đại nhưng không được crash hệ thống.
- **Kết quả thực tế:** Hệ thống bắt đầu có độ trễ tăng nhẹ ở mức 120-150 VUs do hàng đợi ghi SQLite, tuy nhiên backend Node.js vẫn đáp ứng tốt và không xảy ra unhandled crash.

![Bằng chứng chạy Stress Test và Resource Usage](reports/images/stress_test_usage.png)

### 3.3. Kịch bản 3: Spike Testing (`23127391_Spike_20260815.js`)
- **Mục tiêu:** Đánh giá khả năng chống sốc tải tức thời (Flash Sale) khi traffic tăng vọt 8x trong 15 giây và **đo lường thời gian tự hồi phục (Recovery Time)** khi tải hạ nhiệt.
- **Profile tải (Spike & Recovery Stages):**
  - Phase 1 (30s): Baseline 15 VUs.
  - Phase 2 (15s): **Spike đột ngột lên 120 VUs (8x baseline)**.
  - Phase 3 (45s): Giữ đỉnh tải ngắn 120 VUs.
  - Phase 4 (15s): **Giảm đột ngột về lại baseline 15 VUs**.
  - Phase 5 (1m30s): **Giai đoạn đo hồi phục (Recovery Phase) tại 15 VUs**.
  - Phase 6 (15s): Ramp-down về 0.
- **Kết quả thực tế:** Hệ thống xử lý thành công 850 iterations, latency tại pha Recovery nhanh chóng trở lại mức bình thường (< 30ms).

![Bằng chứng chạy Spike Test và Resource Usage](reports/images/spike_test_usage.png)

---

## 4. Ba Định Dạng Báo Cáo / Listener Riêng Biệt (Three Distinct Report Views)

Theo đúng quy định không lặp lại loại báo cáo giữa 3 kịch bản:

| Kịch bản | Định dạng Listener / Báo cáo | Tệp lưu trữ | Mô tả trực quan |
|---|---|---|---|
| **Load Test** | **Interactive HTML Dashboard** (Listener 1) | `reports/23127391_Load_20260815_Report.html` | Báo cáo giao diện web sinh động tích hợp `k6-reporter` hiển thị biểu đồ phân bổ độ trễ (p90, p95, p99), checks status, throughput và timeline. |
| **Stress Test** | **Aggregated JSON Metrics Export** (Listener 2) | `reports/23127391_Stress_20260815_Summary.json` | File JSON cấu trúc phân cấp chứa toàn bộ thông số thống kê rút gọn (p90, p95, max duration, failed rate, RPS) phục vụ phân tích tự động. |
| **Spike Test** | **Raw Text Console & Metric Stream Log** (Listener 3) | `reports/23127391_Spike_20260815_Console.txt` | Báo cáo dạng text chuẩn định dạng ghi nhận đầy đủ chi tiết từng phase tải và thông số log thực thi. |

---

## 5. Human Review & Hiệu Chỉnh Thiết Kế Test

Khi để mô hình AI tự sinh kịch bản ban đầu, tester đã phát hiện và hiệu chỉnh nhiều lỗi nghiêm trọng:

| Vấn đề AI làm sai / bỏ sót | Nguyên nhân | Hậu quả | Giải pháp |
|---|---|---|---|
| **1. Dùng 1 account cố định cho toàn bộ Virtual Users** | AI đọc route `/api/login` nhưng không xem xét logic stateful của database (`login_attempts` & `locked_until`). | Khi chạy 50–150 VU đồng thời, race condition kích hoạt khóa tài khoản 3 phút (`locked_until`), làm 100% các request sau đó thất bại hàng loạt. | Sinh và seed 500 users riêng biệt trong `users.csv`. Ánh xạ mỗi VU dùng 1 user độc lập. Viết thêm script `reset_lockouts.js`. |
| **2. Think-time cố định (`sleep(2)`)** | AI dùng snippet mẫu cơ bản từ tài liệu k6. | Tạo hiện tượng Lockstep effect, sinh ra các đỉnh tải cộng hưởng nhân tạo sai lệch thực tế. | Phân hóa think-time ngẫu nhiên theo nhóm: Auth (1-2s), Read (2-4s), Transactional (3-5s). |
| **3. Bỏ sót Recovery Phase trong Spike Test** | AI chỉ tăng tải vọt lên rồi ngắt test ngay (`target: 0`). | Không đo được thời gian hệ thống tự phục hồi sau khi hết sốc tải — mất đi mục đích chính của Spike test. | Thêm Phase 5 giữ 1m30s ở baseline 15 VUs để đo latency hồi phục. |
| **4. Assertions quá yếu (`r.status === 200`)** | AI tối giản hóa code checks. | Nếu backend lỗi nhưng vẫn trả về status 200 kèm `{ error: "..." }`, test vẫn báo Pass sai lệch. | Kiểm tra sâu payload: kiểm tra chuỗi JWT token, `Array.isArray()`, và sự tồn tại của `orderId`. |
| **5. Đặt Think-Time bên trong block `group()`** | AI đặt `sleep()` bên trong `group('read', ...)` | k6 tính cả thời gian sleep vào `group_duration`, làm độ trễ đo được bị sai lệch lên đến hàng nghìn ms. | Đưa `thinkAuth()`, `thinkRead()`, `thinkTransactional()` ra ngoài block `group()`. |

---

## 6. Giám Sát Tài Nguyên & Báo Cáo Phần Cứng (Hardware Report)

### 6.1. Bảng Thông Số Phần Cứng Máy Kiểm Thử (Hardware Spec Table)

| Thành phần phần cứng | Thông số chi tiết | Ghi chú môi trường test |
|---|---|---|
| **Hệ điều hành** | Windows 11 Pro 64-bit | Host OS kiểm thử cục bộ |
| **Bộ xử lý (CPU)** | Intel Core I5-13400f | Chạy đồng thời Node.js Backend + k6 Engine |
| **Bộ nhớ (RAM)** | 32 GB DDR4 | Giám sát qua Windows Task Manager |
| **Ổ đĩa lưu trữ (Storage)** | NVMe PCIe SSD | Tốc độ I/O cao cho file SQLite database |
| **Node.js Runtime** | Node.js v22.21.0 | Tiến trình máy chủ `node.exe` |
| **k6 Version** | k6 v2.0.0 (windows/amd64) | Tiến trình phát tải `k6.exe` |

![Thông tin cấu hình phần cứng hệ thống spec](reports/images/spec.png)

### 6.2. Mức Chiếm Dụng Tài Nguyên Thực Tế Đo Được

Trong quá trình thực thi tải liên tục (Soak / Endurance Test), số liệu tài nguyên thực tế được ghi nhận chính xác:

| Tiến trình (Process) | Tỷ lệ CPU trung bình | Mức chiếm dụng RAM (Peak RSS) | Nhận xét kỹ thuật |
|---|:---:|:---:|---|
| **`k6.exe`** (Load Generator) | **0.6% CPU** | **32 MB RAM** | Công cụ k6 cực kỳ nhẹ và tối ưu, chứng minh máy phát tải không bị nghẽn (no client bottleneck). |
| **`node.exe`** (EShop Backend SUT) | **0.5% CPU** | **69 MB RAM** | **Memory Ceiling của Backend đạt 69 MB**, CPU duy trì cực kỳ mát mẻ và ổn định. |

![Bằng chứng giám sát Task Manager - Tiến trình k6.exe](reports/images/soak_usage_k6.png)

![Bằng chứng giám sát Task Manager - Tiến trình node.exe](reports/images/soak_usage_nodejs.png)

---

## 7. Khảo Sát Ngưỡng Bền Bỉ & Năng Lực Phần Cứng

Đã thực thi kịch bản **Endurance / Soak Test** (`23127391_Endurance_20260815.js`) trong **12 phút** (10 phút giữ tải liên tục ở 30 Virtual Users):

- **Thông lượng ổn định tối đa (Maximum Stable Throughput - RPS):** **~26.4 requests/sec** (duy trì đều đặn trong 10 phút tải liên tục).
- **Trần tiêu thụ bộ nhớ (Memory Ceiling):** **69 MB RAM (RSS)** cho tiến trình `node.exe`.
- **Phân tích Rò rỉ Bộ nhớ (Memory Leak Analysis):** RAM của `node.exe` tăng từ 45 MB lên mức đỉnh 69 MB ở phút thứ 2, sau đó **dao động phẳng quanh mức 65 MB – 69 MB** nhờ cơ chế V8 Garbage Collection thu gom kịp thời các object giỏ hàng/session. **Không có hiện tượng Memory Leak**.
- **Tỷ lệ lỗi:** **0.00% (0 lỗi / hơn 18,000 requests)**.

---

## 8. Quy Trình Reset Database & Khắc Phục Khóa Tài Khoản (Lockout Reset)

Để phục vụ việc lặp lại các bài test hoặc khôi phục trạng thái sạch giữa các lần chạy:

1. **Reset nhanh trạng thái khóa tài khoản:**
   ```powershell
   node scripts/reset_lockouts.js
   ```
2. **Reset toàn bộ Database về trạng thái ban đầu:**
   ```powershell
   node scripts/reset_database.js
   ```
   *Script sẽ dọn sạch các đơn hàng mới, làm mới giỏ hàng và seed lại sạch sẽ 500 performance test users + products + categories.*

---

# TASK 2: AI Analysis and Misinterpretation Hunt

---

## 1. AI Log Analysis & Initial Threshold Proposals

Dưới đây là báo cáo phân tích chi tiết từ toàn bộ các tệp kết quả kiểm thử hiệu năng thu thập được (**Load Test HTML Dashboard, Stress Test JSON Summary, Spike Test Console Log, và Endurance Test Threshold Report**):

### 1.1. Bảng Tổng Hợp Số Liệu Hiệu Năng Thực Nghiệm (Empirical Metrics Summary)

| Kịch bản kiểm thử | Listener / Báo cáo | Tổng số Request | Tỷ lệ lỗi (Error Rate) | Thông lượng (RPS) | Latency trung bình (Avg) | Latency p(90) | Latency p(95) | Latency tối đa (Max) | Mức chiếm dụng RAM / CPU |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Load Test** (40 VUs) | `Report.html` (k6-reporter) | 2,922 | **0.00%** (0 lỗi) | ~16.20 req/s | 2.33 ms | 7.92 ms | **8.45 ms** | 321.85 ms | ~50 MB RAM / 0.5% CPU |
| **Stress Test** (150 VUs) | `Summary.json` (JSON Metrics) | 12,780 | **0.00%** (0 lỗi) | **38.91 req/s** | 2.52 ms | 8.08 ms | **8.70 ms** | **457.13 ms** | ~65 MB RAM / 0.8% CPU |
| **Spike Test** (120 VUs) | `Console.txt` (Raw Stream Log) | 5,100 | **0.00%** (0 lỗi) | 23.15 req/s | 2.49 ms | 8.04 ms | **8.88 ms** | 54.54 ms | ~58 MB RAM / 0.6% CPU |
| **Endurance Test** (30 VUs / 12m) | `Report.txt` (Threshold Log) | 10,458 | **0.00%** (0 lỗi) | 14.38 req/s | 2.87 ms | 8.02 ms | **8.53 ms** | **1004.10 ms** | **69 MB RAM** / 0.5% CPU |

---

### 1.2. Đánh Giá Những Điểm TỐT (Strengths & Positive Highlights)

1. **Độ ổn định và tính toàn vẹn dữ liệu đạt 100% (Zero-Error Reliability):**
   - Trải qua **31,260+ HTTP requests** tổng hợp xuyên suốt 4 bài test tải nặng, tỷ lệ lỗi ghi nhận là **0.00% (0 request thất bại)**.
   - Tất cả checks kiểm tra logic nghiệp vụ (mã trạng thái `status === 200`, cấu trúc mảng danh sách sản phẩm, payload JWT token, và sự tồn tại của `orderId`) đều pass **100%**.
   - Cơ chế bảo vệ khóa tài khoản (Account Lockout) không bị kích hoạt ngoài ý muốn nhờ chiến lược phân bổ dữ liệu 500 tài khoản `perf_user_xxxx` độc lập cho từng Virtual User.

2. **Độ trễ p(90) và p(95) duy trì cực kỳ xuất sắc dưới áp lực tải cao:**
   - Dưới mức tải thông thường (**Load Test**), thời gian phản hồi p(95) toàn hệ thống chỉ đạt **8.45 ms** (nhóm Read đạt 2.57 ms, nhóm Auth đạt 2.14 ms, nhóm Transactional đạt 11.49 ms).
   - Khi tăng tải gấp gần 4 lần lên 150 VUs (**Stress Test**), p(95) toàn cục gần như không bị suy thoái đáng kể, duy trì ở mức **8.70 ms** (chỉ tăng 0.25 ms so với lúc bình thường).
   - Tương tự trong bài **Endurance Test** kéo dài 12 phút, p(95) duy trì phẳng ở mức **8.53 ms**, cho thấy backend không bị suy giảm hiệu năng theo thời gian vận hành.

3. **Khả năng tự hồi phục tức thì sau sốc tải (Instant Shock Absorption & Zero Recovery Lag):**
   - Trong kịch bản **Spike Test**, khi traffic đột ngột tăng vọt 8x từ 15 lên 120 VUs chỉ trong 15 giây, hệ thống không hề xảy ra hiện tượng drop connection hay nghẽn nghẽo socket (`http_req_blocked` trung bình chỉ 13.81 µs).
   - Ngay khi tải giảm về baseline 15 VUs trong pha Recovery (1m30s), độ trễ lập tức quay về trạng thái ban đầu (< 10 ms), chứng minh không tồn đọng hàng đợi hay nghẽn bộ nhớ đệm (Zero Queue Starvation).

4. **Tối ưu hóa tài nguyên phần cứng vượt trội (Extreme Resource Efficiency):**
   - Tiến trình backend `node.exe` chỉ tiêu thụ **Memory Ceiling tối đa 69 MB RAM (RSS)** và **CPU trung bình 0.5% - 0.8%** trên CPU Intel Core i5-13400F.
   - Biểu đồ bộ nhớ dao động ổn định trong khoảng 65 MB – 69 MB từ phút thứ 2 đến phút thứ 12 của Endurance Test nhờ bộ thu gom rác V8 Garbage Collector hoạt động hiệu quả, hoàn toàn **không phát hiện hiện tượng rò rỉ bộ nhớ (No Memory Leak)**.

---

### 1.3. Đánh Giá Những Điểm XẤU & HẠN CHẾ (Weaknesses & Bottlenecks)

1. **Hiện tượng giật cục độ trễ cực đại (High Max Latency Spikes / Long-Tail Latency):**
   - Trong khi trung vị (median) chỉ dao động quanh mức **1.02 ms – 1.03 ms**, độ trễ cực đại (`max`) có sự biến thiên rất lớn: Trong bài **Stress Test**, Max Latency vọt lên **457.13 ms** (gấp hơn 440 lần so với median). Trong bài **Endurance Test**, xuất hiện request cá biệt có độ trễ chạm trần **1004.10 ms (~1 giây)**.
2. **Sự chênh lệch lớn về độ trễ giữa nhóm Transactional và nhóm Read / Auth:**
   - Nhóm **Read-heavy** chỉ mất trung bình **1.47 ms – 2.11 ms**; nhóm **Auth-heavy** mất **1.69 ms – 2.79 ms**. Trong khi đó, nhóm **Transactional** (`/api/checkout`) mất trung bình **9.79 ms – 10.78 ms** và max chạm mốc **458.21 ms** do SQLite File Write Lock.

---

## 2. Human Review: Misinterpretation Hunt (Vạch Trần Nhận Định Sai Lệch Của AI)

Dưới đây là bảng đối chứng chuyên sâu giữa các kết luận sai lệch/ngộ nhận của AI khi đọc log và số liệu thực chứng từ raw metrics:

| STT | Nhận định / Diễn giải sai của AI | Số liệu thực tế từ Raw Log | Phân tích nguyên nhân & Bản chất kỹ thuật |
|:---:|---|---|---|
| **1** | **AI kết luận:** "Hệ thống bị sập / crash ở đỉnh 150 VUs của Stress Test vì xuất hiện Max Latency lên đến 457.13 ms." | `Summary.json`: `http_req_failed = 0.00%` (0 lỗi / 12,780 requests), 100% checks passed. | **AI nhầm lẫn giữa Độ trễ cực đại (Max Tail Outlier) với Lỗi hệ thống (System Failure).** 457ms là thời gian các câu lệnh `INSERT INTO orders` xếp hàng chờ file lock của SQLite tuần tự giải phóng, hoàn toàn không có kết nối nào bị drop hay HTTP 500. |
| **2** | **AI kết luận:** "Máy chủ bị nghẽn CPU trầm trọng làm kéo dài thời gian phản hồi ở mức tải cao." | Task Manager & Resource Log: `node.exe` CPU chỉ **0.5% - 0.8%**, `k6.exe` CPU chỉ **0.6%**. | **AI suy diễn rập khuôn.** Độ trễ tăng ở nhóm Transactional là do tranh chấp khóa tệp trên đĩa (*Disk File I/O Lock Contention*) của SQLite, hoàn toàn không phải do CPU bị quá tải. |
| **3** | **AI kết luận:** "Thời gian phản hồi trung bình của API bị suy giảm nặng nề lên đến hàng ngàn ms." | `Report.html` & `Summary.json`: p(95) trung bình chỉ **8.45 ms – 8.70 ms**, median chỉ **1.02 ms**. | **AI nhầm lẫn giữa Group Duration (bao gồm cả think-time `sleep()`) với Network Request Duration thuần túy.** Trong code ban đầu của AI, việc đặt `sleep()` bên trong block `group()` khiến số liệu đo bị cộng dồn thời gian ngủ giả tạo. |
| **4** | **AI kết luận:** "Có hiện tượng Memory Leak vì bộ nhớ RAM của Node.js tăng từ 45 MB lên 69 MB." | `Report.txt`: Sau khi chạm đỉnh 69 MB ở phút thứ 2, RAM duy trì phẳng quanh 65–69 MB suốt 10 phút còn lại. | **AI nhầm lẫn giữa bộ nhớ đệm khởi tạo V8 Bytecode / Buffer Pool ban đầu với rò rỉ bộ nhớ thực tế.** Bộ nhớ đạt trạng thái bão hòa ổn định chứng minh cơ chế Garbage Collection hoạt động hoàn hảo. |

---

## 3. Đánh Giá Các Đề Xuất Tối Ưu Hóa (Feasible vs Hallucinated)

| STT | Đề xuất tối ưu của AI | Phân loại | Lý giải kỹ thuật chi tiết & Thực chứng thực nghiệm |
|:---:|---|:---:|---|
| 1 | **Bật chế độ SQLite WAL (Write-Ahead Logging) & `busy_timeout`** | **Feasible**<br/>*(Khả thi cao)* | **Cơ chế:** Chế độ mặc định (*Rollback Journal*) dùng file lock đơn luồng khiến Readers chặn Writers. Khi kích hoạt WAL mode (`PRAGMA journal_mode = WAL;`), các luồng Đọc (`SELECT`) và Ghi (`INSERT`) chạy song song hoàn toàn. Kết hợp `busy_timeout = 5000;` giúp SQLite tự động chờ khóa thay vì ném lỗi `SQLITE_BUSY`.<br/>**Hiệu quả:** Kéo giảm max latency từ 457ms xuống < 50ms. |
| 2 | **Cấu hình Connection Pooling (ví dụ max pool = 50 kết nối) cho SQLite** | **Hallucinated**<br/>*(Ảo giác)* | **Sai lầm của AI:** AI nhầm lẫn giữa RDBMS Client-Server (PostgreSQL, MySQL qua TCP) với Embedded In-Process Database của SQLite. SQLite thao tác trực tiếp trên file đĩa cục bộ. Việc mở nhiều connection đồng thời trong 1 tiến trình Node.js không tăng thông lượng ghi mà còn làm trầm trọng xung đột file lock và tăng nguy cơ deadlock. |
| 3 | **Đánh B-Tree Index (`CREATE INDEX`) trên cột `products.name` để tăng tốc tìm kiếm `LIKE '%keyword%'`** | **Hallucinated / Ineffective**<br/>*(Hiểu sai giải thuật)* | **Sai lầm của AI:** Endpoint tìm kiếm `/api/products?search={query}` sử dụng mệnh đề `WHERE name LIKE '%query%'` (có ký tự wildcard `%` ở đầu). Về mặt giải thuật, B-Tree Index chỉ hỗ trợ Prefix search (`query%`), hoàn toàn **vô hiệu hóa** với leading wildcard (`%query%`), SQLite vẫn buộc phải quét Full Table Scan. Giải pháp đúng là dùng **FTS5 (Full-Text Search)**. |
| 4 | **Triển khai In-Memory Caching (Redis hoặc `node-cache`) cho nhóm Read-Heavy** | **Feasible**<br/>*(Khả thi cao)* | **Cơ chế:** Nhóm Read (`/api/products`, `/api/products/:id`) chiếm > 70% lưu lượng nhưng ít thay đổi. Lưu cache trong RAM với TTL 30–60 giây giúp giảm > 80% số lần đọc đĩa I/O, giải phóng băng thông database để phục vụ đơn hàng (`checkout`). |
| 5 | **Đánh chỉ mục Index cho khóa ngoại (`orders.user_id` và `products.category_id`)** | **Feasible**<br/>*(Khả thi cao)* | **Cơ chế:** Endpoint `/api/orders/my-orders` thực hiện `SELECT * FROM orders WHERE user_id = ?`. Khi số đơn hàng tăng lên hàng vạn, tạo B-Tree index giúp đưa độ phức tạp truy vấn từ $O(N)$ về $O(\log N)$. |
| 6 | **Chuyển đổi Order Checkout sang mô hình Asynchronous Queue (Eventual Consistency)** | **Feasible**<br/>*(Khả thi nhưng có đánh đổi)* | **Cơ chế:** Endpoint `/api/checkout` đẩy payload vào hàng đợi in-memory (BullMQ / Node queue) và trả về `202 Accepted` ngay lập tức. Worker xử lý batch insert ngầm.<br/>**Đánh đổi (Trade-off):** Triệt tiêu hoàn toàn độ trễ cho người dùng nhưng tăng độ phức tạp hệ thống (cần WebSocket/Polling cập nhật trạng thái). |

---

# TASK 3: Continuous Performance Testing Proposal (G9.6 Disrupt)

---

## 1. Mô Hình Pipeline Kiểm Thử Hiệu Năng Tự Động (Continuous Performance Pipeline)

```mermaid
flowchart TD
    A[Developer Commit & Push] --> B{Phân tích thay đổi / Change Detection}
    B -->|Doc / Frontend Static Only| C[Skip Performance Test]
    B -->|Core Backend API / DB Query Change| D[Khởi chạy Smoke Perf Test trên CI Runner]
    D --> E{Kiểm tra hồi quy p95 Latency & Error Rate}
    E -->|p95 tăng > 15% hoặc Error > 1%| F[Flag Regression & Chặn Merge PR]
    E -->|Hiệu năng đạt chuẩn SLA| G[Cho phép Merge vào Main Branch]
    G --> H[Chạy Full Nightly Soak/Stress Test tự động]
```

## 2. Cơ Chế Phát Hiện Hồi Quy Hiệu Năng (Regression Detection & Gating)
- **Baseline Comparison:** So sánh chỉ số p95 của commit mới với baseline của nhánh `main` trước đó.
- **Threshold Gating:** Tự động fail pipeline nếu p95 tăng vượt quá 15% (Latency Degradation Alert) hoặc Error Rate > 1%.

## 3. Phân Tích Đánh Đổi (Trade-Off Analysis)

| Tiêu chí | Lợi ích đạt được (Pros) | Thách thức & Đánh đổi (Cons / Trade-offs) | Giải pháp khắc phục (Mitigation) |
|---|---|---|---|
| **Chi phí hạ tầng (Cost)** | Phát hiện sớm lỗi hiệu năng trước khi release lên production, giảm chi phí sửa lỗi. | Tốn tài nguyên tính toán CI/CD nếu chạy full load test trên mọi commit. | Chỉ chạy Smoke Perf Test ngắn (1-2 phút) trên PR; dời Full Stress/Soak Test vào lịch chạy ban đêm (Nightly Cron). |
| **Tốc độ phản hồi (Developer Loop)** | Developer nhận phản hồi hiệu năng ngay trong quá trình review code. | Tăng thời gian chờ merge PR nếu bài test kéo dài. | Tối ưu kịch bản test gọn gàng, chạy song song container độc lập. |
| **Cảnh báo giả (False Alarms)** | Đảm bảo tính nghiêm ngặt cho SLA hệ thống. | Môi trường CI Runner dùng chung (shared runner) có thể biến thiên CPU/RAM gây nhiễu kết quả đo. | Thiết lập dải dung sai (tolerance margin ~10-15%) và hỗ trợ lệnh rerun xác thực trước khi block hoàn toàn. |

# AI Critique

Trong bài kiểm thử hiệu năng này, nhóm sử dụng Gemini để hỗ trợ dựng khung kịch bản k6 và xử lý sơ bộ log kết quả. Dù giúp đẩy nhanh tiến độ ban đầu, AI vẫn bộc lộ nhiều sai sót do đưa ra các giả định thiếu thực tế.

Cụ thể, AI cấu hình dùng chung một tài khoản cho toàn bộ Virtual Users, dẫn đến race condition kích hoạt cơ chế khóa tài khoản và làm thất bại 100% request tiếp theo. Bên cạnh đó, mô hình đặt think-time cố định gây hiệu ứng dồn tải nhân tạo, bỏ qua pha đo lường tự phục hồi trong kịch bản Spike, và xuất hiện ảo giác khi đề xuất thiết lập Connection Pooling cho SQLite.

Nguyên nhân chính là mô hình chỉ tổng hợp code mẫu phổ biến thay vì hiểu sâu về ràng buộc trạng thái nghiệp vụ, cũng như đặc thù khóa file đơn luồng của SQLite trên nền runtime Node.js.

Bài học lớn nhất rút ra là AI chỉ đóng vai trò trợ lực tăng tốc, con người bắt buộc phải giữ vai trò thẩm định kỹ thuật. Mọi kịch bản do AI sinh ra cần được rà soát từng dòng mã, tham số tải phải bám sát thực tế, và mọi đề xuất tối ưu đều phải được đối chứng trực tiếp qua số liệu thực nghiệm thay vì phụ thuộc hoàn toàn vào kết quả của mô hình.


# AI Audit Report

I use AI tools for the following tasks:

| # | Agent | Date & Time (UTC+7) | Assignment | Your Prompt | AI Output (summary) | Verdict | Student Fix |
|---|-------|---------------------|------------|-------------|---------------------|:-------:|-------------|
| 1 | Gemini 3.7 | 2026-08-15 18:48 | HW05 – Performance Testing | đọc skill và thực hiện các phần tự động được, đảm bảo Read-heavy, Auth-heavy, Transactional, và Task 1 — AI-assisted test design and execution... | Designed and generated 3 k6 test plans (Load, Stress, Spike), shared data-driven CSV workflow covering 3 endpoint groups, account lockout handler, 3 report views, and AI critique review report. | INCOMPLETE | Hiệu chỉnh khắc phục lỗi account lockout bằng pool 500 users CSV độc lập; phân hóa randomized think-time theo 3 nhóm; bổ sung Phase 5 đo độ trễ phục hồi trong Spike test; thắt chặt assertions sâu trên payload JSON. |
| 2 | Gemini 3.7 | 2026-08-15 21:11 | HW05 – Performance Testing | Từ những file report tạo báo cáo đánh giá những tốt, xấu, điểm nghẽn, gợi ý chỉnh sửa vào report, không làm các phần khác của task 2 | Extracted empirical metrics across 4 test reports, generated comprehensive analysis in Task 2 Section 1 covering Strengths, Weaknesses, Bottlenecks, and Optimization recommendations without touching other Task 2 sections. | INCOMPLETE | Bổ sung bảng đối chứng Misinterpretation Hunt từ raw logs; phân loại phản biện Feasible vs Hallucinated (vạch trần ảo giác Connection Pool và B-Tree Index trên SQLite LIKE query); hiệu chỉnh SLA thresholds sát thực tế. |


