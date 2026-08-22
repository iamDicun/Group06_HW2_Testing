---
name: api-postman-tester
description: Thiết kế test case cho API (domain partition trên từng parameter, state transition của resource, security SEC-01–SEC-07 như SQL injection/IDOR/role escalation, schema validation response) theo quy trình từng bước (không dùng 1 prompt chung chung), rồi đóng gói thành Postman Collection + pre-request script gắn header X-Student-Id + lệnh chạy Newman sinh HTML report. Luôn dùng skill này khi người dùng nhắc đến "API testing", "Postman", "Newman", "test case cho API", "security testing API" (SQL injection, IDOR, role escalation...), "schema validation", hoặc đưa API spec (OpenAPI/Swagger, danh sách endpoint, FR mô tả state transition của resource) và muốn sinh test case + chạy test tự động. Skill này CHỈ thực hiện phần AI có thể tự làm (generate + execute); phần audit (gắn nhãn VALID/INVALID/INCOMPLETE), phần tự bổ sung TC mà AI bỏ sót, và phần report bug thực tế là trách nhiệm của người dùng, skill không tự làm thay.
---

# API Postman Tester

Skill này bao phủ 2 giai đoạn trong pipeline kiểm thử API — đúng phần việc AI có thể tự thực hiện được (generate + execute), KHÔNG bao gồm audit/human-review, không tự "đoán" các TC mà AI bỏ sót thay người dùng, và không tự bịa bug report:

1. **Giai đoạn 1 — Generate**: đọc API spec, sinh test case theo từng bước riêng biệt (domain partition → state transition → security → schema validation), target tối thiểu 35 TC/API, mỗi TC là 1 file `.md` riêng.
2. **Giai đoạn 2 — Execute** (chỉ khi được yêu cầu): chuyển toàn bộ TC ở Giai đoạn 1 thành 1 Postman Collection (`.json`), có pre-request script gắn header `X-Student-Id`, kèm lệnh chạy Newman sinh HTML report.

Không tự nhảy sang Giai đoạn 2 ngay sau Giai đoạn 1 — dừng lại để người dùng review danh sách TC trước, vì đây là bước quyết định phạm vi coverage sẽ được execute.

**Về các phần KHÔNG thuộc skill này** (audit, tự bổ sung TC AI bỏ sót, report bug): nếu người dùng yêu cầu, có thể hỗ trợ format lại kết quả họ đã tự làm (ví dụ trình bày bảng audit thành Markdown, hoặc soạn bug report từ kết quả execute thực tế họ cung cấp) — nhưng không tự gắn nhãn VALID/INVALID, không tự nghĩ ra TC "AI bỏ sót", không tự khẳng định có bug khi chưa có kết quả chạy thực tế.

---

## Giai đoạn 1: Generate Test Case

### Bước 0 — Thu thập input

Cần có trước khi bắt đầu:
- **API spec** của SUT: OpenAPI/Swagger, hoặc mô tả endpoint (method, path, params, request/response schema, status code) nếu không có file spec chuẩn.
- **State transition rule** của resource nếu có (ví dụ FR-10: `pending → confirmed → shipping → delivered` + quy tắc cancel). Nếu người dùng không cung cấp, hỏi rõ trước khi làm Bước 3.
- **Danh sách endpoint cần cover role/quyền** (để làm IDOR, role escalation) — hỏi rõ vai trò nào tồn tại trong hệ thống (guest/user/admin...) nếu chưa có.

Nếu thiếu thông tin cần cho một bước cụ thể, đừng tự bịa — ghi `Cần làm rõ` trong file phân tích và tiếp tục các phần còn lại.

### Bước 1 — Domain Partition trên từng parameter

Với **mỗi parameter** của **mỗi endpoint** (path param, query param, request body field, header bắt buộc):
- Xác định equivalence class hợp lệ và không hợp lệ (ví dụ: email đúng format / sai format / rỗng / thiếu; password đủ độ phức tạp / thiếu ký tự đặc biệt / quá ngắn; price > 0 / price = 0 / price âm / không phải số).
- Áp dụng Boundary Value Analysis cho các field có giới hạn số/độ dài (min/max/min-1/max+1).
- Mỗi equivalence class + mỗi boundary là 1 test condition riêng, đặt ID tạm `DP-001`, `DP-002`...

Ghi vào bảng trong file phân tích, không sinh TC chi tiết ở bước này.

### Bước 2 — State Transition

Nếu resource có vòng đời nhiều trạng thái, áp dụng logic State Transition Testing (tham khảo cùng cách làm với skill `state-transition-tester` nếu người dùng đã có): liệt kê đầy đủ **mọi cặp (state, event)** kể cả invalid, bao gồm quy tắc cancel/exception nêu trong spec. Mỗi dòng valid/invalid là 1 test condition, ID tạm `ST-001`, `ST-002`...

### Bước 3 — Security (SEC-01 – SEC-07)

Đọc `references/security-checklist.md` để lấy đầy đủ 7 nhóm test security bắt buộc và cách thiết kế test condition cho từng nhóm trên một endpoint cụ thể (không dùng chung 1 prompt cho cả 7 nhóm — thiết kế riêng từng nhóm theo đúng đặc điểm endpoint). Mỗi test condition an ninh là 1 dòng riêng, ID tạm `SEC-01-001`, `SEC-02-001`... (số nhóm-số thứ tự).

### Bước 4 — Schema Validation

Với mỗi endpoint, đối chiếu response thực tế (dự kiến) với schema trong spec: đúng field bắt buộc, đúng kiểu dữ liệu, đúng enum value, không có field thừa/thiếu, đúng status code cho từng nhánh (success/error). Mỗi điều kiện đối chiếu là 1 test condition, ID tạm `SCH-001`, `SCH-002`...

