# Usability Evaluation Report
## 1. Kịch bản kiểm thử (Task Scenario)
Nhiệm vụ: Hãy thêm sản phẩm vào giỏ hàng, áp dụng mã giảm giá và tiến hành thanh toán.

## 2. Thông tin người tham gia (Participants)
| Tên | Zalo | Recording session | Lý do chọn |
|-----|------|-------------------|----------|
| Duy Phú | 0773462786 | [Duy Phú's session](https://drive.google.com/file/d/1qNnQWY3yqyg2GGnGl6qRMTVlKmXGD4Lv/view?usp=sharing) | Đại diện cho người học IT ngoài lớp Testing |
| Nguyễn Thị Lan Đài | 0793303700 | [Mẹ Đài's session](https://drive.google.com/file/d/1pnqiD5gNnTp8e4GaHcPHgv9afAW-SiE5/view?usp=sharing) | Mẹ đại diện cho các cô chú trung niên |
| Huỳnh Vương Thụy Quân | 0765853266 | [Bạn Quân's session](https://drive.google.com/file/d/1rX4KGFqXK-W4sy2FUQgAT6MOEaOoTuDk/view?usp=sharing) | Bạn đại diện cho người học IT có học lớp Testing |
| Nguyễn Anh Khoa | 0855811187| [Bạn Khoa's session](https://drive.google.com/file/d/1x1Bs2l9NKaX_T1yzT9QkQlPdY21dRjkg/view?usp=sharing) | Bạn đại diện cho người học IT có học lớp Testing | 
| Trần Quang Duy | 0793303700 | [Em Duy's session](https://drive.google.com/file/d/1ZvaVJSSTS3M_vP-OoGjo4d72X2UsMAzQ/view?usp=sharing) | Em trai đại diện cho người dùng tuổi teen |

## 3. Đánh giá định lượng (Quantitative Results - SUS/UEQ-S)
### Dữ liệu khảo sát thô: 
[UEQ-S Responses Google Sheets](https://docs.google.com/spreadsheets/d/1GS_0XFYmfO5SlbS3qCYN1FqxJGPg-KK5U8WWSBMABIY/edit?usp=sharing)
### Điểm số trung bình:
- Điểm từ -0.8 đến 0.8: Mức trung bình (Neutral).
- Điểm > 0.8: Tích cực (Positive).
- Điểm < -0.8: Tiêu cực (Negative).

1. **Điểm Pragmatic Quality (Tính thực dụng):** +0.80
Hệ thống nằm ở mức Trung bình. Người dùng cảm thấy web khá dễ dùng, các bước thao tác khá rõ ràng.
2. **Điểm Hedonic Quality (Tính kích thích):** -0.55
Hệ thống đang nằm ở mức Trung bình hướng về Tiêu cực. Phần lớn người dùng (đặc biệt là P2 và P5) đánh giá web chưa có tính đột phá, tẻ nhạt và không có sự hấp dẫn.
3. **Điểm Overall (Tổng thể):** +0.125
Mức điểm trung lập.

### Phân tích điểm số
Điểm số thực dụng (PQ) bị kéo xuống do một số người dùng gặp lỗi (chọn sản phẩm không có phản hồi rõ ràng, xóa giỏ hàng phải thoát ra vào lại). Trong khi đó, tính kích thích (HQ) thấp do giao diện có thể hơi đơn điệu và thiết lập bảo mật chưa tạo được sự tin tưởng.

## 4. Tổng hợp quan sát & Hành vi người dùng (Observation Synthesis)
1. Nhìn chung, những người tham gia đều thực hiện được task.
2. Có sự khác biệt trải nghiệm liên quan đến độ tuổi và kinh nghiệm trong lĩnh vực IT.  
3. Những người có kinh nghiệm, làm trong IT có xu hướng hoàn thành task dễ dàng hơn.  
4. Người trẻ không học và làm về IT và người cao tuổi có xu hướng gặp nhiều khó khăn hơn trong việc hoàn thành task.  

## 5. Phân tích và Phân loại Vấn đề (Findings & Severity)
### 5.1 Genuine Bugs (Lỗi hệ thống/Logic)
|Vấn đề / Lỗi| Mức độ (Severity) | Giải pháp đề xuất | Hành động |
|------------|-------------------|-------------------|-----------|
|Mã coupon SAVE10 đang bị lỗi logic.| Critical | Cần kiểm tra lại hàm tính toán phần trăm giảm giá ở backend.| Bug report lên Github Issue |

### 5.2 Systemic Design Issues (Vấn đề Thiết kế Giao diện & Trải nghiệm)
|Vấn đề / Lỗi| Mức độ (Severity) | Giải pháp đề xuất | Hành động |
|------------|-------------------|-------------------|-----------|
|Nút: "Thêm vào giỏ" chưa có animation hay thông báo sản phẩm đã được thêm vào giỏ hàng.| Major | Bổ sung Toast notification (thông báo góc màn hình) ngay sau khi click thành công. | Bug report lên Github Issue |
|Những sản phẩm giống nhau trong giỏ hàng, không làm tăng số lượng của sản phẩm đó mà tăng số dòng với cùng 1 sản phẩm.| Minor | Gom nhóm (group) các sản phẩm có cùng ID và cộng dồn số lượng. | Bug report lên Github Issue |

## 6. Github Issue Tracking
- [Bug] Lỗi logic mã giảm giá SAVE10: [Screenshot Github issue do repo Private](https://drive.google.com/file/d/1wfXtu_mMWqKR7oy1T78smeNcccbbfgAw/view?usp=sharing)
- [UI/UX] Thiếu phản hồi người dùng khi bấm nút "Thêm vào giỏ": [Screenshot Github issue do repo Private](https://drive.google.com/file/d/1nG8A1MyiD5qzfetn8FQFCkbXPizEhovL/view?usp=sharing)
- [UI/UX] Không cộng dồn số lượng sản phẩm giống nhau trong giỏ hàng: [Screenshot Github issue do repo Private](https://drive.google.com/file/d/1eLIynoPjSp0nQDg-gVufV2ODJ8icLPGk/view?usp=sharing)