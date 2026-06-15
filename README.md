# Group 06 — HW02: Domain Testing

**Course:** Software Testing  
**SUT:** [EShop](https://github.com/ttbhanh/eshop-sut) — Vietnamese e-commerce demo  
**Assignment:** Individual (each student submits their own `<MSSV>_HW02_AI_DomainTesting_<Grade>.zip`)

---

## Feature Pools

### Pool A — Authentication, Categories, Products (chọn 1)
| FR | Feature | Module Code |
|----|---------|-------------|
| FR-01 | Account Registration | `REGISTER` |
| FR-02 | Login & Account Lockout | `LOGIN` |
| FR-03 | Forgot Password & Reset | `FORGOT_PW` |
| FR-04 | Personal Profile Management | `PROFILE` |
| FR-05 | Product Listing & Search | `PROD_SEARCH` |
| FR-06 | Product Detail View | `PROD_DETAIL` |

### Pool B — Shopping Cart & Checkout (chọn 1)
| FR | Feature | Module Code |
|----|---------|-------------|
| FR-07 | Shopping Cart | `CART` |
| FR-08 | Checkout | `CHECKOUT` |
| FR-09 | Discount Coupons | `COUPON` |
| FR-10 | Order State Machine | `ORDER_STATE` |
| FR-11 | Order History View | `ORDER_HIST` |

### Pool C — Web Admin (chọn 1)
| FR | Feature | Module Code |
|----|---------|-------------|
| FR-12 | Access Control | `ACCESS_CTRL` |
| FR-13 | Dashboard | `DASHBOARD` |
| FR-14 | Category Management (CRUD) | `CATEGORY` |
| FR-15 | Product Management (CRUD) | `PROD_MGMT` |
| FR-16 | Product Import from CSV | `PROD_IMPORT` |
| FR-17 | Coupon Management (CRUD) | `COUPON_MGMT` |
| FR-18 | Order Management (Admin) | `ORDER_MGMT` |
| FR-19 | User Management (Admin) | `USER_MGMT` |

### Pool D — Mobile App (chọn 1)
| Feature | Module Code |
|---------|-------------|
| Mobile Feature (to be identified from SUT) | `MOBILE` |

---

## Feature Assignment (5 Members)

> Mỗi người chọn 4 feature (mỗi pool 1 feature). Không trùng trong nhóm.

| Member | MSSV | Pool A | Pool B | Pool C | Pool D |
|--------|------|--------|--------|--------|--------|
| Member 1 | `MSSV` | FR-01 (Register) | FR-07 (Cart) | FR-12 (Access Ctrl) | Mobile #1 |
| Member 2 | `MSSV` | FR-02 (Login) | FR-08 (Checkout) | FR-14 (Category) | Mobile #2 |
| Member 3 | `MSSV` | FR-03 (Forgot PW) | FR-09 (Coupon) | FR-15 (Product Mgmt) | Mobile #3 |
| Member 4 | `MSSV` | FR-04 (Profile) | FR-10 (Order State) | FR-16 (Prod Import) | Mobile #4 |
| Member 5 | `MSSV` | FR-05 (Prod Search) | FR-11 (Order History) | FR-17 (Coupon Mgmt) | Mobile #5 |

**Unassigned (backup):** FR-06, FR-13, FR-18, FR-19

> Cập nhật MSSV và điều chỉnh feature nếu cần. Đảm bảo không feature nào bị trùng giữa 2 thành viên.

---

## Thư mục làm việc chung

```
Group06_HW2_Testing/
├── README.md                           # File này
├── .gitignore
├── docs/                               # Tài liệu chung (PDF assignment, etc.)
├── templates/                          # Template dùng chung
│   ├── test-case-template.md           # Mẫu 1 test case
│   ├── bug-report-template.md          # Mẫu 1 bug report (quản lý trên GitHub Issues)
│   └── test-run-template.md            # Mẫu test run report
├── tests/
│   ├── test-cases/                     # Mỗi feature 1 folder
│   │   ├── FR-01-Register/
│   │   ├── FR-02-Login/
│   │   └── ...
│   ├── test-runs/                      # Kết quả chạy test (mỗi người 1 file)
│   └── test-summary/
│       └── traceability-matrix.md      # Ma trận truy vết (cả nhóm cùng cập nhật)
├── shared/
│   └── agent-skills/                   # Agent Skills dùng chung (cả nhóm cùng build)
└── .github/
    └── ISSUE_TEMPLATE/
        └── bug-report.md               # Template GitHub Issue cho bug report
```

---

## GitHub Issue Labels

Tạo các labels sau trên GitHub repo để quản lý bug:

| Prefix | Labels |
|--------|--------|
| **Type** | `type: bug`, `type: test-case`, `type: enhancement` |
| **Severity** | `severity: blocker`, `severity: critical`, `severity: major`, `severity: minor`, `severity: trivial` |
| **Priority** | `priority: P0`, `priority: P1`, `priority: P2`, `priority: P3` |
| **Status** | `status: new`, `status: triaged`, `status: in progress`, `status: ready for retest`, `status: verified` |
| **Module** | `module: login`, `module: cart`, `module: checkout`, `module: admin`, `module: api` |

---

## Requirements Checklist (cho mỗi feature)

Mỗi feature phải có đầy đủ:

- [ ] **Domain Testing** report (step-by-step với AI)
- [ ] **Boundary Value Analysis** report (step-by-step với AI)
- [ ] **AI Gap Analysis** (những gì AI bỏ sót)
- [ ] **Bug Reports** (Markdown + GitHub Issues + screenshots)
- [ ] **Test Cases** trong folder tương ứng
- [ ] **Git commit log** (text file)
- [ ] **AI Audit Report** + **AI Critique** (200-300 words)
- [ ] **Agent Skills** (khuyến khích)
- [ ] **Demo Video** (YouTube link)

---

## Self-Assessment Table (điền vào README cá nhân)

| No. | Criteria | Max | Self |
|-----|----------|-----|------|
| 1 | Feature A (Domain + Boundary) | 25 | |
| 2 | Feature B (Domain + Boundary) | 25 | |
| 3 | Feature C (Domain + Boundary) | 25 | |
| 4 | Feature D (Mobile, Domain + Boundary) | 15 | |
| 5 | Agent Skills | 10 | |
| **Total** | | **100** | |
