# AI Critique — HW04 Automation Testing

**Sinh viên:** Bùi Dương Duy Cường — `23127033`  
**Bài tập:** HW04 - Automation Testing (EShop SUT)

---

Trong bài tập HW04 Automation Testing, việc áp dụng chiến lược AI-First thông qua Agent Skill (`automation-test-generator`) đã mang lại hiệu quả vượt trội trong việc tăng tốc độ xây dựng bộ kịch bản test tự động và tách biệt dữ liệu kiểm thử dạng JSON. AI hỗ trợ sinh khung 50 test cases đa dạng và phủ kín các luồng Happy Path cơ bản một cách nhanh chóng.

Tuy nhiên, qua quá trình thẩm định kỹ lưỡng (Human Review), tôi đã phát hiện ra lý do vì sao khi dùng AI Agent Skill sinh kịch bản tự động lại vẫn phát sinh thiếu sót về Assertions, Edge Cases & phát hiện lỗi SUT:

1. **Hạn chế về ngữ cảnh giao diện thực tế (Lack of Live DOM Context):** AI phân tích dựa trên văn bản tĩnh nên không trực tiếp "nhìn thấy" DOM thực tế khi render. Do đó, AI không thể nhận biết giao diện bị thiếu ô Confirm Password (`BUG-FR03-003`) hay nút Xóa thực hiện xóa thẳng mà không bật hộp thoại xác nhận `window.confirm` (`BUG-FR15-004`).
2. **Suy luận máy móc theo Happy Path chuẩn (Over-reliance on Standard Assumptions):** AI được huấn luyện trên mã nguồn chuẩn hóa nên mặc định giả định hệ thống luôn có bảo mật phân quyền. Vì vậy, AI bỏ qua kịch bản kiểm thử việc người dùng khách chưa đăng nhập vẫn áp dụng thành công mã coupon (`BUG-FR09-003`).
3. **Không đọc được logic ẩn & công thức toán học bị lỗi:** AI không tự nhận biết regex `flawedStrongPasswordRegex` bắt buộc chứa khoảng trắng (`BUG-FR03-005`) hay công thức tính phần trăm coupon `SAVE10` bị backend nhân 10 lần giá trị (`BUG-FR09-002`).
4. **Assertion nông (Shallow Assertions):** AI có xu hướng chỉ viết các câu lệnh kiểm tra bề mặt như `toBeVisible()` hoặc `toHaveURL()`, bỏ qua việc xác minh sự thay đổi dữ liệu chi tiết trong bảng DOM (như việc sửa 1 sản phẩm bị mass update toàn bộ DB - `BUG-PROD-001`).

**Bài học rút ra:** AI là một trợ lý tuyệt vời giúp loại bỏ các công việc viết code lặp đi lặp lại. Tuy nhiên, người kiểm thử bắt buộc phải giữ vai trò chủ đạo (Human-in-the-Loop), trực tiếp đọc mã nguồn SUT, chạy thử kịch bản thực tế trên trình duyệt để thẩm định và hoàn thiện bộ test suite đạt chất lượng cao nhất.
