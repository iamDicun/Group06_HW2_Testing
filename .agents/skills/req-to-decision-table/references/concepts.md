# Decision Table — Khái niệm, schema & chỉ số rủi ro

Tài liệu tham chiếu cho skill `requirement-to-decision-table`. Đọc khi cần chi
tiết vượt quá hướng dẫn trong SKILL.md.

## Mục lục
1. Decision table là gì
2. Schema file spec đầy đủ
3. Điều kiện đa trị & lớp tương đương
4. Cơ chế rút gọn (collapse)
5. Các chỉ số rủi ro & cách diễn giải
6. Pairwise (all-pairs) — vì sao và khi nào
7. Ví dụ end-to-end

---

## 1. Decision table là gì

Decision table (bảng quyết định) là kỹ thuật kiểm thử hộp đen mô tả quan hệ giữa
**điều kiện đầu vào** và **hành động đầu ra**. Mỗi **cột là một rule** (một tổ hợp
giá trị điều kiện cụ thể) và chỉ ra hành động tương ứng. Nó đặc biệt hợp với các
requirement có nhiều quy tắc nghiệp vụ đan xen ("nếu… và… thì…").

Trong skill này, để bảng dễ đọc dạng Markdown, ta đặt **điều kiện và hành động
theo cột, mỗi rule theo dòng** (chuyển vị so với cách trình bày cổ điển nhưng
tương đương về nội dung).

- **Bảng đầy đủ:** liệt kê *mọi* tổ hợp giá trị điều kiện. Với `n` điều kiện nhị
  phân → `2^n` rule. Với điều kiện đa trị → tích các kích thước tập giá trị.
- **Bảng rút gọn:** gộp các rule cùng kết quả, thay điều kiện không ảnh hưởng bằng
  `—`. Gọn hơn nhưng *ngầm định* rằng điều kiện `—` thực sự không quan trọng.

## 2. Schema file spec đầy đủ

```json
{
  "title": "Tên requirement (chuỗi)",
  "conditions": [
    {
      "id": "C1",
      "name": "Mô tả điều kiện bằng tiếng Việt",
      "values": ["T", "F"],
      "interaction_risk": false
    }
  ],
  "actions": [
    {"id": "A1", "name": "Mô tả hành động"}
  ],
  "logic": [
    {"when": {"C1": "T", "C2": "F"}, "then": ["A1", "A2"]},
    {"when": {},                     "then": ["A3"]}
  ]
}
```

Quy tắc:
- `id` ngắn gọn, duy nhất (`C1`, `C2`… cho điều kiện; `A1`, `A2`… cho hành động).
- `values`: liệt kê **đủ và rời rạc** mọi giá trị điều kiện có thể nhận.
- `interaction_risk`: đặt `true` cho điều kiện nghi tương tác/biên dễ lỗi. Nếu nó
  bị rút gọn thành `—`, engine sẽ nâng mức rủi ro và cảnh báo riêng.
- `logic`: danh sách mệnh đề áp dụng **theo thứ tự**, khớp đầu tiên thắng. `when`
  chỉ cần nêu các điều kiện liên quan (điều kiện không nêu = không ràng buộc).
  Nên có một mệnh đề `"when": {}` ở cuối làm mặc định để tránh lỗ hổng phủ.

## 3. Điều kiện đa trị & lớp tương đương

- Biến liên tục (số tiền, tuổi, ngày) → chia thành **lớp tương đương** rồi đặt làm
  giá trị rời rạc. Ví dụ tuổi → `["<18", "18-65", ">65"]`.
- Cân nhắc thêm giá trị biên khi sinh test (xử lý ở skill sinh test case), nhưng ở
  bước dựng bảng chỉ cần các lớp đại diện.
- Đa trị làm bảng đầy đủ phình nhanh; đó chính là lý do cần rút gọn + pairwise.

## 4. Cơ chế rút gọn (collapse)

Thuật toán (đã cài trong `dtable.py`):
1. Nhóm các rule **cùng tập hành động**.
2. Trong mỗi nhóm, nếu một điều kiện đã xuất hiện **đủ mọi giá trị** trong khi các
   điều kiện còn lại giữ nguyên → gộp các rule đó thành một, đặt điều kiện đó `—`.
3. Lặp tới khi không gộp thêm được; loại bỏ rule bị bao trùm (subsumption).
4. **Xác minh:** khai triển lại bảng rút gọn và đối chiếu với bảng đầy đủ. Nếu lệch,
   engine in cảnh báo ❌.

