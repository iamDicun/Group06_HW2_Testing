# Checkpoint — Performance Testing EShop (tổng hợp đến thời điểm hiện tại)

## 1. Công cụ & phạm vi

- **Công cụ**: k6 (không dùng JMeter).
- **⚠️ Chưa giải quyết dứt điểm**: đề bài yêu cầu output `.jtl` + "HTML report
  folder" — đây là thuật ngữ/định dạng riêng của JMeter, k6 không tạo ra
  `.jtl`. **Cần xác nhận với giảng viên** trước khi nộp: có chấp nhận k6 với
  output tương đương (JSON/HTML) không, hay bắt buộc JMeter.
- Phạm vi: chỉ test backend API (`server.js`), không đụng frontend.

## 2. Phân tích backend quan trọng (từ `server.js` + `database.js`)

- Auth dùng JWT stateless, không lưu session server-side → nhiều VU login
  đồng thời không đụng độ session.
- **Bug lockout** (đã lập GitHub Issue riêng): mỗi lần login sai tăng bộ đếm
  **2** đơn vị (không phải 1 như README) → khóa sau **2 lần sai** (không
  phải 3), khóa **180 giây/3 phút** (không phải 30 giây như README).
- `userCarts` lưu trong RAM (biến JS), theo `user_id` — không tự dọn, chỉ
  mất khi restart server.
- Bảng `orders` (SQLite) tăng dần theo mỗi checkout, không tự dọn.
- SQLite là single-writer — điểm nghẽn ở Checkout có thể phản ánh giới hạn
  SQLite hơn là giới hạn kiến trúc ứng dụng.
- Endpoint `/api/products?search=` dùng string concat trực tiếp (SQL
  injection), cần dùng từ khóa "sạch" khi test performance thuần.
- **Catalog thật** (từ `database.js`, ID cố định 1-5 vì `DROP+CREATE` mỗi
  lần seed): 1=iPhone 15 Pro Max, 2=Samsung Galaxy S24 Ultra, 3=MacBook Pro
  M3, 4=AirPods Pro 2, 5=Keychron Q1.
- Không có endpoint "Update Cart" — đã loại khỏi workflow.

## 3. Workflow end-to-end (dùng chung cho cả 3 test plan bắt buộc)

```
Login → Product Search → Product Detail → Add to Cart → Checkout
```
Ánh xạ nhóm endpoint: Login = **Auth-heavy**; Search + Detail = **Read-heavy**;
Add to Cart + Checkout = **Transactional**.

## 4. Cấu trúc thư mục hiện tại

```
eshop-perf-test/
├── load-test/       (test-plan.md + load-test.js + data.csv)
├── stress-test/      (test-plan.md + stress-test.js + data.csv)
├── spike-test/       (test-plan.md + spike-test.js + data.csv)
├── endurance-test/    (test-plan.md + endurance-test.js + data.csv) — yêu cầu bổ sung, không thuộc 3 test bắt buộc
└── shared/
    ├── reset-lockout.js       (phương án dự phòng, không phải quy trình chính)
    └── reset-procedure.md
```

## 5. Tham số tải đã chốt

| | Load | Stress | Spike | Endurance |
|---|---|---|---|---|
| VU | 50 | 100→300→500→800 (theo bậc) | baseline 10, đỉnh 400 | **placeholder** — lấy từ bậc ổn định cao nhất của Stress Test |
| Ramp-up | 2 phút | 2 phút/bậc | 15 giây | 1 phút |
| Giữ tải | 5 phút | 3 phút/bậc | 1 phút (đỉnh) | 12 phút |
| Think-time | 1-3s (theo bước) | 0.3-0.5s | 0.5s | giống Load (1-3s) |
| Mục tiêu | Hành vi ổn định ở tải thường | Tìm breaking point | Chịu đựng + phục hồi sau tăng đột ngột | Max stable RPS + memory ceiling (thực nghiệm) |

## 6. Data-Driven (CSV) — đáp ứng yêu cầu đề bài

Mỗi folder có **1 file `data.csv`** (không tách nhiều file), 1 dòng = toàn bộ
tham số cho 1 VU: `name, email, password` (credentials) · `search_keyword,
product_id` (product IDs) · `quantity, unit_price, shipping_address` (order
payload). Dùng `papaparse` + `SharedArray` để đọc trong k6. Email **cố định**
(không timestamp) — dữ liệu tĩnh, version-control được, dựa vào quy trình
reset DB giữa các lần chạy để tránh trùng lặp khi rerun.

