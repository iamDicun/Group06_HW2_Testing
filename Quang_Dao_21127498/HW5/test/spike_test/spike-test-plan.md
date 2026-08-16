# Test Plan — Spike Test (EShop Backend)

## 1. Mục tiêu

Đánh giá khả năng chịu đựng của hệ thống EShop backend khi tải tăng đột ngột
trong thời gian rất ngắn (mô phỏng traffic bùng nổ bất thường: link viral,
chương trình flash sale), và quan trọng không kém — khả năng **phục hồi**
sau khi tải giảm đột ngột về mức bình thường.

## 2. Workflow được kiểm thử

Cùng 1 workflow như Load Test và Stress Test (yêu cầu đề bài: cả 3 test plan
phải dùng chung 1 workflow end-to-end):

```
Login → Product Search → Product Detail → Add to Cart → Checkout
```

## 3. Ánh xạ Workflow → Nhóm Endpoint

Giống Load Test — xem `../load-test/test-plan.md` mục 3 để tránh lặp lại.
Tóm tắt: Login = Auth-heavy; Search + Detail = Read-heavy; Add to Cart +
Checkout = Transactional.

## 4. Tham số tải (Workload Parameters)

| Tham số | Giá trị | Lý do chọn |
|---|---|---|
| VU baseline | 10 | Mức nền thấp, ổn định, dùng làm điểm so sánh "trước spike" và "sau spike" |
| VU đỉnh spike | 400 | Tăng ~40 lần so với baseline trong thời gian rất ngắn — đủ lớn để tạo áp lực thật sự, nhưng vẫn thấp hơn đỉnh của Stress Test (800) vì bản chất khác nhau: Spike đo phản ứng tức thời, không đo giới hạn tuyệt đối |
| Thời gian tăng lên đỉnh (ramp-up spike) | 10–15 giây | Đặc trưng cốt lõi phân biệt Spike với Stress: tăng gần như tức thời, không có giai đoạn "làm quen tải" như Stress Test |
| Thời gian giữ đỉnh | 1 phút | Đỉnh spike trong thực tế thường ngắn (vài chục giây đến vài phút), không kéo dài như Stress Test |
| Thời gian rơi về baseline | 10–15 giây | Rơi đột ngột, đúng bản chất spike — khác với ramp-down có kiểm soát của Load/Stress Test |
| Giai đoạn quan sát phục hồi | 3 phút ở baseline (10 VU) sau spike | Đây là phần dữ liệu quan trọng nhất của Spike Test — xem hệ thống có trở lại response time/error rate như trước spike hay không, hay vẫn còn "dư chấn" (vd: connection pool chưa giải phóng, GC chưa dọn kịp) |
| Think-time | 0.5 giây giữa các bước | Ngắn, ưu tiên tạo áp lực tức thời tương tự Stress Test, không mô phỏng hành vi đọc thật như Load Test |
| Số user tạo sẵn (setup) | 100 | Đủ để giảm trùng lặp account ở đỉnh 400 VU (400/100 = 4 VU/account tại đỉnh) |

## 5. Vì sao bước Login đặc biệt đáng chú ý trong Spike Test

Trong 3 loại test, **Spike Test là kịch bản thực tế nhất để lộ ra vấn đề liên
quan đến lockout dưới tải đồng thời**: một đợt tăng đột ngột nhiều VU cùng
lúc gọi `/api/login` gần giống với việc mô phỏng một cuộc tấn công dạng dội
request đăng nhập. Tuy nhiên, vì workflow trong test plan này chỉ dùng
password đúng (không có nhánh login sai chủ ý, giống lý do đã nêu ở Stress
Test), test này **không trực tiếp đo được** hành vi lockout dưới tải — nó chỉ
đo chi phí xử lý Login (ký JWT, truy vấn DB) khi bị dội đồng thời. Nếu cần
đánh giá race condition ở việc đếm `login_attempts`, cần một kịch bản riêng
ngoài phạm vi 3 test plan bắt buộc này.

## 5b. Lockout Probe — trigger hành vi khóa tài khoản theo yêu cầu đề bài

Tương tự Stress Test (xem `../stress-test/test-plan.md` mục 5b để tránh lặp
lại chi tiết), script `spike-test.js` có thêm scenario `lockout_probe` với
3 VU riêng, dùng account riêng, thực hiện đúng 3 lần đăng nhập sai theo FR-02.

**Khác biệt so với Stress Test**: probe bắt đầu ở phút 1:30 — ngay lúc đỉnh
spike (400 VU) đang giữ ổn định. Đây là thời điểm có ý nghĩa quan sát nhất:
xem hành vi lockout có bị ảnh hưởng bởi tải cực cao tại đúng thời điểm đó
không (ví dụ: request bị delay do server nghẽn, dẫn đến các lần thử sai
được xử lý không đúng thứ tự — có thể làm bộ đếm `login_attempts` sai lệch
thêm so với hành vi bình thường đã ghi nhận).

Chênh lệch đặc tả vs. hành vi thật (khóa sau 2 lần thay vì 3, 180s thay vì
30s) áp dụng y hệt Stress Test — đã lập GitHub Issue riêng.

**Quy trình reset giữa các lần chạy**: dừng server → `node database.js` →
khởi động lại server. Chi tiết đầy đủ: xem `../shared/reset-procedure.md`.

## 5c. Xuất raw log & HTML report

```powershell
k6 run --out json=spike-test-raw.json spike-test.js | Tee-Object -FilePath spike-test-console.txt

$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="spike-test-report.html"
k6 run spike-test.js
```

Xem giải thích chi tiết ở `../stress-test/test-plan.md` mục 5c.

## 6. Tiêu chí đánh giá (Threshold)

| Chỉ số | Ngưỡng |
|---|---|
| Tỷ lệ lỗi (http_req_failed) | < 15% — rộng nhất trong 3 test, vì mục tiêu là quan sát mức độ chịu đựng, không phải chặn test dừng sớm |
| Response time giai đoạn phục hồi (post-spike) | So sánh trực tiếp với response time baseline (trước spike) — chênh lệch đáng kể nghĩa là hệ thống chưa phục hồi hoàn toàn |

## 7. Giả định & Giới hạn (Threats to Validity)

- Object `userCarts` (RAM) và bảng `orders` sẽ tăng đột biến trong giai đoạn
  đỉnh spike — cần restart server sau khi chạy Spike Test nếu đây không phải
  là test cuối cùng trong 3 lần chạy, để tránh nhiễu dữ liệu cho lần chạy sau.
- 400 VU đỉnh là giả định chủ quan (không có số liệu traffic thật của một sự
  kiện flash-sale cụ thể) — cần nêu rõ đây là kịch bản giả lập, không phải
  benchmark từ dữ liệu thực tế.
- Máy chạy k6 cần đủ tài nguyên để tạo tăng vọt 40 lần VU trong 10-15 giây —
  nếu máy test không đáp ứng kịp, kết quả có thể phản ánh giới hạn máy chạy
  test thay vì giới hạn của EShop server.
