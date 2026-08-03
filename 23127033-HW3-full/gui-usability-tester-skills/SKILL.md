---
name: gui-usability-tester
title: GUI Usability Tester - Skill Kiểm Thử Khả Dụng Giao Diện
version: 1.0.0
author: Senior QA Engineer & AI Agent Specialist
description: |
  Skill chuyên biệt giúp AI Agent tự động hóa quy trình kiểm thử khả dụng GUI, 
  bao gồm thiết kế checklist WCAG, lên kịch bản E2E Usability Testing, tính điểm SUS, 
  phân loại lỗi theo mức độ, và đồng bộ issues lên GitHub với tự động đóng dấu watermark.
  
  Hỗ trợ tiêu chuẩn: WCAG 2.1, Accessibility Guidelines IA-01 đến IA-04, SUS Score, GitHub API
categories:
  - QA Testing
  - GUI/UX Testing
  - Accessibility & Usability
  - Automation Scripts
  - Issue Tracking
triggers:
  - "gui usability test"
  - "tạo checklist WCAG"
  - "lên kịch bản E2E"
  - "tính điểm SUS"
  - "phân loại lỗi usability"
  - "đóng dấu watermark"
  - "đồng bộ GitHub issues"
  - "gui-usability-tester"
requirements:
  - PowerShell 5.0+ (cho Windows) hoặc PowerShell Core 7.0+ (cross-platform)
  - Python 3.8+ (tùy chọn, để xử lý CSV/dữ liệu)
  - GitHub CLI (gh) hoặc GitHub Personal Access Token
  - Ảnh PNG để xử lý watermark
  - Kết nối Internet (để đồng bộ GitHub)
---

# GUI Usability Tester Agent Skill

## 🎯 Tổng Quan Skill

Skill này hỗ trợ **tự động hóa toàn bộ quy trình kiểm thử khả dụng (usability) GUI** từ thiết kế checklist, lên kịch bản, tính điểm cho đến phân loại lỗi và báo cáo lên GitHub.

---

## 📋 PHẦN 1: Thiết Kế Bảng GUI Checklist (WCAG IA-01 đến IA-04)

### Bước 1.1: Xác Định Phạm Vi Kiểm Thử WCAG

Bảng checklist gồm **60 mục tiêu** được chia thành 4 danh mục tiếp cận (Accessibility) chính:

| **IA Code** | **Danh Mục** | **Số Mục** | **Mục Đích** |
|---|---|---|---|
| **IA-01** | Perceivable (Nhận Thức) | 15 | Thông tin phải nhận biết được |
| **IA-02** | Operable (Điều Hành) | 15 | Giao diện phải điều hành được |
| **IA-03** | Understandable (Hiểu Được) | 15 | Nội dung phải dễ hiểu |
| **IA-04** | Robust (Vững Chắc) | 15 | Phải tương thích với công nghệ trợ giúp |

### Bước 1.2: Danh Sách 60 Mục Tiêu WCAG Chi Tiết

#### **IA-01: Perceivable (15 mục)**
```
IA-01-001: Tất cả hình ảnh có text alternative (alt text)
IA-01-002: Video có phụ đề (captions)
IA-01-003: Audio có phiên bản văn bản
IA-01-004: Màu sắc không phải thông tin duy nhất
IA-01-005: Độ tương phản màu ≥ 4.5:1 (text)
IA-01-006: Độ tương phản ≥ 3:1 (UI components)
IA-01-007: Text có thể phóng to ≤ 200% mà không mất chức năng
IA-01-008: Responsive design hoạt động tốt
IA-01-009: Không có auto-play âm thanh > 3 giây
IA-01-010: Không có content blink/flash > 3 Hz
IA-01-011: Font size ≥ 12px (hoặc tương đương)
IA-01-012: Line height ≥ 1.5 lần font size
IA-01-013: Letter spacing ≥ 0.12em
IA-01-014: Word spacing ≥ 0.16em
IA-01-015: Không dùng chỉ vị trí/hình dạng để truyền tải thông tin
```

