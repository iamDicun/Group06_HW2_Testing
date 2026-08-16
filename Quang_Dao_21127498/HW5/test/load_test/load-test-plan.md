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

## 4b. Report Type được phân công: Raw JSON Output

Theo yêu cầu đề bài "use three distinct listener/report types across the
three test plans, do not repeat a type" — mỗi test plan dùng đúng 1 loại
report riêng biệt. **Load Test dùng Raw JSON**, tương đương "View Results
Tree" trong JMeter (xem chi tiết từng request), phù hợp để xác nhận workflow
end-to-end hoạt động đúng ở mức baseline trước khi lên tải cao hơn.

```powershell
k6 run --out json=load-test-raw.json load-test.js | Tee-Object -FilePath load-test-console.txt
```

(Stress Test dùng HTML Dashboard, Spike Test dùng k6 Cloud — xem test-plan
tương ứng. Có thể xuất thêm các định dạng khác làm bằng chứng bổ sung, nhưng
JSON là định dạng **bắt buộc** theo phân công của Load Test.)

Load Test không có lockout probe (yêu cầu đề bài chỉ nêu rõ cho Stress/Spike),
vì luồng chính ở đây chỉ dùng password đúng theo đúng mục tiêu đo tải bình
thường, không có nhánh cố ý gây lỗi.

## 4c. Data-Driven Workflow (CSV)

Theo yêu cầu đề bài "Make the workflow data-driven... Use CSV input data to
parameterize requests (e.g., credentials, product IDs, or order payloads)",
file `data.csv` (cùng thư mục) cung cấp **toàn bộ tham số cho 1 lượt chạy**
của mỗi VU trong 1 file duy nhất:

| Cột | Dùng cho bước nào | Loại dữ liệu (theo đề bài) |
|---|---|---|
| `name`, `email`, `password` | Bước 1 - Login | Credentials |
| `search_keyword` | Bước 2 - Product Search | (chỉ tạo tải lên endpoint, không dùng để suy ra ID) |
| `product_id` | Bước 3 - Product Detail, Bước 4 - Add to Cart | Product IDs |
| `quantity`, `unit_price` | Bước 4 - Add to Cart | Order payload |
| `shipping_address` | Bước 5 - Checkout | Order payload |

**Dữ liệu sản phẩm lấy từ `database.js` thật** (không còn là giả định như
bản nháp trước — bản nháp trước dùng nhầm từ khóa quần áo, đã sửa lại đúng
theo catalog thật là điện thoại/laptop/phụ kiện):

| product_id | Sản phẩm | Giá | search_keyword tương ứng |
|---|---|---|---|
| 1 | iPhone 15 Pro Max | 30.000.000đ | `iPhone` |
| 2 | Samsung Galaxy S24 Ultra | 28.000.000đ | `Samsung` |
| 3 | MacBook Pro M3 | 45.000.000đ | `MacBook` |
| 4 | AirPods Pro 2 | 6.000.000đ | `AirPods` |
| 5 | Keychron Q1 | 4.000.000đ | `Keychron` |

**Vì sao `product_id` trong CSV an toàn để hard-code** (khác với lo ngại ban
đầu về ID có thể đổi sau khi reset DB): `database.js` luôn `DROP TABLE` rồi
`CREATE TABLE products` lại trước khi seed theo đúng thứ tự cố định ở trên —
SQLite reset bộ đếm `AUTOINCREMENT` mỗi khi table bị xóa, nên ID **luôn là
1-5 theo đúng thứ tự này** sau mỗi lần chạy `node database.js`. Vì vậy CSV
dùng thẳng `product_id`, không cần dò qua kết quả search như thiết kế trước.

Bước Search vẫn giữ lại (dùng `search_keyword`) để tạo tải thực tế lên
endpoint đọc — nhưng không còn phụ thuộc kết quả trả về để lấy ID, giúp
Bước 3/4 không bị ảnh hưởng nếu search trả về rỗng vì lý do khác (vd: bug
SQL injection ở endpoint search khi search term có ký tự đặc biệt).

50 dòng dữ liệu trong `data.csv`, khớp với 50 VU tối đa của Load Test, giá
trị `quantity`/`unit_price`/`product_id` xoay vòng qua 5 sản phẩm thật.

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
