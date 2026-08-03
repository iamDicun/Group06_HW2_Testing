# HW03 - GUI & Usability Testing on EShop

**Sinh viên:** Bùi Dương Duy Cường  
**MSSV:** 23127033  
**Lớp / Nhóm:** Nhóm 06  
**Mã Bài Tập:** HW03-AI  

Dự án này chứa tài liệu báo cáo, checklist và các kịch bản kiểm thử cho bài tập **HW03 - GUI & Usability**.

---

## 📊 Bảng Đánh Giá Kết Quả Kiểm Thử (Test Summary Report)

* **Số lượng màn hình / luồng kiểm thử (Screens / Flows Tested):**
  * **Màn hình:** 6 màn hình chính (Đăng nhập, Đăng ký, Quên mật khẩu, Chi tiết sản phẩm, Giỏ hàng, Checkout, Admin Dashboard).
  * **Luồng kiểm thử (Flow):** Luồng mua hàng End-to-End (Đăng ký tài khoản mới -> Tìm kiếm "iPhone" -> Thêm 2 iPhone vào giỏ -> Áp mã giảm giá -> Điền thông tin thanh toán -> Xác nhận đặt hàng).
* **Số lượng mục checklist (Checklist Items):**
  * **Thiết kế (Designed):** 60 mục.
  * **Thực thi (Executed):** 60 mục trên 3 trình duyệt (Chrome, Firefox, Safari Mobile) = 180 lượt thực thi.
* **Liên kết minh chứng:**
  * **Link Video Demo AI Agent Skill (YouTube):** https://youtu.be/LqkgvLuubdM
  * **Link Minh Chứng 7 Người Tham Gia (Google Drive):** https://drive.google.com/drive/folders/1BRLANvJOL6A_MZ9EkViuCaw-ANXOslwg?usp=sharing

---

## 📝 Bảng Tự Đánh Giá (Self-Assessment Table)

| No. | Criteria | Grade | Self-Assessed Grade |
| :---: | :--- | :---: | :---: |
| **1** | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **30** |
| **2** | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **40** |
| **3** | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **20** |
| **4** | Agent Skills | 10 | **10** |
| | **Total** | **100** | **100** |

---

## 🌐 Báo Cáo Tóm Tắt Cross-Browser Checklist

Dưới đây là thống kê kết quả thực thi 60 mục kiểm thử giao diện đối chiếu trên cả 3 trình duyệt/nền tảng:

### 1. Google Chrome (Desktop)
* **Trạng thái:** Hoàn tất thực thi.
* **Kết quả:** **41 Đạt (Passed) / 19 Lỗi (Failed)**.
* **Chi tiết lỗi:** 9 lỗi GUI (màu sắc nút bấm, ẩn mật khẩu, lỗi email input...) và 10 lỗi Usability (logic đổi mật khẩu, áp mã coupon SAVE10...).
* **Minh chứng:** Đã đồng bộ thành công 19 lỗi lên GitHub Issues (từ Issue #110 đến #128) kèm ảnh chụp màn hình có đóng dấu watermark ở góc dưới bên trái.

### 2. Mozilla Firefox (Desktop)
* **Trạng thái:** Hoàn tất thực thi.
* **Kết quả:** **41 Đạt (Passed) / 19 Lỗi (Failed)** (Khớp hoàn toàn với lỗi trên Chrome do sử dụng chung nhân Web).
* **Minh chứng:** Ảnh chụp màn hình lỗi trên trình duyệt Firefox được lưu tại thư mục `bug-report/evidence/firefox/` có đóng dấu watermark ở góc dưới bên trái.

### 3. Safari Mobile (iOS - Responsive)
* **Trạng thái:** Hoàn tất thực thi.
* **Kết quả:** **51 Đạt (Passed) / 9 Lỗi (Failed)**.
* **Đặc thù Mobile:** 
  * Nhiều lỗi trên Desktop **đã được tự động sửa đổi hoặc không áp dụng** trên mobile (gộp sản phẩm giỏ hàng thành công, hiển thị mật khẩu ẩn chuẩn xác, tiêu đề đăng nhập đúng, khóa cứng ô tổng tiền...).
  * Phát hiện **1 lỗi mới đặc thù mobile (BUG-FR-07-005)**: Nhập số lượng `x` trong giỏ hàng luôn bị tự động tăng thêm 1 đơn vị thành `x+1`.
* **Minh chứng:** Ảnh chụp màn hình lỗi trên Safari di động được lưu tại thư mục `bug-report/evidence/safari/` có đóng dấu watermark màu vàng nổi bật ở góc dưới bên trái.

---

## 📂 Thư Mục Dự Án (Project Folder Structure)

* 📄 **[README.md](README.md)**: File này (chứa Test Summary và bảng tự đánh giá).
* 📄 **[main_report.md](main_report.md)**: Báo cáo chính bao gồm cả 3 checklist (Chrome, Firefox, Safari) và phân tích usability Task 2.
* 📄 **[main_report.pdf](main_report.pdf)**: Bản PDF xuất bản chính thức của báo cáo chính.
* 📄 **[checklist_chrome.xlsx](checklist_chrome.xlsx)**: File Excel checklist riêng cho Chrome kèm theo Test Summary.
* 📄 **[usability_session_evidence.md](usability_session_evidence.md)**: Hồ sơ Usability Testing của 7 người dùng (Scenarios, Bảng điểm SUS, Observation Notes, Severity Findings).
* 📁 **[bug-report/](bug-report/)**: Chứa 19 báo cáo lỗi `.md` được chia thành:
  * 📁 `gui/`: Chứa 9 báo cáo lỗi giao diện.
  * 📁 `usability/`: Chứa 10 báo cáo lỗi khả dụng.
* 📁 **[bug-report/evidence/](bug-report/evidence/)**: Thư mục chứa ảnh chụp màn hình lỗi, được phân chia theo trình duyệt:
  * 📁 `chrome/`: Ảnh chụp màn hình lỗi trên Google Chrome.
  * 📁 `firefox/`: Ảnh chụp màn hình lỗi trên Mozilla Firefox (chèn watermark).
  * 📁 `safari/`: Ảnh chụp màn hình lỗi trên Safari Mobile (chèn watermark vàng).
  * 📁 `github issue screenshot/`: Ảnh chụp màn hình 19 lỗi trên GitHub Issues (chèn watermark).
* 📁 **[gui-usability-tester-skills/](gui-usability-tester-skills/)**: Thư mục định nghĩa Agent Skill kiểm thử GUI & Usability có thể tái sử dụng.
* 📄 **[ai_disclosure.md](ai_disclosure.md)**, **[ai_audit.md](ai_audit.md)**, **[ai_critique.md](ai_critique.md)**: Báo cáo khai báo AI, kiểm toán V/I/IC (G9.3 & G9.4) và phê bình AI.
* 📄 **[git_log.md](git_log.md)**: Nhật ký các commit git.
* 📄 **[prompt_log.md](prompt_log.md)**: Nhật ký các prompt đã tương tác với AI.
