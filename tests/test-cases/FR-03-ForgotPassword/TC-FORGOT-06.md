# TC-FORGOT-06: Full success flow – valid email + valid OTP + valid password (Pairwise)

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
| Email | Valid (`test@eshop.com`) |
| Mã OTP | Valid (4-digit token from Step 1 API) |
| Mật khẩu mới | Valid (`Test123 4`) |

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
- Step 1: Backend returns a 4-digit token. Frontend displays "Mã OTP của bạn là: XXXX" in a green box. UI transitions to Step 2.
- Step 2: Alert "Đổi mật khẩu thành công!" appears. User is redirected to `/login`. The old password no longer works; the new password works for login. The reset token is consumed.

## Actual Result (filled after execution)
- Step 1: Entered `test@eshop.com`, received OTP `4249` displayed in a green box. UI switched to Step 2.
- Step 2: Entered OTP `4249` and `Test123 4`, clicked "Đặt lại mật khẩu". Alert: "Đổi mật khẩu thành công!". Redirected to `/login`. Old password no longer worked; new password worked.

## Status
Failed

## Related Bugs
- OTP is 4 digits instead of required 6 digits

## Notes
- Full success flow works functionally but OTP length violates FR-03 specification (should be 6 digits).
