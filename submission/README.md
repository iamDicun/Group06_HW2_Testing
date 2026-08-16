# HW05 – Performance Testing Submission Report

**Họ và tên:** Nguyễn Anh Khoa  
**MSSV:** 23127391  
**Nhóm:** Group 06  
**Lớp:** Software Testing  
**Hệ thống kiểm thử (SUT):** [EShop Demo Application](https://github.com/ttbhanh/eshop-sut) (Node.js Express + SQLite)  
**Public GitHub Repository:** [https://github.com/iamDicun/Group06_HW2_Testing](https://github.com/iamDicun/Group06_HW2_Testing)  

---

## 1. Self-Assessment Table (Bảng Tự Đánh Giá)

| No. | Criteria | Max Grade | Self-Assessed Grade | Ghi chú minh chứng |
|:---:|---|:---:|:---:|---|
| 1 | **Task 1 — Load testing** | 20 | **20** | Kịch bản 40 VUs, data-driven 500 users CSV, 0% error, báo cáo HTML Dashboard sinh động. |
| 2 | **Task 1 — Stress testing** | 20 | **20** | Kịch bản bậc thang 150 VUs, ghi nhận SQLite lock contention, báo cáo Aggregated JSON Metrics. |
| 3 | **Task 1 — Spike testing** | 20 | **20** | Kịch bản sốc tải 8x (120 VUs) trong 15s kèm Phase 5 đo hồi phục, báo cáo Stream Text Log. |
| 4 | **Task 2 — AI analysis + misinterpretation hunt** | 10 | **10** | Phân tích sâu số liệu empirical, vạch trần nhận định sai lệch từ raw logs, phân loại Feasible vs Hallucinated. |
| 5 | **Task 3 — Continuous Performance Testing proposal (G9.6)** | 10 | **10** | Mô hình CI/CD Smart Triggering, lưu đồ Mermaid, cơ chế p95 regression gating và phân tích đánh đổi. |
| 6 | **Agent Skills** | 10 | **10** | Skill tự động hóa `k6-performance-tester` và trích xuất `ai-audit-report` kèm prompt log đầy đủ. |
| **Tổng** | **Toàn bộ bài tập HW05** | **100** | **100** | Hoàn tất đầy đủ 100% các tiêu chí và minh chứng phần cứng. |

---

## 2. Test Summary Report (Tổng Kết Thực Nghiệm)

| Hạng mục tổng kết | Thông tin chi tiết & Số liệu thực nghiệm |
|---|---|
| **Các kịch bản đã thực thi (Scenarios Run)** | **4 kịch bản hoàn chỉnh:**<br/>1. **Load Test** (40 VUs peak, 2,922 requests, p95 = 8.45ms)<br/>2. **Stress Test** (150 VUs max, 12,780 requests, p95 = 8.70ms)<br/>3. **Spike Test** (120 VUs sốc tải 8x, 5,100 requests, p95 = 8.88ms)<br/>4. **Endurance / Soak Test** (30 VUs liên tục 12 phút, 10,458 requests) |
| **Các nhóm Endpoint bao phủ** | **Đầy đủ 3 nhóm chức năng cốt lõi (100% Unified VU Journey):**<br/>- **Auth-heavy:** `POST /api/login` (Xác thực JWT + xử lý lockout window)<br/>- **Read-heavy:** `GET /api/products`, `GET /api/products/:id`, `GET /api/orders/my-orders`<br/>- **Transactional:** `POST /api/cart`, `POST /api/checkout` (Ghi đơn hàng vào SQLite DB) |
| **Ngưỡng bền bỉ phần cứng (Endurance Threshold)** | **Số liệu đo thực nghiệm thực tế:**<br/>- **Maximum Stable Throughput (RPS):** **~26.4 requests/giây** (duy trì đều đặn suốt 10 phút tải liên tục)<br/>- **Trần tiêu thụ bộ nhớ (Memory Ceiling):** **69 MB RAM (RSS)** cho tiến trình `node.exe`<br/>- **Mức tiêu thụ CPU:** **0.5% - 0.8% CPU** (tiến trình cực nhẹ, tải không bị nghẽn)<br/>- **Tỷ lệ lỗi (Error Rate):** **0.00% (0 request thất bại / hơn 31,260 lượt gọi tổng hợp)** |
| **Số lượng Bug & Vấn đề Hiệu năng** | **0 Functional Crashes** (Hệ thống không phát sinh unhandled exception hay sập server).<br/>**1 Architectural Bottleneck Identified:** Hiện tượng thắt cổ chai đơn luồng SQLite Write Lock Contention ở nhóm Transactional (`/api/checkout`) làm Max Latency vọt lên 457ms - 1004ms khi chạy 150 VUs. |
| **Link Video Demo (Unlisted YouTube)** | `[Dán đường link YouTube Unlisted tại đây - Video tối thiểu 6 phút]` |

---

## 3. Cấu Trúc Thư Mục Gói Nộp (`submission/`)

```
submission/
├── README.md                                 # File báo cáo tổng kết & bảng tự chấm này
├── report.md                                 # Main Report chi tiết (Task 1, Task 2, Task 3, AI Critique)
├── report.pdf                                # Bản PDF chính thức của Main Report
├── ai_audit.md                               # AI Audit Report (Bảng khai báo tương tác AI)
├── ai_audit.pdf                              # Bản PDF của AI Audit Report
├── ai_critique.md                            # Đoạn văn phản biện AI Critique (200-300 words)
├── ai_critique.pdf                           # Bản PDF của AI Critique
├── prompt_log.md                             # Toàn bộ lịch sử prompt và phản hồi nguyên văn
├── git_log.txt                               # Text log toàn bộ commit lịch sử Git
├── git_log.md                                # Trình bày Markdown của commit log
├── 23127391_Load_20260815.js                 # Script k6 kịch bản Load Test
├── 23127391_Stress_20260815.js               # Script k6 kịch bản Stress Test
├── 23127391_Spike_20260815.js                # Script k6 kịch bản Spike Test
├── 23127391_Endurance_20260815.js            # Script k6 kịch bản Endurance Test
├── test-plans/                               # Thư mục chứa tài liệu đặc tả 3 Test Plan
│   ├── 23127391_Load_20260815_TestPlan.md
│   ├── 23127391_Stress_20260815_TestPlan.md
│   └── 23127391_Spike_20260815_TestPlan.md
├── data/                                     # Dữ liệu Data-Driven kiểm thử (CSV)
│   ├── users.csv                             # 500 tài khoản người dùng độc lập
│   ├── products.csv                          # Danh mục và từ khóa tìm kiếm
│   └── orders.csv                            # Dữ liệu giỏ hàng và địa chỉ giao hàng
├── scripts/                                  # Script bổ trợ và workflow
│   ├── k6-eshop-workflow.js                  # Shared VU journey module
│   ├── reset_lockouts.js                     # Script mở khóa tài khoản
│   └── reset_database.js                     # Script dọn dẹp và reset database sạch
└── reports/                                  # 3 Listener/Report views & bằng chứng thực thi
    ├── 23127391_Load_20260815_Report.html    # Listener 1: Interactive HTML Dashboard
    ├── 23127391_Stress_20260815_Summary.json # Listener 2: Aggregated Metrics JSON
    ├── 23127391_Spike_20260815_Console.txt   # Listener 3: Detailed Console Text Log
    ├── 23127391_Endurance_20260815_Report.txt# Báo cáo ngưỡng bền bỉ phần cứng
    ├── 23127391_Endurance_20260815_Summary.json
    └── images/                               # Ảnh chụp Resource monitor & Hardware spec
        ├── spec.png                          # Bảng cấu hình phần cứng máy test
        ├── load_test_usage.png               # Task manager khi chạy Load test
        ├── stress_test_usage.png             # Task manager khi chạy Stress test
        ├── spike_test_usage.png              # Task manager khi chạy Spike test
        ├── soak_usage_k6.png                 # Resource tiêu thụ của k6.exe
        └── soak_usage_nodejs.png             # Resource tiêu thụ của node.exe (69 MB)
```
