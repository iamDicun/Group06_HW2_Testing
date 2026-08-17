# Nhật Ký Sử Dụng AI (AI Audit Report)

**Sinh viên:** 23127459 - Huỳnh Vương Thụy Quân

---

## Tổng Quan

Trong quá trình thực hiện bài tập HW05 - Performance Testing, tôi đã sử dụng AI (opencode/mimo-v2.5-free) để hỗ trợ các công việc sau:
- Quét mã nguồn EShop để lấy API endpoints
- Tạo file JMeter JMX cho 3 kịch bản (Load, Stress, Spike)
- Tạo file CSV input data
- Tạo workflow GitHub Actions CI/CD
- Viết báo cáo README.md và AI Critique

---

## Nhật Ký Hợp Tác Với AI

| # | Công Cụ AI | Thời Gian | Prompt | Đánh Giá |
|---|------------|-----------|--------|----------|
| 1 | opencode | 16/08/2026 14:00 | "Quét mã nguồn EShop tại `D:\DATA_D\ProjectGitHub\eshop-sut\` để lấy API endpoints, HTTP methods, headers, payload structure" | AI trả về danh sách 31 API endpoints chính xác, bao gồm login, products, cart, checkout. Rất hữu ích. |
| 2 | opencode | 16/08/2026 14:30 | "Thiết kế 3 kịch bản kiểm thử (Load/Stress/Spike) với thông số VUs, ramp-up, think-time phù hợp với EShop" | AI đề xuất 3 kịch bản hợp lý: Load (50 VUs), Stress (100 VUs), Spike (200 VUs). Có phân tích chi tiết. |
| 3 | opencode | 16/08/2026 15:00 | "Tạo 3 file JMX JMeter cho Load Test, Stress Test, Spike Test" | AI tạo file JMX nhưng bị lỗi: URL duplication (`http://http://...`), cross-thread token scope. Cần fix sau. |
| 4 | opencode | 16/08/2026 15:30 | "Tạo file CSV input data cho 3 kịch bản" | AI tạo đúng 3 file CSV với dữ liệu mẫu phù hợp với database schema EShop. |
| 5 | opencode | 16/08/2026 16:00 | "Sửa lỗi URL duplication trong JMX files" | AI sửa thành công, loại bỏ prefix `http://` trùng lặp. |
| 6 | opencode | 16/08/2026 16:30 | "Sửa lỗi cross-thread auth token scope trong Spike Test" | AI sửa bằng cách thêm Setup Thread Group để login lấy token trước. |
| 7 | opencode | 16/08/2026 17:00 | "Tạo workflow GitHub Actions CI/CD cho performance testing" | AI tạo file YAML hoàn chỉnh, nhưng cần sửa lại trigger và các step cho phù hợp. |
| 8 | opencode | 16/08/2026 18:00 | "Viết báo cáo README.md với dữ liệu thật từ reports" | AI đọc `statistics.json` và viết báo cáo chi tiết, dùng dữ liệu thực tế. |
| 9 | opencode | 16/08/2026 20:00 | "Sửa workflow CI/CD theo yêu cầu mới" | AI sửa lại trigger `on: push`, thêm Spike Test, xóa step `analyze_results.py`. |
| 10 | opencode | 16/08/2026 21:00 | "Tạo bug-report.md và ai_audit.md" | AI tạo 2 file theo mẫu template. |
| 11 | opencode | 16/08/2026 22:00 | "Fix lỗi No such file or directory trong workflow - sửa working-directory" | AI sửa `working-directory` từ `eshop-sut/backend` thành `application/backend`, sửa `npm start` thành `node server.js`. |

---

## Đánh Giá Kết Quả AI

### Đã Áp Dụng Thành Công:
- Quét mã nguồn EShop để lấy API endpoints
- Tạo file CSV input data
- Viết báo cáo README.md với dữ liệu thật
- Viết AI Critique phân tích lỗi
- Tạo git log

### Cần Sửa Lỗi:
- File JMX bị lỗi URL duplication → đã fix
- File JMX bị lỗi cross-thread token scope → đã fix
- Workflow CI/CD cần sửa lại nhiều step → đã fix
- Sai đường dẫn `working-directory` trong workflow → đã fix

### Không Áp Dụng:
- Script `analyze_results.py` (không cần thiết cho bài nộp)

---

## Bài Học Học Tập

1. **Trust but Verify:** Luôn validate output của AI trước khi sử dụng
2. **Debug by logs:** Đọc JTL log để hiểu root cause, không chỉ nhìn pass/fail
3. **AI là tool:** AI giúp generate code nhanh, nhưng responsibility thuộc về người dùng
4. **Iterative refinement:** Lần đầu AI tạo code thường có bugs, cần quy trình Generate → Test → Debug → Fix
