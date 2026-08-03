# AI Audit Report

**Student:** 23127459 - Huỳnh Vương Thụy Quân

> Nếu KHÔNG dùng AI, ghi: "I do not use any AI help in this exercise."
>
> Nếu CÓ dùng AI, điền bảng bên dưới cho mỗi lần tương tác.

---

| # | AI Tool | Date & Time | Prompt | AI Output (summary/link) |
|---|---------|-------------|--------|--------------------------|
| **1** | OpenCode (Nemotron 3 Ultra) | 10:30 AM 31/07/2026 | Đóng vai Senior QA / Usability Specialist, đọc file đặc tả `README.md` của EShop để thiết kế khung Bảng GUI Checklist (>45 items, bao phủ 4 khía cạnh IA-01 đến IA-04) bằng Markdown tại `docs/gui_checklist.md`, để trống cột Status chờ thực thi test. | Tạo thành công file `gui_checklist.md` gồm **55 items** (vượt chỉ tiêu ≥45) bao phủ đủ 5 màn hình (Home, Product Detail, Cart, Checkout, Admin) với thuật ngữ ISTQB chuẩn, tham chiếu mã FR-xx. Cột Status để trống sẵn sàng cho quá trình test. |
| **2** | OpenCode (MiMo V2.5) | 21:54 01/08/2026 | Yêu cầu viết lại `bug_reports.md` (27 bugs) bằng tiếng Việt theo mẫu bảng chuẩn, đổi phương pháp kiểm tra sang dùng DevTools (như đếm `<h1>`, inspect input, responsive, network throttle) và giữ nguyên placeholder bằng chứng. Đồng thời cập nhật `gui_checklist.xlsx` thay 2 mục `alt-text` bằng thuộc tính `loading='lazy'` và `width/height`. | Cập nhật thành công 2 file: **1)** `gui_checklist.xlsx` (thay GUI-03, GUI-43 bằng thuộc tính kiểm tra qua DevTools); **2)** `bug_reports.md` (viết lại 27 bugs 100% tiếng Việt theo format mẫu, dùng DevTools cho mọi bước kiểm tra, phân loại 3 High, 16 Medium, 8 Low severity). |
| **3** | OpenCode (Big Pickle) | 08:06 03/08/2026 | Dựa trên `test-plan.md` và 7 file note cá nhân (`P01.md` đến `P07.md`), viết nội dung tương ứng cho file `findings-report.md`. | Tạo thành công `findings-report.md` (100% tiếng Việt). **Tổng quan:** 100% hoàn thành không trợ giúp (7/7), Median 29s (TB 35.3s), Rating TB (Dễ 4.9, Tự tin 4.7, Rõ 4.3). **Phân lập 4 Findings:** F-01 (Severity 3 - bấm 2 lần mới thêm giỏ), F-02 (Severity 2 - thiếu indicator giỏ hàng), F-03 (Severity 2 - không thêm được từ trang chi tiết), F-04 (Severity 2 - phản hồi thêm giỏ chậm).|
| **4** | OpenCode (Big Pickle) | 08:21 03/08/2026 | Dựa trên `gui_checklist.xlsx`, đọc toàn bộ items hiện có và tạo thêm sheet mới tên "Cross_Browser_Matrix" bao gồm thông tin Item, 4 cột kết quả cho Chrome, Firefox, Edge, Cốc Cốc và cột Notes. Giữ nguyên sheet cũ, định dạng đẹp mắt để dễ điền thực tế. | Tạo thành công sheet **"Cross_Browser_Matrix"** trong `gui_checklist.xlsx` (giữ nguyên sheet cũ 45 items). Sheet mới chứa đầy đủ 45 items (GUI-01 -> GUI-45), header xanh 3 tầng, freeze panes, auto-filter, định dạng cột wrap text. Đã thêm **Data Validation (Dropdown chọn sẵn Passed/Failed/N/A)** tại các cột trình duyệt (D:G) để hỗ trợ thao tác điền kết quả kiểm thử nhanh chóng. |
