# BÁO CÁO BÀI TẬP KIỂM THỬ PHẦN MỀM (HW02)
## AUTOMATION TESTING & TEST SUITE REPORT (TASK 1 & TASK 2)

**Họ và tên sinh viên:** Nguyễn Anh Khoa  
**Mã số sinh viên (MSSV):** `23127391`  
**Nhóm:** Group 06  
**Hệ thống kiểm thử (SUT):** EShop ([https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut))  
**Định danh báo cáo:** `Run by: 23127391`  
**Framework:** Playwright (TypeScript)  
**Trình duyệt mục tiêu:** 3 trình duyệt — **Chromium**, **Firefox**, **WebKit**  

---

# PHẦN I: TASK 1 — DATA-DRIVEN CROSS-BROWSER AUTOMATION TESTING

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
| **TỔNG CỘNG TASK 1** | **3 Tính Năng** | **3 Scripts** | **3 Data Files** | **39 Cases** | **3 Browsers** | **117 Runs** |

---

## 2. NGUYÊN TẮC THIẾT KẾ VÀ KIẾN TRÚC TEST SUITE (TASK 1)

### 2.1. Tách biệt 100% dữ liệu (Data-Driven Testing Principle)
- Toàn bộ giá trị kiểm thử cụ thể (tài khoản, họ tên, số điện thoại, địa chỉ, trạng thái đơn hàng, nhãn tiếng Việt, lỗi mong đợi) được tách hoàn toàn ra các file JSON độc lập nằm tại thư mục `data/`.
- File mã nguồn `.spec.ts` chỉ chứa luồng thao tác UI, điều phối Page Object và các câu lệnh Assertion — **hoàn toàn không hardcode dữ liệu test bên trong script**.

### 2.2. Kiểm thử đa trình duyệt (Cross-Browser Architecture)
- Thiết lập cấu hình tập trung trong `playwright.config.ts` với 3 project riêng biệt (`chromium`, `firefox`, `webkit`).
- Cùng một bộ test logic chạy xuyên suốt cả 3 trình duyệt mà không cần nhân bản hay viết riêng code cho từng browser.
- Đảm bảo thực thi tối thiểu **9 browser suite runs** (3 feature × 3 trình duyệt) theo đúng yêu cầu đề bài.

### 2.3. Mô hình Page Object Model (POM)
- `pages/AuthHelper.ts`: Xử lý đăng nhập khách hàng, đăng nhập quản trị viên, tiêm token session nhanh chóng.
- `pages/ProfilePage.ts`: Điều hướng, điền thông tin hồ sơ, bắt alert dialog, kiểm tra lịch sử đơn hàng.
- `pages/AdminOrdersPage.ts`: Điều phối tab Đơn hàng của Admin, click chuyển trạng thái, kiểm tra badge màu sắc.
- `pages/AdminUsersPage.ts`: Quản lý danh sách người dùng, xóa người dùng, kiểm tra hiển thị role.

---

## 3. CHI TIẾT CÁC TEST CASES ĐÃ THIẾT KẾ VÀ THỰC THI (TASK 1)

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

## 4. HƯỚNG DẪN THỰC THI & XUẤT HTML REPORT

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

## 6. KIỂM TOÁN VÀ TỐI ƯU HÓA CODE TEST (AUDIT & REFACTORING)

Nhóm đã thực hiện kiểm toán toàn diện mã nguồn test suite, xác định các điểm nghẽn và tiến hành chuẩn hóa code:

### 6.1. Khắc phục lỗi Strict Mode Violations & Fragile Selectors
- **Khắc phục Substring Match**: Thay thế bộ chọn `tr:has-text("#${orderId}")` và `tr:has-text("${email}")` bằng bộ lọc chính xác theo cell regex (`td:text-is` / `new RegExp("^#${orderId}$")`), loại bỏ triệt để xung đột khi `orderId = 1` khớp trùng hàng loạt với `#10`, `#11`, `#12`...
- **Bỏ phụ thuộc Placeholder**: Thay thế các locator tìm theo placeholder tiếng Việt cứng bằng scoped selector gắn liền cấu trúc `form input[type="text"]` và `form textarea`.
- **Định vị cột trạng thái tường minh**: Thay `row.locator('span').first()` bằng `row.locator('td:nth-child(4) span')` (Profile) và `td:nth-child(5) span` (Admin) tránh lấy nhầm các thẻ span icon hoặc badge khác.

### 6.2. Thắt chặt Assertions & Xử lý Edge Cases
- **FR-04**: Thay assertion lỏng lẻo `expect(typeof alertMsg).toBe('string')` bằng kiểm tra chính xác nội dung dialog (`expect(alertMsg).toContain(data.expectedAlert)`) và kiểm tra tính bền vững của dữ liệu sau khi `page.reload()`.
- **FR-10**: Bổ sung assertion kiểm tra chặt chẽ Final State `canceled` và `delivered` (phải có đúng `0` hành động chuyển tiếp); xác minh trạng thái không bị thay đổi trái phép khi khách hàng cố hủy đơn đang giao (`shipping`).
- **FR-19**: Bổ sung kiểm tra xác nhận tài khoản thực sự biến mất khỏi bảng (`isUserPresent() == false`) và hoàn thiện nhánh test case đồng bộ số điện thoại (`integration_profile_phone_sync`).

