---
name: automation-test
description: Thiết kế và sinh code automation test cho frontend chạy được trên nhiều trình duyệt (Playwright hoặc Selenium WebDriver, TypeScript/JavaScript), theo nguyên tắc data-driven testing — toàn bộ dữ liệu test (input, expected result) được tách riêng ra file .csv hoặc .json, KHÔNG hardcode trong code test. Luôn dùng skill này khi người dùng nhắc đến "automation test", "test tự động", "kiểm thử tự động frontend", "cross-browser testing", "test đa trình duyệt", "Playwright", "Selenium", "data-driven testing", "test đọc dữ liệu từ file", hoặc yêu cầu sinh test script/test suite chạy trên nhiều browser (Chrome, Firefox, Safari/WebKit, Edge) — kể cả khi họ chỉ mô tả chức năng UI cần test mà chưa nói rõ framework.
---

# Data-Driven Cross-Browser Tester

Skill này giúp thiết kế và sinh code automation test frontend, tuân thủ 2 nguyên tắc cốt lõi:

1. **Cross-browser**: test phải chạy được trên nhiều trình duyệt (tối thiểu Chromium/Chrome + Firefox, khuyến khích thêm WebKit/Safari và Edge) thông qua cấu hình, không viết riêng code cho từng browser.
2. **Data-driven**: mọi dữ liệu input/expected result nằm trong file `.csv` hoặc `.json` riêng biệt, tách khỏi code test. Code test chỉ chứa logic (đọc data, thao tác UI, assertion) — **không được hardcode giá trị test cụ thể trong file `.spec.ts`**.

Framework hỗ trợ: **Playwright** và **Selenium WebDriver**, output code bằng **TypeScript/JavaScript**. Nếu người dùng không chỉ rõ framework, hỏi trước khi sinh code (Bước 1 của Giai đoạn 1) — không tự ý chọn.

Quy trình gồm 2 giai đoạn tách biệt, giống các skill QA khác đã dùng:

1. **Phân tích & Thiết kế** — đọc yêu cầu/spec/test case, xuất 1 file Markdown phân tích duy nhất.
2. **Sinh code** — chỉ thực hiện khi người dùng xác nhận, đọc lại file phân tích và sinh các file code + data thật.

Không tự động nhảy sang Giai đoạn 2 ngay sau Giai đoạn 1 — file phân tích cần được người dùng review vì đây là bước quyết định data schema và selector strategy, ảnh hưởng trực tiếp đến chất lượng code sinh ra.

---

## Giai đoạn 1: Phân tích & Thiết kế

### Bước 1 — Thu thập input

Xác định các thông tin sau; nếu người dùng chưa cung cấp, hỏi trước khi làm tiếp (đừng tự đoán các mục có dấu *):

- Spec/yêu cầu chức năng UI cần automation hoá (form, flow, page cụ thể)
- Test case gốc (nếu có sẵn từ skill `test-case-generator` hoặc tương đương) — nếu không có, tự suy ra scenario từ spec
- *Framework: Playwright hay Selenium WebDriver
- Trình duyệt mục tiêu — nếu không nói rõ, mặc định:
  - Playwright: Chromium, Firefox, WebKit
  - Selenium: Chrome, Firefox, Edge
- Base URL / môi trường test (dev, staging...)
- Định dạng data mong muốn: CSV hay JSON (xem gợi ý chọn ở Bước 3)

### Bước 2 — Liệt kê Scenario cần automation hoá

Với mỗi chức năng, liệt kê danh sách scenario theo dạng bảng, mỗi dòng là một luồng hành vi độc lập (tương ứng 1 test sau này):

| Scenario ID | Mô tả | Loại (Positive/Negative) | Tham chiếu TC gốc |
|---|---|---|---|
| SC-LOGIN-001 | Đăng nhập với tài khoản hợp lệ | Positive | TC-LOGIN-001 |
| SC-LOGIN-002 | Đăng nhập với password sai | Negative | TC-LOGIN-002 |

Nếu không có TC gốc, để trống cột cuối hoặc ghi "Tự suy ra từ spec".

