# Security Checklist — SEC-01 đến SEC-07

Dùng khi thực hiện Bước 3 (Security) của Giai đoạn 1 trong `SKILL.md`. Thiết kế test condition **riêng cho từng nhóm**, theo đúng đặc điểm của endpoint đang xét — không dùng chung một prompt/mẫu cho cả 7 nhóm, vì mỗi nhóm cần thông tin đầu vào khác nhau (parameter nào, role nào, resource nào).

Nếu người dùng đã có bộ SEC ID riêng của họ (ví dụ đề bài quy định SEC-01 là gì cụ thể), luôn ưu tiên định nghĩa của người dùng thay vì bảng mặc định dưới đây — hỏi lại nếu chưa rõ.

## SEC-01 — SQL Injection / NoSQL Injection
- Với mọi parameter đi vào query (path param, query param, body field dùng để filter/search), thử payload injection cơ bản (`' OR '1'='1`, `; DROP TABLE...`, toán tử NoSQL như `$ne`, `$gt`).
- Kết quả mong đợi: request bị từ chối/validate lỗi (400) hoặc không có dữ liệu bất thường trả về; tuyệt đối không được lộ lỗi database/stack trace trong response.

## SEC-02 — IDOR (Insecure Direct Object Reference)
- Với endpoint có id resource trong path/body (`/orders/{id}`, `/users/{id}`...), thử truy cập resource thuộc user/role khác bằng token của user hiện tại.
- Kết quả mong đợi: trả 403/404, không trả về dữ liệu của resource không thuộc quyền sở hữu.

## SEC-03 — Role Escalation / Broken Access Control
- Với endpoint chỉ dành cho role cao hơn (admin-only), thử gọi bằng token của role thấp hơn; thử thay đổi field liên quan đến role/quyền ngay trong body request (mass assignment tới field `role`, `isAdmin`...).
- Kết quả mong đợi: từ chối request (401/403), field nhạy cảm không bị ghi đè dù có gửi trong body.

## SEC-04 — Authentication Bypass
- Thử gọi endpoint cần auth mà không có token, token hết hạn, token bị sửa (tamper), hoặc token của session đã logout.
- Kết quả mong đợi: 401, không trả dữ liệu.

## SEC-05 — Input Validation / Injection khác (XSS, Command Injection)
- Với field text tự do (tên, mô tả, comment...), thử payload script (`<script>alert(1)</script>`), command injection nếu field liên quan xử lý file/hệ thống.
- Kết quả mong đợi: input được sanitize hoặc reject, không được lưu/echo lại nguyên văn gây XSS lưu trữ.

## SEC-06 — Rate Limiting / Brute Force
- Với endpoint nhạy cảm (login, OTP, reset password), thử gọi liên tục vượt ngưỡng cho phép trong khoảng thời gian ngắn.
- Kết quả mong đợi: hệ thống chặn/giới hạn (429) sau ngưỡng, không cho brute force vô hạn.

## SEC-07 — Sensitive Data Exposure
- Kiểm tra response (kể cả response lỗi) có lộ field nhạy cảm không nên trả về (password hash, token nội bộ, thông tin user khác, chi tiết lỗi hệ thống).
- Kết quả mong đợi: response chỉ chứa field cần thiết theo spec, lỗi trả về thông điệp chung chung, không lộ chi tiết implementation.

---

Mỗi test condition sinh ra từ checklist này ghi vào bảng Security của file phân tích với ID `SEC-0X-NNN` (0X = 01..07, NNN = số thứ tự trong nhóm đó, riêng cho từng endpoint nếu cần).