### 6.3. Loại bỏ Flaky Waits & Tối ưu thời gian thực thi
- Loại bỏ các lệnh `page.waitForTimeout()` cố định rải rác; chuyển sang cơ chế auto-waiting của Playwright (`waitForLoadState('networkidle')`).
- Loại bỏ đoạn chờ `dialog` ảo 3000ms trong `AdminOrdersPage.clickOrderAction` (do Admin Web không bắn popup khi thành công), giúp rút ngắn thời gian chạy test đáng kể.
## 7. Lý do AI viết scripts chưa tốt
- Do giới hạn model vì đang sử dụng Gemini 3.6 Flash, một model thông minh trung bình, nên hay bị bỏ qua các chi tiết mà chỉ quan tâm viết script chạy được, dù đã cung cấp skill về automation testing nhưng kết quả vẫn không thể hoàn hảo ngay từ lần đầu tiên.
---

# PHẦN II: TASK 2 — DEMONSTRATION VIDEO & CODE REVIEW / NARRATION

## 1. YÊU CẦU ĐỀ BÀI VÀ MỤC TIÊU TASK 2 (TASK REQUIREMENTS)

Theo đặc tả yêu cầu của đề bài **HW02 – Task 2**:
> *"Record an unlisted YouTube video of at least 5 minutes, narrated in Vietnamese, demonstrating one of your automation scripts running end to end (including the multi-browser run and the generated HTML report). Narrate at least one fix you made to the AI-generated script during your review."*

### Các mục tiêu chính cần đạt:
1. **Video minh chứng trực quan**: Video thời lượng tối thiểu **5 phút**, đăng tải ở chế độ **Không công khai (Unlisted)** trên YouTube.
2. **Thuyết minh tiếng Việt (Vietnamese Narration)**: Trình bày rõ ràng, mạch lạc về quy trình thực thi, cấu trúc kịch bản và cơ chế kiểm thử.
3. **Thực thi End-to-End & Multi-Browser**: Trình diễn kịch bản chạy tự động xuyên suốt từ đầu đến cuối trên cả **3 trình duyệt (Chromium, Firefox, WebKit)**.
4. **Trình diễn Báo cáo HTML**: Mở và giải thích báo cáo `playwright-report/index.html` với định danh tác giả **`Run by: 23127391`**.
5. **Thuyết minh Lỗi do AI sinh ra & Giải pháp tự sửa (Student Fix during Code Review)**: Phân tích chi tiết ít nhất 1 lỗi nghiêm trọng trong mã nguồn do AI sinh ra ban đầu (cụ thể là lỗi **Strict Mode Violations** khi định vị phần tử theo text content / substring matching khi có nhiều element cùng loại trong DOM) và cách thức sinh viên đã rà soát, refactor và khắc phục triệt để.

---

## 2. THÔNG TIN VIDEO MINH CHỨNG

| Tiêu chí | Thông tin chi tiết |
|---|---|
| **Đường dẫn Video (YouTube Unlisted)** | **[https://youtu.be/4UfwFlRf53Y](https://youtu.be/4UfwFlRf53Y)** |
| **Sinh viên thực hiện & Thuyết minh** | **Nguyễn Anh Khoa** (MSSV: `23127391`) |
| **Hệ thống kiểm thử (SUT)** | EShop Web Application (`http://localhost:5173` & `http://localhost:5174`) |
| **Test Framework & Browser Engines** | Playwright (TypeScript) — Chromium, Firefox, WebKit |

---

## 3. TÓM TẮT PHẦN SỬA CODE

**Strict Mode Violation** trong mã nguồn do AI sinh ra ban đầu:

- **Nguyên nhân lỗi từ AI**: AI sử dụng các bộ chọn tìm kiếm theo text/substring lỏng lẻo (như `tr:has-text("#${orderId}")` hoặc tìm textContent chung). Khi giao diện có nhiều phần tử cùng loại hoặc chứa chuỗi con trùng nhau (ví dụ: tìm đơn hàng `#1` bị khớp trùng với `#10`, `#11`, `#12`... hoặc có nhiều badge cùng trạng thái), Playwright kích hoạt cơ chế Strict Mode và ném lỗi do locator trả về nhiều hơn 1 phần tử.
- **Giải pháp tự sửa**: Refactor các locator sang dạng **khớp chính xác (exact match)** bằng regular expression (`^#${orderId}$`), kết hợp scoped selector định vị tường minh theo thứ tự cột (`td:nth-child(...)`), đảm bảo Playwright luôn định vị chính xác duy nhất 1 element mục tiêu và test suite chạy ổn định 100% trên cả 3 trình duyệt.

---


