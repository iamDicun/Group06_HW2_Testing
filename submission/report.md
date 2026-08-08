# BÁO CÁO KIỂM THỬ TỰ ĐỘNG FRONTEND — TASK 1 (DATA-DRIVEN CROSS-BROWSER TESTING)

**Học phần:** Kiểm thử Phần mềm (Software Testing) — HW02  
**Họ và tên sinh viên:** Nguyễn Khoa  
**Mã số sinh viên (MSSV):** `23127391`  
**Nhóm:** Group 06  
**Hệ thống kiểm thử (SUT):** EShop ([https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut))  
**Định danh báo cáo:** `Run by: 23127391`  
**Framework:** Playwright (TypeScript)  
**Trình duyệt mục tiêu:** 3 trình duyệt — **Chromium**, **Firefox**, **WebKit**  
**Giai đoạn:** **TASK 1 — Automation Testing Data-Driven** (Sẵn sàng tiếp nối cho Task 2)

---

## 1. TỔNG QUAN VÀ PHẠM VI KIỂM THỬ (TASK 1)

Trong Task 1, nhóm đã thiết kế và triển khai bộ kiểm thử tự động frontend chuẩn **Data-Driven Testing (DDT)** và **Cross-Browser Testing** cho 3 tính năng cốt lõi thuộc 3 phân hệ khác nhau của hệ thống EShop:

1. **FR-04: Quản lý hồ sơ cá nhân (Personal Profile Management)** — Phân hệ Customer Web (`http://localhost:5173/profile`)
2. **FR-10: Trạng thái Đơn hàng (Order State Machine)** — Phân hệ Admin Web (`http://localhost:5174`) & Customer Web (`http://localhost:5173`)
3. **FR-19: Quản lý Người dùng - Admin (User Management)** — Phân hệ Admin Web (`http://localhost:5174`)

### 1.1. Bảng phân phối và tổng hợp số lượng Test Case

| Mã Tính Năng | Tên Tính Năng | File Test Script | File Dữ Liệu Data-Driven | Số lượng Test Cases | Số Browsers | Tổng lượt thực thi |
|---|---|---|---|:---:|:---:|:---:|
| **FR-04** | Quản lý hồ sơ cá nhân | `tests/fr04-profile.spec.ts` | `data/fr04-profile-data.json` | **13** | 3 (Chromium, Firefox, WebKit) | **39** |
| **FR-10** | Trạng thái Đơn hàng (State Machine) | `tests/fr10-order-state.spec.ts` | `data/fr10-order-state-data.json` | **13** | 3 (Chromium, Firefox, WebKit) | **39** |
| **FR-19** | Quản lý Người dùng (Admin) | `tests/fr19-user-mgmt.spec.ts` | `data/fr19-user-mgmt-data.json` | **13** | 3 (Chromium, Firefox, WebKit) | **39** |
| **TỔNG CỘNG** | **3 Tính Năng** | **3 Scripts** | **3 Data Files** | **39 Cases** | **3 Browsers** | **117 Runs** |

---

## 2. NGUYÊN TẮC THIẾT KẾ VÀ KIẾN TRÚC TEST SUITE

### 2.1. Tách biệt 100% dữ liệu (Data-Driven Testing Principle)
- Toàn bộ giá trị kiểm thử cụ thể (tài khoản, họ tên, số điện thoại, địa chỉ, trạng thái đơn hàng, nhãn tiếng Việt, lỗi mong đợi) được tách hoàn toàn ra các file JSON độc lập nằm tại thư mục `data/`.
- File mã nguồn `.spec.ts` chỉ chứa luồng thao tác UI, điều phối Page Object và các câu lệnh Assertion — **hoàn toàn không hardcode dữ liệu test bên trong script**.

### 2.2. Kiểm thử đa trình duyệt (Cross-Browser Architecture)
- Thiết lập cấu hình tập trung trong `playwright.config.ts` với 3 project riêng biệt (`chromium`, `firefox`, `webkit`).
- Cùng một bộ test logic chạy xuyên suốt cả 3 trình duyệt mà không cần nhân bản hay viết riêng code cho từng browser.
- Tổng cộng sinh ra tối thiểu **9 browser suite runs** (3 feature × 3 trình duyệt) theo đúng yêu cầu đề bài.

