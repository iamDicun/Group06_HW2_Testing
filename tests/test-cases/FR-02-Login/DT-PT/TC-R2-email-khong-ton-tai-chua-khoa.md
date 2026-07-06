# TC-R2 — Email không tồn tại, tài khoản chưa khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R2 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Email đúng định dạng nhưng không tồn tại trong hệ thống — server trả lỗi chung, tăng bộ đếm |
| **Kỹ thuật** | Decision Table — Merge (don't care C3 khi C2=F) |
| **Priority** | High |
| **Loại test** | Negative |

---

## Điều kiện tiên quyết

- Email `khongtontai@example.com` **chưa được đăng ký** trong hệ thống
- Bộ đếm sai hiện tại = **0** (tài khoản/session sạch)
- Tài khoản chưa bị khóa

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `khongtontai@example.com` |
| Password | `BatKy123!` |

---

## Bước thực hiện

1. Mở trang đăng nhập
2. Nhập `khongtontai@example.com` vào trường Email
3. Nhập `BatKy123!` vào trường Password
4. Nhấn nút **Đăng nhập**
5. Quan sát thông báo trả về
6. Kiểm tra bộ đếm (thử lại thêm 2 lần để xác nhận bộ đếm tăng đúng)

---

## Kết quả kỳ vọng

- [ ] Hiển thị thông báo lỗi **chung** (VD: *"Email hoặc mật khẩu không đúng"*)
- [ ] Thông báo **không** chỉ rõ "email không tồn tại" hay "mật khẩu sai"
- [ ] Bộ đếm sai tăng thêm **đúng 1** đơn vị
- [ ] Tài khoản/session **chưa bị khóa** sau lần này
- [ ] Không trả về JWT Token

---

## Kiểm tra bổ sung — Don't care C3

Thực hiện lại với mật khẩu khác nhau, kết quả phải giống nhau:

| Lần | Password | Kết quả kỳ vọng |
|-----|----------|-----------------|
| 1 | `BatKy123!` | Lỗi chung, đếm +1 |
| 2 | `MatKhauDung@123` | Lỗi chung, đếm +1 |

> C3 (mật khẩu đúng/sai) là **don't care** — khi email không tồn tại, server không thể xác thực password, luôn trả lỗi chung.

---

## Ghi chú

> **Bảo mật quan trọng:** Response từ server không được phân biệt "email không tồn tại" vs "mật khẩu sai". Cả hai trường hợp phải trả về cùng một thông báo lỗi và cùng HTTP status code.
