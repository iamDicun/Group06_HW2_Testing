---
name: api-test-generator
description: >
  Reusable Agent Skill để tự động phân tích tài liệu đặc tả API (Markdown hoặc
  OpenAPI Specification) của bất kỳ hệ thống nào (System Under Test - SUT) và
  sinh ra bộ kịch bản kiểm thử API hoàn chỉnh: Test Case Matrix (Domain/Boundary,
  Security SEC-01..SEC-07, State Machine, Schema/Header/Latency), Postman
  Collection v2.1 (kèm Pre-request Script và Test Script Assertions), và bộ
  dữ liệu Data-driven Testing (.json/.csv). Kích hoạt skill này khi người dùng
  cung cấp một file đặc tả API và yêu cầu sinh test case, sinh Postman
  Collection, hoặc xây dựng bộ kiểm thử API tự động.
version: 1.0.0
author: HW06 - Kiem Thu Phan Mem - Bloom G9.5 Create
license: MIT
---

# Skill: api-test-generator

## 1. Mục đích

`api-test-generator` là một **Test Agent tự động hoá**, đóng vai trò như một
kỹ sư kiểm thử API cấp cao. Đầu vào là **bất kỳ** tài liệu đặc tả API nào
(Markdown tự do hoặc OpenAPI/Swagger JSON/YAML). Đầu ra là một bộ deliverable
kiểm thử API đầy đủ, có thể chạy ngay trong Postman/Newman hoặc CI/CD.

Skill được thiết kế để **tái sử dụng cho mọi dự án** — không hard-code tên
field, endpoint, hay domain nghiệp vụ nào. Toàn bộ logic sinh test case dựa
trên các **Rule Engine** độc lập, vận hành trên một mô hình dữ liệu trung gian
(Intermediate Spec Model - ISM) được trích xuất từ spec gốc.

## 2. Khi nào kích hoạt Skill này

Kích hoạt `api-test-generator` khi:
- Người dùng đính kèm file `.md` mô tả API, hoặc file OpenAPI (`.json`/`.yaml`)
  và yêu cầu "sinh test case", "tạo bộ kiểm thử", "generate Postman collection",
  "test API này giúp tôi".
- Người dùng nhắc rõ tên skill: "dùng api-test-generator cho ...".
- Người dùng cung cấp danh sách endpoint thô và muốn có ma trận test đầy đủ
  (bao gồm cả security test, boundary test).

**Không** kích hoạt khi người dùng chỉ hỏi lý thuyết về kiểm thử API mà không
có spec cụ thể cần xử lý — trường hợp đó trả lời trực tiếp bằng kiến thức, không
cần chạy pipeline.

## 3. Quy trình thực thi (Execution Steps)

Agent PHẢI thực hiện tuần tự các bước sau, không được bỏ bước:

### Bước 0 — Xác định input
1. Nếu người dùng đề cập một đường dẫn file (`api_specification.md`, `openapi.yaml`,...)
   nhưng chưa có nội dung trong context → đọc file bằng `view`/`bash_tool` trước khi làm bất cứ điều gì.
2. Nếu không có file nào và người dùng mô tả API bằng lời → yêu cầu họ dán đặc tả
   hoặc liệt kê endpoint tối thiểu: method, path, request/response schema.

### Bước 1 — Spec Parsing (trích xuất ISM)
Chạy `api_test_generator.py --parse` (hoặc logic tương đương) để bóc tách từ spec:
- `endpoints[]`: path, method, summary
- `parameters[]`: name, location (path/query/header/body), type, required, constraints
  (min/max length, min/max value, pattern, enum)
- `request_body schema`: field name, type, required, constraints
- `auth`: loại xác thực (Bearer/JWT, API Key, OAuth2), role yêu cầu
- `responses[]`: status code kỳ vọng, schema tương ứng
- `business_rules`: quy tắc chuyển trạng thái (state machine), ràng buộc logic
  giữa các field (nếu spec có mô tả)

Nếu spec thiếu thông tin (ví dụ không ghi rõ boundary), Agent áp dụng **giá trị
mặc định an toàn** theo heuristic chuẩn (string: 0/1/255/256 ký tự; số: 0, -1,
MAX_INT+1; ...) và ghi chú rõ trong cột `rationale` là "giả định do spec không
ghi rõ".

### Bước 2 — Chạy 4 Rule Engine song song trên ISM
1. **Boundary & Equivalence Partition Engine** — với mỗi field, sinh:
   hợp lệ điển hình, chuỗi rỗng, null/thiếu field, giá trị âm (nếu là số),
   biên dưới/biên trên độ dài, ký tự đặc biệt/unicode, sai kiểu dữ liệu/định dạng.
