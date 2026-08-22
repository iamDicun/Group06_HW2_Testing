# Bug Report: BUG-API-01

**Mã Lỗi:** `BUG-API-01`  
**Tiêu Đề:** Đơn hàng đã bị hủy (`canceled`) cho phép chuyển thẳng sang trạng thái đã giao (`delivered`)  
**Chức Năng:** `FR-18` Order Management & State Transition  
**Endpoint Bị Ảnh Hưởng:** `PUT /api/admin/orders/:id/status`  
**Mức Độ Nghiêm Trọng (Severity):** Critical  
**Độ Ưu Tiên (Priority):** P1  
**Môi Trường:** Backend Node.js / Express SUT (`application/backend/server.js`)  
**Liên Kết GitHub Issue:** https://github.com/iamDicun/Group06_HW2_Testing/issues/163  

---

## 1. Mô Tả Chi Tiết (Description)
Theo đặc tả nghiệp vụ luồng trạng thái đơn hàng (State Machine):
$$\text{pending} \rightarrow \text{confirmed} \rightarrow \text{shipping} \rightarrow \text{delivered}$$
$$(\text{pending} \rightarrow \text{canceled}, \quad \text{confirmed} \rightarrow \text{canceled})$$

Khi một đơn hàng đã bị hủy (`canceled`), đơn hàng đó phải ở trạng thái kết thúc (Terminal State) và tuyệt đối không được phép chuyển sang bất kỳ trạng thái nào khác. Tuy nhiên, trong mã nguồn backend `server.js`, hệ thống tồn tại điều kiện cho phép chuyển thẳng từ `canceled` sang `delivered`.

---

## 2. Các Bước Tái Hiện Lỗi (Steps to Reproduce)
1. Khởi động server backend EShop.
2. Gửi request `PUT /api/admin/orders/1/status` với body `{"status": "canceled"}` (Admin Token). Đơn hàng chuyển sang `canceled`.
3. Tiếp tục gửi request `PUT /api/admin/orders/1/status` với body `{"status": "delivered"}` (Admin Token).
4. Quan sát mã phản hồi HTTP và dữ liệu trong Database.

---

## 3. Kết Quả Thực Tế (Actual Result)
* API trả về `HTTP 200 OK` với body: `{"message": "Order status updated"}`.
* Trạng thái đơn hàng trong bảng `orders` của SQLite bị cập nhật thành `delivered`.

---

## 4. Kết Quả Kỳ Vọng (Expected Result)
* API phải từ chối chuyển đổi trạng thái và trả về `HTTP 400 Bad Request`.
* Body phản hồi lỗi: `{"error": "Invalid state transition from canceled to delivered"}`.

---

## 5. Minh Chứng Đoạn Code Lỗi Trong SUT (`server.js`)
```javascript
// server.js (Dòng 550-552)
if (currentStatus === "canceled" && status === "delivered")
  isValidTransition = true; // <-- LỖI NGHIỆP VỤ NGHIÊM TRỌNG
```
