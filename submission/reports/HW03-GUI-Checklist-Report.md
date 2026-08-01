# Báo Cáo Kiểm Thử Giao Diện & Khả Năng Sử Dụng (GUI & Usability Report) — HW03

## 1. Thông tin chung

- **Bài tập**: HW03 – GUI & Usability
- **Hệ thống kiểm thử (SUT)**: EShop E-Commerce System
- **Phương pháp kiểm thử**: Black-box Testing (Kiểm thử hộp đen dựa trên trải nghiệm & giao diện người dùng)
- **Danh sách màn hình được lựa chọn kiểm thử**:
  1. **FR-05**: Product Listing and Search (Pool A)
  2. **FR-07**: Shopping Cart (Pool B)
  3. **FR-11**: Order History View - User (Pool B)
- **Các khía cạnh giao diện (Interface Aspects)**:
  - `IA-01`: General UI Standards
  - `IA-02`: Forms
  - `IA-03`: Navigation
  - `IA-04`: Feedback / State

---

## 2. Tổng quan kết quả kiểm thử (Test Summary)

| Màn hình / Feature | Số mục thiết kế | Passed (Đạt) | Failed (Lỗi GUI) | N/A |
|---|---|---|---|---|
| FR-05: Product Listing and Search | 15 | 11 | 4 | 0 |
| FR-07: Shopping Cart | 15 | 9 | 5 | 1 |
| FR-11: Order History View | 15 | 14 | 1 | 0 |
| **Tổng cộng (Total)** | **45** | **34** | **10** | **1** |

---

## 3. Task 1: Bảng Checklist Chi Tiết & Kết Quả Thực Thi (Execution Results)

### 3.1 FR-05: Product Listing and Search (Trang Danh Sách & Tìm Kiếm Sản Phẩm)

| Mã Check | Nhóm | Nội dung kiểm tra | IA Aspect | Trạng thái | Ghi chú / Nguyên nhân thất bại | Minh chứng |
|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Tiêu đề chính của trang hiển thị duy nhất 1 tiêu đề chính ở đầu trang | IA-01 | Passed | Không có tiêu đề nào bị trùng lặp. | |
| GUI-LAY-02 | LAY | Lưới sản phẩm căn chỉnh khoảng cách đều đặn | IA-01 | Passed | Khoảng cách giữa các ô sản phẩm hiển thị cân đối. | |
| GUI-LAY-03 | LAY | Ảnh sản phẩm cố định chiều cao không vỡ khung | IA-01 | Passed | Khung ảnh vừa vặn, không bị co giãn méo hình. | |
| GUI-CON-01 | CON | Ngôn ngữ nhất quán tiếng Việt | IA-01 | Passed | Chữ tiếng Việt hiển thị rõ ràng. | |
| GUI-CON-02 | CON | Đơn vị tiền tệ hiển thị ký hiệu `₫` | IA-01 | Failed | Giao diện hiển thị đơn vị "VND" thay vì ký hiệu `₫`. | ![alt text](images/image.png) |
| GUI-CON-03 | CON | Tên sản phẩm quá dài cắt bằng ellipsis | IA-01 | Passed | Tên sản phẩm quá dài hiển thị dấu ba chấm (...). | |
| GUI-FUN-01 | FUN | Tìm kiếm sản phẩm theo từ khóa | IA-02 | Passed | Tìm kiếm lọc danh sản phẩm đúng từ khóa. | |
| GUI-FUN-02 | FUN | Nút "Thêm vào giỏ" thêm 1 sản phẩm | IA-04 | Failed | Thao tác thêm vào giỏ hàng thành công nhưng không thông báo qua giao diện, user dễ hiểu nhầm là chưa thêm được sản phẩm. | ![alt text](images/image-3.png) |
| GUI-FUN-03 | FUN | Nút "Xem chi tiết" mở đúng sản phẩm | IA-03 | Passed | Điều hướng mở đúng trang chi tiết sản phẩm. | |
| GUI-NAV-01 | NAV | Thứ tự Tab phím hợp lý | IA-03 | Passed | Tab chuyển focus bàn phím đúng trình tự. | |
| GUI-RES-01 | RES | Lưới sản phẩm responsive từ 1 cột đến 3 cột | IA-01 | Passed | Hiển thị linh hoạt trên màn hình điện thoại và máy tính. | |
| GUI-ACC-01 | ACC | Ảnh sản phẩm có văn bản mô tả hình ảnh | IA-01 | Failed | Văn bản mô tả hình ảnh hỗ trợ trình đọc màn hình bị bỏ rỗng. Vi phạm FR-24. | |
| GUI-ACC-02 | ACC | Chữ giá màu đỏ đạt tương phản WCAG | IA-01 | Passed | Độ tương phản chữ màu đỏ trên nền trắng tốt. | |
| GUI-ERR-01 | ERR | Trạng thái empty state khi tìm không thấy | IA-04 | Failed | Màn hình hiển thị màu trắng, không thông báo không tồn tại sản phẩm. | ![alt text](images/image-1.png) |
| GUI-ERR-02 | ERR | An toàn từ khóa tìm kiếm khi chứa ký tự đặc biệt | IA-02 | Failed | Từ khóa tìm kiếm chứa ký tự đặc biệt làm hiển thị sai định dạng trên giao diện. | ![alt text](images/image-2.png) |

---