#### **IA-02: Operable (15 mục)**
```
IA-02-001: Mọi chức năng dùng được bằng keyboard
IA-02-002: Tab order hợp lý (top→bottom, left→right)
IA-02-003: Focus indicator rõ ràng (≥3px)
IA-02-004: Không có keyboard trap
IA-02-005: Skip links có sẵn
IA-02-006: Không yêu cầu đúc thời gian (time limit)
IA-02-007: Pause/Stop control có sẵn cho content động
IA-02-008: Không có content tự động play
IA-02-009: Có cách để tắt animations
IA-02-010: Gesture alternatives (không phụ thuộc path-based gesture)
IA-02-011: Pointer target size ≥ 44x44 px
IA-02-012: Không có motion sensors yêu cầu vật lý
IA-02-013: Target size ≥ 24x24 px (UI controls)
IA-02-014: Link text rõ ràng (không phải "click here")
IA-02-015: Popup/Modal có close button rõ ràng
```

#### **IA-03: Understandable (15 mục)**
```
IA-03-001: Ngôn ngữ trang được xác định (lang="vi")
IA-03-002: Các từ lạ/viết tắt có định nghĩa
IA-03-003: Cách phát âm được cung cấp (nếu cần)
IA-03-004: Các thay đổi context rõ ràng
IA-03-005: Navigation menu nhất quán trên tất cả trang
IA-03-006: Các component tương tự hoạt động như nhau
IA-03-007: Chỉ dẫn, ví dụ, ghi chú có sẵn
IA-03-008: Error messages rõ ràng (không chỉ mã lỗi)
IA-03-009: Suggestions để sửa lỗi được cung cấp
IA-03-010: Xác nhận trước khi thực hiện hành động quan trọng
IA-03-011: Form có labels rõ ràng
IA-03-012: Form errors được highlight
IA-03-013: Input format được gợi ý
IA-03-014: Help text dễ truy cập
IA-03-015: Ghi chú kỹ thuật không ảnh hưởng UX
```

#### **IA-04: Robust (15 mục)**
```
IA-04-001: HTML markup hợp lệ (W3C Validator)
IA-04-002: Không có duplicate IDs
IA-04-003: Attribute hợp lệ (không invalid attrs)
IA-04-004: Heading hierarchy hợp lệ (H1→H2→H3)
IA-04-005: ARIA roles được sử dụng đúng
IA-04-006: ARIA labels rõ ràng
IA-04-007: ARIA states/properties cập nhật động
IA-04-008: Semantic HTML được sử dụng (<button>, <nav>, <main>)
IA-04-009: Form controls được liên kết đúng (<label for="">)
IA-04-010: Tables có <thead>, <tbody>, <th>
IA-04-011: Screen reader test pass (NVDA, JAWS, VoiceOver)
IA-04-012: Không có text as image (ngoại trừ logos)
IA-04-013: Links có href hoặc role="button"
IA-04-014: Buttons không phải <div onclick>
IA-04-015: Landmark regions được sử dụng (<header>, <footer>, <main>)
```

### Bước 1.3: Template Bảng Checklist CSV

```csv
IA_Code,Item_Number,Test_Item,Expected_Result,Status,Severity,Evidence_URL,Notes
IA-01,001,Alt text cho hình ảnh,Tất cả img có alt attribute,☐ Pass ☐ Fail,Minor,/evidence/ia-01-001.png,
IA-01,002,Phụ đề video,Tất cả video có track kind=captions,☐ Pass ☐ Fail,Blocker,/evidence/ia-01-002.png,
...
IA-04,015,Landmark regions,Header/Main/Footer rõ ràng,☐ Pass ☐ Fail,Minor,/evidence/ia-04-015.png,
```

---

## 🎬 PHẦN 2: Lên Kịch Bản Usability Testing E2E & Tính Điểm SUS

### Bước 2.1: Thiết Kế Kịch Bản E2E Usability Testing

#### **Cấu Trúc 1 Test Scenario:**