### Bước 3 — Thiết kế Data Schema (quan trọng nhất)

Với mỗi nhóm scenario cùng flow (ví dụ tất cả scenario của form Login dùng chung 1 file data), xác định:

- Danh sách field input (tên field, kiểu dữ liệu, có bắt buộc không)
- Field expected result (kết quả mong đợi: message, URL đích, trạng thái UI...)
- Cột liên kết Scenario ID / TC ID để trace ngược

Chọn định dạng file:
- **CSV** — phù hợp khi data phẳng (flat), mỗi scenario chỉ cần 1 dòng input/output đơn giản, không có mảng lồng nhau.
- **JSON** — phù hợp khi data có cấu trúc lồng nhau (nested object/array), một scenario cần nhiều bước input, hoặc expected result có nhiều trường phức tạp.

Nếu người dùng không chỉ định, mặc định dùng **JSON** vì linh hoạt hơn cho hầu hết UI flow; chỉ dùng CSV khi data thực sự đơn giản dạng bảng hoặc người dùng yêu cầu CSV rõ ràng.

Không được để trống field bắt buộc trong schema — nếu spec chưa đủ thông tin (ví dụ chưa biết message lỗi chính xác), ghi "Cần làm rõ" trong file phân tích thay vì tự bịa giá trị.

### Bước 4 — Xác định Selector Strategy

Ưu tiên chọn selector theo thứ tự sau để tránh flaky test (áp dụng cho cả Playwright và Selenium):

1. `data-testid` / `data-test` / `data-qa` attribute (nếu app có expose) — ưu tiên cao nhất
2. ARIA role + accessible name (`getByRole` ở Playwright; `By.css('[role=...]')` kết hợp accessible name ở Selenium)
3. Label text cho form field (`getByLabel` ở Playwright)
4. Text content cho button/link tĩnh (`getByText`)
5. CSS selector — chỉ dùng khi không còn lựa chọn nào khác ở trên
6. XPath — hạn chế tối đa, chỉ dùng khi CSS selector không đủ để định danh phần tử (ví dụ cần điều hướng theo text cha)

Nếu spec/app không cho biết selector nào khả dụng, ghi rõ trong file phân tích: "Cần làm rõ - cần kiểm tra DOM thực tế hoặc xác nhận data-testid với dev" — không tự đoán class name hay cấu trúc DOM.

### Bước 5 — Xác định cấu trúc Project

Mặc định dùng **Page Object Model (POM)** trừ khi người dùng yêu cầu khác:

```
project/
├── pages/              # Page Object — chứa selector + action, không chứa assertion
│   └── LoginPage.ts
├── tests/              # Test spec — chứa test logic + assertion, đọc data từ file ngoài
│   └── login.spec.ts
├── data/                # File data-driven, tách biệt hoàn toàn khỏi code
│   └── login-testdata.json (hoặc .csv)
└── playwright.config.ts # (hoặc selenium config tương ứng — xem Bước 6)
```

### Bước 6 — Cấu hình Cross-browser

- **Playwright**: dùng `projects` trong `playwright.config.ts`, mỗi project ứng với 1 browser engine (`chromium`, `firefox`, `webkit`). Không viết test riêng cho từng browser — cùng 1 bộ test chạy qua cả 3 project.
- **Selenium**: dùng vòng lặp qua danh sách browser capability (`chrome`, `firefox`, `MicrosoftEdge`) khi khởi tạo `Builder().forBrowser(...)`, hoặc dùng Selenium Grid/BrowserStack nếu người dùng có sẵn hạ tầng đó. Ghi rõ trong file phân tích nếu người dùng cần remote grid thay vì local driver.

Chi tiết code mẫu đầy đủ nằm ở `references/playwright-templates.md` và `references/selenium-templates.md` — đọc file tương ứng với framework đã chọn ở Bước 1 khi sang Giai đoạn 2, không cần đọc trước ở Giai đoạn 1.

### Output file của Giai đoạn 1

