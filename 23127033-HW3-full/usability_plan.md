# Kịch Bản Đánh Giá Độ Khả Dụng (Usability Testing Scenario) & Công Cụ Khảo Sát

Tài liệu này hướng dẫn cách tổ chức điều phối buổi usability testing trên ứng dụng EShop với **7 người dùng thực tế**, bao gồm kịch bản nhiệm vụ, thang đo SUS (System Usability Scale) và các câu hỏi phỏng vấn đào sâu.

---

## 1. Kịch Bản Nhiệm Vụ (Task Scenario)

> [!NOTE]
> Hãy đưa phần bối cảnh và kịch bản dưới đây cho người tham gia kiểm thử đọc. **Tuyệt đối không hướng dẫn họ từng bước bấm nút nào hoặc đi đâu.**

### Bối cảnh (Scenario Context)
Bạn là một khách hàng mới biết đến ứng dụng mua sắm trực tuyến **EShop**. Bạn đang có nhu cầu tìm mua một chiếc điện thoại iPhone làm quà tặng cho người thân. Bạn có một mã giảm giá là `GIAM20` và muốn mua hàng trực tuyến, nhận hàng tại nhà.

### Yêu cầu Nhiệm vụ (User Goal)
Hãy truy cập vào trang web EShop, đăng ký tài khoản mới và thực hiện mua **2 chiếc iPhone** bằng mã giảm giá `GIAM20`. Bạn cần điền đầy đủ địa chỉ giao hàng và hoàn thành đơn hàng cho đến khi hệ thống báo đặt hàng thành công.

---

## 2. Các Bước Quan Sát Cho Điều Phối Viên (Moderator Guide)

Trong suốt quá trình người dùng thực hiện nhiệm vụ, điều phối viên cần quan sát các hành động và ghi chép lại các điểm sau:
1. **Bước 1: Đăng ký tài khoản**
   - Người dùng có tìm thấy nút Đăng ký dễ dàng không?
   - Người dùng có gặp khó khăn khi điền form đăng ký không (lỗi định dạng mật khẩu, email)?
2. **Bước 2: Đăng nhập**
   - Đăng nhập có mượt mà không? Có trường hợp người dùng bị quên thông tin vừa tạo không?
3. **Bước 3: Tìm kiếm & Lọc sản phẩm**
   - Người dùng gõ từ khóa "iPhone" vào ô tìm kiếm hay duyệt qua danh mục?
   - Danh sách sản phẩm hiển thị có rõ ràng thông tin giá cả và hình ảnh không?
4. **Bước 4: Thêm vào giỏ hàng**
   - Người dùng có bấm vào xem chi tiết sản phẩm trước khi mua hay bấm mua ngay từ trang chủ?
   - Có phản hồi rõ ràng khi sản phẩm được thêm vào giỏ không?
5. **Bước 5: Quản lý Giỏ hàng**
   - Người dùng có biết cách tăng số lượng sản phẩm lên 2 tại trang giỏ hàng không?
   - Các nút cập nhật số lượng có nhạy và hiển thị tổng tiền đúng không?
6. **Bước 6: Áp mã giảm giá & Thanh toán**
   - Người dùng có tìm thấy ô nhập mã giảm giá trên trang Checkout không?
   - Người dùng phản ứng thế nào khi áp mã `SAVE10` (Hệ thống báo thành công/thất bại thế nào)?
   - Có lỗi hiển thị nào xảy ra ở trang checkout không?
7. **Bước 7: Đơn hàng thành công**
   - Trang xác nhận đặt hàng thành công có cung cấp đủ thông tin (Mã đơn hàng, trạng thái) không?

---

## 3. Thang Đo Độ Khả Dụng Hệ Thống (SUS - System Usability Scale)

Sau khi hoàn thành nhiệm vụ, hãy yêu cầu người tham gia trả lời nhanh **10 câu hỏi** dưới đây. Mỗi câu đánh giá từ **1 (Rất không đồng ý)** đến **5 (Rất đồng ý)**.

#### Thiều Quang Vinh - 0914957350 - tqvinh23@clc.fitus.edu.vn
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | |3 | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. |1 | | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | |5 |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | |3 | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | |2 | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | |3 | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | |5 |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. |1 | | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | | |4 | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | |3 | | |