```yaml
Test_ID: USE-001
Title: "Người dùng mới có thể tạo tài khoản trong 5 phút"
Pre-condition: |
  - Browser trên Windows/Mac/Linux
  - Không có account sẵn
  - Internet kết nối tốt
Steps:
  - Step 1: Mở trang chủ https://app.example.com
    Expected_Result: Trang tải xong, thấy button "Sign Up"
    Evidence: screenshot_1.png
    Duration_Seconds: 5
    
  - Step 2: Click button "Sign Up"
    Expected_Result: Modal sign-up form xuất hiện
    Evidence: screenshot_2.png
    Duration_Seconds: 3
    
  - Step 3: Nhập email hợp lệ
    Expected_Result: Field chấp nhận input, không error
    Evidence: screenshot_3.png
    Duration_Seconds: 10
    
  - Step 4: Nhập password (8+ ký tự, 1 uppercase, 1 number)
    Expected_Result: Password được chấp nhận, meter xanh
    Evidence: screenshot_4.png
    Duration_Seconds: 15
    
  - Step 5: Click button "Create Account"
    Expected_Result: Account được tạo, redirect tới dashboard
    Evidence: screenshot_5.png
    Duration_Seconds: 3

Post-condition: |
  - Người dùng đã login thành công
  - Email xác nhận được gửi

Total_Duration_Expected: 36 seconds
Usability_Metrics:
  - Task_Completion_Rate: (%)
  - Error_Rate: (%)
  - Time_on_Task: (seconds)
  - Satisfaction_Rating: (1-5)
```

#### **Mẫu 5 Kịch Bản E2E Chuẩn:**

1. **USE-001**: Onboarding & Registration
2. **USE-002**: Basic Navigation & Search
3. **USE-003**: Form Submission & Data Validation
4. **USE-004**: Error Handling & Recovery
5. **USE-005**: Accessibility & Mobile Responsiveness

### Bước 2.2: Tính Điểm SUS (System Usability Scale)

#### **10 Câu Hỏi SUS Tiêu Chuẩn:**

```
Q1: Tôi thấy hệ thống này hữu ích trong công việc hàng ngày.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý)

Q2: Tôi thấy hệ thống này phức tạp để sử dụng.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý) [REVERSED]

Q3: Tôi thấy dễ sử dụng hệ thống này.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý)

Q4: Tôi cần hỗ trợ kỹ thuật để sử dụng hệ thống này.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý) [REVERSED]

Q5: Các chức năng trong hệ thống tích hợp tốt.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý)

Q6: Tôi thấy có quá nhiều sự không nhất quán trong hệ thống.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý) [REVERSED]

Q7: Tôi nghĩ hầu hết mọi người sẽ học cách sử dụng nhanh chóng.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý)

Q8: Tôi thấy hệ thống rất phức tạp/cồng kềnh.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý) [REVERSED]

Q9: Tôi cảm thấy tự tin khi sử dụng hệ thống này.
   (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý)

Q10: Tôi phải học nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống.
    (1: Hoàn toàn không đồng ý ← → 5: Hoàn toàn đồng ý) [REVERSED]
```

#### **Công Thức Tính SUS Score:**

```
1. Với câu lẻ (Q1, Q3, Q5, Q7, Q9): Score = (Response - 1)
2. Với câu chẵn (Q2, Q4, Q6, Q8, Q10) [REVERSED]: Score = (5 - Response)
3. SUS Score = (Tổng tất cả scores) × 2.5

Range:
- 0-25: Unacceptable
- 26-50: Poor
- 51-72: Acceptable
- 73-85: Good
- 86-100: Excellent
```

#### **Mẫu Tính SUS:**

```
Example: Người dùng trả lời [4, 2, 4, 1, 5, 2, 4, 2, 4, 1]

Q1 (4): (4-1) = 3
Q2 (2): (5-2) = 3 [reversed]
Q3 (4): (4-1) = 3
Q4 (1): (5-1) = 4 [reversed]
Q5 (5): (5-1) = 4
Q6 (2): (5-2) = 3 [reversed]
Q7 (4): (4-1) = 3
Q8 (2): (5-2) = 3 [reversed]
Q9 (4): (4-1) = 3
Q10 (1): (5-1) = 4 [reversed]

Tổng: 3+3+3+4+4+3+3+3+3+4 = 33
SUS Score: 33 × 2.5 = 82.5 (Good)
```

