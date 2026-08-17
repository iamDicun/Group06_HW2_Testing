# [PERF BUG] High Latency & Database Lock Error on Checkout API Under Moderate Load

**GitHub Issue:** https://github.com/iamDicun/Group06_HW2_Testing/issues/153  
**Endpoint:** `POST /api/checkout`  
**Mức độ:** Major / P2  

## 1. Mô Tả Lỗi
Trong quá trình thực thi Stress Test với k6 (mức tải 50 - 100 VUs), endpoint `POST /api/checkout` xuất hiện hiện tượng tăng đột biến thời gian phản hồi (p95 latency > 2500ms) và phát sinh lỗi HTTP 500 với thông báo `SQLITE_BUSY: database is locked`.

## 2. Các Bước Tái Hiện
1. Khởi động Backend EShop (`node server.js`).
2. Chạy k6 Stress Test script `23127033_Stress_20260816.js` với 50 Virtual Users đồng thời thực hiện checkout.
3. Quan sát chỉ số latency và HTTP error rate trên k6 console.

## 3. Bằng Chứng Thực Tế
- Screenshot k6 output / Task Manager: `evidence/runs/evidence_stress_test.png`
- Error log: `SQLITE_BUSY: database is locked`

## 4. Nguyên Nhân & Giải Pháp
- **Nguyên nhân:** SQLite mặc định ở chế độ Journaling cũ chỉ cho phép một ghi (write) tại một thời điểm, dẫn đến nghẽn hàng chờ ghi đơn hàng khi có nhiều giao dịch checkout đồng thời.
- **Giải pháp:** Bật SQLite WAL Mode (`PRAGMA journal_mode = WAL;`) để cho phép đọc và ghi song song.