### Bước 5 — Tổng hợp file phân tích

Tên file: `[API-NAME]-test-analysis.md` (API-NAME viết hoa không dấu, ví dụ `ORDER-API-test-analysis.md`).

```markdown
# API Test Analysis — [Tên API/SUT]

## 1. Phạm vi & nguồn spec
[API spec dùng, endpoint được chọn, role/quyền liên quan]

## 2. Domain Partition
| DP ID | Endpoint | Parameter | Equivalence class / Boundary | Hợp lệ? |
|---|---|---|---|---|

## 3. State Transition
| ST ID | State hiện tại | Event | Guard condition | State tiếp theo | Loại |
|---|---|---|---|---|---|
[Kèm Mermaid stateDiagram-v2 cho valid transitions]

## 4. Security (SEC-01–SEC-07)
| SEC ID | Nhóm | Endpoint | Test condition | Kết quả mong đợi |
|---|---|---|---|---|

## 5. Schema Validation
| SCH ID | Endpoint | Điều kiện đối chiếu schema |
|---|---|---|

## 6. Tổng số test condition theo nhóm
[Bảng đếm DP/ST/SEC/SCH — phải đạt tối thiểu 35 test condition/API, nếu chưa đủ quay lại các bước trên bổ sung]

## 7. Giả định / Cần làm rõ
[Liệt kê phần spec chưa rõ ràng]
```

Dừng lại sau bước này, hỏi người dùng review trước khi sinh TC chi tiết.

### Bước 6 — Sinh Test Case chi tiết (chỉ khi được yêu cầu)

Với mỗi test condition được chọn (có thể chọn toàn bộ hoặc theo nhóm DP/ST/SEC/SCH):
- Mỗi TC là **1 file `.md` riêng**, không gộp.
- TC ID convention: `TC-[API-NAME]-[NHÓM]-NNN` (NHÓM = DP/ST/SEC/SCH), NNN 3 chữ số tăng dần liên tục trong từng nhóm, bắt đầu từ 001.
- Tên file: `TC-[API-NAME]-[NHÓM]-NNN.md`.

```markdown
# TC-[API-NAME]-[NHÓM]-[NNN]

**Kỹ thuật thiết kế**: [Domain Partition / State Transition / Security - SEC-0X / Schema Validation]
**Tham chiếu test condition**: [DP/ST/SEC/SCH ID từ file phân tích]
**Endpoint**: [METHOD] [path]

## Mục tiêu
[Mô tả ngắn gọn điều kiện cần kiểm tra]

## Tiền điều kiện
- [Auth/role cần thiết, state hiện tại của resource nếu có, dữ liệu setup]

## Request
- Method, path, headers (kèm `X-Student-Id` nếu người dùng đã cung cấp Student ID)
- Body/params cụ thể

## Kết quả mong đợi
- Status code
- Response schema/field cụ thể mong đợi
- [Nếu là SEC: hành vi mong đợi khi bị tấn công — ví dụ từ chối input, trả 403/401, không rò rỉ dữ liệu]

## Ưu tiên
[High/Medium/Low — TC nhóm SEC và invalid state transition liên quan bảo mật/toàn vẹn dữ liệu mặc định High]
```

Với TC mà file phân tích ghi `Cần làm rõ`, vẫn tạo file nhưng ghi rõ trong "Kết quả mong đợi": *"Cần xác nhận với đội phát triển/BA trước khi thực thi"*.

---

## Giai đoạn 2: Execute — Postman Collection + Newman (chỉ khi được yêu cầu)

Đọc `references/postman-newman-guide.md` trước khi thực hiện giai đoạn này để lấy cấu trúc collection, mẫu pre-request script, và lệnh Newman đầy đủ.

Tóm tắt luồng:
1. Hỏi Student ID nếu chưa có (bắt buộc cho header `X-Student-Id`).
2. Đọc lại toàn bộ file TC `.md` đã sinh ở Giai đoạn 1 (không tự bịa thêm TC mới ở bước này).
3. Convert mỗi TC thành 1 request trong Postman Collection, gom theo folder = nhóm (Domain Partition / State Transition / Security / Schema Validation), dùng `assets/collection-template.json` làm khung.
4. Gắn pre-request script ở **collection-level** (không lặp lại ở từng request) để tự động set header `X-Student-Id`.
5. Gắn test script (`pm.test`) cho từng request tương ứng đúng "Kết quả mong đợi" đã viết trong file TC — kiểm tra status code + schema field.
6. Xuất file `.json` collection, hướng dẫn người dùng lệnh Newman để chạy và sinh HTML report (không tự chạy Newman nếu không có quyền truy cập mạng tới SUT thực tế — SUT là hệ thống nội bộ/localhost của người dùng).

---

## Lưu ý chung

- Không tự động thực hiện phần Audit, phần "tự bổ sung 5 TC AI bỏ sót kèm giải thích", hoặc phần report bug thực tế lên Markdown/GitHub Issues — đây là các phần bắt buộc phải do người dùng tự làm và chịu trách nhiệm, skill chỉ hỗ trợ định dạng lại nếu người dùng đã có nội dung.
- Coverage mặc định: tối thiểu 35 test condition/API, phủ đủ 4 nhóm DP/ST/SEC/SCH — nếu người dùng chỉ muốn 1 nhóm cụ thể, làm theo yêu cầu đó thay vì mặc định đủ cả 4.
- Không dùng emoji/icon trong bất kỳ file nào (đúng convention chung của các skill QA khác).
- Nếu API có nhiều version/role khác nhau truy cập cùng endpoint, tách riêng test condition theo từng role thay vì gộp chung.
