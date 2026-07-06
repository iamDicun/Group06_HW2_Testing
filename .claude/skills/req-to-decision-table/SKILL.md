---
name: requirement-to-decision-table
description: >-
  Phân tích một requirement (đặc tả nghiệp vụ, business rule, user story, mô tả
  tính năng) thành Decision Table phục vụ kiểm thử. Tạo bảng đầy đủ (full), bảng
  rút gọn (collapsed với ký hiệu '—' don't-care), kèm ĐÁNH GIÁ TỈ LỆ RỦI RO do
  rút gọn quá mức, và bảng PAIRWISE để mở rộng lại có kiểm soát những phần đã rút
  gọn khi được yêu cầu. HÃY DÙNG skill này bất cứ khi nào người dùng nhắc tới
  "decision table", "bảng quyết định", "bảng điều kiện - hành động", "phân tích
  requirement thành bảng", "rút gọn decision table", "rủi ro rút gọn", "bảng
  pairwise / all-pairs", hoặc khi họ đưa ra một tập điều kiện/quy tắc nghiệp vụ
  và muốn chuyển thành bảng để test — kể cả khi không nói rõ chữ "decision
  table". Đầu ra mặc định là Markdown tiếng Việt.
---

# Phân tích Requirement → Decision Table

Skill này biến một requirement bằng văn xuôi thành Decision Table có thể kiểm thử,
theo đúng 4 thành phần người dùng cần: **(1) bảng đầy đủ**, **(2) bảng rút gọn**,
**(3) đánh giá tỉ lệ rủi ro do rút gọn quá mức**, **(4) bảng pairwise** để mở rộng
lại các phần bị rút gọn khi được yêu cầu.

Phần combinatorics (sinh tổ hợp, gộp rút gọn, đo rủi ro, sinh pairwise) rất dễ sai
nếu làm tay, nên **luôn dùng script `scripts/dtable.py`** thay vì tự liệt kê bảng.
Việc của Claude là phần *suy luận*: bóc tách điều kiện/hành động/logic từ văn xuôi
và diễn giải rủi ro. Việc của script là phần *tính toán*.

## Quy trình

### Bước 1 — Bóc tách requirement (phần suy luận, làm cẩn thận)

Đọc requirement và rút ra:

- **Điều kiện (conditions / causes):** các yếu tố đầu vào quyết định kết quả. Mỗi
  điều kiện có một **tập giá trị rời rạc**. Phần lớn là nhị phân (`T`/`F`), nhưng
  có thể đa trị (vd: hạng `["Vàng","Bạc","Thường"]`). Gộp các ngưỡng liên tục
  thành lớp tương đương (vd: "tuổi ≥ 18" → `T`/`F`).
- **Hành động (actions / effects):** các kết quả/đầu ra có thể xảy ra.
- **Logic:** ánh xạ tổ hợp điều kiện → hành động, viết dưới dạng các mệnh đề
  "khi … thì …" **theo thứ tự ưu tiên** (mệnh đề khớp đầu tiên thắng), kết thúc
  bằng một mệnh đề catch-all (`"when": {}`) cho trường hợp mặc định.

Khi bóc tách, chủ động soi và nêu rõ:
- Điều kiện nào nghi **có tương tác** với nhau hoặc nằm ở **biên dễ lỗi** → đánh
  dấu `"interaction_risk": true`. Đây là tín hiệu để cảnh báo nếu sau này nó bị
  rút gọn thành `—`.
- Tổ hợp nào requirement **chưa nói rõ** (ambiguity) → vẫn đưa vào logic với giả
  định hợp lý, nhưng ghi chú lại để người dùng xác nhận.

Nếu requirement quá mơ hồ để dựng logic, hỏi lại 1–2 câu trọng yếu trước khi chạy.

### Bước 2 — Viết file spec JSON

Tạo file spec theo schema (xem chi tiết và ví dụ trong
`references/concepts.md`):

```json
{
  "title": "Tên requirement",
  "conditions": [
    {"id": "C1", "name": "Mô tả điều kiện", "values": ["T", "F"], "interaction_risk": false}
  ],
  "actions": [{"id": "A1", "name": "Mô tả hành động"}],
  "logic": [
    {"when": {"C1": "T"}, "then": ["A1"]},
    {"when": {}, "then": ["A2"]}
  ]
}
```

### Bước 3 — Chạy engine

```bash
python3 scripts/dtable.py spec.json
```

Mặc định in: **bảng đầy đủ + bảng rút gọn + đánh giá rủi ro** (Markdown tiếng Việt).

- Chỉ thêm **bảng pairwise** khi người dùng yêu cầu mở rộng lại:
  `python3 scripts/dtable.py spec.json --pairwise`
- Bàn giao cho skill sinh test case (xuất decision table dạng JSON):
  `python3 scripts/dtable.py spec.json --emit-dt decision_table.json`
  (thêm `--emit-dt-full` nếu muốn dùng bảng đầy đủ thay vì bảng rút gọn).

Script tự **xác minh** bảng rút gọn tái tạo đúng bảng đầy đủ; nếu sai nó in cảnh
báo ❌ — khi đó đừng dùng bảng rút gọn đó.

### Bước 4 — Trình bày kết quả

In nguyên output Markdown của script cho người dùng. Sau bảng, bổ sung **diễn giải
ngắn bằng lời** (đây là giá trị Claude thêm vào, không để script làm thay):

- Bảng đầy đủ nói lên điều gì; có **lỗ hổng phủ** (gap) nào cần làm rõ requirement không.
- Vì sao bảng rút gọn lại gộp như vậy (điều kiện nào trở thành `—` và ngụ ý gì).
- **Rủi ro rút gọn quá mức**: nhấn vào các rule mà script gắn cờ — đặc biệt khi
  một điều kiện `interaction_risk` bị che bằng `—`, vì lúc đó ta đang *giả định*
  điều kiện đó không ảnh hưởng, mà giả định này có thể sai và che mất lỗi tương tác.
- Khuyến nghị: có nên mở rộng lại bằng pairwise không, và mở rộng phần nào.

### Bước 5 — Mở rộng lại có kiểm soát (khi được yêu cầu)

Khi người dùng muốn "mở rộng lại vài phần đã rút gọn", chạy `--pairwise`. Giải
thích: pairwise (all-pairs) **phủ mọi cặp giá trị của 2 điều kiện bất kỳ** với số
dòng nhỏ hơn nhiều bảng đầy đủ, nhờ đó lấy lại phần lớn khả năng bắt **lỗi tương
tác 2 chiều** mà bảng rút gọn đã đánh đổi — một điểm cân bằng giữa "đầy đủ" và
"rút gọn". Nếu chỉ một vài điều kiện đáng ngờ, gợi ý người dùng giữ bảng rút gọn
làm nền và chỉ bổ sung các dòng pairwise liên quan đến những điều kiện đó.

## Nguyên tắc trình bày

- Output **tiếng Việt**, dạng **Markdown**, hiển thị trực tiếp trong hội thoại
  (không tạo file trừ khi người dùng yêu cầu file).
- Luôn kèm **chú giải** ý nghĩa của từng `C#`/`A#` (script đã in sẵn).
- Ký hiệu `—` = "don't-care" (giá trị không ảnh hưởng kết quả *theo logic đã cho*).
- Trung thực về rủi ro: bảng rút gọn gọn hơn nhưng **đánh đổi độ phủ**; nêu rõ
  đánh đổi đó thay vì chỉ khoe bảng nhỏ.

## Khi nào đọc thêm reference

Đọc `references/concepts.md` khi cần: schema spec đầy đủ, cách xử lý điều kiện đa
trị, ý nghĩa chi tiết các chỉ số rủi ro (collapse ratio, don't-care density,
max rule share, gap), và một ví dụ end-to-end hoàn chỉnh.