# AI Critique (Báo Cáo Phê Bình & Đánh Giá AI)

**Sinh viên:** Bùi Dương Duy Cường — `MSSV: 23127033`  
**Bài tập:** HW06 – API Testing (Postman & Newman)  

Trong quá trình thực hiện bài tập HW06 API Testing, việc cộng tác với các mô hình AI (Claude 3.7 Sonnet, Gemini 3.7 Flash) đã giúp tăng tốc đáng kể việc phác thảo bộ ca kiểm thử cho 3 API. Tuy nhiên, qua quá trình kiểm duyệt thủ công (Human Review) và thực thi thực tế, tôi nhận thấy AI đã bộc lộ những sai sót, thiên lệch (bias) và thiếu sót quan trọng.

Thứ nhất, AI thường xuyên mắc lỗi **đoán mã trạng thái phản hồi (Status Code Hallucination)** và nhầm lẫn phân quyền. Cụ thể, ở API `POST /api/forgot-password` (FR-03), khi email sai định dạng hoặc bỏ trống, AI giả định backend trả về HTTP `400 Bad Request`, nhưng thực tế backend Express của SUT truy vấn DB không khớp nên trả về `404 Not Found`. Tương tự, tại endpoint `PUT /api/admin/orders/:id/status`, AI ban đầu nhầm lẫn giữa lỗi chưa xác thực (`401 Unauthenticated` khi thiếu token) và lỗi từ chối quyền truy cập (`403 Forbidden` khi gửi token của user thường). Nguyên nhân là do AI sinh test dựa trên suy diễn xác suất văn bản đặc tả thay vì phân tích luồng code thực tế trong `server.js`.

Thứ hai, AI có thiên lệch chỉ tập trung vào kiểm tra giá trị trường trong JSON body mà **hoàn toàn bỏ sót các thuộc tính phi chức năng và giao thức HTTP** như: kiểm tra header `Content-Type: application/json`, giới hạn thời gian phản hồi (Response time threshold $< 500\text{ms}$), hay các trường hợp chuyển trạng thái đơn hàng bất hợp lệ trong State Machine (như đổi từ `delivered` ngược về `pending`).

Bài học cốt lõi rút ra khi làm việc với AI là: **AI là công cụ hỗ trợ sinh kịch bản cực kỳ nhanh, nhưng con người bắt buộc phải giữ vai trò thẩm định, hiểu rõ mã nguồn SUT và xác thực thông qua dữ liệu chạy thực tế**. Không bao giờ được tin tưởng tuyệt đối vào các assertion do AI đề xuất nếu chưa chạy kiểm thử thực tế.