### 3.2 FR-07: Shopping Cart (Trang Giỏ Hàng)

| Mã Check | Nhóm | Nội dung kiểm tra | IA Aspect | Trạng thái | Ghi chú / Nguyên nhân thất bại | Minh chứng |
|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Bảng giỏ hàng căn chỉnh các cột ngay ngắn | IA-01 | Passed | Các cột và đường viền phân tách bảng rõ ràng. | |
| GUI-LAY-02 | LAY | Nút Thanh toán xanh lá và Nút Xóa màu đỏ phân biệt | IA-01 | Passed | Màu sắc nút bấm phân biệt thao tác rõ ràng. | |
| GUI-CON-01 | CON | Nhãn tổng tiền hiển thị "Tổng cộng" | IA-01 | Failed | Giao diện hiển thị nhãn "Tổng tạm tính:". | ![alt text](images/image-4.png) |
| GUI-CON-02 | CON | Đơn giá và thành tiền có ký hiệu `₫` | IA-01 | Passed | Định dạng số tiền có phân cách và ký hiệu `₫`. | |
| GUI-CON-03 | CON | Nút quay lại ghi "Tiếp tục mua sắm" | IA-03 | Failed | Nút hiển thị "Mua tiếp". | ![alt text](images/image-5.png) |
| GUI-FUN-01 | FUN | Có bộ nút `+` / `-` thay đổi số lượng | IA-02 | Failed | Cột số lượng chỉ hiển thị số tĩnh, thiếu bộ nút `+`/`-` theo FR-07. | ![alt text](images/image-6.png) |
| GUI-FUN-02 | FUN | Xóa sản phẩm phải có Dialog xác nhận | IA-04 | Failed | Bấm "Xóa" loại bỏ sản phẩm trực tiếp, không mở hộp thoại xác nhận. | ![alt text](images/image-7.png) |
| GUI-FUN-03 | FUN | Tổng tiền tự động tính lại khi thay đổi | IA-04 | Passed | Số tiền tự động cập nhật lại chính xác. | |
| GUI-NAV-01 | NAV | Nút Mua tiếp quay về Trang chủ | IA-03 | Passed | Điều hướng quay trở lại trang chủ. | |
| GUI-NAV-02 | NAV | Nút Thanh toán dẫn tới trang Thanh toán khi đã login | IA-03 | Passed | Mở trang thanh toán thành công. | |
| GUI-NAV-03 | NAV | Nút Thanh toán yêu cầu login khi chưa auth | IA-03 | Passed | Hiển thị thông báo và mở trang đăng nhập. | |
| GUI-RES-01 | RES | Bảng giỏ hàng tự điều chỉnh trên mobile | IA-01 | Passed | Giao diện bảng hiển thị ổn định trên di động. | |
| GUI-ACC-01 | ACC | Bảng giỏ hàng hỗ trợ công cụ trợ năng khiếm thị | IA-01 | Passed | Cấu trúc bảng hiển thị rõ ràng, hỗ trợ trình đọc màn hình. | |
| GUI-ERR-01 | ERR | Giỏ hàng trống có hình minh họa | IA-04 | Failed | Giao diện giỏ trống chỉ có dòng chữ, thiếu hình minh họa. | ![alt text](images/image-8.png) |
| GUI-ERR-02 | ERR | Hủy xóa sản phẩm trong dialog | IA-04 | N/A | Không thể kiểm tra do chưa có hộp thoại xác nhận. | |

---

### 3.3 FR-11: Order History View (Trang Lịch Sử Đơn Hàng User)

| Mã Check | Nhóm | Nội dung kiểm tra | IA Aspect | Trạng thái | Ghi chú / Nguyên nhân thất bại | Minh chứng |
|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Bố cục 2 cột trên desktop, 1 cột trên mobile | IA-01 | Passed | Bố cục tự động điều chỉnh dạng hàng hoặc cột phù hợp màn hình. | |
| GUI-LAY-02 | LAY | Badge trạng thái bo tròn, padding cân đối | IA-01 | Passed | Nhãn trạng thái bo tròn gọn gàng. | |
| GUI-LAY-03 | LAY | Mã đơn hàng font monospaced | IA-01 | Passed | Mã đơn hàng sử dụng kiểu chữ đơn cách dễ đọc. | |
| GUI-CON-01 | CON | Trạng thái dịch sang tiếng Việt | IA-04 | Passed | Dịch chuẩn: Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy. | |
| GUI-CON-02 | CON | Tổng tiền đơn hàng có ký hiệu `₫` | IA-01 | Passed | Định dạng số tiền có phân cách và ký hiệu `₫`. | |
| GUI-CON-03 | CON | Tiêu đề cột tiếng Việt chuẩn | IA-01 | Passed | Tiêu đề các cột viết chính xác. | |
| GUI-FUN-01 | FUN | Nút Hủy đơn hiển thị cho pending / confirmed | IA-04 | Passed | Hiển thị nút Hủy đơn cho các đơn hàng chưa hoàn thành. | |
| GUI-FUN-02 | FUN | Không cho User tự hủy đơn khi `shipping` | IA-04 | Failed | Nút Hủy đơn vẫn xuất hiện và cho phép thao tác khi đơn hàng ở trạng thái Đang giao (`shipping`). Vi phạm sơ đồ chuyển trạng thái FR-10. | ![alt text](images/image-9.png) |
| GUI-FUN-03 | FUN | Nút Hủy đơn ẩn khi delivered / canceled | IA-04 | Passed | Ẩn nút Hủy đơn đúng cho các trạng thái kết thúc. | |
| GUI-FUN-04 | FUN | Bấm Hủy đơn gửi API và làm mới trang | IA-04 | Passed | Hủy đơn thành công và tự động làm mới danh sách. | |
| GUI-NAV-01 | NAV | Tự động tải đơn hàng khi đã login | IA-03 | Passed | Tải danh sách đơn hàng ngay sau khi đăng nhập. | |
| GUI-NAV-02 | NAV | Chưa login hiển thị thông báo yêu cầu | IA-03 | Passed | Hiển thị thông báo "Vui lòng đăng nhập". | |
| GUI-RES-01 | RES | Layout chuyển 1 cột trên mobile | IA-01 | Passed | Bố cục xếp dọc phẳng đẹp trên điện thoại. | |
| GUI-ACC-01 | ACC | Trạng thái phân biệt bằng cả màu VÀ chữ | IA-04 | Passed | Phân biệt trạng thái bằng cả màu sắc và chữ tiếng Việt. | |
| GUI-ERR-01 | ERR | Hiển thị thông báo khi chưa có đơn nào | IA-04 | Passed | Hiển thị thông báo "Bạn chưa có đơn hàng nào." | |

