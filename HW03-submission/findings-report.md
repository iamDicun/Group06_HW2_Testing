# Báo cáo usability testing — U-01

## Phạm vi và phương pháp

- Website: https://eshop-sut-clone-ktpm-1.onrender.com/
- Flow: U-01
- FR: FR-05, FR-06
- Ngày test: 02/08/2026
- Mẫu: 7 người tham gia thật (P01–P07)
- Phương pháp: moderated think-aloud
- Deviation/giới hạn: P03 có sự không nhất quán giữa Outcome tổng thể (`SUCCESS_UNASSISTED`) và outcome từng bước (`SUCCESS_ASSISTED`)

## Kết quả tổng quan

| Participant | Outcome | Thời gian | Error | Wrong turn | Hesitation | Intervention | Ratings (dễ/tự tin/rõ) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| P01 | SUCCESS_UNASSISTED | 25 | 0 | 0 | 0 | 0 | 5/4/4 |
| P02 | SUCCESS_UNASSISTED | 24 | 0 | 0 | 1 | 0 | 5/5/3 |
| P03 | SUCCESS_UNASSISTED | 35 | 0 | 0 | 0 | 0 | 5/5/5 |
| P04 | SUCCESS_UNASSISTED | 29 | 0 | 0 | 0 | 0 | 5/5/5 |
| P05 | SUCCESS_UNASSISTED | 45 | 0 | 0 | 0 | 0 | 5/5/5 |
| P06 | SUCCESS_UNASSISTED | 60 | 0 | 0 | 0 | 0 | 5/5/3 |
| P07 | SUCCESS_UNASSISTED | 29 | 0 | 0 | 0 | 0 | 4/4/5 |

- Tỷ lệ hoàn thành không trợ giúp: 100% (7/7)
- Tỷ lệ hoàn thành có trợ giúp: 100% (7/7)
- Median thời gian của lượt thành công: 29 giây
- Tổng hợp 7 rating: Dễ 4.9, Tự tin 4.7, Rõ 4.3

## Findings

### F-01 — Phải bấm 2 lần mới thêm vào giỏ hàng thành công

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 6/7 (P02, P03, P04, P05, P06, P07)
- Bằng chứng: P02 nói "Phải bấm 2 lần mới phản hồi, cảm giác bị delay"; P03 nói "Phải bấm 2 lần mới phản hồi, cảm giác bị đơ web"; P07 ghi nhận tác động tương tự trong timeline
- Tác động đến task: Người dùng bấm lần đầu không thấy phản hồi nên phải bấm lại lần 2, lãng phí thời gian và gây hoài nghi hệ thống
- Severity: 3 — Bỏ lỡ trung bình
- Lý do severity: Task vẫn hoàn thành được sau lần bấm thứ 2, nhưng gây khó chịu và mất niềm tin
- Nguyên nhân khả dĩ (diễn giải): API thêm giỏ hàng có độ trễ cao hoặc frontend không xử lý trạng thái loading nên người dùng bấm trùng lặp
- Đề xuất: Thêm loading indicator khi bấm "Thêm vào giỏ"; disable nút sau lần bấm đầu để tránh bấm trùng; thêm toast notification xác nhận
- Tiêu chí xác minh: Bấm 1 lần, thấy loading, thấy xác nhận "Đã thêm vào giỏ hàng" trong vòng 2 giây

