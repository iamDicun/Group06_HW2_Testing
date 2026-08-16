# AI Audit Report (Appendix)

**Student:** Quang Đạo — 21127498
**Assignment:** HW04 – Automation Testing

I use AI tools for the following tasks:



## Interaction 1

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Tôi đang thực hiện một bài tập liên quan đến Automation Testing. Tôi được yêu cầu tạo test case và nhờ AI convert test case sang automation script. Vậy, theo bạn, từng test case là từng file Markdown (.md) riêng lẻ hay gộp chung các test case vào 1 file tên test_case.md? Vì sao? Theo yêu cầu đề, tôi cần tạo 12 test cases cho 3 chức năng trong phần mềm tôi được giao để test. Trong yêu cầu đề có ghi là: "combination of positive, negative, and edge cases — all types count toward the minimum.", theo tôi đang hiểu nghĩa là positive test case là test case pass, negative test case là có bug, bị fail, vậy còn edge case, theo bạn là gì? Xin cảm ơn.

- **The AI output:**

> Chào Đạo, mình trả lời từng phần nhé.
>
> ## 1. Một file .md riêng cho mỗi test case, hay gộp chung?
>
> Cả hai cách đều tồn tại trong thực tế, nhưng với bối cảnh bài tập của bạn (nhờ AI convert test case → automation script), mình nghiêng về **gộp chung vào 1 file `test_cases.md`**, vì vài lý do:
>
> - **Dễ cho AI đọc context tổng thể**: khi AI (Copilot Agent, Claude, v.v.) convert sang script, nó cần hiểu được bức tranh chung — 12 test case này thuộc 3 chức năng nào, có liên hệ/phụ thuộc gì không (ví dụ TC lockout phụ thuộc TC login trước đó). Nếu tách 12 file riêng, AI phải đọc từng file một, dễ mất context xuyên suốt, và bạn phải prompt AI đọc nhiều lần.
> - **Dễ maintain và review**: một file duy nhất giúp bạn (và giảng viên) scan nhanh toàn bộ test suite, so sánh coverage giữa các chức năng, tránh trùng lặp.
> - **Dễ trace lại yêu cầu đề bài**: đề yêu cầu "12 test case cho 3 chức năng, đủ positive/negative/edge" — gộp chung giúp bạn dễ đối chiếu checklist này hơn.
>
> **Khi nào nên tách file riêng?** Nếu 3 chức năng đó độc lập hoàn toàn, không dùng chung fixture/data, và bạn định để AI generate script theo từng batch riêng biệt (ví dụ mỗi lần một file khác nhau để tránh prompt quá dài) — lúc đó tách theo **từng chức năng** (3 file, mỗi file ~4 test case) là hợp lý hơn tách theo từng test case đơn lẻ. Tách 12 file riêng cho 12 test case thường là quá vụn, không cần thiết trừ khi đề yêu cầu rõ ràng.
>
> Gợi ý cấu trúc: gộp theo chức năng, dùng heading rõ ràng:
> ```markdown
> # Test Cases - [Tên hệ thống]
>
> ## Feature 1: Login
> ### TC-01: [Tên test case]
> - **Loại**: Positive / Negative / Edge
> - **Precondition**: ...
> - **Steps**: ...
> - **Expected Result**: ...
>
> ### TC-02: ...
> ```
> Format có cấu trúc nhất quán (table hoặc heading pattern) sẽ giúp AI parse chính xác hơn khi convert sang script.
>
> ## 2. Về positive / negative / edge case
>
> Cách hiểu của bạn về **negative** chưa chính xác — mình làm rõ lại:
>
> - **Positive test case**: kiểm tra hệ thống hoạt động **đúng với input/luồng hợp lệ**. Test PASS nghĩa là hệ thống làm đúng điều nó nên làm. Ví dụ: đăng nhập với username/password đúng → login thành công.
>
> - **Negative test case**: kiểm tra hệ thống **xử lý đúng khi gặp input/luồng không hợp lệ**. Đây **không phải** là "test case bị fail" hay "có bug" — mà là test case PASS khi hệ thống **từ chối/báo lỗi đúng cách**. Ví dụ: nhập sai password → hệ thống hiện thông báo lỗi, không cho login. Nếu hệ thống lại cho login thành công dù sai password, thì lúc đó test case mới FAIL (vì phát hiện bug). Nói cách khác: positive/negative mô tả **loại input đang test**, không phải kết quả pass/fail của test case.
>
> - **Edge case**: kiểm tra hệ thống ở **ranh giới/giới hạn** của điều kiện hợp lệ — nơi hành vi dễ sai nhất. Đây là các giá trị "biên" (boundary values) hoặc tình huống hiếm gặp nằm ngay tại đường phân cách giữa "hợp lệ" và "không hợp lệ". Ví dụ:
>   - Ô input giới hạn 20 ký tự → test với đúng 20 ký tự (biên trên hợp lệ) và 21 ký tự (biên trên không hợp lệ)
>   - Trường số lượng tồn kho = 0 (boundary của "hết hàng")
>   - Đăng nhập sai liên tiếp đúng số lần tối đa cho phép trước khi bị khóa (ví dụ đúng lần thứ 5 nếu giới hạn là 5)
>   - Chuỗi rỗng, giá trị null, hoặc input có ký tự đặc biệt ở vị trí biên
>
> Edge case thường overlap với kỹ thuật **Boundary Value Analysis** — bạn có thể liên hệ với phần Decision Table / State Transition bạn đã làm trước đó trong môn này, vì boundary value cũng hay được kết hợp với các kỹ thuật đó để chọn test data.
>
> **Tóm gọn phân loại theo "trục input" chứ không phải "trục kết quả pass/fail":**
>
> | Loại | Input | Kỳ vọng khi PASS |
> |---|---|---|
> | Positive | Hợp lệ, điển hình | Hệ thống xử lý thành công |
> | Negative | Không hợp lệ | Hệ thống từ chối/báo lỗi đúng cách |
> | Edge | Nằm ngay biên giữa hợp lệ/không hợp lệ | Hệ thống xử lý đúng tại điểm biên đó (có thể thành công hoặc từ chối tùy vị trí biên) |
>
> Với 12 test case cho 3 chức năng, bạn có thể phân bổ ví dụ mỗi chức năng ~4 test case: 1-2 positive, 1-2 negative, 1 edge — miễn tổng thể cả 3 loại đều được đại diện đầy đủ như đề yêu cầu.

