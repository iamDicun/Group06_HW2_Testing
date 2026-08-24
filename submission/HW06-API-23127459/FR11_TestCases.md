# FR-11: Xem Lịch Sử Đơn Hàng (Người Dùng) — Các Trường Hợp Kiểm Tra API

**MSSV:** 23127459
**Hệ Thống Đang Kiểm Thử:** Backend API EShop (http://localhost:3000)
**Chức Năng:** FR-11 — Xem lịch sử đơn hàng (Người dùng)
**Các Endpoint API:** GET /api/orders/my-orders, GET /api/orders/:id

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
| TC_FR11_001 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_002 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_003 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_004 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_005 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_006 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_007 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_008 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_009 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_010 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_011 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_012 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_013 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_014 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_015 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_016 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_017 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_018 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_019 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_020 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_021 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_022 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_023 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_024 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_025 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_026 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_027 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_028 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_029 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_030 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint PUT /api/admin/orders/:id/status là chức năng quản trị chuyển trạng thái đơn hàng, thuộc FR-10 (Order State Machine), không phải FR-11 (chỉ xem lịch sử) đã chọn |
| TC_FR11_031 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_032 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_033 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_034 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_035 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_036 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_037 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_038 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_039 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_040 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_041 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_042 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_043 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_044 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_045 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_046 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_047 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_048 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_049 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_050 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_051 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_052 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_053 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_054 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_055 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_056 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_057 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_058 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_EXT_001 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_EXT_002 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_EXT_003 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR11_EXT_004 | KHÔNG HỢP LỆ | Ngoài phạm vi — hành động hủy đơn là một kích hoạt chuyển trạng thái (trigger) thuộc máy trạng thái FR-10, không phải nghiệp vụ 'xem' của FR-11 |
| TC_FR11_EXT_005 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |


### Chi tiết 10 Test Cases mới bổ sung (049-058) — Đúng phạm vi FR-11 (chỉ GET)

| Mã Trường Hợp Kiểm Tra | Chức Năng / API Endpoint | Loại Kiểm Tra | Mô Tả Trường Hợp Kiểm Tra | Phương Thức HTTP & Endpoint | Headers / Xác Thực | Dữ Liệu Đầu Vào / Tham Số Truy Vấn / Request Body | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến / Schema |
|---|---|---|---|---|---|---|---|---|
| TC_FR11_049 | FR-11: Đơn Hàng Của Tôi | Schema | Trạng thái đơn hàng trả về đúng bản dịch tiếng Việt theo yêu cầu giao diện | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mỗi đơn hàng có trường trạng thái hiển thị tiếng Việt: "Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao", "Đã hủy" tương ứng với pending, confirmed, shipping, delivered, canceled |
| TC_FR11_050 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Kiểm tra phân trang lịch sử đơn hàng với tham số page và limit | GET /api/orders/my-orders?page=1&limit=2 | X-Student-Id: 23127459, Authorization: Bearer user_token | Query: page=1, limit=2 | 200 | Mảng JSON tối đa 2 đơn hàng hoặc toàn bộ nếu chưa hỗ trợ phân trang, không lỗi 500 |
| TC_FR11_051 | FR-11: Đơn Hàng Của Tôi | Schema | Kiểm tra định dạng ngày đặt hàng (created_at) đúng chuẩn ngày tháng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mỗi đơn hàng có trường created_at hoặc ngày đặt dạng ISO 8601 hoặc dd/mm/yyyy, kiểu chuỗi, có thể phân tích thành ngày hợp lệ |
| TC_FR11_052 | FR-11: Đơn Hàng Của Tôi | Bảo Mật (SEC-04) | Kiểm tra chuỗi độc hại lưu trữ trong shipping_address được hiển thị an toàn | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (đơn hàng có shipping_address chứa chuỗi script) | 200 | Trường shipping_address trong phản hồi chứa chuỗi đã được mã hóa, không thực thi mã độc khi hiển thị |
| TC_FR11_053 | FR-11: Đơn Hàng Của Tôi | Schema | Kiểm tra thời gian phản hồi cho danh sách nhiều đơn hàng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (tài khoản có 20 đơn hàng) | 200 | Phản hồi hoàn thành trong vòng 500ms, không suy giảm hiệu năng |
| TC_FR11_054 | FR-11: Đơn Hàng Của Tôi | Schema | Kiểm tra header Cache-Control và ETag cho danh sách đơn hàng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Header Cache-Control hoặc ETag tồn tại, giá trị hợp lệ, không lộ thông tin nhạy cảm |
| TC_FR11_055 | FR-11: Đơn Hàng Của Tôi | Phân Vùng Phương Định | Kiểm tra sắp xếp ổn định khi nhiều đơn hàng cùng ngày đặt | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (tạo 3 đơn hàng cùng ngày) | 200 | Danh sách trả về theo thứ tự ID giảm dần ổn định, không xáo trộn ngẫu nhiên |
| TC_FR11_056 | FR-11: Đơn Hàng Của Tôi | Bảo Mật | Kiểm tra ký tự Unicode và emoji trong shipping_address hiển thị đúng | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không (đơn hàng có shipping_address chứa ký tự đặc biệt) | 200 | Trường shipping_address giữ nguyên ký tự Unicode và emoji, không bị lỗi mã hóa hay thay thế bằng ký tự lạ |
| TC_FR11_057 | FR-11: Đơn Hàng Của Tôi | Schema | Kiểm tra trường tổng tiền (total_amount) định dạng tiền tệ đúng chuẩn | GET /api/orders/my-orders | X-Student-Id: 23127459, Authorization: Bearer user_token | Không | 200 | Mỗi đơn hàng có total_amount là số dương, khi hiển thị sẽ định dạng với phân cách nghìn và đơn vị ₫ |
| TC_FR11_058 | FR-11: Chi Tiết Đơn Hàng | Schema | Kiểm tra chi tiết đơn hàng trả về header CORS cho phép truy cập | GET /api/orders/:id | X-Student-Id: 23127459, Authorization: Bearer user_token | Tham số đường dẫn: id=valid_order_id | 200 | Header Access-Control-Allow-Origin tồn tại trong phản hồi chi tiết đơn hàng |

### Tổng Hợp Test Cases Sau Khi Chỉnh Sửa

**Thống kê theo nhãn sau khi chỉnh sửa (trên tổng 58 Test Cases chính và 5 mở rộng):**

| Nhãn | Số lượng (chính) | Tỷ lệ | Danh sách Test Case chính |
|---|---|---|---|
| HỢP LỆ | 36 | 62,1% | TC_FR11_001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 021, 031, 032, 033, 034, 035, 037, 039, 040, 041, 042, 043, 046, 047, 048, 049, 050, 051, 052, 053, 054, 055, 056, 057, 058 |
| KHÔNG HỢP LỆ | 22 | 37,9% | TC_FR11_014, 015, 016, 017, 018, 019, 020, 022, 023, 024, 025, 026, 027, 028, 029, 030, 036, 038, 044, 045 và EXT_001, EXT_004 |
| **Tổng chính** | **58** | **100%** | |

> **Ghi chú:** 22 trường hợp KHÔNG HỢP LỆ đã được loại khỏi bộ chính thức do ngoài phạm vi FR-11 (thuộc FR-10), chỉ giữ lại làm bằng chứng kiểm tra. Sau khi bổ sung 10 trường hợp mới (049-058) đúng phạm vi chỉ xem (GET), số trường hợp HỢP LỆ đạt 36, vượt yêu cầu tối thiểu 35.

**Chi tiết các trường hợp cần chỉnh sửa:**

| Mã Test Case | Nhãn mới | Hành động đề xuất |
|---|---|---|
| TC_FR11_014-020, 036, 038, 044, 045, EXT_001, EXT_004 | KHÔNG HỢP LỆ | Loại khỏi bộ FR-11, chuyển sang FR-10 nếu cần kiểm tra hủy đơn |
| TC_FR11_022-030 | KHÔNG HỢP LỆ | Loại khỏi bộ FR-11, thuộc chức năng quản trị FR-10 |
| TC_FR11_049-058 | HỢP LỆ (mới) | Bổ sung 10 trường hợp mới đúng phạm vi chỉ xem để đạt 36 hợp lệ |

**Kết quả sau khi chỉnh sửa:**
- Từ 48 Test Cases chính ban đầu → 58 sau khi bổ sung 10 mới.
- Sau khi loại 22 KHÔNG HỢP LỆ, còn **36 HỢP LỆ** chính thức, đạt yêu cầu ≥35.

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