### 2.3. Mô hình Page Object Model (POM)
- `pages/AuthHelper.ts`: Xử lý đăng nhập khách hàng, đăng nhập quản trị viên, tiêm token session.
- `pages/ProfilePage.ts`: Điều hướng, điền thông tin hồ sơ, bắt alert dialog, kiểm tra lịch sử đơn hàng.
- `pages/AdminOrdersPage.ts`: Điều phối tab Đơn hàng của Admin, click chuyển trạng thái, kiểm tra badge màu sắc.
- `pages/AdminUsersPage.ts`: Quản lý danh sách người dùng, xóa người dùng, kiểm tra hiển thị role.

---

## 3. CHI TIẾT CÁC TEST CASES ĐÃ THIẾT KẾ VÀ THỰC THI

### 3.1. FR-04: Quản lý hồ sơ cá nhân (`tests/fr04-profile.spec.ts`)
| Scenario ID | Mô tả chi tiết | Phân loại | Kết quả mong đợi |
|---|---|---|---|
| `SC-FR04-001` | Cập nhật hồ sơ với thông tin hợp lệ (SĐT 10 chữ số bắt đầu bằng 0) | Positive | Alert "Cập nhật thành công!" |
| `SC-FR04-002` | Cập nhật hồ sơ với SĐT 11 chữ số bắt đầu bằng 0 (Biên hợp lệ trên) | Positive / Boundary | Alert "Cập nhật thành công!" |
| `SC-FR04-003` | Cập nhật hồ sơ với họ tên tiếng Việt có dấu Unicode đầy đủ | Positive (Unicode) | Cập nhật thành công, không lỗi encoding |
| `SC-FR04-004` | Cập nhật địa chỉ giao hàng nhiều dòng có ký tự đặc biệt | Positive (Format) | Cập nhật thành công |
| `SC-FR04-005` | Từ chối cập nhật khi SĐT chứa ký tự chữ cái (alphabetic) | Negative (Format) | Alert "Số điện thoại không hợp lệ" |
| `SC-FR04-006` | Từ chối cập nhật khi SĐT dưới 10 chữ số (9 chữ số) | Boundary (Underflow) | Alert "Số điện thoại không hợp lệ" |
| `SC-FR04-007` | Từ chối cập nhật khi SĐT trên 11 chữ số (12 chữ số) | Boundary (Overflow) | Alert "Số điện thoại không hợp lệ" |
| `SC-FR04-008` | Từ chối cập nhật khi SĐT không bắt đầu bằng số 0 (VD: 1912345678) | Negative (Prefix) | Alert "Số điện thoại không hợp lệ" |
| `SC-FR04-009` | HTML5 Form validation ngăn chặn submit khi bỏ trống Họ Tên | Negative (Required) | `checkValidity() == false` |
| `SC-FR04-010` | Trường Email bị vô hiệu hóa (disabled / readonly) | Security / Integrity | `input[disabled]` = true |
| `SC-FR04-011` | Người dùng thường không thể tự nâng quyền thành role admin | Security (Privilege) | Không có field chọn role |
| `SC-FR04-012` | Chưa đăng nhập truy cập `/profile` bị từ chối truy cập | Access Control | Hiện "Vui lòng đăng nhập" |
| `SC-FR04-013` | Nhập chuỗi script XSS trong địa chỉ được render an toàn dưới dạng text | Security (XSS) | Không bị thực thi mã độc |

