# Báo cáo usability testing — U-06

## Phạm vi và phương pháp

- Website: https://lumierecinema-testing-demo-ui.vercel.app/
- Flow: U-06
- FR: FR-09, FR-10, FR-11, FR-12, FR-13, FR-35, FR-37
- Ngày test: 2026-07-20
- Mẫu: 1 người tham gia duy nhất là người dùng khác (P01)
- Phương pháp: moderated think-aloud
- Deviation/giới hạn: Rút gọn từ 3 người tham gia xuống còn 1 người tham gia (P01) do giới hạn về mặt thời gian và nguồn lực.

## Kết quả tổng quan

| Participant | Outcome | Thời gian | Error | Wrong turn | Hesitation | Intervention | Ratings (dễ/tự tin/rõ) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| P01 | `SUCCESS_ASSISTED` | 280 | 3 | 1 | 4 | 1 | Dễ: 2/5 \| Tự tin: 3/5 \| Rõ ràng: 2/5 |

- Tỷ lệ hoàn thành không trợ giúp: 0%
- Tỷ lệ hoàn thành có trợ giúp: 100%
- Median thời gian của lượt thành công: 280 giây
- Tổng hợp 3 rating: Dễ: 2/5, Tự tin: 3/5, Rõ ràng: 2/5 (Trung bình: 2.33/5)

## Findings

### F-01 — Vé mới mua (vé sắp tới) bị gộp chung với vé cũ đã sử dụng trong danh sách "Lịch sử đặt vé" gây rối mắt

- Flow: U-06
- FR liên quan: FR-11, FR-35
- Frequency: 1/1
- Bằng chứng: P01 mất tới 30 giây cuộn trang lên xuống và đối chiếu ngày chiếu để phân biệt vé mới mua và các vé đã cũ. P01 nói: *"Sao vé tôi vừa mua lại nằm chung với đống vé cũ đã xem từ tháng trước thế này? Nhìn rối quá."*
- Tác động đến task: Làm tăng thời gian tìm kiếm thông tin vé mới để check-in tại rạp, gây trải nghiệm bực bội cho người dùng.
- Severity: S3
- Lý do severity: Không ngăn cản người dùng hoàn thành task nhưng làm giảm đáng kể hiệu năng tương tác và gây bối rối.
- Nguyên nhân khả dĩ (diễn giải): Hệ thống chưa phân tách logic giữa vé phim sắp chiếu (chưa sử dụng) và vé phim đã chiếu (lịch sử vé). Tất cả đều đổ chung vào một bảng danh sách sắp xếp theo thời gian đặt.
- Đề xuất: Tách tab "Lịch sử đặt vé" thành 2 tab con hoặc thêm bộ lọc: "Vé sắp tới" (Upcoming Tickets) và "Vé đã dùng/Lịch sử" (Past Tickets) giúp người dùng định vị vé mới mua ngay lập tức.
- Tiêu chí xác minh: Người dùng tìm thấy vé mới mua trong vòng dưới 5 giây mà không cần cuộn tìm kiếm hay so sánh ngày giờ.

---

### F-02 — Không thể xóa phim khỏi danh sách yêu thích (Wishlist) trực tiếp từ trang danh sách

- Flow: U-06
- FR liên quan: FR-10, FR-35
- Frequency: 1/1
- Bằng chứng: P01 di chuột liên tục trên thẻ phim trong tab "Phim yêu thích" để tìm nút xóa (dấu X hoặc icon trái tim) nhưng không thấy, thử click đúp cũng vô ích. Chỉ đến khi Moderator gợi ý click vào phim để chuyển sang trang Chi tiết phim thì P01 mới bỏ thích được bằng cách click vào trái tim đỏ ở trang chi tiết. P01 nói: *"Ủa lạ vậy, tôi muốn bỏ thích phim này thì bấm vào đâu? [...] À, phải click vào xem chi tiết phim rồi mới bỏ thích được à? Hơi phiền nhỉ..."*
- Tác động đến task: Gây gián đoạn dòng thao tác (flow disruption), bắt buộc người dùng thực hiện nhiều click và chuyển đổi trang không cần thiết chỉ để thực hiện một tác vụ đơn giản.
- Severity: S2
- Lý do severity: Người dùng bị kẹt hoàn toàn trong hơn 50 giây và bắt buộc phải có sự gợi ý từ Moderator (Intervention) mới có thể tìm ra cách hoàn thành nhiệm vụ bỏ thích phim.
- Nguyên nhân khả dĩ (diễn giải): Giao diện thẻ phim (movie card) hiển thị trong tab Wishlist chỉ được thiết kế với nút đặt vé nhanh, thiếu đi nút/icon xóa nhanh hoặc cập nhật trạng thái thích trực tiếp trên thẻ.
- Đề xuất: Thêm một icon trái tim nhỏ màu đỏ ở góc trên bên phải của mỗi thẻ phim trong danh sách Wishlist để người dùng click hủy thích trực tiếp mà không cần chuyển trang.
- Tiêu chí xác minh: Người dùng có thể xóa thành công phim khỏi danh sách yêu thích chỉ với 1 click duy nhất ngay tại trang danh sách phim yêu thích.