2. **Security Rule Engine (SEC-01..SEC-07)**:
   - SEC-01: Thiếu token → 401
   - SEC-02: Token hết hạn/không hợp lệ → 401
   - SEC-03: Đúng token nhưng sai role (Role escalation) → 403
   - SEC-04: SQL Injection payload trong input → phải bị chặn/whitelist, không 500/leak
   - SEC-05: XSS payload (script injection) trong input → phải được sanitize/escape
   - SEC-06: IDOR — truy cập resource của user khác bằng cách đổi ID → 403/404
   - SEC-07: Mass assignment / gửi field không được phép (ví dụ `role: admin`) → bị từ chối hoặc bỏ qua
3. **State Machine Engine** — nếu ISM có mô tả trạng thái (order status, user status,...):
   sinh luồng chuyển hợp lệ đa bước (happy path) và các ca chuyển trạng thái
   bất hợp pháp (ví dụ `CANCELLED -> SHIPPED`) kỳ vọng bị từ chối.
4. **Schema/Header/Latency Engine** — với mọi endpoint: kiểm tra
   `Content-Type: application/json`, response body khớp JSON schema đã khai báo,
   và response time dưới ngưỡng (mặc định 1000ms, có thể cấu hình).

### Bước 3 — Test Synthesizer
Gộp kết quả 4 engine thành danh sách `TestCase` thống nhất, mỗi case có:
`tc_id, category, test_type, endpoint, method, input, expected_status,
expected_body, rationale`. Loại bỏ trùng lặp, đánh số `tc_id` theo quy tắc
`{PREFIX}-{CATEGORY}-{SEQ}` (ví dụ `TC-SEC-004`, `TC-BND-012`).

### Bước 4 — Export
Sinh đồng thời 3 deliverable:
1. **Markdown Test Case Table** — bảng đầy đủ theo đúng 7 cột yêu cầu.
2. **Postman Collection v2.1 JSON** — mỗi TestCase → một Postman Item, có:
   - Pre-request Script: tự động set header `X-Student-Id: {{studentId}}`
     (đọc từ collection variable, không hard-code).
   - Test Script: `pm.test` assertions cho status code, `Content-Type`,
     response time (`pm.expect(pm.response.responseTime).to.be.below(...)`),
     và JSON schema validation (`pm.response.to.have.jsonSchema(...)` hoặc
     `tv4`/thủ công tuỳ field bắt buộc).
3. **Data-driven Testing matrix** — file `.json` và `.csv` chứa toàn bộ input
   data tách rời khỏi logic, map theo `tc_id`, dùng được cho Postman Collection
   Runner / Newman `-d data.csv`.

### Bước 5 — Trình bày kết quả
- Luôn tạo file thật (không chỉ in code block) khi deliverable là file
  (`.json`, `.csv`, `.md` dài) → dùng `create_file` rồi `present_files`.
- Tóm tắt ngắn gọn số lượng test case theo từng category trong phần hội thoại.

## 4. Quy tắc thực thi bắt buộc (Execution Rules)

- **Tái sử dụng, không hard-code**: không được gán cứng tên field/domain của
  một dự án cụ thể (ví dụ EShop) vào logic lõi; các ví dụ cụ thể chỉ nằm ở lớp
  dữ liệu đầu vào.
- **An toàn khi test bảo mật**: các payload SQLi/XSS dùng trong test chỉ nhằm
  mục đích kiểm thử phòng thủ (kiểm tra hệ thống có chặn/escape đúng không),
  không sinh payload có khả năng gây hại thực sự ngoài phạm vi kiểm thử.
- **Không suy diễn thiếu căn cứ**: nếu spec không đủ thông tin để xác định
  `expected_status`/`expected_body`, Agent phải ghi rõ giả định trong `rationale`
  thay vì bịa số liệu.
- **Idempotent**: chạy lại skill trên cùng một spec phải cho ra bộ test case
  nhất quán (cùng số lượng, cùng cấu trúc `tc_id`).
- **Ưu tiên script Python có sẵn** (`api_test_generator.py`) thay vì viết lại
  logic parser mỗi lần — chỉ mở rộng khi spec có định dạng đặc biệt.

## 5. Cấu trúc thư mục Skill

```
api-test-generator/
├── SKILL.md                    # File này
├── architecture.md             # Sơ đồ kiến trúc Mermaid
├── api_test_generator.py       # Script thực thi chính
└── examples/
    └── api_specification.md    # Spec mẫu (EShop) để test skill
```

## 6. Cách gọi script

```bash
# Sinh đầy đủ 3 deliverable từ một spec Markdown hoặc OpenAPI JSON
python api_test_generator.py \
    --input api_specification.md \
    --outdir ./output \
    --latency-threshold-ms 1000
```

Output:
```
output/
├── test_case_matrix.md
├── postman_collection.json
├── data_matrix.json
└── data_matrix.csv
```