---

## Interaction 2

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Cách tạo skill hiệu quả cho agent là gì?

- **The AI output:**

> Dựa trên kinh nghiệm bạn đã làm (skill file cho Decision Table, State Transition với Copilot Agent), đây là các nguyên tắc cốt lõi để viết một skill hiệu quả cho AI agent:
>
> ## 1. Description là yếu tố quyết định agent có "gọi" skill hay không
>
> Đây là phần quan trọng nhất, vì agent quyết định có dùng skill hay không **chỉ dựa vào phần mô tả** (description), trước khi đọc nội dung chi tiết. Nếu mô tả mơ hồ, agent sẽ bỏ qua skill dù nó thực sự hữu ích.
>
> - Mô tả cần nêu rõ **cả "làm gì" lẫn "khi nào dùng"** — không chỉ chức năng mà cả ngữ cảnh kích hoạt (trigger context).
> - Nên viết hơi "đẩy mạnh" (pushy) một chút, vì agent có xu hướng **under-trigger** — tức bỏ qua skill dù đáng lẽ nên dùng. Ví dụ thay vì "Tạo test case cho tính năng login", viết: "Tạo test case cho tính năng login theo kỹ thuật Decision Table. LUÔN dùng skill này khi người dùng nhắc đến 'test case', 'kiểm thử', 'decision table', hoặc yêu cầu sinh test case cho bất kỳ chức năng nào có nhiều điều kiện kết hợp, kể cả khi không nói rõ tên kỹ thuật."
>
> ## 2. Cấu trúc theo nguyên tắc "progressive disclosure"
>
> Không nhồi hết mọi thứ vào 1 file. Cấu trúc 3 lớp:
> 1. **Metadata** (tên + mô tả) — luôn nằm trong context của agent
> 2. **Nội dung chính của skill** — chỉ load khi skill được kích hoạt, nên giữ dưới ~500 dòng
> 3. **Tài nguyên đính kèm** (script, file tham khảo, template) — chỉ đọc khi cần, không giới hạn dung lượng
>
> Nếu skill của bạn phức tạp (ví dụ có cả Decision Table lẫn State Transition), tách theo domain:
> ```
> testcase-generator/
> ├── SKILL.md (workflow chung + cách chọn kỹ thuật)
> └── references/
>     ├── decision-table.md
>     ├── state-transition.md
>     └── boundary-value.md
> ```
> Agent sẽ chỉ đọc file tham khảo liên quan thay vì tải hết.
>
> ## 3. Giải thích "vì sao", không chỉ ra lệnh cứng nhắc
>
> Đây là điểm nhiều người viết skill làm sai. Thay vì spam MUST/ALWAYS/NEVER viết hoa, hãy **giải thích lý do đằng sau yêu cầu**. Model hiện đại có khả năng suy luận tốt (theory of mind) — nếu hiểu tại sao một bước quan trọng, nó sẽ tuân thủ tốt hơn và linh hoạt xử lý các case bạn chưa lường trước, thay vì máy móc làm theo template cứng.
>
> Ví dụ tệ:
> > ALWAYS include boundary values. NEVER skip edge cases.
>
> Ví dụ tốt hơn:
> > Edge case thường là nơi bug ẩn náu nhất vì dev hay quên xử lý đúng tại điểm biên. Khi sinh test case, hãy chủ động xác định giá trị biên (min, max, min-1, max+1) cho mỗi input field và giải thích tại sao giá trị đó có khả năng gây lỗi.
>
> ## 4. Định dạng output rõ ràng, nhất quán
>
> Nếu bạn cần agent xuất ra test case theo format cố định để dễ convert sang script sau này, định nghĩa template rõ ràng ngay trong skill:
> ```markdown
> ## Test case format
> LUÔN dùng đúng cấu trúc này:
> ### TC-[ID]: [Tên]
> - Loại: Positive/Negative/Edge
> - Precondition: ...
> - Steps: ...
> - Expected Result: ...
> ```
> Cách này giúp output nhất quán giữa các lần chạy — quan trọng nếu bạn định feed test case này cho một agent/skill khác convert sang script Playwright.
>
> ## 5. Test và lặp lại (iterate)
>
> Viết skill không nên "một phát ăn ngay". Quy trình chuẩn:
> 1. Viết bản draft
> 2. Chạy thử với 2-3 prompt thực tế (giống cái người dùng thật sẽ gõ)
> 3. Xem output, tinh chỉnh — đặc biệt chú ý các chỗ agent làm sai hướng hoặc bỏ sót
> 4. Lặp lại
>
> Với bối cảnh môn học của bạn, đây chính là lý do đề bài có thể yêu cầu bạn thử nghiệm skill trên vài test case mẫu trước khi áp dụng đại trà cho cả 12 test case.
>
> ---
>
> Nếu bạn muốn, mình có thể giúp bạn viết luôn một skill file cụ thể cho việc "convert test case → automation script" theo đúng chuẩn này — bạn có sẵn ý tưởng về framework automation sẽ dùng chưa (Playwright, Selenium, v.v.)?

