# Test Plan — Endurance / Soak Test (EShop Backend)

**Lưu ý phạm vi**: đây KHÔNG phải 1 trong 3 test plan bắt buộc (Load/Stress/
Spike) của đề bài — là yêu cầu bổ sung riêng: "Determine the endurance
threshold... to empirically find your hardware's threshold, reported with
concrete numbers (e.g., maximum stable RPS, memory ceiling)." Vì vậy không
áp dụng quy tắc "3 report type không trùng nhau" cho folder này.

## 1. Mục tiêu

**Tìm bằng thực nghiệm** (không phải giả định) 2 con số cụ thể:
- **Maximum stable RPS**: throughput tối đa hệ thống giữ ổn định liên tục
  trong 10-15 phút, không suy giảm dần theo thời gian.
- **Memory ceiling**: mức bộ nhớ mà process `node.exe` (backend) đạt tới rồi
  **chững lại** (ổn định), phân biệt với trường hợp tăng liên tục không dừng
  (dấu hiệu memory leak — nếu xảy ra, ghi nhận là "không xác định được
  ceiling ổn định trong thời gian test, nghi ngờ memory leak" thay vì ép ra
  1 con số).

## 2. Phương pháp — vì sao KHÔNG chọn VU tùy ý

Khác với Load Test (VU giả định dựa trên quy mô shop), Endurance Test cần
mức tải **suy ra từ kết quả thực nghiệm của Stress Test**, không phải chọn
đại 1 con số rồi chạy dài ra:

1. Chạy Stress Test (`../stress-test/`) trước.
2. Từ kết quả (log console theo từng bậc 100→300→500→800 VU), xác định
   **bậc VU cao nhất mà error rate và p95 vẫn ổn định** (chưa có dấu hiệu
   suy giảm rõ rệt).
3. Điền con số đó vào `ENDURANCE_VU` trong `endurance-test.js` (hiện đang
   để placeholder — xem mục 4).

## 3. Workflow được kiểm thử

Cùng workflow với 3 test plan chính, data-driven qua `data.csv` (100 dòng,
cùng schema và catalog thật từ `database.js` như các folder khác — xem
`../load-test/test-plan.md` mục 4c để biết chi tiết catalog):

```
Login → Product Search → Product Detail → Add to Cart → Checkout
```

Không có lockout probe (không thuộc phạm vi yêu cầu endurance).

## 4. Tham số tải

| Tham số | Giá trị | Lý do |
|---|---|---|
| VU (cố định, không ramp nhiều bậc) | `ENDURANCE_VU` — **placeholder, điền sau khi có kết quả Stress Test thật** | Phải suy ra từ thực nghiệm, không giả định (xem mục 2) |
| Ramp-up | 1 phút | Ngắn, chỉ để tránh sốc tải ban đầu, phần lớn thời gian dành cho giữ tải ổn định |
| Giữ tải ổn định | 12 phút | Nằm trong khung 10-15 phút đề bài yêu cầu |
| Ramp-down | 1 phút | Ngắn, không phải trọng tâm đo |
| Think-time | Giống Load Test (2s/3s/1s theo từng bước) | Mô phỏng hành vi thật, vì mục tiêu là đo độ bền chịu tải thực tế, không phải dồn ép như Stress Test |
| Nếu số dòng `data.csv` (100) ít hơn `ENDURANCE_VU` đã chọn | Cần chạy lại script sinh CSV với số dòng nhiều hơn | Xem `../shared/` — dùng lại logic sinh CSV đã áp dụng cho 3 folder kia |

## 5. Cách tính 2 chỉ số cụ thể sau khi chạy

**Maximum stable RPS**: mở `endurance-raw.json` (raw log JSON), lọc các bản
ghi có timestamp nằm trong khoảng "giữ tải ổn định" (bỏ qua 1 phút ramp-up
đầu và 1 phút ramp-down cuối), đếm số request/giây theo từng giây, lấy giá
trị trung bình của đoạn ổn định này — đó là con số báo cáo, kèm ghi chú
khoảng dao động (min-max) trong giai đoạn đó.

**Memory ceiling**: mở file CSV resource log (từ script PowerShell monitor
`node.exe`, xem hướng dẫn resource monitoring đã trao đổi), nhìn cột Memory
theo thời gian:
- Nếu tăng rồi **chững lại ở 1 mức trong nhiều phút liên tục** → đó là
  memory ceiling, báo cáo con số cụ thể (MB).
- Nếu **tăng liên tục không dừng** suốt 12 phút → không kết luận được
  ceiling, ghi rõ "nghi ngờ memory leak, cần soak test dài hơn 10-15 phút để
  xác nhận" — đây là kết luận trung thực, không nên ép ra 1 con số không có
  căn cứ.

## 6. Giả định & Giới hạn

- 10-15 phút là soak test **rút gọn** phù hợp giới hạn thời gian assignment,
  không phải soak test chuẩn (thường chạy hàng giờ/ngày để bắt leak chậm) —
  cần ghi rõ trong báo cáo để tránh hiểu nhầm là kết luận cuối cùng về độ ổn
  định dài hạn.
- Máy chạy k6 cũng cần đủ tài nguyên — theo dõi CPU của cả máy test lẫn máy
  chạy server để phân biệt bottleneck thuộc bên nào.
- Trước khi chạy, thực hiện quy trình reset (`../shared/reset-procedure.md`)
  để có baseline sạch.