Số dòng: Load=50, Stress=150, Spike=100, Endurance=100 (khớp số user mỗi
test cần; **Endurance cần kiểm tra lại nếu `ENDURANCE_VU` > 100**).

Lockout probe (Stress/Spike) **không** dùng CSV — dùng account riêng tạo
trong `setup()`, vì bản chất cố ý sai, không phải "credential thật".

## 7. Lockout Probe — đáp ứng yêu cầu "trigger 3-fail lockout"

Chỉ có ở **Stress** và **Spike** (đúng theo đề bài). Cơ chế: 1 k6 `scenario`
riêng (`lockout_probe`), 3 VU độc lập, account riêng, chạy song song với
luồng chính — cố ý đăng nhập sai đúng 3 lần theo đặc tả FR-02, sau đó thử
lại password đúng để ghi nhận trạng thái. Do bug đã nêu ở mục 2, tài khoản
thực tế đã bị khóa từ sau lần sai thứ 2 — đây là **bằng chứng cho bug
report**, không phải lỗi của test script.

## 8. Quy trình Reset giữa các lần chạy

**Quy trình chính**: dừng server → `node database.js` (reset toàn bộ DB,
giải quyết đồng thời lockout + bảng `orders` phình to + baseline không đồng
nhất) → khởi động lại server (dọn `userCarts` trong RAM). Chi tiết + bảng
ghi thời điểm thực hiện: `shared/reset-procedure.md`.

`reset-lockout.js` chỉ là phương án dự phòng nhẹ (không xóa `orders`), dùng
khi cần thiết đặc biệt, không phải bước mặc định.

## 9. Report Type — 1 loại/test plan, không trùng nhau

| Test Plan | Report Type | Tương đương JMeter |
|---|---|---|
| Load Test | Raw JSON (`--out json`) | View Results Tree |
| Stress Test | HTML Dashboard (`K6_WEB_DASHBOARD`) | Aggregate Report |
| Spike Test | k6 Cloud (`--out cloud`) | Không có tương đương trực tiếp — giá trị riêng: đồ thị time-series, phù hợp quan sát hình dạng spike + phục hồi |

k6 Cloud: free tier 500 VUh, không cần thẻ, giữ dữ liệu 30 ngày (đã xác nhận
qua tìm kiếm — cần kiểm tra lại nếu có thay đổi chính sách). Cần: đăng ký
Grafana Cloud → tạo API token → `k6 login cloud --token <TOKEN>` (1 lần) →
`k6 run --out cloud spike-test.js`.

## 10. Resource Monitoring & Hardware Report

- **Hardware report** (làm 1 lần): `dxdiag` → tab System → chụp màn hình +
  "Save All Information"; bổ sung `systeminfo`/`Get-CimInstance
  Win32_Processor` cho chi tiết CPU; tổng hợp thành bảng spec.
- **Resource monitoring** (mỗi lần chạy): Task Manager tab Details, theo dõi
  `node.exe`; **khuyến nghị chính** — log liên tục bằng PowerShell script
  (CPU%/Memory mỗi 5 giây ra CSV) chạy song song lúc k6 chạy, mạnh hơn nhiều
  so với 1 screenshot tĩnh; vẫn chụp 1-2 screenshot Task Manager + terminal
  k6 side-by-side tại thời điểm tải đỉnh làm minh họa trực quan.

## 11. Việc còn cần bạn tự làm trước khi nộp bài

1. **Xác nhận với giảng viên** về vấn đề `.jtl`/HTML report (mục 1).
2. Chạy Stress Test thật → điền `ENDURANCE_VU` vào `endurance-test.js` dựa
   trên bậc ổn định cao nhất quan sát được; nếu VU đó > 100, sinh thêm dòng
   CSV cho `endurance-test/data.csv`.
3. Thực hiện đúng quy trình reset giữa các lần chạy, điền bảng thời điểm
   trong `reset-procedure.md` làm bằng chứng.
4. Thu thập đủ evidence mỗi lần chạy: raw log (JSON/HTML/Cloud tùy phân
   công), resource CSV, screenshot Task Manager, console output k6.
5. Lập GitHub Issue riêng cho bug lockout (2 lần/180s thay vì 3 lần/30s) —
   đã thống nhất làm riêng, không phải một phần của test script.
6. Sau khi chạy Endurance Test, tính "maximum stable RPS" và "memory
   ceiling" theo hướng dẫn ở `endurance-test/test-plan.md` mục 5 — ghi số
   liệu cụ thể, không ước lượng.
