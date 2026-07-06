# Tài liệu Đặc tả Use Case — Hệ thống EShop

> Nguồn: README.md (Đặc tả Yêu cầu Hệ thống EShop v2.0)
> Mục đích: Làm cơ sở thiết kế Test Case (Kiểm thử Phần mềm)

---

## Danh sách Actor

| Actor | Mô tả |
|---|---|
| **Khách (Guest)** | Người dùng chưa đăng nhập, chỉ xem được sản phẩm |
| **User** | Người dùng đã đăng ký/đăng nhập |
| **Admin** | Người dùng có role = 'admin', quản trị hệ thống |
| **Hệ thống (System)** | Backend tự động thực hiện (tính tổng tiền, sinh OTP, khóa tài khoản...) |

---

## UC-01: Đăng ký tài khoản
**Actor**: Khách
**Liên quan**: FR-01, SEC-01
**Mô tả**: Khách tạo tài khoản mới trên hệ thống.

**Điều kiện tiên quyết**: Chưa có tài khoản, chưa đăng nhập.

**Luồng chính (Main Flow)**:
1. Khách truy cập trang Đăng ký.
2. Khách nhập Họ Tên, Email, Mật khẩu, Xác nhận mật khẩu.
3. Hệ thống kiểm tra định dạng email hợp lệ và email chưa tồn tại.
4. Hệ thống kiểm tra mật khẩu đủ mạnh (≥8 ký tự, có hoa/thường/số/ký tự đặc biệt).
5. Hệ thống kiểm tra Mật khẩu và Xác nhận mật khẩu khớp nhau.
6. Hệ thống mã hóa mật khẩu (không lưu plaintext) và tạo tài khoản.
7. Hệ thống chuyển hướng khách tới trang Đăng nhập.

**Luồng ngoại lệ**:
- 3a. Email đã tồn tại hoặc sai định dạng → hiển thị lỗi, không tạo tài khoản.
- 4a. Mật khẩu không đủ mạnh → hiển thị lỗi cụ thể.
- 5a. Hai mật khẩu không khớp → hiển thị lỗi, không cho submit.

**Hậu điều kiện**: Tài khoản mới được tạo với role mặc định (user); mật khẩu được băm (hash).

---

## UC-02: Đăng nhập & Khóa tài khoản tạm thời
**Actor**: User/Admin, Hệ thống
**Liên quan**: FR-02, SEC-01, SEC-02

**Điều kiện tiên quyết**: Đã có tài khoản.

**Luồng chính**:
1. User nhập Email (`type="email"`) và Mật khẩu.
2. Hệ thống xác thực thông tin đăng nhập.
3. Nếu đúng: hệ thống trả về JWT Token; client lưu token và gửi kèm header `Authorization: Bearer <token>` cho các request sau.

**Luồng thay thế — Đăng nhập sai**:
2a. Sai email/mật khẩu → bộ đếm lỗi tăng đúng 1 đơn vị; hệ thống trả thông báo lỗi chung chung (không lộ nguyên nhân cụ thể).
2b. Nếu số lần sai liên tiếp ≥ 3 → tài khoản bị khóa tạm thời 30 giây; các lần đăng nhập trong thời gian khóa đều bị từ chối dù đúng mật khẩu.

**Hậu điều kiện**: User đăng nhập thành công có JWT hợp lệ; hoặc tài khoản ở trạng thái tạm khóa.

---

## UC-03: Quên mật khẩu & Đặt lại mật khẩu
**Actor**: User, Hệ thống
**Liên quan**: FR-03, SEC-07

**Điều kiện tiên quyết**: User đã có tài khoản với email hợp lệ.

**Luồng chính**:
1. **Bước 1/2 – Lấy OTP**: User nhập email đã đăng ký.
2. Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên, gắn với email đó, có thời hạn sử dụng, và gửi/hiển thị cho user.
3. Giao diện hiển thị Step Indicator "Bước 1/2" và nút "Quay lại đăng nhập".
4. **Bước 2/2 – Đặt lại mật khẩu**: User nhập OTP, Mật khẩu mới, Xác nhận mật khẩu mới.
5. Hệ thống kiểm tra: OTP đúng và đúng email đã yêu cầu, còn hiệu lực, chưa được dùng; mật khẩu mới đạt yêu cầu độ mạnh (như FR-01); hai trường mật khẩu khớp.
6. Hệ thống cập nhật mật khẩu mới và vô hiệu hóa OTP (không dùng lại được).

