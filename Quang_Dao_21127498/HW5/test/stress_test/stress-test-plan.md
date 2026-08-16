# Test Plan — Stress Test (EShop Backend)

## 1. Mục tiêu

Tìm điểm giới hạn (breaking point) của hệ thống EShop backend bằng cách tăng
tải liên tục theo bậc, vượt xa mức bình thường, cho đến khi quan sát được
dấu hiệu suy giảm rõ rệt (error rate tăng vọt hoặc p95 tăng phi tuyến).

## 2. Workflow được kiểm thử

Cùng 1 workflow như Load Test và Spike Test (yêu cầu đề bài: cả 3 test plan
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
| VU tăng theo bậc | 100 → 300 → 500 → 800 | Tăng theo bậc (thay vì tuyến tính liên tục) để có đủ thời gian quan sát hệ thống "ổn định" ở mỗi mức trước khi kết luận nó chịu được hay không |
| Thời gian mỗi bậc tải đỉnh | 3 phút | Đủ dài để loại bỏ nhiễu do warm-up, đủ ngắn để tổng thời gian test không quá dài (4 bậc × ~5 phút/bậc ≈ 22 phút) |
| Ramp-up mỗi bậc | 2 phút | Chuyển tiếp giữa các bậc có kiểm soát, tránh gây sốc giả tạo làm lẫn lộn giữa "hệ thống yếu" và "tăng tải quá đột ngột" (đó là việc của Spike Test, không phải Stress Test) |
| Ramp-down cuối | 3 phút, về 0 VU | Quan sát khả năng giải phóng tài nguyên sau khi tải giảm |
| Think-time | Giảm còn 0.3–0.5 giây giữa các bước, hoặc bỏ | Mục tiêu Stress Test là đẩy tải liên tục để tìm giới hạn, không mô phỏng hành vi đọc thật của người dùng như Load Test |
| Số user tạo sẵn (setup) | 150 | Cao hơn Load Test vì VU tối đa lên đến 800 — nhiều VU sẽ dùng chung 1 tài khoản (800 VU / 150 user ≈ 5.3 VU/account), cần đủ user để giảm mức độ trùng lặp account giữa các VU đồng thời ở bậc cao nhất |

## 5. Lưu ý quan trọng: Auth-heavy dưới Stress Test có bản chất khác 2 nhóm còn lại

Đây là điểm cần nêu rõ để tránh hiểu sai kết quả: giới hạn thật của bước
Login **không nằm ở tài nguyên hạ tầng** (CPU/DB connection) như Search/Detail/
Checkout, mà nằm ở **business logic cố định**: chỉ cần 2 lần login sai liên
tiếp là tài khoản bị khóa 3 phút (xem phân tích server.js — lệch với README
ghi 3 lần / 30 giây).

→ Vì workflow này chỉ dùng **password đúng** cho mọi VU (không có nhánh login
sai chủ ý), bước Login trong Stress Test này **không** nhằm mục đích kiểm tra
cơ chế lockout dưới tải — nó chỉ đo được chi phí xử lý (ký JWT, truy vấn user)
dưới tải cao. Nếu muốn đo hành vi lockout dưới tải đồng thời (race condition
khi nhiều request cùng UPDATE `login_attempts`), cần một kịch bản riêng ngoài
phạm vi 3 test plan này.

## 5b. Lockout Probe — trigger hành vi khóa tài khoản theo yêu cầu đề bài

Vì đề bài yêu cầu tường minh phải trigger được "3-fail login lockout" và
document quy trình reset, script `stress-test.js` có thêm 1 scenario riêng
tên `lockout_probe`, **tách biệt hoàn toàn** khỏi luồng chính (`main_workflow`)
về mặt account lẫn metric:

- 3 VU độc lập, mỗi VU dùng 1 account probe riêng (không trùng account với
  luồng chính), bắt đầu chạy ở phút 3:30 (khi luồng chính đang ở bậc 100 VU).
- Mỗi VU thực hiện đúng **3 lần đăng nhập sai liên tiếp** theo đặc tả FR-02
  trong README, sau đó thử lại bằng password đúng để xác nhận trạng thái khóa.
- Kết quả in ra console (`console.log`) mỗi lần thử — đây là bằng chứng cần
  chụp/lưu lại cho báo cáo.

**Ghi chú quan trọng — chênh lệch giữa đặc tả và hành vi thật:** theo phân
tích code `server.js`, hệ thống thực tế khóa tài khoản sau **2 lần** sai
(không phải 3), thời gian khóa **180 giây** (không phải 30 giây như README).
Vì vậy khi probe thực hiện lần sai thứ 3, tài khoản nhiều khả năng **đã bị
khóa từ sau lần thứ 2** — request thứ 3 sẽ nhận về lỗi 403 (locked) thay vì
401 (sai password) như kỳ vọng theo đặc tả. Đây là bằng chứng trực tiếp cho
bug report/GitHub Issue được lập riêng, không phải lỗi của test script.

**Quy trình reset giữa các lần chạy**: dừng server → `node database.js`
(reset toàn bộ DB, đồng thời giải quyết lockout + bảng `orders` phình to) →
khởi động lại server (dọn `userCarts` trong RAM). Chi tiết đầy đủ và lý do
chọn cách này thay vì chỉ reset riêng lockout: xem `../shared/reset-procedure.md`.

## 5c. Xuất raw log & HTML report

```powershell
# Xuất raw log dạng JSON (chứa toàn bộ sample-level data, tương đương chức
# năng với .jtl của JMeter - k6 không có định dạng .jtl, xem lưu ý ở báo cáo)
k6 run --out json=stress-test-raw.json stress-test.js | Tee-Object -FilePath stress-test-console.txt

# Tạo HTML report bằng k6 Web Dashboard (tích hợp sẵn từ k6 v0.48+)
$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="stress-test-report.html"
k6 run stress-test.js
```

Lệnh thứ 2 tạo ra 1 file HTML report độc lập (`stress-test-report.html`) chứa
biểu đồ trực quan — dùng làm "HTML report folder" tương đương yêu cầu đề bài,
kèm ghi chú rõ đây là HTML report của k6, không phải JMeter.

## 6. Tiêu chí đánh giá (Threshold)

| Chỉ số | Ngưỡng |
|---|---|
| Tỷ lệ lỗi (http_req_failed) | < 10% — ngưỡng rộng hơn Load Test có chủ đích, vì mục tiêu là **quan sát lúc nào vượt ngưỡng**, không phải chặn test dừng sớm |

Ghi chú: không đặt threshold cứng cho response time ở Stress Test, vì mục
tiêu là quan sát xu hướng degrade theo từng bậc tải (ghi log thủ công theo
từng stage), không phải pass/fail nhị phân như Load Test.

## 7. Giả định & Giới hạn (Threats to Validity)

- SQLite single-writer: ở tải cao (500-800 VU), điểm nghẽn tại bước Checkout
  nhiều khả năng phản ánh giới hạn ghi tuần tự của SQLite hơn là giới hạn
  thiết kế ứng dụng — cần nêu rõ khi kết luận "breaking point".
- Máy chạy k6 cũng cần đủ tài nguyên (CPU/network) để tạo ra 800 VU đồng thời
  — nếu máy chạy test là bottleneck, kết quả sẽ phản ánh giới hạn của máy test,
  không phải của EShop server. Cần theo dõi CPU của cả 2 phía khi chạy.
- Bảng `orders` và `userCarts` tích lũy nhiều dữ liệu nhất trong 3 test (do
  VU cao nhất) — bắt buộc dọn dữ liệu trước khi chạy Load/Spike Test kế tiếp.
