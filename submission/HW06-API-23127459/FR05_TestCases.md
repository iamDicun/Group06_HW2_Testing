# FR-05: Liệt Kê & Tìm Kiếm Sản Phẩm — Các Trường Hợp Kiểm Tra API

**MSSV:** 23127459  
**Hệ Thống Đang Kiểm Tra:** Backend API EShop (`http://localhost:3000`)  
**Chức Năng:** FR-05 — Xem danh sách & Tìm kiếm sản phẩm  
**API Endpoints:** `GET /api/products`, `GET /api/products/:id`

---

## 1. Phân Vùng Phương Định / Phân Vùng Đồng Nhất & BVA

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thức | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_001 | FR-05: Liệt Kê Sản Phẩm | Phân Vùng Phương Định | Lấy tất cả sản phẩm không có tham số truy vấn, trả về danh sách đầy đủ | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mảng JSON các đối tượng sản phẩm; mỗi đối tượng có `id`, `name`, `price`, `description`, `imageUrl`, `category_id` |
| TC_FR05_002 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với tên sản phẩm chính xác trả về sản phẩm khớp | GET `/api/products?search=iPhone 15 Pro Max` | `X-Student-Id: 23127459` | Query: `search=iPhone 15 Pro Max` | 200 | Mảng chứa 1 sản phẩm; `name` chứa "iPhone 15 Pro Max" |
| TC_FR05_003 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với từ khóa một phần trả về nhiều sản phẩm khớp | GET `/api/products?search=Pro` | `X-Student-Id: 23127459` | Query: `search=Pro` | 200 | Mảng chứa >= 1 sản phẩm; mỗi `name` chứa "Pro" |
| TC_FR05_004 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với từ khóa không tồn tại trả về mảng rỗng | GET `/api/products?search=xyzabc123nonexistent` | `X-Student-Id: 23127459` | Query: `search=xyzabc123nonexistent` | 200 | Mảng JSON rỗng `[]` |
| TC_FR05_005 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với chuỗi rỗng trả về tất cả sản phẩm | GET `/api/products?search=` | `X-Student-Id: 23127459` | Query: `search=` | 200 | Mảng JSON chứa tất cả sản phẩm (giống như không tìm kiếm) |
| TC_FR05_006 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với ký tự đặc biệt trong từ khóa trả về kết quả không lỗi | GET `/api/products?search=MacBook%20Pro` | `X-Student-Id: 23127459` | Query: `search=MacBook Pro` | 200 | Mảng JSON; sản phẩm chứa "MacBook Pro" trong tên |
| TC_FR05_007 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với ký tự tiếng Việt trả về sản phẩm khớp | GET `/api/products?search=Phím` | `X-Student-Id: 23127459` | Query: `search=Phím` | 200 | Mảng JSON; sản phẩm chứa ký tự tiếng Việt |
| TC_FR05_008 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với từ khóa không phân biệt chữ hoa/thường vẫn trả về kết quả | GET `/api/products?search=iphone` | `X-Student-Id: 23127459` | Query: `search=iphone` | 200 | Mảng JSON chứa sản phẩm khớp (SQLite LIKE không phân biệt chữ hoa/thường) |
| TC_FR05_009 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với từ khóa rất dài (255+ ký tự) trả về rỗng hoặc lỗi | GET `/api/products?search=AAAA...` (256 ký tự) | `X-Student-Id: 23127459` | Query: `search=` + 256 * "A" | 200 | Mảng JSON (rỗng hoặc lỗi được xử lý ổn định) |
| TC_FR05_010 | FR-05: Chi Tiết Sản Phẩm | Phân Vùng Phương Định | Lấy chi tiết sản phẩm với ID hợp lệ tồn tại trả về sản phẩm | GET `/api/products/1` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=1` | 200 | Đối tượng JSON có `id`, `name`, `price`, `description`, `imageUrl`, `category_id` |
| TC_FR05_011 | FR-05: Chi Tiết Sản Phẩm | Phân Vùng Phương Định | Lấy chi tiết sản phẩm với ID không tồn tại trả về đối tượng rỗng | GET `/api/products/99999` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=99999` | 200 | Đối tượng JSON rỗng `{}` |
| TC_FR05_012 | FR-05: Chi Tiết Sản Phẩm | BVA | Lấy chi tiết sản phẩm với ID=0 (giới hạn) | GET `/api/products/0` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=0` | 200 | Đối tượng JSON rỗng `{}` (không có sản phẩm với id=0) |
| TC_FR05_013 | FR-05: Chi Tiết Sản Phẩm | BVA | Lấy chi tiết sản phẩm với ID=-1 (giới hạn âm) | GET `/api/products/-1` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=-1` | 200 | Đối tượng JSON rỗng `{}` |
| TC_FR05_014 | FR-05: Chi Tiết Sản Phẩm | BVA | Lấy chi tiết sản phẩm với ID rất lớn (ví dụ: 2147483647) | GET `/api/products/2147483647` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=2147483647` | 200 | Đối tượng JSON rỗng `{}` |
| TC_FR05_015 | FR-05: Chi Tiết Sản Phẩm | Phân Vùng Phương Định | Lấy chi tiết sản phẩm với ID không phải số (chuỗi) | GET `/api/products/abc` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=abc` | 200 hoặc 500 | Phản hồi lỗi hoặc đối tượng rỗng (không bị crash) |
| TC_FR05_016 | FR-05: Liệt Kê Sản Phẩm | Phân Vùng Phương Định | Sản phẩm trả về có kiểu dữ liệu đúng: id là số nguyên, name là chuỗi, price là số/chuỗi | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Sản phẩm đầu tiên: `id` là số, `name` là chuỗi, `price` là số hoặc chuỗi |
| TC_FR05_017 | FR-05: Tìm Kiếm Sản Phẩm | BVA | Tìm kiếm với từ khóa một ký tự trả về kết quả khớp một phần | GET `/api/products?search=P` | `X-Student-Id: 23127459` | Query: `search=P` | 200 | Mảng JSON chứa sản phẩm có "P" trong tên |
| TC_FR05_018 | FR-05: Tìm Kiếm Sản Phẩm | BVA | Tìm kiếm với từ khóa chỉ chứa khoảng trắng | GET `/api/products?search=%20%20%20` | `X-Student-Id: 23127459` | Query: `search=   ` (khoảng trắng) | 200 | Mảng JSON (rỗng hoặc tất cả sản phẩm) |

