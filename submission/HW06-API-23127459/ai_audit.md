# Báo Cáo Kiểm Định Trí Tuệ Nhân Tạo

**Sinh viên:** 23127459 - Huỳnh Vương Thụy Quân

> Nếu không sử dụng trí tuệ nhân tạo, ghi: "Tôi không sử dụng bất kỳ hỗ trợ trí tuệ nhân tạo nào trong bài tập này."
>
> Nếu có sử dụng trí tuệ nhân tạo, điền bảng bên dưới cho mỗi lần tương tác.

---

| # | Công cụ | Ngày và giờ | Câu lệnh | Kết quả |
|---|---------|-------------|----------|---------|
| 1 | Opencode | 23-08-2026 | Tạo bộ tình huống kiểm thử giao diện lập trình cho hệ thống cửa hàng trực tuyến với ba nhóm yêu cầu: liệt kê và tìm kiếm sản phẩm, xem lịch sử đơn hàng, quản lý mã giảm giá. Yêu cầu mỗi giao diện ít nhất 35 tình huống, bao phủ phân vùng tương đương, giá trị biên, chuyển trạng thái, kiểm tra bảo mật, xác nhận lược đồ, có tiêu đề sinh viên 23127459. | Đã tạo ba tập tin trong thư mục `HW06-API-23127459`: `FR05_TestCases.md` (43 tình huống chính và 5 mở rộng), `FR11_TestCases.md` (48 tình huống chính và 5 mở rộng), `FR17_TestCases.md` (61 tình huống chính và 5 mở rộng). Tổng cộng vượt yêu cầu tối thiểu. Kèm theo phần kiểm tra thực tế và mở rộng cho mỗi nhóm. |
| 2 | Opencode | 23-08-2026 | Kiểm tra và viết lại toàn bộ bằng tiếng Việt có dấu, loại bỏ chữ tiếng Anh và chữ tiếng Trung | Đã chuyển toàn bộ ba tập tin sang tiếng Việt có dấu đầy đủ, giữ nguyên mã kỹ thuật cần thiết, xác nhận không còn ký tự tiếng Trung. |
| 3 | Opencode | 23-08-2026 | Sửa tiêu đề thiếu dấu | Đã sửa tiêu đề nhóm 05, 11, 17 sang tiếng Việt có dấu chuẩn. |
| 4 | Opencode | 23-08-2026 | Chỉ sửa phần kiểm tra thực tế và mở rộng của nhóm liệt kê sản phẩm theo ghi chú chi tiết của sinh viên | Đã cập nhật bảng nhãn đánh giá thành 43 dòng đầy đủ theo đúng ghi chú, giữ nguyên các phần trước đó. |
| 5 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Chuyển các trường hợp gộp chung sang nhãn chưa hoàn chỉnh và thêm mục tổng hợp | Đã đổi 5 trường hợp sang nhãn chưa hoàn chỉnh, thêm mục tổng hợp với thống kê và kế hoạch gộp. |
| 6 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Ghi chú việc tạo kịch bản vào tập tin mới trong thư mục bài nộp | Đã tạo tập tin này để ghi nhận quá trình tạo kịch bản, chừa chỗ trống cho sinh viên tự ghi tên. |
| 7 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Sửa lỗi phạm vi FR-05 (loại 10 trường hợp chi tiết sản phẩm thuộc FR-06) và FR-11 (loại 22 trường hợp chuyển trạng thái và hủy đơn thuộc FR-10), bổ sung 13 trường hợp mới cho FR-05 và 10 trường hợp mới cho FR-11 để đủ 35 hợp lệ, cập nhật thống kê và xuất Excel 3 trang cùng bộ sưu tập kiểm thử | Đã cập nhật nhãn đánh giá FR-05 (16 không hợp lệ, 5 chưa hoàn chỉnh, 35 hợp lệ) và FR-11 (22 không hợp lệ, 36 hợp lệ), thêm chi tiết 13 và 10 trường hợp mới đúng phạm vi chỉ liệt kê/tìm kiếm và chỉ xem, tạo lại Excel và bộ sưu tập chỉ chứa hợp lệ, giữ nguyên bảng chính phía trên. |
| 8 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Sửa lỗi phạm vi FR-17 — loại 25 trường hợp áp dụng mã (POST /api/apply-coupon) thuộc FR-09, chỉ giữ lại quản lý mã giảm giá của quản trị, cập nhật tiêu đề, thống kê và bộ sưu tập | Đã đổi nhãn 25 trường hợp 024-036,038,039,046,048,049,057-059,061 và EXT_001,003,004 sang không hợp lệ với lý do ngoài phạm vi FR-09, cập nhật tiêu đề bỏ POST /api/apply-coupon, thêm thống kê 41 hợp lệ trên tổng 66, cập nhật trang FR-17 trong Excel và xóa yêu cầu áp dụng mã khỏi thư mục FR-17 trong bộ sưu tập, chỉ giữ lại tạo, danh sách và xóa mã, giữ nguyên liệt kê phía trên và không thêm chữ tiếng Anh hay tiếng Trung. |
| 9 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Xóa tiêu đề tĩnh X-Student-Id trùng trong bộ sưu tập, chỉ giữ lại thêm tự động ở mức bộ sưu tập | Đã xóa tiêu đề X-Student-Id tĩnh khỏi 122 yêu cầu trong 3 thư mục FR-05, FR-11, FR-17, giữ nguyên tiêu đề xác thực nếu có, giữ nguyên đoạn kiểm thử và đoạn thêm tự động ở mức bộ sưu tập để tự thêm tiêu đề khi chạy. |
| 10 | Trợ lý trí tuệ nhân tạo | 23-08-2026 | Bổ sung thông tin đăng nhập quản trị cho FR-17 (tài khoản Admin User, admin@eshop.com, Admin123!, vai trò admin) và cấu hình token trong các tập tin liên quan | Đã thêm ghi chú tài khoản quản trị vào FR17_TestCases.md với insertUser.run và POST /api/login, cập nhật cột tiêu đề xác thực thành Authorization Bearer {{adminToken}}, tạo lại trang FR-17 trong Excel, thêm yêu cầu đăng nhập quản trị đầu thư mục FR-17 trong bộ sưu tập để tự lưu adminToken và cập nhật môi trường với adminEmail, adminPassword và adminToken, giữ nguyên liệt kê phía trên và toàn bộ tiếng Việt có dấu. |

---

**Ghi chú thêm:**
- Mọi yêu cầu đều bao gồm tiêu đề bắt buộc `X-Student-Id: 23127459`.
- Địa chỉ cơ sở: `http://localhost:3000`
- Ba tập tin chi tiết nằm cùng thư mục này: `FR05_TestCases.md`, `FR11_TestCases.md`, `FR17_TestCases.md`
