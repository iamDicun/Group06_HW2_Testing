# TC-R7 — Đúng thông tin nhưng tài khoản đang bị khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R7 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Nhập đúng email + mật khẩu nhưng tài khoản đang bị khóa — hệ thống ưu tiên trạng thái khóa, từ chối cấp JWT |
| **Kỹ thuật** | Decision Table — Giữ nguyên (security edge case quan trọng) |
| **Priority** | Critical |
| **Loại test** | Negative / Security |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** trong hệ thống với mật khẩu `DungMatKhau123!`
- Tài khoản **đang bị khóa** (thời gian khóa chưa hết)

---

## Thiết lập điều kiện tiên quyết

1. Đăng nhập sai **3 lần liên tiếp** để kích hoạt khóa
2. Thực hiện test **ngay lập tức** (không chờ hết 30 giây)

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `DungMatKhau123!` ← **mật khẩu đúng** |

---

## Bước thực hiện

1. Kích hoạt khóa bằng cách đăng nhập sai ≥3 lần
2. Ngay lập tức nhập thông tin **đúng** vào form
3. Nhập `user@example.com` vào trường Email
4. Nhập `DungMatKhau123!` vào trường Password (đúng mật khẩu)
5. Nhấn nút **Đăng nhập**
6. Quan sát response

---

## Kết quả kỳ vọng

- [ ] Hệ thống **từ chối** — trả về thông báo khóa
- [ ] **Không** cấp JWT Token dù credentials đúng
- [ ] Thông báo phù hợp (VD: *"Tài khoản tạm khóa, vui lòng thử lại sau"*)
- [ ] Hệ thống **ưu tiên** kiểm tra trạng thái khóa **trước** khi xác thực credentials

---

## Tại sao test case này Critical

| Kịch bản | Hành vi đúng | Hành vi sai (bug) |
|----------|--------------|-------------------|
| Đang khóa + PW đúng | Từ chối, thông báo khóa | Cấp JWT (bypass lockout!) |
| Đang khóa + PW sai | Từ chối, thông báo khóa | Thông báo "PW sai" (lộ thông tin) |

---

## Ghi chú

> **Đây là security requirement, không phải UX preference.**  
> Nếu hệ thống cấp JWT khi credentials đúng bất kể trạng thái khóa → cơ chế khóa bị vô hiệu hóa hoàn toàn.  
> Attacker chỉ cần biết đúng password là bypass được lockout.
