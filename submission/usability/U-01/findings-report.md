# Báo cáo usability testing — U-01

## Phạm vi và phương pháp

- Website: https://lumierecinema-testing-demo-ui.vercel.app/
- Flow: U-01
- FR: FR-14, FR-15, FR-18, FR-19, FR-20, FR-35, FR-37
- Ngày test: 2026-07-20
- Mẫu: 1 participant, P01 - MSSV 23127391
- Phương pháp: moderated think-aloud
- Deviation/giới hạn: Phiên test này ghi nhận kết quả từ P01 nên dùng để tham khảo cho flow U-01.

## Kết quả tổng quan

| Participant | Outcome | Thời gian | Error | Wrong turn | Hesitation | Intervention | Ratings (dễ/tự tin/rõ) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| P01 | SUCCESS_UNASSISTED | ~180s | 2 | 3 | 5 | 0 | 3/4/3 |

- Tỷ lệ hoàn thành không trợ giúp: 1/1
- Tỷ lệ hoàn thành có trợ giúp: 0/1
- Median thời gian của lượt thành công: ~180 giây
- Tổng hợp rating: dễ hoàn thành 3/5, tự tin đã chọn đúng 4/5, thông tin/phản hồi rõ ràng 3/5

## Findings

### F-01 — Empty state của showtime chưa giúp user biết làm gì tiếp

- Flow: U-01
- FR liên quan: FR-18, FR-19
- Frequency: 1/1
- Bằng chứng: Khi chọn `Zootopia 2` tại `Saigon Opera House`, page chỉ hiển thị `Select a time` nhưng không có time slot. Participant nói: "Không biết là hết suất hay trang chưa load."
- Tác động đến task: User phải tự thử phim hoặc rạp khác để đi tiếp, dễ nghĩ rằng page bị lỗi hoặc chưa load xong.
- Severity: S3
- Lý do severity: Task vẫn hoàn thành được nếu user thử lại, nhưng bị chậm và dễ mất phương hướng.
- Nguyên nhân khả dĩ: Empty state chỉ mô tả trạng thái, chưa hỗ trợ recovery action.
- Đề xuất: Khi không có showtime, hiển thị CTA như `Choose another cinema`, `See cinemas with available showtimes`, hoặc gợi ý phim/rạp có suất gần nhất.
- Tiêu chí xác minh: Với movie/cinema không có suất, user thấy message rõ nguyên nhân và có ít nhất một action để quay lại chọn cinema/movie/date.

### F-02 — `CHOOSE CINEMA` và step label trông giống heading hơn là action

- Flow: U-01
- FR liên quan: FR-18, FR-35
- Frequency: 1/1
- Bằng chứng: Sau khi vào buy ticket, page hiển thị `CHOOSE CINEMA` và `Please select a cinema`. Participant phải bấm thử mới biết đây là control mở danh sách rạp. Quote: "Chỗ này nhìn như tiêu đề, bấm thử mới biết chọn rạp."
- Tác động đến task: User bị khựng ở bước đầu của booking flow.
- Severity: S3
- Lý do severity: Không chặn hoàn thành task, nhưng làm user phải đoán tương tác.
- Nguyên nhân khả dĩ: Step header và button/action chưa phân biệt rõ.
- Đề xuất: Đổi label thành button rõ hơn như `Choose a cinema`, thêm icon/dropdown affordance và hover/focus state nổi bật; đặt CTA gần message `Please select a cinema`.
- Tiêu chí xác minh: User mới nhận ra ngay nơi cần click để chọn rạp mà không phải thử nhiều vùng trên page.

### F-03 — Bước sau khi chọn showtime chưa rõ ràng

- Flow: U-01
- FR liên quan: FR-19, FR-20, FR-35
- Frequency: 1/1
- Bằng chứng: Sau khi click `16:00`, summary đổi thành `Wednesday, July 22, 2026, 16:00`, nhưng participant vẫn phải click `SEATINGS` để đi tiếp. Quote: "Chọn giờ xong rồi, không biết bấm tiếp ở đâu."
- Tác động đến task: User có thể tưởng đã chọn xong suất chiếu nhưng không biết cần bấm gì tiếp.
- Severity: S3
- Lý do severity: Flow vẫn hoàn thành được, nhưng bước chuyển stage gây do dự.
- Nguyên nhân khả dĩ: Stepper dùng cùng label cho trạng thái và navigation action.
- Đề xuất: Sau khi chọn showtime, hiển thị CTA rõ hơn như `Continue to seat selection`; active step nên có trạng thái rõ `Selected` hoặc `Next`.
- Tiêu chí xác minh: Sau khi chọn time, user nhìn thấy action tiếp theo rõ ràng và không cần đoán bấm vào step label.

### F-04 — Seat map thiếu label trực quan và accessibility label rõ ràng

- Flow: U-01
- FR liên quan: FR-20, FR-37
- Frequency: 1/1
- Bằng chứng: Seat map chỉ hiển thị row label `A`, `B`, `C`, `D`; số ghế không hiện trực tiếp trên ô ghế. Participant phải nhìn summary để biết đã chọn `A1, A2`. Quote: "Không thấy số ghế trên ô, phải nhìn phần summary để chắc."
- Tác động đến task: User vẫn chọn được ghế bằng vị trí, nhưng chưa thật sự tự tin là đang chọn đúng `A1`, `A2`.
- Severity: S2
- Lý do severity: Có thể ảnh hưởng nghiêm trọng đến accessibility và confidence khi chọn ghế.
- Nguyên nhân khả dĩ: Seat chưa hiển thị mã ghế trực tiếp trên UI và chưa thể hiện rõ trạng thái focus/selection cho từng ghế.
- Đề xuất: Hiển thị seat number trên từng ô hoặc tooltip khi hover/focus; thêm label rõ cho từng ghế.
- Tiêu chí xác minh: User nhìn thấy seat ID trước khi chọn và summary cập nhật đúng sau khi chọn.

### F-05 — Chuyển qua Snack trước khi xem thông tin vé gây bất ngờ

- Flow: U-01
- FR liên quan: FR-20, FR-35, FR-37
- Frequency: 1/1
- Bằng chứng: Sau khi chọn đủ 2 tickets và seats `A1, A2`, click next ở khu vực `SEATINGS` đưa participant sang snack selection. Participant phải click `INFO` thêm lần nữa mới thấy `TICKET DETAILS`. Quote: "Mình tưởng tới thông tin vé luôn, ai ngờ qua phần snack."
- Tác động đến task: User đang muốn xem thông tin vé nhưng bị đưa sang phần snack trước.
- Severity: S4
- Lý do severity: Không chặn task, nhưng gây lệch kỳ vọng và thêm một bước không cần thiết cho flow U-01.
- Nguyên nhân khả dĩ: Booking funnel gộp snack upsell vào cùng flow mà không cho skip rõ ràng.
- Đề xuất: Thêm CTA `Skip snacks and view ticket info` hoặc đổi label `INFO` thành `Continue without snacks` khi quantity snack là 0.
- Tiêu chí xác minh: User có thể bỏ qua snack rõ ràng và đến `TICKET DETAILS` không cần đoán.

## Kết luận và giới hạn

Flow U-01 hoàn thành được và màn hình `TICKET DETAILS` hiển thị đủ thông tin chính: movie, address, date, tickets, seats, time, screen và total. Tuy nhiên participant bị khựng ở vài điểm: chọn phim/rạp có suất, nhận biết `CHOOSE CINEMA` là nút, hiểu bước sau khi chọn showtime, đọc số ghế trên seat map và bỏ qua Snack để xem thông tin vé.
