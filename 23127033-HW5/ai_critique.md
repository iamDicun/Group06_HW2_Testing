# AI Critique (Phân Tích & Phê Bình AI)

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  

Trong quá trình thực hiện bài tập HW05 Performance Testing với k6, việc ứng dụng AI (Gemini / Claude) đã mang lại hiệu quả rất cao trong việc tự động thiết kế kịch bản kiểm thử End-to-End và khởi tạo dữ liệu thử nghiệm dạng CSV. Tuy nhiên, khi chuyển sang giai đoạn phân tích kết quả thô (`raw log`) và đề xuất giải pháp kỹ thuật, AI đã bộc lộ những lỗi sai nghiêm trọng về mặt đọc hiểu dữ liệu và kiến trúc hệ thống.

Thứ nhất, AI đã mắc lỗi **Misinterpretation (Hiểu sai dữ liệu log)** một cách máy móc. Khi phân tích file `23127033_Load_20260816.summary.jtl`, AI thấy chỉ số `http_req_failed` đạt mức $16.67\%$ liền vội vã đưa ra kết luận rằng server EShop bị từ chối dịch vụ (DoS) và sập tải ở mức 10 Virtual Users. Thực tế qua đối soát thủ công (Human Review), tôi phát hiện ra rằng $100\%$ các request đăng nhập, xem profile, tìm kiếm và checkout đều thành công tuyệt đối ($200 OK$). $16.67\%$ lỗi thực chất tới từ API `POST /api/apply-coupon` trả về HTTP `400 Bad Request` do mã giảm giá quy định mỗi user chỉ được sử dụng một lần (`max_uses_per_user: 1`). AI đã hoàn toàn thiếu ngữ cảnh nghiệp vụ (Business Logic Context) và quy chụp lỗi nghiệp vụ hợp lệ thành lỗi quá tải phần cứng.

Thứ hai, về mặt đề xuất tối ưu hóa, AI mắc lỗi **Hallucination (Ảo giác)** khi đề xuất mở rộng "Database Connection Pool" cho EShop. Do EShop sử dụng cơ sở dữ liệu nhúng SQLite dạng tập tin đơn (`database.sqlite`), kiến trúc này không sử dụng kết nối mạng Client-Server nên không hề có khái niệm Connection Pool. Giải pháp khả thi thực sự phải là kích hoạt chế độ **SQLite WAL Mode (`PRAGMA journal_mode = WAL;`)**.

Bài học cốt lõi rút ra là: **Dữ liệu thô và log kiểm thử bắt buộc phải được người kiểm thử trực tiếp thẩm định**. AI chỉ là công cụ hỗ trợ tổng hợp mã lệnh, còn tư duy phản biện và hiểu biết sâu sắc về nghiệp vụ hệ thống SUT là yếu tố quyết định chất lượng bài test.
