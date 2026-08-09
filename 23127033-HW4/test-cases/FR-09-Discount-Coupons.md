# Test Cases: FR-09 - Discount Coupons

**Feature:** `FR-09` Discount Coupons  
**Module:** Shopping Cart & Checkout (`COUPON`)  
**Target Page:** `/checkout` (Web Frontend)  
**Total Test Cases:** 16 (Positive: 6, Negative: 6, Edge: 4)

---

| ID | Category | Scenario / Description | Precondition | Input Data | Steps | Expected Result | Priority |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| `TC_CP_01` | Positive | Áp dụng mã giảm giá phần trăm hợp lệ (`SAVE10` - 10%) | Đã có sản phẩm trong giỏ, ở trang `/checkout` | `couponCode: "SAVE10"`, `totalAmount: 100000` | 1. Nhập mã `SAVE10`<br>2. Bấm "Áp dụng" | Hiển thị "Áp dụng mã thành công", số tiền tiết kiệm: 10,000 ₫ và thành tiền: 90,000 ₫ | P0 |
| `TC_CP_02` | Positive | Áp dụng mã giảm giá số tiền cố định hợp lệ | Đã có sản phẩm trong giỏ (tổng tiền > 50,000₫) | `couponCode: "FREESHIP"`, `totalAmount: 200000` | 1. Nhập mã `FREESHIP`<br>2. Bấm "Áp dụng" | Giảm trực tiếp 30,000 ₫ vào tổng thanh toán (Thành tiền: 170,000 ₫) | P0 |
| `TC_CP_03` | Positive | Áp dụng mã giảm giá bằng chữ thường (`save10`) tự động chuyển thành chữ hoa | Đã ở trang `/checkout` | `couponCode: "save10"` | 1. Nhập `save10`<br>2. Click Áp dụng | Hệ thống tự uppercase thành `SAVE10` và áp dụng thành công | P1 |
| `TC_CP_04` | Positive | Thanh toán thành công sau khi áp dụng mã giảm giá hợp lệ | Đã đăng nhập và áp mã thành công | `couponCode: "SAVE10"` | 1. Áp mã `SAVE10`<br>2. Click "Xác Nhận Thanh Toán" | Đặt hàng thành công, hiển thị thông báo "Thanh toán thành công!" | P0 |
| `TC_CP_05` | Negative | Áp dụng mã không tồn tại trên hệ thống | Đang ở `/checkout` | `couponCode: "INVALIDCODE99"` | 1. Nhập mã không có trong DB<br>2. Click Áp dụng | Báo lỗi "Mã không tồn tại" hoặc "Không thể áp dụng mã" | P1 |
| `TC_CP_06` | Negative | Áp dụng mã giảm giá cho đơn hàng không đủ giá trị tối thiểu (min_order_amount) | Coupon yêu cầu đơn tối thiểu 500,000₫ | `couponCode: "MIN500K"`, `totalAmount: 200000` | 1. Nhập mã `MIN500K`<br>2. Click Áp dụng | Báo lỗi "Giá trị đơn hàng chưa đủ điều kiện áp dụng mã" | P1 |
| `TC_CP_07` | Negative | Áp dụng mã giảm giá đã hết hạn sử dụng | Coupon có `expired_at` trong quá khứ | `couponCode: "EXPIRED2025"` | 1. Nhập mã hết hạn<br>2. Click Áp dụng | Báo lỗi "Mã giảm giá đã hết hạn" | P1 |
| `TC_CP_08` | Negative | Để trống mã giảm giá và nhấn Áp dụng | Đang ở `/checkout` | `couponCode: ""` | 1. Để trống ô mã<br>2. Quan sát nút Áp dụng | Nút "Áp dụng" bị disabled, không thể submit | P2 |
| `TC_CP_09` | Negative | Người dùng dùng vượt quá số lần cho phép per user (`max_uses_per_user`) | User đã dùng mã này 1 lần trước đó | `couponCode: "ONETIME"` | 1. Đăng nhập user<br>2. Áp lại mã đã dùng | Báo lỗi "Bạn đã sử dụng hết số lần cho phép của mã này" | P1 |
| `TC_CP_10` | Edge | Áp dụng mã có khoảng trắng thừa đầu/cuối | Ở trang `/checkout` | `couponCode: "  SAVE10  "` | 1. Nhập `"  SAVE10  "`<br>2. Click Áp dụng | Mã được `.trim()` sạch sẽ và áp dụng thành công | P2 |
| `TC_CP_11` | Edge | Thay đổi số tiền tổng đơn hàng sau khi đã áp dụng mã coupon | Ở trang `/checkout` | `couponCode: "SAVE10"`, chỉnh `editableTotal` | 1. Áp mã thành công<br>2. Nhập số tiền mới vào ô input | `couponResult` tự động reset về null và thông báo coupon bị hủy | P2 |
| `TC_CP_12` | Edge | Áp dụng mã coupon loại phần trăm 100% (Miễn phí 100%) | Coupon discount_value = 100% | `couponCode: "FULL100"` | 1. Nhập `FULL100`<br>2. Click Áp dụng | Tổng tiền thanh toán giảm về 0₫ | P2 |
| `TC_CP_13` | Positive | Kiểm tra công thức tính phần trăm mã `SAVE10` với tổng đơn 300,000 ₫ | Ở trang `/checkout` | `couponCode: "SAVE10"`, `totalAmount: 300000` | 1. Nhập 300,000 ₫ vào ô tổng tiền<br>2. Áp mã `SAVE10` | Số tiền tiết kiệm đúng bằng 30,000 ₫ (10%), Thành tiền: 270,000 ₫ (Bắt lỗi BUG-FR09-002 nếu tính sai) | P0 |
| `TC_CP_14` | Positive | Kiểm tra công thức tính phần trăm mã `SAVE10` với tổng đơn 1,000,000 ₫ | Ở trang `/checkout` | `couponCode: "SAVE10"`, `totalAmount: 1000000` | 1. Nhập 1,000,000 ₫ vào ô tổng tiền<br>2. Áp mã `SAVE10` | Số tiền tiết kiệm đúng bằng 100,000 ₫ (10%), Thành tiền: 900,000 ₫ (Bắt lỗi BUG-FR09-002 nếu tính sai) | P0 |
| `TC_CP_15` | Positive | Kiểm tra công thức tính phần trăm `SAVE10` sau khi nhập chữ thường `save10` tại tổng đơn 500,000 ₫ | Ở trang `/checkout` | `couponCode: "save10"`, `totalAmount: 500000` | 1. Nhập `save10` tại đơn 500,000 ₫<br>2. Bấm Áp dụng | Tiết kiệm: 50,000 ₫, Thành tiền: 450,000 ₫ | P1 |
| `TC_CP_16` | Negative | Áp dụng mã giảm giá khi người dùng chưa đăng nhập (Unauthenticated Guest User) | Chưa đăng nhập tài khoản | `couponCode: "SAVE10"`, `totalAmount: 200000` | 1. Truy cập `/checkout` khi chưa đăng nhập<br>2. Nhập mã `SAVE10`<br>3. Bấm "Áp dụng" | Hệ thống từ chối áp mã và yêu cầu đăng nhập (Phát hiện BUG-FR09-003 nếu guest vẫn áp mã được) | P0 |
