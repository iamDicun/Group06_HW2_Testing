# TC-R4 — Email đúng, mật khẩu sai, chưa khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R4 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Email tồn tại, mật khẩu sai, bộ đếm chưa đến ngưỡng khóa — hệ thống trả lỗi chung và tăng bộ đếm đúng 1 đơn vị |
| **Kỹ thuật** | Decision Table — Giữ nguyên |
| **Priority** | High |
| **Loại test** | Negative |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** trong hệ thống
- Bộ đếm sai hiện tại = **0, 1, hoặc 2** (chưa đến ngưỡng khóa)
- Tài khoản chưa bị khóa

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `SaiMatKhau999` |

---

## Bước thực hiện

1. Mở trang đăng nhập
2. Nhập `user@example.com` vào trường Email
3. Nhập `SaiMatKhau999` vào trường Password
4. Nhấn nút **Đăng nhập**
5. Quan sát thông báo
6. Ghi lại bộ đếm trước và sau (qua log / thử thêm lần nữa để suy ra)

---

## Kết quả kỳ vọng

- [ ] Hiển thị thông báo lỗi **chung** (VD: *"Email hoặc mật khẩu không đúng"*)
- [ ] Thông báo **không** chỉ rõ "mật khẩu sai"
- [ ] Bộ đếm tăng **đúng 1** đơn vị (không tăng 2, không bỏ qua)
- [ ] Tài khoản **chưa bị khóa** sau lần này (nếu đếm < 3)
- [ ] Không trả về JWT Token

---

## Kiểm tra bộ đếm tăng đúng 1

Thực hiện liên tiếp từ bộ đếm = 0:

| Lần | Bộ đếm trước | Bộ đếm sau | Trạng thái kỳ vọng |
|-----|-------------|------------|---------------------|
| 1 | 0 | 1 | Lỗi chung, chưa khóa |
| 2 | 1 | 2 | Lỗi chung, chưa khóa |
| 3 | 2 | 3 | **Khóa 30 giây** ← xem TC-R4b |

---

## Ghi chú

> Đây là test case nền tảng cho cơ chế đếm. Phải xác nhận bộ đếm tăng **đúng 1** — không phải 0, không phải 2.  
> Nếu hệ thống không expose bộ đếm ra UI, suy ra gián tiếp bằng cách: reset → đăng nhập sai 3 lần liên tiếp → lần thứ 3 phải khóa.
