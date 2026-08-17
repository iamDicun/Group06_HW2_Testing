# HW05 — Performance Testing Report
**MSSV:** 23127031 | **Ngày:** 2026-08-16
**SUT:** eShop backend (Node.js/Express + SQLite)

---

# Task 1 — Thiết kế và Thực thi Test bằng AI (Load/Stress/Spike)

## 1. Phạm vi và luồng test

Luồng end-to-end được kiểm thử: **Login → ProductList → ProductDetail → AddToCart → Checkout → MyOrders → CancelOrder**, phủ đủ 3 nhóm endpoint theo yêu cầu đề bài:

| Nhóm | Endpoint |
|---|---|
| Auth-heavy | `POST /api/login` |
| Read-heavy | `GET /api/products`, `GET /api/products/:id`, `GET /api/orders/my-orders` |
| Transactional | `POST /api/cart`, `POST /api/checkout`, `PUT /api/orders/:id/cancel` |

Backend: Node.js/Express + SQLite (không connection pool thật, không timeout, không circuit breaker — đặc điểm này ảnh hưởng trực tiếp tới cách hệ thống thể hiện quá tải, xem mục 5).

## 2. Thiết kế và sinh test bằng AI

Sử dụng opencode, thiết kế qua 4 prompt tuần tự (chi tiết trong AI Audit Report):
1. Cấu hình CSV Data Set Config cho data-driven testing.
2. Cấu trúc luồng 7 sampler + correlation (token, orderId).
3. Tham số Thread Group cho Load/Stress/Spike.

Data-driven bằng 2 file CSV: `users.csv` (1 tài khoản test cố định), `products.csv` (5 sản phẩm id 1–5, lấy đúng dữ liệu seed thật từ `database.js`). 
Correlation dùng JSON Extractor lấy `token` (từ Login, path `$.token`) và `orderId` (từ Checkout, path `$.orderId`), gắn vào header `Authorization: Bearer` và path của 4 sampler downstream cần xác thực.

Đặt tên file đúng convention: `23127031_Load_20260817.jmx`, `23127031_Stress_20260817.jmx`, `23127031_Spike_20260817.jmx`.

## 3. Tham số 3 kịch bản

| Tham số | Load | Stress | Spike |
|---|---|---|---|
| Threads | 5 | 100 | 100 |
| Ramp-up | 10s | 20s | 2s |
| Loop Count | 3 | 5 | 2 |
| Timer (Gaussian) | 500ms ± 200ms | 500ms ± 200ms | 100ms ± 50ms |
| Listener (bắt buộc khác nhau) | Aggregate Report | Summary Report | View Results Tree |

**Giải thích**: Load mô phỏng traffic ổn định quy mô nhỏ (5 người dùng đồng thời). Stress dùng ramp-up cố định 20s trong khi tăng threads dần qua nhiều lần chạy thử (20→40→60→80→100) để cô lập đúng 1 biến — số lượng user đồng thời — quan sát xu hướng degrade mà không trộn lẫn hiệu ứng tốc độ dồn tải; kết quả cuối cùng chốt ở mức 100 threads vì đây là nơi thể hiện rõ nhất sự khác biệt so với Load mà chưa cần công cụ multi-stage phức tạp. Spike dùng ramp-up cực ngắn (2s cho 100 thread) tạo hiệu ứng tăng đột ngột kiểu flash-sale, think-time rút ngắn còn 100ms mô phỏng thao tác gấp gáp lúc cao điểm.

**Lưu ý về giới hạn công cụ**: Đề xuất ban đầu của AI có gợi ý dùng plugin Ultimate Thread Group (jp@gc) để tạo Stress test theo nhiều giai đoạn tăng dần tự động. Để tránh rủi ro cài đặt plugin ngoài, em quyết định **không dùng plugin này**, thay vào đó dùng Thread Group mặc định với 1 mức tải cố định cho mỗi lần chạy thử, chạy lại nhiều lần ở các mức threads khác nhau để tìm xu hướng — đơn giản hơn nhưng vẫn đáp ứng đúng mục tiêu của Stress test.