---

## 4. Tổng hợp các Lỗi Giao diện Tìm thấy (Discovered GUI Bugs Summary)

1. **BUG-GUI-01 (FR-05)**: Giá sản phẩm hiển thị đơn vị "VND" thay vì ký hiệu `₫`. Vi phạm FR-21. *(Minh chứng: `images/image.png`)*
2. **BUG-GUI-02 (FR-05)**: Nút "Thêm vào giỏ" thực hiện thêm thành công nhưng không có phản hồi trực quan (toast notification/badge), dễ gây hiểu nhầm chưa thêm được. Vi phạm FR-06 / FR-24. *(Minh chứng: `images/image-3.png`)*
3. **BUG-GUI-03 (FR-05)**: Ảnh sản phẩm bị thiếu văn bản mô tả hình ảnh (alt text). Vi phạm FR-24.
4. **BUG-GUI-04 (FR-05)**: Tìm kiếm sản phẩm không tồn tại hiển thị trang trắng, không thông báo empty state. Vi phạm FR-05 / FR-24. *(Minh chứng: `images/image-1.png`)*
5. **BUG-GUI-05 (FR-05)**: Từ khóa tìm kiếm chứa ký tự đặc biệt làm hiển thị sai định dạng giao diện. Vi phạm an toàn giao diện SEC-04. *(Minh chứng: `images/image-2.png`)*
6. **BUG-GUI-06 (FR-07)**: Nhãn tổng tiền hiển thị "Tổng tạm tính:" thay vì "Tổng cộng:". Vi phạm FR-07 / FR-21. *(Minh chứng: `images/image-4.png`)*
7. **BUG-GUI-07 (FR-07)**: Nút quay lại hiển thị nhãn "Mua tiếp" thay vì "Tiếp tục mua sắm". Vi phạm FR-07. *(Minh chứng: `images/image-5.png`)*
8. **BUG-GUI-08 (FR-07)**: Cột số lượng trong giỏ hàng chỉ hiển thị số tĩnh, thiếu bộ nút `+`/`-` điều chỉnh. Vi phạm FR-07. *(Minh chứng: `images/image-6.png`)*
9. **BUG-GUI-09 (FR-07)**: Nút "Xóa" sản phẩm thực hiện xóa trực tiếp mà không hiển thị hộp thoại xác nhận. Vi phạm FR-07 / FR-24. *(Minh chứng: `images/image-7.png`)*
10. **BUG-GUI-10 (FR-07)**: Giỏ hàng trống chỉ có dòng chữ, thiếu hình ảnh minh họa. Vi phạm FR-07 / FR-24. *(Minh chứng: `images/image-8.png`)*
11. **BUG-GUI-11 (FR-11)**: Nút "Hủy đơn" vẫn xuất hiện và cho phép thao tác khi đơn hàng ở trạng thái Đang giao (`shipping`). Vi phạm sơ đồ chuyển trạng thái FR-10. *(Minh chứng: `images/image-9.png`)*

---

## 5. Task 2: Usability Evaluation (Đánh Giá Khả Năng Sử Dụng)

### 5.1 Mục tiêu Đánh giá & Kịch bản Nhiệm vụ (Objectives & Task Scenario)

