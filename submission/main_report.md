# Báo Cáo Chính HW02 - Domain Testing trên EShop

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  
**Nhóm:** 06  
**Hệ thống kiểm thử:** EShop  
**Bài tập:** HW02 - Domain Testing  
**Mức sử dụng AI:** Cat. 4 - AI-Assisted Production

---

## Phạm Vi

Báo cáo này tổng hợp 4 chức năng được phân công:

| Pool | Chức năng | Mã module | Kỹ thuật |
|------|-----------|-----------|----------|
| A | FR-03 Quên mật khẩu & đặt lại mật khẩu | `FORGOT_PW` | Domain Testing + BVA |
| B | FR-09 Mã giảm giá | `COUPON` | Domain Testing + BVA |
| C | FR-15 CRUD quản lý sản phẩm | `PROD_MGMT` | Domain Testing + BVA |
| D | Mobile FR-03 Quên mật khẩu | `MOBILE_FORGOT_PW` | Domain Testing + BVA |

---

## Tổng Kết Kiểm Thử

| Chỉ số | Số lượng |
|--------|----------|
| Số chức năng được kiểm thử | 4 |
| Test cases đã thiết kế | 60 |
| Test cases đã xử lý | 60 |
| Pass | 27 |
| Fail | 24 |
| Blocked | 9 |
| Chưa chạy | 0 |
| Bug tìm thấy | 10 confirmed; 1 candidate cần xác minh |

---

## FR-03: Quên Mật Khẩu & Đặt Lại Mật Khẩu

### Domain Testing

**Chức năng:** Forgot Password & Reset  
**Mã module:** `FORGOT_PW`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Web UI  
**Trạng thái:** Đã ghi nhận kết quả manual black-box Web UI

**Tóm Tắt Yêu Cầu:** Người dùng có thể yêu cầu OTP bằng email, nhập OTP và đặt mật khẩu mới hợp lệ. Luồng phải có xác nhận mật khẩu và đường quay lại Login rõ ràng.

**Phân Vùng Đầu Vào:**

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Email | Email đã đăng ký | Email chưa đăng ký, trống, sai format |
| OTP | OTP đúng 6 chữ số | OTP sai, 5 chữ số, 7 chữ số |
| Password | Password mạnh tối thiểu 8 ký tự | Ngắn hơn 8 ký tự, thiếu nhóm ký tự |
| Confirm Password | Khớp password | Thiếu field hoặc không khớp |
| Navigation | Có đường quay lại Login | Không có đường quay lại rõ ràng |

**Nhận Xét:** Ba lỗi đã được xác nhận qua Web UI: thiếu ô confirm password, thiếu back-to-login, và password hợp lệ bị từ chối.

### Boundary Value Analysis (FR-03)

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| OTP length | Đúng 6 chữ số | 5, 6, 7 chữ số | Bị blocked vì password hợp lệ bị reject trước |
| Password length | Tối thiểu 8 ký tự | 7, 8, 9 ký tự | 7 bị reject đúng; 8 và 9 ký tự hợp lệ bị reject sai |

**BVA Test Cases:**

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-FORGOT_PW-005 | OTP length 5 | Reject | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-006 | OTP length 6 | Accept nếu OTP đúng | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-007 | OTP length 7 | Reject | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-009 | Password length 7 | Reject | Pass | |
| TC-FORGOT_PW-010 | Password length 8 | Accept nếu các field khác hợp lệ | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-015 | Password length 9 | Accept nếu các field khác hợp lệ | Fail | BUG-FR03-005 |

**Kết Luận:** OTP BVA bị blocked vì reset form reject password hợp lệ trước khi có thể cô lập hành vi OTP. Password BVA phát hiện bug confirmed: password mạnh ở độ dài min và min+1 bị từ chối.

### AI Gap Analysis (FR-03)

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Cách Cường sửa |
|--------|--------------|-------------------|----------------|
| FR03-GAP-01 | Ban đầu dễ suy luận từ API/source | Bài yêu cầu black-box UI | Chuyển mọi kết luận bug sang UI + screenshot |
| FR03-GAP-02 | Thiếu kiểm tra confirm password | Confirm password là yêu cầu UI quan trọng | Thêm TC-FORGOT_PW-011 |
| FR03-GAP-03 | Thiếu navigation back-to-login | Ảnh hưởng khả năng phục hồi luồng | Thêm TC-FORGOT_PW-012 |
| FR03-GAP-04 | Chưa mở rộng password valid variants | Password regex cần nhiều partition | Thêm TC-FORGOT_PW-013..016 |