## 2. Chuyển Trạng Thái

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thức | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_019 | FR-05: Liệt Kê Sản Phẩm | Chuyển Trạng Thái | Sau khi sản phẩm mới được thêm (POST /api/products), GET /api/products bao gồm sản phẩm đó | GET `/api/products` | `X-Student-Id: 23127459` | Không có (đi trước bởi POST tạo mới) | 200 | Mảng chứa sản phẩm vừa thêm |
| TC_FR05_020 | FR-05: Liệt Kê Sản Phẩm | Chuyển Trạng Thái | Sau khi sản phẩm bị xóa (DELETE /api/products/:id), GET /api/products không còn chứa sản phẩm đó | GET `/api/products` | `X-Student-Id: 23127459` | Không có (đi trước bởi DELETE) | 200 | Mảng không còn chứa sản phẩm đã xóa |
| TC_FR05_021 | FR-05: Liệt Kê Sản Phẩm | Chuyển Trạng Thái | Sau khi sản phẩm được cập nhật (PUT /api/products/:id), GET /api/products phản ánh thay đổi | GET `/api/products` | `X-Student-Id: 23127459` | Không có (đi trước bởi PUT cập nhật) | 200 | Sản phẩm trong mảng có tên/giá đã cập nhật |
| TC_FR05_022 | FR-05: Chi Tiết Sản Phẩm | Chuyển Trạng Thái | Sau khi cập nhật giá sản phẩm, GET /api/products/:id trả về giá mới | GET `/api/products/:id` | `X-Student-Id: 23127459` | Tham số đường dẫn: id sản phẩm đã cập nhật | 200 | Đối tượng sản phẩm có giá trị `price` đã cập nhật |
| TC_FR05_023 | FR-05: Tìm Kiếm Sản Phẩm | Chuyển Trạng Thái | Kết quả tìm kiếm cập nhật sau khi tên sản phẩm thay đổi | GET `/api/products?search=newname` | `X-Student-Id: 23127459` | Query: `search=newname` (đi trước bởi PUT) | 200 | Mảng chứa sản phẩm với tên mới |

