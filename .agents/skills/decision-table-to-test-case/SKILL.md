---
name: decision-table-to-testcase
description: >-
  Sinh bộ test case từ một Decision Table (bảng quyết định). Mỗi rule/cột của bảng
  trở thành một test case có truy vết, kèm dữ liệu đầu vào, kết quả mong đợi, mức
  ưu tiên, và xử lý đúng các ô don't-care ('—'). HÃY DÙNG skill này bất cứ khi nào
  người dùng nhắc tới "sinh/generate test case từ decision table", "tạo ca kiểm
  thử từ bảng quyết định", "decision table sang test case", "viết test case cho
  bảng điều kiện - hành động", hoặc khi họ đã có một decision table (dạng bảng
  Markdown, JSON, hay mô tả các rule điều kiện→hành động) và muốn chuyển thành ca
  kiểm thử — kể cả khi không nói rõ chữ "decision table". Ăn trực tiếp được output
  JSON của skill phân tích requirement thành decision table. Đầu ra mặc định là
  Markdown tiếng Việt.
---

# Sinh Test Case từ Decision Table

Skill này biến một decision table thành bộ test case có cấu trúc, truy vết được về
từng rule. Nó nối tiếp tự nhiên với skill `requirement-to-decision-table`: bảng do
skill đó xuất ra (JSON) đưa thẳng vào đây.

Nguyên tắc cốt lõi: **mỗi rule (cột) của decision table → ít nhất một test case**,
giữ truy vết hai chiều requirement ↔ rule ↔ test case. Phần cấu trúc/độ phủ/truy
vết/xử lý don't-care do script `scripts/gen_testcases.py` lo (deterministic, tránh
sai sót); phần *làm giàu ngữ nghĩa* (dữ liệu cụ thể, giá trị biên, các bước) do
Claude bổ sung.

## Quy trình

### Bước 1 — Lấy decision table về dạng JSON

Script ăn file JSON theo schema:

```json
{
  "title": "Tên",
  "conditions": [{"id": "C1", "name": "...", "values": ["T", "F"]}],
  "actions": [{"id": "A1", "name": "..."}],
  "rules": [
    {"id": "R1", "conditions": {"C1": "T", "C2": "—"}, "actions": ["A1"]}
  ]
}
```

Tùy nguồn đầu vào:
- **Từ skill phân tích requirement:** dùng luôn file JSON nó xuất qua `--emit-dt`.
- **Người dùng đưa bảng Markdown / mô tả rule:** đọc và chuyển thành JSON trên. Mỗi
  dòng/cột rule → một phần tử `rules`; ô don't-care ghi `"—"`. Suy ra `values` của
  mỗi điều kiện từ các giá trị xuất hiện (và bổ sung nếu người dùng nêu rõ).
- **Người dùng chỉ có requirement thô, chưa có bảng:** đây là việc của skill
  `requirement-to-decision-table` — gợi ý dựng bảng trước, rồi quay lại đây.

### Bước 2 — Chạy generator

```bash
python3 scripts/gen_testcases.py decision_table.json
```

In ra **bảng test case tổng hợp** + **thẻ chi tiết từng test case** (Markdown
tiếng Việt). Tùy chọn:

- `--expand-dc`: khai triển mỗi ô `—` thành mọi giá trị → nhiều test case hơn, độ
  phủ cao hơn (hữu ích khi người dùng muốn phủ cả các tổ hợp mà bảng rút gọn đang
  ngầm định). Dùng khi cần kiểm thử chặt hoặc khi điểm rủi ro rút gọn cao.
- `--prefix MÃ`: đổi tiền tố mã test case (mặc định `TC`).
- `--json out.json`: xuất cấu trúc test case ra JSON để import vào công cụ QLTC.

### Bước 3 — Làm giàu test case (giá trị Claude thêm vào)

Script để lại các chỗ cần ngữ nghĩa con người. Sau khi in bảng, hãy bổ sung:

- **Dữ liệu cụ thể & giá trị biên:** chuyển giá trị tượng trưng thành dữ liệu test
  thật. Với điều kiện vốn là lớp tương đương của biến liên tục, chọn **giá trị
  biên** thay vì giá trị giữa (vd "Đơn ≥ 500k = T" → test 500.000đ là biên, không
  phải 800.000đ). Đây là chỗ tăng chất lượng test rõ rệt.
- **Tiền điều kiện & các bước:** điền theo nghiệp vụ thực tế (đăng nhập, trạng thái
  giỏ hàng, …) thay cho placeholder.
- **Ô don't-care `—`:** script đã chọn một giá trị đại diện và ghi chú. Nhắc người
  dùng rằng các giá trị khác đang *được giả định* cho cùng kết quả; nếu không chắc,
  dùng `--expand-dc` hoặc bổ sung test pairwise (từ skill dựng bảng).

### Bước 4 — Báo cáo độ phủ & cảnh báo

Sau bộ test case, tóm tắt ngắn:
- Tổng số test case và ánh xạ rule → test case (script đã in số liệu).
- **Cảnh báo lỗ hổng:** rule không có hành động sẽ sinh test case `Ưu tiên = Cao`
  với kết quả "⚠️ chưa xác định" — nghĩa là requirement còn thiếu định nghĩa; nêu
  rõ để người dùng làm rõ trước khi thực thi.
- Khuyến nghị có nên `--expand-dc` hay bổ sung pairwise không, dựa trên mức độ
  don't-care trong bảng.

## Định dạng test case

Mỗi test case gồm: **Mã TC** (truy vết duy nhất), **Tiêu đề** (Khi … → …), **Tiền
điều kiện**, **Dữ liệu/Input**, **Các bước thực hiện**, **Kết quả mong đợi** (các
action), **Truy vết Rule**, **Ưu tiên**. Heuristic ưu tiên của script: rule gánh
nhiều tổ hợp (có `—`) hoặc rule lỗ hổng → **Cao**; còn lại → **Trung bình**. Claude
có thể điều chỉnh ưu tiên theo mức quan trọng nghiệp vụ.

## Nguyên tắc trình bày

- Output **tiếng Việt**, **Markdown**, hiển thị trực tiếp trong hội thoại (chỉ tạo
  file khi người dùng yêu cầu).
- Luôn giữ **truy vết** test case ↔ rule để dễ rà soát và bảo trì.
- Trung thực về độ phủ: nếu dùng bảng rút gọn, nhắc rằng bộ test này phủ theo *rule*
  chứ chưa phủ mọi *tổ hợp*; muốn chặt hơn thì `--expand-dc` hoặc pairwise.