## 4. Kết quả (số liệu thật, trích từ file .jtl bằng script phân tích)

| Kịch bản | Threads | Samples | Duration | p50 | p95 | p99 | Error % | Avg RPS |
|---|---|---|---|---|---|---|---|---|
| Load | 5 | 105 | 20.2s | 4ms | 54.4ms | 88.6ms | 0.00% | 5.20 |
| Stress | 100 | 3500 | 54.0s | 460ms | 1188ms | 1485ms | 0.00% | 64.86 |
| Spike | 100 (ramp-up 2s) | 1400 | 20.6s | 648ms | 3250ms | 4268ms | 0.00% | 67.82 |
| Soak | 15 (15 phút) | 24716 | 899.9s | 22ms | 127ms | 208ms | 0.00% | 27.46 |

Chi tiết theo sampler (CancelOrder — sampler chậm nhất):

| Kịch bản | CancelOrder p95 | CancelOrder Max |
|---|---|---|
| Load | 26ms | 26ms |
| Stress | 1548ms | 1808ms |
| Spike | 4285ms | 4497ms |

## 5. Phát hiện chính

**Error rate luôn 0%, kể cả ở 100 threads / Spike** — nhưng đây **không đồng nghĩa hệ thống an toàn tuyệt đối**. Backend (Express + SQLite) không có timeout hay circuit breaker, nên khi quá tải, request không bị từ chối mà chỉ **xếp hàng chờ lâu hơn** — hệ thống degrade êm qua độ trễ thay vì qua error count. Đây là lý do CancelOrder Max tăng từ 26ms (Load) lên 4497ms (Spike) — gấp **173 lần** — trong khi Error % không nhúc nhích.

**Spike có độ trễ cao hơn Stress dù cùng 100 threads** (CancelOrder p95: 4285ms so với 1548ms, gấp ~2.8 lần). Nguyên nhân **thực sự đã xác nhận được**: ramp-up của Spike chỉ 2 giây so với 20 giây của Stress — cùng một lượng threads nhưng dồn vào nhanh hơn 10 lần khiến SQLite (chỉ cho phép 1 writer tại 1 thời điểm) và Node.js event loop (đơn luồng) phải xử lý dồn dập hơn nhiều.

**Soak test (15 phút, 15 threads) hoàn toàn ổn định**: RPS dao động hẹp 24.7–28.6, không có xu hướng giảm dần theo thời gian (phút 14 vẫn ~27.1 rps, gần bằng phút 2 ~28.6 rps) — không có dấu hiệu memory leak hay resource exhaustion tích luỹ. p95 chỉ 127ms, thấp hơn nhiều so với Stress/Spike.

**Kết luận endurance threshold**: mức tải bền vững trên phần cứng test là khoảng **27–28 RPS / 15 concurrent threads**, thấp hơn đáng kể so với breaking point quan sát ở 100 threads — hệ thống còn nhiều dư địa giữa mức "chạy ổn định lâu dài" và "điểm bắt đầu suy giảm rõ rệt".

## 6. Review và sửa lỗi AI trong lúc thiết kế test plan (Human Review)

| # | AI đề xuất/gợi ý | Vấn đề | Cách sửa |
|---|---|---|---|
| 1 | Đặt biến `base_url` (User Defined Variables) cho Server/Port | AI không biết em đã dựng sẵn HTTP Request Defaults (Server=localhost, Port=3000) từ trước — nếu làm theo sẽ bị xung đột/dư thừa cấu hình | Giữ nguyên HTTP Request Defaults đã có, bỏ đề xuất biến `base_url` |
| 2 | Gọi HTTP Header Manager là "Pre-Processor" | Sai tên nhóm thật trong JMeter — Header Manager thuộc **Config Element**, không phải Pre-Processor | Đặt đúng ở Config Element như JMeter GUI thật quy định |
| 3 | Không đề cập cụ thể CSV Data Set Config dù đề bài bắt buộc data-driven | Prompt 1 giới hạn phạm vi chỉ hỏi về cấu trúc luồng, AI không tự chủ động mở rộng | Tự thiết kế CSV riêng ở prompt khác, không phụ thuộc AI nhắc nhở |
| 4 | Đề xuất Stress test dùng plugin Ultimate Thread Group với 5 giai đoạn tăng dần | Tăng độ phức tạp, rủi ro cài đặt ngoài | Đơn giản hoá: chạy nhiều lần ở các mức threads cố định khác nhau bằng Thread Group mặc định |
| 5 | JSON Extractor có Default Value (`FAIL_NO_TOKEN`) nhưng không có assertion chặn test khi extract thất bại | Nếu extract lỗi, biến vẫn mang giá trị rác nhưng test không tự động fail | Thêm Response Assertion kiểm tra response chứa `"token"` ngay sau Login |

