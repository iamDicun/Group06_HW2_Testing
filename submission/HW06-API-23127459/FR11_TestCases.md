# FR-11: Xem Lịch Sử Đơn Hàng (Người Dùng) — Các Trường Hợp Kiểm Tra API

**MSSV:** 23127459
**Hệ Thống Đang Kiểm Thử:** Backend API EShop (http://localhost:3000)
**Chức Năng:** FR-11 — Xem lịch sử đơn hàng (Người dùng)
**Các Endpoint API:** GET /api/orders/my-orders, GET /api/orders/:id, PUT /api/orders/:id/cancel

---

## 1. Phân Vùng Phương Định / Phân Vùng Đồng Nhất & BVA

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_001 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Người dùng đã xác thực có đơn hàng lấy danh sách đơn hàng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mảng JSON các đối tượng đơn hàng |
| TC_FR11_002 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Người dùng không có đơn hàng trả về mảng rỗng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer fresh_user_token | Không | 200 | Mảng JSON rỗng [] |
| TC_FR11_003 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng chứa các trường bắt buộc: id, user_id, total_amount, status, shipping_address | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mỗi đơn hàng có id (số), user_id (số), total_amount (số), status (chuỗi), shipping_address (chuỗi) |
| TC_FR11_004 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng được trả về theo thứ tự ID giảm dần (mới nhất lên trước) | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mảng sắp xếp theo id DESC; đơn hàng đầu tiên có id lớn nhất |
| TC_FR11_005 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Giá trị trạng thái đơn hàng hợp lệ: pending, confirmed, shipping, delivered, canceled | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Trạng thái mỗi đơn hàng là một trong: pending, confirmed, shipping, delivered, canceled |
| TC_FR11_006 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng với trạng thái pending có cấu trúc đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Ít nhất một đơn hàng với status = pending |
| TC_FR11_007 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng với trạng thái confirmed có cấu trúc đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Ít nhất một đơn hàng với status = confirmed |
| TC_FR11_008 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng với trạng thái shipping có cấu trúc đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Ít nhất một đơn hàng với status = shipping |
| TC_FR11_009 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng với trạng thái delivered có cấu trúc đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Ít nhất một đơn hàng với status = delivered |
| TC_FR11_010 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Đơn hàng với trạng thái canceled có cấu trúc đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Ít nhất một đơn hàng với status = canceled |
| TC_FR11_011 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | total_amount là số dương | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mỗi đơn hàng total_amount > 0 hoặc >= 0 |
| TC_FR11_012 | FR-11: Chi Tiết Đơn Hàng | Phân Vùng Phương Định | Lấy chi tiết đơn hàng với ID hợp lệ thuộc người dùng | GET /api/orders/:id | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=valid_order_id | 200 | Đối tượng JSON với các trường đơn hàng |
| TC_FR11_013 | FR-11: Chi Tiết Đơn Hàng | Phân Vùng Phương Định | Lấy chi tiết đơn hàng với ID không tồn tại trả về 404 | GET /api/orders/99999 | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=99999 | 404 | {"error": "Order not found"} |
| TC_FR11_014 | FR-11: Hủy Đơn Hàng | Phân Vùng Phương Định | Hủy đơn hàng với trạng thái pending thành công | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=pending_order_id | 200 | {"message": "Order canceled successfully"} |
| TC_FR11_015 | FR-11: Hủy Đơn Hàng | Phân Vùng Phương Định | Hủy đơn hàng với trạng thái confirmed thành công (theo logic code) | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=confirmed_order_id | 200 | {"message": "Order canceled successfully"} |
| TC_FR11_016 | FR-11: Hủy Đơn Hàng | Phân Vùng Phương Định | Hủy đơn hàng với trạng thái shipping — người dùng thử hủy (LỖI) | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=shipping_order_id | 200 | {"message": "Order canceled successfully"} — LỖI: Code chỉ chặn delivered/canceled |
| TC_FR11_017 | FR-11: Hủy Đơn Hàng | BVA | Hủy đơn hàng với trạng thái delivered (trạng thái cuối) thất bại | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=delivered_order_id | 400 | {"error": "Cannot cancel this order."} |
| TC_FR11_018 | FR-11: Hủy Đơn Hàng | BVA | Hủy đơn hàng với trạng thái canceled (đã bị hủy) thất bại | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=canceled_order_id | 400 | {"error": "Cannot cancel this order."} |
| TC_FR11_019 | FR-11: Hủy Đơn Hàng | BVA | Hủy đơn hàng không tồn tại trả về 404 | PUT /api/orders/99999/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=99999 | 404 | {"error": "Order not found"} |
| TC_FR11_020 | FR-11: Hủy Đơn Hàng | BVA | Hủy đơn hàng với ID âm | PUT /api/orders/-1/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=-1 | 404 | {"error": "Order not found"} |
| TC_FR11_021 | FR-11: Đơn Hàng Của Tôi | BVA | Nhiều đơn hàng (5+) được trả về đúng với tất cả các trường | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Độ dài mảng >= 5; tất cả đơn hàng có cấu trúc đúng |

## 2. Chuyển Trạng Thái

| Mã Trường Hợp Kiểm Tra | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_022 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Pending -> Confirmed: Admin xác nhận đơn hàng, người dùng thấy trạng thái mới | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (sau admin PUT /api/admin/orders/:id/status) | 200 | Trạng thái đơn hàng chuyển từ pending sang confirmed |
| TC_FR11_023 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Pending -> Canceled: Người dùng hủy đơn hàng pending | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (sau PUT /api/orders/:id/cancel) | 200 | Trạng thái đơn hàng chuyển thành canceled |
| TC_FR11_024 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Confirmed -> Shipping: Admin giao đơn hàng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (sau admin cập nhật) | 200 | Trạng thái đơn hàng chuyển thành shipping |
| TC_FR11_025 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Shipping -> Delivered: Admin đánh dấu đã giao | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (sau admin cập nhật) | 200 | Trạng thái đơn hàng chuyển thành delivered |
| TC_FR11_026 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Delivered (trạng thái cuối) -> không cho phép chuyển (trừ lỗi: delivered từ canceled) | PUT /api/admin/orders/:id/status | X-Student-Id: 23127459, Authorization: Bearer admin_token | {"status": "pending"} | 400 | {"error": "Invalid state transition from delivered to pending"} |
| TC_FR11_027 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Canceled (trạng thái cuối) -> không cho phép chuyển sang confirmed | PUT /api/admin/orders/:id/status | X-Student-Id: 23127459, Authorization: Bearer admin_token | {"status": "confirmed"} | 400 | {"error": "Invalid state transition from canceled to confirmed"} |
| TC_FR11_028 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Confirmed -> Canceled: Admin hủy đơn hàng đã xác nhận | PUT /api/admin/orders/:id/status | X-Student-Id: 23127459, Authorization: Bearer admin_token | {"status": "canceled"} | 200 | {"message": "Order status updated"} |
| TC_FR11_029 | FR-11: Hủy Đơn Hàng | Chuyển Trạng Thái | Shipping -> Canceled bởi người dùng (LỖI: nên bị từ chối theo FR-10) | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=shipping_order_id | 200 | {"message": "Order canceled successfully"} — LỖI: FR-10 nói người dùng không được phép hủy đơn hàng shipping |
| TC_FR11_030 | FR-11: Chuyển Trạng Thái | Chuyển Trạng Thái | Pending -> Shipping (bỏ qua confirmed) là chuyển đổi không hợp lệ | PUT /api/admin/orders/:id/status | X-Student-Id: 23127459, Authorization: Bearer admin_token | {"status": "shipping"} | 400 | {"error": "Invalid state transition from pending to shipping"} |

## 3. Kiểm Tra Bảo Mật

| Mã Trường Hợp Kiểm Tra | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_031 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (SEC-02) | Truy cập không xác thực vào GET /api/orders/my-orders trả về 401 | GET /api/orders/my-orders | X-Student-Id: 23127459 (không có header Auth) | Không | 401 | {"error": "Unauthorized"} |
| TC_FR11_032 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (SEC-02) | JWT token không hợp lệ trả về 403 | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer invalid_token_here | Không | 403 | {"error": "Forbidden"} |
| TC_FR11_033 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (SEC-02) | JWT token hết hạn trả về 403 | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer expired_token | Không | 403 | {"error": "Forbidden"} |
| TC_FR11_034 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (IDOR) | Người dùng A thử xem đơn hàng Người dùng B qua việc thao tác ID trực tiếp — chỉ được xem đơn hàng của mình | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer userA_token | Không | 200 | Chỉ đơn hàng mà user_id khớp với ID Người dùng A |
| TC_FR11_035 | FR-11: Chi Tiết Đơn Hàng | Bảo Mật (IDOR) | Người dùng A thử xem chi tiết đơn hàng Người dùng B qua ID đơn hàng (LỖI: không kiểm tra sở hữu) | GET /api/orders/:id | X-Student-Id: 23127459, Authorization: Bearer userA_token | Tham số đường dẫn: id=userB_order_id | 200 | LỖI: Trả về dữ liệu đơn hàng Người dùng B — không xác thực sở hữu trên GET /api/orders/:id |
| TC_FR11_036 | FR-11: Hủy Đơn Hàng | Bảo Mật (IDOR) | Người dùng A thử hủy đơn hàng Người dùng B (có kiểm tra sở hữu) | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer userA_token | Tham số đường dẫn: id=userB_order_id | 404 | {"error": "Order not found"} (có kiểm tra sở hữu cho hủy) |
| TC_FR11_037 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (SEC-02) | Token admin truy cập endpoint người dùng trả về đơn hàng của admin | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer admin_token | Không | 200 | Trả về chỉ đơn hàng của tài khoản admin |
| TC_FR11_038 | FR-11: Hủy Đơn Hàng | Bảo Mật | Hủy với ID đơn hàng bị thao tác (SQL injection) | PUT /api/orders/1%20OR%201=1/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=1 OR 1=1 | 404 | {"error": "Order not found"} (parameterized query) |
| TC_FR11_039 | FR-11: Đơn Hàng Của Tôi | Bảo Mật | JWT token với claim user_id bị thao tác | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer tampered_jwt_token | Không | 403 | {"error": "Forbidden"} (xác thực chữ ký thất bại) |

## 4. Xác Nhận Schema

| Mã Trường Hợp Kiểm Tra | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_040 | FR-11: Đơn Hàng Của Tôi | Schema | Header Content-Type là application/json | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Header Content-Type chứa application/json |
| TC_FR11_041 | FR-11: Đơn Hàng Của Tôi | Schema | Phản hồi body là mảng JSON (không null, không đối tượng) | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Phản hồi body là kiểu Array |
| TC_FR11_042 | FR-11: Chi Tiết Đơn Hàng | Schema | Chi tiết đơn hàng trả về đối tượng JSON với tất cả các trường cần thiết | GET /api/orders/:id | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=valid_id | 200 | Đối tượng có id, user_id, total_amount, status, shipping_address |
| TC_FR11_043 | FR-11: Chi Tiết Đơn Hàng | Schema | Đơn hàng không tồn tại trả về cấu trúc JSON lỗi đúng | GET /api/orders/99999 | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=99999 | 404 | Đối tượng JSON với trường "error" (kiểu string) |
| TC_FR11_044 | FR-11: Hủy Đơn Hàng | Schema | Hủy thành công trả về cấu trúc JSON đúng | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=pending_id | 200 | Đối tượng JSON với trường "message" (kiểu string) |
| TC_FR11_045 | FR-11: Hủy Đơn Hàng | Schema | Hủy thất bại trả về cấu trúc JSON lỗi đúng | PUT /api/orders/:id/cancel | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=delivered_id | 400 | Đối tượng JSON với trường "error" (kiểu string) |
| TC_FR11_046 | FR-11: Đơn Hàng Của Tôi | Schema | Phản hồi không lộ các trường nhạy cảm (password, reset_token) | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Không đơn hàng nào chứa trường password hoặc reset_token |
| TC_FR11_047 | FR-11: Đơn Hàng Của Tôi | Schema | Phản hồi lỗi xác thực đúng cấu trúc JSON | GET /api/orders/my-orders | X-Student-Id: 23127459 (không Auth) | Không | 401 | Đối tượng JSON chỉ có trường "error" (không stack trace) |
| TC_FR11_048 | FR-11: Đơn Hàng Của Tôi | Schema | Phản hồi không lộ thông tin server nội bộ | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Không có header X-Powered-By hoặc Server lộ Node.js |

---

## Kiểm Tra Thực Tế & Mở Rộng

### Nhãn Đánh Giá

| Mã Trường Hợp Kiểm Tra | Nhãn | Lý Do |
|---|---|---|
| TC_FR11_001 | HỢP LỆ | Đường đi hạnh phúc — lấy đơn hàng cơ bản khi đã xác thực |
| TC_FR11_002 | HỢP LỆ | Trường hợp biên quan trọng — trạng thái rỗng cho người dùng mới |
| TC_FR11_005 | HỢP LỆ | Xác thực tất cả 5 trạng thái đơn hàng theo máy trạng thái FR-10 |
| TC_FR11_016 | HỢP LỆ | Phát hiện lỗi — người dùng có thể hủy đơn hàng đang shipping (vi phạm FR-10) |
| TC_FR11_017 | HỢP LỆ | Giới hạn trạng thái cuối — đơn hàng đã giao không thể bị hủy |
| TC_FR11_034 | HỢP LỆ | Kiểm tra IDOR quan trọng — đảm bảo cách ly người dùng |
| TC_FR11_035 | HỢP LỆ | Phát hiện lỗi IDOR — GET /api/orders/:id không có kiểm tra sở hữu |
| TC_FR11_026 | HỢP LỆ | Xác thực máy trạng thái — delivered là trạng thái cuối |
| TC_FR11_040 | HỢP LỆ | Kiểm tra schema cơ bản cho định dạng phản hồi |
| TC_FR11_029 | HỢP LỆ | Lỗi chuyển đổi trạng thái quan trọng — vi phạm thông số FR-10 |

### Trường Hợp Kiểm Tra Bổ Sung (5 trường hợp — AI thường bỏ sót)

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_EXT_001 | FR-11: Hủy Đơn Hàng | Chuyển Trạng Thái | Điều kiện race hủy kép: Người dùng gửi 2 yêu cầu hủy đồng thời cho cùng đơn hàng pending | PUT /api/orders/:id/cancel (x2 đồng thời) | X-Student-Id: 23127459, Authorization: Bearer user_token | Cùng order_id gửi hai lần đồng thời | 200 + 400 hoặc 2x 200 | Chỉ một lần hủy thành công; lần thứ hai nên thất bại hoặc là idempotent |
| TC_FR11_EXT_002 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (IDOR) | Người dùng B sửa JWT để có ID Người dùng A trong payload, thử xem đơn hàng Người dùng A | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer jwt_with_tampered_id | Không | 403 | Xác thực chữ ký thất bại; trả về Forbidden |
| TC_FR11_EXT_003 | FR-11: Chi Tiết Đơn Hàng | Bảo Mật (IDOR) | IDOR qua việc liên tục đánh mã ID đơn hàng: duyệt qua ID đơn hàng 1-100 để phân loại đơn hàng tất cả người dùng | GET /api/orders/:id (ID liên tục) | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=1,2,3...100 | 200 hoặc 404 | LỖI: Trả về đơn hàng người dùng khác mà không kiểm tra sở hữu |
| TC_FR11_EXT_004 | FR-11: Hủy Đơn Hàng | Chuyển Trạng Thái | Hủy đơn hàng trong khi admin cùng cập nhật trạng thái thành shipping | PUT /api/orders/:id/cancel + PUT /api/admin/orders/:id/status đồng thời | X-Student-Id: 23127459, Authorization: Bearer cả hai token | Yêu cầu đồng thời | 200/400 | Điều kiện race: cả hai có thành công hoặc một nên thất bại |
| TC_FR11_EXT_005 | FR-11: Đơn Hàng Của Tôi | Bảo Mật | JWT token với thuật toán none tấn công: bỏ qua xác thực JWT | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer eyJhbGciOiJub25l... | Không | 403 | Token bị từ chối; server không chấp nhận thuật toán "none" |

**Lý do AI thường bỏ sót các trường hợp kiểm tra bổ sung này:**
1. **TC_FR11_EXT_001**: AI thường kiểm tra các thao tác tuần tự, không phải điều kiện race đồng thời — vấn đề thật trong môi trường sản xuất.
2. **TC_FR11_EXT_002**: AI tập trung vào việc thiếu header xác thực nhưng quên về việc thao tác payload JWT với cấu trúc chữ ký hợp lệ.
3. **TC_FR11_EXT_003**: IDOR liên tục là mô hình tấn công hệ thống mà người kiểm tra thủ công/AI thường tự động hóa không đầy đủ.
4. **TC_FR11_EXT_004**: Kiểm tra đồng thời hầu như không bao gồm trong bộ kiểm tra API vì nó yêu cầu thiết lập thực thi song song.
5. **TC_FR11_EXT_005**: Tấn công thuật toán JWT "none" là lỗ hổng cổ điển nhưng các tạo sinh kiểm tra AI thường giả định thư viện JWT được cấu hình đúng cách.
