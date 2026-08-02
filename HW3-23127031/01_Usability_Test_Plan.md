# Task 2 — Kế hoạch Đánh giá Khả năng Sử dụng (Usability Evaluation Plan)

> **Sản phẩm / Flow được chọn (từ §5, Task 1):** `[Điền tên sản phẩm/app]` — luồng end-to-end: **Đăng ký tài khoản → Đăng nhập → Tìm kiếm sản phẩm → Xem chi tiết sản phẩm → Thêm vào giỏ hàng → Kiểm tra giỏ hàng**.

---

## Phase 1 — Plan & Prepare

### 1.1 Mục tiêu đánh giá (Objectives)

| # | Mục tiêu | Vì sao quan trọng |
|---|----------|---------------------|
| O1 | Xác định điểm nghẽn ở bước **Đăng ký** (form validation, yêu cầu mật khẩu, xác thực OTP/email...) | Đây là bước đầu tiên — nếu vướng ở đây, người dùng bỏ cuộc trước khi chạm vào giá trị cốt lõi của app |
| O2 | Xác định điểm nghẽn ở bước **Đăng nhập** (quên mật khẩu, nhớ tài khoản, thông báo lỗi sai mật khẩu...) | Đăng nhập lặp lại thường xuyên — friction nhỏ cũng gây khó chịu tích lũy |
| O3 | Đánh giá khả năng người dùng **tìm kiếm** đúng sản phẩm mong muốn (dùng từ khóa, bộ lọc, gợi ý tìm kiếm) | Search là điểm vào chính của hành trình mua hàng |
| O4 | Đánh giá mức độ rõ ràng của **trang chi tiết sản phẩm** (đủ thông tin để ra quyết định thêm vào giỏ chưa) | Thiếu thông tin ở đây khiến người dùng do dự hoặc rời trang |
| O5 | Đo mức độ dễ dàng khi **thêm vào giỏ hàng** và **kiểm tra giỏ hàng** (số lượng, giá, xóa/sửa sản phẩm) | Đây là bước cuối trước khi chuyển sang thanh toán — lỗi ở đây trực tiếp ảnh hưởng chuyển đổi (conversion) |
| O6 | Đo mức độ tự tin của người dùng khi hoàn tất toàn bộ luồng (self-reported confidence) | Tự tin thấp dù hoàn thành task vẫn là rủi ro UX |
| O7 | Đo điểm SUS tổng thể làm baseline để so sánh về sau | Cần một con số định lượng, có thể lặp lại đo |

**Câu hỏi nghiên cứu (research questions):**
- Người dùng có gặp khó khăn gì với yêu cầu định dạng của form đăng ký (mật khẩu, email, số điện thoại) không?
- Sau khi đăng ký, người dùng có tự tìm được đường quay lại đăng nhập không, hay bị lạc?
- Người dùng dùng từ khóa tìm kiếm như thế nào — có khớp với cách hệ thống index sản phẩm không?
- Trang chi tiết sản phẩm có đủ thông tin (giá, size, tồn kho...) để người dùng quyết định thêm vào giỏ mà không cần quay lại danh sách không?
- Khi vào giỏ hàng, người dùng có hiểu rõ tổng tiền, cách chỉnh số lượng, cách xóa sản phẩm không?

---

### 1.2 Kịch bản nhiệm vụ (Task Scenario)

**Nguyên tắc:** cho participant một *mục tiêu*, KHÔNG cho các bước thực hiện.

> **Kịch bản đọc cho participant:**
> "Bạn vừa biết đến app `[Tên sản phẩm]` qua bạn bè giới thiệu và muốn dùng thử. Hãy **tạo một tài khoản mới**, sau đó **đăng nhập** bằng tài khoản vừa tạo. Khi đã vào app, hãy **tìm một sản phẩm** mà bạn thực sự quan tâm (ví dụ: `[loại sản phẩm phù hợp với app, VD: một đôi giày, một cuốn sách...]`), **xem chi tiết** sản phẩm đó để chắc chắn nó phù hợp, rồi **thêm vào giỏ hàng**. Cuối cùng, hãy **vào giỏ hàng để kiểm tra lại** đơn hàng của mình trước khi dừng lại (không cần thanh toán thật)."

Chia nhỏ theo 6 bước con để dễ quan sát & ghi nhận friction riêng từng bước:

| Bước | Task con | Success criteria |
|---|---|---|
| 1 | Đăng ký tài khoản | Tạo được tài khoản mới thành công, không bị kẹt ở bước xác thực |
| 2 | Đăng nhập | Đăng nhập thành công bằng tài khoản vừa tạo, không cần thử sai quá 1 lần |
| 3 | Tìm kiếm sản phẩm | Tìm ra sản phẩm mong muốn trong danh sách kết quả (không cần đúng 1 sản phẩm cụ thể — đúng ý định là đạt) |
| 4 | Xem chi tiết sản phẩm | Mở được trang chi tiết, đọc được các thông tin cần thiết (giá, mô tả, size/tuỳ chọn...) |
| 5 | Thêm vào giỏ hàng | Thêm sản phẩm vào giỏ thành công, có xác nhận rõ ràng (thông báo/badge số lượng...) |
| 6 | Kiểm tra giỏ hàng | Vào được trang giỏ hàng, đọc đúng được tổng số lượng & tổng tiền hiển thị |

Tiêu chí hoàn thành **toàn bộ task**:
- ✅ **Hoàn thành (Success):** Hoàn tất cả 6 bước không cần trợ giúp, tự xác nhận đúng thông tin giỏ hàng ở bước cuối
- ⚠️ **Hoàn thành có trợ giúp (Success with assist):** Hoàn thành nhưng cần gợi ý từ facilitator ở ít nhất 1 bước (ghi rõ bước nào)
- ❌ **Không hoàn thành (Fail):** Bỏ cuộc / không thể qua được 1 trong 6 bước trên (ghi rõ bước nào là điểm dừng)