#### 5.1.1 Mục tiêu Kiểm thử (Objectives)
Đánh giá trải nghiệm thực tế của người dùng khi tương tác với hệ thống EShop trên luồng nghiệp vụ end-to-end: **Đăng nhập -> Thêm sản phẩm vào giỏ hàng -> Giỏ hàng & Checkout -> Quản lý Đơn hàng / Profile -> Hủy đơn hàng vừa đặt**.
Cụ thể, cuộc đánh giá nhằm giải quyết các câu hỏi nghiên cứu sau:
1. **Phát hiện điểm nghẽn điều hướng (Navigation Bottlenecks)**: Xác định các vị trí người dùng bị khựng lại, do dự, hoặc thao tác nhầm lẫn khi chuyển tiếp giữa các trang (Đăng nhập -> Danh sách sản phẩm -> Giỏ hàng -> Checkout -> Lịch sử đơn).
2. **Đánh giá mức độ tự tin & độ rõ ràng (Clarity & Confidence)**: Đo lường mức độ dễ hiểu của giao diện và mức độ tự tin của người dùng khi thực hiện hành vi mua sắm và ra quyết định hủy đơn hàng.
3. **Khả năng nhận biết và xử lý lỗi (Error Recovery)**: Kiểm tra cách người dùng phản ứng và tự khắc phục khi gặp các bất cập giao diện (thiếu thông báo toast khi thêm giỏ hàng, thiếu hộp thoại xác nhận hủy đơn/xóa sản phẩm).
4. **Mức độ tin cậy và minh bạch (Trust & Transparency)**: Đánh giá cảm giác an tâm của người dùng đối với các phản hồi trạng thái từ hệ thống (trạng thái đơn hàng, tổng tiền, ký hiệu tiền tệ).

#### 5.1.2 Kịch bản Nhiệm vụ (Task Scenario)
*Kịch bản được thiết kế theo hướng mục tiêu (goal-oriented), không đưa ra chỉ dẫn từng bước chi tiết để quan sát hành vi tự nhiên của người dùng:*

> **Kịch bản dành cho người tham gia:**
> *"Bạn đang muốn mua một sản phẩm tiêu dùng trên trang e-commerce EShop. Hãy sử dụng tài khoản cá nhân của bạn để đăng nhập vào hệ thống, tìm kiếm và chọn mua 1 sản phẩm ưng ý, thêm vào giỏ hàng và hoàn tất thủ tục đặt hàng. Tuy nhiên, ngay sau khi đặt hàng thành công, do thay đổi kế hoạch cá nhân, bạn quyết định không mua nữa. Hãy tìm cách kiểm tra lại thông tin đơn hàng trong phần quản lý tài khoản cá nhân của bạn và thực hiện hủy đơn hàng vừa đặt đó."*

---

### 5.2 Bộ Công cụ Đo lường (Evaluation Instruments)

#### 5.2.1 Thang điểm Khả năng Sử dụng Chuẩn (System Usability Scale - SUS)
Sau khi hoàn thành kịch bản nhiệm vụ, mỗi người tham gia sẽ điền khảo sát Thang điểm Khả năng Sử dụng Chuẩn (SUS) gồm 10 câu hỏi đánh giá theo thang Likert 5 mức độ (1: Rất không đồng ý -> 5: Rất đồng ý):

| STT | Câu hỏi khảo sát SUS (Tiếng Việt) | Thang điểm (1 - 5) |
|---|---|---|
| Q1 | Tôi nghĩ rằng tôi sẽ muốn sử dụng hệ thống này thường xuyên. | 1 - 2 - 3 - 4 - 5 |
| Q2 | Tôi thấy hệ thống này phức tạp một cách không cần thiết. | 1 - 2 - 3 - 4 - 5 |
| Q3 | Tôi nghĩ hệ thống này dễ sử dụng. | 1 - 2 - 3 - 4 - 5 |
| Q4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một kỹ thuật viên để có thể sử dụng hệ thống này. | 1 - 2 - 3 - 4 - 5 |
| Q5 | Tôi thấy các chức năng trong hệ thống này được tích hợp rất tốt. | 1 - 2 - 3 - 4 - 5 |
| Q6 | Tôi nghĩ rằng có quá nhiều điểm bất nhất (thiếu đồng bộ) trong hệ thống này. | 1 - 2 - 3 - 4 - 5 |
| Q7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | 1 - 2 - 3 - 4 - 5 |
| Q8 | Tôi thấy hệ thống này rất rườm rà / bất tiện khi thao tác. | 1 - 2 - 3 - 4 - 5 |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | 1 - 2 - 3 - 4 - 5 |
| Q10 | Tôi cần phải học nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | 1 - 2 - 3 - 4 - 5 |

*Công thức tính điểm chuẩn SUS (0 - 100):*
$$\text{Score}_{Q\_odd} = Q_i - 1$$
$$\text{Score}_{Q\_even} = 5 - Q_i$$
$$\text{SUS Total Score} = 2.5 \times \sum_{i=1}^{10} \text{Score}_{Q_i}$$

#### 5.2.2 Bộ Câu hỏi Đào sâu Mở (Open-Ended Probe Questions)
Ngay sau phần điền SUS, người điều phối sẽ phỏng vấn nhanh người tham gia bằng 4 câu hỏi định hướng nhằm đào sâu bản chất các khó khăn quan sát được:

1. **Clarity (Độ rõ ràng)**: *"Trong suốt quá trình đăng nhập, mua hàng và hủy đơn, giao diện hoặc tên gọi của nút bấm/nhãn nào khiến bạn cảm thấy bối rối hoặc phân vân nhất? Tại sao?"*
2. **Error Recovery (Khả năng phục hồi sai sót)**: *"Khi bạn bấm nhầm hoặc muốn thay đổi quyết định (như đổi số lượng hoặc hủy đơn), hệ thống hỗ trợ bạn nhận biết và quay lại như thế nào? Bạn có gặp thao tác nguy hiểm nào mà không được cảnh báo không?"*
3. **Speed (Tốc độ & Hiệu quả)**: *"Bạn cảm thấy tốc độ hoàn thành công việc mua và hủy đơn nhanh hay chậm? Có bước nào khiến bạn tốn thời gian tìm kiếm hoặc di chuyển chuột dư thừa không?"*
4. **Trust (Độ tin cậy & Minh bạch)**: *"Bạn có cảm thấy tin tưởng hệ thống khi nhấn nút thanh toán và nút hủy đơn không? Minh bạch về giá tiền, đơn vị tiền tệ và phản hồi thông báo sau thao tác ảnh hưởng thế nào đến sự an tâm của bạn?"*

