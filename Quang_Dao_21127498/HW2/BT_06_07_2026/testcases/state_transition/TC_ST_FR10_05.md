# Test Case: TC_ST_FR10_05

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Hợp lệ (Valid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `confirmed` |
| **Sự kiện** | Admin giao hàng |
| **Trạng thái kết quả** | `shipping` |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đã được tạo, xác nhận và đang ở trạng thái `confirmed`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thống.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `confirmed`.
4. Admin bấm nút **"Giao hàng"** hoặc chọn hành động "Chuyển sang Shipping".
5. Hệ thống xử lý yêu cầu.
6. Admin quan sát kết quả trạng thái đơn hàng.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `confirmed`)
- **Hành động**: Giao hàng (Ship Order)
- **Actor**: Admin (role = 'admin')

## Kết quả mong đợi

- ✅ Yêu cầu giao hàng được chấp nhận (HTTP 200 hoặc tương đương).
- ✅ Trạng thái đơn hàng thay đổi từ `confirmed` → `shipping`.
- ✅ Giao diện cập nhật trạng thái thành `shipping` (tiếng Việt: "Đang giao hàng").
- ✅ Có thông báo thành công (ví dụ: "Giao hàng thành công").
- ✅ Lịch sử hoặc timeline đơn hàng ghi nhận sự kiện chuyển đổi trạng thái.

## Ghi chú

- Đây là một **valid transition** trong State Machine của FR-10.
- `confirmed` → `shipping` là bước thứ hai trong quy trình xử lý đơn hàng.
- Quá trình này chỉ được Admin thực hiện.
