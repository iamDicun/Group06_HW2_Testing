---
name: use-case-testing
description: >-
  Thiết kế và sinh test case bằng kỹ thuật Use Case Testing (kiểm thử theo
  use case): bóc tách một use case (actor, tiền điều kiện, luồng chính/basic
  flow, luồng thay thế/alternate flow, luồng ngoại lệ/exception flow, hậu điều
  kiện) rồi sinh test case sao cho mỗi luồng — chính, thay thế, ngoại lệ — đều
  có ít nhất một test case truy vết được, với các bước cụ thể và kết quả mong
  đợi/postcondition rõ ràng. HÃY DÙNG skill này bất cứ khi nào người dùng nhắc
  tới "use case testing", "kiểm thử use case", "test case theo luồng nghiệp
  vụ", "basic flow", "alternate flow", "exception flow", "happy path và các
  luồng phụ", "actor và use case", hoặc khi họ đưa ra một use case/user story
  có nhiều bước và các nhánh rẽ (điều kiện đặc biệt, lỗi, dữ liệu không hợp
  lệ) và muốn thiết kế test case bao trùm mọi nhánh — kể cả khi họ không dùng
  đúng thuật ngữ "use case". Đầu ra mặc định là Markdown tiếng Việt.
---

# Use Case Testing — Sinh Test Case theo Luồng Use Case

Skill này biến một use case (đặc tả theo actor/luồng chính/luồng thay thế/
luồng ngoại lệ) thành bộ test case có cấu trúc, đảm bảo nguyên tắc cốt lõi của
Use Case Testing: **mỗi luồng (basic flow, mỗi alternate flow, mỗi exception
flow) → ít nhất một test case**, với các bước là **kịch bản tương tác thật**
(actor làm gì, hệ thống phản hồi gì) chứ không phải chỉ một tổ hợp input/output
trừu tượng như Decision Table.

Phần dựng kịch bản (ghép các bước luồng chính với đoạn rẽ nhánh, xác định
đúng vị trí tách/nhập luồng) dễ sai nếu ghép tay, nên **luôn dùng script
`scripts/gen_usecase_testcases.py`** thay vì tự viết từng test case. Việc của
Claude là phần *suy luận nghiệp vụ*: bóc tách actor/luồng từ mô tả, phát hiện
luồng rẽ nhánh còn thiếu, và làm giàu dữ liệu test; việc của script là phần
*ghép kịch bản chính xác, không bỏ sót bước*.

## Quy trình

### Bước 1 — Bóc tách use case (phần suy luận, làm cẩn thận)

Đọc mô tả nghiệp vụ/user story và rút ra:

- **Actor(s):** ai/hệ thống nào khởi xướng use case.
- **Tiền điều kiện (preconditions):** trạng thái hệ thống phải có trước khi
  use case bắt đầu.
- **Hậu điều kiện (postconditions):** kết quả khi thành công, và khi thất bại
  (nếu có định nghĩa riêng).
- **Luồng chính (main/basic flow):** dãy bước "happy path" đơn giản nhất dẫn
  tới thành công, đánh số thứ tự rõ ràng (đây là *nguồn tham chiếu duy nhất*
  để các luồng khác rẽ ra từ đó).
- **Luồng thay thế (alternate flows):** những cách khác để **vẫn đạt được
  mục tiêu** nhưng đi đường khác (vd: khách nhập mã giảm giá trước khi thanh
  toán). Mỗi luồng thay thế cần biết: **tách ra sau bước nào** của luồng
  chính, các bước riêng của nó, và **có quay lại luồng chính không** (nếu có,
  quay lại từ bước nào).
- **Luồng ngoại lệ (exception flows):** các tình huống **lỗi/thất bại** khiến
  use case không đạt mục tiêu (vd: hết hàng, thanh toán thất bại, timeout).
  Mỗi luồng ngoại lệ cần biết: tách ra sau bước nào, các bước riêng, và kết
  quả/thông báo lỗi cuối cùng.

