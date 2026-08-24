# FR-17: Quản Lý Mã Giảm Giá (CRUD) — Các Trường Hợp Kiểm Tra API

**MSSV:** 23127459
**Hệ Thống Đang Kiểm Thử:** EShop Backend API (http://localhost:3000)
**Chức Năng:** FR-17 - Quản Lý Mã Giảm Giá (CRUD)
**Các Endpoint API:** POST /api/admin/coupons, GET /api/coupons, DELETE /api/admin/coupons/:id

> **Tài khoản quản trị dùng để kiểm thử FR-17:** Tạo bằng `insertUser.run('Admin User', 'admin@eshop.com', 'Admin123!', 'admin')` hoặc đã có sẵn trong hệ thống. Đăng nhập qua `POST /api/login` với `{"email":"admin@eshop.com","password":"Admin123!"}` để lấy `admin_token` (JWT). Mọi yêu cầu quản trị sau đó cần gửi kèm `X-Student-Id: 23127459` và `Authorization: Bearer {{adminToken}}`. Các trường hợp kiểm thử dưới đây giả định đã có token hợp lệ; trường hợp kiểm thử bảo mật sẽ kiểm tra khi thiếu hoặc sai token.

---

## 1. Phân Vùng Phương Định / Phân Vùng Đồng Nhất & BVA

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức & Endpoint | Headers / Auth | Input | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|---|---|
| TC_FR17_001 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá phần trăm hợp lệ với tất cả các trường bắt buộc | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"TEST10P","type":"percent","discount_value":10,"min_order_amount":300000,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | {"message":"Coupon created","id":number} |
| TC_FR17_002 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá cố định hợp lệ với tất cả các trường bắt buộc | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"TEST50F","type":"fixed","discount_value":50000,"min_order_amount":500000,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | {"message":"Coupon created","id":number} |
| TC_FR17_003 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với mã rỗng (sẽ thất bại - trường bắt buộc) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 500 | {"error":"..."} (Lỗi UNIQUE constraint hoặc lỗi xác thực) |
| TC_FR17_004 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với mã trùng lặp (UNIQUE constraint) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"SAVE10","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 500 | {"error":"..."} (Vi phạm UNIQUE constraint) |
| TC_FR17_005 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với discount_value âm | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"NEG10","type":"percent","discount_value":-5,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận discount_value âm (không có kiểm tra) |
| TC_FR17_006 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với discount_value = 0 | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"ZERO10","type":"percent","discount_value":0,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | Tạo mã giảm giá với 0% giảm giá (trường hợp biên) |
| TC_FR17_007 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với discount_value = 100 (phần trăm tối đa có nghĩa) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"FULL100","type":"percent","discount_value":100,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | Tạo mã giảm giá (giảm giá 100% làm đơn hàng miễn phí) |
| TC_FR17_008 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với discount_value > 100 (phần trăm không hợp lệ) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"OVER100","type":"percent","discount_value":150,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận giảm giá > 100% |
| TC_FR17_009 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với min_order_amount = 0 (biên) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"MIN0","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | Tạo mã giảm giá không có đơn hàng tối thiểu |
| TC_FR17_010 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với min_order_amount = -1 (âm không hợp lệ) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"MINNEG","type":"percent","discount_value":10,"min_order_amount":-1,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận min_order_amount âm |
| TC_FR17_011 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với max_uses_per_user = 1 (tối thiểu hợp lệ) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"USE1","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | Tạo mã giảm giá với tối đa 1 lần sử dụng |
| TC_FR17_012 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với max_uses_per_user = 0 (phải >= 1) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"USE0","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":0} | 200 | BUG: Máy chủ mặc định là 1 khi nhận được 0 |
| TC_FR17_013 | FR-17: Tạo Mã Giảm Giá | BVA | Tạo mã giảm giá với max_uses_per_user rất lớn (999999) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"USEMAX","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":999999} | 200 | Tạo mã giảm giá với giới hạn sử dụng cao |
| TC_FR17_014 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với ngày hết hạn (ngày đã qua) | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"EXPpast","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2020-01-01","max_uses_per_user":1} | 200 | Tạo mã giảm giá nhưng đã hết hạn |
| TC_FR17_015 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với expired_at rỗng | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"NOEXP","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận expired_at rỗng |
| TC_FR17_016 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với giá trị type không hợp lệ | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"BADTYPE","type":"invalid","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận giá trị type không hợp lệ |
| TC_FR17_017 | FR-17: Tạo Mã Giảm Giá | Domain Partition | Tạo mã giảm giá với trường type bị thiếu hoàn toàn | POST /api/admin/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | {"code":"NOTYPE","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1} | 200 | BUG: Máy chủ chấp nhận trường type bị thiếu |
| TC_FR17_018 | FR-17: Danh Sách Mã Giảm Giá | Domain Partition | Quản trị viên lấy danh sách mã giảm giá đầy đủ | GET /api/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Không có | 200 | Mảng JSON các đối tượng mã giảm giá |
| TC_FR17_019 | FR-17: Danh Sách Mã Giảm Giá | Domain Partition | Danh sách mã giảm giá chứa các mã đã gieo: SAVE10, BIGBUY, VIP100, EXPIRED | GET /api/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Không có | 200 | Mảng bao gồm các mã SAVE10, BIGBUY, VIP100, EXPIRED |
| TC_FR17_020 | FR-17: Danh Sách Mã Giảm Giá | Domain Partition | Mỗi mã giảm giá có các trường bắt buộc | GET /api/coupons | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Không có | 200 | Mỗi đối tượng có id, code, type, discount_value, min_order_amount, expired_at, max_uses_per_user |
| TC_FR17_021 | FR-17: Xóa Mã Giảm Giá | Domain Partition | Xóa mã giảm giá đã tồn tại trả về thành công | DELETE /api/admin/coupons/:id | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Path: id=created_coupon_id | 200 | {"message":"Coupon deleted"} |
| TC_FR17_022 | FR-17: Xóa Mã Giảm Giá | Domain Partition | Xóa mã giảm giá không tồn tại (không có lỗi trong code) | DELETE /api/admin/coupons/99999 | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Path: id=99999 | 200 | {"message":"Coupon deleted"} (không có lỗi trong code hiện tại) |
| TC_FR17_023 | FR-17: Xóa Mã Giảm Giá | BVA | Xóa mã giảm giá đã bị xóa trước đó (idempotent) | DELETE /api/admin/coupons/:id | X-Student-Id: 23127459, Authorization: Bearer {{adminToken}} (lấy từ POST /api/login với admin@eshop.com / Admin123!) | Path: id=already_deleted_id | 200 | {"message":"Coupon deleted"} |

## 2. Áp Dụng Mã Giảm Giá — Phân Vùng Phương Định

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức & Endpoint | Headers / Auth | Input | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|---|---|
| TC_FR17_024 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng mã giảm giá phần trăm SAVE10 với tổng tiền đủ | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=500000, user_id=1 | 200 | success=true, discount_amount=50000, final_amount=450000 |
| TC_FR17_025 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng mã giảm giá cố định BIGBUY với tổng tiền đủ | POST /api/apply-coupon | X-Student-Id: 23127459 | code=BIGBUY, total_amount=600000, user_id=1 | 200 | success=true, discount_amount=50000, final_amount=550000 |
| TC_FR17_026 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng mã giảm giá không tồn tại trả về 404 | POST /api/apply-coupon | X-Student-Id: 23127459 | code=NOTEXIST, total_amount=500000, user_id=1 | 404 | error: Mã giảm giá không tồn tại |
| TC_FR17_027 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng mã giảm giá với mã rỗng trả về 400 | POST /api/apply-coupon | X-Student-Id: 23127459 | code rỗng, total_amount=500000, user_id=1 | 400 | error: Vui lòng nhập mã giảm giá |
| TC_FR17_028 | FR-17: Áp Dụng Mã Giảm Giá | BVA | total_amount chính bằng min_order_amount (biên) | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=300000, user_id=1 | 200 | Mã giảm giá được áp dụng (>= đạt yêu cầu) |
| TC_FR17_029 | FR-17: Áp Dụng Mã Giảm Giá | BVA | total_amount vừa dưới mức tối thiểu (299999) | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=299999, user_id=1 | 400 | error: Đơn hàng chưa đủ giá trị tối thiểu |
| TC_FR17_030 | FR-17: Áp Dụng Mã Giảm Giá | BVA | Áp dụng mã giảm giá đã hết hạn EXPIRED | POST /api/apply-coupon | X-Student-Id: 23127459 | code=EXPIRED, total_amount=500000, user_id=1 | 400 | error: Mã giảm giá đã hết hạn |
| TC_FR17_031 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng mã giảm giá không có user_id | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=500000, không có user_id | 200 | Mã giảm giá được áp dụng (theo dõi sử dụng bị bỏ qua) |
| TC_FR17_032 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Giảm giá phần trăm: giảm_gia = tổng_tiền * giá_trị / 100 | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=1000000, user_id=1 | 200 | discount=100000, final=900000 |
| TC_FR17_033 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Giảm giá cố định = discount_value trực tiếp | POST /api/apply-coupon | X-Student-Id: 23127459 | code=VIP100, total_amount=500000, user_id=1 | 200 | discount=100000, final=400000 |
| TC_FR17_034 | FR-17: Áp Dụng Mã Giảm Giá | BVA | total_amount = 0 | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=0, user_id=1 | 400 | Lỗi: dưới mức tối thiểu |
| TC_FR17_035 | FR-17: Áp Dụng Mã Giảm Giá | BVA | total_amount âm | POST /api/apply-coupon | X-Student-Id: 23127459 | code=SAVE10, total_amount=-100, user_id=1 | 400 | Lỗi: dưới mức tối thiểu |
| TC_FR17_036 | FR-17: Áp Dụng Mã Giảm Giá | Domain Partition | Áp dụng cùng mã giảm giá hai lần vượt quá max_uses_per_user | POST /api/apply-coupon x2 | X-Student-Id: 23127459 | code=SAVE10, total=500000, user_id=1 | 200 sau đó 400 | Lần thứ hai: error: đã đạt giới hạn |

## 3. Chuyển Trạng Thái

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|
| TC_FR17_037 | FR-17: Vòng Đời Mã Giảm Giá | Chuyển Trạng Thái | Tạo rồi danh sách hiển mã giảm giá mới | GET /api/coupons | 200 | Mã giảm giá mới xuất hiện trong danh sách |
| TC_FR17_038 | FR-17: Vòng Đời Mã Giảm Giá | Chuyển Trạng Thái | Tạo, áp dụng, xóa, áp dụng thất bại | POST /api/apply-coupon | 404 | error: không tìm thấy |
| TC_FR17_039 | FR-17: Vòng Đời Mã Giảm Giá | Chuyển Trạng Thái | Tạo, áp dụng, xác nhận sử dụng, áp dụng lại thất bại | POST /api/apply-coupon | 200 sau đó 400 | Đã đạt giới hạn |
| TC_FR17_040 | FR-17: Vòng Đời Mã Giảm Giá | Chuyển Trạng Thái | Xóa mã giảm giá rồi danh sách không còn hiển nó | GET /api/coupons | 200 | Mã giảm giá đã xóa không xuất hiện |

## 4. Kiểm Tra Bảo Mật

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|
| TC_FR17_041 | FR-17: Tạo Mã Giảm Giá | SEC-02 | Tạo mã giảm giá không xác thực | POST /api/admin/coupons | 401 | error: Unauthorized |
| TC_FR17_042 | FR-17: Tạo Mã Giảm Giá | SEC-03 | Người dùng thường tạo mã giảm giá (Nâng quyền Vai trò) | POST /api/admin/coupons | 200 | BUG: Không kiểm tra role=admin |
| TC_FR17_043 | FR-17: Xóa Mã Giảm Giá | SEC-03 | Người dùng thường xóa mã giảm giá | DELETE /api/admin/coupons/:id | 200 | BUG: Không kiểm tra role=admin |
| TC_FR17_044 | FR-17: Danh Sách | SEC-02 | Danh sách mã giảm giá không xác thực | GET /api/coupons | 401 | error: Unauthorized |
| TC_FR17_045 | FR-17: Tạo Mã Giảm Giá | SEC-05 | SQL Injection trong mã mã giảm giá | POST /api/admin/coupons | 200 | Chuỗi văn bản được lưu trữ nguyên |
| TC_FR17_046 | FR-17: Áp Dụng | SEC-05 | SQL Injection trong mã áp dụng mã giảm giá | POST /api/apply-coupon | 404 | Mã giảm giá không tìm thấy |
| TC_FR17_047 | FR-17: Tạo Mã Giảm Giá | SEC-04 | XSS trong trường mã mã giảm giá | POST /api/admin/coupons | 200 | Mã được lưu trữ dưới dạng chuỗi văn bản |
| TC_FR17_048 | FR-17: Áp Dụng | SEC-02 | Áp dụng không có user_id bỏ qua theo dõi sử dụng | POST /api/apply-coupon | 200 | BUG: Theo dõi sử dụng bị bỏ qua |
| TC_FR17_049 | FR-17: Áp Dụng | Bảo Mật | user_id bị thay đổi để bỏ qua giới hạn sử dụng | POST /api/apply-coupon | 200 | BUG: user_id không được xác thực |
| TC_FR17_050 | FR-17: Tạo Mã Giảm Giá | SEC-04 | XSS với img onerror trong mã | POST /api/admin/coupons | 200 | Chuỗi văn bản được lưu trữ nguyên |

## 5. Xác Nhận Schema

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|
| TC_FR17_051 | FR-17: Tạo Mã Giảm Giá | Schema | Thành công: message(string) + id(number) | POST /api/admin/coupons | 200 | JSON với message và id |
| TC_FR17_052 | FR-17: Tạo Mã Giảm Giá | Schema | Thất bại: error(string) | POST /api/admin/coupons | 500 | JSON với trường error |
| TC_FR17_053 | FR-17: Danh Sách | Schema | Content-Type là application/json | GET /api/coupons | 200 | Header Content-Type đúng |
| TC_FR17_054 | FR-17: Danh Sách | Schema | Request body là mảng JSON | GET /api/coupons | 200 | Kiểu mảng |
| TC_FR17_055 | FR-17: Danh Sách | Schema | Mỗi mã giảm giá có kiểu dữ liệu đúng | GET /api/coupons | 200 | id(number), code(string), type(string), discount_value(number), min_order_amount(number), expired_at(string), max_uses_per_user(number) |
| TC_FR17_056 | FR-17: Xóa | Schema | Xóa trả về trường message | DELETE /api/admin/coupons/:id | 200 | JSON với trường message |
| TC_FR17_057 | FR-17: Áp Dụng | Schema | Áp dụng thành công có 5 trường | POST /api/apply-coupon | 200 | success, coupon_id, discount_amount, final_amount, message |
| TC_FR17_058 | FR-17: Áp Dụng | Schema | Áp dụng thất bại: chỉ có error, không có stack trace | POST /api/apply-coupon | 404 | Chỉ có trường error |
| TC_FR17_059 | FR-17: Áp Dụng | Schema | Cấu trúc lỗi mã giảm giá hết hạn | POST /api/apply-coupon | 400 | Trường error (string) |
| TC_FR17_060 | FR-17: Tạo Mã Giảm Giá | Schema | Lỗi xác thực trả về JSON không phải HTML | POST /api/admin/coupons | 401 | JSON error, không phải HTML |
| TC_FR17_061 | FR-17: Áp Dụng | Schema | final_amount = total - discount (tính toán đúng) | POST /api/apply-coupon | 200 | Tính toán chính xác |

---

## Kiểm Tra Thực Tế & Mở Rộng

### Nhãn Đánh Giá

| Mã THKT | Nhãn | Lý Do |
|---|---|---|
| TC_FR17_001 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_002 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_003 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_004 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_005 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_006 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_007 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_008 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_009 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_010 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_011 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_012 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_013 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_014 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_015 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_016 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_017 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_018 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_019 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_020 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_021 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_022 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_023 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_024 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_025 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_026 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_027 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_028 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_029 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_030 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_031 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_032 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_033 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_034 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_035 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_036 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_037 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_038 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_039 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_040 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_041 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_042 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_043 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_044 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_045 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_046 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_047 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_048 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_049 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_050 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_051 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_052 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_053 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_054 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_055 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_056 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_057 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_058 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_059 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_060 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_061 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_EXT_001 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_EXT_002 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |
| TC_FR17_EXT_003 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_EXT_004 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09 (Discount coupons), không phải FR-17 (quản lý CRUD mã giảm giá của admin) đã chọn |
| TC_FR17_EXT_005 | HỢP LỆ | Phù hợp với mục đích kiểm thử cho chức năng |

### Tổng Hợp Test Cases Sau Khi Chỉnh Sửa

**Thống kê theo nhãn sau khi chỉnh sửa (trên tổng 61 Test Cases chính và 5 mở rộng):**

| Nhãn | Số lượng | Tỷ lệ | Danh sách Test Case |
|---|---|---|---|
| HỢP LỆ | 41 | 62,1% | TC_FR17_001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 022, 023, 037, 040, 041, 042, 043, 044, 045, 047, 050, 051, 052, 053, 054, 055, 056, 060, EXT_002, EXT_005 |
| KHÔNG HỢP LỆ | 25 | 37,9% | TC_FR17_024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 035, 036, 038, 039, 046, 048, 049, 057, 058, 059, 061, EXT_001, EXT_003, EXT_004 |
| **Tổng** | **66** | **100%** | |

> **Ghi chú:** 25 trường hợp KHÔNG HỢP LỆ đã được loại khỏi bộ chính thức do ngoài phạm vi FR-17 (thuộc FR-09 - áp dụng mã lúc checkout), chỉ giữ lại làm bằng chứng kiểm tra. Số trường hợp HỢP LỆ còn lại 41 (chỉ gồm Tạo/Danh sách/Xóa mã giảm giá), vẫn đạt yêu cầu tối thiểu 35 nên không cần bổ sung thêm.

**Chi tiết các trường hợp ngoài phạm vi:**

| Mã Test Case | Nhãn mới | Lý do |
|---|---|---|
| TC_FR17_024-036, 038,039,046,048,049,057-059,061, EXT_001,003,004 | KHÔNG HỢP LỆ | Ngoài phạm vi — endpoint POST /api/apply-coupon là chức năng áp dụng mã giảm giá lúc checkout, thuộc FR-09, không phải FR-17 (CRUD) |

**Kết quả sau khi chỉnh sửa:**
- Từ 66 Test Cases (61 chính +5 mở rộng) → giữ lại **41 HỢP LỆ** chính thức (chỉ CRUD), 25 KHÔNG HỢP LỆ loại khỏi bộ chính thức.
- Đã cập nhật header Các Endpoint API, bỏ POST /api/apply-coupon.

### Trường Hợp Kiểm Tra Bổ Sung

| Mã THKT | Chức Năng | Loại Kiểm Tra | Mô Tả | Phương Thức | Mã Trạng Thái Dự Kiến | Phản Hồi Dự Kiến |
|---|---|---|---|---|---|---|
| TC_FR17_EXT_001 | FR-17: Áp Dụng | Bảo Mật | Tràn số nguyên: total_amount=999999999999 | POST /api/apply-coupon | 200 hoặc 500 | Xử lý đúng số lớn |
| TC_FR17_EXT_002 | FR-17: Tạo Mã Giảm Giá | Bảo Mật | Gán giá trị hàng loạt: chèn is_active=0 hoặc id=99999 | POST /api/admin/coupons | 200 | BUG: Máy chủ có thể chấp nhận các trường bị chèn |
| TC_FR17_EXT_003 | FR-17: Áp Dụng | Bảo Mật | Điều kiện rác: 10 yêu cầu áp dụng đồng thời | POST /api/apply-coupon x10 | Hỗn hợp 200/400 | Chỉ 1 yêu cầu được thành công |
| TC_FR17_EXT_004 | FR-17: Áp Dụng | Bảo Mật | Mã giảm giá Unicode (ký tự tiếng Việt) | POST /api/apply-coupon | 404 hoặc 200 | Không có vấn đề mã hóa |
| TC_FR17_EXT_005 | FR-17: Tạo Mã Giảm Giá | Bảo Mật | Mã giảm giá quá dài (1000+ ký tự) | POST /api/admin/coupons | 200 hoặc 400 | Không tràn bộ nhớ hoặc bị lỗi |

**Lý do AI thường bỏ sót:**
1. Tràn số nguyên yêu cầu hiểu biết về kiểu dữ liệu nội trong không hiển thị trong API spec
2. Gán giá trị hàng loạt là lỗ hổng ở mức framework yêu cầu hiểu biết về triển khai backend
3. Điều kiện rác yêu cầu cài đặt thực thi đồng thời vượt ngoài kiểm thử API thủ công thông thường
4. Các trường hợp biên Unicode thường bị bỏ qua vì dữ liệu kiểm thử ASCII đủ cho nhiều bài kiểm tra
5. Kiểm tra tràn bộ nhớ/chiều dài ít được bao gồm trong bộ kiểm thử API chức năng