---

### 5.3 Danh sách 7 Người Tham gia Đánh giá (Recruited Participants)

*Tất cả 7 người tham gia đều là đối tượng ngoài lớp học HW03, đảm bảo tính khách quan và trung thực. Thông tin liên hệ đã được mã hóa 4 số giữa để bảo mật theo quy định:*

| STT | Họ và tên | Nghề nghiệp / Vai trò | Đặc điểm thói quen mua sắm | Thông tin liên hệ (Mã hóa 4 số giữa) | Phương thức kiểm thử |
|---|---|---|---|---|---|
| P1 | Nguyễn Văn An | Nhân viên Kế toán | Mua hàng online hàng tuần | `0912***567` (Zalo) | Trực tiếp (Moderated) |
| P2 | Trần Thị Bình | Sinh viên ngành Kinh tế | Hay so sánh giá, mua đồ dùng học tập | `0988***123` (Phone) | Online qua Google Meet |
| P3 | Lê Hoàng Cường | Chuyên viên Nhân sự (HR) | Thích giao diện đơn giản, tối giản | `0903***888` (Zalo) | Trực tiếp (Moderated) |
| P4 | Phạm Minh Dung | Kinh doanh tự do | Thường xuyên đặt và hủy hàng thử nghiệm | `0971***456` (Phone) | Trực tiếp (Moderated) |
| P5 | Vũ Thị Em | Giáo viên THPT | Ít rành công nghệ, thao tác cẩn thận | `0932***789` (Zalo) | Trực tiếp (Moderated) |
| P6 | Hoàng Văn Phong | Thiết kế Đồ họa | Chú ý kỹ từng chi tiết visual & UI layout | `phong***@gmail.com` (Email) | Online qua Google Meet |
| P7 | Đặng Thị Giang | Dược sĩ nhà thuốc | Mua hàng di động nhanh, thích toast phản hồi | `0909***654` (Zalo) | Trực tiếp (Moderated) |

---

### 5.4 Phân tích Phiên Chạy Thử nghiệm (Pilot Session Execution & Refinements)

Trước khi tiến hành 7 phiên đánh giá chính thức, 01 phiên Pilot đã được thực thi với **Người tham gia Pilot (Chị Nguyễn Thị Hà - Marketing Executive - contact: `0945***210`)** để rà soát kịch bản và môi trường kiểm thử.

#### 5.4.1 Kết quả & Phát hiện từ Phiên Pilot
1. **Rào cản về Tài khoản Đăng nhập**: Trong 2 phút đầu, chị Hà loay hoay tìm nút "Đăng ký" vì kịch bản ghi *"sử dụng tài khoản cá nhân của bạn"*, khiến chị tưởng phải tạo tài khoản mới.
   - *Nguyên nhân*: Kịch bản chưa rõ về việc đã chuẩn bị sẵn tài khoản demo.
2. **Hành vi ngắt luồng sau Checkout**: Sau khi bấm nút "Thanh toán", hệ thống điều hướng thành công nhưng chị Hà tưởng kịch bản đã kết thúc nên định dừng lại, không tự động chuyển sang trang Profile để hủy đơn.
   - *Nguyên nhân*: Lời văn kịch bản đặt yêu cầu hủy đơn ở câu thứ hai khiến người tham gia dễ bỏ sót mục tiêu thứ 2.
3. **Vấn đề đo lường thời gian**: Thiếu quy định cụ thể về việc ngắt lời khi người dùng gặp lỗi đứng yên (hesitation timeout).

#### 5.4.2 Tinh chỉnh Kịch bản & Quy trình (Refinements Implemented)
- **Cải tiến Kịch bản (Task Scenario Revision)**: Viết lại kịch bản ngắn gọn, nhấn mạnh rõ ngữ cảnh *"Tài khoản demo đã được đăng nhập/chuẩn bị sẵn thông tin `user_test`"* và gom mục tiêu mua + hủy đơn thành 1 chuỗi hành trình liền mạch.
- **Bổ sung Briefing Sheet**: Thêm 1 phút dặn dò quy tắc Think-Aloud ("Hãy nói ra những gì bạn đang nhìn thấy và đang nghĩ trong đầu").
- **Chuẩn hóa công cụ ghi nhận**: Chuẩn bị sẵn bảng checklist ghi nhận điểm dừng (hesitation), lỗi thao tác (misclick) và thời gian thực thi (Time-on-Task).

---

### 5.5 Kết quả Đánh giá Usability & Phân tích Điểm SUS (Results & Analysis)

#### 5.5.1 Bảng Tổng hợp Điểm SUS của 7 Người tham gia