## 3. Kiểm Tra Bảo Mật

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thức | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_024 | FR-05: Liệt Kê Sản Phẩm | Bảo Mật (SEC-02) | Truy cập GET /api/products không xác thực vẫn hoạt động (endpoint công khai) | GET `/api/products` | `X-Student-Id: 23127459` (không có header Auth) | Không có | 200 | Mảng JSON sản phẩm (endpoint là công khai) |
| TC_FR05_025 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-05) | SQL Injection qua tham số tìm kiếm — đầu vào `' OR '1'='1` không nên trả về tất cả bản ghi | GET `/api/products?search=%27%20OR%20%271%27%3D%271` | `X-Student-Id: 23127459` | Query: `search=' OR '1'='1` | 200 | Mảng rỗng hoặc chỉ chứa sản phẩm khớp chuỗi văn bản (KHÔNG PHẢI tất cả sản phẩm). **DỰ KIẾN CÓ LỖI:** Backend dùng nội suy chuỗi — SQLi có thể trả về tất cả sản phẩm |
| TC_FR05_026 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-05) | SQL Injection — đầu vào `'; DROP TABLE products; --` không gây lỗi cơ sở dữ liệu | GET `/api/products?search=%27%3B%20DROP%20TABLE%20products%3B%20--` | `X-Student-Id: 23127459` | Query: `search='; DROP TABLE products; --` | 200 hoặc 500 | Nên trả về lỗi hoặc mảng rỗng, KHÔNG bị crash. Bảng sản phẩm vẫn được đảm bảo đúng vị |
| TC_FR05_027 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-04) | XSS qua tham số tìm kiếm — `<script>alert('XSS')</script>` không nên thực thi | GET `/api/products?search=%3Cscript%3Ealert(%27XSS%27)%3C%2Fscript%3E` | `X-Student-Id: 23127459` | Query: `search=<script>alert('XSS')</script>` | 200 | Phản hồi chứa các thực thể HTML đã mã hóa, không chứa thẻ `<script>` thô |
| TC_FR05_028 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-04) | XSS — `<img src=x onerror=alert(1)>` trong truy vấn tìm kiếm | GET `/api/products?search=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E` | `X-Student-Id: 23127459` | Query: `search=<img src=x onerror=alert(1)>` | 200 | Phản hồi không chứa thuộc tính HTML chưa được mã hóa |
| TC_FR05_029 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-04) | XSS — thử tiêm `"><script>alert(1)</script>` | GET `/api/products?search=%22%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E` | `X-Student-Id: 23127459` | Query: `search="><script>alert(1)</script>` | 200 | Không thực thi script; đầu vào được xử lý an toàn trong phản hồi |
| TC_FR05_030 | FR-05: Chi Tiết Sản Phẩm | Bảo Mật (SEC-05) | SQL Injection qua ID sản phẩm — `1 OR 1=1` không nên trả về tất cả sản phẩm | GET `/api/products/1%20OR%201%3D1` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=1 OR 1=1` | 200 | Đối tượng rỗng `{}` hoặc một sản phẩm (đã dùng parameterized query cho :id) |
| TC_FR05_031 | FR-05: Liệt Kê Sản Phẩm | Bảo Mật (SEC-02) | Token JWT hết hạn/không hợp lệ — vẫn truy cập được sản phẩm công khai | GET `/api/products` | `X-Student-Id: 23127459`, `Authorization: Bearer invalid_token` | Không có | 200 | Mảng JSON (endpoint công khai bỏ qua token không hợp lệ) |
| TC_FR05_032 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-04) | XSS — `javascript:alert(1)` trong tham số tìm kiếm | GET `/api/products?search=javascript%3Aalert(1)` | `X-Student-Id: 23127459` | Query: `search=javascript:alert(1)` | 200 | Không thực thi script |
| TC_FR05_033 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật | Tiêm truy vấn Unicode/emoji — không gây crash server | GET `/api/products?search=%F0%9F%98%80` | `X-Student-Id: 23127459` | Query: `search=😀` | 200 | Mảng rỗng hoặc sản phẩm khớp emoji, không có lỗi 500 |

## 4. Xác Nhận Schema

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thức | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_034 | FR-05: Liệt Kê Sản Phẩm | Schema | Mã trạng thái phản hồi là 200 cho yêu cầu hợp lệ | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mã trạng thái chính xác 200 |
| TC_FR05_035 | FR-05: Liệt Kê Sản Phẩm | Schema | Header Content-Type của phản hồi là application/json | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Header `Content-Type` chứa `application/json` |
| TC_FR05_036 | FR-05: Liệt Kê Sản Phẩm | Schema | Nội dung phản hồi là mảng JSON (không phải null, không phải đối tượng) | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Nội dung phản hồi là kiểu Array |
| TC_FR05_037 | FR-05: Liệt Kê Sản Phẩm | Schema | Mỗi đối tượng sản phẩm có các trường bắt buộc: id, name, price, description, imageUrl, category_id | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mỗi đối tượng: `id` (số), `name` (chuỗi), `price` (số/chuỗi), `description` (chuỗi), `imageUrl` (chuỗi), `category_id` (số) |
| TC_FR05_038 | FR-05: Tìm Kiếm Sản Phẩm | Schema | Kết quả tìm kiếm trả về mảng JSON ngay cả khi kết quả rỗng | GET `/api/products?search=nonexistent` | `X-Student-Id: 23127459` | Query: `search=nonexistent` | 200 | Nội dung phản hồi là `[]` (mảng rỗng), không phải null hoặc đối tượng lỗi |
| TC_FR05_039 | FR-05: Chi Tiết Sản Phẩm | Schema | Chi tiết sản phẩm trả về đối tượng JSON với tất cả các trường bắt buộc | GET `/api/products/1` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=1` | 200 | Đối tượng có `id`, `name`, `price`, `description`, `imageUrl`, `category_id` |
| TC_FR05_040 | FR-05: Chi Tiết Sản Phẩm | Schema | Chi tiết sản phẩm với ID không tồn tại trả về đối tượng JSON rỗng `{}` | GET `/api/products/99999` | `X-Student-Id: 23127459` | Tham số đường dẫn: `id=99999` | 200 | Phản hồi là `{}`, không phải null hoặc lỗi |
| TC_FR05_041 | FR-05: Liệt Kê Sản Phẩm | Schema | Phản hồi không lộ các trường nhạy cảm (ví dụ: không có `password`, không có `reset_token`) | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Không có sản phẩm nào chứa trường `password` hoặc `reset_token` |
| TC_FR05_042 | FR-05: Tìm Kiếm Sản Phẩm | Schema | Tìm kiếm với ký tự đặc biệt trả về JSON hợp lệ (không có lỗi phân tích) | GET `/api/products?search=%3C%3E%26%22%27` | `X-Student-Id: 23127459` | Query: `search=<>&"'` | 200 | Phản hồi là JSON hợp lệ; không có lỗi 500 |
| TC_FR05_043 | FR-05: Liệt Kê Sản Phẩm | Schema | Header phản hồi không lộ thông tin phiên bản/ngôn ngữ máy chủ | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Không có header `X-Powered-By` hoặc header `Server` chi tiết lộ phiên bản Node.js |