## 7. Xử lý account lockout

Không phát sinh lockout trong toàn bộ 3 kịch bản chính: CSV `users.csv` chỉ chứa 1 tài khoản với credentials chính xác, và cơ chế lockout của server (xác nhận qua code `server.js`) chỉ tăng biến đếm khi login **thất bại**, không liên quan tới số lượng request đồng thời. Do đó điều kiện "reset lockout giữa các run" trong đề bài không áp dụng cho phương pháp test này.

## 8. Bug phát hiện trong quá trình test: 0 bug

---

# Task 2 — AI Analysis and Misinterpretation Hunt

## 1. Prompt và tóm tắt AI Analysis

Cung cấp cho opencode số liệu thật trích từ 4 file `.jtl` (p50/p95/p99, error rate, throughput theo thời gian) của cả 4 kịch bản (Load/Soak/Stress/Spike). Prompt và output đầy đủ ghi trong AI Audit Report.

AI đưa ra: bảng threshold theo loại sampler (auth/read/transactional), danh sách tối ưu hoá xếp hạng theo độ khả thi với Node.js/Express/SQLite, và giải thích tại sao Spike có độ trễ cao hơn Stress dù cùng 100 threads.

## 2. Misinterpretation Review (Human Review)

| # | AI Claim | Sự thật từ log / config thật | Loại lỗi |
|---|---|---|---|
| 1 | Stress test dùng "staged ramp-up" 5 giai đoạn (10→20→30→40→50 threads mỗi 10s), kèm số liệu SQLite lock queue depth cụ thể (~3-5 đến ~50-80) | File `.jmx` thật dùng Thread Group đơn giản: 100 threads, ramp-up 20s duy nhất, không có giai đoạn nào (Ultimate Thread Group đã bị loại bỏ chủ động — xem Task 1 mục 3) | **Hallucination.** AI không có quyền truy cập file `.jmx`, tự tạo ra một cơ chế nghe hợp lý với số liệu bịa để giải thích đường cong throughput, thay vì nói rõ không đủ dữ liệu để xác định. |
| 2 | RPS giảm còn 0.3 ở cuối Spike nghĩa là "hệ thống overload, không phục hồi kịp" | Spike test chỉ dài 20.6s (2 loops × 100 threads); bucket cuối thấp vì **test đang kết thúc**, không có cửa sổ quan sát sau đỉnh tải để đánh giá phục hồi | **Suy diễn vượt quá dữ liệu.** Kết luận về "khả năng phục hồi" cần dữ liệu mà bài test này không thu thập được. |
| 3 | Bảng "Dự kiến kết quả sau tối ưu" với số liệu chính xác (CancelOrder p95: 4285ms → ~1200ms, "3.5x faster") | Không có tối ưu nào được áp dụng/đo thật; đây là ước lượng của AI trình bày với độ chính xác như dữ liệu đã đo | **Ngoại suy chưa kiểm chứng, trình bày như sự thật.** Hướng đi đúng (WAL/Index/Cache thực sự giúp SQLite) nhưng con số cụ thể là bịa. |

## 3. Đánh giá đề xuất tối ưu hoá của AI