### F-02 — Không có indicator/feedback trên icon giỏ hàng khi thêm sản phẩm

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 3/7 (P01, P02, P06)
- Bằng chứng: P01 nói "phía giỏ hàng lại không có indicator nào là đã bỏ vào được hay có thông báo đã bỏ"; P02 nói "phần giỏ hàng không hiển thị rõ khi thêm hàng"; P06 nói "trang web không có trạng thái động nào để người dùng nhận biết đã thêm vào giỏ hàng"
- Tác động đến task: Người dùng không chắc chắn sản phẩm đã vào giỏ hàng hay chưa, phải tự kiểm tra lại
- Severity: 2 — Bỏ lỡ nhẹ
- Lý do severity: Task vẫn hoàn thành, nhưng gây thiếu tin cậy
- Nguyên nhân khả dĩ (diễn giải): Chưa có cơ chế cập nhật badge số lượng giỏ hàng real-time sau khi thêm
- Đề xuất: Hiển thị badge số lượng trên icon giỏ hàng, cập nhật ngay sau khi thêm thành công
- Tiêu chí xác minh: Sau khi thêm sản phẩm, badge giỏ hàng hiển thị số lượng tăng lên 1

### F-03 — Không thêm vào giỏ hàng được từ trang chi tiết sản phẩm

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 1/7 (P06)
- Bằng chứng: P06 nói "chỉ thêm được vào giỏ hàng khi ở trang danh sách sản phẩm, khi xem chi tiết sản phẩm thì không thêm vào được giỏ hàng"
- Tác động đến task: Người dùng phải quay lại trang danh sách mới thêm được, gây bất tiện
- Severity: 2 — Bỏ lỡ nhẹ
- Lý do severity: Task vẫn hoàn thành được nhưng phải thêm bước thừa
- Nguyên nhân khả dĩ (diễn giải): Trang chi tiết sản phẩm chưa có nút "Thêm vào giỏ hàng" hoặc nút bị ẩn
- Đề xuất: Thêm nút "Thêm vào giỏ hàng" trên trang chi tiết sản phẩm
- Tiêu chí xác minh: Từ trang chi tiết sản phẩm, có thể thêm sản phẩm vào giỏ mà không cần quay lại danh sách

### F-04 — Thời gian phản hồi khi thêm giỏ hàng chậm

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 2/7 (P01, P06)
- Bằng chứng: P01 nói "từ lúc bấm thêm vào giỏ hàng đến lúc đã thêm hơi lâu"; P06 mất 60 giây (lâu nhất trong nhóm)
- Tác động đến task: Người dùng phải chờ đợi, có thể chuyển trang khác trong lúc chờ mà không biết đã thêm thành công
- Severity: 2 — Bỏ lỡ nhẹ
- Lý do severity: Task vẫn hoàn thành nhưng trải nghiệm không mượt mà
- Nguyên nhân khả dĩ (diễn giải): API call chậm, frontend chưa có optimistic update
- Đề xuất: Thêm optimistic update (tăng số giỏ hàng ngay khi bấm) và loading spinner khi chờ API
- Tiêu chí xác minh: Phản hồi trong vòng 1 giây sau khi bấm

## Kết luận và giới hạn

**Kết luận:**

- Tỷ lệ hoàn thành task rất cao: 100% hoàn thành không trợ giúp (7/7)
- Thời gian trung bình 35.3 giây, nhanh nhất 24 giây (P02), chậm nhất 60 giây (P06), đều dưới ngưỡng timebox (10 phút)
- Finding nổi bật nhất: Phải bấm 2 lần mới thêm vào giỏ hàng (F-01), 6/7 người gặp phải
- Điểm mạnh: Tìm kiếm sản phẩm (FR-05) hoạt động tốt, tất cả đều tìm thấy "iPhone" ở lần đầu
- Điểm yếu chính: Thêm vào giỏ hàng (FR-06) thiếu phản hồi trực quan và có độ trễ
- Người dùng trẻ tuổi hoàn thành nhanh hơn (P01, P02 ~25 giây), người lớn tuổi chậm hơn (P05, P06 45–60 giây)

**Giới hạn:**

- P03 có sự không nhất quán giữa Outcome tổng thể (`SUCCESS_UNASSISTED`) và outcome từng bước (`SUCCESS_ASSISTED`), cần xác minh lại
- Chưa test trên trình duyệt di động
- Chỉ test flow cơ bản, chưa test các trường hợp ngoại lệ (sản phẩm hết hàng, số lượng lớn hơn 1)