---

## Kiểm Tra Thực Tế & Mở Rộng

### Nhãn đánh giá

| Mã Trường Hợp Kiểm Tra | Nhãn | Lý Do |
|---|---|---|
| TC_FR05_001 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_002 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_003 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_004 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_005 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_006 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_007 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_008 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_009 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_010 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_011 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_012 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_013 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_014 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_015 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_016 | INCOMPLETE | Có thể gộp chung với TC_FR05_001 thay vì tách riêng |
| TC_FR05_017 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_018 | VALID | Nên chỉnh sửa lại kết quả phản hồi dự kiến là nhận tất cả kết quả |
| TC_FR05_019 | INVALID | Chỉ kiểm tra cho tìm kiếm và xem sản phẩm thì không thể kiểm tra sau khi chỉnh sửa, thuộc phạm vi FR khác |
| TC_FR05_020 | INVALID | Chỉ kiểm tra cho tìm kiếm và xem sản phẩm thì không thể kiểm tra sau khi chỉnh sửa, thuộc phạm vi FR khác |
| TC_FR05_021 | INVALID | Chỉ kiểm tra cho tìm kiếm và xem sản phẩm thì không thể kiểm tra sau khi chỉnh sửa, thuộc phạm vi FR khác |
| TC_FR05_022 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_023 | INVALID | Chỉ kiểm tra cho tìm kiếm và xem sản phẩm thì không thể kiểm tra sau khi chỉnh sửa, thuộc phạm vi FR khác |
| TC_FR05_024 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_025 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_026 | INVALID | Trùng việc kiểm tra SQL injection tại endpoint /products? (tìm kiếm) của TC_FR05_025 |
| TC_FR05_027 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_028 | INVALID | Trùng việc kiểm tra XSS tại endpoint /products? (tìm kiếm) của TC_FR05_027 |
| TC_FR05_029 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_030 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_031 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_032 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_033 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_034 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_035 | INCOMPLETE | Nên gộp chung kiểm tra với TC_FR05_034 thay vì tách riêng |
| TC_FR05_036 | INCOMPLETE | Nên gộp chung kiểm tra với TC_FR05_034 thay vì tách riêng |
| TC_FR05_037 | INCOMPLETE | Nên gộp chung kiểm tra với TC_FR05_034 thay vì tách riêng |
| TC_FR05_038 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_039 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_040 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06 (Xem chi tiết sản phẩm), không phải FR-05 (Liệt kê & Tìm kiếm) đã chọn |
| TC_FR05_041 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_042 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_043 | INCOMPLETE | Nên gộp chung với TC_FR05_041 thay vì tách riêng do đều kiểm tra trường nhạy cảm và lộ thông tin |
| TC_FR05_044 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_045 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_046 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_047 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_048 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_049 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_050 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_051 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_052 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_053 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_054 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_055 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR05_056 | VALID | Phù hợp với mục đích kiểm thử cho chức năng |


