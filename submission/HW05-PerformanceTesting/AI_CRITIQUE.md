# AI Critique

**Student:** 23127459 - Huỳnh Vương Thụy Quân

---

## 1. Where did the AI get something wrong, biased, or incomplete?

Trong quá trình tạo các file JMeter JMX, AI đã mắc phải **3 lỗi thực tế** cần fix:

**Lỗi 1: URL Protocol Duplication (Load + Spike Test)**
AI đã tạo URL bị lỗi trùng protocol: `http://http://localhost:3000/api/products`. Nguyên nhân là do cấu hình `HTTPSampler.domain` đã chứa `http://` prefix, sau đó lại cộng thêm `http://` ở `HTTPSampler.protocol`. Kết quả là JMeter sẽ request sai URL và fail toàn bộ test.

**Lỗi 2: Cross-thread Auth Token Scoping (Spike Test)**
AI đã đặt thread group Setup (login lấy token) và thread group chính (cart + checkout) trong cùng một scope, nhưng không xử lý đúng việc share `auth_token` variable giữa các thread groups. Trong JMeter, variables được extract trong một thread group không tự động share sang thread group khác nếu không dùng `shareMode` hoặc `${__threadGroup}` properly.

**Lỗi 3: Thiếu Response Timeout**
Các HTTP Request trong JMX không có `HTTPSampler.responseTimeout` set. Khi server bị chậm hoặc deadlock (đặc biệt với SQLite concurrent writes), thread sẽ bị kẹt vô hạn, không release resources.

**Lỗi 4: Thiếu request verify lockout (Stress Test)**
AI ban đầu chỉ tạo test cases cho login thất bại, nhưng không có request thứ 4 để verify rằng account đã bị lockout thực sự (expect 403 response khi login đúng password sau 3 lần sai).

---

## 2. Why did it fail to catch the issue?

AI thất bại trong việc phát hiện các lỗi trên vì **chỉ thực hiện Static Analysis** - đọc và sinh code dựa trên pattern matching, không có **Dynamic Verification**:

- **Không chạy dry-run trên JMeter:** AI tạo XML output nhưng không validate bằng `jmeter -n -t test.jmx -l /dev/null` để kiểm tra syntax errors hay runtime exceptions.

- **Không test XML well-formedness:** Các file JMX là XML, AI không dùng XML parser để verify cấu trúc thẻ, dẫn đến việc lệch tags hay attribute sai mà không biết.

- **Không có feedback loop:** Sau khi tạo code, AI không có cơ chế tự review lại output bằng cách parse lại file XML đã tạo, kiểm tra từng attribute có match với expected values không.

- **Không hiểu runtime context:** AI không biết rằng trong JMeter, `auth_token` extract trong Thread Group A sẽ không available trong Thread Group B unless using `shareMode=allThreads` trong CSV Data Source hoặc dùng `__property` functions.

---

## 3. What principle have you learned about collaborating with AI during this assignment?

Bài học lớn nhất là nguyên tắc **"Trust but Verify"** khi làm việc cùng AI:

**1. Không bao giờ chạy blind**
Mỗi file JMX AI tạo ra cần được validate bằng:
```bash
# Validate XML syntax
xmllint --noout 23127459_Load_20260816.jmx

# Dry-run test
jmeter -n -t 23127459_Load_20260816.jmx -l /dev/null
```

**2. Debug bằng log thực tế**
Khi test fail, phải đọc `.jtl` log files và `jmeter.log` để hiểu root cause, không chỉ nhìn vào kết quả pass/fail. Ví dụ: lỗi URL duplication chỉ hiện ra khi xem error message trong log: `"java.net.MalformedURLException: no protocol"`.

**3. AI là tool, não là controller**
AI giúp generate code nhanh, nhưng responsibility vẫn thuộc về người dùng. Phải luôn:
- Review code output trước khi dùng
- Test trong môi trường thật (staging) trước khi production
- Hiểu rõ ý nghĩa của từng configuration parameter

**4. Iterative refinement**
Lần đầu AI tạo code thường có bugs. Cần có quy trình: Generate → Test → Debug → Fix → Verify, thay vì tin rằng output lần đầu đã hoàn hảo.

