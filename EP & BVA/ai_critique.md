# AI Critique - 200-300 Từ

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  
**Bài tập:** HW02 - Domain Testing trên EShop

---

Trong bài tập này, AI rất hữu ích trong việc tổ chức công việc thành các phân vùng, giá trị biên, test case, test run, ma trận truy vết và bản nháp báo cáo bug. Tuy nhiên, đầu ra AI trở nên không hoàn chỉnh khi nó chuyển quá nhanh từ phân tích yêu cầu đến các kết luận kiểu triển khai. Cho bài tập này, phương pháp đúng là kiểm thử black-box thông qua UI hiển thị, do đó không nên sử dụng bằng chứng mã nguồn nội bộ hoặc dựa trên API làm bằng chứng cuối cùng của bug. AI ban đầu đã trộn lẫn những mức này và đưa ra những kết luận sẽ mạnh hơn cho kiểm thử white-box hoặc API hơn là kiểm thử black-box UI.

Vấn đề chính không chỉ là tính chính xác kỹ thuật, mà còn là kỷ luật kiểm thử. AI có thể gợi ý những lĩnh vực rủi ro tốt, chẳng hạn như độ dài OTP, ngưỡng coupon, ranh giới giá và hành vi confirm-password, nhưng những ý tưởng đó phải được chuyển đổi thành các hành động người dùng, kết quả UI dự kiến và bằng chứng ảnh chụp màn hình. Nguyên tắc tôi học được là sử dụng AI như một trợ tính bao phủ, không phải như một nhà tiên tri. Mỗi ý tưởng test được AI tạo ra phải được kiểm tra so với yêu cầu, sau đó được xác minh thủ công qua UI trước khi nó trở thành báo cáo bug cuối cùng.