Khi bóc tách, chủ động soi và nêu rõ:
- Bước nào trong luồng chính là **điểm quyết định** (có kiểm tra điều kiện,
  có thể thất bại) — đây thường là nơi cần luồng ngoại lệ mà mô tả gốc có thể
  chưa nêu hết (vd bước "kiểm tra tồn kho" ngụ ý cần luồng "hết hàng").
  Chủ động đề xuất các luồng ngoại lệ hợp lý còn thiếu và hỏi người dùng xác
  nhận trước khi đưa vào spec, thay vì tự bỏ qua.
- Luồng thay thế nào **quay lại luồng chính** vs **tự kết thúc riêng** —
  ghi rõ vì ảnh hưởng tới postcondition mong đợi của test case đó.

### Bước 2 — Viết file spec JSON

```json
{
  "title": "Tên use case",
  "actors": ["Khách hàng"],
  "preconditions": ["..."],
  "postconditions": {"success": ["..."], "failure": ["..."]},
  "main_flow": [
    {"id": "1", "text": "..."},
    {"id": "2", "text": "..."}
  ],
  "alternate_flows": [
    {"id": "AF1", "name": "...", "branch_at": "1", "steps": [{"text": "..."}], "rejoin_at": "2"}
  ],
  "exception_flows": [
    {"id": "EF1", "name": "...", "branch_at": "2", "steps": [{"text": "..."}], "result": "..."}
  ]
}
```

Xem thêm ví dụ end-to-end trong `references/concepts.md`.

### Bước 3 — Chạy generator

```bash
python3 scripts/gen_usecase_testcases.py usecase.json
```

In ra: đầu use case (actor/pre/postcondition/luồng chính) + **test case luồng
chính** + **test case từng luồng thay thế** + **test case từng luồng ngoại
lệ** (Markdown tiếng Việt). Tùy chọn:

- `--prefix MÃ`: đổi tiền tố mã test case (mặc định `TC`).
- `--json out.json`: xuất test case ra JSON để import công cụ QLTC.

Script tự cảnh báo (⚠️ ra stderr) nếu use case **chưa có luồng thay thế/ngoại
lệ nào** — dấu hiệu đặc tả có thể còn thiếu nhánh rẽ.

### Bước 4 — Trình bày kết quả & làm giàu

In nguyên output Markdown của script, sau đó bổ sung:

- **Dữ liệu cụ thể:** thay các bước còn ở mức khái niệm bằng dữ liệu test
  thật (vd tên sản phẩm, số tiền, mã giảm giá cụ thể).
- **Rà soát luồng ngoại lệ còn thiếu:** nhìn lại từng "điểm quyết định" đã
  nêu ở Bước 1, xác nhận đã có luồng ngoại lệ tương ứng chưa; nếu người dùng
  đồng ý bổ sung, cập nhật spec và chạy lại.
- **Ưu tiên:** script gán Cao cho luồng chính và luồng ngoại lệ (rủi ro cao
  nhất nếu sai), Trung bình cho luồng thay thế; điều chỉnh lại theo mức độ
  quan trọng nghiệp vụ thực tế nếu cần.
- **Nhắc về giới hạn:** Use Case Testing phủ theo *luồng tương tác*, không tự
  phủ *mọi tổ hợp dữ liệu* trong từng bước (vd bước "nhập thông tin thanh
  toán" có thể cần thêm test riêng theo Boundary Value/Equivalence
  Partitioning cho định dạng số thẻ, ngày hết hạn...). Nêu rõ để người dùng
  biết cần kết hợp kỹ thuật khác nếu muốn phủ sâu hơn ở từng bước.

## Nguyên tắc trình bày

- Output **tiếng Việt**, **Markdown**, hiển thị trực tiếp trong hội thoại
  (chỉ tạo file khi người dùng yêu cầu).
- Mỗi test case phải đọc được như **một kịch bản tương tác thật** (đánh số
  bước rõ ràng), không phải một dòng dữ liệu trừu tượng.
- Luôn giữ **luồng chính** làm nguồn tham chiếu duy nhất — mọi luồng thay thế/
  ngoại lệ phải nêu rõ tách ra từ bước nào để dễ rà soát khi luồng chính thay
  đổi.

## Khi nào đọc thêm reference

Đọc `references/concepts.md` khi cần: phân biệt kỹ luồng thay thế vs luồng
ngoại lệ, cách xử lý use case có nhiều actor hoặc include/extend use case
khác, và một ví dụ end-to-end hoàn chỉnh (đặt lại mật khẩu).