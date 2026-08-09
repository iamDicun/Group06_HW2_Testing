# AI Critique — HW04 Automation Testing

**Sinh viên:** Bùi Dương Duy Cường — `23127033`  
**Bài tập:** HW04 - Automation Testing (EShop SUT)

---

Trong bài tập HW04 Automation Testing, việc áp dụng chiến lược AI-First thông qua Agent Skill (`automation-test-generator`) đã mang lại hiệu quả vượt trội trong việc tăng tốc độ xây dựng bộ kịch bản test tự động và tách biệt dữ liệu kiểm thử dạng JSON. AI hỗ trợ sinh khung test cases đa dạng và phủ kín các luồng Happy Path cơ bản một cách nhanh chóng.

Tuy nhiên, qua quá trình thẩm định kỹ lưỡng (Human Review), tôi đã phát hiện một số hạn chế cốt lõi của AI:

1. **Thiếu nhạy bén với các quy tắc nghiệp vụ ẩn và Regex Flawed:** AI chỉ phân tích bề mặt và thường giả định mã nguồn tuân theo các chuẩn thông thường. Với `FR-03` Quên mật khẩu, AI không tự nhận biết biểu thức chính quy `flawedStrongPasswordRegex` trên frontend bắt buộc mật khẩu phải chứa ký tự khoảng trắng (`\s`). Tôi đã phải trực tiếp đọc mã nguồn SUT và bổ sung các kịch bản kiểm thử biên tương ứng.
2. **Selector tĩnh và thiếu xử lý bất đồng bộ giao diện:** Ban đầu AI tạo ra các selector dễ bị đứt gãy khi giao diện thay đổi nhẹ (`#submit-btn` hoặc `.bg-blue-600`) và bỏ qua việc xử lý các hộp thoại JavaScript Alert (`page.once('dialog')`). Tôi đã tái cấu trúc lại toàn bộ selector sang dạng Accessibility Locators (`getByRole`, `getByPlaceholder`, `getByText`) chuẩn hóa theo khuyến nghị của Playwright.
3. **Quên thiết lập môi trường và phụ thuộc trạng thái:** Khi sinh script cho Admin Portal (`FR-15`), AI bỏ qua bước xác thực tài khoản Admin tự động trong `beforeEach`, dẫn đến script bị lỗi chuyển hướng trang khi thực thi thực tế.

**Bài học rút ra:** AI là một trợ lý tuyệt vời giúp lập trình viên QA loại bỏ các công việc lặp đi lặp lại. Tuy nhiên, người kiểm thử phải luôn giữ thế chủ động (Human-in-the-Loop), làm chủ hoàn toàn mã nguồn test tự động, và không bao giờ tin tưởng tuyệt đối vào kết quả do AI tạo ra mà không qua quá trình thực thi và kiểm chứng thực tế.
