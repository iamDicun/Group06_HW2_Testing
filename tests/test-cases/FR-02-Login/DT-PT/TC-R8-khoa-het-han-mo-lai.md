# TC-R8 — Khóa hết hạn, đăng nhập lại thành công

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R8 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Sau đúng 30 giây kể từ khi bị khóa, tài khoản được mở khóa tự động — đăng nhập thành công với thông tin đúng |
| **Kỹ thuật** | Boundary Value Analysis — time boundary (bổ sung cho Decision Table) |
| **Priority** | High |
| **Loại test** | Positive / Boundary |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** với mật khẩu `DungMatKhau123!`
- Tài khoản vừa bị khóa (ghi lại timestamp khóa chính xác)

---

## Thiết lập điều kiện tiên quyết

1. Đăng nhập sai 3 lần để kích hoạt khóa
2. Ghi lại **timestamp chính xác** lúc bị khóa (T₀)
3. Không thực hiện thêm hành động nào trong lúc chờ

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `DungMatKhau123!` |

---

## Bước thực hiện — Boundary time test

### Kiểm tra trước boundary (vẫn còn khóa)

1. Tại **T₀ + 29 giây**: thử đăng nhập với thông tin đúng
2. Kỳ vọng: vẫn trả về thông báo **khóa**

### Kiểm tra tại/sau boundary (mở khóa)

3. Chờ đến **T₀ + 31 giây**
4. Nhập `user@example.com` vào trường Email
5. Nhập `DungMatKhau123!` vào trường Password
6. Nhấn nút **Đăng nhập**
7. Quan sát response

---

## Kết quả kỳ vọng

### Tại T₀ + 29s (trước boundary):
- [ ] Vẫn trả về thông báo **khóa**
- [ ] Không cấp JWT

### Tại T₀ + 31s (sau boundary):
- [ ] Đăng nhập **thành công**
- [ ] Trả về **JWT Token** hợp lệ
- [ ] Bộ đếm sai được **reset về 0**
- [ ] Không còn thông báo khóa

---

## Bảng boundary time

| Thời điểm | Trạng thái kỳ vọng |
|-----------|---------------------|
| T₀ + 0s | Bị khóa |
| T₀ + 15s | Vẫn khóa |
| T₀ + 29s | Vẫn khóa ← boundary dưới |
| T₀ + 30s | Mở khóa (tại đúng mốc) |
| T₀ + 31s | Đăng nhập thành công ← boundary trên |

---

## Ghi chú

> Test tại **T₀ + 29s** (1 giây trước mốc) để xác nhận hệ thống không mở khóa sớm.  
> Test tại **T₀ + 31s** (1 giây sau mốc) để có buffer xử lý network latency.  
> Nếu test ở môi trường có thể mock time → ưu tiên dùng mock thay vì chờ thực tế.
