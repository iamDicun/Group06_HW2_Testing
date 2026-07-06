# FR-03: Quên Mật Khẩu & Đặt Lại Mật Khẩu — Thiết kế kiểm thử

## PHẦN 1: BẢNG QUYẾT ĐỊNH (DECISION TABLE TESTING) — Bước 2: Đặt lại mật khẩu

### Bảng Quyết Định Đầy Đủ (Full Decision Table)

| Điều Kiện / Hành Động | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1: Mã OTP hợp lệ?** | Y | Y | Y | Y | N | N | N | N |
| **C2: Mật khẩu mới hợp lệ?** | Y | Y | N | N | Y | Y | N | N |
| **C3: Xác nhận mật khẩu khớp?** | Y | N | Y | N | Y | N | Y | N |
| **A1: Đổi mật khẩu thành công** | **X** | | | | | | | |
| **A2: Hiển thị thông báo lỗi** | | **X** | **X** | **X** | **X** | **X** | **X** | **X** |
| **A3: Giữ nguyên màn hình đặt lại** | | **X** | **X** | **X** | **X** | **X** | **X** | **X** |

### Bảng Quyết Định Sau Khi Rút Gọn (Collapsed Decision Table)

| Điều Kiện / Hành Động | R1 | R2 | R3 | R4 | R5 (Rút gọn từ R5–R8) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **C1: Mã OTP hợp lệ?** | Y | Y | Y | Y | **N** |
| **C2: Mật khẩu mới hợp lệ?** | Y | Y | N | N | **-** |
| **C3: Xác nhận mật khẩu khớp?** | Y | N | Y | N | **-** |
| **A1: Đổi mật khẩu thành công** | **X** | | | | |
| **A2: Hiển thị thông báo lỗi** | | **X** | **X** | **X** | **X** |
| **A3: Giữ nguyên màn hình đặt lại** | | **X** | **X** | **X** | **X** |

### Danh sách kịch bản kiểm thử từ Bảng Quyết Định
- **TC-DT-01 (R1):** OTP đúng + mật khẩu đúng định dạng + xác nhận khớp → Thành công
- **TC-DT-02 (R2):** OTP đúng + mật khẩu hợp lệ + xác nhận không khớp → Lỗi "Xác nhận không trùng khớp"
- **TC-DT-03 (R3):** OTP đúng + mật khẩu sai định dạng + xác nhận khớp → Lỗi "Mật khẩu không đúng định dạng"
- **TC-DT-04 (R4):** OTP đúng + mật khẩu sai định dạng + xác nhận không khớp → Lỗi (định dạng/không khớp)
- **TC-DT-05 (R5):** OTP sai (bất kể mật khẩu thế nào) → Lỗi "Mã OTP không chính xác hoặc đã hết hạn"

---

## PHẦN 2: KIỂM THỬ CẶP (PAIRWISE TESTING) — Luồng tích hợp Bước 1 → Bước 2

### Tham số (Parameters) và Giá trị (Values)

| Tham số | Giá trị |
|:---|:---|
| **Email (Bước 1)** | Valid (tồn tại trên hệ thống) / Invalid (sai định dạng hoặc chưa đăng ký) |
| **Mã OTP (Bước 2)** | Valid (nhập đúng mã 4 số) / Invalid (nhập sai số, hết hạn, hoặc của email khác) |
| **Mật khẩu mới (Bước 2)** | Valid (đáp ứng tiêu chí FR-01) / Invalid (vi phạm tiêu chí) |
| **Xác nhận mật khẩu (Bước 2)** | Match (trùng khớp) / Mismatch (không trùng khớp) |

### Ma Trận Kịch Bản Tối Ưu Hóa Bằng Pairwise (Pairwise Array)

| Test Case ID | Email (B1) | Mã OTP (B2) | Mật khẩu mới (B2) | Xác nhận MK (B2) | Kết quả kỳ vọng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PW-01** | Valid | Valid | Valid | Match | Thành công: luồng thông suốt, đặt lại mật khẩu thành công |
| **TC-PW-02** | Valid | Invalid | Invalid | Mismatch | Thất bại: lỗi OTP + lỗi mật khẩu/không khớp |
| **TC-PW-03** | Invalid | Valid | Invalid | Match | Thất bại: chặn từ Bước 1 (email không hợp lệ) |
| **TC-PW-04** | Invalid | Invalid | Valid | Mismatch | Thất bại: chặn từ Bước 1, lỗi OTP + lỗi xác nhận |

---

# KẾ HOẠCH KIỂM THỬ (TEST PLAN)
## CHỨC NĂNG: FR-03 - QUÊN MẬT KHẨU & ĐẶT LẠI MẬT KHẨU (2 BƯỚC)

---

