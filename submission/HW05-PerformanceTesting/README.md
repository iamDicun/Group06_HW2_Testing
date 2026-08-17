# BAO CAO PERFORMANCE TESTING - ESHOP

**Ho ten sinh vien:** Huynh Vuong Thuy Quan  
**MSSV:** 23127459  
**Ngay tao:** 16/08/2026  
**Bai tap:** HW05 - Performance Testing  
**SUT:** EShop - API Backend (Node.js + Express + SQLite)

---

## MUC LUC

1. [Mo ta du an](#1-mo-ta-du-an)
2. [Moi truong & Thong so phan cung](#2-moi-truong--thong-so-phan-cung)
3. [Tong ket ket qua kiem thu](#3-tong-ket-ket-qua-kiem-thu)
4. [Phan tich Loi & Nut thuc hieu nang](#4-phan-tich-loi--nut-thuc-hieu-nang)
5. [Link Lien Ket](#5-link-lien-ket)
6. [AI Critique Summary](#6-ai-critique-summary)
7. [Lich su Commit Nhanh Ca Nhan](#7-lich-su-commit-nhanh-ca-nhan)

---

## 1. Mo ta du an

### 1.1 Workflow kiem thu End-to-end

```
Login -> Product Search -> Product Detail -> Add to Cart -> Update Cart -> Checkout
```

### 1.2 Cau truc thu muc nop bai

```
submission/HW05-PerformanceTesting/
├── README.md                    (Bao cao tong ket)
├── AI_CRITIQUE.md               (Phan tich loi AI)
├── bug-report.md                (Bao cao loi)
├── ai_audit.md                  (Nhat ky hop tac voi AI)
├── git_log.txt                  (Lichsu commit)
├── scripts/
│   ├── 23127459_Load_20260816.jmx
│   ├── 23127459_Stress_20260816.jmx
│   ├── 23127459_Spike_20260816.jmx
│   ├── 23127459_auth_credentials.csv
│   ├── 23127459_products.csv
│   └── 23127459_checkout.csv
├── reports/
│   ├── Report_Load/
│   ├── Report_Stress/
│   └── Report_Spike/
└── screenshots/
    ├── task_manager.png
    ├── hardware_spec.png
    └── system_info.png
```

---

## 2. Moi truong & Thong so phan cung

### 2.1 Cau hinh may tinh

| Thong so | Gia tri |
|----------|---------|
| CPU | Intel Core i9-13900H (14 cores / 20 threads, up to 5.4 GHz) |
| RAM | 16 GB DDR5 |
| OS | Windows 11 Pro |
| Storage | 512 GB NVMe SSD |

### 2.2 Moi truong phan mem

| Thong so | Gia tri |
|----------|---------|
| Node.js | v20.x |
| JMeter | 5.6.3 |
| Database | SQLite (file-based) |
| Backend Port | localhost:3000 |

### 2.3 Bang chung hinh anh tai nguyen (Screenshots)

![Hardware Spec & Task Manager](screenshots/task_manager.png)

![Hardware Spec](screenshots/hardware_spec.png)

![System Info](screenshots/system_info.png)

---

## 3. Tong ket ket qua kiem thu

### 3.1 Bang tong hop ket qua

| Chi so | Load Test (50 VUs) | Stress Test (100 VUs) | Spike Test (200 VUs) |
|--------|-------------------|----------------------|---------------------|
| **Tong Samples** | 3,396 | 16,544 | 10,234 |
| **Throughput (req/s)** | 11.50 | 90.99 | 84.74 |
| **Avg Response Time (ms)** | 1.01 | 1.31 | 53.82 |
| **Median Response Time (ms)** | 0.00 | 1.00 | 5.00 |
| **p95 Response Time (ms)** | 3.00 | 3.00 | 29.00 |
| **p99 Response Time (ms)** | 4.00 | 4.00 | 2,075.45 |
| **Max Response Time (ms)** | 186.00 | 50.00 | 2,961.00 |
| **Error Rate (%)** | 49.62% | 99.40% | 0.00% |

### 3.2 Phan tich chi tiet tung Scenario

#### Load Test (Read-Heavy: Search + Detail)

- **Muc tieu:** Do hieu nang doc du lieu khi co 50 VUs truy cap dong thoi
- **Ket qua:**
  - Product Detail (`GET /api/products/:id`): Avg 2.03ms, 0% error, throughput 5.71 req/s
  - Product Search (`GET /api/products?search=`): 98.48% error (do URL duplication bug)
  - **Nhan xet:** Product Detail hoat dong tot, Search bi loi URL protocol

#### Stress Test (Auth-Heavy: Login + Lockout)

- **Muc tieu:** Kiem tra behavior khi co 100 VUs login dong thoi
- **Ket qua:**
  - Login throughput: 91.95 req/s
  - Avg response: 1.32ms (rat nhanh)
  - Error rate: 99.40% (login that bai + account locked)
  - **Nhan xet:** Server xu ly tot under stress, nhung error rate cao vi login that bai

#### Spike Test (Transactional: Cart + Checkout)

- **Muc tieu:** Kiem tra behavior khi co spike 200 VUs dot ngot
- **Ket qua:**
  - Cart: Avg 2.53ms, 0% error
  - Checkout: Avg 49.13ms, 0% error
  - **p99 = 2,075ms** cho thay co outlier requests cham
  - **Max = 2,961ms** (gan 3 giay)
  - **Nhan xet:** Server chiu duoc spike nhung bi giam performance o muc cao

---

## 4. Phan tich Loi & Nut thuc hieu nang

### 4.1 Hien tuong server qua tai/ket thread

Khi dui Spike Test 200 VUs, xay ra cac hien tuong:

1. **p99 tang dot ngot:** Tu 29ms (median) len 2,075ms (p99) - tang gap 71 lan
2. **Max response time:** 2,961ms (gan 3 giay) - khong chap nhan duoc cho production
3. **SQLite write contention:** SQLite chi ho tro 1 writer tai thoi diem, 200 VUs cung thuc thi checkout → database locked

### 4.2 Bug/Nguyen ky thuat tim thay

| # | Van de | Mo ta | Muc do |
|---|--------|-------|--------|
| 1 | **Lock Account 180s** | Thoi gian khoa tai khoan 180s thay vi 30s (Spec) | High |
| 2 | **Login Increment +2** | login_attempts +2 thay vi +1 (khoa sau 2 lan sai) | High |
| 3 | **URL Protocol Duplication** | URL bi trung: `http://http://localhost:3000` | Critical |
| 4 | **Cross-thread Token Scope** | JWT token khong share duoc giua Thread Groups | Critical |
| 5 | **Thieu Response Timeout** | HTTP Request khong co timeout → thread bi ket | High |
| 6 | **SQLite Single Writer** | Khong co Connection Pooling → write contention | High |

### 4.3 Giai phap toi uu

| Giai phap | Feasible | Giai thich |
|-----------|----------|------------|
| **Database Indexing** | CO | Them index tren cot name trong bang products |
| **SQLite WAL Mode** | CO | Bat Write-Ahead Logging cho concurrent read |
| **Response Timeout** | CO | Dat HTTPSampler.responseTimeout = 5000ms |
| **Connection Pooling** | KHONG | SQLite file-based, khong ho tro pool |
| **Rate Limiting** | CO | Them middleware express-rate-limit |

---

## 5. Link Lien Ket

- **Link Repository Du An:** https://github.com/iamDicun/Group06_HW2_Testing/ (Nhanh: HW05-23127459)
- **Link Video Minh Chung:** https://youtu.be/-wdLgk_BLq0

---

## 6. AI Critique Summary

Trong qua trinh thuc hanh, AI da mac mot so loi chinh:

1. **URL Protocol Duplication:** Tao URL `http://http://localhost:3000` bi trung protocol
2. **Cross-thread Token Scope:** JWT token khong share duoc giua Thread Groups
3. **Thieu Response Timeout:** HTTP Request khong co timeout, gay ket thread
4. **Chi lam Static Analysis:** Khong validate XML hay dry-run tren JMeter that

**Bai hoc hoc tap:** Nguyen tac "Trust but Verify" - luon validate output cua AI truoc khi su dung.

**Xem chi tiet:** [AI_CRITIQUE.md](AI_CRITIQUE.md)

**Xem bao cao loi:** [bug-report.md](bug-report.md)

---

## 7. Lich su Commit Nhanh Ca Nhan

```
d9af86f  hoan-thien(HW05): sap xep lai cau truc thu muc va viet README.md
b7f7644  doc(HW05): remove Chinese characters from AI Critique
5ff6e6d  doc(HW05): add AI Critique analysis
edf89d6  feat(HW05): add performance testing scripts and JMX files
63a2066  fix(Stress.jmx): add 4th request to verify the account lockout with correct credentials
d051860  fix(Spike.jmx): resolve URL protocol duplication and cross-thread auth token scoping in Spike test
d7bbc0e  fix(Load.jmx): fix URL protocol duplication in Load test script
d04194a  fix(Spike.jmx): resolve tag error in the Spike
```

*Lich su commit nay chi lay cac commit khac voi nhanh main.*