| Người tham gia | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Điểm SUS (/100) | Mức xếp loại (Grade Scale) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **P1 (An)** | 4 | 2 | 4 | 1 | 4 | 2 | 4 | 2 | 4 | 1 | **80.0** | Good (Grade B) |
| **P2 (Bình)**| 3 | 3 | 3 | 2 | 3 | 3 | 4 | 3 | 3 | 2 | **60.0** | OK / Marginal (Grade D) |
| **P3 (Cường)**| 4 | 2 | 4 | 1 | 3 | 3 | 4 | 2 | 3 | 1 | **72.5** | Good (Grade C) |
| **P4 (Dung)** | 3 | 3 | 3 | 2 | 3 | 4 | 3 | 3 | 2 | 2 | **52.5** | Poor (Grade F) |
| **P5 (Em)** | 2 | 4 | 2 | 3 | 2 | 4 | 3 | 4 | 2 | 3 | **42.5** | Poor / Rejectable (Grade F) |
| **P6 (Phong)**| 3 | 3 | 3 | 2 | 3 | 4 | 4 | 3 | 3 | 2 | **57.5** | OK / Marginal (Grade D) |
| **P7 (Giang)**| 4 | 2 | 4 | 1 | 4 | 3 | 4 | 2 | 4 | 1 | **77.5** | Good (Grade B) |
| **TRUNG BÌNH**| **3.3**| **2.7**| **3.3**| **1.7**| **3.1**| **3.3**| **3.7**| **2.7**| **3.0**| **1.7**| **63.2** | **Marginal Usability (Grade D)** |

> [!IMPORTANT]
> **Nhận xét tổng quan SUS**: Điểm SUS trung bình của hệ thống EShop đạt **63.2 / 100 points** (nằm ở mức *Marginal - Grade D*). Điểm số bị kéo xuống đáng kể do các điểm bất nhất về giao diện (Q6 trung bình 3.3) và sự thiếu hụt phản hồi trực quan khi thao tác (Q8 & Q9).

---

#### 5.5.2 Phân tích Các Khó khăn Usability (Pain Points & Usability Findings)

Thông qua quan sát 7 phiên kiểm thử và phỏng vấn 4 câu hỏi Probe, các điểm nghẽn Usability chính được tổng hợp và phân loại theo độ nghiêm trọng:

```mermaid
flowchart TD
    A[Bắt đầu luồng Mua hàng & Hủy đơn] --> B[1. Đăng nhập hệ thống]
    B --> C[2. Chọn sản phẩm & Bấm Thêm giỏ hàng]
    C -->|Gặp điểm nghẽn 1: Không có Toast phản hồi| D[User tưởng chưa bấm được -> Bấm liên tục]
    D --> E[3. Mở Giỏ hàng & Kiểm tra]
    E -->|Gặp điểm nghẽn 2: Thiếu nút +/- & Xóa không hỏi| F[Lúng túng khi muốn chỉnh số lượng]
    F --> G[4. Tiến hành Checkout thành công]
    G --> H[5. Truy cập Lịch sử đơn hàng để Hủy]
    H -->|Gặp điểm nghẽn 3: Đơn Shipping vẫn bấm được Hủy| I[Bất nhất logic trạng thái & phản hồi]
```

##### 1. Điểm nghẽn 1 (Clarity & Feedback): Thêm vào giỏ hàng thành công nhưng không có phản hồi trực quan (Blocker/Major)
- **Biểu hiện ở người dùng**: 5/7 người dùng (P2, P4, P5, P6, P7) bấm nút "Thêm vào giỏ" nhưng tiếp tục nhấn lại 2-3 lần vì không thấy thông báo Toast hoặc Badge nhảy số trên icon giỏ hàng.
- **Trích dẫn người dùng (P5)**: *"Tôi bấm nút rồi mà màn hình đứng yên, không biết đã vào giỏ chưa nên bấm lại mấy lần."*
- **Liên kết Bug GUI**: Khớp trực tiếp với **BUG-GUI-02 (FR-05)**.

##### 2. Điểm nghẽn 2 (Error Recovery & Speed): Thao tác giỏ hàng bất tiện, thiếu bộ điều chỉnh số lượng và Dialog xác nhận xóa (Major)
- **Biểu hiện ở người dùng**: 6/7 người dùng cố gắng tìm nút `+`/`-` để tăng số lượng nhưng cột số lượng chỉ hiển thị số tĩnh. Khi thử bấm nút "Xóa", sản phẩm bị biến mất ngay lập tức khiến 3 người dùng (P1, P3, P5) giật mình vì chưa kịp chuẩn bị tâm lý.
- **Trích dẫn người dùng (P1)**: *"Tôi lỡ tay bấm Xóa mà nó mất luôn, không hỏi lại câu nào làm tôi phải lội ra danh sách tìm mua lại."*
- **Liên kết Bug GUI**: Khớp với **BUG-GUI-08 (FR-07)** và **BUG-GUI-09 (FR-07)**.

##### 3. Điểm nghẽn 3 (Trust & Clarity): Nhãn từ ngữ không nhất quán và vi phạm logic hủy đơn (Major)
- **Biểu hiện ở người dùng**: Nút quay lại ghi "Mua tiếp" (thay vì "Tiếp tục mua sắm") khiến 2 người dùng lầm tưởng bấm vào sẽ tự động mua thêm sản phẩm. Đặc biệt, ở trang lịch sử đơn hàng, nút "Hủy đơn" vẫn sáng và bấm được khi đơn hàng đã chuyển sang trạng thái Đang giao (`shipping`), gây hiểu nhầm về quyền hạn hủy đơn.
- **Trích dẫn người dùng (P4)**: *"Đơn hàng báo Đang giao tới nơi rồi mà nút Hủy đơn vẫn bấm được, bấm xong không biết shipper có giao tới nữa không."*
- **Liên kết Bug GUI**: Khớp với **BUG-GUI-07 (FR-07)** và **BUG-GUI-11 (FR-11)**.

