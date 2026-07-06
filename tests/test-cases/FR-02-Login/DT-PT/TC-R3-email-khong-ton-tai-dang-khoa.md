# TC-R3 — Email không tồn tại, tài khoản đang bị khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R3 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Email không tồn tại trong hệ thống, nhưng session/IP đang trong trạng thái khóa — hệ thống trả về thông báo khóa |
| **Kỹ thuật** | Decision Table — Giữ nguyên (security edge case) |
| **Priority** | Medium |
| **Loại test** | Negative / Security |

---

## Điều kiện tiên quyết

- Email `khongtontai@example.com` **chưa được đăng ký** trong hệ thống
- Session/IP hiện tại đang trong trạng thái **bị khóa** (đã sai ≥3 lần trước đó)
- Thời gian khóa **chưa hết** (còn trong 30 giây)

---

## Thiết lập điều kiện tiên quyết

1. Đăng nhập sai ≥3 lần với bất kỳ email nào để kích hoạt khóa
2. **Không chờ** hết 30 giây — thực hiện test ngay

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `khongtontai@example.com` |
| Password | `BatKy123!` |

---

## Bước thực hiện

1. Kích hoạt trạng thái khóa (đăng nhập sai ≥3 lần)
2. Ngay lập tức mở trang đăng nhập (hoặc giữ nguyên trang)
3. Nhập `khongtontai@example.com` vào trường Email
4. Nhập `BatKy123!` vào trường Password
5. Nhấn nút **Đăng nhập**
6. Quan sát thông báo trả về

---

## Kết quả kỳ vọng

- [ ] Hệ thống trả về thông báo **khóa** (VD: *"Tài khoản tạm khóa, vui lòng thử lại sau 30 giây"*)
- [ ] Thông báo **không** lộ chi tiết (không nói "email không tồn tại")
- [ ] Bộ đếm **không tăng** thêm (đã ở trạng thái khóa)
- [ ] Không trả về JWT Token

---

## Ghi chú

> **Security edge case:** Hệ thống không được xử lý khác nhau giữa "email không tồn tại đang khóa" vs "email tồn tại đang khóa" — response phải đồng nhất để tránh user enumeration attack.