**Luồng ngoại lệ**:
- 5a. OTP sai, hết hạn, hoặc dùng cho email khác → từ chối, hiển thị lỗi.
- 5b. Mật khẩu mới không đạt yêu cầu hoặc không khớp xác nhận → từ chối.

**Hậu điều kiện**: Mật khẩu được cập nhật; OTP cũ không còn hiệu lực.

---

## UC-04: Quản lý hồ sơ cá nhân
**Actor**: User
**Liên quan**: FR-04, SEC-06

**Điều kiện tiên quyết**: Đã đăng nhập.

**Luồng chính**:
1. User mở trang Hồ sơ cá nhân.
2. User cập nhật Họ Tên, Số điện thoại, Địa chỉ giao hàng mặc định.
3. Hệ thống kiểm tra số điện thoại (bắt đầu bằng `0`, 10–11 chữ số).
4. Hệ thống lưu thay đổi; Email và `role` không thể chỉnh sửa qua giao diện/API.

**Luồng ngoại lệ**:
- 3a. Số điện thoại sai định dạng → từ chối cập nhật.
- 4a. Client cố gắi gửi trường `role` khác → backend bỏ qua/từ chối, không cho phép tự nâng quyền.

**Hậu điều kiện**: Hồ sơ user được cập nhật, không ảnh hưởng đến role hay email.

---

## UC-05: Tìm kiếm & Xem danh sách sản phẩm
**Actor**: Khách/User
**Liên quan**: FR-05

**Luồng chính**:
1. Actor truy cập trang chủ; hệ thống hiển thị loading rồi tải danh sách sản phẩm dạng lưới (ảnh, tên, giá định dạng ₫).
2. Actor nhập từ khóa vào ô tìm kiếm.
3. Hệ thống lọc sản phẩm theo tên, hiển thị từ khóa an toàn (escape, không render HTML).
4. Hệ thống hiển thị kết quả phù hợp.

**Luồng thay thế**:
- 4a. Không có kết quả → hiển thị empty state phù hợp.

**Hậu điều kiện**: Danh sách sản phẩm phù hợp từ khóa được hiển thị; trang chỉ có đúng 1 thẻ `<h1>`.

---

## UC-06: Xem chi tiết & Thêm sản phẩm vào giỏ hàng
**Actor**: Khách/User
**Liên quan**: FR-06

**Luồng chính**:
1. Actor chọn một sản phẩm từ danh sách.
2. Hệ thống hiển thị chi tiết: ảnh lớn, tên, giá, mô tả, danh mục.
3. Actor nhập số lượng (số nguyên dương, tối thiểu 1).
4. Actor bấm "Thêm vào giỏ hàng".
5. Hệ thống thêm sản phẩm vào giỏ và hiển thị phản hồi trực quan (toast/badge).

**Luồng ngoại lệ**:
- 3a. Nhập số lượng không hợp lệ (0, âm, số thập phân, chữ) → hệ thống từ chối/không cho submit.

**Hậu điều kiện**: Sản phẩm (và số lượng) được thêm vào giỏ hàng của actor.

---

## UC-07: Quản lý Giỏ hàng
**Actor**: User (đã có sản phẩm trong giỏ)
**Liên quan**: FR-07

**Luồng chính**:
1. User mở trang Giỏ hàng, xem danh sách: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác.
2. User điều chỉnh số lượng bằng nút +/-; hệ thống cập nhật Thành tiền và "Tổng cộng" tương ứng.
3. User thêm cùng sản phẩm đã có trong giỏ → hệ thống tăng số lượng dòng hiện có (không tạo dòng mới).
4. User bấm "Xóa sản phẩm" → hệ thống hiển thị dialog xác nhận.
5. User xác nhận xóa → hệ thống xóa sản phẩm khỏi giỏ.
6. User có thể bấm "Tiếp tục mua sắm" để quay về trang chủ.

