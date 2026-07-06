# TC-R6 — Đăng nhập thành công (Happy path)

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R6 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Email đúng định dạng, tồn tại trong hệ thống, mật khẩu đúng, tài khoản chưa khóa → JWT Token được trả về và lưu phía client |
| **Kỹ thuật** | Decision Table — Giữ nguyên (Happy path) |
| **Priority** | Critical |
| **Loại test** | Positive |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** trong hệ thống với mật khẩu `DungMatKhau123!`
- Tài khoản **chưa bị khóa** (bộ đếm = 0)
- Trang đăng nhập hiển thị bình thường

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `DungMatKhau123!` |

---

## Bước thực hiện

1. Mở trang đăng nhập
2. Nhập `user@example.com` vào trường Email
3. Nhập `DungMatKhau123!` vào trường Password
4. Nhấn nút **Đăng nhập**
5. Quan sát response và trạng thái ứng dụng
6. Kiểm tra token được lưu phía client
7. Thực hiện một request cần xác thực và kiểm tra header

---

## Kết quả kỳ vọng

- [ ] Đăng nhập **thành công** — không hiện thông báo lỗi
- [ ] Response trả về **JWT Token** hợp lệ
- [ ] Token được **lưu phía client** (localStorage / sessionStorage / cookie — tùy implementation)
- [ ] Các request authenticated tiếp theo gửi header `Authorization: Bearer <token>`
- [ ] Bộ đếm sai được **reset về 0**
- [ ] Chuyển hướng đến trang sau đăng nhập (nếu có)

---

## Kiểm tra JWT và Authorization header

Mở DevTools → tab **Network** → thực hiện một request cần xác thực → kiểm tra:

```
Request Headers:
  Authorization: Bearer eyJhbGci...
```

- [ ] Header `Authorization` có mặt
- [ ] Giá trị bắt đầu bằng `Bearer ` (có space)
- [ ] Phần token sau `Bearer ` là JWT hợp lệ (3 phần phân cách bởi dấu `.`)

---

## Ghi chú

> Đây là test case **Critical** — nếu happy path không hoạt động, toàn bộ chức năng đăng nhập thất bại.  
> Phải verify cả việc token được gửi đúng cách trong header, không chỉ verify màn hình đăng nhập thành công.
