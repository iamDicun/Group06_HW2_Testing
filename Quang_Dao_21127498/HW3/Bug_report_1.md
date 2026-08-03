Found by Test Case
TC-013

Requirement Related
FR-07

Severity
Minor

Priority
P2

Environment
Trình duyệt: Trình duyệt nhân Chromium
Hệ điều hành: Windows
URL: http://localhost:5173/cart
Steps to Reproduce
Đăng nhập vào Eshop
Thêm vào giỏ hàng cùng 1 sản phẩm nhiều hơn 2 lần
Vào giỏ hàng
Quan sát các dòng trong giỏ hàng
Expected Result
Khi thêm vào giỏ hàng sản phẩm các sản phẩm giống nhau, nên cộng dồn số lượng sản phẩm đó, thay vì tạo dòng mới trong giỏ hàng cho cùng 1 sản phẩm

Actual Result
Khi thêm vào giỏ hàng nhiều hơn 2 sản phẩm giống nhau, giỏ hàng sẽ hiển thị nhiều hơn 2 dòng của sản phẩm đó, với số lượng sản phẩm của mỗi dòng là 1.