### Chi tiết 13 Test Cases mới bổ sung (044-056) — Đúng phạm vi FR-05 (chỉ GET /api/products và ?search=)

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_044 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với khoảng trắng đầu và cuối được cắt bỏ (trim) trước khi truy vấn | GET `/api/products?search=%20iPhone%20` | `X-Student-Id: 23127459` | Query: `search= iPhone ` (có khoảng trắng đầu/cuối) | 200 | Mảng JSON chứa sản phẩm có tên chứa "iPhone" (khoảng trắng đã được trim, không trả về lỗi) |
| TC_FR05_045 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-05) | Tìm kiếm với ký tự wildcard SQL phần trăm (%) được xử lý như chuỗi thường | GET `/api/products?search=%25` | `X-Student-Id: 23127459` | Query: `search=%` | 200 | Mảng rỗng hoặc chỉ sản phẩm chứa ký tự "%" theo nghĩa đen, không trả về toàn bộ bảng (không bị wildcard injection) |
| TC_FR05_046 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-05) | Tìm kiếm với ký tự wildcard SQL gạch dưới (_) được xử lý như chuỗi thường | GET `/api/products?search=_` | `X-Student-Id: 23127459` | Query: `search=_` | 200 | Mảng rỗng hoặc chỉ sản phẩm chứa "_" theo nghĩa đen, không bị wildcard injection |
| TC_FR05_047 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm kết hợp lọc theo danh mục (category_id) cùng với từ khóa search | GET `/api/products?search=Pro&category_id=1` | `X-Student-Id: 23127459` | Query: `search=Pro`, `category_id=1` | 200 | Mảng JSON chỉ chứa sản phẩm thuộc danh mục 1 và có tên chứa "Pro" (nếu API không hỗ trợ thì bỏ qua tham số thừa và vẫn trả về 200) |
| TC_FR05_048 | FR-05: Liệt Kê Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm kết hợp phân trang page và limit | GET `/api/products?search=&page=1&limit=2` | `X-Student-Id: 23127459` | Query: `search=`, `page=1`, `limit=2` | 200 | Mảng JSON trả về tối đa 2 sản phẩm hoặc toàn bộ danh sách nếu API chưa hỗ trợ phân trang (không lỗi 500) |
| TC_FR05_049 | FR-05: Liệt Kê Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm kết hợp sắp xếp (sort) theo giá | GET `/api/products?search=&sort=price_asc` | `X-Student-Id: 23127459` | Query: `search=`, `sort=price_asc` | 200 | Mảng JSON trả về danh sách đã sắp xếp theo giá tăng dần hoặc bỏ qua tham số sort và vẫn trả về 200 nếu chưa hỗ trợ |
| TC_FR05_050 | FR-05: Liệt Kê Sản Phẩm | Schema | Kiểm tra trường imageUrl có định dạng ảnh hợp lệ | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mỗi sản phẩm có `imageUrl` là chuỗi bắt đầu bằng `http` và kết thúc bằng `.jpg`, `.png`, `.webp` hoặc tương đương, không rỗng |
| TC_FR05_051 | FR-05: Liệt Kê Sản Phẩm | Schema | Kiểm tra trường giá (price) đúng đơn vị và định dạng phân cách hàng nghìn | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mỗi sản phẩm có `price` là số dương (>0), kiểu number hoặc string số, không chứa ký tự lạ; khi hiển thị UI sẽ định dạng với `₫` và dấu phẩy phân cách nghìn |
| TC_FR05_052 | FR-05: Liệt Kê Sản Phẩm | Schema | Kiểm tra header CORS cho endpoint công khai | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Header `Access-Control-Allow-Origin` tồn tại (ví dụ: `*` hoặc `http://localhost:5173`), cho phép truy cập từ frontend |
| TC_FR05_053 | FR-05: Liệt Kê Sản Phẩm | Schema | Kiểm tra header Cache-Control / ETag cho GET danh sách sản phẩm | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Header `Cache-Control` hoặc `ETag` tồn tại, không lộ thông tin nhạy cảm |
| TC_FR05_054 | FR-05: Liệt Kê Sản Phẩm | Bảo Mật | Kiểm tra giới hạn tần suất (rate limiting) khi gọi liên tiếp nhiều lần | GET `/api/products` | `X-Student-Id: 23127459` | Gửi 20 request liên tiếp trong 1 giây | 200 hoặc 429 | Tất cả request trả về 200 hoặc có 429 khi vượt ngưỡng, không bị crash, không lộ stack trace |
| TC_FR05_055 | FR-05: Tìm Kiếm Sản Phẩm | Phân Vùng Phương Định | Tìm kiếm với từ khóa chứa ký tự đặc biệt đã mã hóa URL (ví dụ: cộng, gạch nối) | GET `/api/products?search=iPhone-Pro` | `X-Student-Id: 23127459` | Query: `search=iPhone-Pro` | 200 | Mảng JSON chứa sản phẩm có tên chứa "iPhone-Pro" hoặc xử lý như chuỗi thường, không lỗi 500 |
| TC_FR05_056 | FR-05: Liệt Kê Sản Phẩm | Schema | Kiểm tra mỗi sản phẩm có alt text mô tả ảnh (thông qua trường imageUrl và name) | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Mỗi sản phẩm có `name` không rỗng làm alt text, `imageUrl` không rỗng, đảm bảo spec FR-05 "Ảnh có alt text mô tả" có dữ liệu để UI hiển thị |

