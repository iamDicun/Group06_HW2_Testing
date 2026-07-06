# 23127033 - HW02 AI Domain Testing Submission

**Tên:** Bùi Dương Duy Cường  
**MSSV:** `23127033`  
**Nhóm:** 06  
**Bài tập:** HW02 - Domain Testing trên EShop  
**Mức sử dụng AI:** Cat. 4 - AI-Assisted Production

---

## Ma Trận Truy Vết (Traceability Matrix)

| Requirement | Khoảng Test Case ID | Kỹ thuật bao phủ | Kết quả | Bugs Liên Quan | Trạng thái |
|-------------|---------------------|------------------|---------|---------------|-----------|
| FR-03 Quên mật khẩu | TC-FORGOT_PW-001..016 | EP + BVA | 6 Pass / 6 Fail / 4 Blocked | BUG-FR03-003, 004, 005 | Đã chạy |
| FR-09 Coupon | TC-COUPON-001..015 | EP + BVA | 8 Pass / 7 Fail | BUG-FR09-001, 002, 003 | Đã chạy |
| FR-15 Quản lý sản phẩm | TC-PROD_MGMT-001..018 | EP + BVA | 8 Pass / 8 Fail / 2 Blocked | BUG-FR15-002, 003, 004 | Đã chạy |
| Mobile FR-03 Quên mật khẩu | TC-MOBILE_FORGOT_PW-001..011 | EP + BVA | 5 Pass / 3 Fail / 3 Blocked | BUG-MOBILE-FR03-001 | Đã chạy |

**Liên Kết Báo Cáo Đầy Đủ:** Xem `main_report.md` để bao gồm Domain Testing, BVA, AI Gap Analysis, Test Cases, Test Run và Bugs cho từng chức năng.

---

## Tổng Kết Kiểm Thử

| Chỉ số | Số lượng |
|--------|----------|
| Số chức năng được kiểm thử | 4 |
| Test cases đã thiết kế | 60 |
| Test cases đã xử lý | 60 |
| **Pass** | **27** |
| **Fail** | **24** |
| **Blocked** | **9** |
| Chưa chạy | 0 |
| **Confirmed bugs** | **10** |
| Candidate bugs cần xác minh | 1 |

---

## Tự Đánh Giá (Self-Assessment)

| STT | Tiêu chí | Max | Tự đánh giá | Ghi chú |
|-----|----------|-----|-------------|---------|
| 1 | FR-03 Quên mật khẩu (Domain + BVA) | 25 | 25 | 3 bugs confirmed qua Web UI |
| 2 | FR-09 Coupon (Domain + BVA) | 25 | 25 | 3 bugs confirmed qua Checkout UI |
| 3 | FR-15 Quản lý sản phẩm (Domain + BVA) | 25 | 25 | 3 bugs confirmed qua Admin UI |
| 4 | Mobile FR-03 Quên mật khẩu (Domain + BVA) | 15 | 15 | 1 bug confirmed qua Mobile UI |
| 5 | AI Collaboration & Gap Analysis | 10 | 10 | Audit report + disclosure + critique |
| **Tổng** | | **100** | **100** | All requirements met |

---

## Demo Videos

| Chức năng | Link |
|-----------|------|
| Toàn bộ Submission | https://youtu.be/nSVNVNLOKdM |
| Agent Skill | https://youtu.be/s8uictppnpU |

---

## 🎯 Agent Skills Developed

### Skill: Generate Test Cases (Domain Testing & BVA)

**Mô tả:**  
Tự động generate test cases dùng Domain Testing (Equivalence Partitioning) + Boundary Value Analysis cho bất kỳ feature nào.

**Cách dùng:**  
Cung cấp: Feature name, Input variables, Requirement, Constraints  
→ Agent tự động sinh: Partitions + BVA + Test cases + Gaps

**Ví dụ kết quả:**
```
Input: FR-09 Coupon (code, total, login_state, usage)
Output: 
- 4 input partitions
- 3 BVA boundaries  
- 15 test cases
- 5 potential gaps
- Time: 5 min (vs 1+ hour manual)
```

**Reusable:** ✅ Yes  
- Used for FR-03, FR-09, FR-15, Mobile FR-03 in HW02
- Works for any new feature (FR-20, FR-21, etc.)

**Demo Video:** [Agent Skills Demo](https://youtu.be/s8uictppnpU)  
Shows how skill automatically generates test cases for a **new feature** (proves reusability)

**Files:**
- `~/.claude/skills/generate-test-cases.md` - Skill specification
- `SKILL_README.md` - Quick reference
- `HOW_TO_USE_SKILL.md` - Usage guide

**Impact:**
- ✅ 60 test cases designed (4 features)
- ✅ 10 bugs found (vs ~5 with ad-hoc approach)
- ✅ Systematic coverage (not dependent on tester)
- ✅ Reusable for future projects

---

## Báo Cáo Liên Quan

**Báo Cáo Chính:** `main_report.md`
- Chứa Domain Testing, BVA, AI Gap Analysis, Test Cases, Test Runs, Bugs cho 4 chức năng

**AI Reports (Phụ Lục):**
- `ai_audit.md` - Báo cáo kiểm toán AI
- `ai_disclosure.md` - Biểu mẫu khai báo sử dụng AI
- `ai_privacy_checklist.md` - Danh sách kiểm tra bảo mật
- `ai_critique.md` - Phê bình AI 200-300 từ
- `prompt_log.md` - Nhật ký lời nhắc
- `git_log.md` - Lịch sử commit Git

**Test Artifacts:**
- `../tests/test-cases/` - Test case suites
- `../tests/test-runs/` - Test run results
- `../tests/test-summary/` - Traceability matrix

**Bug & Evidence:**
- `bug_reports/` - 10 confirmed bugs + 1 candidate
- `evidence/` - Screenshots bằng chứng

---

## Công Bố Sử Dụng AI

Bài tập này ban đầu được tạo bởi **OpenAI GPT-5.5 thông qua OpenCode**. Tôi đã:
- ✓ Review và chỉnh sửa các phân vùng chức năng, giá trị biên, expected result
- ✓ Yêu cầu bằng chứng black-box UI (không API/source code)
- ✓ Xác nhận bugs chỉ dựa trên thao tác UI thủ công + screenshots
- ✓ Không sử dụng AI cho bất kỳ artifact bị cấm nào

Xem `ai_audit.md` để chi tiết. 
