# HW05 – Performance Testing (k6)

**Họ và tên:** Bùi Dương Duy Cường  
**MSSV:** 23127033  
**Repository (Branch 23127033-HW4-HW5):** https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW4-HW5  
**Demo Video (YouTube Unlisted):** https://youtu.be/OF2CyW1RrgY  

---

## 1. Self-Assessment Table (Bảng Tự Đánh Giá)

| No. | Criteria | Max Grade | Self-Assessed Grade |
| :-: | :--- | :-: | :-: |
| 1 | Task 1 – Load testing | 20 | 20 |
| 2 | Task 1 – Stress testing | 20 | 20 |
| 3 | Task 1 – Spike testing | 20 | 20 |
| 4 | Task 2 – AI analysis + misinterpretation hunt | 10 | 10 |
| 5 | Task 3 – Continuous Performance Testing proposal (G9.6) | 10 | 10 |
| 6 | Agent Skills | 10 | 10 |
| **Total** | | **100** | **100** |

---

## 2. Test Summary Report

- **Workflow Đã Test:** `Login (POST /api/login) -> View Profile (GET /api/users/me) -> Search Products (GET /api/products?search=) -> Apply Coupon (POST /api/apply-coupon) -> Add to Cart (POST /api/cart) -> Checkout (POST /api/checkout)`
- **Nhóm Endpoint Bao Phủ:**
  - **Auth-heavy:** `/api/login`, `/api/users/me`
  - **Read-heavy:** `/api/products?search=`
  - **Transactional:** `/api/apply-coupon`, `/api/cart`, `/api/checkout`
- **Kết Quả Đo Đạc Thực Tế:**
  - **Load Test (10 VUs):** Throughput: **51.17 req/s**, p95 Latency: **10.40 ms**.
  - **Stress Test (100 VUs):** Peak Throughput: **393.28 req/s**, p95 Latency: **130.64 ms**.
  - **Spike Test (80 VUs):** Peak Throughput: **300.93 req/s**, p95 Latency: **348.56 ms**.
- **Endurance Threshold:** Max Stable RPS = **84.56 req/s** (Duy trì ổn định 10 phút ở 15 VUs), Memory Ceiling = **< 85 MB RAM**.
- **Số lượng Bugs / Performance Issues:** 2 issues (`BUG-PERF-01-001` & `BUG-PERF-01-002`).