## 1. TỔNG QUAN (OVERVIEW)
Tài liệu này xác định chiến lược, phạm vi, tiêu chí đánh giá và lộ trình kiểm thử cho chức năng **FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)**. Mục tiêu cốt lõi là đảm bảo luồng nghiệp vụ hoạt động chính xác theo đặc tả, kiểm soát toàn bộ các rủi ro về mặt logic dữ liệu, bảo mật tài khoản người dùng, và tối ưu hóa trải nghiệm giao diện.

---

## 2. PHẠM VI KIỂM THỬ (SCOPE)

### 2.1. Thành phần kiểm thử (In-Scope):
* **Luồng Bước 1 (Lấy mã OTP):** Xác thực định dạng email; kiểm tra sự tồn tại của email trên hệ thống; xác minh hệ thống sinh mã OTP ngẫu nhiên gồm đúng 6 chữ số.
* **Luồng Bước 2 (Đặt lại mật khẩu):** Xác thực mã OTP trùng khớp với email đã yêu cầu; kiểm tra điều kiện độ phức tạp mật khẩu mới (theo chuẩn FR-01); đối chiếu tính trùng khớp giữa mật khẩu mới và trường xác nhận mật khẩu.
* **Giao diện & Điều hướng (UI/UX):** Xác minh hiển thị Chỉ báo bước (`Step Indicator — Bước 1 / 2` và `Bước 2 / 2`); kiểm tra hoạt động của nút `Quay lại đăng nhập` tại Bước 1; xác minh tính năng hiển thị trực tiếp OTP trên màn hình trong môi trường demo.

### 2.2. Thành phần không kiểm thử (Out-of-Scope):
* Hiệu năng và độ trễ của dịch vụ gửi Email từ bên thứ ba (do hệ thống đang chạy trong môi trường demo hiển thị OTP trực tiếp).
* Chức năng **FR-04: Quản lý hồ sơ cá nhân**.

---

## 3. CHIẾN LƯỢC KIỂM THỬ (TEST STRATEGY)

Quy trình sẽ áp dụng phương pháp kiểm thử hộp đen (Black-box Testing) kết hợp chặt chẽ giữa các kỹ thuật thiết kế kịch bản nâng cao nhằm tối ưu hóa công sức và tăng độ bao phủ hệ thống:

* **Decision Table Testing (Áp dụng cho Bước 2):** Tập trung bao phủ 100% các tổ hợp logic phối hợp giữa tính hợp lệ của mã OTP, định dạng mật khẩu mới và tính trùng khớp của trường xác nhận.
* **Pairwise Testing (Áp dụng cho tích hợp liên luồng B1 + B2):** Tối ưu hóa các biến đầu vào từ Bước 1 sang Bước 2 (Email, OTP, Mật khẩu, Xác nhận) nhằm giảm thiểu số lượng test case trùng lặp nhưng vẫn phát hiện được các lỗi do sự tương tác giữa các tham số.

### 3.1. Các Loại Kiểm Thử Áp Dụng:
* **Functional Testing (Kiểm thử chức năng):** Xác thực các quy tắc nghiệp vụ (Business Rules) từ phân vùng tương đương và giá trị biên.
* **UI/UX Testing (Kiểm thử giao diện):** Đảm bảo hiển thị đúng trạng thái của chỉ báo luồng và các nút chức năng bổ trợ.
* **Security Testing (Kiểm thử bảo mật):** Đảm bảo mã OTP của tài khoản này không thể bypass hoặc sử dụng chéo cho một tài khoản email khác.

---

## 4. TIÊU CHÍ BẮT ĐẦU VÀ KẾT THÚC (ENTRY & EXIT CRITERIA)

### 4.1. Tiêu chí bắt đầu (Entry Criteria):
* Tài liệu đặc tả yêu cầu (SRS) của chức năng FR-03 đã đóng (Freeze) và được phê duyệt.
* Môi trường demo đã triển khai phiên bản (Build) ổn định; tính năng hiển thị OTP trực tiếp trên giao diện hoạt động bình thường.
* Tài liệu kịch bản kiểm thử nền tảng dành cho Agent (`Agent_Skill_Forgot_Password_v2.md`) đã sẵn sàng.

### 4.2. Tiêu chí kết thúc (Exit Criteria):
* Thực thi thành công và đầy đủ **100%** các kịch bản kiểm thử trong Bảng quyết định rút gọn (5 test cases) và Ma trận cặp Pairwise (4 test cases).
* Không còn lỗi (Bug) nghiêm trọng thuộc mức độ **Blocker, Critical, hoặc Major** còn mở (Open).
* Tỷ lệ kiểm thử thành công (Pass Rate) đạt tối thiểu **95%** trên tổng số test cases quy định.

---

## 5. DANH SÁCH MA TRẬN KỊCH BẢN KIỂM THỬ (TEST CASE MATRIX)