Tính chất quan trọng: mọi phép gộp đều bảo toàn ánh xạ điều kiện→hành động, nên
bảng rút gọn **đúng về logic**. Rủi ro không nằm ở logic, mà ở chỗ logic đầu vào có
thể đã *bỏ sót* một tương tác thực tế — và rút gọn làm tương tác đó biến mất khỏi
tầm mắt.

## 5. Các chỉ số rủi ro & cách diễn giải

- **collapse_ratio = full / reduced.** Càng lớn càng rút gọn mạnh.
- **dont_care_density** = số ô `—` / tổng ô. Càng cao, bảng càng "ngầm định" nhiều.
  ≥ 50% là dấu hiệu rút gọn quá tay.
- **max_rule_share** = phần bảng đầy đủ mà một rule đơn lẻ đại diện. ≥ 25% nghĩa là
  một dòng test đang gánh quá nhiều tổ hợp → nếu dòng đó pass, ta vẫn mù về các
  tổ hợp bên trong nó.
- **masked_combinations** = số tổ hợp bị ẩn đi sau rút gọn.
- **gaps** = tổ hợp không khớp logic nào → requirement có lỗ hổng (đây là rủi ro
  *đúng đắn*, không phải rủi ro rút gọn, nhưng cần báo).

Mức tổng thể: **CAO** nếu density ≥ 50%, hoặc max_share ≥ 25%, hoặc có điều kiện
`interaction_risk` bị che; **TRUNG BÌNH** nếu density ≥ 25% hoặc max_share ≥ 12.5%;
còn lại **THẤP**. Đây là heuristic — luôn kèm diễn giải định tính, đừng đọc số khô.

## 6. Pairwise (all-pairs) — vì sao và khi nào

Nhiều lỗi phần mềm sinh ra từ **tương tác giữa 2 yếu tố**. Pairwise đảm bảo mọi
*cặp* giá trị của 2 điều kiện bất kỳ cùng xuất hiện ít nhất một lần, với số test
nhỏ hơn nhiều bảng đầy đủ. Nó là điểm cân bằng:
- Bảng rút gọn: nhỏ nhất, nhưng có thể bỏ lọt tương tác.
- Pairwise: lớn hơn chút, bắt được hầu hết lỗi tương tác 2 chiều.
- Bảng đầy đủ: chắc chắn nhất, nhưng đắt và bùng nổ tổ hợp.

Dùng pairwise khi người dùng muốn "mở rộng lại có kiểm soát" — đặc biệt quanh các
điều kiện đã bị rút gọn thành `—` mà ta không thật sự chắc là vô hại.

## 7. Ví dụ end-to-end

Requirement: *"Khách VIP được giảm 10%. Đơn từ 500k được miễn phí ship. Có mã
khuyến mãi thì được giảm 10%. Đơn ≥ 500k kèm mã thì chỉ miễn ship. VIP mà đơn ≥
500k thì vừa giảm 10% vừa miễn ship. Các trường hợp khác không ưu đãi."*

spec.json:
```json
{
  "title": "Chính sách giảm giá & miễn phí ship",
  "conditions": [
    {"id": "C1", "name": "Là thành viên VIP", "values": ["T", "F"]},
    {"id": "C2", "name": "Đơn hàng ≥ 500k", "values": ["T", "F"], "interaction_risk": true},
    {"id": "C3", "name": "Có mã khuyến mãi", "values": ["T", "F"]}
  ],
  "actions": [
    {"id": "A1", "name": "Giảm 10%"},
    {"id": "A2", "name": "Miễn phí vận chuyển"},
    {"id": "A3", "name": "Không ưu đãi"}
  ],
  "logic": [
    {"when": {"C1": "T", "C2": "T"}, "then": ["A1", "A2"]},
    {"when": {"C1": "T", "C2": "F"}, "then": ["A1"]},
    {"when": {"C2": "T", "C3": "T"}, "then": ["A2"]},
    {"when": {"C3": "T"}, "then": ["A1"]},
    {"when": {}, "then": ["A3"]}
  ]
}
```

Chạy `python3 scripts/dtable.py spec.json --pairwise` → bảng đầy đủ 8 dòng, bảng
rút gọn 5 dòng (rủi ro CAO vì C2 — điều kiện có cờ tương tác — bị che ở một rule),
pairwise 6 dòng. Diễn giải cho người dùng: rule `F—F → A3` đang giả định "đơn ≥
500k hay không không đổi kết quả khi không VIP và không mã" — nên kiểm lại bằng
pairwise vì C2 vốn là điều kiện đáng ngờ.