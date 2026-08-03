# Use-Case Test Design Analysis — UC-16 (Import Sản phẩm từ CSV)

> Bước 2 — Phân tích kịch bản kiểm thử (Test Design Analysis) cho `UC-16`.

Tài liệu này liệt kê các scenario cần thiết để bao phủ luồng chính, các luồng thay thế và luồng ngoại lệ theo mô tả trong `EShop_UseCases.md` (UC-16). Mỗi scenario sẽ dùng để phát sinh test case chi tiết ở Bước 3 nếu bạn xác nhận.

| # | Use Case | Scenario | Loại (Main/Alternate/Exception) | Mô tả ngắn |
|---:|---|---|---|---|
| 1 | UC-16 | Import CSV hợp lệ (Happy Path) | Main | Admin tải lên file `.csv` có header đúng `name,price,description,imageUrl,category_id`, mọi dòng đều hợp lệ (`name` không rỗng, `price` > 0). Hệ thống validate từng dòng, import toàn bộ thành công theo giao dịch atomic và báo số dòng đã import. |
| 2 | UC-16 | Trường chứa dấu phẩy được bọc ngoặc kép (RFC 4180) | Alternate | File `.csv` có trường chứa dấu phẩy (ví dụ `"Mô tả, chi tiết"`) và được bọc bằng dấu nháy kép đúng theo RFC 4180. Hệ thống phải parse chính xác và import thành công toàn bộ. |
| 3 | UC-16 | File không phải định dạng `.csv` | Exception | Admin tải lên file có đuôi/Content-Type khác (ví dụ `.xlsx`, `.txt`). Hệ thống từ chối ngay lập tức, không parse, trả về lỗi kiểu file không hợp lệ. |
| 4 | UC-16 | Header thiếu/không đúng định dạng | Exception | File `.csv` không có header yêu cầu hoặc header sai thứ tự/thiếu trường bắt buộc (`name` hoặc `price`). Hệ thống từ chối import và báo lỗi header không hợp lệ. |
| 5 | UC-16 | Ít nhất một dòng có dữ liệu không hợp lệ → rollback | Exception | File có header đúng nhưng có ≥1 dòng lỗi (ví dụ `name` rỗng hoặc `price` ≤ 0 hoặc `price` không phải số). Hệ thống phát hiện lỗi hàng, thực hiện rollback toàn bộ (all-or-nothing) và báo chi tiết số dòng lỗi + lý do từng dòng. |
| 6 | UC-16 | Lỗi hệ thống trong quá trình import (DB/transaction error) | Exception | Trong quá trình import xảy ra lỗi hệ thống (ví dụ lỗi DB constraint, timeout, crash). Hệ thống phải rollback toàn bộ thay đổi và trả về lỗi tổng quát kèm chỉ dẫn (và ideally log chi tiết cho admin). |

Ghi chú thêm:
- Tài liệu nguồn: `EShop_UseCases.md` — phần UC-16, có yêu cầu rõ về header bắt buộc, validate `name` và `price`, hỗ trợ trường chứa dấu phẩy theo RFC 4180, và tính atomic/rollback khi có lỗi dòng.
