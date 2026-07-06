---
name: state-transition-testing
description: >-
  Thiết kế và sinh test case bằng kỹ thuật State Transition Testing (kiểm thử
  chuyển trạng thái): dựng bảng chuyển trạng thái từ mô tả hệ thống có trạng
  thái (state) và sự kiện (event), rồi sinh test case theo các mức phủ
  0-switch (phủ trạng thái), 1-switch (phủ chuyển tiếp hợp lệ), N-switch (phủ
  chuỗi chuyển tiếp), và test case cho tổ hợp (trạng thái, sự kiện) KHÔNG hợp
  lệ. HÃY DÙNG skill này khi người dùng nhắc tới "state transition testing",
  "kiểm thử chuyển trạng thái", "sơ đồ trạng thái", "state machine", "vòng đời
  đơn hàng/tài khoản/đối tượng", "0-switch", "1-switch", "n-switch", hoặc khi
  họ mô tả chức năng có trạng thái rõ rệt (vd đơn hàng: Mới → Đã xác nhận →
  Đang giao → Hoàn tất/Đã hủy) và muốn thiết kế test case cho luồng chuyển đổi
  đó — kể cả khi không dùng đúng thuật ngữ này. Đầu ra mặc định là Markdown
  tiếng Việt.
---

# State Transition Testing — Sinh Test Case theo Chuyển Trạng Thái

Skill này biến một mô tả hệ thống có trạng thái (state) thành **bảng chuyển
trạng thái** và **bộ test case** phủ theo đúng lý thuyết State Transition
Testing: phủ trạng thái (0-switch), phủ chuyển tiếp hợp lệ (1-switch), phủ
chuỗi chuyển tiếp (N-switch), và — quan trọng không kém — test các tổ hợp
**(trạng thái, sự kiện) không hợp lệ** mà hệ thống phải từ chối/báo lỗi.

Phần đồ thị (tìm đường đi ngắn nhất tới mỗi trạng thái, liệt kê tổ hợp không
hợp lệ, sinh chuỗi N-switch) rất dễ sai hoặc bỏ sót nếu làm tay, nên **luôn
dùng script `scripts/gen_state_transition_testcases.py`** thay vì tự liệt kê.
Việc của Claude là phần *suy luận nghiệp vụ*: bóc tách trạng thái/sự kiện từ
mô tả và diễn giải kết quả; việc của script là phần *tính toán đồ thị*.

## Quy trình

### Bước 1 — Bóc tách máy trạng thái (phần suy luận, làm cẩn thận)

Đọc mô tả nghiệp vụ và rút ra:

- **Trạng thái (states):** các "chặng dừng" mà đối tượng/hệ thống có thể ở
  yên tại đó (vd: `Chưa đăng nhập`, `Đã đăng nhập`, `Tài khoản bị khóa`). Nếu
  người dùng mô tả bằng văn xuôi (vd: vòng đời đơn hàng), chuyển thành danh
  sách trạng thái rời rạc, đặt tên rõ ràng.
- **Sự kiện (events):** hành động/tín hiệu làm trạng thái thay đổi (vd: `Nhập
  đúng mật khẩu`, `Hủy đơn`, `Hết hạn thanh toán`). Đây có thể là hành động
  người dùng, timeout, hoặc sự kiện hệ thống.
