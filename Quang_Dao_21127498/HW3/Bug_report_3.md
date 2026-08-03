Found by Test Case
TC-011

Requirement Related
FR-09

Severity
Critical

Priority
P0

Environment
Hệ điều hành: Windows
Trình duyệt: Chromium's browser
URL: http://localhost:5173/checkout
Steps to Reproduce
Đăng nhập vào trang chủ
Chọn thêm vào giỏ sản phẩm bất kỳ
Vào giỏ hàng
Tiến hành thanh toán
Nhập mã giảm giá SAVE10
Áp dụng mã giảm giá
Expected Result
Với mã SAVE10 sẽ trừ 10% số tiền tổng đơn hàng. Ví dụ, đơn hàng 58.000.000đ, áp mã sẽ trừ đi 10% là 5.800.000đ, thì số tiền còn lại phải là 58.000.000đ - 5.800.000đ = 52.200.000đ

Actual Result
Thông báo sau khi áp mã giảm giá:
Áp dụng thành công! Giảm 10%

Tiết kiệm: -522,000,000 ₫

Thành tiền: 580,000,000 ₫