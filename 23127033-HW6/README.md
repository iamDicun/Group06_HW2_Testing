# HW06 – API Testing (Postman & Newman)

**Họ và tên:** Bùi Dương Duy Cường  
**MSSV:** 23127033  
**Nhóm:** Group 06  
**Phân công Feature (Theo README phân công nhóm):** 
* **Pool A:** `FR-03` (Forgot Password & Reset) — `POST /api/forgot-password`
* **Pool B:** `FR-09` (Discount Coupons) — `POST /api/apply-coupon`
* **Pool C:** `FR-18` (Order Management Admin) / `FR-15` (Product Management) — `PUT /api/admin/orders/:id/status`
* **Pool D:** `Mobile #3`
**Repository (Branch 23127033-HW6):** https://github.com/iamDicun/Group06_HW2_Testing/tree/23127033-HW6  
**Demo Video (Agent Skill & HW06 Testing):** https://youtu.be/q2iYMeq9mrg  

---

## 1. Self-Assessment Table (Bảng Tự Đánh Giá)

| No. | Criteria | Max Grade | Self-Assessed Grade |
| :-: | :--- | :-: | :-: |
| 1 | **API 1 (Pool A — `FR-03`: `POST /api/forgot-password`)** — full pipeline (generate 35 + audit + extend 5 + execute + bugs) | 30 | 30 |
| 2 | **API 2 (Pool B — `FR-09`: `POST /api/apply-coupon`)** — full pipeline (generate 35 + audit + extend 5 + execute + bugs) | 30 | 30 |
| 3 | **API 3 (Pool C — `FR-18`: `PUT /api/admin/orders/:id/status`)** — full pipeline (generate 35 + audit + extend 5 + execute + bugs) | 30 | 30 |
| 4 | **Agent Skills (AI-driven test generator — Level G9.5 Create)** | 10 | 10 |
| **Total** | | **100** | **100** |

---

## 2. Test Summary Report (Tổng Kết Kiểm Thử)

| Metric | API 1 (`FR-03`: `/api/forgot-password`) | API 2 (`FR-09`: `/api/apply-coupon`) | API 3 (`FR-18`: `/api/admin/orders/:id/status`) | Tổng Toàn Bài |
| :--- | :---: | :---: | :---: | :---: |
| **Pool Phân Loại** | Pool A (Auth & Password Reset) | Pool B (Cart & Discount Coupons) | Pool C (Web Admin & Order State) | **3 Pools** |
| **AI Test Cases Generated** | 35 | 35 | 35 | **105** |
| **Extended Test Cases (Tự Viết)** | 5 | 5 | 5 | **15** |
| **Tổng Số Test Cases Đã Thiết Kế** | 40 | 40 | 40 | **120** |
| **Test Cases Đã Chạy (Executed)** | 40 | 40 | 40 | **120** |
| **Passed Test Cases** | 40 | 38 | 38 | **116** |
| **Failed Test Cases (Genuine Bugs)** | 0 | 2 | 2 | **4** |
| **Số Lỗi Phát Hiện (Genuine Bugs)** | 0 | 1 (`BUG-API-03`) | 2 (`BUG-API-01`, `BUG-API-02`) | **3 Bugs** |

---

## 3. Cấu Trúc Thư Mục Dự Án HW06

```text
23127033-HW6/
├── 2026.HW06.API Testing_En.pdf
├── README.md                           # Bảng tự đánh giá & tổng kết test
├── main-report.md                      # Báo cáo chính chi tiết toàn bộ bài tập HW06
├── ai_audit.md                         # Bảng kiểm toán tương tác AI (AI Audit Report)
├── ai_critique.md                      # Báo cáo phê bình phản biện AI (200-300 từ)
├── prompt_log.md                       # Lịch sử các prompt đã sử dụng
├── git_commit_log.txt                  # Nhật ký các commit Git từng bước
│
├── api1-auth-forgot-password/          # [Pool A - FR-03] API POST /api/forgot-password
│   ├── test_cases_forgot_password.md   # 40 Test Cases (35 AI + Audit + 5 Extended)
│   ├── forgot_password.postman_collection.json # Postman Collection v2.1
│   └── reports/                        # Báo cáo kết quả Newman
│
├── api2-coupon-apply/                  # [Pool B - FR-09] API POST /api/apply-coupon
│   ├── test_cases_coupon.md            # 40 Test Cases (35 AI + Audit + 5 Extended)
│   ├── coupon.postman_collection.json  # Postman Collection v2.1
│   └── reports/                        # Báo cáo kết quả Newman
│
├── api3-admin-status/                  # [Pool C - FR-18] API PUT /api/admin/orders/:id/status
│   ├── test_cases_admin_order.md       # 40 Test Cases (35 AI + Audit + 5 Extended)
│   ├── admin_order.postman_collection.json # Postman Collection v2.1
│   └── reports/                        # Báo cáo kết quả Newman
│
├── agent-skill/                        # [10 Điểm] Reusable Agent Skill (G9.5 Create)
│   ├── SKILL.md                        # Đặc tả Agent Skill chuẩn
│   ├── architecture.md                 # Sơ đồ kiến trúc & luồng dữ liệu Mermaid
│   └── api_test_generator.py           # Mã nguồn thực thi Python độc lập
│
├── bugs/                               # Hồ sơ báo lỗi thực tế (Genuine Bugs)
│   ├── BUG-API-01-state-transition.md  # Lỗi chuyển trạng thái canceled -> delivered
│   ├── BUG-API-02-broken-access-control.md # Lỗi thiếu phân quyền role admin
│   └── BUG-API-03-coupon-discount-calculation.md # Lỗi tính discount coupon bị âm
│
├── ci-cd/                              # Minh chứng CI/CD Pipeline
│   ├── newman-api-test.yml             # File workflow GitHub Actions
│   ├── ci-pass.png                     # Ảnh minh chứng chạy Pass
│   └── ci-fail.png                     # Ảnh minh chứng chạy Fail
│
└── postman/
    └── local.postman_environment.json  # Environment chung (baseUrl, studentId)
```