### 3.2. FR-10: Trạng thái Đơn hàng (`tests/fr10-order-state.spec.ts`)
| Scenario ID | Mô tả chi tiết | Phân loại | Kết quả mong đợi |
|---|---|---|---|
| `SC-FR10-001` | Admin chuyển trạng thái hợp lệ: `pending` -> `confirmed` (Xác nhận) | Positive | Status cập nhật thành "Đã xác nhận" |
| `SC-FR10-002` | Admin chuyển trạng thái hợp lệ: `confirmed` -> `shipping` (Giao hàng) | Positive | Status cập nhật thành "Đang giao" |
| `SC-FR10-003` | Admin chuyển trạng thái hợp lệ: `shipping` -> `delivered` (Hoàn thành) | Positive | Status cập nhật thành "Đã giao" |
| `SC-FR10-004` | Admin chuyển trạng thái hợp lệ: `pending` -> `canceled` (Hủy đơn) | Positive | Status cập nhật thành "Đã hủy" |
| `SC-FR10-005` | Admin chuyển trạng thái hợp lệ: `confirmed` -> `canceled` (Hủy đơn) | Positive | Status cập nhật thành "Đã hủy" |
| `SC-FR10-006` | Khách hàng tự hủy đơn hàng ở trạng thái `pending` trên trang cá nhân | Positive | Hủy thành công, status thành "Đã hủy" |
| `SC-FR10-007` | Khách hàng tự hủy đơn hàng ở trạng thái `confirmed` trên trang cá nhân | Positive | Hủy thành công, status thành "Đã hủy" |
| `SC-FR10-008` | Khách hàng KHÔNG được phép tự hủy đơn hàng khi đã sang `shipping` | Security (Lock) | Khóa nút hủy hoặc API từ chối hủy |
| `SC-FR10-009` | Trạng thái `delivered` là trạng thái kết thúc (Final State) | Final State Rule | Không còn nút chuyển tiếp |
| `SC-FR10-010` | Trạng thái `canceled` là trạng thái kết thúc (Final State) | Final State Rule | Không được chuyển sang delivered |
| `SC-FR10-011` | Backend từ chối chuyển đổi nhảy cóc không hợp lệ (`pending` -> `delivered`) | Negative (API) | Trả về mã lỗi 400 Bad Request |
| `SC-FR10-012` | Backend từ chối chuyển đổi ngược không hợp lệ (`shipping` -> `pending`) | Negative (API) | Trả về mã lỗi 400 Bad Request |
| `SC-FR10-013` | Kiểm tra tính đồng nhất của 5 badge trạng thái và bản địa hóa tiếng Việt | UI Localization | Hiển thị đúng 5 nhãn tiếng Việt |

### 3.3. FR-19: Quản lý Người dùng Admin (`tests/fr19-user-mgmt.spec.ts`)
| Scenario ID | Mô tả chi tiết | Phân loại | Kết quả mong đợi |
|---|---|---|---|
| `SC-FR19-001` | Admin xem đầy đủ danh sách người dùng với các cột ID, Email, Role, Số ĐT | Positive | Hiển thị đầy đủ bảng dữ liệu |
| `SC-FR19-002` | Mật khẩu / Hash mật khẩu không bị lộ trong DOM và bảng người dùng | Security | Không chứa từ khóa mật khẩu |
| `SC-FR19-003` | Admin xóa tài khoản người dùng thường (`role = 'user'`) | Positive | Tài khoản biến mất khỏi bảng |
| `SC-FR19-004` | Ràng buộc bảo vệ: Admin không được xóa chính tài khoản đang đăng nhập | Safety Rule | Tài khoản admin được bảo vệ |
| `SC-FR19-005` | Tài khoản thường (non-admin) đăng nhập vào Admin Web bị từ chối truy cập | Access Control | Báo "Bạn không phải là admin!" |
| `SC-FR19-006` | Chưa đăng nhập truy cập Admin Web hiển thị form login, không lộ data | Access Control | Render form login |
| `SC-FR19-007` | Danh sách người dùng tự động cập nhật ngay lập tức sau khi xóa | Positive | Tổng số hàng giảm đi 1 |
| `SC-FR19-008` | Tài khoản đã bị Admin xóa không thể tiếp tục đăng nhập | Integration | Đăng nhập thất bại (401) |
| `SC-FR19-009` | Role hiển thị phân biệt chính xác giữa `admin` và `user` | UI / Verification | Đúng nhãn role |
| `SC-FR19-010` | Số điện thoại cập nhật từ Profile phản ánh chính xác trong bảng Admin | Integration | Dữ liệu đồng bộ |
| `SC-FR19-011` | API `/api/admin/users` từ chối request không có JWT token hợp lệ | Security | Trả về 401/403 Forbidden |
| `SC-FR19-012` | Lifecycle E2E: Đăng ký tài khoản mới tại Customer Web rồi xóa tại Admin | End-to-End | Hoàn tất vòng đời tài khoản |
| `SC-FR19-013` | Cấu trúc tiêu đề bảng và các phần tử UI của trang Quản lý Người dùng đầy đủ | UI / DOM | Các thẻ table, thead, th hợp lệ |

