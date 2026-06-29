# TC-R4b — Boundary: lần sai thứ 3 kích hoạt khóa

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R4b |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Boundary value test: đúng tại lần sai thứ 3 phải kích hoạt khóa ngay lập tức — không phải lần thứ 4 |
| **Kỹ thuật** | Boundary Value Analysis (bổ sung cho Decision Table) |
| **Priority** | High |
| **Loại test** | Negative / Boundary |

---

## Điều kiện tiên quyết

- Tài khoản `user@example.com` **tồn tại** trong hệ thống
- Bộ đếm sai hiện tại = **2** (đã sai đúng 2 lần trước đó)
- Tài khoản chưa bị khóa

---

## Thiết lập điều kiện tiên quyết

1. Reset bộ đếm về 0 (đăng nhập thành công hoặc chờ hết session)
2. Đăng nhập sai **đúng 2 lần** — xác nhận chưa bị khóa sau lần 2
3. Giữ nguyên trạng thái, tiến hành test

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `user@example.com` |
| Password | `SaiMatKhau999` |

---

## Bước thực hiện

1. Đảm bảo bộ đếm = 2 (đã sai 2 lần)
2. Nhập `user@example.com` vào trường Email
3. Nhập `SaiMatKhau999` vào trường Password
4. Nhấn nút **Đăng nhập** (đây là lần sai **thứ 3**)
5. Quan sát response ngay lập tức

---

## Kết quả kỳ vọng

- [ ] Response lần này là thông báo **khóa** (không phải lỗi thông thường)
- [ ] VD: *"Tài khoản tạm khóa, vui lòng thử lại sau 30 giây"*
- [ ] Tài khoản bị khóa **ngay tại lần thứ 3**, không phải lần thứ 4
- [ ] Không trả về JWT Token

---

## Bảng boundary

| Lần sai | Bộ đếm sau | Trạng thái kỳ vọng |
|---------|------------|---------------------|
| Lần 1 | 1 | Lỗi chung — chưa khóa |
| Lần 2 | 2 | Lỗi chung — chưa khóa |
| **Lần 3** | **3** | **Khóa 30 giây** ← boundary này |
| Lần 4+ | ≥3 | Khóa (vẫn khóa, xem TC-R5) |

---

## Ghi chú

> Đây là điểm phân biệt giữa "lỗi thông thường" và "kích hoạt khóa".  
> Đặc tả ghi rõ: *"sai từ 3 lần trở lên"* → lần thứ 3 phải là lần đầu tiên nhận được thông báo khóa.  
> Nếu hệ thống chỉ khóa từ lần thứ 4 → **bug**.