Đặt tên file: `[MODULE]-automation-design.md` (MODULE viết hoa, không dấu, gạch ngang nếu nhiều từ).

Cấu trúc file, LUÔN dùng đúng khung này:

```markdown
# Automation Test Design — [Tên chức năng/module]

## 1. Phạm vi & nguồn spec
[Tóm tắt chức năng UI được automation hoá, nguồn spec/TC gốc]

## 2. Framework & môi trường
- Framework: [Playwright / Selenium WebDriver]
- Trình duyệt mục tiêu: [danh sách]
- Base URL: [url]
- Định dạng data: [CSV / JSON] — [lý do chọn]

## 3. Danh sách Scenario
| Scenario ID | Mô tả | Loại | Tham chiếu TC gốc |
|---|---|---|---|

## 4. Data Schema
| Field | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
[Ghi rõ field nào là input, field nào là expected result]

## 5. Selector Strategy
[Liệt kê selector dự kiến cho từng element chính, theo thứ tự ưu tiên ở Bước 4]

## 6. Cấu trúc Project
[Cây thư mục dự kiến]

## 7. Giả định / Cần làm rõ
[Liệt kê nếu có phần spec/selector/data chưa rõ ràng]
```

Sau khi tạo xong file phân tích, dừng lại và hỏi người dùng có muốn review/điều chỉnh trước khi sinh code thật hay không.

---

## Giai đoạn 2: Sinh code (chỉ khi được yêu cầu)

Khi người dùng xác nhận muốn sinh code:

1. Đọc lại file phân tích đã tạo ở Giai đoạn 1 (không tự bịa lại data schema hay selector).
2. Đọc file reference tương ứng với framework đã chọn: `references/playwright-templates.md` hoặc `references/selenium-templates.md` để lấy code mẫu chuẩn.
3. Sinh **file data trước** (`.json` hoặc `.csv` theo Bước 3 Giai đoạn 1), điền dữ liệu test cụ thể dựa trên bảng Data Schema và danh sách Scenario — mỗi scenario tương ứng ít nhất 1 dòng/1 object trong file data.
4. Sinh Page Object file (nếu dùng POM) — chỉ chứa selector và action method, KHÔNG chứa assertion hay giá trị test cụ thể.
5. Sinh test spec file — đọc data từ file ở bước 3 (import trực tiếp với JSON, hoặc parse bằng thư viện CSV như `csv-parse`/`papaparse` với CSV), loop qua từng dòng data để generate test động. Assertion nằm ở đây, không nằm ở Page Object.
6. Sinh/patch config file cross-browser theo Bước 6 Giai đoạn 1.
7. Mỗi file (data, page object, spec, config) là **một file riêng biệt**, đặt đúng vị trí theo cấu trúc project đã thiết kế — không gộp nhiều thành phần vào 1 file.

### Quy tắc bắt buộc khi sinh code

- Không được có giá trị test cụ thể (username, password, expected message...) hardcode trực tiếp trong file `.spec.ts` — mọi giá trị đó phải đọc từ file data.
- Code test dùng chung 1 bộ logic cho tất cả browser trong danh sách mục tiêu, không nhân bản code riêng cho từng browser.
- Tên file data, tên field trong data phải khớp chính xác với Data Schema đã thống nhất ở file phân tích.
- Nếu file phân tích có mục "Cần làm rõ" chưa được người dùng xác nhận, dừng lại hỏi trước khi sinh phần code liên quan đến mục đó — không tự đặt giá trị giả định.

---

## Lưu ý chung

- Không dùng icon/emoji trong bất kỳ output nào (file phân tích, comment trong code, tên file).
- Nếu người dùng yêu cầu framework hoặc ngôn ngữ ngoài phạm vi hỗ trợ (Playwright/Selenium, TypeScript/JavaScript), hỏi rõ trước khi tiếp tục thay vì tự chuyển đổi sang framework khác.
- Nếu người dùng đã có sẵn project automation (page object, config có sẵn), ưu tiên đọc và tuân theo convention hiện có của project đó thay vì áp cấu trúc mặc định ở Bước 5.