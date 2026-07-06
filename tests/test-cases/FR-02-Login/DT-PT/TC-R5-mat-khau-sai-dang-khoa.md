# TC-R5 — Email đúng, mật khẩu sai, đang bị khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R5 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Tài khoản đang bị khóa, tiếp tục thử mật khẩu sai — hệ thống trả về thông báo khóa, thời gian khóa không reset |
| **Kỹ thuật** | Decision Table — Giữ nguyên |
| **Priority** | High |
| **Loại test** | Negative |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** trong hệ thống
- Tài khoản **đang bị khóa** (bộ đếm ≥3, thời gian khóa chưa hết)
- Ghi lại thời điểm bắt đầu khóa để tính thời gian còn lại

---

## Thiết lập điều kiện tiên quyết

1. Đăng nhập sai **3 lần liên tiếp** để kích hoạt khóa
2. Ghi lại thời điểm khóa (timestamp)
3. Thực hiện test **ngay lập tức** (trong vòng 30 giây)

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `SaiMatKhau999` |

---

## Bước thực hiện

1. Kích hoạt khóa (đăng nhập sai ≥3 lần)
2. **Không chờ** — ngay lập tức nhập lại thông tin
3. Nhập `user@example.com` vào trường Email
4. Nhập `SaiMatKhau999` vào trường Password
5. Nhấn nút **Đăng nhập**
6. Ghi lại thông báo trả về
7. Chờ ~10 giây, thử lại → xác nhận thời gian khóa **không reset**

---

## Kết quả kỳ vọng

- [ ] Trả về thông báo **khóa** (không phải lỗi thông thường)
- [ ] Thông báo phù hợp (VD: *"Tài khoản tạm khóa, vui lòng thử lại sau"*)
- [ ] Thời gian khóa **không reset** về 30 giây khi thử lại
- [ ] Bộ đếm không tăng thêm
- [ ] Không trả về JWT Token

---

## Kiểm tra thời gian khóa không reset

| Thời điểm | Hành động | Kết quả kỳ vọng |
|-----------|-----------|-----------------|
| T+0s | Kích hoạt khóa | Thông báo khóa 30s |
| T+5s | Thử lại (PW sai) | Vẫn khóa, còn ~25s (không reset về 30s) |
| T+10s | Thử lại (PW sai) | Vẫn khóa, còn ~20s |
| T+31s | Thử lại (PW đúng) | Xem TC-R8 — mở khóa |

---

## Ghi chú

> Điểm quan trọng nhất của test case này: **thời gian khóa không được reset**.  
> Nếu mỗi lần thử lại đều reset đồng hồ về 30 giây → tài khoản có thể bị khóa vĩnh viễn nếu kẻ tấn công liên tục gửi request.
