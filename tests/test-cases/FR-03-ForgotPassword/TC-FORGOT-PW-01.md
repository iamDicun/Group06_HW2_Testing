# TC-FORGOT-PW-01: Full success flow – valid email + valid OTP + valid password + match (Pairwise)

## Requirement ID
FR-03

## Feature
Forgot Password & Reset Password

## Module / Test Type / Technique
Forgot Password / Functional / Pairwise Testing

## Priority
High

## Preconditions
- A valid user account exists with email `test@eshop.com`
- User is on the Forgot Password page (`/forgot-password`) at http://localhost:5173
- The account is not locked

## Test Data
| Parameter | Value |
|-----------|-------|
| Email (B1) | Valid (`test@eshop.com`) |
| Mã OTP (B2) | Valid (4-digit token from Step 1 API) |
| Mật khẩu mới (B2) | Valid (`Test123 4`) |
| Xác nhận MK (B2) | Match (N/A — field missing) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `test@eshop.com` into the email input
3. Click the "Lấy mã OTP" button
4. Observe the green message box showing "Mã OTP của bạn là: XXXX"
5. Enter the displayed 4-digit OTP into the "Mã OTP (4 số)" field
6. Enter `Test123 4` into the "Mật khẩu mới" field
7. Click the "Đặt lại mật khẩu" button
8. Observe the alert dialog and redirect

## Expected Result
- **Step 1:** Backend returns a 4-digit token. Frontend displays "Mã OTP của bạn là: XXXX" in a green box. UI transitions to Step 2.
- **Step 2:** Alert "Đổi mật khẩu thành công!" appears. User is redirected to `/login`. The old password no longer works; the new password works for login. The reset token is consumed.

## Actual Result (filled after execution)
- Step 1: Entered `test@eshop.com`, received OTP `4249` displayed in a green box. UI switched to Step 2.
- Step 2: Entered OTP `4249` and `Test123 4`, clicked "Đặt lại mật khẩu". Alert "Đổi mật khẩu thành công!" appeared. Redirected to `/login`.
- Database confirmed password was updated. Old password `Test1234!` returned 401. New password `Test123 4` returned 200 with JWT token.
- Token was consumed (second use returned "Invalid token or email").

## Status
Pass

## Related Bugs
- Bug-010: OTP is 4 digits (1000–9999) instead of the required 6 digits
- Bug-011: Password regex requires a whitespace character, not a special character

## Notes
- Pairwise scenario TC-PW-01 covers the full happy path from Step 1 through Step 2
- Backend: token is single-use (cleared to NULL after successful reset)
- Original password was restored after the test for future use

---