### Test Cases (FR-03)

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|------------|---------------|
| TC-FORGOT_PW-001 | EP | No | Request OTP với email đã đăng ký | Pass | None |
| TC-FORGOT_PW-002 | EP | No | Request OTP với email chưa đăng ký | Pass | None |
| TC-FORGOT_PW-003 | EP | No | Request OTP với email trống | Pass | None |
| TC-FORGOT_PW-004 | EP | No | Request OTP với email sai format | Pass | None |
| TC-FORGOT_PW-005 | BVA | Yes | OTP dưới biên độ dài (5 digits) | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-006 | BVA | Yes | OTP tại biên độ dài (6 digits) | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-007 | BVA | Yes | OTP trên biên độ dài (7 digits) | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-008 | EP | No | OTP sai | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-009 | BVA | Yes | Password min-1 (7 ký tự) | Pass | None |
| TC-FORGOT_PW-010 | BVA | Yes | Password tại minimum (8 ký tự) | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-011 | EP | No | Confirm password không khớp | Fail | BUG-FR03-003 |
| TC-FORGOT_PW-012 | EP | No | Quay lại Login | Fail | BUG-FR03-004 |
| TC-FORGOT_PW-013 | EP | No | Reset password hợp lệ ký tự `@` | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-014 | EP | No | Reset password hợp lệ ký tự `$` | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-015 | BVA | Yes | Password min+1 (9 ký tự) | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-016 | EP | No | Password thiếu ký tự đặc biệt | Pass | None |

**Tóm Tắt:** 6 Pass, 6 Fail, 4 Blocked, 0 Not Run

### Test Run Results (FR-03)

Kết quả test run manual từ Web UI cho FR-03:

- **TC-FORGOT_PW-001..004:** Pass (4/4)
- **TC-FORGOT_PW-005..008:** Blocked (4/4) - OTP cases bị blocked vì lỗi password
- **TC-FORGOT_PW-009:** Pass (1/1)
- **TC-FORGOT_PW-010, 013..015:** Fail (4/4) - Password hợp lệ bị từ chối
- **TC-FORGOT_PW-011:** Fail (1/1) - Thiếu ô confirm password
- **TC-FORGOT_PW-012:** Fail (1/1) - Không có nút back to login
- **TC-FORGOT_PW-016:** Pass (1/1)

### Bugs Confirmed (FR-03)

