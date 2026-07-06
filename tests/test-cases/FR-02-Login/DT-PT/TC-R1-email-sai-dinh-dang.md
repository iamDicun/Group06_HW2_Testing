# TC-R1 — Email sai định dạng (HTML5 block)

| Trường | Nội dung |
|--------|----------|
| **Test Case ID** | TC-R1 |
| **Feature** | FR-02: Đăng nhập & Khóa tài khoản |
| **Mô tả** | Nhập email không đúng định dạng → browser chặn, form không submit lên server |
| **Kỹ thuật** | Decision Table — Merge (don't care C2/C3/C4 khi C1=F) |
| **Priority** | High |
| **Loại test** | Negative |

---

## Điều kiện tiên quyết

- Trang đăng nhập hiển thị bình thường
- Input email có thuộc tính `type="email"` (verify bằng Inspect Element)
- Không yêu cầu trạng thái tài khoản cụ thể

---

## Dữ liệu đầu vào

| Trường | Giá trị |
|--------|---------|
| Email | `khongphaiemail` |
| Password | `BatKy123!` |

---

## Bước thực hiện

1. Mở trang đăng nhập
2. Nhập `khongphaiemail` vào trường Email
3. Nhập `BatKy123!` vào trường Password
4. Nhấn nút **Đăng nhập**
5. Quan sát phản hồi của browser

---

## Kết quả kỳ vọng

- [ ] Browser hiển thị tooltip validate HTML5 (VD: *"Vui lòng nhập địa chỉ email"*)
- [ ] Form **không** được submit
- [ ] **Không có** network request nào được gửi lên server
- [ ] Trang không reload, không có thông báo lỗi từ server

---

## Kiểm tra bổ sung

- Mở DevTools → tab **Network** → xác nhận không có request nào xuất hiện sau khi nhấn nút
- Inspect DOM → xác nhận `<input type="email">` tồn tại

---

## Dữ liệu test thêm (biến thể)

| # | Email | Ghi chú |
|---|-------|---------|
| 1 | `khongphaiemail` | Không có @ |
| 2 | `@nodomain.com` | Thiếu local part |
| 3 | `user@` | Thiếu domain |
| 4 | `user @example.com` | Có khoảng trắng |
| 5 | ` ` (chỉ space) | Chuỗi trắng |

---

## Ghi chú

> C2 (email tồn tại), C3 (mật khẩu đúng), C4 (đang khóa) đều là **don't care** — khi C1=F, browser chặn trước khi bất kỳ điều kiện nào khác được đánh giá.
