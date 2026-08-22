# Bug Report: BUG-API-02

**Mã Lỗi:** `BUG-API-02`  
**Tiêu Đề:** Lỗ hổng kiểm soát truy cập (Broken Access Control - SEC-03) tại các Endpoint Quản trị Admin  
**Chức Năng:** `FR-12` Access Control & `FR-18` Order Management (Admin)  
**Endpoint Bị Ảnh Hưởng:** `PUT /api/admin/orders/:id/status` & `POST /api/admin/coupons`  
**Mức Độ Nghiêm Trọng (Severity):** High  
**Độ Ưu Tiên (Priority):** P1  
**Môi Trường:** Backend Node.js / Express SUT (`application/backend/server.js`)  
**Liên Kết GitHub Issue:** https://github.com/iamDicun/Group06_HW2_Testing/issues/162  

---

## 1. Mô Tả Chi Tiết (Description)
Theo tài liệu đặc tả mục 6: *"Tất cả API dành cho Admin yêu cầu Authorization: Bearer <token> và tài khoản phải có quyền Admin."*

Tuy nhiên, trong mã nguồn `server.js`, endpoint `PUT /api/admin/orders/:id/status` chỉ sử dụng middleware `authenticateToken` để kiểm tra tính hợp lệ của chữ ký JWT token mà **không hề kiểm tra trường `req.user.role === 'admin'`**. Hệ quả là một người dùng thông thường (`role: 'user'`) có thể gửi request và thay đổi trạng thái đơn hàng của toàn bộ hệ thống.

---

## 2. Các Bước Tái Hiện Lỗi (Steps to Reproduce)
1. Đăng nhập bằng tài khoản người dùng thường: `test@eshop.com` / `Test1234!` để lấy JWT Token của User.
2. Gửi request `PUT /api/admin/orders/1/status` với:
   * Header: `Authorization: Bearer <User_Token>`
   * Body: `{"status": "confirmed"}`
3. Quan sát phản hồi từ server.

---

## 3. Kết Quả Thực Tế (Actual Result)
Server chấp nhận request và trả về `HTTP 200 OK`: `{"message": "Order status updated"}`.

---

## 4. Kết Quả Kỳ Vọng (Expected Result)
Server phải kiểm tra quyền hạn và từ chối truy cập bằng mã lỗi `HTTP 403 Forbidden`: `{"error": "Forbidden: Admin role required"}`.

---

## 5. Minh Chứng Đoạn Code Lỗi Trong SUT (`server.js`)
```javascript
// server.js (Dòng 525)
// Endpoint Admin nhưng chỉ dùng middleware authenticateToken chung, thiếu middleware check role Admin:
app.put("/api/admin/orders/:id/status", authenticateToken, (req, res) => {
    // THIẾU: if (req.user.role !== 'admin') return res.status(403).json({ error: "Forbidden" });
```