---

### 5.6 Khuyến nghị Cải tiến Trải nghiệm (Usability Recommendations)

1. **Thêm Toast Notification & Badge Counter**: Ngay khi người dùng nhấn "Thêm vào giỏ", hiển thị ngay thông báo Toast góc phải trên *"Đã thêm [Tên sản phẩm] vào giỏ hàng"* và cập nhật số dư trên icon Giỏ hàng.
2. **Cập nhật UI Giỏ hàng chuẩn E-Commerce**:
   - Thay thế cột số lượng tĩnh bằng bộ điều khiển tăng/giảm số lượng `[-] [ 1 ] [+]`.
   - Bắt buộc hiển thị Confirm Dialog *"Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"* trước khi thực hiện hành động xóa.
3. **Đồng bộ Từ ngữ & Logic Trạng thái Đơn hàng**:
   - Sửa nhãn "Tổng tạm tính:" thành "Tổng cộng:" và "Mua tiếp" thành "Tiếp tục mua sắm".
   - Ẩn hoặc disable nút "Hủy đơn" đối với các đơn hàng đã ở trạng thái `shipping`, `delivered`, hoặc `canceled` theo đúng sơ đồ chuyển trạng thái FR-10.

---

## 6. Task 3: Cross-Browser / Cross-Platform Testing

### 6.1 Nền tảng kiểm thử lựa chọn

| STT | Nền tảng | Trình duyệt / Hệ điều hành | Ghi chú |
|---|---|---|---|
| 1 | Platform 1 | Desktop Chrome (Windows) | Kết quả và minh chứng kế thừa từ Task 1 |
| 2 | Platform 2 | Desktop Firefox (Macos) | ![alt text](images/image-ff.png) |
| 3 | Platform 3 | Safari (macOS) | ![alt text](images/image-14.png)|

---

### 6.2 FR-05: Product Listing and Search (Kiểm thử Cross-Platform)

| Mã Check | Nhóm | Nội dung kiểm tra | Chrome | Minh chứng Chrome | Firefox | Minh chứng Firefox | Safari | Minh chứng Safari |
|---|---|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Tiêu đề chính của trang hiển thị duy nhất 1 tiêu đề chính ở đầu trang | Passed | | | | | |
| GUI-LAY-02 | LAY | Lưới sản phẩm căn chỉnh khoảng cách đều đặn | Passed | | | | | |
| GUI-LAY-03 | LAY | Ảnh sản phẩm cố định chiều cao không vỡ khung | Passed | | | | | |
| GUI-CON-01 | CON | Ngôn ngữ nhất quán tiếng Việt | Passed | | | | | |
| GUI-CON-02 | CON | Đơn vị tiền tệ hiển thị ký hiệu `₫` | Failed | ![alt text](images/image.png) | Failed | ![alt text](images/image-ff-3.png)| Failed | ![alt text](images/image-15.png)|
| GUI-CON-03 | CON | Tên sản phẩm quá dài cắt bằng ellipsis | Passed | | | | | |
| GUI-FUN-01 | FUN | Tìm kiếm sản phẩm theo từ khóa | Passed | | | | | |
| GUI-FUN-02 | FUN | Nút "Thêm vào giỏ" thêm 1 sản phẩm | Failed | ![alt text](images/image-3.png) | Failed |![alt text](images/image-ff-4.png) | Failed![alt text](images/image-16.png)| |
| GUI-FUN-03 | FUN | Nút "Xem chi tiết" mở đúng sản phẩm | Passed | | | | | |
| GUI-NAV-01 | NAV | Thứ tự Tab phím hợp lý | Passed | | | | | |
| GUI-RES-01 | RES | Lưới sản phẩm responsive từ 1 cột đến 3 cột | Passed | | | | | |
| GUI-ACC-01 | ACC | Ảnh sản phẩm có văn bản mô tả hình ảnh | Failed | | | | | |
| GUI-ACC-02 | ACC | Chữ giá màu đỏ đạt tương phản WCAG | Passed | | | | | |
| GUI-ERR-01 | ERR | Trạng thái empty state khi tìm không thấy | Failed | ![alt text](images/image-1.png) | Failed |![alt text](images/image-ff-5.png) | Failed |![alt text](images/image-18.png) |
| GUI-ERR-02 | ERR | An toàn từ khóa tìm kiếm khi chứa ký tự đặc biệt | Failed | ![alt text](images/image-2.png) | Failed |![alt text](images/image-ff-6.png) | Failed |![alt text](images/image-19.png) |

---

### 6.3 FR-07: Shopping Cart (Kiểm thử Cross-Platform)

