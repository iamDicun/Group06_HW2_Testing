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
| P05 | SUCCESS_UNASSISTED | 30 | 0 | 0 | 0 | 0 | 5/5/5 |
| P06 | SUCCESS_UNASSISTED | 60 | 0 | 0 | 0 | 0 | 5/5/3 |
| P07 | SUCCESS_UNASSISTED | 29 | 0 | 0 | 0 | 0 | 4/4/5 |

- Tỷ lệ hoàn thành không trợ giúp: 100% (7/7)
- Tỷ lệ hoàn thành có trợ giúp: 100% (7/7)
- Median thời gian của lượt thành công: 29 giây
- Tổng hợp 7 rating: Dễ 4.9, Tự tin 4.7, Rõ 4.3

## Findings

### F-01 — Phải bấm 2 lần hoặc nhiều lần mới thêm được sản phẩm vào giỏ hàng

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 3/7 (P02, P05, P07)
- Bằng chứng: P02 nói "mất khoảng 2 lần bấm thì mới có trong giỏ hàng"; P05 ghi nhận "Phải bấm 2 lần mới phản hồi, cảm giác bị đơ web"; P07 nói "không biết do mạng lag hay bật nhiều tab mà bấm mấy lần thêm vào giỏ hàng mới thêm được"
- Tác động đến task: Người dùng bấm lần đầu không thấy phản hồi nên phải bấm lại nhiều lần, lãng phí thời gian và gây hoài nghi hệ thống (P01 cũng nhận xét phản hồi "hơi lâu")
- Severity: 3 — Bỏ lỡ trung bình
- Lý do severity: Task vẫn hoàn thành được sau nhiều lần bấm, nhưng gây khó chịu và mất niềm tin
- Nguyên nhân khả dĩ (diễn giải): API thêm giỏ hàng có độ trễ cao hoặc frontend không xử lý trạng thái loading nên người dùng bấm trùng lặp
- Đề xuất: Thêm loading indicator khi bấm "Thêm vào giỏ"; disable nút sau lần bấm đầu để tránh bấm trùng; thêm toast notification xác nhận
- Tiêu chí xác minh: Bấm 1 lần, thấy loading, thấy xác nhận "Đã thêm vào giỏ hàng" trong vòng 2 giây

### F-02 — Không có indicator/feedback trên icon giỏ hàng khi thêm sản phẩm

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 3/7 (P01, P02, P06)
- Bằng chứng: P01 nói "phía giỏ hàng lại không có indicator nào là đã bỏ vào được hay có thông báo đã bỏ"; P02 ghi nhận "Bấm nhưng không biết thêm thành công chưa" và "phần giỏ hàng không hiển thị rõ khi thêm hàng"; P06 nói "trang web không có trạng thái động nào để người dùng nhận biết đã thêm vào giỏ hàng"
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
- Bằng chứng: P06 ghi nhận "Không thêm được khi vào 'Xem chi tiết', chỉ thêm được bên ngoài trang danh sách"
- Tác động đến task: Người dùng phải quay lại trang danh sách mới thêm được, gây bất tiện
- Severity: 2 — Bỏ lỡ nhẹ
- Lý do severity: Task vẫn hoàn thành được nhưng phải thêm bước thừa
- Nguyên nhân khả dĩ (diễn giải): Trang chi tiết sản phẩm chưa có nút "Thêm vào giỏ hàng" hoặc nút bị ẩn
- Đề xuất: Thêm nút "Thêm vào giỏ hàng" trên trang chi tiết sản phẩm
- Tiêu chí xác minh: Từ trang chi tiết sản phẩm, có thể thêm sản phẩm vào giỏ mà không cần quay lại danh sách

### F-04 — Hình ảnh sản phẩm trên trang chi tiết không hiển thị đầy đủ

- Flow: U-01
- FR liên quan: FR-06
- Frequency: 1/7 (P06)
- Bằng chứng: P06 ghi nhận "Không thấy hình ảnh" khi xem chi tiết sản phẩm và nhận xét "hình ảnh trang web chưa đầy đủ"
- Tác động đến task: Người dùng khó đánh giá sản phẩm khi thiếu hình ảnh, ảnh hưởng quyết định chọn sản phẩm
- Severity: 2 — Bỏ lỡ nhẹ
- Lý do severity: Task vẫn hoàn thành nhưng trải nghiệm xem chi tiết không đầy đủ
- Nguyên nhân khả dĩ (diễn giải): Ảnh sản phẩm chưa tải do nguồn ảnh lỗi/thiếu hoặc thiếu fallback khi ảnh hỏng
- Đề xuất: Kiểm tra nguồn ảnh sản phẩm, thêm ảnh placeholder/fallback khi ảnh không tải được
- Tiêu chí xác minh: Mọi sản phẩm ở trang chi tiết đều hiển thị hình ảnh hoặc placeholder thay thế

## Kết luận và giới hạn

**Kết luận:**

- Tỷ lệ hoàn thành task rất cao: 100% hoàn thành không trợ giúp (7/7)
- Thời gian trung bình 33.1 giây, nhanh nhất 24 giây (P02), chậm nhất 60 giây (P06), đều dưới ngưỡng timebox (10 phút)
- Finding nổi bật nhất: Phải bấm 2 lần hoặc nhiều lần mới thêm vào giỏ hàng (F-01) — 3/7 người gặp phải, cùng với việc thiếu feedback khi thêm giỏ (F-02) — 3/7 người
- Điểm mạnh: Tìm kiếm sản phẩm (FR-05) hoạt động tốt, tất cả đều tìm thấy "iPhone" ở lần đầu
- Điểm yếu chính: Thêm vào giỏ hàng (FR-06) thiếu phản hồi trực quan, có độ trễ; người dùng phải bấm lại nhiều lần
- Rating trung bình cao (Dễ 4.9, Tự tin 4.7), người dùng nhìn chung hài lòng với độ dễ dùng dù gặp vấn đề feedback

**Giới hạn:**

- P03 có sự không nhất quán giữa Outcome tổng thể (`SUCCESS_UNASSISTED`) và outcome từng bước (`SUCCESS_ASSISTED`), cần xác minh lại
- Môi trường test khác nhau giữa các phiên (Chrome, Firefox, Edge, Cốc Cốc, MacBook/Windows) nên có thể chịu ảnh hưởng của mạng/thiết bị (P07 nhận định do "mạng lag" hoặc "bật nhiều tab")
- Chưa test trên trình duyệt di động
- Chỉ test flow cơ bản, chưa test các trường hợp ngoại lệ (sản phẩm hết hàng, số lượng lớn hơn 1)
