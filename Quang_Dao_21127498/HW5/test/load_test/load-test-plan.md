# Test Plan — Load Test (EShop Backend)

## 1. Mục tiêu

Đánh giá hành vi của hệ thống EShop backend khi chịu tải ở mức được kỳ vọng là
"bình thường" trong điều kiện vận hành thực tế (không phải sự kiện đặc biệt),
duy trì ổn định trong một khoảng thời gian đủ dài để quan sát xu hướng, không
chỉ phản ứng tức thời.

## 2. Workflow được kiểm thử

Một luồng end-to-end duy nhất, mô phỏng hành vi mua hàng thật:

```
Login → Product Search → Product Detail → Add to Cart → Checkout
```

## 3. Ánh xạ Workflow → Nhóm Endpoint

| Bước | Endpoint | Nhóm | Lý do thuộc nhóm này |
|---|---|---|---|
| Login | `POST /api/login` | Auth-heavy | Có logic đếm login_attempts, kiểm tra khóa tài khoản (lockout), ký JWT — chi phí xử lý cao hơn 1 request đọc thông thường |
| Product Search | `GET /api/products?search=...` | Read-heavy | Truy vấn SELECT vào bảng products, không ghi dữ liệu, không yêu cầu xác thực |
| Product Detail | `GET /api/products/:id` | Read-heavy | Truy vấn đọc đơn giản theo khóa chính, không ghi dữ liệu |
| Add to Cart | `POST /api/cart` | Transactional | Ghi vào state (userCarts trong RAM), gắn với user_id cụ thể, có yêu cầu xác thực |
| Checkout | `POST /api/checkout` | Transactional | Ghi INSERT vào bảng `orders` trong SQLite — thao tác ghi DB thật, có xác thực, ảnh hưởng dữ liệu lâu dài |

→ Cả 3 nhóm endpoint theo yêu cầu đề bài đều được bao phủ trong 1 workflow duy nhất.

## 4. Tham số tải (Workload Parameters)

| Tham số | Giá trị | Lý do chọn |
|---|---|---|
| VU tối đa | 50 | Không có số liệu traffic thật của EShop (đây là SUT học thuật). 50 VU đồng thời là giả định hợp lý cho quy mô shop nhỏ/vừa ở giờ cao điểm — **đây là giả định, không phải số đo được, cần nêu rõ khi trình bày kết quả** |
| Ramp-up | 2 phút, tuyến tính 0 → 50 VU | Mô phỏng traffic tăng dần tự nhiên (vd: đầu giờ sáng), tránh gây sốc tải giả tạo ngay từ giây đầu |
| Giữ tải đỉnh | 5 phút ở 50 VU | Đủ dài để hệ thống đạt trạng thái ổn định (steady state), p95/p99 không còn bị nhiễu bởi giai đoạn "khởi động" |
| Ramp-down | 2 phút, tuyến tính 50 → 0 VU | Giảm tải có kiểm soát, không đo trong giai đoạn này |
| Think-time (Search → Detail) | 2 giây | Mô phỏng người dùng đọc lướt danh sách kết quả tìm kiếm trước khi bấm vào 1 sản phẩm |
| Think-time (Detail → Add to Cart) | 3 giây | Mô phỏng người dùng đọc mô tả/giá sản phẩm trước khi quyết định thêm vào giỏ — bước cần nhiều thời gian đọc nhất trong luồng |
| Think-time (Cart → Checkout) | 1 giây | Thao tác chuyển tiếp nhanh, người dùng đã quyết định mua |
| Số user tạo sẵn (setup) | 50 (bằng VU tối đa) | Mỗi VU dùng 1 tài khoản riêng — tránh đụng độ giỏ hàng (userCarts lưu theo user_id trong RAM) và tránh kích hoạt lockout chéo giữa các VU dùng chung account |

## 4b. Xuất raw log & HTML report

```powershell
k6 run --out json=load-test-raw.json load-test.js | Tee-Object -FilePath load-test-console.txt

$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="load-test-report.html"
k6 run load-test.js
```

Lưu ý: k6 xuất JSON/HTML, không có định dạng `.jtl` (đó là định dạng riêng
của JMeter) — xem thảo luận chi tiết trong báo cáo tổng về lựa chọn công cụ.

Load Test không có lockout probe (yêu cầu đề bài chỉ nêu rõ cho Stress/Spike),
vì luồng chính ở đây chỉ dùng password đúng theo đúng mục tiêu đo tải bình
thường, không có nhánh cố ý gây lỗi.

## 5. Tiêu chí đánh giá (Threshold)

| Chỉ số | Ngưỡng |
|---|---|
| p95 response time | < 500ms |
| p99 response time | < 1000ms |
| Tỷ lệ lỗi (http_req_failed) | < 1% |
| Tỷ lệ login thất bại | < 1% (không tính lockout chủ ý) |

## 6. Giả định & Giới hạn (Threats to Validity)

- SQLite là single-writer theo mặc định (không bật WAL) — bước Checkout ghi
  tuần tự, có thể là điểm nghẽn phản ánh giới hạn của SQLite hơn là giới hạn
  kiến trúc ứng dụng. Cần nêu rõ khi phân tích kết quả, vì môi trường production
  thực tế thường dùng RDBMS hỗ trợ ghi đồng thời tốt hơn.
- Bảng `orders` và object `userCarts` (RAM) không tự dọn giữa các lần chạy —
  cần restart server + làm sạch dữ liệu test trước khi chạy để có baseline sạch,
  đặc biệt nếu Load Test không phải là lần chạy đầu tiên trong 3 test.
- 50 VU là giả định chủ quan do không có dữ liệu traffic thật, không phải số
  liệu benchmark từ hệ thống production.
