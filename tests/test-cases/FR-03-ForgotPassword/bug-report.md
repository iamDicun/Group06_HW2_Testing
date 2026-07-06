> Đây là template tham khảo để điền nội dung bug. Còn template trên GitHub Issues nằm ở `.github/ISSUE_TEMPLATE/bug-report.md`.

# [BUG][Forgot Password] OTP is 4 digits instead of required 6 digits

## Found by Test Case
TC-FORGOT-DT-01, TC-FORGOT-DT-05, TC-FORGOT-PW-01

## Requirement Related
FR-03

## Severity / Priority
Major / P2

## Environment
- **Browser:** Cốc Cốc
- **OS:** Windows 11
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Test1234!

## Steps to Reproduce
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `test@eshop.com` into the email input
3. Click the "Lấy mã OTP" button
4. Observe the OTP displayed in the green message box
5. Verify the number of digits in the OTP

## Expected Result
The OTP must consist of exactly 6 random digits as specified in the requirements (FR-03: "mã OTP 6 chữ số ngẫu nhiên").

## Actual Result
The backend generates a 4-digit token using `Math.floor(1000 + Math.random() * 9000)`, producing values in the range 1000–9999. The green message box displays "Mã OTP của bạn là: XXXX" where XXXX is only 4 digits. The frontend label also says "Mã OTP (4 số)" confirming the 4-digit implementation.

## Evidence
- Backend code (`server.js:72`): `const resetToken = Math.floor(1000 + Math.random() * 9000).toString();`
- API response: `{"message":"Mã đặt lại mật khẩu đã được tạo","resetToken":"4249"}` (4 digits)
- UI label: "Mã OTP (4 số)"

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Password regex requires whitespace, not special character despite error message

## Found by Test Case
TC-FORGOT-DT-01, TC-FORGOT-DT-03, TC-FORGOT-DT-04, TC-FORGOT-PW-02

## Requirement Related
FR-03, FR-01

## Severity / Priority
Major / P2

## Environment
- **Browser:** Cốc Cốc
- **OS:** Windows 11
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Test1234!

## Steps to Reproduce
1. Navigate to the Forgot Password page and complete Step 1
2. On Step 2, enter a password containing a special character like `Test1234!` (has uppercase, lowercase, digit, special char `!`, 9 chars)
3. Click "Đặt lại mật khẩu"
4. Observe the error message
5. Now enter `Test123 4` (replaces `!` with a space)
6. Click "Đặt lại mật khẩu"

## Expected Result
The password regex should require at least one special character (e.g., `!@#$%^&*`) as stated in the error message "KÝ TỰ ĐẶC BIỆT" (special character). A space should not satisfy the special character requirement.

## Actual Result
The regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/` requires a whitespace character (`\s` like space, tab) instead of a special character. Password `Test1234!` (with `!`) is rejected because `!` is not in `[A-Za-z\d\s]` and there is no space. Password `Test123 4` (with a space) passes. The error message is misleading: it warns about "KÝ TỰ ĐẶC BIỆT" (special characters) but actually requires a whitespace.

## Evidence
- Frontend code (`ForgotPassword.jsx:26`): `const flawedStrongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/;`
- Error message text: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Missing "Xác nhận mật khẩu mới" (Confirm new password) field on Step 2

## Found by Test Case
TC-FORGOT-DT-02, TC-FORGOT-DT-04, TC-FORGOT-PW-02

## Requirement Related
FR-03

## Severity / Priority
Major / P2

## Environment
- **Browser:** Cốc Cốc
- **OS:** Windows 11
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** test@eshop.com / Test1234!

## Steps to Reproduce
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `test@eshop.com` and click "Lấy mã OTP" to proceed to Step 2
3. Observe the form fields displayed on Step 2

## Expected Result
The Step 2 form must include a "Xác nhận mật khẩu mới" (Confirm new password) input field so users must enter the new password twice to prevent typos, as specified in the security requirements.

## Actual Result
The Step 2 form only has two input fields: "Mã OTP (4 số)" and "Mật khẩu mới". There is no confirm password field. Users enter the new password only once, increasing the risk of undetected typos that could lock them out of their account.

## Evidence
- Frontend code (`ForgotPassword.jsx:63-96`): The Step 2 form only renders OTP input and password input, no confirm password field
- The backend API (`POST /api/reset-password`) only accepts `{email, resetToken, newPassword}` — no confirm-password parameter

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: major`
- `priority: p2`
- `status: new`
- `found-by: test-case`

---

# [BUG][Forgot Password] Error message "User not found" displayed in English instead of Vietnamese

## Found by Test Case
TC-FORGOT-PW-03, TC-FORGOT-PW-04

## Requirement Related
FR-03

## Severity / Priority
Minor / P3

## Environment
- **Browser:** Cốc Cốc
- **OS:** Windows 11
- **URL:** http://localhost:5173/forgot-password
- **Version/Commit:** N/A
- **Test Account:** nonexistent@test.com

## Steps to Reproduce
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter an unregistered email (e.g., `nonexistent@test.com`)
3. Click the "Lấy mã OTP" button
4. Observe the alert dialog

## Expected Result
The error message should be displayed in Vietnamese to match the rest of the UI language, e.g., "Lỗi: Email không tồn tại trên hệ thống."

## Actual Result
An alert dialog appears showing "Lỗi: User not found" — the backend error string is forwarded directly in English without localization. The rest of the UI uses Vietnamese (e.g., "Quên Mật Khẩu", "Lấy mã OTP", "Đặt lại mật khẩu").

## Evidence
- API response: `{"error":"User not found"}` (HTTP 404)
- Frontend code (`ForgotPassword.jsx:20`): `alert("Lỗi: " + (err.response?.data?.error || err.message))` — passes the raw English error string to the user
- Backend code (`server.js:71`): `return res.status(404).json({ error: "User not found" });`

## Labels
- `type: bug`
- `module: forgot-password`
- `severity: minor`
- `priority: p3`
- `status: new`
- `found-by: test-case`
