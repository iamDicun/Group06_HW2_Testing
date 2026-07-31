---
name: gui-checklist-tester
description: Sinh checklist kiểm thử giao diện (GUI Testing Checklist) dạng Markdown từ mô tả màn hình/spec/mockup/screenshot người dùng cung cấp, bao phủ đầy đủ các nhóm tiêu chí chuẩn của GUI testing (bố cục & hiển thị, nội dung, chức năng thành phần UI, điều hướng, responsive/cross-browser, accessibility, xử lý lỗi & thông báo). TUYỆT ĐỐI KHÔNG dùng icon/emoji trong bất kỳ output nào (không ✅❌⚠️🔲📌...), chỉ dùng checkbox Markdown `- [ ]` và chữ thường (OK/NG/N/A/Cần làm rõ). Khi được yêu cầu, có thể sinh tiếp test case chi tiết từ các mục checklist, mỗi TC là một file `.md` riêng theo convention TC-[MODULE]-GUI-NNN. Luôn dùng skill này khi người dùng nhắc đến "GUI checklist", "checklist kiểm thử giao diện", "test giao diện", "kiểm tra UI", "GUI testing", "UI checklist", hoặc đưa mô tả/màn hình/mockup cần rà soát giao diện — kể cả khi họ không dùng đúng từ "checklist".
---

# GUI Checklist Tester

Skill này giúp tạo **checklist kiểm thử giao diện (GUI Testing Checklist)** theo 2 giai đoạn, cùng pattern với các skill QA khác của người dùng (test-case-generator, decision-table-analyzer, state-transition-tester...):

1. **Phân tích & sinh checklist** — đọc mô tả màn hình/spec/mockup/screenshot, phát sinh **một file checklist Markdown duy nhất**, bao phủ đầy đủ các nhóm tiêu chí GUI testing chuẩn.
2. **Sinh test case chi tiết** — chỉ thực hiện khi người dùng yêu cầu, đọc lại checklist ở bước 1 và sinh TC chi tiết cho các mục được chọn, **mỗi TC là một file `.md` riêng**.

Không tự động nhảy sang bước 2 ngay sau bước 1 trừ khi người dùng xác nhận muốn sinh TC luôn.

## QUY TẮC BẮT BUỘC: KHÔNG ICON

Đây là ràng buộc quan trọng nhất của skill này:

- KHÔNG dùng bất kỳ icon, emoji, hay ký hiệu trang trí nào (✅ ❌ ⚠️ 🔲 📌 🟢 🔴 ⭐ 👍...) ở bất kỳ đâu trong output — kể cả trong tiêu đề, cột trạng thái, hay ghi chú.
- Checkbox chỉ dùng cú pháp Markdown chuẩn `- [ ]` (chưa kiểm) / `- [x]` (đã kiểm, nếu người dùng cung cấp kết quả).
- Trạng thái/kết quả chỉ dùng chữ thường trong ngoặc hoặc cột riêng: `OK`, `NG`, `N/A`, `Cần làm rõ` — không thay bằng ký hiệu màu hay hình.
- Nếu người dùng yêu cầu "thêm icon cho đẹp", nhắc lại rằng skill này cố định không dùng icon để giữ tính nhất quán và dễ đọc trên mọi công cụ (Excel, terminal, PR review...); có thể dùng in đậm hoặc chữ hoa để nhấn mạnh thay vì icon.

## Giai đoạn 1: Phân tích & sinh Checklist

### Bước 1 — Thu thập thông tin màn hình

Đọc mô tả/spec/mockup/screenshot người dùng cung cấp và xác định:

- **Tên màn hình/chức năng** (ví dụ: Login, Đăng ký, Trang chủ, Form thanh toán...).
- **Danh sách thành phần UI** xuất hiện trên màn hình: input field, button, dropdown, checkbox, radio, label, link, image, table, modal, toast/notification...
- **Ngữ cảnh sử dụng**: thiết bị mục tiêu (desktop/mobile/tablet), trình duyệt cần hỗ trợ, ngôn ngữ hiển thị (đơn ngữ hay đa ngôn ngữ).

