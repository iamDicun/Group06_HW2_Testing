# Test Case: TC_ST_FR10_15

- **Đặc tả liên quan**: FR-10 (Order State Machine)
- **Kỹ thuật thiết kế**: State Transition Testing
- **Loại transition**: Không hợp lệ (Invalid)

## Thông tin chung

| Trường | Giá trị |
|---|---|
| **Trạng thái đầu** | `canceled` |
| **Sự kiện** | Admin/User cố gắng làm bất kỳ thao tác nào |
| **Kết quả mong đợi** | ❌ Từ chối (lỗi) — `canceled` là Final State |

## Điều kiện tiên quyết

1. Hệ thống EShop đang chạy bình thường.
2. Người dùng (Admin hoặc User) đã đăng nhập.
3. Đơn hàng đã bị hủy và đang ở trạng thái `canceled` (Final State).

## Các bước thực hiện

1. Người dùng đăng nhập vào hệ thống.
2. Người dùng truy cập **Lịch sử đơn hàng** (User) hoặc **Quản lý Đơn hàng** (Admin).
3. Người dùng tìm kiếm/chọn đơn hàng ở trạng thái `canceled`.
4. Người dùng cố gắng bấm bất kỳ nút hành động nào (Xác nhận, Giao hàng, Hoàn tất, v.v.).
5. Hệ thống xử lý yêu cầu.

## Dữ liệu đầu vào

- **Đơn hàng ID**: (một đơn hàng ở trạng thái `canceled`)
- **Hành động**: Bất kỳ hành động nào (Confirm, Ship, Complete, Cancel, v.v.)
- **Actor**: User hoặc Admin

## Kết quả mong đợi

- ❌ Mọi hành động chuyển đổi trạng thái bị **từ chối** (HTTP 400/403 hoặc tương đương).
- ❌ Trạng thái đơn hàng **giữ nguyên** `canceled` (không thay đổi).
- ❌ Hệ thống trả về **thông báo lỗi** phù hợp, ví dụ:
  - "Không thể chuyển đổi trạng thái của đơn hàng đã hủy."
  - "Invalid transition: canceled → * không được phép (Final State)."
  - "Đơn hàng này đã bị hủy và không thể chỉnh sửa."
- ✅ Các nút hành động nên bị **ẩn hoặc vô hiệu hóa** khi đơn hàng ở trạng thái `canceled` (tốt nhất).

## Ghi chú

- Đây là các **invalid transition** (1-switch coverage) — **quy tắc ràng buộc Final State**.
- Theo FR-10: "`canceled` là **trạng thái kết thúc** — không được phép chuyển sang bất kỳ trạng thái nào khác."
- Một lần đơn hàng đã bị hủy, không thể khôi phục hoặc thay đổi được.
- Đây là bảo vệ toàn vẹn dữ liệu và ngăn chặn các thay đổi không mong muốn trên đơn hàng đã hủy.
