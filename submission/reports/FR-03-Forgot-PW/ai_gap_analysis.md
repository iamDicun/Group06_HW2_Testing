# FR-03 Quên Mật Khẩu - AI Gap Analysis

**Chức năng:** Forgot Password & Reset  
**Trạng thái:** Đã review và chỉnh sửa theo black-box UI

---

## Các Gap Trong Output AI

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Nguyên nhân | Cách Cường sửa |
|--------|--------------|-------------------|-------------|----------------|
| FR03-GAP-01 | Ban đầu dễ suy luận từ API/source | Bài yêu cầu black-box UI | AI có xu hướng dựa vào logic nội bộ | Chuyển mọi kết luận bug sang UI + screenshot |
| FR03-GAP-02 | Thiếu kiểm tra confirm password | Confirm password là yêu cầu UI quan trọng | AI tập trung vào submit behavior | Thêm TC-FORGOT_PW-011 |
| FR03-GAP-03 | Thiếu navigation back-to-login | Ảnh hưởng khả năng phục hồi luồng | AI hay bỏ sót navigation state | Thêm TC-FORGOT_PW-012 |
| FR03-GAP-04 | Chưa mở rộng password valid variants | Password regex cần nhiều partition | AI chỉ chọn một giá trị đại diện | Thêm TC-FORGOT_PW-013..016 |

## Bài Học

AI hữu ích để dựng bộ partition ban đầu, nhưng các kết luận cuối phải được xác minh bằng thao tác UI và screenshot. Những lỗi UI như thiếu field hoặc thiếu navigation dễ bị bỏ sót nếu chỉ nhìn vào luồng happy path.