### 5.1. Nhóm Kịch Bản Logic Nghiệp Vụ (Rút Gọn Từ Decision Table)
| Test Case ID | Tên Kịch Bản Kiểm Thử | Điều Kiện Đầu Vào | Kết Quả Kỳ Vọng |
| :--- | :--- | :--- | :--- |
| **TC-DT-01** | Đặt lại mật khẩu thành công | OTP hợp lệ + Mật khẩu mới hợp lệ + Xác nhận trùng khớp. | Đổi mật khẩu thành công trên DB; điều hướng về màn hình Đăng nhập. |
| **TC-DT-02** | Lỗi xác nhận mật khẩu không khớp | OTP hợp lệ + Mật khẩu mới hợp lệ + Xác nhận không khớp. | Báo lỗi "Xác nhận mật khẩu không trùng khớp"; giữ nguyên màn hình. |
| **TC-DT-03** | Lỗi định dạng mật khẩu mới | OTP hợp lệ + Mật khẩu mới SAI định dạng + Xác nhận trùng khớp. | Báo lỗi "Mật khẩu mới không đáp ứng tiêu chuẩn an toàn FR-01". |
| **TC-DT-04** | Lỗi tổ hợp dữ liệu mật khẩu | OTP hợp lệ + Mật khẩu mới SAI định dạng + Xác nhận không khớp. | Hiển thị thông báo lỗi định dạng/không khớp tương ứng. |
| **TC-DT-05** | Từ chối đổi mật khẩu do OTP sai | OTP SAI hoặc hết hạn (Không cần xét điều kiện của các trường mật khẩu). | Báo lỗi "Mã OTP không chính xác hoặc đã hết hạn". |

### 5.2. Nhóm Kịch Bản Tích Hợp Toàn Luồng (Pairwise)
| Test Case ID | Email (B1) | Mã OTP (B2) | Mật khẩu mới (B2) | Xác nhận MK (B2) | Kết Quả Kỳ Vọng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PW-01** | Hợp lệ | Hợp lệ | Hợp lệ | Trùng khớp | **Pass:** Cập nhật mật khẩu mới thành công. |
| **TC-PW-02** | Hợp lệ | Không hợp lệ | Không hợp lệ | Không khớp | **Fail:** Hệ thống chặn và báo lỗi tại màn hình Bước 2. |
| **TC-PW-03** | Không hợp lệ | Hợp lệ | Không hợp lệ | Trùng khớp | **Fail:** Bị chặn ngay từ B1 (Không sinh mã). |
| **TC-PW-04** | Không hợp lệ | Không hợp lệ | Hợp lệ | Không khớp | **Fail:** Bị chặn từ B1; Báo lỗi tại B2 nếu cố tình bypass. |

### 5.3. Nhóm Kịch Bản Giao Diện & Điều Hướng Luồng (UI/UX)
* **TC-UI-01 (Step Indicator):** Xác minh màn hình lấy OTP hiển thị "Bước 1 / 2" và tự động chuyển sang hiển thị "Bước 2 / 2" khi qua màn hình đặt lại mật khẩu.
* **TC-UI-02 (Nút Quay lại):** Xác minh khi nhấn nút "Quay lại đăng nhập" tại giao diện Bước 1, hệ thống hủy luồng quên mật khẩu ngay lập tức và điều hướng về trang Đăng nhập.
* **TC-UI-03 (Hiển thị OTP):** Xác minh mã OTP gồm đúng 6 chữ số ngẫu nhiên được hiển thị trực tiếp ngay trên màn hình demo sau khi gửi email thành công.

---

## 6. MÔI TRƯỜNG VÀ CÔNG CỤ (ENVIRONMENT & TOOLS)
* **Môi trường thử nghiệm:** Web Browser (Chrome, Edge, Safari) chạy trên máy chủ Staging/Demo của dự án.
* **Công cụ quản lý:** Jira / TestRail (hoặc hệ thống quản lý nội bộ của Agent).

---

## 7. QUẢN LÝ RỦI RO (RISK MANAGEMENT)

| STT | Rủi Ro Có Thể Xảy Ra | Mức Độ | Giải Pháp Giảm Thiểu |
| :--- | :--- | :---: | :--- |
| 1 | Hệ thống demo sinh mã OTP cố định hoặc không ngẫu nhiên (dễ bị đoán trước). | Trung bình | Yêu cầu Agent thực hiện bấm nhận OTP liên tục 5 lần để đối chiếu xem chuỗi 6 số có thay đổi ngẫu nhiên không. |
| 2 | Thiếu định nghĩa rõ ràng về Regex/Điều kiện mật khẩu từ chức năng FR-01. | Cao | QA Lead/Agent phải chủ động làm việc với BA để lấy chính xác tiêu chuẩn mật khẩu (độ dài, viết hoa, ký tự đặc biệt) trước khi chuẩn bị Data Test. |