| Bug ID | GitHub Issue | Tóm tắt | Test Case | Severity |
|--------|--------------|---------|-----------|----------|
| BUG-FR03-003 | [#24](https://github.com/iamDicun/Group06_HW2_Testing/issues/24) | Thiếu ô xác nhận mật khẩu | TC-FORGOT_PW-011 | Major |
| BUG-FR03-004 | [#25](https://github.com/iamDicun/Group06_HW2_Testing/issues/25) | Thiếu chức năng quay lại đăng nhập | TC-FORGOT_PW-012 | Major |
| BUG-FR03-005 | [#26](https://github.com/iamDicun/Group06_HW2_Testing/issues/26) | Mật khẩu hợp lệ bị từ chối khi reset | TC-FORGOT_PW-010, 013-015 | Critical |

---

## FR-09: Mã Giảm Giá (Coupon)

### Domain Testing

**Chức năng:** Discount Coupons  
**Mã module:** `COUPON`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Checkout UI

**Tóm Tắt Yêu Cầu:** Coupon phải được kiểm tra theo trạng thái mã, minimum order, trạng thái đăng nhập, max usage và công thức giảm giá hiển thị ở Checkout.

**Phân Vùng Đầu Vào:**

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Coupon code | `SAVE10`, `BIGBUY`, `VIP100` | Trống, không tồn tại, hết hạn |
| Tổng giỏ hàng | Bằng hoặc lớn hơn minimum | Nhỏ hơn minimum |
| Login state | Đã đăng nhập | Chưa đăng nhập |
| Usage count | Chưa vượt max use | Đã vượt max use |

**Nhận Xét:** FR-09 phát hiện ba lỗi confirmed qua Checkout UI: coupon bị reject tại đúng minimum, SAVE10 tính sai phần trăm, và user chưa đăng nhập vẫn apply được voucher.

### Boundary Value Analysis (FR-09)

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| `SAVE10` minimum order | Hợp lệ tại `300000` | `299999`, `300000`, `300001` | below-min pass; at-min fail; above-min fail |
| `BIGBUY` minimum order | Hợp lệ tại `500000` | `499999`, `500000` | below-min pass; at-min fail |
| Usage count | `VIP100` tối đa 2 lần | lần 2, lần 3 | lần 3 bị reject đúng kỳ vọng |

**BVA Test Cases:**

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-COUPON-004 | SAVE10 total 299999 | Reject | Pass | |
| TC-COUPON-005 | SAVE10 total 300000 | Accept | Fail | BUG-FR09-001 |
| TC-COUPON-006 | SAVE10 total 300001 | Accept, giảm 10% | Fail | BUG-FR09-002 |
| TC-COUPON-007 | BIGBUY total 499999 | Reject | Pass | |
| TC-COUPON-008 | BIGBUY total 500000 | Accept | Fail | BUG-FR09-001 |
| TC-COUPON-012 | VIP100 vượt max use | Reject | Pass | |

**Kết Luận:** BVA xác nhận lỗi exact-minimum cho cả SAVE10 và BIGBUY. SAVE10 cũng có lỗi tính phần trăm khi coupon đã được apply.

### AI Gap Analysis (FR-09)

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Cách Cường sửa |
|--------|--------------|-------------------|----------------|
| FR09-GAP-01 | Chưa nhấn mạnh exact minimum | Điều kiện requirement là `>=`, rất dễ lỗi off-by-one | Thêm TC-COUPON-005 và TC-COUPON-008 |
| FR09-GAP-02 | Chưa kiểm tra số tiền giảm hiển thị | Apply thành công chưa đủ; amount phải đúng | Thêm các case SAVE10 calculation |
| FR09-GAP-03 | Chưa xét trạng thái chưa đăng nhập | Coupon có điều kiện login | Thêm TC-COUPON-009 |
| FR09-GAP-04 | Chưa mở rộng lowercase/usage | Cần bao phủ partition phụ | Thêm TC-COUPON-010..012 và 015 |

### Test Cases (FR-09)

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|------------|---------------|
| TC-COUPON-001 | EP | No | Apply khi ô coupon trống | Pass | None |
| TC-COUPON-002 | EP | No | Apply coupon không tồn tại | Pass | None |
| TC-COUPON-003 | EP | No | Apply coupon hết hạn | Pass | None |
| TC-COUPON-004 | BVA | Yes | SAVE10 dưới minimum (299999) | Pass | None |
| TC-COUPON-005 | BVA | Yes | SAVE10 tại minimum (300000) | Fail | BUG-FR09-001 |
| TC-COUPON-006 | BVA | Yes | SAVE10 trên minimum (300001) | Fail | BUG-FR09-002 |
| TC-COUPON-007 | BVA | Yes | BIGBUY dưới minimum (499999) | Pass | None |
| TC-COUPON-008 | BVA | Yes | BIGBUY tại minimum (500000) | Fail | BUG-FR09-001 |
| TC-COUPON-009 | EP | No | Apply coupon khi chưa đăng nhập | Fail | BUG-FR09-003 |
| TC-COUPON-010 | EP | No | Apply coupon viết thường | Pass | None |
| TC-COUPON-011 | EP | No | Apply fixed coupon trên minimum | Pass | None |
| TC-COUPON-012 | BVA | Yes | Dùng coupon sau khi đạt max uses | Pass | None |
| TC-COUPON-013 | EP | No | Tính SAVE10 với tổng lớn hơn | Fail | BUG-FR09-002 |
| TC-COUPON-014 | EP | No | Tính SAVE10 tại 1,000,000 | Fail | BUG-FR09-002 |
| TC-COUPON-015 | EP | No | Tính SAVE10 sau khi normalize lowercase | Fail | BUG-FR09-002 |

**Tóm Tắt:** 8 Pass, 7 Fail, 0 Blocked, 0 Not Run

### Test Run Results (FR-09)

Kết quả test run manual từ Checkout UI cho FR-09:

- **TC-COUPON-001..004:** Pass (4/4)
- **TC-COUPON-005, 008:** Fail (2/2) - Coupon bị reject tại exact minimum
- **TC-COUPON-006, 013..015:** Fail (4/4) - SAVE10 tính sai phần trăm
- **TC-COUPON-009:** Fail (1/1) - Apply được khi chưa đăng nhập
- **TC-COUPON-007, 010..012:** Pass (4/4)

### Bugs Confirmed (FR-09)

| Bug ID | GitHub Issue | Tóm tắt | Test Case | Severity |
|--------|--------------|---------|-----------|----------|
| BUG-FR09-001 | [#27](https://github.com/iamDicun/Group06_HW2_Testing/issues/27) | Coupon bị từ chối tại đúng ngưỡng tối thiểu | TC-COUPON-005, 008 | Major |
| BUG-FR09-002 | [#28](https://github.com/iamDicun/Group06_HW2_Testing/issues/28) | SAVE10 tính sai số tiền giảm | TC-COUPON-006, 013-015 | Major |
| BUG-FR09-003 | [#29](https://github.com/iamDicun/Group06_HW2_Testing/issues/29) | Có thể áp dụng coupon khi chưa đăng nhập | TC-COUPON-009 | Major |

---

## FR-15: Quản Lý Sản Phẩm (Product Management CRUD)

### Domain Testing

**Chức năng:** Product Management CRUD  
**Mã module:** `PROD_MGMT`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Web Admin UI

**Tóm Tắt Yêu Cầu:** Admin có thể tạo, đọc, chỉnh sửa, xóa sản phẩm với xác thực access control, validation dữ liệu, và confirmation dialog cho destructive action.

**Phân Vùng Đầu Vào:**

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Access | Admin user | User không phải admin |
| Product name | 1-255 ký tự | Trống, >255 ký tự |
| Price | > 0 | 0, âm |
| Category | Mục hợp lệ được chọn | Không chọn |
| Edit isolation | Chỉnh sửa 1 sản phẩm | Chỉnh sửa ảnh hưởng sản phẩm khác |
| Delete confirmation | Có dialog xác nhận | Xóa ngay không confirm |

**Nhận Xét:** FR-15 phát hiện ba lỗi confirmed qua Admin UI: dữ liệu không hợp lệ vẫn được chấp nhận, chức năng edit không hoạt động, và xóa không có dialog xác nhận.

### Boundary Value Analysis (FR-15)

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| Name length | 1-255 ký tự | 0, 1, 255, 256 | 0 reject; 1 accept; 255 accept; 256 accept (BUG) |
| Price | > 0 | 0, 1, -1 | 0 accept (BUG); 1 accept; -1 accept (BUG) |

**BVA Test Cases:**

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-PROD_MGMT-005 | Name length 255 | Accept | Pass | |
| TC-PROD_MGMT-006 | Name length 256 | Reject | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-007 | Price 0 | Reject | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-008 | Price 1 | Accept | Pass | |
| TC-PROD_MGMT-017 | Price -1 | Reject | Fail | BUG-FR15-002 |

**Kết Luận:** Validation boundary bị vi phạm cho name length (256 được accept) và price (0 và negative được accept).

### AI Gap Analysis (FR-15)

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Cách Cường sửa |
|--------|--------------|-------------------|----------------|
| FR15-GAP-01 | Không phân biệt access control admin/user | Requirement có bảo mật access | Thêm TC-PROD_MGMT-002 |
| FR15-GAP-02 | Chưa test edit isolation | Edit có thể ảnh hưởng sản phẩm khác | Thêm TC-PROD_MGMT-010 và 013-015 |
| FR15-GAP-03 | Chưa test delete confirmation | Destructive action cần confirm | Thêm TC-PROD_MGMT-011 và 012 |
| FR15-GAP-04 | Chưa mở rộng boundary name/price | Validation là critical | Thêm TC-PROD_MGMT-006, 017 |

### Test Cases (FR-15)

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|------------|---------------|
| TC-PROD_MGMT-001 | EP | No | Admin mở danh sách sản phẩm | Pass | None |
| TC-PROD_MGMT-002 | EP | No | User không phải admin không thể vào | Pass | None |
| TC-PROD_MGMT-003 | EP | No | Tạo sản phẩm với dữ liệu hợp lệ | Pass | None |
| TC-PROD_MGMT-004 | BVA | Yes | Tạo sản phẩm với tên trống | Pass | None |
| TC-PROD_MGMT-005 | BVA | Yes | Tạo sản phẩm với name length 255 | Pass | None |
| TC-PROD_MGMT-006 | BVA | Yes | Tạo sản phẩm với name length 256 | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-007 | BVA | Yes | Tạo sản phẩm với price 0 | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-008 | BVA | Yes | Tạo sản phẩm với price 1 | Pass | None |
| TC-PROD_MGMT-009 | EP | No | Tạo sản phẩm không chọn category | Blocked | None |
| TC-PROD_MGMT-010 | EP | No | Edit tên một sản phẩm | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-011 | EP | No | Xóa sản phẩm và xác nhận | Fail | BUG-FR15-004 |
| TC-PROD_MGMT-012 | EP | No | Hủy thao tác xóa | Blocked | BUG-FR15-004 |
| TC-PROD_MGMT-013 | EP | No | Edit price sản phẩm | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-014 | EP | No | Edit description sản phẩm | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-015 | EP | No | Edit category sản phẩm | Fail | BUG-FR15-003 |
| TC-PROD_MGMT-016 | EP | No | Tạo sản phẩm với description dài | Pass | None |
| TC-PROD_MGMT-017 | BVA | Yes | Tạo sản phẩm với price âm | Fail | BUG-FR15-002 |
| TC-PROD_MGMT-018 | EP | No | Tạo sản phẩm với price không phải số | Pass | None |

**Tóm Tắt:** 8 Pass, 8 Fail, 2 Blocked, 0 Not Run

### Test Run Results (FR-15)

Kết quả test run manual từ Admin UI cho FR-15:

- **TC-PROD_MGMT-001..005, 008, 016, 018:** Pass (8/8)
- **TC-PROD_MGMT-006, 007, 017:** Fail (3/3) - Validation boundary vi phạm
- **TC-PROD_MGMT-010, 013..015:** Fail (5/5) - Edit function không hoạt động
- **TC-PROD_MGMT-011:** Fail (1/1) - Xóa không có confirm dialog
- **TC-PROD_MGMT-009, 012:** Blocked (2/2)

### Bugs Confirmed (FR-15)

| Bug ID | GitHub Issue | Tóm tắt | Test Case | Severity |
|--------|--------------|---------|-----------|----------|
| BUG-FR15-002 | [#30](https://github.com/iamDicun/Group06_HW2_Testing/issues/30) | Dữ liệu sản phẩm không hợp lệ vẫn được chấp nhận | TC-PROD_MGMT-006, 007, 017 | Major |
| BUG-FR15-003 | [#31](https://github.com/iamDicun/Group06_HW2_Testing/issues/31) | Chức năng chỉnh sửa sản phẩm không hoạt động | TC-PROD_MGMT-010, 013-015 | Critical |
| BUG-FR15-004 | [#32](https://github.com/iamDicun/Group06_HW2_Testing/issues/32) | Xóa sản phẩm không có hộp thoại xác nhận | TC-PROD_MGMT-011 | Major |

---

## Mobile FR-03: Quên Mật Khẩu Trên Mobile

### Domain Testing

**Chức năng:** Mobile Forgot Password & Reset  
**Mã module:** `MOBILE_FORGOT_PW`  
**Kỹ thuật:** Domain Testing / Equivalence Partitioning  
**Bề mặt kiểm thử:** Mobile App UI

**Tóm Tắt Yêu Cầu:** Mobile app có flow quên mật khẩu tương tự web nhưng thích ứng UI di động. Phải có OTP demo, xác nhận mật khẩu và navigation rõ ràng.

**Phân Vùng Đầu Vào:**

| Biến | Phân vùng hợp lệ | Phân vùng không hợp lệ |
|------|------------------|------------------------|
| Email | Email đã đăng ký | Email chưa đăng ký, trống, sai format |
| OTP | OTP đúng 6 chữ số | OTP sai, 5 chữ số, 7 chữ số |
| Password | Password mạnh tối thiểu 8 ký tự | Ngắn hơn 8 ký tự, thiếu nhóm ký tự |
| Confirm Password | Khớp password | Thiếu field hoặc không khớp |
| Navigation | Có OTP demo và back to login | Thiếu OTP demo hoặc không có back |

**Nhận Xét:** Mobile FR-03 phát hiện 1 bug confirmed: thiếu OTP demo, confirm password field và back-to-login navigation.

### Boundary Value Analysis (Mobile FR-03)

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| OTP length | Đúng 6 chữ số | 5, 6, 7 chữ số | Bị blocked vì không có OTP demo |
| Password length | Tối thiểu 8 ký tự | 7, 8 ký tự | 7 bị reject đúng; 8 không thể test |

**BVA Test Cases:**

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-MOBILE_FORGOT_PW-005 | OTP length 5 | Reject | Pass | |
| TC-MOBILE_FORGOT_PW-006 | OTP length 6 | Accept nếu OTP đúng | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-007 | OTP length 7 | Reject | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-008 | Password length 7 | Reject | Pass | |
| TC-MOBILE_FORGOT_PW-009 | Password length 8 | Accept nếu các field khác hợp lệ | Blocked | BUG-MOBILE-FR03-001 |

**Kết Luận:** Mobile OTP và confirm password BVA bị blocked vì flow không cung cấp OTP demo và confirm password field.

### AI Gap Analysis (Mobile FR-03)

| Gap ID | AI thiếu/sai | Vì sao quan trọng | Cách Cường sửa |
|--------|--------------|-------------------|----------------|
| MOBILE-GAP-01 | Ban đầu coi mobile như web variant | Mobile là separate UI | Tạo test case riêng cho mobile |
| MOBILE-GAP-02 | Thiếu OTP demo requirement | Mobile app cần demo OTP để user thực tế hóa | Thêm TC-MOBILE_FORGOT_PW-002, 006-007 |
| MOBILE-GAP-03 | Thiếu confirm password field | Mobile phải có confirm | Thêm TC-MOBILE_FORGOT_PW-010 |
| MOBILE-GAP-04 | Thiếu back-to-login navigation | Mobile app cần clear navigation | Thêm TC-MOBILE_FORGOT_PW-011 |

### Test Cases (Mobile FR-03)

| Test Case ID | Kỹ thuật | BVA? | Mục tiêu | Trạng thái | Bug liên quan |
|--------------|----------|------|----------|------------|---------------|
| TC-MOBILE_FORGOT_PW-001 | EP | No | Mở màn hình quên mật khẩu từ Login | Pass | None |
| TC-MOBILE_FORGOT_PW-002 | EP | No | Request OTP với email đã đăng ký | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-003 | EP | No | Request OTP với email trống | Pass | None |
| TC-MOBILE_FORGOT_PW-004 | EP | No | Request OTP với email sai format | Pass | None |
| TC-MOBILE_FORGOT_PW-005 | BVA | Yes | OTP dưới biên độ dài (5 digits) | Pass | None |
| TC-MOBILE_FORGOT_PW-006 | BVA | Yes | OTP tại biên độ dài (6 digits) | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-007 | BVA | Yes | OTP trên biên độ dài (7 digits) | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-008 | BVA | Yes | Password min-1 (7 ký tự) | Pass | None |
| TC-MOBILE_FORGOT_PW-009 | BVA | Yes | Password tại minimum (8 ký tự) | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-010 | EP | No | Confirm password không khớp | Fail | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-011 | EP | No | Điều hướng quay lại Login | Fail | BUG-MOBILE-FR03-001 |

**Tóm Tắt:** 5 Pass, 3 Fail, 3 Blocked, 0 Not Run

### Test Run Results (Mobile FR-03)

Kết quả test run manual từ Mobile App UI cho Mobile FR-03:

- **TC-MOBILE_FORGOT_PW-001:** Pass (1/1)
- **TC-MOBILE_FORGOT_PW-002:** Fail (1/1) - Không có OTP demo
- **TC-MOBILE_FORGOT_PW-003, 004, 005, 008:** Pass (4/4)
- **TC-MOBILE_FORGOT_PW-006, 007, 009:** Blocked (3/3) - Không có OTP demo
- **TC-MOBILE_FORGOT_PW-010, 011:** Fail (2/2) - Thiếu confirm field và back navigation

### Bugs Confirmed (Mobile FR-03)

| Bug ID | GitHub Issue | Tóm tắt | Test Case | Severity |
|--------|--------------|---------|-----------|----------|
| BUG-MOBILE-FR03-001 | [#33](https://github.com/iamDicun/Group06_HW2_Testing/issues/33) | Mobile flow thiếu OTP demo, confirm password và back-to-login | TC-MOBILE_FORGOT_PW-002, 006, 007, 009, 010, 011 | Critical |

---

## Tổng Hợp Bugs Đã Xác Nhận

| Bug ID | GitHub Issue | Chức năng | Severity | Trạng thái |
|--------|--------------|-----------|----------|-----------|
| BUG-FR03-003 | [#24](https://github.com/iamDicun/Group06_HW2_Testing/issues/24) | FR-03 Web | Major | Confirmed |
| BUG-FR03-004 | [#25](https://github.com/iamDicun/Group06_HW2_Testing/issues/25) | FR-03 Web | Major | Confirmed |
| BUG-FR03-005 | [#26](https://github.com/iamDicun/Group06_HW2_Testing/issues/26) | FR-03 Web | Critical | Confirmed |
| BUG-FR09-001 | [#27](https://github.com/iamDicun/Group06_HW2_Testing/issues/27) | FR-09 Coupon | Major | Confirmed |
| BUG-FR09-002 | [#28](https://github.com/iamDicun/Group06_HW2_Testing/issues/28) | FR-09 Coupon | Major | Confirmed |
| BUG-FR09-003 | [#29](https://github.com/iamDicun/Group06_HW2_Testing/issues/29) | FR-09 Coupon | Major | Confirmed |
| BUG-FR15-002 | [#30](https://github.com/iamDicun/Group06_HW2_Testing/issues/30) | FR-15 Product Mgmt | Major | Confirmed |
| BUG-FR15-003 | [#31](https://github.com/iamDicun/Group06_HW2_Testing/issues/31) | FR-15 Product Mgmt | Critical | Confirmed |
| BUG-FR15-004 | [#32](https://github.com/iamDicun/Group06_HW2_Testing/issues/32) | FR-15 Product Mgmt | Major | Confirmed |
| BUG-MOBILE-FR03-001 | [#33](https://github.com/iamDicun/Group06_HW2_Testing/issues/33) | Mobile FR-03 | Critical | Confirmed |

**Tổng:** 10 confirmed bugs

---

## Candidate Bugs Cần Xác Minh

| Bug ID | Chức năng | Tóm tắt | Severity |
|--------|-----------|---------|----------|
| BUG-FR03-001 | FR-03 | OTP có thể không đúng yêu cầu 6 chữ số | Major |

**Ghi chú:** Candidate bug này cần bao thêm screenshot từ black-box UI test trước khi confirmed.

---

## Phụ Lục

| Phụ lục | File |
|---------|------|
| Appendix A - AI Audit Report | `ai_audit.md` |
| Appendix B - AI Disclosure Form | `ai_disclosure.md` |
| Appendix C - AI Privacy Checklist | `ai_privacy_checklist.md` |
| Appendix D - AI Critique | `ai_critique.md` |
| Appendix E - Prompt Log | `prompt_log.md` |
| Appendix F - Git Commit Log | `git_log.md` |

---

## Công Bố Sử Dụng AI Bắt Buộc

Test case/script/dataset/report này ban đầu được tạo bởi OpenAI GPT-5.5 thông qua OpenCode; tôi đã review và chỉnh sửa các phân vùng chức năng, giá trị biên, expected result của test case và yêu cầu bằng chứng black-box UI; việc xác nhận bug chỉ dựa trên thao tác UI thủ công và screenshot. Báo cáo AI Audit chi tiết được đính kèm ở Appendix A. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc nhóm bị cấm.

---

## Tổng Hợp Bug Đã Xác Nhận

Các bug dưới đây đã được Cường tái hiện qua Web UI hoặc Mobile UI. Screenshot bằng chứng cần được đặt đúng theo các đường dẫn bên dưới.

| Bug ID | GitHub Issue | Chức năng | Tóm tắt | Đường dẫn bằng chứng |
|--------|--------------|-----------|---------|----------------------|
| BUG-FR03-003 | [#24](https://github.com/iamDicun/Group06_HW2_Testing/issues/24) | FR-03 Web | Thiếu ô xác nhận mật khẩu | `submission/evidence/FR03/BUG-FR03-003-missing-confirm-password.png` |
| BUG-FR03-004 | [#25](https://github.com/iamDicun/Group06_HW2_Testing/issues/25) | FR-03 Web | Thiếu chức năng quay lại đăng nhập | `submission/evidence/FR03/BUG-FR03-004-missing-back-to-login.png` |
| BUG-FR03-005 | [#26](https://github.com/iamDicun/Group06_HW2_Testing/issues/26) | FR-03 Web | Mật khẩu hợp lệ bị từ chối khi reset, làm chặn các case liên quan OTP | `submission/evidence/FR03/BUG-FR03-005-valid-password-rejected.png` |
| BUG-FR09-001 | [#27](https://github.com/iamDicun/Group06_HW2_Testing/issues/27) | FR-09 Coupon | Coupon bị từ chối tại đúng ngưỡng tối thiểu | `submission/evidence/FR09/BUG-FR09-001-save10-at-min-rejected.png`, `submission/evidence/FR09/BUG-FR09-001-bigbuy-at-min-rejected.png` |
| BUG-FR09-002 | [#28](https://github.com/iamDicun/Group06_HW2_Testing/issues/28) | FR-09 Coupon | SAVE10 tính sai số tiền giảm | `submission/evidence/FR09/BUG-FR09-002-save10-percent-wrong.png` |
| BUG-FR09-003 | [#29](https://github.com/iamDicun/Group06_HW2_Testing/issues/29) | FR-09 Coupon | Có thể áp dụng coupon khi chưa đăng nhập | `submission/evidence/FR09/BUG-FR09-003-coupon-applied-logged-out.png` |
| BUG-FR15-002 | [#30](https://github.com/iamDicun/Group06_HW2_Testing/issues/30) | FR-15 Product Management | Dữ liệu sản phẩm không hợp lệ vẫn được chấp nhận | `submission/evidence/FR15/BUG-FR15-002-name-256-accepted.png`, `submission/evidence/FR15/BUG-FR15-002-zero-price-accepted.png`, `submission/evidence/FR15/BUG-FR15-002-negative-price-accepted.png` |
| BUG-FR15-003 | [#31](https://github.com/iamDicun/Group06_HW2_Testing/issues/31) | FR-15 Product Management | Chức năng chỉnh sửa sản phẩm không hoạt động | `submission/evidence/FR15/BUG-FR15-003-edit-button-not-working.png` |
| BUG-FR15-004 | [#32](https://github.com/iamDicun/Group06_HW2_Testing/issues/32) | FR-15 Product Management | Xóa sản phẩm không có hộp thoại xác nhận | `submission/evidence/FR15/BUG-FR15-004-delete-without-confirm.png` |
| BUG-MOBILE-FR03-001 | [#33](https://github.com/iamDicun/Group06_HW2_Testing/issues/33) | Mobile FR-03 | Luồng quên mật khẩu mobile thiếu OTP demo và các thành phần phục hồi bắt buộc | `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-otp-not-shown.png`, `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-confirm-password.png`, `submission/evidence/MOBILE_FR03/BUG-MOBILE-FR03-001-missing-back-to-login.png` |

---

## Tổng Hợp Candidate Bug

Các bug này chưa được tính là confirmed cho tới khi được tái hiện qua UI và có screenshot.

| Bug ID | Chức năng | Tóm tắt | Severity / Priority |
|--------|-----------|---------|---------------------|
| BUG-FR03-001 | FR-03 | OTP có thể không đúng yêu cầu 6 chữ số | Major / P1 |

Candidate bug drafts nằm trong `bug_reports/BLACKBOX_BUG_DRAFTS.md`. Cần bổ sung GitHub Issue link và screenshot sau khi có tái hiện black-box UI đầy đủ.

---

## Phụ Lục

| Phụ lục | File |
|---------|------|
| Appendix A - AI Audit Report | `ai_audit.md` |
| Appendix B - AI Disclosure Form | `ai_disclosure.md` |
| Appendix C - AI Privacy Checklist | `ai_privacy_checklist.md` |
| Appendix D - AI Critique | `ai_critique.md` |
| Appendix E - Prompt Log | `prompt_log.md` |
| Appendix F - Git Commit Log | `git_log.md` |

---

## Công Bố Sử Dụng AI Bắt Buộc

Test case/script/dataset/report này ban đầu được tạo bởi OpenAI GPT-5.5 thông qua OpenCode; tôi đã review và chỉnh sửa các phân vùng chức năng, giá trị biên, expected result của test case và yêu cầu bằng chứng black-box UI; việc xác nhận bug chỉ dựa trên thao tác UI thủ công và screenshot. Báo cáo AI Audit chi tiết được đính kèm ở Appendix A. Tôi xác nhận không sử dụng AI để tạo bất kỳ artifact nào thuộc nhóm bị cấm.