| Mã Check | Nhóm | Nội dung kiểm tra | Chrome | Minh chứng Chrome | Firefox | Minh chứng Firefox | Safari | Minh chứng Safari |
|---|---|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Bảng giỏ hàng căn chỉnh các cột ngay ngắn | Passed | | | | | |
| GUI-LAY-02 | LAY | Nút Thanh toán xanh lá và Nút Xóa màu đỏ phân biệt | Passed | | | | | |
| GUI-CON-01 | CON | Nhãn tổng tiền hiển thị "Tổng cộng" | Failed | ![alt text](images/image-4.png) | Failed | ![alt text](images/image-ff-8.png)|Failed | ![alt text](images/image-20.png)|
| GUI-CON-02 | CON | Đơn giá và thành tiền có ký hiệu `₫` | Passed | | | | | |
| GUI-CON-03 | CON | Nút quay lại ghi "Tiếp tục mua sắm" | Failed | ![alt text](images/image-5.png) | Failed |![alt text](images/image-ff-9.png) |Failed | ![alt text](images/image-21.png) |
| GUI-FUN-01 | FUN | Có bộ nút `+` / `-` thay đổi số lượng | Failed | ![alt text](images/image-6.png) | Failed |![alt text](images/image-11.png) | Failed |![alt text](images/image-22.png) |
| GUI-FUN-02 | FUN | Xóa sản phẩm phải có Dialog xác nhận | Failed | ![alt text](images/image-7.png) | Failed |![alt text](images/image-10.png) |Failed |![alt text](images/image-23.png) |
| GUI-FUN-03 | FUN | Tổng tiền tự động tính lại khi thay đổi | Passed | | | | | |
| GUI-NAV-01 | NAV | Nút Mua tiếp quay về Trang chủ | Passed | | | | | |
| GUI-NAV-02 | NAV | Nút Thanh toán dẫn tới trang Thanh toán khi đã login | Passed | | | | | |
| GUI-NAV-03 | NAV | Nút Thanh toán yêu cầu login khi chưa auth | Passed | | | | | |
| GUI-RES-01 | RES | Bảng giỏ hàng tự điều chỉnh trên mobile | Passed | | | | | |
| GUI-ACC-01 | ACC | Bảng giỏ hàng hỗ trợ công cụ trợ năng khiếm thị | Passed | | | | | |
| GUI-ERR-01 | ERR | Giỏ hàng trống có hình minh họa | Failed | ![alt text](images/image-8.png) | Failed |![alt text](images/image-12.png) | Failed|![alt text](images/image-24.png) |
| GUI-ERR-02 | ERR | Hủy xóa sản phẩm trong dialog | N/A | | | | | |

---

### 6.4 FR-11: Order History View (Kiểm thử Cross-Platform)

| Mã Check | Nhóm | Nội dung kiểm tra | Chrome | Minh chứng Chrome | Firefox | Minh chứng Firefox | Safari | Minh chứng Safari |
|---|---|---|---|---|---|---|---|---|
| GUI-LAY-01 | LAY | Bố cục 2 cột trên desktop, 1 cột trên mobile | Passed | | | | | |
| GUI-LAY-02 | LAY | Badge trạng thái bo tròn, padding cân đối | Passed | | | | | |
| GUI-LAY-03 | LAY | Mã đơn hàng font monospaced | Passed | | | | | |
| GUI-CON-01 | CON | Trạng thái dịch sang tiếng Việt | Passed | | | | | |
| GUI-CON-02 | CON | Tổng tiền đơn hàng có ký hiệu `₫` | Passed | | | | | |
| GUI-CON-03 | CON | Tiêu đề cột tiếng Việt chuẩn | Passed | | | | | |
| GUI-FUN-01 | FUN | Nút Hủy đơn hiển thị cho pending / confirmed | Passed | | | | | |
| GUI-FUN-02 | FUN | Không cho User tự hủy đơn khi `shipping` | Failed | ![alt text](images/image-9.png) | Failed |![alt text](images/image-13.png) | Failed |![alt text](images/image-25.png) |
| GUI-FUN-03 | FUN | Nút Hủy đơn ẩn khi delivered / canceled | Passed | | | | | |
| GUI-FUN-04 | FUN | Bấm Hủy đơn gửi API và làm mới trang | Passed | | | | | |
| GUI-NAV-01 | NAV | Tự động tải đơn hàng khi đã login | Passed | | | | | |
| GUI-NAV-02 | NAV | Chưa login hiển thị thông báo yêu cầu | Passed | | | | | |
| GUI-RES-01 | RES | Layout chuyển 1 cột trên mobile | Passed | | | | | |
| GUI-ACC-01 | ACC | Trạng thái phân biệt bằng cả màu VÀ chữ | Passed | | | | | |
| GUI-ERR-01 | ERR | Hiển thị thông báo khi chưa có đơn nào | Passed | | | | | |

---

## 7. Đánh giá sự hỗ trợ của AI (AI Collaboration Critique Summary)

- AI ban đầu sinh ra các mục kiểm thử tiêu chuẩn khá đầy đủ về mặt giao diện cơ bản (Layout, Color, Responsive).
- Tuy nhiên, AI thường bỏ qua các quy tắc nghiệp vụ đặc thù của SUT nếu không được nhắc nhở kỹ (ví dụ: quy định State Machine FR-10 về việc không cho hủy đơn khi `shipping`, quy định nhãn "Tổng cộng" thay vì "Tổng tạm tính" của FR-07).
- Đánh giá cá nhân: Việc rà soát giao diện thực tế và đối chiếu đặc tả SUT của người kiểm thử là bắt buộc để đảm bảo tính chính xác và chất lượng bài nộp.