**Luồng thay thế**:
- Giỏ hàng trống → hiển thị hình minh họa + thông báo rõ ràng.

**Hậu điều kiện**: Giỏ hàng phản ánh đúng trạng thái sản phẩm/số lượng; nhãn tổng tiền là "Tổng cộng".

---

## UC-08: Thanh toán (Checkout)
**Actor**: User (đã đăng nhập)
**Liên quan**: FR-08, SEC-05

**Điều kiện tiên quyết**: User đã đăng nhập, giỏ hàng có ít nhất 1 sản phẩm.

**Luồng chính**:
1. User vào trang Checkout, xem đầy đủ danh sách sản phẩm đặt mua và tổng tiền (tự tính từ giỏ, không cho sửa trực tiếp).
2. (Tùy chọn) User nhập mã giảm giá — xem UC-09.
3. User xác nhận đặt hàng.
4. Backend tự tính lại tổng tiền từ dữ liệu giỏ hàng thực tế trên server (không nhận `total_amount` client gửi).
5. Hệ thống tạo đơn hàng ở trạng thái `pending`, xóa giỏ hàng.

**Luồng ngoại lệ**:
- User chưa đăng nhập → hệ thống từ chối, yêu cầu đăng nhập trước.
- Client cố gửi `total_amount` khác với giá trị thực tế → backend bỏ qua, tự tính lại.

**Hậu điều kiện**: Đơn hàng được tạo với tổng tiền chính xác; giỏ hàng rỗng.

---

## UC-09: Áp dụng Mã giảm giá (Coupon)
**Actor**: User (đã đăng nhập, tại bước Checkout)
**Liên quan**: FR-09

**Luồng chính**:
1. User nhập mã giảm giá tại Checkout.
2. Hệ thống kiểm tra tuần tự 5 điều kiện: C1 (mã tồn tại & active), C2 (còn hạn), C3 (đủ ngưỡng đơn hàng), C4 (đã đăng nhập), C5 (chưa vượt số lượt dùng/user).
3. Nếu tất cả điều kiện đạt: hệ thống tính `discount_amount` theo loại (percent hoặc fixed) và `final_amount = total - discount_amount`.
4. Hệ thống hiển thị số tiền được giảm và tổng tiền cuối cùng.

**Luồng ngoại lệ**:
- Bất kỳ điều kiện C1–C5 nào không đạt → từ chối áp dụng mã, hiển thị lý do.

**Hậu điều kiện**: Đơn hàng (nếu tạo) ghi nhận đúng discount_amount/final_amount; số lượt dùng mã của user tăng lên sau khi đặt hàng thành công.

---

## UC-10: Hủy đơn hàng (User)
**Actor**: User
**Liên quan**: FR-10, FR-20

**Điều kiện tiên quyết**: User có đơn hàng ở trạng thái `pending` hoặc `confirmed`.

**Luồng chính**:
1. User chọn đơn hàng cần hủy trong Lịch sử đơn hàng.
2. Hệ thống kiểm tra trạng thái hiện tại của đơn hàng.
3. Nếu trạng thái là `pending` hoặc `confirmed` → hệ thống chuyển đơn hàng sang `canceled`.

**Luồng ngoại lệ**:
- Đơn hàng đang ở `shipping`, `delivered`, hoặc `canceled` → hệ thống từ chối, trả lỗi phù hợp (User không được tự hủy khi đã `shipping`; `delivered`/`canceled` là trạng thái kết thúc).

**Hậu điều kiện**: Đơn hàng ở `canceled` (nếu hợp lệ) hoặc giữ nguyên trạng thái cũ kèm thông báo lỗi.

---

## UC-11: Xem lịch sử đơn hàng (User)
**Actor**: User
**Liên quan**: FR-11

**Luồng chính**:
1. User mở trang Lịch sử đơn hàng.
2. Hệ thống chỉ hiển thị đơn hàng của chính user đó: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái (dịch tiếng Việt, có màu phân biệt).

**Hậu điều kiện**: User không thể xem đơn hàng của user khác.

---