### Tổng hợp Test Cases sau khi chỉnh sửa

**Thống kê theo nhãn sau khi chỉnh sửa (trên tổng 56 Test Cases chính, sau khi bổ sung 13 TC mới và loại 10 TC ngoài phạm vi FR-06):**

| Nhãn | Số lượng | Tỷ lệ | Danh sách Test Case |
|---|---|---|---|
| VALID | 35 | 62,5% | TC_FR05_001, 002, 003, 004, 005, 006, 007, 008, 009, 017, 018*, 024, 025, 027, 029, 031, 032, 033, 034, 038, 041, 042, 044, 045, 046, 047, 048, 049, 050, 051, 052, 053, 054, 055, 056 |
| INVALID | 16 | 28,6% | TC_FR05_010, 011, 012, 013, 014, 015, 019, 020, 021, 022, 023, 026, 028, 030, 039, 040 |
| INCOMPLETE | 5 | 8,9% | TC_FR05_016, 035, 036, 037, 043 |
| **Tổng** | **56** | **100%** | |

> *Ghi chú: TC_FR05_018 vẫn giữ nhãn VALID nhưng có ghi chú cần chỉnh sửa kết quả dự kiến thành "nhận tất cả kết quả" (xem chi tiết bên dưới). Các TC 010, 011, 012, 013, 014, 015, 022, 030, 039, 040 đã chuyển sang INVALID do ngoài phạm vi FR-06.

