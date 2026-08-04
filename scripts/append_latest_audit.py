import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

prompt_log_path = r"e:\Users\Admin\Documents\GitHub\Group06_HW2_Testing\submission\prompt_log.md"
ai_audit_path = r"e:\Users\Admin\Documents\GitHub\Group06_HW2_Testing\submission\ai_audit.md"

session_timestamp = "2026-08-02 23:15"
agent_name = "Gemini 3.6 Flash (High)"
assignment = "HW03 – GUI & Usability"

session_block = f"""---
## Session | Agent: {agent_name} | Assignment: {assignment} | {session_timestamp} (UTC+7)
---

### Turn 1

**[User]**
TỰ mở browser và vào github issue, chụp 10 cái bug từ #70-#80 rồi lưu vào bug report, sau đó tạo bug-repord.md chứa nội dung của từng bug report và ảnh của cái issue đó trên github

**[Assistant]**
Đã sử dụng browser subagent để tự động điều hướng đến các GitHub issues từ #70 đến #80 trên repository `iamDicun/Group06_HW2_Testing`. Tuy nhiên hệ thống yêu cầu đăng nhập tài khoản GitHub.

---

### Turn 2

**[User]**
vừa login rồi đó, thực hiện lại đi

**[Assistant]**
1. Đã sử dụng Browser Subagent mở thành công trình duyệt, truy cập trực tiếp lần lượt từng GitHub Issue từ #70 đến #80 trên repository `iamDicun/Group06_HW2_Testing`.
2. Đã chụp lại toàn bộ màn hình giao diện thực tế của từng GitHub Issue (#70 đến #80) trên GitHub.
3. Đã lưu và gắn mấu đóng dấu watermark (`nakhoa231@clc.fitus.edu.vn`) cho tất cả các hình ảnh chụp GitHub Issues vào thư mục `submission/reports/images/`.
4. Đã tạo hoàn chỉnh các file báo cáo `bug-repord.md` chứa đầy đủ bảng tổng quan, nội dung chi tiết từng bug report (Title, ID, Environment, Steps to reproduce, Expected, Actual, Evidence) và hình ảnh chụp trực tiếp GitHub Issue đó trên GitHub.
"""

with open(prompt_log_path, "a", encoding="utf-8") as f:
    f.write("\n" + session_block)

print("Updated prompt_log.md successfully!")

audit_rows = [
    f"| 13 | {agent_name} | {session_timestamp} | {assignment} | TỰ mở browser và vào github issue, chụp 10 cái bug từ #70-#80 rồi lưu vào bug report, sau đó tạo bug-repord.md... | Launched browser subagent to navigate to GitHub issues #70-#80; detected authentication requirement. | ___ | |",
    f"| 14 | {agent_name} | {session_timestamp} | {assignment} | vừa login rồi đó, thực hiện lại đi | Visited GitHub issues #70-#80 in browser, captured issue screenshots, watermarked images, and created bug-repord.md. | ___ | |"
]

with open(ai_audit_path, "a", encoding="utf-8") as f:
    for row in audit_rows:
        f.write(row + "\n")

print("Updated ai_audit.md successfully!")