---

## Interaction 3

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Cách tạo skill hiệu quả cho agent bằng file skill.md là gì? Hãy hướng dẫn cụ thể, chi tiết, đầy đủ, dễ hiểu với ví dụ cụ thể, chi tiết, rõ ràng và dễ hiểu. Xin cảm ơn

- **The AI output:**

> [The assistant produced a full downloadable guide, `huong-dan-viet-skill-md.md`, containing: (1) how a SKILL.md is loaded via progressive disclosure, (2) the standard skill folder/file structure, (3) how to write an effective `description` field with weak-vs-strong examples, (4) how to write the skill body using imperative language and "why"-based explanations instead of rigid MUST/NEVER rules, (5) how to define a consistent output format with input→output examples, (6) the draft→test→refine iteration loop, (7) a quick pre-completion checklist, and (8) a complete worked example SKILL.md named `eshop-testcase-generator` tailored to the student's EShop login test-case scenario. The full text of this guide is preserved in the file `huong-dan-viet-skill-md.md`, which was generated and delivered directly to the student during this conversation.]
>
> *(Chat reply accompanying the file: "Mình đã tổng hợp hướng dẫn đầy đủ vào file trên, gồm: cơ chế 3 lớp tải dần của skill, cấu trúc thư mục chuẩn, cách viết `description` sao cho agent không bỏ sót (kèm ví dụ so sánh yếu/tốt), cách viết nội dung theo hướng giải thích lý do thay vì ra lệnh cứng, quy trình lặp thử nghiệm, checklist nhanh, và một ví dụ SKILL.md hoàn chỉnh áp dụng trực tiếp vào bối cảnh EShop testing của bạn (login với giới hạn username, khóa sau 5 lần sai). Nếu bạn muốn, mình có thể giúp viết thêm skill riêng cho việc convert test case → Playwright script, để hai skill này nối tiếp nhau trong pipeline của bạn.")*

---

## Interaction 4

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> [Uploaded file: `playwright-skill.md`, containing a SKILL.md named `build-playwright-assignment`]
> Trong bài tập lần này, tôi cần sử dụng Playwright để thực hiện automation testing. Tôi được cung cấp file skill này. Làm sao áp dụng file skill này một cách hợp lý, phù hợp để thực hiện bài tập này một cách hoàn chỉnh nhất? Xin cảm ơn.

- **The AI output:**

> File skill này khá "nặng đô" — nó không chỉ hướng dẫn cách viết test case mà đóng gói nguyên một quy trình audit + build đầy đủ cho assignment automation testing. Để áp dụng hiệu quả, mình phân tích theo 3 phần: **cách đặt skill vào đúng chỗ**, **thứ tự thực hiện thực tế**, và **những điểm dễ vấp phải theo đúng rubric của skill này**.
>
> **1. Đặt file skill đúng vị trí để agent nhận diện** — đặt vào thư mục skill của agent (`.github/skills/` hoặc theo cấu hình MCP), giữ tên thư mục khớp `name` trong frontmatter (`build-playwright-assignment/`).
>
> **2. Trước khi bắt đầu — chuẩn bị "hợp đồng" (Establish the contract):** chuẩn bị sẵn Student ID (21127498), chọn đúng 3 chức năng EShop, URL ứng dụng và cách khởi động, credentials/reset mechanism, vị trí nộp bài.
>
> **3. Hiểu đúng con số yêu cầu:** "at least 12 per feature" nghĩa là tối thiểu 36 test case logic (12×3), nhân 3 trình duyệt → 108 lần thực thi test, và 9 report HTML riêng biệt, mỗi report phải hiện `Run by: 21127498 | <feature-name> | <browser>`.
>
> **4. Thứ tự thực hiện thực tế theo 7 bước AI conversion:** Analyze → Design → Review → Model data → Map automation → Generate → Verify and repair, ghi log từng bước vào `docs/ai-conversion-log.md`.
>
> **5. Các ràng buộc kỹ thuật cần review:** data-driven thật sự (CSV/JSON riêng, không inline), locator ưu tiên `getByRole` > label/placeholder/text > test ID > CSS, ít nhất 3 pattern assertion khác nhau, TypeScript không dùng `any`, không được xóa test/nới lỏng assertion để "làm xanh" kết quả giả.
>
> **6. Chạy theo đúng thứ tự "Validate in increasing scope":** cài dependency → type checking → `npx playwright test --list` → chạy thử 1 case/chức năng trên Chromium → chạy full ma trận 9 ô → kiểm tra report.
>
> **7. Dùng "Completion gate" làm checklist nộp bài** — tick từng mục thật sự, đặc biệt xác nhận report có chữ `Run by:` hiển thị thật, và tách rõ "đã implement" vs "đã chạy và verify" trong báo cáo cuối.
>
> *(Kết thúc bằng câu hỏi: "Bạn đã xác định 3 chức năng cụ thể nào trong EShop sẽ dùng cho assignment này chưa? Nếu có, mình có thể giúp bạn phác ngay requirement ledger và bộ 12 test case đầu tiên cho 1 chức năng để làm mẫu trước khi nhân rộng.")*

---

## Interaction 5

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Tôi chưa cài PlayWright hay gì, làm sao có thể cài Playwright và áp dụng skill trên? Ngoài ra, tôi chưa rõ là phải tự tạo tay 12 Test case hay để file skill trên làm luôn rồi mới chuyển qua automated scripts? Hãy hướng dẫn chi tiết, cụ thể, dễ hiểu, đầy đủ. Xin cảm ơn

- **The AI output:**

> **Phần 1 — Cài đặt Playwright:** kiểm tra Node.js (≥18) → `npm init playwright@latest` (chọn TypeScript, cài cả 3 trình duyệt) → `npx playwright install` để xác nhận đủ Chromium/Firefox/WebKit → `npx playwright test` để test cài đặt → để agent với skill cấu hình `playwright.config.ts` theo đúng yêu cầu (3 project, HTML reporter riêng từng cell, title chứa `Run by: <student-id>`).
>
> **Phần 2 — Tự viết tay hay để AI làm:** nên để AI (với skill) làm phần sinh test case + code, nhưng học sinh phải review, xác nhận, và chịu trách nhiệm cuối cùng — không "giao trắng". Bước Design (đề xuất ≥12 case) là việc skill được thiết kế để AI làm, đúng tinh thần đề bài "nhờ AI convert test case sang automation script" — nhưng đề bài mở rộng tới cả bước AI thiết kế test case, không chỉ convert ở bước cuối.
>
> Quy trình đề xuất: (1) tự chọn 3 chức năng — quyết định của học sinh, không giao AI chọn thay; (2) chạy Analyze + Design cho từng chức năng, dừng lại sau Design để review; (3) sau khi 12 case đã "chốt", mới cho AI tiếp tục Model data → Generate → Verify.
>
> Lý do quan trọng: đề bài rất có thể chấm điểm "step-by-step AI collaboration evidence" — tức muốn thấy dấu vết tương tác/phản biện/chỉnh sửa AI qua từng bước, không phải 1 prompt ra kết quả cuối; và nếu để AI tự thiết kế + code + chạy toàn bộ không review, rủi ro AI hiểu sai logic nghiệp vụ EShop dẫn đến test case sai từ gốc.
>
> *(Kết thúc bằng câu hỏi về 3 chức năng cụ thể để chạy thử mẫu bước Analyze + Design.)*

---

## Interaction 6

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Tôi đang sử dụng Github Copilot trong VS Code, tôi có cần để file playwright skill vào thư mục .github, là thư mục con của thư mục gốc không?

- **The AI output:**

> Câu trả lời ngắn: có, nhưng không đơn giản là "thả file vào `.github/`" — vì GitHub Copilot không có khái niệm SKILL.md như Claude. Format file (YAML frontmatter `name`+`description`) là chuẩn của Claude; Copilot dùng quy ước khác.
>
> Copilot có 3 loại file tùy biến: `.github/copilot-instructions.md` (luôn áp dụng cho mọi request, không có cơ chế "trigger theo ngữ cảnh"), `.github/instructions/*.instructions.md` (áp dụng theo `applyTo` pattern), và `.github/prompts/*.prompt.md` (chỉ chạy khi gọi thủ công bằng `/tên-prompt`).
>
> Đề xuất: đặt nội dung file skill (bỏ YAML frontmatter) vào `.github/prompts/build-playwright-assignment.prompt.md`, gọi bằng `/build-playwright-assignment` khi cần. Có thể tách phần nguyên tắc ngắn gọn, bất biến (TypeScript, không dùng `any`, ưu tiên `getByRole`, data external...) sang `copilot-instructions.md` để luôn được nạp, còn quy trình chi tiết dài để trong prompt file gọi khi cần. Có thể dùng `/create-instructions` hoặc `@workspace Generate custom instructions...` để sinh khung sườn nhanh.
>
> *(Kết thúc bằng đề nghị soạn sẵn 2 file cụ thể cho học sinh.)*

---

## Interaction 7

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Trong file skill playwright-skill.md mà tôi gửi bạn, skill có nêu rõ hệ thống Eshop chưa? Do cấu trúc thư mục tôi là: Homework (thư mục gốc) -> Quang_Dao_21127498 (thư mục con) -> Eshop (thư mục con của Quang_Dao_21127498) và HW4 (thư mục con của thư mục Quang_Dao_21127498), trong thư mục HW4, mới có thư mục con là .github, và mới có để prompt là playwright-skill.prompt.md. Vậy, có cần điều chỉnh prompt.md để chỉ rằng vào xem code phần mềm cần test, hay gửi link url mà đang Eshop đang chạy ở các terminal khác, rồi test như black box? Bạn hãy trả lời và giải thích một cách chân thành, rõ ràng, dễ hiểu, cụ thể, chi tiết và đầy đủ. Bạn hiểu ý mình chứ? Mình không chắc là file skill playwright biết mình cần test Eshop hay không. Xin cảm ơn

- **The AI output:**

> Không, file skill `playwright-skill.md` hoàn toàn không nhắc đến "EShop" — được viết hoàn toàn generic ("the application", "the repository"). Bằng chứng: mục "Establish the contract" yêu cầu agent tự đi tìm thông tin về app (đọc code, đọc doc, xem UI đang chạy) — skill "biết cách hỏi" nhưng không "biết EShop là gì" cho tới khi được cung cấp.
>
> Vấn đề thật sự: `Eshop` và `HW4` là hai thư mục **ngang hàng**, không lồng nhau. Nếu workspace root là `HW4`, Copilot Agent mặc định chỉ thấy file trong phạm vi workspace — không tự động thấy được code trong `Eshop/`.
>
> Nên kết hợp cả đọc source lẫn test qua URL thật, không chỉ chọn 1: chỉ black-box qua URL rủi ro bỏ sót rule validation ẩn, message lỗi chính xác, và edge case ẩn trong code (như bug cố ý bạn từng tìm ra ở bài Login/Lockout); chỉ đọc code thì không thay thế được việc chạy thật trên trình duyệt.
>
> Đề xuất Cách 1 (khuyến nghị): gộp `Eshop` và `HW4` vào cùng multi-root workspace (`File → Add Folder to Workspace`), rồi thêm đoạn "Application context" (hệ thống, đường dẫn source, URL, student ID) vào đầu file prompt. Cách 2 (nếu không gộp workspace): cung cấp URL EShop đang chạy + copy/tóm tắt tài liệu đặc tả 3 chức năng vào `docs/eshop-feature-specs.md`, trỏ agent đọc file đó.
>
> *(Kết thúc bằng đề nghị soạn đoạn "Application context" hoàn chỉnh, hỏi thêm port, lệnh khởi động, và 3 chức năng dự định chọn.)*

---

## Interaction 8

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> "Cung cấp URL EShop đang chạy ở terminal khác
> * Copy hoặc tóm tắt tài liệu đặc tả 3 chức năng bạn chọn (ví dụ file requirement/use case bạn từng có sẵn từ môn Software Testing) vào một file trong `HW4` (ví dụ `docs/eshop-feature-specs.md`), rồi trỏ agent đọc file đó thay vì đọc trực tiếp source"
> Tôi nên thêm những thông tin này vào skill hay là thêm vào khi prompt mà vẫn giữ nguyên skill?

- **The AI output:**

> Nên giữ nguyên skill, và thêm thông tin này ở tầng prompt/context riêng — không sửa trực tiếp vào file skill.
>
> Lý do: (1) phá vỡ nguyên tắc "skill phải tái sử dụng được" — nếu sửa cứng thông tin EShop vào skill, skill không dùng lại được cho bài khác, và nếu URL đổi port thì phải sửa lại cả skill; (2) trộn lẫn 2 loại thông tin khác bản chất — quy trình/phương pháp (ổn định, thuộc về skill) khác với dữ liệu ngữ cảnh cụ thể (URL, đặc tả chức năng, student ID — thay đổi theo lần chạy, nên đặt ngoài skill).
>
> Đề xuất Cách A (khuyến nghị): tạo file `docs/eshop-feature-specs.md` riêng, chứa student ID, URL, cách khởi động, và đặc tả 3 chức năng; khi gọi prompt thì trỏ tới file này, không sửa `playwright-skill.prompt.md`. Cách B (nhanh hơn nhưng không lưu vết): gõ trực tiếp thông tin ngữ cảnh trong prompt khi chat, không tạo file riêng.
>
> Khuyến nghị dùng Cách A vì nhất quán với việc skill đã yêu cầu log AI conversion ở `docs/ai-conversion-log.md`, và thể hiện rõ tư duy phân biệt "phương pháp" vs "dữ liệu áp dụng" khi giảng viên review.
>
> *(Kết thúc bằng đề nghị soạn sẵn khung `docs/eshop-feature-specs.md`.)*

---

## Interaction 9

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Nên chỉ rõ ví dụ HW4/.github/docs/.... không thay chỉ cần ghi trong prompt: "docs/eshop-feature-specs.md"?

- **The AI output:**

> Không cần ghi đường dẫn đầy đủ kiểu `HW4/.github/docs/...`, và không nên đặt `docs/` bên trong `.github/` — nhưng có một điểm kỹ thuật tế nhị về cách Copilot resolve đường dẫn tương đối trong file prompt.
>
> (1) `docs/` nên ngang hàng với `.github/` trong `HW4/`, không lồng bên trong, để nhất quán với vị trí `docs/ai-conversion-log.md` mà skill đã quy định.
>
> (2) Điểm kỹ thuật quan trọng: trong `copilot-instructions.md`, đường dẫn tương đối resolve từ workspace root; nhưng trong file `.prompt.md`, có ghi nhận trường hợp đường dẫn tương đối lại resolve từ vị trí của chính file prompt đó (từng được báo là inconsistency lên đội phát triển VS Code Copilot). Hậu quả: nếu viết `#file:docs/eshop-feature-specs.md` trong file `.prompt.md`, Copilot có thể tìm nhầm ở `HW4/.github/prompts/docs/...` thay vì `HW4/docs/...`.
>
> (3) Cách an toàn: không dùng cú pháp `#file:` cứng trong `.prompt.md`, mà mô tả bằng lời rõ ràng vị trí file tính từ workspace root; và khi thực sự chạy `/playwright-skill`, gõ thêm `#file:docs/eshop-feature-specs.md` trực tiếp vào ô chat (cách này luôn resolve đúng từ workspace root theo ghi nhận thực tế) để chắc chắn agent load đúng file.
>
> *(Kết thúc bằng đề nghị soạn hoàn chỉnh cả file `.prompt.md` đã chỉnh sửa và khung `docs/eshop-feature-specs.md`.)*

---

## Interaction 10

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Output cuộc trò chuyện này ra file .md cho tôi với đúng yêu cầu: "Attach the AI Audit Report as an appendix... [assignment's AI Audit Report requirements, quoted from the PDF]... To simplify this process, you are encouraged to create a skill or rule that extracts the information above automatically after an AI session."

- **The AI output:**

> [The assistant generated and delivered a Markdown file, `AI-Audit-Report.md`, containing a declaration ("I use AI tools for the following tasks,") followed by a structured entry for each prior interaction in the conversation up to that point (interactions 1–9 above), each with AI tool name, date, prompt, and AI output, plus a note explaining that exact per-message timestamps are not available in this environment and that the student should fill them in from their own chat export if the rubric requires exact clock times. This file is the same document now being updated with the interactions below.]

---

## Interaction 11

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> [Uploaded files: `2026_HW04_Automation_Testing_En.pdf` (the assignment brief) and `playwright-skill_prompt.md` (the same `build-playwright-assignment` skill content as before)]
> Theo tôi hiểu là tạo test case -> rồi automation script -> rồi playwright mới chạy phải không? Không hiểu sao, khi tôi đính kèm skill này rồi, với context bao gồm file README.md của Eshop rồi nhưng agent lại tự ghi file, tạo phiên bản Eshop mini? Tôi cần skill làm sao mà agent có thể tạo test case, rồi chuyển test case đó thành automation script, rồi thực thi bằng playwright. Skill hiện tại tôi gửi bạn đang bị lỗi gì sao mà không thực hiện được flow tôi vừa ghi? Xin cảm ơn.

- **The AI output:**

> Xác nhận luồng bạn hiểu (test case → automation script → Playwright chạy) là đúng và đầy đủ, khớp với Task 1 của đề bài.
>
> Chẩn đoán nguyên nhân agent tự tạo "EShop mini": mục "Establish the contract" trong skill có câu "If the application cannot run, continue with design and implementation where possible, but clearly mark execution and report generation as blocked" — câu này không nói rõ "implementation" chỉ nghĩa là viết script chờ sẵn, và không hề cấm rõ ràng việc tự dựng hệ thống thay thế. Kết hợp với các câu nhấn mạnh "Produce working, evidence-backed automation" và "Aim for the suite to execute end to end", agent bị áp lực phải "có cái chạy được" nên khi không tiếp cận được EShop thật (do workspace không có quyền truy cập source, và có thể chưa có URL thật), nó chọn nhầm hướng tự chế app thay vì dừng lại báo lỗi.
>
> Đây là lỗi cấu trúc của skill (thiếu nguyên tắc phương pháp), nên cần sửa trực tiếp vào skill — khác với việc thêm URL/đặc tả (là dữ liệu ngữ cảnh, nên để ngoài skill). Đề xuất thêm đoạn "Never fabricate a substitute SUT" vào ngay dưới mục "Establish the contract", yêu cầu agent dừng lại và báo cáo chính xác thứ đang thiếu (quyền truy cập workspace, URL, lệnh khởi động) thay vì tự dựng ứng dụng/trang/backend thay thế, và xác minh ứng dụng thật có phản hồi được trước khi viết bất kỳ test nào.
>
> Ngoài sửa skill, học sinh cần: xác nhận EShop đang chạy thật trước khi gọi skill; cho agent quyền đọc source thật (gộp workspace hoặc cung cấp `docs/eshop-feature-specs.md`); và nhắc lại rõ trong prompt "KHÔNG được tạo phiên bản thay thế nào của EShop".

---

## Interaction 12

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> [Uploaded file: a Playwright-generated `error-context.md` for a failed test `FR-07 F2-TC-006 positive`, containing the failure's test info, error details, an accessibility-tree snapshot of the real EShop cart page, and the relevant test source code]
> Tôi nghĩ chắc file skill có vấn đề hay sao, vì tôi thấy agent inspect code và output file này bảo là data. Tôi không chắc automation testing có audit source code phần mềm và xem file trên là data. Bạn nghĩ là do file skill chưa bám sát yêu cầu hay có vấn đề gì?

- **The AI output:**

> Xác nhận file này không phải "test data" (theo nghĩa CSV/JSON data-driven) và không liên quan tới việc audit source code EShop. Đây là `error-context.md` — một artifact debug **do chính Playwright tự động sinh ra khi test fail**, gắn với tính năng "Fix with AI" của VS Code Playwright extension/Copilot, được thiết kế sẵn để đưa cho AI đọc và giải thích/sửa lỗi (đã xác nhận qua tra cứu tài liệu Playwright chính thức).
>
> Điểm tích cực: accessibility snapshot trong file cho thấy nội dung tiếng Việt thật ("Giỏ hàng của bạn đang trống", footer "© 2026 EShop SUT...") — tức test đã chạy trên EShop thật, không phải bản giả agent tự dựng như lo ngại trước đó.
>
> Phân tích lỗi thật trong automation script: dòng `await expect(page.locator('table')).toBeVisible()` fail vì (1) test case này giả định giỏ hàng có sản phẩm nhưng thực tế giỏ trống — thiếu bước setup/precondition thêm sản phẩm trước khi kiểm tra; (2) locator `table` quá chung chung, vi phạm nguyên tắc ưu tiên locator mà chính skill quy định (`getByRole` trước, CSS thô là lựa chọn cuối); (3) nhánh `else` không có tên category rõ ràng, khó debug. Đây chính xác là loại lỗi bước "Review and fix (human review)" của skill yêu cầu học sinh phát hiện và sửa, đồng thời là nguyên liệu tốt cho phần "AI Critique" bắt buộc của đề bài.

---

## Interaction 13

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Tôi chưa hiểu, bản chất automation test có được đọc code như tôi đang làm không? Hãy chỉ tạo test case, rồi tạo automation script rồi dùng playwright chạy trên đường link thật, rồi report kết quả thôi?

- **The AI output:**

> Xác nhận luồng người dùng mô tả (test case → automation script → Playwright chạy trên URL thật → report) là định nghĩa đầy đủ, đúng chuẩn của automation testing — không thiếu bước nào.
>
> Làm rõ: đọc source code KHÔNG phải bước bắt buộc của automation testing, chỉ là kỹ thuật tùy chọn hỗ trợ giai đoạn thiết kế test case (gray-box), còn automation testing khi thực thi luôn là black-box — Playwright tương tác qua trình duyệt giống người dùng thật, không "nhìn vào" code lúc chạy. Lời khuyên đọc source trước đó chỉ nhằm bù thông tin do tài liệu EShop sơ sài, không phải điều kiện bắt buộc, và thực tế đã gây rủi ro (agent tự chế app khi bí).
>
> Khuyến nghị: chuyển hẳn sang black-box thuần túy — học sinh tự mô tả acceptance criteria ở mức UI dựa trên thao tác thử thật, cung cấp cho agent chỉ URL + mô tả chức năng (không cấp quyền source), và thêm hẳn một nguyên tắc "Black-box only" vào skill để cấm tuyệt đối việc đọc/tham chiếu source hoặc tạo file thay thế cho SUT. Đánh đổi: có thể bỏ sót một số rule ẩn không lộ rõ trên UI, nhưng đây là đánh đổi chuẩn mực, được công nhận trong ISTQB Syllabus (tài liệu tham khảo chính của đề bài).

---

## Interaction 14

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> [Uploaded file: `HW4.zip`, the student's in-progress Playwright project for the assignment]
> Cấu hình playwright.config.ts với 3 project Chromium/Firefox/WebKit, viết runner script chạy 9 ô, report title chứa "Run by: 21127498".

- **The AI output:**

> [The assistant extracted and inspected the uploaded project (playwright.config.ts, tests/register.spec.ts, tests/cart.spec.ts, test-data/register.csv, test-data/cart.csv, context/personal.md) before writing any code. It confirmed via a targeted web search that Playwright's built-in HTML reporter has no supported "title" config option, so it could not simply set a `title` field in the reporter config to satisfy the "Run by: {StudentID}" requirement.
>
> It then delivered two files:
> 1. An updated `playwright.config.ts` — keeping the 3 existing browser projects (chromium/firefox/webkit), adding a dynamic HTML reporter `outputFolder` driven by a `PW_REPORT_DIR` environment variable (so each matrix cell writes to its own report folder), and adding a `metadata` block recording student ID/feature/browser for the raw run data.
> 2. A new `scripts/run-matrix.js` — a Node.js runner that iterates every feature x browser cell sequentially (explaining why sequential, not parallel, given shared EShop backend state), invokes `npx playwright test --project=<browser> --grep <pattern>` per cell, and — since the HTML reporter has no title option — directly stamps each generated `index.html`'s `<title>` tag and injects a fixed banner div reading "Run by: 21127498 | <Feature> | <Browser>" plus an ISO timestamp. It writes a JSON run manifest to `docs/run-manifest.json` and exits non-zero if any cell did not pass. The assistant verified the script's syntax and unit-tested the HTML-stamping logic in isolation before delivering it.
>
> The assistant also flagged three pre-existing issues found while inspecting the zip, unrelated to the requested config/runner but blocking a full 9-cell run: `tests/cart.spec.ts` contains only a `CartPage` page-object class with no actual `test()` calls; there is no spec file yet for FR-12 (Access Control); and `test-data/register.csv` has only 11 data rows versus the 12 test cases documented in `test_case_FR01.md`. It stated explicitly that the runner would not fabricate placeholder tests to hide these gaps, and would instead honestly report a "blocked_no_tests" status for any cell without real tests.]

---

## Interaction 15

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> Do mình mới làm xong 1 ô à, bạn hãy chỉnh lại cho còn 3 ô (1 chức năng x 3 browser) đi

- **The AI output:**

> The assistant edited `scripts/run-matrix.js` so the `FEATURES` array contains only the one feature with a real, working spec (FR-01 Register), commenting out — rather than deleting — the `cart` and `access-control` entries, with an inline comment explaining that they should be uncommented once real spec files exist for those features. It re-verified the script's syntax and confirmed the matrix now runs 1 feature × 3 browsers = 3 cells instead of 9, while leaving all other runner logic (report stamping, manifest writing, exit code) unchanged. It reminded the student that before final submission the assignment requires the full 9-cell matrix (at least 9 browser runs across all 3 features), so the commented-out entries need to be restored once FR-07 and FR-12 have real specs.

---

## Interaction 16

- **Name of the AI tool:** Claude (Claude.ai, Claude Sonnet 5)
- **Date and time:** 2026-08-10 (exact time not available — see note above)
- **Your prompt:**

> [Uploaded file: `AI-Audit-Report.md`, the report produced in Interaction 10]
> Cập nhật file này, thêm những thông tin trong cuộc trò chuyện vào file này.

- **The AI output:**

> [The assistant read the uploaded report, confirmed it already covered Interactions 1–9, and appended Interactions 10–16 (documenting the interactions that occurred after the report was first generated) in the same format, producing this updated `AI-Audit-Report.md`.]

---

*End of AI Audit Report.*