**Chi tiết các Test Case cần chỉnh sửa / gộp:**

| Mã Test Case | Nhãn mới | Hành động đề xuất sau chỉnh sửa |
|---|---|---|
| TC_FR05_010 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06, không thuộc FR-05 đã chọn (đã loại khỏi bộ chính thức) |
| TC_FR05_014 | INVALID | Ngoài phạm vi — endpoint GET /api/products/:id thuộc FR-06, không thuộc FR-05 đã chọn (đã loại khỏi bộ chính thức) |
| TC_FR05_016 | INCOMPLETE | Gộp chung vào TC_FR05_001 — kiểm tra kiểu dữ liệu có thể thực hiện chung trong cùng một lần gọi GET `/api/products` thay vì tách thành Test Case riêng |
| TC_FR05_018 | VALID (cần chỉnh) | Sửa kết quả dự kiến từ `Mảng JSON (rỗng hoặc tất cả)` thành `Mảng JSON chứa tất cả sản phẩm` — khi `search` chỉ chứa khoảng trắng thì backend trim và trả về toàn bộ danh sách |
| TC_FR05_035 | INCOMPLETE | Gộp chung vào TC_FR05_034 — kiểm tra `Content-Type` và kiểm tra `mảng JSON` có thể gộp thành một Test Case Schema duy nhất |
| TC_FR05_036 | INCOMPLETE | Gộp chung vào TC_FR05_034 — như trên |
| TC_FR05_037 | INCOMPLETE | Gộp chung vào TC_FR05_034 — như trên, kiểm tra các trường bắt buộc cũng có thể đưa vào cùng Test Case tổng hợp Schema với TC_FR05_034 |
| TC_FR05_043 | INCOMPLETE | Gộp chung vào TC_FR05_041 — đều kiểm tra lộ thông tin nhạy cảm, nên gộp thành một Test Case kiểm tra `không lộ trường nhạy cảm và không lộ header phiên bản` |