---

## 🐛 PHẦN 3: Phân Loại Lỗi Khả Dụng Theo Mức Độ Nghiêm Trọng

### Bước 3.1: Định Nghĩa Mức Độ Lỗi

#### **BLOCKER (Critical/Catastrophic)**
- **Ảnh hưởng**: Người dùng không thể hoàn thành task chính
- **Ví dụ**:
  - Nút "Submit" không hoạt động
  - Form redirect sai sau submit
  - Screen reader hoàn toàn không đọc được nội dung
  - Keyboard navigation hoàn toàn không thể sử dụng
  - Login functionality bị hỏng
- **SLA Fix**: 24-48 giờ
- **Symbol**: 🔴 BLOCKER

#### **MAJOR (High Priority)**
- **Ảnh hưởng**: Tác động lớn đến UX, làm chậm công việc
- **Ví dụ**:
  - Tab order không logic
  - Alt text bị thiếu trên hình quan trọng
  - Error message không rõ ràng
  - Button/link focus indicator bị ẩn
  - Độ tương phản màu < 4.5:1 (text)
  - Form validation delay > 3 giây
- **SLA Fix**: 3-5 ngày
- **Symbol**: 🟠 MAJOR

#### **MINOR (Low Priority)**
- **Ảnh hưởng**: Ảnh hưởng nhỏ, UX không bị gián đoạn
- **Ví dụ**:
  - Typo trong label
  - Color palette không thống nhất
  - Hover state quá nhạt
  - Font size < 12px nhưng > 10px
  - Skip link không hiển thị rõ
  - Placeholder text không khác biệt với value
- **SLA Fix**: 2-3 tuần
- **Symbol**: 🟡 MINOR

#### **COSMETIC (Wishlist)**
- **Ảnh hưởng**: Chỉ mang tính thẩm mỹ
- **Ví dụ**:
  - Icon style khác nhau
  - Spacing không hoàn hảo
  - Animation timing không mình mẫn
- **SLA Fix**: Trong sprint tới hoặc không fix
- **Symbol**: ⚪ COSMETIC

### Bước 3.2: Template Phân Loại Lỗi

```markdown
## Bug Report: [ID-001]

**Title**: [Mô tả ngắn]
**Severity**: 🔴 BLOCKER / 🟠 MAJOR / 🟡 MINOR / ⚪ COSMETIC
**Component**: [Form/Navigation/Header/...]
**Related_IA**: [IA-01-002, IA-02-001, ...]

### Description
[Mô tả chi tiết lỗi, tác động]

### Steps to Reproduce
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

### Expected Result
[Kết quả mong đợi]

### Actual Result
[Kết quả thực tế]

### Evidence
- Screenshot: ![Evidence](evidence.png)
- Screen Recording: [link video]

### Impact
- **Users Affected**: [% hoặc số người]
- **Business Impact**: [Mô tả tác động]
- **Accessibility Impact**: [Nếu liên quan]

### Recommendation
[Cách fix]

---
```

---

## 🔏 PHẦN 4: Đóng Dấu Watermark & Đồng Bộ GitHub Issues

### Bước 4.1: Đóng Dấu Watermark Tự Động

**Script**: `scripts/add_watermark.ps1`

Công dụng:
- Tìm tất cả PNG trong thư mục (đệ quy)
- Thêm watermark chứa email + tên sinh viên
- Vị trí: góc dưới bên trái
- Giữ nguyên ảnh gốc (backup)

Cách sử dụng:
```powershell
.\scripts\add_watermark.ps1 -SourcePath "C:\screenshots" `
  -Email "student@university.edu" `
  -Name "Nguyễn Văn A" `
  -BackupOriginal $true
