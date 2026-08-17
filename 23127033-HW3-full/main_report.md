# Báo Cáo Kết Quả Kiểm Thử GUI & Usability (HW03-AI)

## Thông Tin Sinh Viên & Bài Tập
* **Họ tên sinh viên:** Bùi Dương Duy Cường
* **Mã số sinh viên:** 23127033
* **Lớp / Nhóm:** Nhóm 06
* **Môn học:** Kiểm Thử Phần Mềm
* **Môi trường thử nghiệm:** Google Chrome, Mozilla Firefox (Desktop), Safari Mobile (iOS)
* **Link Video Demo AI Agent Skill (YouTube):** https://youtu.be/LqkgvLuubdM
* **Link Minh Chứng 7 Người Tham Gia (Google Drive):** https://drive.google.com/drive/folders/1BRLANvJOL6A_MZ9EkViuCaw-ANXOslwg?usp=sharing

---


## TASK 1 — GUI CHECKLIST (GOOGLE CHROME)

Dưới đây là danh sách **60 mục kiểm thử giao diện** đã được thiết kế và thực thi chi tiết trên trình duyệt **Google Chrome**.

| ID | Aspect | Màn hình | Mô tả | Kết quả mong đợi | Trạng thái | Ghi chú | Minh chứng |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| TC-IA01-001 | IA-01: General UI | All Screens | Tính nhất quán của ngôn ngữ hiển thị (Bilingual consistency) và font chữ trên toàn trang web. | Hệ thống hiển thị đồng bộ bằng một ngôn ngữ (Tiếng Việt), không xen lẫn tiếng Anh. | **Failed** | BUG-FR-01-004: Giao diện đa ngôn ngữ hiển thị không nhất quán (lúc Tiếng Anh, lúc Tiếng Việt). [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/120) | [Issue #120](https://github.com/iamDicun/Group06_HW2_Testing/issues/120) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-004.png) |
| TC-IA01-002 | IA-01: General UI | All Screens | Tính nhất quán của bảng màu chủ đạo (Blue-600) theo thiết kế thương hiệu. | Các nút bấm chính sử dụng màu xanh chủ đạo, không pha trộn màu lạ. | **Failed** | BUG-FR-01-001: Nút submit Đăng ký có màu đỏ (bg-red-500) không nhất quán với màu xanh chủ đạo. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/110) | [Issue #110](https://github.com/iamDicun/Group06_HW2_Testing/issues/110) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-001.png) |
| TC-IA01-003 | IA-01: General UI | All Screens | Độ tương phản màu sắc giữa chữ và nền (WCAG 2.0). | Đạt tỷ lệ tương phản tối thiểu 4.5:1 để dễ đọc. | **Passed** |  |  |
| TC-IA01-004 | IA-01: General UI | Cart | Tính gộp nhóm và bố cục hiển thị của danh sách các sản phẩm cùng loại trong giỏ hàng. | Các sản phẩm cùng loại được gộp chung thành một dòng và cộng dồn số lượng. | **Failed** | BUG-FR-07-004: Các sản phẩm cùng loại khi thêm nhiều lần không gộp chung số lượng mà hiển thị rời rạc. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/125) | [Issue #125](https://github.com/iamDicun/Group06_HW2_Testing/issues/125) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-004.png) |
| TC-IA01-005 | IA-01: General UI | All Screens | Khả năng co giãn giao diện (Responsiveness) trên thiết bị di động. | Giao diện tự động co giãn không bị vỡ khung hoặc mất chữ. | **Passed** |  |  |
| TC-IA01-006 | IA-01: General UI | All Screens | Đường dẫn Logo ở Header chuyển hướng về trang chủ. | Bấm vào logo 'EShop' trên header luôn quay về trang chủ '/'. | **Passed** |  |  |
| TC-IA01-007 | IA-01: General UI | All Screens | Tính đồng bộ của Header và Footer trên toàn bộ trang web. | Header và Footer hiển thị nhất quán trên mọi route. | **Passed** |  |  |
| TC-IA01-008 | IA-01: General UI | All Screens | Trạng thái hover của các đường liên kết và các nút nhấn. | Con trỏ chuột đổi thành dạng bàn tay khi hover qua link/nút. | **Passed** |  |  |
| TC-IA01-009 | IA-01: General UI | All Screens | Tỷ lệ khung hình và độ sắc nét của hình ảnh sản phẩm. | Hình ảnh hiển thị đúng tỷ lệ, không bị kéo dẹt hay mờ. | **Passed** |  |  |
| TC-IA01-010 | IA-01: General UI | All Screens | Tốc độ tải tài nguyên hình ảnh tối ưu hóa. | Ảnh dung lượng nhẹ, tải nhanh không gây trễ trang. | **Passed** |  |  |
| TC-IA01-011 | IA-01: General UI | Admin Dashboard | Sự chính xác và nhất quán trong hiển thị số liệu báo cáo trên Dashboard trang quản trị. | Tổng doanh thu hiển thị chính xác theo tổng các đơn hàng, không bị nhân đôi. | **Failed** | BUG-FR-13-001: Tổng doanh thu hiển thị trên Dashboard bị tính nhân đôi sai lệch thực tế. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/117) | [Issue #117](https://github.com/iamDicun/Group06_HW2_Testing/issues/117) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-13-001.png) |
| TC-IA01-012 | IA-01: General UI | All Screens | Không xuất hiện thanh cuộn ngang không mong muốn ở chế độ desktop. | Trang web chỉ cuộn dọc, nội dung nằm trọn trong trang. | **Passed** |  |  |
| TC-IA01-013 | IA-01: General UI | All Screens | Favicon và tiêu đề trang hiển thị đúng khi chuyển đổi trang. | Tiêu đề tab trình duyệt thay đổi tương ứng theo trang. | **Passed** |  |  |
| TC-IA01-014 | IA-01: General UI | All Screens | Khoảng cách đệm (Padding/Margin) giữa các khối nội dung cân đối. | Không có văn bản nào nằm sát viền màn hình. | **Passed** |  |  |
| TC-IA01-015 | IA-01: General UI | All Screens | Trang báo lỗi 404 hiển thị khi người dùng truy cập link sai. | Hiển thị giao diện 404 thân thiện kèm nút quay về trang chủ. | **Passed** |  |  |
| TC-IA02-001 | IA-02: Forms | Register / Login | Các ô nhập liệu phải có placeholder gợi ý rõ ràng. | Ô email hiển thị placeholder ví dụ như nhap@email.com. | **Passed** |  |  |
| TC-IA02-002 | IA-02: Forms | Register / Login | Mật khẩu khi nhập vào mặc định phải được ẩn (dạng dấu chấm hoặc dấu sao). | Input mật khẩu có thuộc tính type="password" để ẩn chữ. | **Failed** | BUG-FR-02-002: Ô mật khẩu đăng nhập hiển thị ký tự thường (dạng text) thay vì bị ẩn. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/112) | [Issue #112](https://github.com/iamDicun/Group06_HW2_Testing/issues/112) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-002.png) |
| TC-IA02-003 | IA-02: Forms | Register / Login | Sự chính xác và nhất quán của các tiêu đề biểu mẫu (Form titles/headers). | Tiêu đề biểu mẫu đăng nhập phải ghi rõ 'Đăng nhập', không ghi nhầm thành 'Đăng ký'. | **Failed** | BUG-FR-02-001: Tiêu đề trang đăng nhập hiển thị sai thành "Đăng Ký". [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/121) | [Issue #121](https://github.com/iamDicun/Group06_HW2_Testing/issues/121) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-001.png) |
| TC-IA02-004 | IA-02: Forms | Register / Login | Kiểm tra định dạng email hợp lệ khi nhập và submit form. | Trường email sử dụng thuộc tính type="email" để tự động xác thực định dạng. | **Failed** | BUG-FR-01-003: Ô nhập Email ở trang Đăng ký có kiểu dữ liệu là "text" thay vì "email". [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/111) | [Issue #111](https://github.com/iamDicun/Group06_HW2_Testing/issues/111) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-003.png) |
| TC-IA02-005 | IA-02: Forms | Register | Kiểm tra tính đúng đắn của logic kiểm tra độ mạnh yếu mật khẩu khi đăng ký. | Chấp nhận các mật khẩu mạnh có ký tự đặc biệt thông thường, không bắt khoảng trắng. | **Failed** | BUG-FR-01-002: Nhập mật khẩu thông thường không đăng ký được do regex quá nghiêm ngặt và sai logic. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/119) | [Issue #119](https://github.com/iamDicun/Group06_HW2_Testing/issues/119) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-002.png) |
| TC-IA02-006 | IA-02: Forms | ForgotPassword | Thiếu ô xác nhận mật khẩu mới khi thực hiện đặt lại mật khẩu. | Biểu mẫu đổi mật khẩu bắt buộc phải có trường nhập Xác nhận lại mật khẩu mới. | **Failed** | BUG-FR-03-001: Thiếu trường Xác nhận mật khẩu mới khi đặt lại mật khẩu. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/114) | [Issue #114](https://github.com/iamDicun/Group06_HW2_Testing/issues/114) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-03-001.png) |
| TC-IA02-007 | IA-02: Forms | Register / Login | Độ tương phản và vị trí hiển thị của các thông báo lỗi. | Thông báo lỗi màu đỏ nổi bật dưới trường bị trống. | **Passed** |  |  |
| TC-IA02-008 | IA-02: Forms | All Forms | Thứ tự điều hướng bằng phím Tab (Tab Index) trên các form. | Con trỏ di chuyển tuần tự từ trên xuống dưới một cách hợp lý. | **Passed** |  |  |
| TC-IA02-009 | IA-02: Forms | Checkout | Kiểm soát khả năng sửa đổi các trường hiển thị tổng tiền/giá trị giao dịch trên biểu mẫu. | Tổng tiền cần thanh toán phải khóa (Read-only), không cho người dùng sửa đổi. | **Failed** | BUG-FR-08-001: Tổng tiền thanh toán hiển thị dưới dạng ô Input cho phép chỉnh sửa tự do. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/126) | [Issue #126](https://github.com/iamDicun/Group06_HW2_Testing/issues/126) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-08-001.png) |
| TC-IA02-010 | IA-02: Forms | Profile | Kiểm tra tính năng lưu thay đổi thông tin profile khi nhập ký tự lạ. | Hệ thống xử lý an toàn, không lỗi database. | **Passed** |  |  |
| TC-IA02-011 | IA-02: Forms | Cart | Kiểm tra tính hợp lệ của trường nhập số lượng sản phẩm trong giỏ hàng (chống số lượng âm). | Số lượng sản phẩm trong giỏ hàng phải luôn >= 1, chặn hoàn toàn các giá trị âm. | **Failed** | BUG-FR-07-003: Cho phép người dùng chỉnh số lượng sản phẩm xuống giá trị âm. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/124) | [Issue #124](https://github.com/iamDicun/Group06_HW2_Testing/issues/124) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-003.png) |
| TC-IA02-012 | IA-02: Forms | Checkout | Sự hiện diện đầy đủ của các trường thông tin giao nhận hàng bắt buộc ở trang Checkout. | Hiển thị đầy đủ các trường nhập Tên người nhận, SĐT và Địa chỉ nhận hàng. | **Failed** | BUG-FR-08-002: Trang thanh toán thiếu hoàn toàn các ô điền thông tin giao nhận hàng. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/116) | [Issue #116](https://github.com/iamDicun/Group06_HW2_Testing/issues/116) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-08-002.png) |
| TC-IA02-013 | IA-02: Forms | ForgotPassword | Nút gửi mã OTP có bộ đếm ngược thời gian chờ gửi lại. | Hiển thị cooldown đếm ngược trước khi cho bấm gửi lại. | **Passed** |  |  |
| TC-IA02-014 | IA-02: Forms | All Forms | Nút xóa dữ liệu (Reset/Clear) hoạt động đúng. | Xóa sạch dữ liệu đã nhập trong các ô khi bấm nút clear. | **Passed** |  |  |
| TC-IA02-015 | IA-02: Forms | Register | Ngăn chặn đăng ký tài khoản trùng lặp email. | Thông báo lỗi rõ ràng nếu email đã tồn tại. | **Passed** |  |  |
| TC-IA03-001 | IA-03: Navigation | All Screens | Thanh điều hướng Header cố định ở đầu trang khi cuộn. | Header luôn ghim trên cùng khi cuộn trang xuống. | **Passed** |  |  |
| TC-IA03-002 | IA-03: Navigation | All Screens | Trạng thái hoạt động (Active state) của trang hiện tại. | Mục trang hiện tại trên header được tô đậm hoặc đổi màu. | **Passed** |  |  |
| TC-IA03-003 | IA-03: Navigation | All Screens | Tự động chuyển hướng khách vãng lai về Login. | Cố truy cập profile/checkout khi chưa login phải bị đá về login. | **Passed** |  |  |
| TC-IA03-004 | IA-03: Navigation | All Screens | Phím Back của trình duyệt hoạt động đúng. | Quay về trang trước đó bình thường, không bị lặp route. | **Passed** |  |  |
| TC-IA03-005 | IA-03: Navigation | Home | Khả năng lọc sản phẩm theo danh mục. | Bấm danh mục cập nhật sản phẩm tương ứng lập tức. | **Passed** |  |  |
| TC-IA03-006 | IA-03: Navigation | Home | Tìm kiếm sản phẩm cập nhật danh sách hiển thị. | Gõ từ khóa tìm kiếm hiển thị sản phẩm liên quan ngay. | **Passed** |  |  |
| TC-IA03-007 | IA-03: Navigation | ProductDetail | Liên kết quay lại từ chi tiết sản phẩm. | Nút quay lại đưa người dùng về đúng vị trí trang chủ. | **Passed** |  |  |
| TC-IA03-008 | IA-03: Navigation | Cart | Nút Tiến hành thanh toán chuyển hướng. | Dẫn hướng chính xác sang trang checkout `/checkout`. | **Passed** |  |  |
| TC-IA03-009 | IA-03: Navigation | ForgotPassword | Sự phân biệt trực quan và nhất quán của các nút điều hướng phụ. | Nút 'Quay lại' có màu sắc trung tính (ví dụ: xám) phân biệt rõ với nút hành động chính. | **Failed** | BUG-FR-03-002: Nút 'Quay lại' có màu sắc xanh lá giống hệt nút submit Đặt lại mật khẩu. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/115) | [Issue #115](https://github.com/iamDicun/Group06_HW2_Testing/issues/115) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-03-002.png) |
| TC-IA03-010 | IA-03: Navigation | Home | Khả năng điều hướng trực quan đến lịch sử đơn hàng và trang cá nhân từ trang chủ. | Có liên kết rõ ràng trên Header giúp người dùng vào xem lịch sử đơn hàng nhanh chóng. | **Failed** | BUG-FR-11-001: Người dùng gặp khó khăn khi tìm kiếm chức năng Theo dõi đơn hàng (Lịch sử mua hàng). [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/128) | [Issue #128](https://github.com/iamDicun/Group06_HW2_Testing/issues/128) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-11-001.png) |
| TC-IA03-011 | IA-03: Navigation | Admin Dashboard | Thanh Menu bên cạnh của trang Admin. | Bấm Category/Product/Order chuyển trang chính xác. | **Passed** |  |  |
| TC-IA03-012 | IA-03: Navigation | All Screens | Quyền truy cập trang Admin bị chặn với user thường. | Tài khoản thường cố vào admin hiển thị lỗi 403 hoặc đá về trang chủ. | **Passed** |  |  |
| TC-IA03-013 | IA-03: Navigation | All Screens | Tốc độ chuyển đổi giữa các trang. | Các trang chuyển đổi mượt mà không đơ quá 2 giây. | **Passed** |  |  |
| TC-IA03-014 | IA-03: Navigation | ProductDetail | Đường dẫn Breadcrumbs hiển thị rõ. | Người dùng thấy rõ cấp danh mục sản phẩm đang xem. | **Passed** |  |  |
| TC-IA03-015 | IA-03: Navigation | All Screens | Đóng hamburger menu khi bấm ra ngoài. | Menu tự ẩn khi chạm vùng trống bên ngoài trên mobile. | **Passed** |  |  |
| TC-IA04-001 | IA-04: Feedback / state | Register | Toast thông báo thành công sau khi đăng ký. | Popup đăng ký thành công xuất hiện rồi tự ẩn sau 3s. | **Passed** |  |  |
| TC-IA04-002 | IA-04: Feedback / state | Login | Cơ chế khóa tài khoản và hiển thị thông báo phản hồi khi đăng nhập sai. | Tài khoản chỉ bị khóa sau đúng 3 lần sai liên tiếp và hiển thị thông báo khóa. | **Failed** | BUG-FR-02-003: Tài khoản bị khóa chỉ sau 2 lần đăng nhập sai thay vị 3 lần. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/113) | [Issue #113](https://github.com/iamDicun/Group06_HW2_Testing/issues/113) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-003.png) |
| TC-IA04-003 | IA-04: Feedback / state | Home | Hiển thị thông báo phản hồi trực quan (Toast/Popup) khi người dùng thêm sản phẩm vào giỏ hàng từ trang chủ. | Hiển thị thông báo 'Đã thêm vào giỏ hàng thành công' ngay lập tức. | **Failed** | BUG-FR-07-002: Thêm sản phẩm từ trang chủ không có thông báo phản hồi trực quan. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/123) | [Issue #123](https://github.com/iamDicun/Group06_HW2_Testing/issues/123) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-002.png) |
| TC-IA04-004 | IA-04: Feedback / state | ProductDetail | Phản hồi tức thì và sự chính xác khi nhấn nút 'Thêm vào giỏ hàng' ở trang Chi tiết sản phẩm. | Sản phẩm được thêm vào giỏ ngay ở lần nhấn đầu tiên và hiện toast thành công. | **Failed** | BUG-FR-06-001: Nút 'Thêm vào giỏ hàng' không hoạt động ở lần click đầu tiên, yêu cầu bấm đúp. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/122) | [Issue #122](https://github.com/iamDicun/Group06_HW2_Testing/issues/122) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-06-001.png) |
| TC-IA04-005 | IA-04: Feedback / state | Cart | Thông báo hiển thị khi giỏ hàng trống. | Hiện thông báo trống và nút 'Tiếp tục mua sắm'. | **Passed** |  |  |
| TC-IA04-006 | IA-04: Feedback / state | Cart | Cảnh báo xác nhận khi xóa sản phẩm. | Hiển thị popup hỏi người dùng trước khi xóa. | **Passed** |  |  |
| TC-IA04-007 | IA-04: Feedback / state | Checkout | Sự chính xác và phản hồi trực quan khi áp dụng mã giảm giá (Coupon). | Mã giảm giá được tính toán chính xác và hiển thị thông báo thành công. | **Failed** | BUG-FR-09-001: Áp mã giảm giá phần trăm 'SAVE10' làm tăng giá trị đơn hàng lên gấp 10 lần. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/127) | [Issue #127](https://github.com/iamDicun/Group06_HW2_Testing/issues/127) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-09-001.png) |
| TC-IA04-008 | IA-04: Feedback / state | Checkout | Trang xác nhận đặt hàng thành công. | Hiển thị mã đơn hàng và lời cảm ơn sau thanh toán. | **Passed** |  |  |
| TC-IA04-009 | IA-04: Feedback / state | All Screens | Trạng thái đang tải (Loading Spinner). | Hiện skeleton loader khi đang tải dữ liệu. | **Passed** |  |  |
| TC-IA04-010 | IA-04: Feedback / state | Home | Thông báo kết quả tìm kiếm trống. | Hiện 'Không tìm thấy sản phẩm' khi gõ từ khóa lạ. | **Passed** |  |  |
| TC-IA04-011 | IA-04: Feedback / state | Profile | Thông báo lưu profile thành công. | Hiện toast báo lưu thông tin cá nhân thành công. | **Passed** |  |  |
| TC-IA04-012 | IA-04: Feedback / state | Admin Dashboard | Phản hồi và tính chính xác khi thực hiện thao tác cập nhật (UPDATE) dữ liệu sản phẩm trong trang quản trị. | Chỉ cập nhật sản phẩm được chọn, các sản phẩm khác không bị ảnh hưởng. | **Failed** | BUG-FR-15-001: Lưu cập nhật một sản phẩm làm đổi tên toàn bộ sản phẩm trong danh sách hiển thị. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/118) | [Issue #118](https://github.com/iamDicun/Group06_HW2_Testing/issues/118) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-15-001.png) |
| TC-IA04-013 | IA-04: Feedback / state | Admin Dashboard | Hiển thị kết quả import sản phẩm CSV. | Hiển thị 'Import thành công X sản phẩm' rõ ràng. | **Passed** |  |  |
| TC-IA04-014 | IA-04: Feedback / state | All Screens | Thông báo mất kết nối mạng. | Hiển thị banner cảnh báo offline thân thiện. | **Passed** |  |  |
| TC-IA04-015 | IA-04: Feedback / state | Checkout | Thông báo lỗi khi vượt quá tồn kho. | Cảnh báo và cập nhật lại số lượng tối đa mua được. | **Passed** |  |  |


---

## TASK 2 — USABILITY EVALUATION (ĐÁNH GIÁ ĐỘ KHẢ DỤNG)

Quá trình đánh giá usability được thực hiện chặt chẽ qua **3 giai đoạn** chuẩn hóa với **7 người dùng thực tế**.

### Phase 1 — Plan & Prepare (Lập kế hoạch & Chuẩn bị)
* **Mục tiêu (Objectives):** Xác định các nút thắt trong quá trình mua hàng của EShop, đo lường mức độ tin tưởng của người dùng đối với các trường thông tin nhạy cảm và tính điểm độ khả dụng bằng thang đo tiêu chuẩn SUS.
* **Kịch bản Nhiệm vụ (Task Scenario):** 
  > Bạn là khách hàng mới của EShop. Hãy truy cập trang web, đăng ký tài khoản mới, sau đó mua **2 chiếc iPhone** bằng cách áp mã giảm giá `GIAM20` và điền thông tin thanh toán cho đến khi đặt hàng thành công.
* **Công cụ đo lường:** Thang đo SUS (System Usability Scale) gồm 10 câu hỏi chuẩn hóa và bộ câu hỏi phỏng vấn sâu sau kiểm thử.

### Phase 2 — Conduct the Sessions (Tiến hành kiểm thử)
* **Phương pháp:** Kiểm thử trực tiếp có điều phối viên. Yêu cầu người dùng áp dụng phương pháp **Think Aloud** (nói ra suy nghĩ của mình khi thao tác). Ghi nhận các điểm gây ức chế (friction points) và quay video lưu trữ.

### Phase 3 — Analyse & Report (Phân tích & Báo cáo)

## 2. Thông Tin Khảo Sát Chi Tiết Của 7 Người Tham Gia (7 Participants SUS Details)

### 1. Thiều Quang Vinh - 0914***7350 - tqvinh23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | | x | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | x | | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | | x |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | x | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | x | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | x | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | | x |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | x | | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | | | x | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | x | | |

* **Điểm SUS:** **70.0** (Khá tốt)
* **Nhận xét của người dùng:** *"Dễ dùng vì đơn giản, nhưng tính năng không được đúng."*

---

### 2. Phạm Hoàng Anh - 0915***9054 - phanh23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | x | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | | x | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | x | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | | x | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | | x | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | x | | | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | x | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | x | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | x | | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | x | | | |

* **Điểm SUS:** **40.0** (Tệ)
* **Nhận xét của người dùng:** *"Không minh bạch, chưa tốt, khó hiểu, mâu thuẫn, khó sử dụng, phải tìm hiểu mới dùng được, không đúng với thực tế, không dám bỏ tiền cho hệ thống này."*

---

### 3. Nguyễn Huy Hoàng - 0389***4799 - nhhoang23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | x | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | x | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | | x |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | | | x |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | | x | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | | x | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | x | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | x | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | | | x | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | | | x |

* **Điểm SUS:** **42.5** (Yếu)
* **Nhận xét của người dùng:** *"Dễ dùng vì giao diện đơn giản, nhưng không thông báo, không tính năng đúng đắn."*

---

### 4. Hồ Đức Thuận - 0949***2448 - hdthuan23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | x | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | | x | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | x | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | | x | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | x | | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | | | x |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | x | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | | | x |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | x | | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | | x | |

* **Điểm SUS:** **17.5** (Quá tệ)
* **Nhận xét của người dùng:** *"Thiếu chức năng, khó sử dụng không tìm chỗ cần, không ai hướng dẫn, rời rạc, thiếu nhất quán không đồng bộ, tìm hiểu nhiều để sử dụng."*

---

### 5. Trần Mạnh Hùng - 0797***2222 - tmhung23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | x | | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | | x | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | x | | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | x | | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | x | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | | | x |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | x | | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | | | x | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | x | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | x | | | | |

* **Điểm SUS:** **35.0** (Tệ)
* **Nhận xét của người dùng:** *"Chưa thật sự lớn, UI/UX tệ, bug đơn giản mà không xử lý được, theo dõi đơn hàng không biết ở đâu, phải tự tìm hiểu nhiều, chức năng hoạt động không đúng, cần khắc phục để nâng cao trải nghiệm."*

---

### 6. Nguyễn Anh Khoa - 0855***1187 - nakhoa231@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | x | | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | | x | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | x | | | |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | x | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | | x | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | x | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | x | |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | | x | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | x | | | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | x | | |

* **Điểm SUS:** **50.0** (Trung bình yếu)
* **Nhận xét của người dùng:** *"Đổi được tiền nên không đáng tin, phức tạp, phải vào nhiều chỗ để làm cái khác, bị thiếu, hơi chậm không hiển thị chỗ nào nhấn được, không liên kết tốt, thiếu nhất quán."*

---

### 7. Nguyễn Thanh Tiến - 0938***4102 - nttien23@clc.fitus.edu.vn
* **Bảng câu hỏi SUS:**

| STT | Câu hỏi khảo sát SUS | 1 | 2 | 3 | 4 | 5 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống này thường xuyên. | | | x | | |
| 2 | Tôi cảm thấy hệ thống này phức tạp một cách không cần thiết. | x | | | | |
| 3 | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. | | | | | x |
| 4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một chuyên gia kỹ thuật để có thể sử dụng hệ thống này. | | | x | | |
| 5 | Tôi thấy các chức năng trong hệ thống này được liên kết rất tốt. | | x | | | |
| 6 | Tôi thấy hệ thống này quá thiếu nhất quán (mâu thuẫn giữa các phần). | | | x | | |
| 7 | Tôi tưởng tượng rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | | | | | x |
| 8 | Tôi thấy hệ thống này rất bất tiện và rườm rà khi sử dụng. | x | | | | |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | | | | x | |
| 10 | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | | | x | | |

* **Điểm SUS:** **70.0** (Khá tốt)
* **Nhận xét của người dùng:** *"Dễ dùng vì đơn giản, nhưng hệ thống tính năng hoạt động không ổn định."*

---

## 3. Tổng Kết Điểm Usability
* **Điểm SUS Trung Bình (Average SUS Score):** **46.43 / 100**
* **Xếp loại độ khả dụng:** **F (Unacceptable)** - Không đạt yêu cầu khả dụng do nhiều lỗi nghiệp vụ phá vỡ trải nghiệm mua hàng.

---

## 4. Ghi Chép Quan Sát Khi Người Dùng Thực Hiện (Observation Notes)
* **Đăng ký**: Người dùng bối rối vì nút Đăng ký màu đỏ và quy định regex mật khẩu bắt có khoảng trắng và chặn ký tự đặc biệt.
* **Đăng nhập**: Mật khẩu hiển thị dạng rõ (type="text") tạo cảm giác thiếu an toàn.
* **Giỏ hàng**: Nút Thêm vào giỏ phải bấm đúp (click đầu bị bỏ qua).
* **Checkout**: Tổng tiền cho sửa đổi tùy ý và áp mã SAVE10 nhân số tiền thanh toán lên 10 lần. Không có thông tin nhập địa chỉ nhận hàng.

---

## 5. Phân Loại Phát Hiện Lỗi Theo Mức Độ Nghiêm Trọng (Severity-Ranked Findings)

Dưới đây là bảng xếp hạng độ nghiêm trọng của 10 lỗi độ khả dụng (Usability) được phát hiện qua các phiên kiểm thử thực tế:

### 🔴 Blockers (Lỗi nghiêm trọng, phá hỏng luồng nghiệp vụ)
* **BUG-FR-08-001 (Tổng tiền sửa được)**: Ô Tổng tiền thanh toán cho phép người dùng tự ý chỉnh sửa giá tùy thích trước khi bấm đặt hàng.
* **BUG-FR-07-003 (Số lượng sản phẩm âm)**: Cho phép giảm hoặc gõ số lượng sản phẩm âm trong giỏ hàng, khiến tổng giá trị đơn hàng bị tính âm.
* **BUG-FR-09-001 (Mã giảm giá nhân 10 tiền)**: Áp dụng coupon SAVE10 làm tăng giá đơn hàng lên gấp 10 lần thay vì giảm 10%.

### 🟡 Major Issues (Lỗi gây cản trở lớn đến trải nghiệm người dùng)
* **BUG-FR-01-002 (Regex mật khẩu bị lỗi)**: Quy chuẩn regex quá khắt khe, cấm ký tự đặc biệt thông thường và bắt buộc có khoảng trắng khiến người dùng nhập mật khẩu đúng vẫn không đăng ký được.
* **BUG-FR-06-001 (Bấm nút thêm giỏ 2 lần)**: Nút 'Thêm vào giỏ hàng' ở trang chi tiết sản phẩm bắt buộc phải bấm đúp (lần click đầu tiên bị nuốt sự kiện).

### 🟢 Minor Issues (Lỗi giao diện hoặc bất tiện nhỏ)
* **BUG-FR-01-004 (Bất đồng bộ ngôn ngữ)**: Giao diện đa ngôn ngữ không nhất quán, hiển thị hỗn tạp tiếng Anh và tiếng Việt.
* **BUG-FR-02-001 (Sai tiêu đề trang Login)**: Tiêu đề trang đăng nhập hiển thị nhầm thành 'Đăng Ký'.
* **BUG-FR-07-002 (Thiếu toast thông báo trang chủ)**: Thêm sản phẩm ngoài trang chủ không có popup/toast phản hồi thành công khiến người dùng không chắc chắn.
* **BUG-FR-07-004 (Sản phẩm hiển thị rời rạc)**: Thêm cùng một sản phẩm nhiều lần không cộng dồn số lượng mà hiển thị thành nhiều dòng riêng biệt trong giỏ.
* **BUG-FR-11-001 (Khó tìm mục Đơn hàng)**: Không có nút truy cập trực tiếp lịch sử mua hàng từ Header, bắt buộc phải vào sâu trong Profile.


---

## TASK 3 — CROSS-BROWSER / CROSS-PLATFORM TESTING

Chúng tôi thực hiện sao chép và kiểm thử toàn bộ danh sách **60 mục checklist** trên cả 3 trình duyệt để so sánh đối chiếu: **Google Chrome**, **Mozilla Firefox (Desktop)**, và **Safari (iOS Mobile)**.

### 1. Bảng Checklist Đầy Đủ Trên Google Chrome

| ID | Aspect | Màn hình | Mô tả | Kết quả mong đợi | Trạng thái | Ghi chú | Minh chứng |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| TC-IA01-001 | IA-01: General UI | All Screens | Tính nhất quán của ngôn ngữ hiển thị (Bilingual consistency) và font chữ trên toàn trang web. | Hệ thống hiển thị đồng bộ bằng một ngôn ngữ (Tiếng Việt), không xen lẫn tiếng Anh. | **Failed** | BUG-FR-01-004: Giao diện đa ngôn ngữ hiển thị không nhất quán (lúc Tiếng Anh, lúc Tiếng Việt). [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/120) | [Issue #120](https://github.com/iamDicun/Group06_HW2_Testing/issues/120) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-004.png) |
| TC-IA01-002 | IA-01: General UI | All Screens | Tính nhất quán của bảng màu chủ đạo (Blue-600) theo thiết kế thương hiệu. | Các nút bấm chính sử dụng màu xanh chủ đạo, không pha trộn màu lạ. | **Failed** | BUG-FR-01-001: Nút submit Đăng ký có màu đỏ (bg-red-500) không nhất quán với màu xanh chủ đạo. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/110) | [Issue #110](https://github.com/iamDicun/Group06_HW2_Testing/issues/110) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-001.png) |
| TC-IA01-003 | IA-01: General UI | All Screens | Độ tương phản màu sắc giữa chữ và nền (WCAG 2.0). | Đạt tỷ lệ tương phản tối thiểu 4.5:1 để dễ đọc. | **Passed** |  |  |
| TC-IA01-004 | IA-01: General UI | Cart | Tính gộp nhóm và bố cục hiển thị của danh sách các sản phẩm cùng loại trong giỏ hàng. | Các sản phẩm cùng loại được gộp chung thành một dòng và cộng dồn số lượng. | **Failed** | BUG-FR-07-004: Các sản phẩm cùng loại khi thêm nhiều lần không gộp chung số lượng mà hiển thị rời rạc. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/125) | [Issue #125](https://github.com/iamDicun/Group06_HW2_Testing/issues/125) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-004.png) |
| TC-IA01-005 | IA-01: General UI | All Screens | Khả năng co giãn giao diện (Responsiveness) trên thiết bị di động. | Giao diện tự động co giãn không bị vỡ khung hoặc mất chữ. | **Passed** |  |  |
| TC-IA01-006 | IA-01: General UI | All Screens | Đường dẫn Logo ở Header chuyển hướng về trang chủ. | Bấm vào logo 'EShop' trên header luôn quay về trang chủ '/'. | **Passed** |  |  |
| TC-IA01-007 | IA-01: General UI | All Screens | Tính đồng bộ của Header và Footer trên toàn bộ trang web. | Header và Footer hiển thị nhất quán trên mọi route. | **Passed** |  |  |
| TC-IA01-008 | IA-01: General UI | All Screens | Trạng thái hover của các đường liên kết và các nút nhấn. | Con trỏ chuột đổi thành dạng bàn tay khi hover qua link/nút. | **Passed** |  |  |
| TC-IA01-009 | IA-01: General UI | All Screens | Tỷ lệ khung hình và độ sắc nét của hình ảnh sản phẩm. | Hình ảnh hiển thị đúng tỷ lệ, không bị kéo dẹt hay mờ. | **Passed** |  |  |
| TC-IA01-010 | IA-01: General UI | All Screens | Tốc độ tải tài nguyên hình ảnh tối ưu hóa. | Ảnh dung lượng nhẹ, tải nhanh không gây trễ trang. | **Passed** |  |  |
| TC-IA01-011 | IA-01: General UI | Admin Dashboard | Sự chính xác và nhất quán trong hiển thị số liệu báo cáo trên Dashboard trang quản trị. | Tổng doanh thu hiển thị chính xác theo tổng các đơn hàng, không bị nhân đôi. | **Failed** | BUG-FR-13-001: Tổng doanh thu hiển thị trên Dashboard bị tính nhân đôi sai lệch thực tế. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/117) | [Issue #117](https://github.com/iamDicun/Group06_HW2_Testing/issues/117) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-13-001.png) |
| TC-IA01-012 | IA-01: General UI | All Screens | Không xuất hiện thanh cuộn ngang không mong muốn ở chế độ desktop. | Trang web chỉ cuộn dọc, nội dung nằm trọn trong trang. | **Passed** |  |  |
| TC-IA01-013 | IA-01: General UI | All Screens | Favicon và tiêu đề trang hiển thị đúng khi chuyển đổi trang. | Tiêu đề tab trình duyệt thay đổi tương ứng theo trang. | **Passed** |  |  |
| TC-IA01-014 | IA-01: General UI | All Screens | Khoảng cách đệm (Padding/Margin) giữa các khối nội dung cân đối. | Không có văn bản nào nằm sát viền màn hình. | **Passed** |  |  |
| TC-IA01-015 | IA-01: General UI | All Screens | Trang báo lỗi 404 hiển thị khi người dùng truy cập link sai. | Hiển thị giao diện 404 thân thiện kèm nút quay về trang chủ. | **Passed** |  |  |
| TC-IA02-001 | IA-02: Forms | Register / Login | Các ô nhập liệu phải có placeholder gợi ý rõ ràng. | Ô email hiển thị placeholder ví dụ như nhap@email.com. | **Passed** |  |  |
| TC-IA02-002 | IA-02: Forms | Register / Login | Mật khẩu khi nhập vào mặc định phải được ẩn (dạng dấu chấm hoặc dấu sao). | Input mật khẩu có thuộc tính type="password" để ẩn chữ. | **Failed** | BUG-FR-02-002: Ô mật khẩu đăng nhập hiển thị ký tự thường (dạng text) thay vì bị ẩn. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/112) | [Issue #112](https://github.com/iamDicun/Group06_HW2_Testing/issues/112) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-002.png) |
| TC-IA02-003 | IA-02: Forms | Register / Login | Sự chính xác và nhất quán của các tiêu đề biểu mẫu (Form titles/headers). | Tiêu đề biểu mẫu đăng nhập phải ghi rõ 'Đăng nhập', không ghi nhầm thành 'Đăng ký'. | **Failed** | BUG-FR-02-001: Tiêu đề trang đăng nhập hiển thị sai thành "Đăng Ký". [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/121) | [Issue #121](https://github.com/iamDicun/Group06_HW2_Testing/issues/121) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-001.png) |
| TC-IA02-004 | IA-02: Forms | Register / Login | Kiểm tra định dạng email hợp lệ khi nhập và submit form. | Trường email sử dụng thuộc tính type="email" để tự động xác thực định dạng. | **Failed** | BUG-FR-01-003: Ô nhập Email ở trang Đăng ký có kiểu dữ liệu là "text" thay vì "email". [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/111) | [Issue #111](https://github.com/iamDicun/Group06_HW2_Testing/issues/111) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-003.png) |
| TC-IA02-005 | IA-02: Forms | Register | Kiểm tra tính đúng đắn của logic kiểm tra độ mạnh yếu mật khẩu khi đăng ký. | Chấp nhận các mật khẩu mạnh có ký tự đặc biệt thông thường, không bắt khoảng trắng. | **Failed** | BUG-FR-01-002: Nhập mật khẩu thông thường không đăng ký được do regex quá nghiêm ngặt và sai logic. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/119) | [Issue #119](https://github.com/iamDicun/Group06_HW2_Testing/issues/119) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-01-002.png) |
| TC-IA02-006 | IA-02: Forms | ForgotPassword | Thiếu ô xác nhận mật khẩu mới khi thực hiện đặt lại mật khẩu. | Biểu mẫu đổi mật khẩu bắt buộc phải có trường nhập Xác nhận lại mật khẩu mới. | **Failed** | BUG-FR-03-001: Thiếu trường Xác nhận mật khẩu mới khi đặt lại mật khẩu. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/114) | [Issue #114](https://github.com/iamDicun/Group06_HW2_Testing/issues/114) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-03-001.png) |
| TC-IA02-007 | IA-02: Forms | Register / Login | Độ tương phản và vị trí hiển thị của các thông báo lỗi. | Thông báo lỗi màu đỏ nổi bật dưới trường bị trống. | **Passed** |  |  |
| TC-IA02-008 | IA-02: Forms | All Forms | Thứ tự điều hướng bằng phím Tab (Tab Index) trên các form. | Con trỏ di chuyển tuần tự từ trên xuống dưới một cách hợp lý. | **Passed** |  |  |
| TC-IA02-009 | IA-02: Forms | Checkout | Kiểm soát khả năng sửa đổi các trường hiển thị tổng tiền/giá trị giao dịch trên biểu mẫu. | Tổng tiền cần thanh toán phải khóa (Read-only), không cho người dùng sửa đổi. | **Failed** | BUG-FR-08-001: Tổng tiền thanh toán hiển thị dưới dạng ô Input cho phép chỉnh sửa tự do. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/126) | [Issue #126](https://github.com/iamDicun/Group06_HW2_Testing/issues/126) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-08-001.png) |
| TC-IA02-010 | IA-02: Forms | Profile | Kiểm tra tính năng lưu thay đổi thông tin profile khi nhập ký tự lạ. | Hệ thống xử lý an toàn, không lỗi database. | **Passed** |  |  |
| TC-IA02-011 | IA-02: Forms | Cart | Kiểm tra tính hợp lệ của trường nhập số lượng sản phẩm trong giỏ hàng (chống số lượng âm). | Số lượng sản phẩm trong giỏ hàng phải luôn >= 1, chặn hoàn toàn các giá trị âm. | **Failed** | BUG-FR-07-003: Cho phép người dùng chỉnh số lượng sản phẩm xuống giá trị âm. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/124) | [Issue #124](https://github.com/iamDicun/Group06_HW2_Testing/issues/124) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-003.png) |
| TC-IA02-012 | IA-02: Forms | Checkout | Sự hiện diện đầy đủ của các trường thông tin giao nhận hàng bắt buộc ở trang Checkout. | Hiển thị đầy đủ các trường nhập Tên người nhận, SĐT và Địa chỉ nhận hàng. | **Failed** | BUG-FR-08-002: Trang thanh toán thiếu hoàn toàn các ô điền thông tin giao nhận hàng. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/116) | [Issue #116](https://github.com/iamDicun/Group06_HW2_Testing/issues/116) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-08-002.png) |
| TC-IA02-013 | IA-02: Forms | ForgotPassword | Nút gửi mã OTP có bộ đếm ngược thời gian chờ gửi lại. | Hiển thị cooldown đếm ngược trước khi cho bấm gửi lại. | **Passed** |  |  |
| TC-IA02-014 | IA-02: Forms | All Forms | Nút xóa dữ liệu (Reset/Clear) hoạt động đúng. | Xóa sạch dữ liệu đã nhập trong các ô khi bấm nút clear. | **Passed** |  |  |
| TC-IA02-015 | IA-02: Forms | Register | Ngăn chặn đăng ký tài khoản trùng lặp email. | Thông báo lỗi rõ ràng nếu email đã tồn tại. | **Passed** |  |  |
| TC-IA03-001 | IA-03: Navigation | All Screens | Thanh điều hướng Header cố định ở đầu trang khi cuộn. | Header luôn ghim trên cùng khi cuộn trang xuống. | **Passed** |  |  |
| TC-IA03-002 | IA-03: Navigation | All Screens | Trạng thái hoạt động (Active state) của trang hiện tại. | Mục trang hiện tại trên header được tô đậm hoặc đổi màu. | **Passed** |  |  |
| TC-IA03-003 | IA-03: Navigation | All Screens | Tự động chuyển hướng khách vãng lai về Login. | Cố truy cập profile/checkout khi chưa login phải bị đá về login. | **Passed** |  |  |
| TC-IA03-004 | IA-03: Navigation | All Screens | Phím Back của trình duyệt hoạt động đúng. | Quay về trang trước đó bình thường, không bị lặp route. | **Passed** |  |  |
| TC-IA03-005 | IA-03: Navigation | Home | Khả năng lọc sản phẩm theo danh mục. | Bấm danh mục cập nhật sản phẩm tương ứng lập tức. | **Passed** |  |  |
| TC-IA03-006 | IA-03: Navigation | Home | Tìm kiếm sản phẩm cập nhật danh sách hiển thị. | Gõ từ khóa tìm kiếm hiển thị sản phẩm liên quan ngay. | **Passed** |  |  |
| TC-IA03-007 | IA-03: Navigation | ProductDetail | Liên kết quay lại từ chi tiết sản phẩm. | Nút quay lại đưa người dùng về đúng vị trí trang chủ. | **Passed** |  |  |
| TC-IA03-008 | IA-03: Navigation | Cart | Nút Tiến hành thanh toán chuyển hướng. | Dẫn hướng chính xác sang trang checkout `/checkout`. | **Passed** |  |  |
| TC-IA03-009 | IA-03: Navigation | ForgotPassword | Sự phân biệt trực quan và nhất quán của các nút điều hướng phụ. | Nút 'Quay lại' có màu sắc trung tính (ví dụ: xám) phân biệt rõ với nút hành động chính. | **Failed** | BUG-FR-03-002: Nút 'Quay lại' có màu sắc xanh lá giống hệt nút submit Đặt lại mật khẩu. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/115) | [Issue #115](https://github.com/iamDicun/Group06_HW2_Testing/issues/115) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-03-002.png) |
| TC-IA03-010 | IA-03: Navigation | Home | Khả năng điều hướng trực quan đến lịch sử đơn hàng và trang cá nhân từ trang chủ. | Có liên kết rõ ràng trên Header giúp người dùng vào xem lịch sử đơn hàng nhanh chóng. | **Failed** | BUG-FR-11-001: Người dùng gặp khó khăn khi tìm kiếm chức năng Theo dõi đơn hàng (Lịch sử mua hàng). [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/128) | [Issue #128](https://github.com/iamDicun/Group06_HW2_Testing/issues/128) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-11-001.png) |
| TC-IA03-011 | IA-03: Navigation | Admin Dashboard | Thanh Menu bên cạnh của trang Admin. | Bấm Category/Product/Order chuyển trang chính xác. | **Passed** |  |  |
| TC-IA03-012 | IA-03: Navigation | All Screens | Quyền truy cập trang Admin bị chặn với user thường. | Tài khoản thường cố vào admin hiển thị lỗi 403 hoặc đá về trang chủ. | **Passed** |  |  |
| TC-IA03-013 | IA-03: Navigation | All Screens | Tốc độ chuyển đổi giữa các trang. | Các trang chuyển đổi mượt mà không đơ quá 2 giây. | **Passed** |  |  |
| TC-IA03-014 | IA-03: Navigation | ProductDetail | Đường dẫn Breadcrumbs hiển thị rõ. | Người dùng thấy rõ cấp danh mục sản phẩm đang xem. | **Passed** |  |  |
| TC-IA03-015 | IA-03: Navigation | All Screens | Đóng hamburger menu khi bấm ra ngoài. | Menu tự ẩn khi chạm vùng trống bên ngoài trên mobile. | **Passed** |  |  |
| TC-IA04-001 | IA-04: Feedback / state | Register | Toast thông báo thành công sau khi đăng ký. | Popup đăng ký thành công xuất hiện rồi tự ẩn sau 3s. | **Passed** |  |  |
| TC-IA04-002 | IA-04: Feedback / state | Login | Cơ chế khóa tài khoản và hiển thị thông báo phản hồi khi đăng nhập sai. | Tài khoản chỉ bị khóa sau đúng 3 lần sai liên tiếp và hiển thị thông báo khóa. | **Failed** | BUG-FR-02-003: Tài khoản bị khóa chỉ sau 2 lần đăng nhập sai thay vị 3 lần. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/113) | [Issue #113](https://github.com/iamDicun/Group06_HW2_Testing/issues/113) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-02-003.png) |
| TC-IA04-003 | IA-04: Feedback / state | Home | Hiển thị thông báo phản hồi trực quan (Toast/Popup) khi người dùng thêm sản phẩm vào giỏ hàng từ trang chủ. | Hiển thị thông báo 'Đã thêm vào giỏ hàng thành công' ngay lập tức. | **Failed** | BUG-FR-07-002: Thêm sản phẩm từ trang chủ không có thông báo phản hồi trực quan. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/123) | [Issue #123](https://github.com/iamDicun/Group06_HW2_Testing/issues/123) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-07-002.png) |
| TC-IA04-004 | IA-04: Feedback / state | ProductDetail | Phản hồi tức thì và sự chính xác khi nhấn nút 'Thêm vào giỏ hàng' ở trang Chi tiết sản phẩm. | Sản phẩm được thêm vào giỏ ngay ở lần nhấn đầu tiên và hiện toast thành công. | **Failed** | BUG-FR-06-001: Nút 'Thêm vào giỏ hàng' không hoạt động ở lần click đầu tiên, yêu cầu bấm đúp. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/122) | [Issue #122](https://github.com/iamDicun/Group06_HW2_Testing/issues/122) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-06-001.png) |
| TC-IA04-005 | IA-04: Feedback / state | Cart | Thông báo hiển thị khi giỏ hàng trống. | Hiện thông báo trống và nút 'Tiếp tục mua sắm'. | **Passed** |  |  |
| TC-IA04-006 | IA-04: Feedback / state | Cart | Cảnh báo xác nhận khi xóa sản phẩm. | Hiển thị popup hỏi người dùng trước khi xóa. | **Passed** |  |  |
| TC-IA04-007 | IA-04: Feedback / state | Checkout | Sự chính xác và phản hồi trực quan khi áp dụng mã giảm giá (Coupon). | Mã giảm giá được tính toán chính xác và hiển thị thông báo thành công. | **Failed** | BUG-FR-09-001: Áp mã giảm giá phần trăm 'SAVE10' làm tăng giá trị đơn hàng lên gấp 10 lần. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/127) | [Issue #127](https://github.com/iamDicun/Group06_HW2_Testing/issues/127) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-09-001.png) |
| TC-IA04-008 | IA-04: Feedback / state | Checkout | Trang xác nhận đặt hàng thành công. | Hiển thị mã đơn hàng và lời cảm ơn sau thanh toán. | **Passed** |  |  |
| TC-IA04-009 | IA-04: Feedback / state | All Screens | Trạng thái đang tải (Loading Spinner). | Hiện skeleton loader khi đang tải dữ liệu. | **Passed** |  |  |
| TC-IA04-010 | IA-04: Feedback / state | Home | Thông báo kết quả tìm kiếm trống. | Hiện 'Không tìm thấy sản phẩm' khi gõ từ khóa lạ. | **Passed** |  |  |
| TC-IA04-011 | IA-04: Feedback / state | Profile | Thông báo lưu profile thành công. | Hiện toast báo lưu thông tin cá nhân thành công. | **Passed** |  |  |
| TC-IA04-012 | IA-04: Feedback / state | Admin Dashboard | Phản hồi và tính chính xác khi thực hiện thao tác cập nhật (UPDATE) dữ liệu sản phẩm trong trang quản trị. | Chỉ cập nhật sản phẩm được chọn, các sản phẩm khác không bị ảnh hưởng. | **Failed** | BUG-FR-15-001: Lưu cập nhật một sản phẩm làm đổi tên toàn bộ sản phẩm trong danh sách hiển thị. [GitHub Issue](https://github.com/iamDicun/Group06_HW2_Testing/issues/118) | [Issue #118](https://github.com/iamDicun/Group06_HW2_Testing/issues/118) \| [Ảnh](bug-report/evidence/chrome/BUG-FR-15-001.png) |
| TC-IA04-013 | IA-04: Feedback / state | Admin Dashboard | Hiển thị kết quả import sản phẩm CSV. | Hiển thị 'Import thành công X sản phẩm' rõ ràng. | **Passed** |  |  |
| TC-IA04-014 | IA-04: Feedback / state | All Screens | Thông báo mất kết nối mạng. | Hiển thị banner cảnh báo offline thân thiện. | **Passed** |  |  |
| TC-IA04-015 | IA-04: Feedback / state | Checkout | Thông báo lỗi khi vượt quá tồn kho. | Cảnh báo và cập nhật lại số lượng tối đa mua được. | **Passed** |  |  |


---

### 2. Bảng Checklist Đầy Đủ Trên Mozilla Firefox (Desktop)

| ID | Aspect | Màn hình | Mô tả | Kết quả mong đợi | Trạng thái | Ghi chú | Minh chứng |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| TC-IA01-001 | IA-01: General UI | All Screens | Tính nhất quán của ngôn ngữ hiển thị (Bilingual consistency) và font chữ trên toàn trang web. | Hệ thống hiển thị đồng bộ bằng một ngôn ngữ (Tiếng Việt), không xen lẫn tiếng Anh. | **Failed** | BUG-FR-01-004: Giao diện đa ngôn ngữ hiển thị không nhất quán (lúc Tiếng Anh, lúc Tiếng Việt). | [Ảnh](bug-report/evidence/firefox/BUG-FR-01-004.png) |
| TC-IA01-002 | IA-01: General UI | All Screens | Tính nhất quán của bảng màu chủ đạo (Blue-600) theo thiết kế thương hiệu. | Các nút bấm chính sử dụng màu xanh chủ đạo, không pha trộn màu lạ. | **Failed** | BUG-FR-01-001: Nút submit Đăng ký có màu đỏ (bg-red-500) không nhất quán với màu xanh chủ đạo. | [Ảnh](bug-report/evidence/firefox/BUG-FR-01-001.png) |
| TC-IA01-003 | IA-01: General UI | All Screens | Độ tương phản màu sắc giữa chữ và nền (WCAG 2.0). | Đạt tỷ lệ tương phản tối thiểu 4.5:1 để dễ đọc. | **Passed** |  |  |
| TC-IA01-004 | IA-01: General UI | Cart | Tính gộp nhóm và bố cục hiển thị của danh sách các sản phẩm cùng loại trong giỏ hàng. | Các sản phẩm cùng loại được gộp chung thành một dòng và cộng dồn số lượng. | **Failed** | BUG-FR-07-004: Các sản phẩm cùng loại khi thêm nhiều lần không gộp chung số lượng mà hiển thị rời rạc. | [Ảnh](bug-report/evidence/firefox/BUG-FR-07-004.png) |
| TC-IA01-005 | IA-01: General UI | All Screens | Khả năng co giãn giao diện (Responsiveness) trên thiết bị di động. | Giao diện tự động co giãn không bị vỡ khung hoặc mất chữ. | **Passed** |  |  |
| TC-IA01-006 | IA-01: General UI | All Screens | Đường dẫn Logo ở Header chuyển hướng về trang chủ. | Bấm vào logo 'EShop' trên header luôn quay về trang chủ '/'. | **Passed** |  |  |
| TC-IA01-007 | IA-01: General UI | All Screens | Tính đồng bộ của Header và Footer trên toàn bộ trang web. | Header và Footer hiển thị nhất quán trên mọi route. | **Passed** |  |  |
| TC-IA01-008 | IA-01: General UI | All Screens | Trạng thái hover của các đường liên kết và các nút nhấn. | Con trỏ chuột đổi thành dạng bàn tay khi hover qua link/nút. | **Passed** |  |  |
| TC-IA01-009 | IA-01: General UI | All Screens | Tỷ lệ khung hình và độ sắc nét của hình ảnh sản phẩm. | Hình ảnh hiển thị đúng tỷ lệ, không bị kéo dẹt hay mờ. | **Passed** |  |  |
| TC-IA01-010 | IA-01: General UI | All Screens | Tốc độ tải tài nguyên hình ảnh tối ưu hóa. | Ảnh dung lượng nhẹ, tải nhanh không gây trễ trang. | **Passed** |  |  |
| TC-IA01-011 | IA-01: General UI | Admin Dashboard | Sự chính xác và nhất quán trong hiển thị số liệu báo cáo trên Dashboard trang quản trị. | Tổng doanh thu hiển thị chính xác theo tổng các đơn hàng, không bị nhân đôi. | **Failed** | BUG-FR-13-001: Tổng doanh thu hiển thị trên Dashboard bị tính nhân đôi sai lệch thực tế. | [Ảnh](bug-report/evidence/firefox/BUG-FR-13-001.png) |
| TC-IA01-012 | IA-01: General UI | All Screens | Không xuất hiện thanh cuộn ngang không mong muốn ở chế độ desktop. | Trang web chỉ cuộn dọc, nội dung nằm trọn trong trang. | **Passed** |  |  |
| TC-IA01-013 | IA-01: General UI | All Screens | Favicon và tiêu đề trang hiển thị đúng khi chuyển đổi trang. | Tiêu đề tab trình duyệt thay đổi tương ứng theo trang. | **Passed** |  |  |
| TC-IA01-014 | IA-01: General UI | All Screens | Khoảng cách đệm (Padding/Margin) giữa các khối nội dung cân đối. | Không có văn bản nào nằm sát viền màn hình. | **Passed** |  |  |
| TC-IA01-015 | IA-01: General UI | All Screens | Trang báo lỗi 404 hiển thị khi người dùng truy cập link sai. | Hiển thị giao diện 404 thân thiện kèm nút quay về trang chủ. | **Passed** |  |  |
| TC-IA02-001 | IA-02: Forms | Register / Login | Các ô nhập liệu phải có placeholder gợi ý rõ ràng. | Ô email hiển thị placeholder ví dụ như nhap@email.com. | **Passed** |  |  |
| TC-IA02-002 | IA-02: Forms | Register / Login | Mật khẩu khi nhập vào mặc định phải được ẩn (dạng dấu chấm hoặc dấu sao). | Input mật khẩu có thuộc tính type="password" để ẩn chữ. | **Failed** | BUG-FR-02-002: Ô mật khẩu đăng nhập hiển thị ký tự thường (dạng text) thay vì bị ẩn. | [Ảnh](bug-report/evidence/firefox/BUG-FR-02-002.png) |
| TC-IA02-003 | IA-02: Forms | Register / Login | Sự chính xác và nhất quán của các tiêu đề biểu mẫu (Form titles/headers). | Tiêu đề biểu mẫu đăng nhập phải ghi rõ 'Đăng nhập', không ghi nhầm thành 'Đăng ký'. | **Failed** | BUG-FR-02-001: Tiêu đề trang đăng nhập hiển thị sai thành "Đăng Ký". | [Ảnh](bug-report/evidence/firefox/BUG-FR-02-001.png) |
| TC-IA02-004 | IA-02: Forms | Register / Login | Kiểm tra định dạng email hợp lệ khi nhập và submit form. | Trường email sử dụng thuộc tính type="email" để tự động xác thực định dạng. | **Failed** | BUG-FR-01-003: Ô nhập Email ở trang Đăng ký có kiểu dữ liệu là "text" thay vì "email". | [Ảnh](bug-report/evidence/firefox/BUG-FR-01-003.png) |
| TC-IA02-005 | IA-02: Forms | Register | Kiểm tra tính đúng đắn của logic kiểm tra độ mạnh yếu mật khẩu khi đăng ký. | Chấp nhận các mật khẩu mạnh có ký tự đặc biệt thông thường, không bắt khoảng trắng. | **Failed** | BUG-FR-01-002: Nhập mật khẩu thông thường không đăng ký được do regex quá nghiêm ngặt và sai logic. | [Ảnh](bug-report/evidence/firefox/BUG-FR-01-002.png) |
| TC-IA02-006 | IA-02: Forms | ForgotPassword | Thiếu ô xác nhận mật khẩu mới khi thực hiện đặt lại mật khẩu. | Biểu mẫu đổi mật khẩu bắt buộc phải có trường nhập Xác nhận lại mật khẩu mới. | **Failed** | BUG-FR-03-001: Thiếu trường Xác nhận mật khẩu mới khi đặt lại mật khẩu. | [Ảnh](bug-report/evidence/firefox/BUG-FR-03-001.png) |
| TC-IA02-007 | IA-02: Forms | Register / Login | Độ tương phản và vị trí hiển thị của các thông báo lỗi. | Thông báo lỗi màu đỏ nổi bật dưới trường bị trống. | **Passed** |  |  |
| TC-IA02-008 | IA-02: Forms | All Forms | Thứ tự điều hướng bằng phím Tab (Tab Index) trên các form. | Con trỏ di chuyển tuần tự từ trên xuống dưới một cách hợp lý. | **Passed** |  |  |
| TC-IA02-009 | IA-02: Forms | Checkout | Kiểm soát khả năng sửa đổi các trường hiển thị tổng tiền/giá trị giao dịch trên biểu mẫu. | Tổng tiền cần thanh toán phải khóa (Read-only), không cho người dùng sửa đổi. | **Failed** | BUG-FR-08-001: Tổng tiền thanh toán hiển thị dưới dạng ô Input cho phép chỉnh sửa tự do. | [Ảnh](bug-report/evidence/firefox/BUG-FR-08-001.png) |
| TC-IA02-010 | IA-02: Forms | Profile | Kiểm tra tính năng lưu thay đổi thông tin profile khi nhập ký tự lạ. | Hệ thống xử lý an toàn, không lỗi database. | **Passed** |  |  |
| TC-IA02-011 | IA-02: Forms | Cart | Kiểm tra tính hợp lệ của trường nhập số lượng sản phẩm trong giỏ hàng (chống số lượng âm). | Số lượng sản phẩm trong giỏ hàng phải luôn >= 1, chặn hoàn toàn các giá trị âm. | **Failed** | BUG-FR-07-003: Cho phép người dùng chỉnh số lượng sản phẩm xuống giá trị âm. | [Ảnh](bug-report/evidence/firefox/BUG-FR-07-003.png) |
| TC-IA02-012 | IA-02: Forms | Checkout | Sự hiện diện đầy đủ của các trường thông tin giao nhận hàng bắt buộc ở trang Checkout. | Hiển thị đầy đủ các trường nhập Tên người nhận, SĐT và Địa chỉ nhận hàng. | **Failed** | BUG-FR-08-002: Trang thanh toán thiếu hoàn toàn các ô điền thông tin giao nhận hàng. | [Ảnh](bug-report/evidence/firefox/BUG-FR-08-002.png) |
| TC-IA02-013 | IA-02: Forms | ForgotPassword | Nút gửi mã OTP có bộ đếm ngược thời gian chờ gửi lại. | Hiển thị cooldown đếm ngược trước khi cho bấm gửi lại. | **Passed** |  |  |
| TC-IA02-014 | IA-02: Forms | All Forms | Nút xóa dữ liệu (Reset/Clear) hoạt động đúng. | Xóa sạch dữ liệu đã nhập trong các ô khi bấm nút clear. | **Passed** |  |  |
| TC-IA02-015 | IA-02: Forms | Register | Ngăn chặn đăng ký tài khoản trùng lặp email. | Thông báo lỗi rõ ràng nếu email đã tồn tại. | **Passed** |  |  |
| TC-IA03-001 | IA-03: Navigation | All Screens | Thanh điều hướng Header cố định ở đầu trang khi cuộn. | Header luôn ghim trên cùng khi cuộn trang xuống. | **Passed** |  |  |
| TC-IA03-002 | IA-03: Navigation | All Screens | Trạng thái hoạt động (Active state) của trang hiện tại. | Mục trang hiện tại trên header được tô đậm hoặc đổi màu. | **Passed** |  |  |
| TC-IA03-003 | IA-03: Navigation | All Screens | Tự động chuyển hướng khách vãng lai về Login. | Cố truy cập profile/checkout khi chưa login phải bị đá về login. | **Passed** |  |  |
| TC-IA03-004 | IA-03: Navigation | All Screens | Phím Back của trình duyệt hoạt động đúng. | Quay về trang trước đó bình thường, không bị lặp route. | **Passed** |  |  |
| TC-IA03-005 | IA-03: Navigation | Home | Khả năng lọc sản phẩm theo danh mục. | Bấm danh mục cập nhật sản phẩm tương ứng lập tức. | **Passed** |  |  |
| TC-IA03-006 | IA-03: Navigation | Home | Tìm kiếm sản phẩm cập nhật danh sách hiển thị. | Gõ từ khóa tìm kiếm hiển thị sản phẩm liên quan ngay. | **Passed** |  |  |
| TC-IA03-007 | IA-03: Navigation | ProductDetail | Liên kết quay lại từ chi tiết sản phẩm. | Nút quay lại đưa người dùng về đúng vị trí trang chủ. | **Passed** |  |  |
| TC-IA03-008 | IA-03: Navigation | Cart | Nút Tiến hành thanh toán chuyển hướng. | Dẫn hướng chính xác sang trang checkout `/checkout`. | **Passed** |  |  |
| TC-IA03-009 | IA-03: Navigation | ForgotPassword | Sự phân biệt trực quan và nhất quán của các nút điều hướng phụ. | Nút 'Quay lại' có màu sắc trung tính (ví dụ: xám) phân biệt rõ với nút hành động chính. | **Failed** | BUG-FR-03-002: Nút 'Quay lại' có màu sắc xanh lá giống hệt nút submit Đặt lại mật khẩu. | [Ảnh](bug-report/evidence/firefox/BUG-FR-03-002.png) |
| TC-IA03-010 | IA-03: Navigation | Home | Khả năng điều hướng trực quan đến lịch sử đơn hàng và trang cá nhân từ trang chủ. | Có liên kết rõ ràng trên Header giúp người dùng vào xem lịch sử đơn hàng nhanh chóng. | **Failed** | BUG-FR-11-001: Người dùng gặp khó khăn khi tìm kiếm chức năng Theo dõi đơn hàng (Lịch sử mua hàng). | [Ảnh](bug-report/evidence/firefox/BUG-FR-11-001.png) |
| TC-IA03-011 | IA-03: Navigation | Admin Dashboard | Thanh Menu bên cạnh của trang Admin. | Bấm Category/Product/Order chuyển trang chính xác. | **Passed** |  |  |
| TC-IA03-012 | IA-03: Navigation | All Screens | Quyền truy cập trang Admin bị chặn với user thường. | Tài khoản thường cố vào admin hiển thị lỗi 403 hoặc đá về trang chủ. | **Passed** |  |  |
| TC-IA03-013 | IA-03: Navigation | All Screens | Tốc độ chuyển đổi giữa các trang. | Các trang chuyển đổi mượt mà không đơ quá 2 giây. | **Passed** |  |  |
| TC-IA03-014 | IA-03: Navigation | ProductDetail | Đường dẫn Breadcrumbs hiển thị rõ. | Người dùng thấy rõ cấp danh mục sản phẩm đang xem. | **Passed** |  |  |
| TC-IA03-015 | IA-03: Navigation | All Screens | Đóng hamburger menu khi bấm ra ngoài. | Menu tự ẩn khi chạm vùng trống bên ngoài trên mobile. | **Passed** |  |  |
| TC-IA04-001 | IA-04: Feedback / state | Register | Toast thông báo thành công sau khi đăng ký. | Popup đăng ký thành công xuất hiện rồi tự ẩn sau 3s. | **Passed** |  |  |
| TC-IA04-002 | IA-04: Feedback / state | Login | Cơ chế khóa tài khoản và hiển thị thông báo phản hồi khi đăng nhập sai. | Tài khoản chỉ bị khóa sau đúng 3 lần sai liên tiếp và hiển thị thông báo khóa. | **Failed** | BUG-FR-02-003: Tài khoản bị khóa chỉ sau 2 lần đăng nhập sai thay vị 3 lần. | [Ảnh](bug-report/evidence/firefox/BUG-FR-02-003.png) |
| TC-IA04-003 | IA-04: Feedback / state | Home | Hiển thị thông báo phản hồi trực quan (Toast/Popup) khi người dùng thêm sản phẩm vào giỏ hàng từ trang chủ. | Hiển thị thông báo 'Đã thêm vào giỏ hàng thành công' ngay lập tức. | **Failed** | BUG-FR-07-002: Thêm sản phẩm từ trang chủ không có thông báo phản hồi trực quan. | [Ảnh](bug-report/evidence/firefox/BUG-FR-07-002.png) |
| TC-IA04-004 | IA-04: Feedback / state | ProductDetail | Phản hồi tức thì và sự chính xác khi nhấn nút 'Thêm vào giỏ hàng' ở trang Chi tiết sản phẩm. | Sản phẩm được thêm vào giỏ ngay ở lần nhấn đầu tiên và hiện toast thành công. | **Failed** | BUG-FR-06-001: Nút 'Thêm vào giỏ hàng' không hoạt động ở lần click đầu tiên, yêu cầu bấm đúp. | [Ảnh](bug-report/evidence/firefox/BUG-FR-06-001.png) |
| TC-IA04-005 | IA-04: Feedback / state | Cart | Thông báo hiển thị khi giỏ hàng trống. | Hiện thông báo trống và nút 'Tiếp tục mua sắm'. | **Passed** |  |  |
| TC-IA04-006 | IA-04: Feedback / state | Cart | Cảnh báo xác nhận khi xóa sản phẩm. | Hiển thị popup hỏi người dùng trước khi xóa. | **Passed** |  |  |
| TC-IA04-007 | IA-04: Feedback / state | Checkout | Sự chính xác và phản hồi trực quan khi áp dụng mã giảm giá (Coupon). | Mã giảm giá được tính toán chính xác và hiển thị thông báo thành công. | **Failed** | BUG-FR-09-001: Áp mã giảm giá phần trăm 'SAVE10' làm tăng giá trị đơn hàng lên gấp 10 lần. | [Ảnh](bug-report/evidence/firefox/BUG-FR-09-001.png) |
| TC-IA04-008 | IA-04: Feedback / state | Checkout | Trang xác nhận đặt hàng thành công. | Hiển thị mã đơn hàng và lời cảm ơn sau thanh toán. | **Passed** |  |  |
| TC-IA04-009 | IA-04: Feedback / state | All Screens | Trạng thái đang tải (Loading Spinner). | Hiện skeleton loader khi đang tải dữ liệu. | **Passed** |  |  |
| TC-IA04-010 | IA-04: Feedback / state | Home | Thông báo kết quả tìm kiếm trống. | Hiện 'Không tìm thấy sản phẩm' khi gõ từ khóa lạ. | **Passed** |  |  |
| TC-IA04-011 | IA-04: Feedback / state | Profile | Thông báo lưu profile thành công. | Hiện toast báo lưu thông tin cá nhân thành công. | **Passed** |  |  |
| TC-IA04-012 | IA-04: Feedback / state | Admin Dashboard | Phản hồi và tính chính xác khi thực hiện thao tác cập nhật (UPDATE) dữ liệu sản phẩm trong trang quản trị. | Chỉ cập nhật sản phẩm được chọn, các sản phẩm khác không bị ảnh hưởng. | **Failed** | BUG-FR-15-001: Lưu cập nhật một sản phẩm làm đổi tên toàn bộ sản phẩm trong danh sách hiển thị. | [Ảnh](bug-report/evidence/firefox/BUG-FR-15-001.png) |
| TC-IA04-013 | IA-04: Feedback / state | Admin Dashboard | Hiển thị kết quả import sản phẩm CSV. | Hiển thị 'Import thành công X sản phẩm' rõ ràng. | **Passed** |  |  |
| TC-IA04-014 | IA-04: Feedback / state | All Screens | Thông báo mất kết nối mạng. | Hiển thị banner cảnh báo offline thân thiện. | **Passed** |  |  |
| TC-IA04-015 | IA-04: Feedback / state | Checkout | Thông báo lỗi khi vượt quá tồn kho. | Cảnh báo và cập nhật lại số lượng tối đa mua được. | **Passed** |  |  |


---

### 3. Bảng Checklist Đầy Đủ Trên Safari (iOS Mobile)

| ID | Aspect | Màn hình | Mô tả | Kết quả mong đợi | Trạng thái | Ghi chú | Minh chứng |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| TC-IA01-001 | IA-01: General UI | All Screens | Tính nhất quán của ngôn ngữ hiển thị (Bilingual consistency) và font chữ trên toàn trang web. | Hệ thống hiển thị đồng bộ bằng một ngôn ngữ (Tiếng Việt), không xen lẫn tiếng Anh. | **Failed** | BUG-FR-01-004: Giao diện đa ngôn ngữ hiển thị không nhất quán (lúc Tiếng Anh, lúc Tiếng Việt). | [Ảnh](bug-report/evidence/safari/BUG-FR-01-004.jpg) |
| TC-IA01-002 | IA-01: General UI | All Screens | Tính nhất quán của bảng màu chủ đạo (Blue-600) theo thiết kế thương hiệu. | Các nút bấm chính sử dụng màu xanh chủ đạo, không pha trộn màu lạ. | **Failed** | BUG-FR-01-001: Nút submit Đăng ký có màu đỏ (bg-red-500) không nhất quán. | [Ảnh](bug-report/evidence/safari/BUG-FR-01-001.jpg) |
| TC-IA01-003 | IA-01: General UI | All Screens | Độ tương phản màu sắc giữa chữ và nền (WCAG 2.0). | Đạt tỷ lệ tương phản tối thiểu 4.5:1 để dễ đọc. | **Passed** |  |  |
| TC-IA01-004 | IA-01: General UI | Cart | Tính gộp nhóm và bố cục hiển thị của danh sách các sản phẩm cùng loại trong giỏ hàng. | Các sản phẩm cùng loại được gộp chung thành một dòng và cộng dồn số lượng. | **Passed** |  |  |
| TC-IA01-005 | IA-01: General UI | All Screens | Khả năng co giãn giao diện (Responsiveness) trên thiết bị di động. | Giao diện tự động co giãn không bị vỡ khung hoặc mất chữ. | **Passed** |  |  |
| TC-IA01-006 | IA-01: General UI | All Screens | Đường dẫn Logo ở Header chuyển hướng về trang chủ. | Bấm vào logo 'EShop' trên header luôn quay về trang chủ '/'. | **Passed** |  |  |
| TC-IA01-007 | IA-01: General UI | All Screens | Tính đồng bộ của Header và Footer trên toàn bộ trang web. | Header và Footer hiển thị nhất quán trên mọi route. | **Passed** |  |  |
| TC-IA01-008 | IA-01: General UI | All Screens | Trạng thái hover của các đường liên kết và các nút nhấn. | Con trỏ chuột đổi thành dạng bàn tay khi hover qua link/nút. | **Passed** |  |  |
| TC-IA01-009 | IA-01: General UI | All Screens | Tỷ lệ khung hình và độ sắc nét của hình ảnh sản phẩm. | Hình ảnh hiển thị đúng tỷ lệ, không bị kéo dẹt hay mờ. | **Passed** |  |  |
| TC-IA01-010 | IA-01: General UI | All Screens | Tốc độ tải tài nguyên hình ảnh tối ưu hóa. | Ảnh dung lượng nhẹ, tải nhanh không gây trễ trang. | **Passed** |  |  |
| TC-IA01-011 | IA-01: General UI | Admin Dashboard | Sự chính xác và nhất quán trong hiển thị số liệu báo cáo trên Dashboard trang quản trị. | Tổng doanh thu hiển thị chính xác theo tổng các đơn hàng, không bị nhân đôi. | **Passed** |  |  |
| TC-IA01-012 | IA-01: General UI | All Screens | Không xuất hiện thanh cuộn ngang không mong muốn ở chế độ desktop. | Trang web chỉ cuộn dọc, nội dung nằm trọn trong trang. | **Passed** |  |  |
| TC-IA01-013 | IA-01: General UI | All Screens | Favicon và tiêu đề trang hiển thị đúng khi chuyển đổi trang. | Tiêu đề tab trình duyệt thay đổi tương ứng theo trang. | **Passed** |  |  |
| TC-IA01-014 | IA-01: General UI | All Screens | Khoảng cách đệm (Padding/Margin) giữa các khối nội dung cân đối. | Không có văn bản nào nằm sát viền màn hình. | **Passed** |  |  |
| TC-IA01-015 | IA-01: General UI | All Screens | Trang báo lỗi 404 hiển thị khi người dùng truy cập link sai. | Hiển thị giao diện 404 thân thiện kèm nút quay về trang chủ. | **Passed** |  |  |
| TC-IA02-001 | IA-02: Forms | Register / Login | Các ô nhập liệu phải có placeholder gợi ý rõ ràng. | Ô email hiển thị placeholder ví dụ như nhap@email.com. | **Passed** |  |  |
| TC-IA02-002 | IA-02: Forms | Register / Login | Mật khẩu khi nhập vào mặc định phải được ẩn (dạng dấu chấm hoặc dấu sao). | Input mật khẩu có thuộc tính type="password" để ẩn chữ. | **Passed** |  |  |
| TC-IA02-003 | IA-02: Forms | Register / Login | Sự chính xác và nhất quán của các tiêu đề biểu mẫu (Form titles/headers). | Tiêu đề biểu mẫu đăng nhập phải ghi rõ 'Đăng nhập', không ghi nhầm thành 'Đăng ký'. | **Passed** |  |  |
| TC-IA02-004 | IA-02: Forms | Register / Login | Kiểm tra định dạng email hợp lệ khi nhập và submit form. | Trường email sử dụng thuộc tính type="email" để tự động xác thực định dạng. | **Failed** | BUG-FR-01-003: Ô nhập Email ở trang Đăng ký có kiểu dữ liệu là "text" thay vì "email". | [Ảnh](bug-report/evidence/safari/BUG-FR-01-003.jpg) |
| TC-IA02-005 | IA-02: Forms | Register | Kiểm tra tính đúng đắn của logic kiểm tra độ mạnh yếu mật khẩu khi đăng ký. | Chấp nhận các mật khẩu mạnh có ký tự đặc biệt thông thường, không bắt khoảng trắng. | **Passed** |  |  |
| TC-IA02-006 | IA-02: Forms | ForgotPassword | Thiếu ô xác nhận mật khẩu mới khi thực hiện đặt lại mật khẩu. | Biểu mẫu đổi mật khẩu bắt buộc phải có trường nhập Xác nhận lại mật khẩu mới. | **Failed** | BUG-FR-03-001: Thiếu trường Xác nhận mật khẩu mới khi đặt lại mật khẩu. | [Ảnh](bug-report/evidence/safari/BUG-FR-03-001.jpg) |
| TC-IA02-007 | IA-02: Forms | Register / Login | Độ tương phản và vị trí hiển thị của các thông báo lỗi. | Thông báo lỗi màu đỏ nổi bật dưới trường bị trống. | **Passed** |  |  |
| TC-IA02-008 | IA-02: Forms | All Forms | Thứ tự điều hướng bằng phím Tab (Tab Index) trên các form. | Con trỏ di chuyển tuần tự từ trên xuống dưới một cách hợp lý. | **Passed** |  |  |
| TC-IA02-009 | IA-02: Forms | Checkout | Kiểm soát khả năng sửa đổi các trường hiển thị tổng tiền/giá trị giao dịch trên biểu mẫu. | Tổng tiền cần thanh toán phải khóa (Read-only), không cho người dùng sửa đổi. | **Passed** |  |  |
| TC-IA02-010 | IA-02: Forms | Profile | Kiểm tra tính năng lưu thay đổi thông tin profile khi nhập ký tự lạ. | Hệ thống xử lý an toàn, không lỗi database. | **Passed** |  |  |
| TC-IA02-011 | IA-02: Forms | Cart | Kiểm tra tính hợp lệ của trường nhập số lượng sản phẩm trong giỏ hàng (chống số lượng âm). | Số lượng sản phẩm trong giỏ hàng phải luôn >= 1, chặn hoàn toàn các giá trị âm. | **Failed** | BUG-FR-07-005: Số lượng trong giỏ bị tự động cộng thêm 1 đơn vị so với số nhập vào. | [Ảnh](bug-report/evidence/safari/BUG-FR-07-005.jpg) |
| TC-IA02-012 | IA-02: Forms | Checkout | Sự hiện diện đầy đủ của các trường thông tin giao nhận hàng bắt buộc ở trang Checkout. | Hiển thị đầy đủ các trường nhập Tên người nhận, SĐT và Địa chỉ nhận hàng. | **Failed** | BUG-FR-08-002: Trang thanh toán thiếu hoàn toàn các ô điền thông tin giao nhận hàng. | [Ảnh](bug-report/evidence/safari/BUG-FR-08-002.jpg) |
| TC-IA02-013 | IA-02: Forms | ForgotPassword | Nút gửi mã OTP có bộ đếm ngược thời gian chờ gửi lại. | Hiển thị cooldown đếm ngược trước khi cho bấm gửi lại. | **Passed** |  |  |
| TC-IA02-014 | IA-02: Forms | All Forms | Nút xóa dữ liệu (Reset/Clear) hoạt động đúng. | Xóa sạch dữ liệu đã nhập trong các ô khi bấm nút clear. | **Passed** |  |  |
| TC-IA02-015 | IA-02: Forms | Register | Ngăn chặn đăng ký tài khoản trùng lặp email. | Thông báo lỗi rõ ràng nếu email đã tồn tại. | **Passed** |  |  |
| TC-IA03-001 | IA-03: Navigation | All Screens | Thanh điều hướng Header cố định ở đầu trang khi cuộn. | Header luôn ghim trên cùng khi cuộn trang xuống. | **Passed** |  |  |
| TC-IA03-002 | IA-03: Navigation | All Screens | Trạng thái hoạt động (Active state) của trang hiện tại. | Mục trang hiện tại trên header được tô đậm hoặc đổi màu. | **Passed** |  |  |
| TC-IA03-003 | IA-03: Navigation | All Screens | Tự động chuyển hướng khách vãng lai về Login. | Cố truy cập profile/checkout khi chưa login phải bị đá về login. | **Passed** |  |  |
| TC-IA03-004 | IA-03: Navigation | All Screens | Phím Back của trình duyệt hoạt động đúng. | Quay về trang trước đó bình thường, không bị lặp route. | **Passed** |  |  |
| TC-IA03-005 | IA-03: Navigation | Home | Khả năng lọc sản phẩm theo danh mục. | Bấm danh mục cập nhật sản phẩm tương ứng lập tức. | **Passed** |  |  |
| TC-IA03-006 | IA-03: Navigation | Home | Tìm kiếm sản phẩm cập nhật danh sách hiển thị. | Gõ từ khóa tìm kiếm hiển thị sản phẩm liên quan ngay. | **Passed** |  |  |
| TC-IA03-007 | IA-03: Navigation | ProductDetail | Liên kết quay lại từ chi tiết sản phẩm. | Nút quay lại đưa người dùng về đúng vị trí trang chủ. | **Passed** |  |  |
| TC-IA03-008 | IA-03: Navigation | Cart | Nút Tiến hành thanh toán chuyển hướng. | Dẫn hướng chính xác sang trang checkout `/checkout`. | **Passed** |  |  |
| TC-IA03-009 | IA-03: Navigation | ForgotPassword | Sự phân biệt trực quan và nhất quán của các nút điều hướng phụ. | Nút 'Quay lại' có màu sắc trung tính (ví dụ: xám) phân biệt rõ với nút hành động chính. | **Failed** | BUG-FR-03-002: Nút 'Quay lại' có màu sắc xanh lá giống hệt nút submit Đặt lại mật khẩu. | [Ảnh](bug-report/evidence/safari/BUG-FR-03-002.jpg) |
| TC-IA03-010 | IA-03: Navigation | Home | Khả năng điều hướng trực quan đến lịch sử đơn hàng và trang cá nhân từ trang chủ. | Có liên kết rõ ràng trên Header giúp người dùng vào xem lịch sử đơn hàng nhanh chóng. | **Failed** | BUG-FR-11-001: Người dùng gặp khó khăn khi tìm kiếm chức năng Theo dõi đơn hàng. | [Ảnh](bug-report/evidence/safari/BUG-FR-11-001.jpg) |
| TC-IA03-011 | IA-03: Navigation | Admin Dashboard | Thanh Menu bên cạnh của trang Admin. | Bấm Category/Product/Order chuyển trang chính xác. | **Passed** |  |  |
| TC-IA03-012 | IA-03: Navigation | All Screens | Quyền truy cập trang Admin bị chặn với user thường. | Tài khoản thường cố vào admin hiển thị lỗi 403 hoặc đá về trang chủ. | **Passed** |  |  |
| TC-IA03-013 | IA-03: Navigation | All Screens | Tốc độ chuyển đổi giữa các trang. | Các trang chuyển đổi mượt mà không đơ quá 2 giây. | **Passed** |  |  |
| TC-IA03-014 | IA-03: Navigation | ProductDetail | Đường dẫn Breadcrumbs hiển thị rõ. | Người dùng thấy rõ cấp danh mục sản phẩm đang xem. | **Passed** |  |  |
| TC-IA03-015 | IA-03: Navigation | All Screens | Đóng hamburger menu khi bấm ra ngoài. | Menu tự ẩn khi chạm vùng trống bên ngoài trên mobile. | **Passed** |  |  |
| TC-IA04-001 | IA-04: Feedback / state | Register | Toast thông báo thành công sau khi đăng ký. | Popup đăng ký thành công xuất hiện rồi tự ẩn sau 3s. | **Passed** |  |  |
| TC-IA04-002 | IA-04: Feedback / state | Login | Cơ chế khóa tài khoản và hiển thị thông báo phản hồi khi đăng nhập sai. | Tài khoản chỉ bị khóa sau đúng 3 lần sai liên tiếp và hiển thị thông báo khóa. | **Failed** | BUG-FR-02-003: Tài khoản bị khóa chỉ sau 2 lần đăng nhập sai thay vì 3 lần. | [Ảnh](bug-report/evidence/safari/BUG-FR-02-003.jpg) |
| TC-IA04-003 | IA-04: Feedback / state | Home | Hiển thị thông báo phản hồi trực quan (Toast/Popup) khi người dùng thêm sản phẩm vào giỏ hàng từ trang chủ. | Hiển thị thông báo 'Đã thêm vào giỏ hàng thành công' ngay lập tức. | **Passed** |  |  |
| TC-IA04-004 | IA-04: Feedback / state | ProductDetail | Phản hồi tức thì và sự chính xác khi nhấn nút 'Thêm vào giỏ hàng' ở trang Chi tiết sản phẩm. | Sản phẩm được thêm vào giỏ ngay ở lần nhấn đầu tiên và hiện toast thành công. | **Passed** |  |  |
| TC-IA04-005 | IA-04: Feedback / state | Cart | Thông báo hiển thị khi giỏ hàng trống. | Hiện thông báo trống và nút 'Tiếp tục mua sắm'. | **Passed** |  |  |
| TC-IA04-006 | IA-04: Feedback / state | Cart | Cảnh báo xác nhận khi xóa sản phẩm. | Hiển thị popup hỏi người dùng trước khi xóa. | **Passed** |  |  |
| TC-IA04-007 | IA-04: Feedback / state | Checkout | Sự chính xác và phản hồi trực quan khi áp dụng mã giảm giá (Coupon). | Mã giảm giá được tính toán chính xác và hiển thị thông báo thành công. | **Failed** | BUG-FR-09-001: Áp mã giảm giá phần trăm 'SAVE10' làm tăng giá trị đơn hàng lên gấp 10 lần. | [Ảnh](bug-report/evidence/safari/BUG-FR-09-001.jpg) |
| TC-IA04-008 | IA-04: Feedback / state | Checkout | Trang xác nhận đặt hàng thành công. | Hiển thị mã đơn hàng và lời cảm ơn sau thanh toán. | **Passed** |  |  |
| TC-IA04-009 | IA-04: Feedback / state | All Screens | Trạng thái đang tải (Loading Spinner). | Hiện skeleton loader khi đang tải dữ liệu. | **Passed** |  |  |
| TC-IA04-010 | IA-04: Feedback / state | Home | Thông báo kết quả tìm kiếm trống. | Hiện 'Không tìm thấy sản phẩm' khi gõ từ khóa lạ. | **Passed** |  |  |
| TC-IA04-011 | IA-04: Feedback / state | Profile | Thông báo lưu profile thành công. | Hiện toast báo lưu thông tin cá nhân thành công. | **Passed** |  |  |
| TC-IA04-012 | IA-04: Feedback / state | Admin Dashboard | Phản hồi và tính chính xác khi thực hiện thao tác cập nhật (UPDATE) dữ liệu sản phẩm trong trang quản trị. | Chỉ cập nhật sản phẩm được chọn, các sản phẩm khác không bị ảnh hưởng. | **Passed** |  |  |
| TC-IA04-013 | IA-04: Feedback / state | Admin Dashboard | Hiển thị kết quả import sản phẩm CSV. | Hiển thị 'Import thành công X sản phẩm' rõ ràng. | **Passed** |  |  |
| TC-IA04-014 | IA-04: Feedback / state | All Screens | Thông báo mất kết nối mạng. | Hiển thị banner cảnh báo offline thân thiện. | **Passed** |  |  |
| TC-IA04-015 | IA-04: Feedback / state | Checkout | Thông báo lỗi khi vượt quá tồn kho. | Cảnh báo và cập nhật lại số lượng tối đa mua được. | **Passed** |  |  |

