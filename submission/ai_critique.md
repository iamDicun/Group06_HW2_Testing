# AI Critique

**Student:** 23127391 - Nguyễn Anh Khoa

---
Mặc dù AI được trang bị nhiều khả năng chuyên biệt nhằm hỗ trợ từng giai đoạn trong quy trình kiểm thử phần mềm, hiệu quả của nó vẫn có sự khác biệt đáng kể giữa các loại tác vụ. Đối với quá trình thiết kế kiểm thử, AI có thể tạo test case với tốc độ nhanh, giúp giảm đáng kể thời gian chuẩn bị. Tuy nhiên, kết quả tạo ra vẫn tồn tại nhiều hạn chế như đặt tên file chưa thống nhất, sinh ra các test case dư thừa hoặc không cần thiết, đồng thời một số test case chưa tuân thủ đầy đủ nguyên tắc của kỹ thuật Domain Testing. Vì vậy, các sản phẩm do AI tạo ra vẫn cần được kiểm tra và chỉnh sửa thủ công trước khi có thể sử dụng trong quá trình kiểm thử thực tế.

Ngược lại, AI thể hiện hiệu quả cao hơn trong các hoạt động liên quan đến kiểm thử API. Công cụ có thể nhanh chóng tạo các script kiểm thử, đồng thời phân tích request, response và các HTTP status code chính xác hơn so với việc thực hiện hoàn toàn bằng tay. Điều này giúp rút ngắn đáng kể thời gian xây dựng và thực thi các bài kiểm thử API, đặc biệt đối với những hệ thống có nhiều endpoint hoặc yêu cầu kiểm tra lặp đi lặp lại.

Tuy nhiên, đối với kiểm thử giao diện người dùng, hiệu quả của AI vẫn còn nhiều hạn chế. Mặc dù đã được hỗ trợ bởi các tính năng như web agent để tương tác với ứng dụng, tốc độ thực hiện vẫn chậm hơn đáng kể so với thao tác trực tiếp của con người. Bên cạnh đó, AI chủ yếu kiểm tra dựa trên cấu trúc và hành vi của giao diện nên khó có thể phát hiện các lỗi liên quan đến hiển thị, chẳng hạn như bố cục bị lệch, nội dung bị cắt, màu sắc hiển thị không phù hợp hoặc các vấn đề ảnh hưởng đến trải nghiệm người dùng. Do đó, kiểm thử giao diện vẫn cần sự tham gia của kiểm thử viên để đảm bảo chất lượng hiển thị và tính trực quan của hệ thống.

