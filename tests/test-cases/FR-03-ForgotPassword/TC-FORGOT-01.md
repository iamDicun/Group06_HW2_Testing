# TC-FORGOT-01: Reset password successfully – OTP valid, password valid (Decision Table R1)

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
| New Password | Test123 4 (contains uppercase, lowercase, digit, space, >= 8 chars) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Verify the page title shows "Quên Mật Khẩu"
3. Enter `test@eshop.com` into the email input field
4. Click the "Lấy mã OTP" button
5. Observe the green message box displaying the OTP
6. Verify the user is now in Step 2 (OTP + password form visible)
7. Enter the displayed OTP into the "Mã OTP (4 số)" field
8. Enter `Test123 4` into the "Mật khẩu mới" field
9. Click the "Đặt lại mật khẩu" button
10. Observe the alert dialog and the redirect

## Expected Result
- Step 1: The backend returns a reset token. The frontend displays the message "Mã OTP của bạn là: XXXX" in a green box. The UI transitions from the email input form (Step 1) to the OTP + password form (Step 2).
- Step 2: After clicking "Đặt lại mật khẩu", an alert dialog shows "Đổi mật khẩu thành công!". The user is automatically redirected to the Login page (`/login`). The password in the database is updated.

## Actual Result (filled after execution)
- Step 1: Entered `test@eshop.com`, received OTP `4249` displayed in a green box. UI switched to Step 2 (OTP + password form visible).
- Step 2: Entered OTP `4249` and `Test123 4`, clicked "Đặt lại mật khẩu". Alert appeared: "Đổi mật khẩu thành công!". User was redirected to `/login`. Old password no longer worked; new password worked.

## Status
Failed

## Related Bugs
- OTP is 4 digits instead of required 6 digits (TC-FORGOT-01, TC-FORGOT-05, TC-FORGOT-06)

## Notes
- The backend generates a 4-digit token (1000-9999) using `Math.floor(1000 + Math.random() * 9000)` instead of a 6-digit OTP as specified in FR-03.