---

### F-03 — Lunar Points thiếu thông tin hướng dẫn sử dụng và quy đổi điểm

- Flow: U-06
- FR liên quan: FR-13, FR-35
- Frequency: 1/1
- Bằng chứng: P01 click vào tab "Điểm tích lũy" thấy số điểm là "150 Lunar Points" nhưng loay hoay cuộn chuột tìm kiếm thông tin quy đổi điểm mà không thấy gì. P01 nói: *"Tôi thấy mình có 150 điểm rồi, nhưng điểm này dùng để làm gì? Đổi được vé hay bắp nước gì không và đổi ở đâu? Không thấy một dòng hướng dẫn nào cả."*
- Tác động đến task: Làm giảm giá trị của tính năng tích lũy điểm vì người dùng không hiểu lợi ích của điểm tích lũy và cách tiêu điểm, gây cảm giác tính năng bị bỏ dở.
- Severity: S3
- Lý do severity: Người dùng xem được điểm nhưng bị hoang mang và tốn thời gian tìm kiếm thông tin hướng dẫn mà hệ thống không cung cấp.
- Nguyên nhân khả dĩ (diễn giải): Thiết kế trang Điểm tích lũy chỉ mới hiển thị dữ liệu tĩnh (số điểm và lịch sử cộng điểm) mà chưa tích hợp thông tin hướng dẫn chính sách khách hàng hoặc link quy đổi điểm.
- Đề xuất: Thêm một bảng thông tin quy đổi điểm nhỏ ở bên cạnh số điểm (ví dụ: 100 điểm = 1 voucher giảm giá 50k, 200 điểm = 1 vé xem phim miễn phí) và đính kèm đường link hướng dẫn chi tiết cách đổi điểm khi đặt vé.
- Tiêu chí xác minh: Người dùng hiểu rõ giá trị điểm và cách quy đổi điểm ngay sau khi nhìn vào trang Lunar Points mà không phải tìm kiếm thêm.

---

### F-04 — Chức năng đánh giá (Rating) phim thiếu phản hồi trực quan từ hệ thống và không cho phép cập nhật lại

- Flow: U-06
- FR liên quan: FR-12, FR-35, FR-37
- Frequency: 1/1
- Bằng chứng: P01 click vào ngôi sao thứ 5 để đánh giá phim. Số sao được lưu nhưng hệ thống không hiển thị thông báo toast thành công nào. P01 click tiếp 2-3 lần vì tưởng hệ thống chưa nhận, sau đó khi nhận ra số sao bị khóa cứng thì không thể chỉnh sửa lại. P01 nói: *"Tôi click 5 sao rồi mà hệ thống không báo đã lưu thành công hay gì hết. Ôi tôi bấm nhầm 5 sao, giờ muốn sửa lại thành 4 sao mà nó khóa luôn rồi..."*
- Tác động đến task: Khiến người dùng nghi ngờ hệ thống có lỗi (do không có phản hồi), đồng thời gây ức chế khi người dùng vô tình bấm nhầm số sao và không có cách nào sửa lại đánh giá của mình.
- Severity: S2
- Lý do severity: Gây nhầm lẫn nghiêm trọng về trạng thái lưu dữ liệu và khóa tính năng của người dùng mà không có cảnh báo trước, ảnh hưởng lớn đến chất lượng dữ liệu đánh giá phim thu thập được.
- Nguyên nhân khả dĩ (diễn giải): Logic frontend của chức năng đánh giá phim bị thiếu sự kiện hiển thị thông báo Toast sau khi gọi API lưu rating thành công. Đồng thời, trạng thái chọn sao được thiết kế ở dạng chỉ được chọn một lần duy nhất (read-only sau khi click) mà không hỗ trợ cơ chế thay đổi lựa chọn (toggle/update).
- Đề xuất:
  1. Thêm thông báo Toast: *"Đánh giá của bạn đã được lưu thành công!"* ngay khi người dùng chọn sao.
  2. Cho phép người dùng click chọn lại số sao khác để cập nhật đánh giá (hoặc thêm nút "Chỉnh sửa đánh giá" bên cạnh số sao đã chọn để mở khóa).
- Tiêu chí xác minh: Đánh giá phim hiển thị toast xác nhận và cho phép người dùng thay đổi số sao đã đánh giá thành công.

## Kết luận và giới hạn

Báo cáo này được thực hiện dựa trên phiên kiểm thử thực tế của một người dùng ngoài (P01) trên trang web Lumiere Cinema đã deploy. Kết quả cho thấy mặc dù giao diện hệ thống trực quan, dễ nhìn, nhưng các tính năng trong trang cá nhân (Dashboard) vẫn còn nhiều lỗi usability làm giảm trải nghiệm người dùng, đặc biệt là tính năng xóa khỏi wishlist và đánh giá phim. Các đề xuất cải thiện trong báo cáo này tập trung vào việc gia tăng phản hồi hệ thống (feedback) và giảm thiểu số lần click (interaction cost) của khách hàng.
