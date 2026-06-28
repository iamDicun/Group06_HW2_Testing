# Nhật Ký Lời Nhắc - HW02 Domain Testing

**Sinh viên:** Bùi Dương Duy Cường - `23127033`  
**Bài tập:** HW02 - Domain Testing trên EShop

Sử dụng dấu thời gian cuộn. Không kết hợp tất cả lời nhắc ở cuối.

| # | Ngày | Thời Gian | Công Cụ AI | Mục Đích | Lời Nhắc | Tham Chiếu Đầu Ra | Tiếp Nối / Hành Động Sinh Viên |
|---|------|------|---------|---------|--------|------------------|----------------------------|
| 1 | 2026-06-29 | Bắt đầu phiên | OpenAI GPT-5.5 qua OpenCode | Tổng quan tiến độ | "what did we do so far" | Cập nhật `submission/main_report.md`, `tests/test-summary/traceability-matrix.md`, `tests/test-runs/cuong-hw02-blackbox-ui-manual.md`, các bug report và evidence | Cường xác nhận kết quả FR03 TC013-016, FR15 TC016-018; tổng số cập nhật từ 42 executed lên 49 |
| 2 | 2026-06-29 | Giữa phiên | OpenAI GPT-5.5 qua OpenCode | Hướng dẫn chạy Mobile FR-03 | "oke hướng dẫn tôi tiếp tục với mobile nhé" | Tạo `tests/test-runs/mobile-fr03-execution-checklist.md`, `submission/evidence/MOBILE_FR03/README.md`; hướng dẫn 11 test case từng bước | Cường chạy từng case Mobile FR-03 và báo kết quả |
| 3 | 2026-06-29 | Giữa phiên | OpenAI GPT-5.5 qua OpenCode | Cập nhật kết quả Mobile FR-03 | "001 đúng kỳ vọng, 002 không đúng kỳ vọng... 011 ko có nút back về login, cập nhật các file liên quan" | Cập nhật `TC-MOBILE_FORGOT_PW-SUITE.md`, `cuong-hw02-blackbox-ui-manual.md`, `traceability-matrix.md`; tạo `BUG-MOBILE-FR03-001.md`; chuyển mobile khỏi danh sách candidate | Tổng số đạt 60 designed/executed, 27 pass, 24 fail, 9 blocked, 0 not run, 10 confirmed bugs |
| 4 | 2026-06-29 | Giữa phiên | OpenAI GPT-5.5 qua OpenCode | Tạo GitHub Issues cho confirmed bugs | "giờ bạn có thể giúp tôi đẩy những cái bug đó lên github issuse được không nhỉ" | Chạy `scripts/create-labels.ps1` tạo 43 labels; tạo `scripts/create-cuong-confirmed-bug-issues.ps1` và chạy để tạo 10 issues #24-#33 trên repo `iamDicun/Group06_HW2_Testing`; ghi URL vào từng `BUG-*.md` và `main_report.md` | Cường kiểm tra issues trên GitHub; yêu cầu dịch sang tiếng Việt |
| 5 | 2026-06-29 | Cuối phiên | OpenAI GPT-5.5 qua OpenCode | Việt hóa toàn bộ nội dung | "có thể nào sửa các issuse vừa tạo thành tiếng việt cả tựa đề lẫn nội dung không. Và đổi toàn bộ nội dung liên quan tới phần của tôi làm nãy giờ thành tiếng việt được không" | Cập nhật 10 GitHub Issues (#24-#33) title/body sang tiếng Việt; Việt hóa 10 bug report, `main_report.md`, `README.md`, `traceability-matrix.md`, `cuong-hw02-blackbox-ui-manual.md`, `mobile-fr03-execution-checklist.md`, 4 test case suite, 12 report trong `submission/reports/` | Toàn bộ nội dung Cường scope đã chuyển sang tiếng Việt đồng nhất |
| 6 | 2026-06-29 | Cuối phiên | OpenAI GPT-5.5 qua OpenCode | Tổng hợp cuộc trò chuyện và viết prompt log | "giúp tôi tổng hợp lại cuộc trò chuyện này và viết lại file prompt log của tôi" | Viết lại `submission/prompt_log.md` với 6 mục prompt chính | Hoàn tất prompt log |

---

## Tổng Kết Phiên Làm Việc

### Phạm Vi Đã Hoàn Thành
- **4 chức năng:** FR-03 Quên mật khẩu, FR-09 Coupon, FR-15 Quản lý sản phẩm, Mobile FR-03 Quên mật khẩu
- **60 test cases** được thiết kế và ghi nhận kết quả (27 pass, 24 fail, 9 blocked)
- **10 confirmed bugs** được tạo GitHub Issues và ghi vào bug report local
- **1 candidate bug** còn lại cần xác minh thêm (OTP length)

### Công Cụ AI Đã Dùng
- OpenAI GPT-5.5 qua OpenCode cho toàn bộ phiên
- GitHub CLI (`gh`) để tạo labels và issues

### Các File Chính Đã Tạo/Sửa
- `submission/main_report.md` (báo cáo chính, đã Việt hóa)
- `submission/README.md` (tự đánh giá, đã Việt hóa)
- `submission/prompt_log.md` (file này)
- `tests/test-summary/traceability-matrix.md` (ma trận truy vết, đã Việt hóa)
- `tests/test-runs/cuong-hw02-blackbox-ui-manual.md` (test run chính, đã Việt hóa)
- `tests/test-runs/mobile-fr03-execution-checklist.md` (checklist mobile, đã Việt hóa)
- 4 test case suite (`TC-FORGOT_PW-SUITE.md`, `TC-COUPON-SUITE.md`, `TC-PROD_MGMT-SUITE.md`, `TC-MOBILE_FORGOT_PW-SUITE.md`, đã Việt hóa)
- 12 báo cáo trong `submission/reports/` (domain, BVA, AI gap cho 4 chức năng, đã Việt hóa)
- 10 confirmed bug reports trong `submission/bug_reports/BUG-*.md` (đã Việt hóa, có GitHub Issue link)
- `submission/bug_reports/BLACKBOX_BUG_DRAFTS.md` (candidate bug còn lại)