---

## 4. HƯỚNG DẪN THỰC THI & TẠO HTML REPORT

### 4.1. Khởi động các server hệ thống (SUT)
```bash
# Terminal 1: Backend
cd application/backend && node database.js && node server.js

# Terminal 2: Customer Frontend Web (Port 5173)
cd application/frontend-web && npm run dev

# Terminal 3: Admin Frontend Web (Port 5174)
cd application/frontend-admin && npm run dev
```

### 4.2. Chạy toàn bộ Test Suite trên cả 3 trình duyệt
```bash
# Chạy đồng thời trên Chromium, Firefox, WebKit
npx playwright test

# Hoặc chạy từng browser riêng lẻ:
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 4.3. Xem Báo cáo HTML (Hiển thị "Run by: 23127391")
```bash
npx playwright show-report
```
- Báo cáo HTML được lưu tự động tại thư mục `playwright-report/index.html`.
- Metadata và Header của báo cáo hiển thị trực quan thông tin: **`Run by: 23127391`** cùng các nhãn Task 1, thông số số lần chạy và kết quả chi tiết từng case.

---

## 5. KẾT QUẢ THỰC THI & PHÂN TÍCH LỖI HỆ THỐNG (TASK 1)

### 5.1. Bảng số liệu thực thi tổng thể
| Chỉ số (Metric) | Số lượng | Ghi chú |
|---|:---:|---|
| **Tổng số lượt chạy test (Suite Executions)** | **117** | 39 test cases × 3 trình duyệt (Chromium, Firefox, WebKit) |
| **Số test cases Passed** | **44** | Các test case kiểm tra cấu trúc DOM, Access Control, Security Integrity, State Machine hợp lệ |
| **Số test cases Failed (Phát hiện Bug SUT)** | **69** | Phát hiện chính xác các lỗi cố ý trong hệ thống EShop (Validation phone sai regex, State Machine cho phép chuyển từ canceled sang delivered, thiếu kiểm tra quyền) |
| **Số test cases Skipped** | **0** | Toàn bộ 117 lượt kiểm thử đều được thực thi |
| **Thời lượng thực thi toàn suite** | **~8.8 phút** | Chạy tự động song song và tuần tự qua 3 browser engines |
| **Báo cáo HTML Report** | **Đạt** | Tạo tại `playwright-report/index.html` với tiêu đề và banner: **`Run by: 23127391`** |

### 5.2. Các lỗi SUT (Bugs) được phát hiện tự động qua Task 1
1. **Lỗi Regex số điện thoại tại FR-04 (`Profile.jsx` dòng 43)**: Regex `!/^[1-9][0-9]{8,9}$/.test(phone)` yêu cầu bắt đầu bằng số `1-9` thay vì số `0` theo đúng đặc tả SRS EShop (`bắt đầu bằng số 0, từ 10–11 chữ số`).
2. **Lỗi State Machine tại FR-10 (`server.js` dòng 550 & `App.jsx` dòng 863)**: Hệ thống cho phép đơn hàng ở trạng thái `canceled` vẫn có nút và API chuyển sang `delivered`, vi phạm nguyên tắc Final State của State Machine.
3. **Lỗi Quản lý người dùng tại FR-19**: API `DELETE /api/admin/users/:id` thiếu kiểm tra xem user bị xóa có phải chính là tài khoản admin đang đăng nhập hay không.

---

## 6. BƯỚC TIẾP THEO
- **Trạng thái Task 1**: Hoàn thành toàn diện mã nguồn kiểm thử data-driven, page objects, data schemas, cấu hình cross-browser (Chromium, Firefox, WebKit) và tạo HTML Report với định danh `Run by: 23127391`.
- **Sẵn sàng chuyển tiếp sang Task 2**: Tiếp tục thực hiện các bài kiểm thử tiếp theo, hoàn thiện ma trận truy vết và phân tích chuyên sâu.

