# HW03 - System Testing & Usability Evaluation (Group 06)

## 📌 Tổng quan các Chỉ số Kiểm thử (Test Execution Metrics)

### A. Thống kê GUI Testing Checklist
- **Number of Scenes / Pages Tested**: 5 (Home, Product Detail, Cart, Checkout, Auth/Profile)
- **Tested Flows**: Product Search & Filtering, Cart Management, Checkout Process, User Authentication & Profile Management.
- **Number of Checklist Items**: 45 Items
- **Design Status**: 45/45 Executed
- **Execute Status**: 45 Executed
- **Pass Count**: 18 / 45
- **Failed Count**: 27 / 45
- **Number of GUI Bugs**: 27 Bugs (Gồm 3 High, 15 Medium, 9 Low - Chi tiết trong `01_Bug_Reports/bug_reports.md`)

### B. Thống kê Usability Evaluation
- **Task Evaluated**: Task U-01 (Tìm kiếm & Thêm sản phẩm vào giỏ hàng)
- **Number of Participants**: 7 Participants (P01 đến P07)
- **Usability Findings**: 4 Key Findings (F-01: Major, F-02: Minor, F-03: Minor, F-04: Minor)
- **Completion Rate**: 100% (7/7 Participants hoàn thành task)

### C. Đường dẫn Demo & Bằng chứng (Evidence Links)
- **Live System Under Test (SUT)**: https://eshop-sut-clone-ktpm-1.onrender.com/
- **Usability Evidence & Video Folder (Google Drive)**: https://drive.google.com/drive/folders/1s4OzpBNs6CLrYF_Nv9pggOsyiZEf2MpL?usp=sharing
- **GitHub Repository**: https://github.com/Group06_HW2_Testing

---

### 📂 Cấu trúc thư mục (Folder Structure)

```
HW03-submission/
├── README.md                                   # Tổng quan chỉ số kiểm thử
├── Main_Report.md                              # Báo cáo chính (GUI + Usability + AI Audit)
├── 01_Bug_Reports/                             # Báo cáo lỗi & bằng chứng ảnh
│   ├── bug_reports.md                          # 27 GUI Bugs chi tiết
│   ├── image-1.png ... image-29.png            # Ảnh minh chứng từng bug
│   ├── Github_BugReport1-8.png                 # Ảnh bằng chứng GitHub issues
│   └── Chrome_Admin/Norm, Edge_Admin/Norm, Firefox_Admin/Norm.png   # Bằng chứng Cross-Browser
├── 02_Usability_Testing/                       # Kết quả đánh giá usability
│   ├── usability_test_plan.md                  # Kế hoạch usability test U-01
│   ├── usability_report.md                     # Báo cáo tổng hợp & 4 findings
│   ├── LinkQuayScreenRecording.txt             # Link video ghi hình phiên test
│   └── participant_logs/                       # Ghi chú từng phiên (P01–P07)
│       ├── P01.md ... P07.md
└── 03_Documents/                               # Tài liệu tham chiếu
    ├── gui_checklist.xlsx                      # GUI Checklist gốc + Cross_Browser_Matrix
    ├── checklist_gui.xlsx                      # Checklist tham chiếu
    ├── ai_audit.md / ai_audit.pdf              # Nhật ký sử dụng AI
    ├── ai_critique.md / ai_critique.pdf        # Phản biện AI Critique
    └── git_log.md                              # Nhật ký git
```