| Đề xuất | Kết luận | Lý do |
|---|---|---|
| SQLite WAL mode | Khả thi | Giải quyết đúng bottleneck quan sát được: single-writer lock trên checkout/cancel. |
| DB Index (orders.user_id, products.category_id) | Khả thi | Khớp với pattern truy vấn thật trong `server.js`, rủi ro thấp. |
| Response caching (node-cache) | Khả thi | Hợp lý cho endpoint đọc nhiều (`/api/products`), độ phức tạp thấp phù hợp quy mô demo. |
| Request timeout | Khả thi | Giải quyết đúng nguyên nhân khiến error rate luôn 0% dù latency cao (đã xác định độc lập ở Task 1 mục 5). |
| Rate limiting | Khả thi, ưu tiên phụ | Không sửa latency trực tiếp nhưng giảm khả năng spike thật làm quá tải event loop đơn luồng. |
| "Connection pool" (better-sqlite3) | Đúng có điều kiện | SQLite không có khái niệm connection pool thật như Postgres/MySQL — write luôn serialize vào 1 file. AI tự gắn nhãn "phù hợp điều kiện" là chính xác. |
| PM2 Cluster mode | Từ chối đúng | Nhiều process cùng ghi 1 file SQLite làm tăng lock contention thay vì giảm — lý do AI đưa ra chính xác về mặt kỹ thuật. |
| Redis / Message Queue | Từ chối đúng | Thêm hạ tầng không cần thiết cho backend SQLite 1 file trên laptop cá nhân — phù hợp đúng quy mô bài tập. |

## 4. Kết luận Task 2