Nếu spec không đủ chi tiết để xác định một tiêu chí cụ thể (ví dụ không rõ có cần hỗ trợ dark mode hay không), đừng tự suy diễn — đánh dấu mục đó là "Cần làm rõ" trong checklist thay vì bịa ra kỳ vọng.

### Bước 2 — Sinh Checklist theo nhóm tiêu chí chuẩn

Checklist LUÔN bao phủ đủ các nhóm sau (bỏ nhóm nào không áp dụng thì ghi rõ lý do "Không áp dụng — [lý do]" thay vì xóa im lặng):

1. **Bố cục & Hiển thị (Layout & Visual)** — căn chỉnh, khoảng cách, overlap, font chữ, kích thước chữ, màu sắc/contrast, hình ảnh vỡ/mờ, thứ tự thành phần đúng thiết kế.
2. **Nội dung & Ngôn ngữ (Content)** — chính tả, thuật ngữ nhất quán, label/placeholder rõ nghĩa, đơn vị/định dạng số-ngày-giờ-tiền tệ, text bị cắt/tràn (truncation), đa ngôn ngữ nếu có.
3. **Chức năng thành phần UI (Component Behavior)** — trạng thái enable/disable/hover/focus/active của button, validate input (required, format, min/max length, giá trị biên), hành vi dropdown/checkbox/radio, tooltip, autofocus, default value.
4. **Điều hướng & Luồng (Navigation & Flow)** — tab order hợp lý, nút back/breadcrumb hoạt động đúng, luồng chuyển màn hình đúng thiết kế, deep link (nếu có), trạng thái sau khi F5/quay lại.
5. **Responsive & Tương thích (Responsive/Cross-browser/Cross-device)** — hiển thị đúng trên các resolution/breakpoint chính, trên các trình duyệt/thiết bị mục tiêu, xoay ngang/dọc (mobile).
6. **Khả năng truy cập (Accessibility)** — điều hướng bằng bàn phím, alt text cho ảnh, contrast đạt chuẩn tối thiểu, label gắn đúng với input (cho screen reader), thứ tự đọc hợp lý.
7. **Xử lý lỗi & Thông báo (Error Handling & Feedback)** — thông báo lỗi rõ ràng đúng vị trí, trạng thái loading, trạng thái rỗng (empty state), thông báo thành công/thất bại, hành vi khi mất kết nối mạng.

Mỗi mục trong checklist trình bày dưới dạng một dòng checkbox, có mã tham chiếu ngắn để tiện trích dẫn sang Giai đoạn 2:

```
- [ ] GUI-LAY-01: Các trường input trên form được căn chỉnh thẳng hàng theo lưới thiết kế
- [ ] GUI-CON-01: Label và placeholder không bị lỗi chính tả, dùng thống nhất thuật ngữ với các màn hình khác
- [ ] GUI-FUN-01: Button "Lưu" chuyển sang trạng thái disable trong lúc chờ phản hồi server, tránh double-submit
```

Mã tham chiếu theo format `GUI-[NHOM]-NN`, trong đó NHOM là 3 chữ viết tắt cố định: `LAY` (Layout), `CON` (Content), `FUN` (Function), `NAV` (Navigation), `RES` (Responsive), `ACC` (Accessibility), `ERR` (Error Handling).

### Output file của Giai đoạn 1

Đặt tên file: `[MODULE]-gui-checklist.md` (MODULE viết hoa, không dấu, gạch ngang nếu nhiều từ, ví dụ `LOGIN-gui-checklist.md`).

Cấu trúc file, LUÔN dùng đúng khung này (không thêm icon ở bất kỳ đâu):

