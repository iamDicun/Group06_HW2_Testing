# Test Case: TC_ST_FR10_12

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `shipping` |
| **Sự kiện** | Admin cố gắng lùi lại trạng thái (chuyển sang `confirmed`) |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin) đã đăng nhập với tài khoản Admin.
3. Đơn hàng đang ở trạng thái `shipping`.
4. Admin có quyền truy cập trang Quản lý Đơn hàng.

## Các bước thực hiện

1. Admin đăng nhập vào hệ thsistem.
2. Admin truy cập trang **Quản lý Đơn hàng**.
3. Admin tìm kiếm/chọn đơn hàng ở trạng thái `shipping`.
4. Admin cố gắng bấm nút **"Quay lại Confirmed"** hoặc chọn hành động "Chuyển sang Confirmed" (nếu có).
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng hợp lệ ở trạng thái `shipping`)
- **Hành động**: Lùi lại trạng thái (Revert to Confirmed)
- **Actor**: Admin

## Kết quả mong đợi

- ❌ Yêu cầu lùi lại bị **từ chối** (HTTP 400 Bad Request hoặc tương đương).
- ❌ Trạng thái đơn hàng **giữ nguyên** `shipping` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Không thể lùi lại trạng thái đơn hàng."
  - "Invalid transition: shipping → confirmed không được phép."
  - "Chỉ có thể chuyển tiếp sang trạng thái tiếp theo, không được lùi lại."

## Ghi chú

- Đây là một **invalid transition** (1-switch coverage).
- State Machine là **một chiều (one-way)** — chỉ cho phép chuyển tiếp (forward), không được lùi lại (backward).
- Ngoài hủy đơn hàng (`shipping` → `canceled`), tất cả các chuyển động đều phải theo hướng tiến.