- **Chuyển tiếp (transitions):** với mỗi cặp (trạng thái hiện tại, sự kiện),
  trạng thái kế tiếp là gì. Có thể kèm **guard** (điều kiện phụ, vd "số lần
  sai < 5") và **action** (hành động hệ thống thực hiện, vd "khóa tài khoản").
- **Trạng thái khởi tạo (initial_state):** nơi hệ thống bắt đầu.

Khi bóc tách, chủ động soi và nêu rõ:
- Tổ hợp (trạng thái, sự kiện) nào **cố ý không được định nghĩa** (vd: đăng
  xuất khi chưa đăng nhập) — đây chính là ứng viên cho test case "chuyển tiếp
  không hợp lệ", cần hệ thống từ chối đúng cách thay vì lỗi ngầm.
- Trạng thái nào có nguy cơ **không có đường vào** (không transition nào trỏ
  tới) — thường là lỗi đặc tả, script sẽ tự phát hiện và cảnh báo.
- Nếu mô tả quá mơ hồ để xác định trạng thái/sự kiện, hỏi lại 1–2 câu trọng
  yếu trước khi dựng spec.

### Bước 2 — Viết file spec JSON

```json
{
  "title": "Tên hệ thống/chức năng",
  "initial_state": "S1",
  "states": [{"id": "S1", "name": "Chưa đăng nhập"}],
  "events": [{"id": "E1", "name": "Nhập đúng mật khẩu"}],
  "transitions": [
    {"from": "S1", "event": "E1", "to": "S2", "guard": "tùy chọn", "action": "tùy chọn"}
  ]
}
```

Xem thêm ví dụ end-to-end trong `references/concepts.md`.

### Bước 3 — Chạy generator

```bash
python3 scripts/gen_state_transition_testcases.py spec.json
```

Mặc định in: **bảng chuyển trạng thái + test case 0-switch + 1-switch + test
case chuyển tiếp không hợp lệ** (Markdown tiếng Việt). Tùy chọn:

- `--n-switch N` (N ≥ 2): thêm test case phủ **chuỗi N chuyển tiếp liên tiếp**
  xuất phát từ trạng thái khởi tạo — hữu ích khi nghi ngờ có lỗi phụ thuộc
  vào *lịch sử* chuyển trạng thái (không chỉ trạng thái hiện tại), vd hệ
  thống có bug chỉ xảy ra sau một chuỗi thao tác cụ thể. Cẩn thận: số chuỗi
  tăng nhanh theo N và độ phân nhánh của đồ thị, chỉ tăng N khi thực sự cần.
- `--skip-invalid`: bỏ test case cho tổ hợp không hợp lệ (khi tập sự kiện
  không đóng, tức sự kiện có thể xảy ra ở bất kỳ trạng thái nào theo thiết kế).
- `--prefix MÃ`: đổi tiền tố mã test case (mặc định `TC`).
- `--json out.json`: xuất test case ra JSON để import công cụ QLTC khác.

Script tự phát hiện **trạng thái không tới được** từ initial_state và in cảnh
báo ⚠️ — đây thường là lỗ hổng đặc tả cần làm rõ trước khi test.

### Bước 4 — Trình bày kết quả & làm giàu

In nguyên output Markdown của script, sau đó bổ sung:

- **Dữ liệu cụ thể:** script để tiền điều kiện/bước ở mức khái niệm (tên sự
  kiện, tên trạng thái); điền dữ liệu test thật (vd input cụ thể, số lần thử
  sai cụ thể) theo nghiệp vụ.
- **Nhận định về guard:** nếu một transition có guard, nhắc rằng cần thêm
  test case ở **biên của guard** (vd guard "số lần sai < 5" → test tại đúng
  lần thứ 5, không chỉ lần đầu) — đây là chỗ kết hợp tự nhiên với kỹ thuật
  phân tích giá trị biên.
- **Cảnh báo lỗ hổng:** nêu rõ các trạng thái không tới được, và ý nghĩa của
  từng test case "chuyển tiếp không hợp lệ" (hệ thống phải từ chối, không
  được crash hay chuyển trạng thái ngầm).
- **Khuyến nghị mức phủ:** với hệ thống ít trạng thái/an toàn thấp, 1-switch
  thường đủ; với hệ thống có lịch sử ảnh hưởng hành vi (state có "bộ nhớ" ẩn,
  vd giỏ hàng, quy trình phê duyệt nhiều bước), khuyến nghị thêm `--n-switch`.

## Nguyên tắc trình bày

- Output **tiếng Việt**, **Markdown**, hiển thị trực tiếp trong hội thoại (chỉ
  tạo file khi người dùng yêu cầu).
- Luôn giữ **bảng chuyển trạng thái** làm nguồn tham chiếu duy nhất (single
  source of truth) — mọi test case phải truy vết được về một dòng trong bảng.
- Trung thực về độ phủ: 1-switch chỉ đảm bảo mỗi transition được thử ít nhất
  một lần *riêng lẻ*, KHÔNG đảm bảo phát hiện lỗi phụ thuộc chuỗi thao tác;
  nêu rõ đánh đổi này thay vì ngụ ý bộ test đã "đầy đủ".

## Khi nào đọc thêm reference

Đọc `references/concepts.md` khi cần: giải thích chi tiết 0-switch/1-switch/
N-switch, cách xử lý guard/action, cách xử lý trạng thái composite (trạng
thái con), và một ví dụ end-to-end hoàn chỉnh (vòng đời đơn hàng).