```markdown
# GUI Testing Checklist — [Tên màn hình/chức năng]

## 1. Phạm vi & nguồn thông tin
[Tóm tắt màn hình, nguồn spec/mockup, thiết bị/trình duyệt mục tiêu]

## 2. Danh sách thành phần UI
| Thành phần | Loại | Ghi chú |
|---|---|---|

## 3. Checklist

### 3.1 Bố cục & Hiển thị (LAY)
- [ ] GUI-LAY-01: ...

### 3.2 Nội dung & Ngôn ngữ (CON)
- [ ] GUI-CON-01: ...

### 3.3 Chức năng thành phần UI (FUN)
- [ ] GUI-FUN-01: ...

### 3.4 Điều hướng & Luồng (NAV)
- [ ] GUI-NAV-01: ...

### 3.5 Responsive & Tương thích (RES)
- [ ] GUI-RES-01: ...

### 3.6 Khả năng truy cập (ACC)
- [ ] GUI-ACC-01: ...

### 3.7 Xử lý lỗi & Thông báo (ERR)
- [ ] GUI-ERR-01: ...

## 4. Giả định / Cần làm rõ
[Liệt kê nếu có phần thông tin không rõ ràng]
```

Sau khi tạo xong file checklist, dừng lại và hỏi người dùng có muốn review/điều chỉnh checklist trước khi sinh test case chi tiết hay không.

---

## Giai đoạn 2: Sinh Test Case chi tiết (chỉ khi được yêu cầu)

Khi người dùng yêu cầu sinh TC (có thể toàn bộ checklist, hoặc chỉ một số mã GUI-XXX-NN cụ thể, hoặc chỉ một nhóm):

1. Đọc lại file checklist đã tạo ở Giai đoạn 1 (không tự bịa lại mục checklist).
2. Với mỗi mục được chọn, sinh **một file `.md` riêng biệt** — không gộp nhiều TC vào 1 file.
3. TC ID convention: `TC-[MODULE]-GUI-NNN`, với `NNN` là số thứ tự 3 chữ số tăng dần liên tục xuyên suốt module đó, bắt đầu từ 001 (không tách riêng theo nhóm LAY/CON/FUN...).
4. Tên file: `TC-[MODULE]-GUI-NNN.md`.

### Khung nội dung mỗi file TC (bắt buộc theo đúng cấu trúc, không icon)

```markdown
# TC-[MODULE]-GUI-[NNN]

**Kỹ thuật thiết kế**: GUI Testing
**Tham chiếu checklist**: [Mã GUI-XXX-NN từ file checklist]

## Mục tiêu
[Mô tả ngắn gọn tiêu chí giao diện cần kiểm tra]

## Tiền điều kiện
- [Thiết bị/trình duyệt/độ phân giải cần dùng, nếu liên quan]
- [Trạng thái màn hình/dữ liệu cần thiết trước khi thực hiện]

## Các bước thực hiện
1. [Bước thao tác]
2. ...

## Kết quả mong đợi
[Mô tả cụ thể trạng thái hiển thị/hành vi đúng, không dùng icon để biểu thị đạt/không đạt]

## Ưu tiên
[High/Medium/Low]
```

Với các mục checklist còn ghi "Cần làm rõ", vẫn tạo file TC nhưng ghi rõ trong "Kết quả mong đợi": *"Cần xác nhận với UI/UX hoặc BA trước khi thực thi"* — không tự đặt ra kỳ vọng khi spec chưa xác nhận.

---

## Lưu ý chung

- Không dùng icon/emoji ở bất kỳ file output nào của skill này (checklist lẫn TC) — đây là ràng buộc cứng, không phải gợi ý.
- Mỗi test case luôn là 1 file `.md` riêng, đúng pattern đã thống nhất ở các skill QA khác của người dùng.
- Nếu người dùng chỉ cung cấp mô tả sơ sài (ví dụ chỉ 1 câu "checklist cho màn hình login"), vẫn tạo đủ 7 nhóm checklist dựa trên hiểu biết chuẩn về màn hình đó, nhưng đánh dấu rõ các mục mang tính giả định ở mục "Giả định / Cần làm rõ".
- Nếu người dùng cung cấp screenshot, mô tả trực tiếp các thành phần quan sát được trong mục 2 (Danh sách thành phần UI) trước khi sinh checklist, để checklist bám sát giao diện thật thay vì chung chung.