Dễ dùng vì đơn giản, nhưng tính năng không được đúng
#### Phạm Hoàng Anh - 0915199054 - phanh23@clc.fitus.edu.vn
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. |1 | | | | | 
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | |3 | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. |1 | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | |4 | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | |3 | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). |1 | | | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | |3 | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | |3 | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. |1 | | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | |2 | | | |

Ko minh bạch, chưa tốt, khó hiểu, mâu thuẫn, khó sử dụng, phải tìm hiểu mới dùng được, không đúng với thực tế, ko dám bỏ tiền cho hệ thống này
#### Nguyễn Huy Hoàng - 0389094799 - nhhoang23@clc.fitus.edu.vn
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. |1 | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | 2| | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | |5 |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | | | 5|
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | |3| | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | ||4 | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | |3 | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | |3 | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | | |4 | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | || | 5|

Dễ dùng vì giao diện đơn giản, nhưng không thông báo, không tính năng đúng đắn
#### Hồ Đức Thuận - 0949852448 - hdthuan23@clc.fitus.edu.vn
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. |1 | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | |3 | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. |1 | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | |4 | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. |1 | | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | | |5 |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | |4 | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | | |5 |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. |1 | | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | |4 | |

Thiếu chức năng, khó sử dụng không tìm chỗ cần, không ai hướng dẫn, rời rạc, thiếu nhất quán không đồng bộ, tìm hiểu nhiều để sử dụng
#### Trần Mạnh Hùng - tmhung23@clc.fitus.edu.vn - 0797892222
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. |1 | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | |3 | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. |1 | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | |2 | | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | |2 | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | | |5 |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | |3 | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | |4 | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | |2 | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. |1 | | | | |

Chưa thật sự lớn, UIUX tệ, bug đơn giản mà không xử lí được, theo dõi đơn hàng không biết ở đâu, phải tự tìm hiểu nhiều, chức năng hoạt động không đúng, cần khắc phục để nâng cao trải nghiệm
#### Nguyễn Anh Khoa - nakhoa231@clc.fitus.edu.vn - 0855811187
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | 2| | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | |2 | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | |2 | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | |3 | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | |3 | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | |3 | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | |4 | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | |2 | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | |2 | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | |3 | | |

Đổi được tiền nên không đáng tin, phức tạp, phải vào nhiều chỗ để làm cái khác, bị thiếu, hơi chậm không hiển thị chỗ nào nhấn được, không liên kết tốt, thiếu nhất quán
#### Nguyễn Thanh Tiến
| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | |3 | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. |1 | | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | |5 |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | |3 | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | |2 | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | |3 | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | |5 |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. |1 | | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | |4 | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | |3 | | |

*Cách tính điểm SUS:*
- Với các câu lẻ (1, 3, 5, 7, 9): Điểm = (Điểm người dùng chọn) - 1.
- Với các câu chẵn (2, 4, 6, 8, 10): Điểm = 5 - (Điểm người dùng chọn).
- Điểm SUS Tổng = (Tổng điểm của 10 câu) $\times$ 2.5. Điểm tối đa là 100.

---

## 4. Các Câu Hỏi Phỏng Vấn Sâu (Post-test Interview Probes)

Hãy đặt các câu hỏi dưới đây để thu thập phản hồi định tính sâu hơn:

1. **Về độ rõ ràng (Clarity)**:
   - *"Bạn thấy giao diện và các thông báo trên màn hình (đặc biệt khi áp mã giảm giá hay cập nhật giỏ hàng) có dễ hiểu không?"*
2. **Về khả năng phục hồi lỗi (Error Recovery)**:
   - *"Nếu nhập sai số điện thoại hoặc mã giảm giá, hệ thống báo lỗi có giúp bạn biết cần phải sửa lại như thế nào không?"*
3. **Về tốc độ (Speed)**:
   - *"Bạn thấy các thao tác chuyển trang và tải dữ liệu có nhanh không? Có bước nào bạn cảm thấy phải đợi quá lâu không?"*
4. **Về sự tin tưởng (Trust)**:
   - *"Bạn có cảm thấy an toàn và tin tưởng khi nhập thông tin cá nhân (như email, số điện thoại, địa chỉ nhận hàng) vào hệ thống này không?"*
5. **Đề xuất cải tiến**:
   - *"Nếu được thay đổi một điều ở giao diện hoặc quy trình mua hàng để thuận tiện hơn, bạn muốn thay đổi điều gì?"*
