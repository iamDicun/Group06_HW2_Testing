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
  * **Đạt (Passed):** 41 mục trên Chrome/Firefox, 51 mục trên Safari Mobile.
  * **Lỗi (Failed):** 19 mục trên Chrome/Firefox, 9 mục trên Safari Mobile.
* **Số lượng lỗi phát hiện (Bugs Found):** 19 lỗi (9 lỗi GUI và 10 lỗi Usability, được log chi tiết trong thư mục `bug-report/`).
* **Số lượng người tham gia đánh giá usability (Participants):** 7 người dùng thực tế.
* **Liên kết minh chứng:**
  * **Link Video Demo AI Agent Skill (YouTube):** https://youtu.be/LqkgvLuubdM
  * **Link Minh Chứng 7 Người Tham Gia (Google Drive):** https://drive.google.com/drive/folders/1BRLANvJOL6A_MZ9EkViuCaw-ANXOslwg?usp=sharing

---

## 📝 Bảng Tự Đánh Giá (Self-Assessment Table)

| STT | Nội Dung Kiểm Thử (Criteria) | Điểm Tối Đa (Max Grade) | Điểm Tự Đánh Giá (Self-Assessed Grade) | Minh Chứng / Ghi Chú |
|---|---|---|---|---|
| 1 | **Task 1 — GUI Checklist** (Thiết kế + Thực thi + Báo cáo lỗi) | 30 | **30** | Thiết kế checklist 60 mục; thực thi chi tiết; tìm và log 19 lỗi thực tế kèm file `.md` và issue GitHub. |
| 2 | **Task 2 — Usability Evaluation** (Kịch bản nhiệm vụ + Điều phối 7 phiên + Phân tích SUS) | 40 | **40** | Điều phối 7 người dùng thực tế; tính toán chi tiết điểm SUS trung bình (46.43/100); phân loại 10 lỗi khả dụng. |
| 3 | **Task 3 — Cross-Browser / Cross-Platform** (Thực thi trên Chrome, Firefox và Safari Mobile) | 20 | **20** | Kiểm thử và so sánh đầy đủ 60 mục checklist trên 3 trình duyệt Chrome, Firefox, Safari (Mobile). |
| 4 | **Agent Skills** (Xây dựng công cụ hỗ trợ và cộng tác AI) | 10 | **10** | Viết script chèn watermark ảnh tự động và script đồng bộ issue lên GitHub CLI rất hiệu quả. |
| | **TỔNG CỘNG** | **100** | **100 / 100** | Hoàn thành xuất sắc toàn bộ yêu cầu, tài liệu chuẩn hóa relative path. |

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