## UC-12: Đăng nhập & Kiểm soát truy cập Admin
**Actor**: Admin, Hệ thống
**Liên quan**: FR-12, SEC-02, SEC-03

**Luồng chính**:
1. Admin đăng nhập (dùng chung UC-02), nhận JWT chứa `role='admin'`.
2. Admin truy cập các API `/api/admin/*` hoặc API ảnh hưởng dữ liệu (`POST/PUT/DELETE /api/products`, `/api/categories`, `/api/coupons`).
3. Hệ thống kiểm tra JWT hợp lệ VÀ `role='admin'` trong token trước khi cho phép thao tác.

**Luồng ngoại lệ**:
- Token không hợp lệ/hết hạn → từ chối (401).
- Token hợp lệ nhưng role khác 'admin' → từ chối (403), dù token tồn tại.

**Hậu điều kiện**: Chỉ admin hợp lệ mới thao tác được các API quản trị.

---

## UC-13: Xem Dashboard thống kê
**Actor**: Admin
**Liên quan**: FR-13

**Luồng chính**:
1. Admin mở trang Dashboard.
2. Hệ thống tính tổng doanh thu = tổng `total_amount` của các đơn có `status='delivered'` (không tính đơn hàng khác trạng thái).
3. Hệ thống hiển thị tổng số đơn hàng.

**Hậu điều kiện**: Số liệu thống kê phản ánh đúng các quy tắc tính toán.

---

## UC-14: Quản lý Danh mục (Category CRUD)
**Actor**: Admin
**Liên quan**: FR-14

**Luồng chính**:
1. Admin thêm danh mục mới (bắt buộc nhập tên, không để trống).
2. Admin xem danh sách danh mục.
3. Admin xóa danh mục.

**Luồng ngoại lệ**:
- Tên danh mục để trống → từ chối tạo.

**Hậu điều kiện**: Danh mục được thêm/xóa; các sản phẩm liên quan không bị lỗi tham chiếu (cần kiểm thử ràng buộc khi xóa danh mục đang được sản phẩm sử dụng).

---

## UC-15: Quản lý Sản phẩm (Product CRUD)
**Actor**: Admin
**Liên quan**: FR-15

**Luồng chính**:
1. Admin thêm sản phẩm: Tên (bắt buộc, ≤255 ký tự), Giá (bắt buộc, số dương >0), Danh mục (bắt buộc, chọn từ danh sách có sẵn).
2. Admin xem danh sách sản phẩm.
3. Admin sửa một sản phẩm → chỉ sản phẩm đó thay đổi, các sản phẩm khác giữ nguyên.
4. Admin xóa sản phẩm.

**Luồng ngoại lệ**:
- Tên rỗng, hoặc > 255 ký tự → từ chối.
- Giá ≤ 0 hoặc không phải số → từ chối.
- Không chọn danh mục hợp lệ → từ chối.

**Hậu điều kiện**: Dữ liệu sản phẩm được tạo/cập nhật/xóa chính xác, không ảnh hưởng sản phẩm khác.

---

## UC-16: Import Sản phẩm từ CSV
**Actor**: Admin
**Liên quan**: FR-16

**Luồng chính**:
1. Admin chọn file `.csv` để tải lên (header bắt buộc: `name,price,description,imageUrl,category_id`, hỗ trợ trường chứa dấu phẩy khi bọc trong dấu nháy kép theo RFC 4180).
2. Hệ thống validate từng dòng: `name` không rỗng, `price` là số dương.
3. Nếu tất cả dòng hợp lệ → hệ thống import toàn bộ (giao dịch atomic) và báo cáo số dòng thành công.

**Luồng ngoại lệ**:
- File không phải `.csv` → từ chối ngay từ đầu.
- Có ít nhất 1 dòng lỗi (name rỗng hoặc price không dương) → toàn bộ import bị rollback (all-or-nothing), không có sản phẩm nào được thêm dù các dòng khác hợp lệ.
- Hệ thống báo cáo rõ: bao nhiêu dòng lỗi và lý do cụ thể từng dòng.

**Hậu điều kiện**: Hoặc toàn bộ sản phẩm hợp lệ được import, hoặc không sản phẩm nào được thêm (rollback hoàn toàn).

