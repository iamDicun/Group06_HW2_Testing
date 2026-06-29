# TC-FORGOT-DT-05: Reset password with invalid OTP – OTP invalid (Decision Table R5 collapsed R5–R8)

## Requirement ID
FR-03

## Feature
Forgot Password & Reset Password

## Module / Test Type / Technique
Forgot Password / Functional / Decision Table Testing

## Priority
High

## Preconditions
- A valid user account exists with email `test@eshop.com`
- User has completed Step 1 (requested OTP) and is on Step 2 of the Forgot Password page

## Test Data
| Field | Value |
|-------|-------|
| Email | test@eshop.com |
| OTP / Reset Token | 0000 (invalid — does not match the real token) |
| New Password | Test123 4 (valid format) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Enter an incorrect OTP (e.g., `0000`) into the "Mã OTP (4 số)" field — do NOT use the displayed OTP
3. Enter `Test123 4` into the "Mật khẩu mới" field
4. Click the "Đặt lại mật khẩu" button
5. Observe the system's response

## Expected Result
- The system must reject the request regardless of the password fields.
- An alert dialog appears: "Mã OTP không đúng hoặc có lỗi xảy ra."
- The password in the database must NOT be updated.
- The user remains on Step 2 to correct the OTP.

## Actual Result (filled after execution)
- Completed Step 1 (OTP was displayed). Entered `0000` (wrong OTP) and `Test123 4` (valid password), clicked "Đặt lại mật khẩu". An alert dialog appeared: "Mã OTP không đúng hoặc có lỗi xảy ra."
- The page remained on Step 2. The password in the database was unchanged.
- The backend returned HTTP 400 with `{"error":"Invalid token or email"}` for the corresponding API call.

## Status
Pass

## Related Bugs
None

## Notes
- Backend: `POST /api/reset-password` checks `WHERE email = ? AND reset_token = ?`. If no rows match (this.changes === 0), it returns 400 with "Invalid token or email"
- The frontend (`ForgotPassword.jsx:37`) catches all reset errors generically: `alert("Mã OTP không đúng hoặc có lỗi xảy ra.")`
- The error message does not distinguish between "OTP wrong" and "email/token mismatch", which is a minor UX issue but functionally acceptable
- The backend does NOT validate password format — it accepts any string. All password validation is client-side only
- Same behaviour applies if the email is changed between Step 1 and Step 2 (wrong email + valid token → same error)

---
