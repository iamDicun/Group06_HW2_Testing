# GUI Checklist Test Summary — Registry & Login

## Thông tin chung
- **Hệ thống:** EShop
- **Màn hình kiểm thử:** Đăng ký (Registry) · Đăng nhập (Login)
- **Functional Requirements:** FR-01, FR-02
- **Ngày thực thi:** 02/08/2026
- **Công cụ:** Playwright (Chromium)

---

## Kết quả tổng quan

| Chỉ số | Giá trị |
|--------|---------|
| Số lượng màn hình đã kiểm thử | 2 / 2 |
| Số lượng hạng mục checklist đã thiết kế | 70 |
| Số lượng hạng mục checklist đã thực hiện | 70 |
| Số lượng hạng mục đạt (Passed) | **52** |
| Số lượng hạng mục không đạt (Failed) | **18** |
| Tỷ lệ đạt | **74.3%** |
| Số lượng lỗi được phát hiện | **10** |

---

## Kết quả theo màn hình

### Màn hình 1: Đăng ký (Registry) — FR-01

| Chỉ số | Giá trị |
|--------|---------|
| Tổng số hạng mục | 40 |
| Passed | 30 |
| Failed | 10 |
| Tỷ lệ đạt | 75.0% |

**Các hạng mục Fail:** STT 10, 12, 16, 17, 19, 25, 26, 27, 33, 36

### Màn hình 2: Đăng nhập (Login) — FR-02

| Chỉ số | Giá trị |
|--------|---------|
| Tổng số hạng mục | 30 |
| Passed | 22 |
| Failed | 8 |
| Tỷ lệ đạt | 73.3% |

**Các hạng mục Fail:** STT 41, 48, 49, 52, 60, 61, 65, 66

---

## Phân bổ theo IA

| Nhóm IA | Registry (FR-01) | Login (FR-02) | Tổng |
|---------|------------------|---------------|------|
| IA-01: General UI Standards | Pass: 10, Fail: 0 | Pass: 8, Fail: 1 | Pass: 18, Fail: 1 |
| IA-02: Forms | Pass: 14, Fail: 8 | Pass: 5, Fail: 3 | Pass: 19, Fail: 11 |
| IA-03: Navigation | Pass: 3, Fail: 0 | Pass: 3, Fail: 0 | Pass: 6, Fail: 0 |
| IA-04: Feedback/State | Pass: 3, Fail: 2 | Pass: 6, Fail: 4 | Pass: 9, Fail: 6 |
| **Tổng** | **Pass: 30, Fail: 10** | **Pass: 22, Fail: 8** | **Pass: 52, Fail: 18** |

---

## Danh sách lỗi phát hiện (Bugs Found)

| Bug ID | Mô tả | Severity | STT liên quan |
|--------|-------|----------|---------------|
| BUG-01 | Register: Email dùng `type="text"` thay vì `type="email"` | Major | STT 10, 17 |
| BUG-02 | Register: Không có trường Xác nhận mật khẩu | Critical | STT 12, 16, 26, 27 |
| BUG-03 | Register: Button submit không có disabled/loading | Major | STT 33 |
| BUG-04 | Register: Email trùng không hiển thị lỗi | Major | STT 19 |
| BUG-05 | Register: Đăng ký thành công không có phản hồi rõ | Major | STT 36 |
| BUG-06 | Login: Heading ghi "Đăng Ký" thay vì "Đăng Nhập" | Major | STT 41 |
| BUG-07 | Login: Username dùng `type="text"` thay vì `type="email"` | Major | STT 48, 52 |
| BUG-08 | Login: Mật khẩu dùng `type="text"` — hiển thị PLAINTEXT | Critical | STT 49 |
| BUG-09 | Login: Không có cơ chế khóa tài khoản sau 3 lần sai | Critical | STT 60, 61, 65 |
| BUG-10 | Login: Button submit không có disabled/loading | Major | STT 66 |

---

## Phân loại Severity

| Severity | Số lượng | Bug IDs |
|----------|----------|---------|
| Critical | 3 | BUG-02, BUG-08, BUG-09 |
| Major | 7 | BUG-01, BUG-03, BUG-04, BUG-05, BUG-06, BUG-07, BUG-10 |
| Minor | 0 | — |
| **Tổng** | **10** | |

---

## Kết luận

Tỷ lệ đạt tổng thể là **74.3%** (52/70). Các lỗi nghiêm trọng (Critical) tập trung vào:
1. Bảo mật: Mật khẩu hiển thị plaintext (BUG-08)
2. Bảo mật: Không có lockout mechanism (BUG-09)
3. UX: Thiếu trường Xác nhận mật khẩu (BUG-02)

Cần ưu tiên fixes cho 3 lỗi Critical trước khi triển khai production.