```

### Bước 4.2: Đồng Bộ Issues lên GitHub

**Script**: `scripts/sync_github_issues.ps1`

Công dụng:
- Đọc file Markdown chứa danh sách lỗi
- Chuyển đổi sang GitHub Issues format
- Upload ảnh dùng raw URL
- Create/Update issues trên GitHub

Cách sử dụng:
```powershell
.\scripts\sync_github_issues.ps1 `
  -Owner "myusername" `
  -Repo "my-project" `
  -IssuesFile "bugs_found.md" `
  -GitHubToken "ghp_xxxxxxxxxxxxx"
```

---

## 🔄 Quy Trình Hoàn Chỉnh (Full Workflow)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. THIẾT KẾ CHECKLIST                                       │
│    - Tạo 60 mục WCAG (IA-01 → IA-04)                       │
│    - Export CSV template                                    │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. KIỂM THỬ GUI & USABILITY                                 │
│    - Chạy 5 kịch bản E2E                                    │
│    - Chụp screenshot (tối thiểu 60 ảnh)                    │
│    - Ghi âm/ghi chú từng bước                               │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. TÍNH ĐIỂM SUS & PHÂN TÍCH                                │
│    - Phỏng vấn 5+ người dùng (câu hỏi SUS)                  │
│    - Tính SUS Score trung bình                              │
│    - Phân tích trend/nhận xét                               │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. PHÂN LOẠI & GỘP LỖI                                      │
│    - Danh sách lỗi → Blocker/Major/Minor                    │
│    - Gán IA Code liên quan                                  │
│    - Tạo file Markdown chi tiết                             │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. ĐÓ DẤU WATERMARK (TÙYCHỌN)                               │
│    - Chạy add_watermark.ps1                                 │
│    - Watermark: "[Email] - [Tên SV]"                        │
│    - Lưu ảnh watermarked                                    │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. ĐỒNG BỘ LÊN GITHUB                                       │
│    - Chạy sync_github_issues.ps1                            │
│    - Upload ảnh (raw URL)                                   │
│    - Create GitHub Issues                                   │
│    - Link labels (blocker/major/minor)                      │
└──────────────────┬──────────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. BÁO CÁO CUỐI CÙNG                                        │
│    - Summary HTML Report                                    │
│    - SUS Score chart                                        │
│    - Bug breakdown chart                                    │
│    - GitHub Issue link                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Output Mong Đợi

Sau khi chạy skill hoàn toàn, tạo ra:

1. **checklist_wcag_60items.csv** - Danh sách 60 mục WCAG
2. **usability_scenarios_e2e.yaml** - 5 kịch bản E2E chi tiết
3. **sus_score_results.json** - Dữ liệu SUS + Score trung bình
4. **bugs_found.md** - Danh sách lỗi (Blocker/Major/Minor)
5. **watermarked_screenshots/** - Ảnh có watermark
6. **github_issues_sync.log** - Log đồng bộ GitHub

---

## 🚀 Cách Gọi Skill từ AI Agent Khác

```
Prompt Example:
"Hãy sử dụng gui-usability-tester skill để:
1. Tạo checklist WCAG cho web app Sign-Up
2. Thiết kế 3 kịch bản E2E usability testing
3. Tính SUS score từ 5 người dùng (scores: 4,2,4,1,5,2,4,2,4,1)
4. Phân loại 8 lỗi tìm thấy theo severity
5. Watermark screenshots với email test@example.com, tên 'Tester A'
6. Sync bugs lên GitHub repo myowner/myrepo"
```

Agent sẽ tự động:
- Gọi hàm xây dựng checklist
- Gen kịch bản từ template
- Tính toán SUS
- Phân loại lỗi
- Chạy watermark script
- Chạy sync script

---

## 📝 Notes & Best Practices

- **Screenshot Quality**: Tối thiểu 1920x1080, PNG format
- **Diversity**: Kiểm thử trên ≥3 browser (Chrome, Firefox, Safari)
- **Accessibility Tools**: NVDA (Windows), JAWS, axe DevTools, WAVE
- **SUS Respondents**: ≥5 người, ghi lại tất cả response
- **Git Commit Message**: `[USABILITY] Add issues from round-1 testing`
- **Watermark Font**: Arial 12px, màu gray (0.7 opacity)

---

**Version**: 1.0.0 | **Last Updated**: 2026-08-03
