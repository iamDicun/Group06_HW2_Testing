# Báo Cáo Phản Biện & Hiệu Chỉnh Thiết Kế Test (AI Critique & Human Review)

## 1. Giới Thiệu & Bối Cảnh

Trong quy trình thiết kế kiểm thử hiệu năng theo chiến lược AI-First, mô hình AI đã được thúc đẩy (driven) từng bước để tạo ra các kịch bản kiểm thử (Load, Stress, Spike). Tuy nhiên, các bản phác thảo ban đầu của AI luôn bộc lộ các giả định ngây thơ (naive assumptions) và sai sót kỹ thuật do thiếu hiểu biết sâu sắc về đặc tính runtime thực tế của ứng dụng.

Tài liệu này ghi nhận chi tiết những điểm **AI đã làm sai hoặc bỏ sót**, phân tích nguyên nhân cốt lõi và các **giải pháp hiệu chỉnh kỹ thuật (Human Fixes)** đã được áp dụng.

---

## 2. Bảng Tổng Hợp Các Điểm AI Bỏ Sót & Hiệu Chỉnh

| STT | Vấn đề / Điểm AI làm sai | Phân loại | Hậu quả nếu không sửa | Giải pháp hiệu chỉnh của Tester |
|---|---|---|---|---|
| 1 | **Sử dụng 1 tài khoản đăng nhập duy nhất cho tất cả Virtual Users** | Lỗi nghiêm trọng (Concurrency & Lockout) | Khi chạy 50–150 VU đồng thời, race condition hoặc 1 request sai làm tăng `login_attempts >= 3`, kích hoạt khóa tài khoản 3 phút (`locked_until`). Toàn bộ 100% các VU sau đó thất bại hàng loạt (Cascading Failure). | Sinh `data/users.csv` chứa 500 tài khoản riêng biệt. Mỗi VU được ánh xạ theo `__VU` độc lập (`perf_user_0001` đến `perf_user_0500`). Viết thêm script `reset_lockouts.js`. |
| 2 | **Think-Time dùng giá trị cố định (`sleep(2)`)** | Thiếu thực tế (Unrealistic Behavior) | Mọi VU gửi request theo nhịp đồng hồ cơ học (Lockstep effect), tạo ra các đỉnh tải nhân tạo (artificial resonance) không phản ánh hành vi người dùng thật. | Áp dụng hàm sinh ngẫu nhiên `randomBetween(min, max)` và phân hóa theo từng nhóm nghiệp vụ: Auth (1-2s), Read (2-4s), Transactional (3-5s). |
| 3 | **Thiếu pha đo lường phục hồi (Recovery Phase) trong Spike Test** | Sai mục đích kịch bản | AI chỉ cho tăng tải vọt lên rồi ngắt test ngay (`target: 0`), khiến kịch bản không thể đo được thời gian hệ thống tự hồi phục sau sốc tải. | Bổ sung Pha 5 (Recovery Phase: 1m30s tại baseline 15 VUs) để giám sát độ trễ đưa về bình thường trước khi kết thúc test. |
| 4 | **Assertions quá yếu (Weak Assertions)** | Lỗi kiểm thử (False Positives) | AI chỉ kiểm tra `r.status === 200`. Trong trường hợp SQLite bị lock hoặc backend trả về `{ error: "..." }` kèm status 200, test vẫn báo Pass sai lệch. | Bổ sung deep check trên body JSON: kiểm tra `token` tồn tại và có độ dài hợp lệ, mảng sản phẩm `Array.isArray()`, kiểm tra trường `orderId` trả về sau khi checkout. |
| 5 | **Không tính đến đặc thù khóa đơn luồng (Single-Writer Lock) của SQLite** | Kiến trúc hệ thống | AI đặt cùng 1 threshold phản hồi < 500ms cho mọi endpoint, trong khi `POST /api/checkout` ghi DB SQLite sẽ bị nghẽn hàng đợi tuần tự khi tải cao. | Phân tách `group_duration` riêng cho `auth`, `read`, và `transactional` với các ngưỡng SLA thực tế tương ứng (500ms / 800ms / 1500ms cho Load, nới lỏng cho Stress). |
| 6 | **Dùng chung 1 loại báo cáo cho cả 3 kịch bản** | Yêu cầu bài tập | AI thường chỉ xuất ra stdout console mặc định mà không đáp ứng tiêu chí 3 loại báo cáo/listener trực quan khác nhau. | Tích hợp 3 View/Listener riêng biệt: (1) HTML Interactive Dashboard (`k6-reporter`), (2) Aggregated Metric JSON Report, (3) Detailed Console & Raw Text Stream Log. |

---

## 3. Phân Tích Chi Tiết Nguyên Nhân (Root Cause Analysis)

### 3.1. Tại sao AI bỏ sót cơ chế Account Lockout?
- **Nguyên nhân**: AI chỉ đọc lướt qua code route `/api/login` mà không phân tích logic stateful trong database (`login_attempts` và `locked_until`). Trong tư duy sinh code mặc định, AI có xu hướng dùng 1 biến môi trường đơn giản như `__ENV.TEST_USER || 'test@eshop.com'`.
- **Bài học**: Kiểm thử hiệu năng hệ thống có cơ chế xác thực bảo mật (Rate Limiting / Account Lockout) bắt buộc phải sử dụng chiến lược **Data-Driven Testing** với User Pool đủ lớn.

### 3.2. Tại sao AI chọn tham số Ramp-up và Think-time thiếu thực tế?
- **Nguyên nhân**: Các prompt chung chung không cung cấp hồ sơ hành vi người dùng (User Behavior Profile). AI thường copy snippet mẫu cơ bản từ tài liệu k6 có sẵn với giá trị `sleep(1)` tĩnh.
- **Bài học**: Tester phải định hướng cho AI bằng cách phân loại rõ ràng 3 nhóm endpoint (Auth, Read, Transactional) tương ứng với thời gian thao tác tâm lý của người dùng thực tế.

### 3.3. Tại sao AI viết Assertions yếu?
- **Nguyên nhân**: Mô hình ngôn ngữ mặc định ưu tiên tính ngắn gọn của code (`check(res, { 'status 200': (r) => r.status === 200 })`) nếu không được yêu cầu xác thực payload schema và tính đúng đắn của dữ liệu nghiệp vụ.

---

## 4. Kết Luận & Trách Nhiệm Của Tester

Bộ 3 kịch bản kiểm thử (`23127391_Load_20260815.js`, `23127391_Stress_20260815.js`, `23127391_Spike_20260815.js`) đã được rà soát toàn diện, hiệu chỉnh 100% các điểm yếu trên để đảm bảo tính thực tế, độ tin cậy và sự sẵn sàng cho quá trình thực thi có đối chứng.
