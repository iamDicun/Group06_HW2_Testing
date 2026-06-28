# Mobile FR-03 Quên Mật Khẩu - AI Gap Analysis

**Chức năng:** Mobile Forgot Password & Reset  
**Trạng thái:** Đã review và chỉnh sửa theo Mobile UI

---

## Các Gap Trong Output AI

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Nguyên nhân | Cách Cường sửa |
|--------|--------------|-------------------|-------------|----------------|
| MFR03-GAP-01 | Mobile-specific feedback | Tester cần OTP/hướng dẫn dùng được | AI reuse giả định từ web | Thêm case request email đã đăng ký; manual run phát hiện thiếu OTP demo |
| MFR03-GAP-02 | OTP length boundary | Mâu thuẫn FR-03 nếu OTP không đúng 6 chữ số | AI có thể bỏ qua 5/6/7 | Thêm các case OTP BVA |
| MFR03-GAP-03 | Confirm password và workflow UI | Vi phạm FR-03/FR-22 nếu thiếu | AI dễ chỉ tập trung submit behavior | Thêm confirm/workflow cases; manual run phát hiện thiếu confirm password |
| MFR03-GAP-04 | Back-to-login action | Yêu cầu navigation của user | AI dễ bỏ sót navigation state | Thêm back-to-login case; manual run phát hiện không có action rõ ràng |

## Bài Học

Mobile testing không thể copy trực tiếp từ web testing. Label, navigation và feedback state của mobile cần được chạy black-box riêng và có screenshot. Manual run xác nhận các vấn đề UX riêng của mobile có thể làm blocked các kiểm tra boundary OTP/password hợp lệ.