---

## UC-17: Quản lý Mã giảm giá (Coupon CRUD)
**Actor**: Admin
**Liên quan**: FR-17

**Luồng chính**:
1. Admin thêm mã giảm giá: `code` (duy nhất), `type` (percent/fixed), `discount_value` (dương), `expired_at`, `min_order_amount` (≥0), `max_uses_per_user` (≥1).
2. Admin xem danh sách mã giảm giá.
3. Admin xóa mã giảm giá.

**Luồng ngoại lệ**:
- `code` trùng với mã đã tồn tại → từ chối.
- Các trường bắt buộc thiếu hoặc sai ràng buộc (giá trị âm, ngày không hợp lệ...) → từ chối.

**Hậu điều kiện**: Danh sách coupon được cập nhật hợp lệ, không có mã trùng.

---

## UC-18: Quản lý Đơn hàng (Admin)
**Actor**: Admin
**Liên quan**: FR-18

**Luồng chính**:
1. Admin xem toàn bộ đơn hàng của tất cả người dùng.
2. Admin chuyển trạng thái đơn hàng: `pending→confirmed`, `confirmed→shipping`, `shipping→delivered`, hoặc hủy (`pending/confirmed→canceled`) theo đúng State Machine (FR-10).
3. Địa chỉ giao hàng hiển thị an toàn (escape, không render HTML).

**Luồng ngoại lệ**:
- Admin cố chuyển từ trạng thái kết thúc (`delivered`/`canceled`) sang trạng thái khác → hệ thống từ chối.
- Chuyển đổi không đúng thứ tự trong sơ đồ (VD: `pending→shipping` bỏ qua `confirmed`) → hệ thống từ chối.

**Hậu điều kiện**: Trạng thái đơn hàng chỉ thay đổi theo đúng State Machine đã định nghĩa.

---

## UC-19: Quản lý Người dùng (Admin)
**Actor**: Admin
**Liên quan**: FR-19

**Luồng chính**:
1. Admin xem danh sách toàn bộ người dùng (không hiển thị mật khẩu).
2. Admin xóa một người dùng khác.

**Luồng ngoại lệ**:
- Admin cố xóa chính tài khoản đang đăng nhập → hệ thống từ chối.

**Hậu điều kiện**: Danh sách user cập nhật, admin hiện tại không thể tự xóa chính mình.

---

## UC-20: Sử dụng ứng dụng Mobile
**Actor**: User (qua React Native App)
**Liên quan**: FR-20

**Mô tả**: Bao gồm các use case tương tự bản Web (UC-01, 02, 04–11) trên nền mobile: Xem sản phẩm, Đăng nhập, Đăng xuất, Đăng ký, Giỏ hàng, Thanh toán, Hồ sơ, Lịch sử đơn hàng.

**Ràng buộc riêng**:
- Hủy đơn hàng trên mobile chỉ được phép khi đơn ở trạng thái `pending` hoặc `confirmed` (giống UC-10, tuân theo State Machine FR-10).

---

## Ghi chú cho việc thiết kế Test Case

Các use case trên có thể ánh xạ sang kỹ thuật thiết kế test:
- **UC-01, UC-03, UC-04, UC-15, UC-16, UC-17**: nhiều ràng buộc dữ liệu đầu vào → phù hợp **Equivalence Partitioning / Boundary Value Analysis**.
- **UC-09 (Coupon 5 điều kiện)**: phù hợp **Decision Table** (2^5 = 32 tổ hợp, có thể rút gọn).
- **UC-10, UC-18 (State Machine)**: phù hợp **State Transition Testing** — cần test cả các chuyển đổi hợp lệ và KHÔNG hợp lệ.
- **UC-16 (CSV Import)**: cần test tính **atomic/rollback** — 1 dòng lỗi trong nhiều dòng hợp lệ phải làm rollback toàn bộ.
- **UC-12 (Access Control)**: phù hợp test theo **role-based access** — test với token thiếu, token role sai, token hết hạn.
- **SEC-04, FR-05, FR-18**: liên quan **XSS/escape** — test với input chứa `<script>`, HTML tag.