**Kết quả sau khi gộp (dự kiến):**
- Từ 56 Test Cases chính → còn **51 Test Cases** sau khi gộp (giảm 5 Test Cases INCOMPLETE do gộp).
- 16 Test Cases INVALID (10 ngoài phạm vi FR-06 + 6 thuộc FR khác/trùng lặp: 019,020,021,023,026,028) sẽ bị loại khỏi bộ kiểm thử chính thức, chỉ giữ lại làm bằng chứng audit.
- Số Test Cases hợp lệ (VALID) còn lại: **35**, đạt yêu cầu tối thiểu ≥35 cho FR-05.

### Trường Hợp Kiểm Tra Bổ Sung (5 thêm — AI thường bỏ sót)

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thức | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR05_EXT_001 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-05) | SQL Injection lặp hai — từ khóa tìm kiếm được lưu trong DB sau đó được trích dạt trong truy vấn khác. Đầu vào `'; INSERT INTO users VALUES('hacker','hack@evil.com','pass','admin'); --` | GET `/api/products?search=%27%3B%20INSERT%20INTO%20users%20VALUES(%27hacker%27%2C%27hack%40evil.com%27%2C%27pass%27%2C%27admin%27)%3B%20--` | `X-Student-Id: 23127459` | Query: `search='; INSERT INTO users VALUES('hacker','hack@evil.com','pass','admin'); --` | 200 | Không có tài khoản nào được tạo trong DB; chuỗi được xử lý là từ khóa tìm kiếm thật |
| TC_FR05_EXT_002 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật | NoSQL Injection — đầu vào `{"$gt": ""}` hoặc `{"$ne": null}` để vượt qua bộ lọc | GET `/api/products?search=%7B%22%24gt%22%3A%20%22%22%7D` | `X-Student-Id: 23127459` | Query: `search={"$gt": ""}` | 200 | Mảng rỗng hoặc trùng khớp chuỗi (SQLite không dễ bị NoSQLi, nhưng cần kiểm tra để xác nhận) |
| TC_FR05_EXT_003 | FR-05: Liệt Kê Sản Phẩm | Schema | Phản hồi thời gian dưới tải trọng bình thường (< 500ms cho 50 sản phẩm) | GET `/api/products` | `X-Student-Id: 23127459` | Không có | 200 | Phản hồi hoàn thành trong vòng 500ms; không có sự sụt giảm hiệu suất |
| TC_FR05_EXT_004 | FR-05: Tìm Kiếm Sản Phẩm | Bảo Mật (SEC-04) | Stored XSS qua tên sản phẩm — nếu quản trị viên tạo sản phẩm với tên `<img src=x onerror=alert(1)>`, kết quả tìm kiếm nên mã hóa nó | GET `/api/products?search=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E` | `X-Student-Id: 23127459` | Query: tìm kiếm cho sản phẩm chứa XSS payload | 200 | Nếu sản phẩm tồn tại, các thực thể HTML được mã hóa trong phản hồi JSON |
| TC_FR05_EXT_005 | FR-05: Liệt Kê Sản Phẩm | Bảo Mật | HTTP Verb Tampering — thử POST/PUT/DELETE trên endpoint chỉ cho GET | POST `/api/products` | `X-Student-Id: 23127459` | Body: `{}` | 404 hoặc 405 | Method Not Allowed hoặc không tìm thấy (không nên tạo sản phẩm khi không có xác thực) |

**Lý do AI thường bỏ sót các extension test cases:**
1. **TC_FR05_EXT_001**: AI thường chỉ test SQLi cơ bản (UNION, OR 1=1) mà quên second-order injection — dữ liệu được lưu rồi query lại sau.
2. **TC_FR05_EXT_002**: AI thường không test NoSQLi trên SQL databases vì cho rằng không liên quan, nhưng việc xác nhận là cần thiết.
3. **TC_FR05_EXT_003**: Performance testing thường bị bỏ qua trong API test cases thuần túy.
4. **TC_FR05_EXT_004**: Stored XSS khác với Reflected XSS — cần test cả khi dữ liệu đầu vào đã được lưu trong DB.
5. **TC_FR05_EXT_005**: HTTP Verb Tampering là lỗi hổng phổ biến nhưng AI thường chỉ test đúng method mà spec yêu cầu.