---

### 1.3 Công cụ đo lường (Instruments)

**Thang đo chính:** System Usability Scale (SUS) — 10 câu, thang Likert 1–5, chấm điểm 0–100.
*(Xem file `02_Recruitment_and_Session_Notes.xlsx`, sheet "SUS Scoring" để có bản dịch tiếng Việt + công thức tự tính điểm.)*

**Lý do chọn SUS thay vì UEQ-S:** `[VD: SUS là thang chuẩn hóa, dễ so sánh với benchmark ngành (điểm trung bình ~68), phù hợp với cỡ mẫu nhỏ n=7, và đo được usability tổng quát của một luồng end-to-end thay vì trải nghiệm cảm xúc (UEQ-S thiên về hedonic quality).]`

**Câu hỏi mở (Open-ended probe questions)** — hỏi sau khi participant làm xong thang SUS:

| Chủ đề | Câu hỏi |
|---|---|
| **Clarity (Rõ ràng)** | Bước nào trong quá trình bạn thấy khó hiểu nhất? Vì sao? |
| | Có lúc nào bạn không chắc mình đang ở đâu trong quy trình không? |
| **Error recovery (Phục hồi lỗi)** | Bạn có gặp lỗi/thông báo lỗi nào không? Khi đó bạn đã làm gì? |
| | Thông báo lỗi (nếu có) có giúp bạn biết cách sửa không? |
| **Speed (Tốc độ)** | Bạn cảm thấy quá trình này nhanh hay chậm so với kỳ vọng? |
| | Có bước nào bạn thấy thừa/mất thời gian không cần thiết không? |
| **Trust (Tin tưởng)** | Bạn có tin tưởng thông tin hiển thị (giá, mã giảm giá, trạng thái đơn hàng) không? |
| | Có điều gì khiến bạn lo ngại/nghi ngờ trong lúc thao tác không? |

---

### 1.4 Tiêu chí tuyển participant (Recruitment criteria)

- **Đối tượng mục tiêu:** `[Điền persona, VD: người 20–35 tuổi, đã từng mua sắm online, không thuộc ngành IT/QA]`
- **Số lượng:** 7 người, ngoài lớp học (không phải sinh viên HW03).
- **Ưu tiên:** người không làm IT/tester để feedback chân thực hơn.
- **Thông tin liên hệ xác thực:** Zalo/email/SĐT, che 4 số giữa (VD: `090•••1234` → `0901****234` tùy định dạng, xem bảng theo dõi ở file Excel).
- **Cách tuyển:** `[VD: nhờ bạn bè/người quen giới thiệu, đăng trong group cộng đồng, v.v.]`
- **Thông tin bổ sung cần thu thập cho mỗi participant** (giúp phân tích chéo pattern theo nhóm sau này): **tuổi, nghề nghiệp, thiết bị sử dụng khi test** (điện thoại/laptop/tablet, hệ điều hành), **trình duyệt/app** (Chrome, Safari, app native...).

➡️ Danh sách chi tiết + trạng thái liên hệ + thông tin nhân khẩu học/thiết bị: xem `02_Recruitment_and_Session_Notes.xlsx`, sheet "Recruitment".

---

### 1.5 Pilot session

- Chạy **1 buổi pilot** với 1 người (không tính vào 7 người chính thức, hoặc có thể tính nếu không phát hiện vấn đề gì — quyết định trước và ghi rõ).
- Mục đích: phát hiện kịch bản mơ hồ, luồng bị hỏng (broken flow), thời lượng buổi test có hợp lý không.
- Sau pilot: ghi lại các điều chỉnh đã thực hiện vào bảng dưới đây.

| Vấn đề phát hiện ở pilot | Điều chỉnh đã thực hiện |
|---|---|
| `[VD: Participant không hiểu "mã giảm giá" nghĩa là gì]` | `[VD: Đổi câu kịch bản, thêm ví dụ cụ thể]` |
| `[...]` | `[...]` |

---

## Phase 2 — Quy trình chạy buổi test (Session Protocol)

1. **Set the stage** (2 phút): Giải thích đang test *sản phẩm*, không test người dùng. Xin phép ghi màn hình/âm thanh. Yêu cầu think-aloud.
2. **Task** (5–15 phút tùy flow): Đưa kịch bản, quan sát trung lập, không gợi ý trừ khi participant bị kẹt hoàn toàn.
3. **SUS scale** (2 phút): Đưa thang đo, để participant tự điền.
4. **Probe questions** (5–10 phút): Hỏi các câu ở mục 1.3, đào sâu vào điểm friction đã quan sát được.
5. **Kết thúc:** Cảm ơn, xác nhận lại thông tin liên hệ để TA có thể verify nếu cần.

**Ghi chú trong lúc quan sát:** dùng sheet "Session Notes" trong file Excel — ghi lại friction point, lỗi, do dự (hesitation), câu nói thể hiện cảm xúc (verbatim quote) theo từng participant.

---

## Checklist chuẩn bị trước khi chạy 7 buổi chính thức

- [ ] Đã hoàn thành pilot và điều chỉnh kịch bản
- [ ] Đã tuyển đủ 7 participant, có thông tin liên hệ đã che số giữa
- [ ] Đã chuẩn bị công cụ ghi màn hình (VD: OBS, Zoom recording, QuickTime)
- [ ] Đã xin consent ghi âm/ghi hình bằng văn bản hoặc lời nói (ghi lại vào tracker)
- [ ] Đã in/chuẩn bị sẵn thang SUS và câu hỏi probe
- [ ] Đã chuẩn bị GitHub repo/Issues page để log bug
