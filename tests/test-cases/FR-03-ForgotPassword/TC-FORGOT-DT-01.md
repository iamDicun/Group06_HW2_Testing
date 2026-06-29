# TC-FORGOT-DT-01: Reset password successfully – OTP valid, password valid (Decision Table R1)

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
- User is on the Forgot Password page (`/forgot-password`) at http://localhost:5173
- The account is not locked

## Test Data
| Field | Value |
|-------|-------|
| Email | test@eshop.com |
| OTP / Reset Token | (obtained from Step 1 API response) |
| New Password | Test123 4 (contains uppercase, lowercase, digit, space, ≥8 chars) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Verify the page title shows "Quên Mật Khẩu"
3. Enter `test@eshop.com` into the email input field
4. Click the "Lấy mã OTP" button
5. Observe the green message box displaying the OTP (4-digit token)
6. Verify the user is now in Step 2 (OTP + password form visible)
7. Enter the displayed 4-digit OTP into the "Mã OTP (4 số)" field
8. Enter `Test123 4` into the "Mật khẩu mới" field
9. Click the "Đặt lại mật khẩu" button
10. Observe the alert dialog and the redirect

## Expected Result
- Step 1: The backend returns a 4-digit reset token (1000–9999). The frontend displays the message "Mã OTP của bạn là: XXXX" in a green box. The UI transitions from the email input form (Step 1) to the OTP + password form (Step 2).
- Step 2: After clicking "Đặt lại mật khẩu", an alert dialog shows "Đổi mật khẩu thành công!". The user is automatically redirected to the Login page (`/login`). The password in the database is updated to the new value. The old password no longer works for login.

## Actual Result (filled after execution)
- Step 1: Entered `test@eshop.com`, clicked "Lấy mã OTP". A green box appeared with the message "Mã OTP của bạn là: 4249". The UI switched from Step 1 (email input) to Step 2 (OTP + password form).
- Step 2: Entered OTP `4249` and new password `Test123 4`, clicked "Đặt lại mật khẩu". An alert dialog showed "Đổi mật khẩu thành công!" and the page redirected to `/login`. The database confirmed the password was updated. Logging in with the old password `Test1234!` returned 401, and with the new password `Test123 4` returned 200 with a valid JWT token. The reset token was consumed (set to NULL in DB after successful reset).

## Status
Pass

## Related Bugs
- Bug-010: OTP is 4 digits (1000–9999) instead of the required 6 digits as specified in requirements
- Bug-011: Password regex requires a whitespace character (\s) instead of a special character as stated in the error message

## Notes
- Backend: `POST /api/forgot-password` returns 4-digit token, stores it as `reset_token` in the `users` table
- Backend: `POST /api/reset-password` accepts `{email, resetToken, newPassword}`, checks `email + reset_token` match, resets password, clears `reset_token`
- Frontend: `ForgotPassword.jsx:17` displays OTP in green box; `:26` validates password with regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/`; `:33` calls reset API and alerts success
- The password `Test123 4` passes the regex (has lowercase, uppercase, digit, space, 9 chars)
- Token is single-use: subsequent calls with the same token return `{"error":"Invalid token or email"}`

---