Bảng threshold và phần lớn đánh giá tối ưu hoá của AI dùng được ngay. Tuy nhiên phần "staged ramp-up" (mục 2, lỗi #1) là ví dụ rõ nhất về AI hallucination trong bài: chi tiết, có số liệu cụ thể, nghe rất thuyết phục, nhưng hoàn toàn bịa đặt — cảnh báo về việc không nên tin ngay các giải thích nghe hợp lý của AI mà không đối chiếu lại với artifact gốc (ở đây là file `.jmx`).
---

# Task 3 — Continuous Performance Testing Proposal

## 1. Mục tiêu

Đề xuất mô hình kiểm thử hiệu năng liên tục (continuous performance testing): thay vì chỉ chạy performance test 1 lần cho bài tập này, hệ thống tự động theo dõi commit, quyết định khi nào chạy test, và cảnh báo khi phát hiện hệ thống chậm đi (regression) so với trước.

## 2. Quyết định 1 — Tần suất chạy: Nightly (1 lần/đêm)

Thay vì chạy performance test theo từng commit riêng lẻ, hệ thống chạy **1 lần cố định mỗi đêm** (ví dụ 2h sáng), gộp tất cả thay đổi trong ngày lại kiểm tra 1 lần.

**Lý do chọn Nightly**: đơn giản để triển khai (chỉ cần đặt lịch cron, không cần logic phân tích diff phức tạp), không làm chậm quy trình merge PR trong ngày, tiết kiệm tài nguyên CI so với chạy mọi commit.

**Đánh đổi phải chấp nhận**: có độ trễ phát hiện — nếu 1 commit làm chậm hệ thống được push lúc 9h sáng, phải tới 2h sáng hôm sau mới phát hiện ra, trong lúc đó commit có thể đã được merge/deploy. Ngoài ra, vì nightly gộp toàn bộ commit trong ngày, khi phát hiện regression phải tự dò lại xem trong ~10-20 commit của ngày hôm đó, commit nào là thủ phạm — tốn thời gian điều tra hơn so với biết ngay theo từng commit.

## 3. Quyết định 2 — Xử lý khi phát hiện regression: Chặn cứng (có giai đoạn hiệu chỉnh)

Chọn hướng **tự động chặn merge/deploy** khi phát hiện p95 latency vượt ngưỡng so với baseline — không chỉ dừng ở mức cảnh báo, vì cảnh báo đơn thuần dễ bị bỏ qua nếu team đang bận, dẫn tới regression tích luỹ qua nhiều ngày mới bị xử lý.

**Rủi ro lớn nhất của chặn cứng — false alarm**: môi trường CI (máy ảo dùng chung tài nguyên) có độ nhiễu tự nhiên, đôi khi p95 cao hơn 10-15% chỉ vì máy đang bận việc khác, không phải do code mới thật sự chậm đi. Nếu chặn cứng ngay từ đầu mà chưa biết mức nhiễu bình thường của môi trường là bao nhiêu, rất dễ **chặn nhầm code tốt**, gây khó chịu và mất niềm tin của team vào hệ thống.

**Giải pháp triển khai theo 2 giai đoạn**:
- **Giai đoạn 1 (vài tuần đầu)**: chỉ cảnh báo (comment vào PR/nightly report), chưa chặn gì — mục đích là thu thập dữ liệu để biết mức dao động (nhiễu) bình thường của môi trường CI là bao nhiêu %.
- **Giai đoạn 2 (sau khi đã hiểu rõ baseline)**: chuyển sang chặn cứng, với ngưỡng được canh chỉnh dựa trên dữ liệu thật đã thu thập (ví dụ nếu nhiễu bình thường dao động ±10%, đặt ngưỡng chặn ở >20% để tránh false alarm), kèm cơ chế override thủ công cho trường hợp khẩn cấp (ví dụ cần deploy gấp bản vá bảo mật).

## 4. Flow chart

```
┌──────────────┐
│  Mỗi đêm      │
│  (2h sáng)    │
└──────┬───────┘
       │
       ▼
┌───────────────────────────────────┐
│  Gộp toàn bộ commit trong ngày      │
│  trên nhánh main, build bản mới     │
└──────┬─────────────────────────────┘
       │
       ▼
┌───────────────────────────────────┐
│  Chạy performance test tự động      │
│  (Load test rút gọn 2-3 phút,       │
│  luồng chính: Login→...→Cancel)     │
└──────┬─────────────────────────────┘
       │
       ▼
┌───────────────────────────────────┐
│  So sánh p95/error rate với         │
│  baseline (kết quả nightly hôm qua) │
└──────┬─────────────────┬───────────┘
       │ Regression        │ Trong ngưỡng
       │ (p95 tăng > X%     │ cho phép
       │ hoặc error > 0%)   │
       ▼                    ▼
┌─────────────────────┐  ┌──────────────────┐
│ GIAI ĐOẠN 1: cảnh báo │  │ Lưu kết quả làm    │
│ (Slack/email/report)  │  │ baseline mới cho    │
│                        │  │ ngày tiếp theo       │
│ GIAI ĐOẠN 2: chặn      │  └──────────────────┘
│ deploy bản build đêm   │
│ đó, giữ bản cũ chạy     │
│ (có override thủ công) │
└─────────────────────────┘
```

## 5. Bảng trade-off tổng hợp

| Vấn đề | Rủi ro nếu làm chặt (chạy nhiều/chặn cứng ngay) | Rủi ro nếu làm lỏng (chạy ít/chỉ cảnh báo) |
|---|---|---|
| **Chi phí CI & tốc độ team** | Chạy mỗi commit tốn tài nguyên runner, làm chậm feedback loop | Nightly có độ trễ phát hiện tới 1 ngày |
| **False alarm** | Chặn cứng ngay từ đầu (chưa biết mức nhiễu CI) dễ chặn nhầm code tốt, gây mất niềm tin | Chỉ cảnh báo mãi mãi dễ bị lờ đi, regression tích luỹ không ai xử lý |
| **Điều tra nguyên nhân** | — | Nightly gộp nhiều commit/ngày, khó xác định chính xác commit nào gây regression |
| **Bảo trì ngưỡng/baseline** | Ngưỡng đặt quá chặt gây chặn liên tục, không ai merge được | Baseline không cập nhật định kỳ gây báo động giả kéo dài |

**Kết luận đề xuất**: bắt đầu với Nightly + chỉ cảnh báo trong vài tuần đầu để hiệu chỉnh ngưỡng dựa trên dữ liệu thật, sau đó chuyển sang chặn cứng có override — cân bằng giữa việc bắt được regression thật và tránh làm gián đoạn team vì báo động giả.