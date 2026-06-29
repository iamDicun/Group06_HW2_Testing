# TC-FORGOT-DT-02: Reset password with confirm password mismatch – OTP valid, password mismatch (Decision Table R2)

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
| OTP / Reset Token | (obtained from Step 1) |
| New Password | Test123 4 |
| Confirm Password | Test123 5 (does not match) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green message box
3. Enter the OTP into the "Mã OTP (4 số)" field
4. Enter `Test123 4` into the "Mật khẩu mới" field
5. Observe whether a "Xác nhận mật khẩu" (confirm password) field exists on the Step 2 form
6. If the field exists, enter a non-matching password into it and submit
7. Observe the system's response

## Expected Result
- The Step 2 form SHOULD include a "Xác nhận mật khẩu mới" (Confirm new password) field per the requirements specification.
- When the confirm password does not match the new password, the system must display an inline validation error: "Xác nhận mật khẩu không trùng khớp" (Password confirmation does not match).
- The password must NOT be updated in the database.
- The user must remain on Step 2 to correct the input.

## Actual Result (filled after execution)
- The Step 2 form does NOT include a "Xác nhận mật khẩu" (confirm password) field. The actual UI only has two input fields: "Mã OTP (4 số)" and "Mật khẩu mới". There is no confirm password field to test mismatch against. The feature requirement for password confirmation is not implemented in the frontend.

## Status
Fail

## Related Bugs
- Bug-012: Missing "Xác nhận mật khẩu mới" (Confirm new password) field on Step 2 of Forgot Password

## Notes
- The skill document (Decision Table R2) describes this scenario with the confirm password condition, but the actual frontend (`ForgotPassword.jsx`) does not implement a confirm password field
- This is a missing feature: the password reset flow lacks double-entry confirmation, increasing the risk of user typos
- Backend: `POST /api/reset-password` only receives `email, resetToken, newPassword` — there is no confirm-password validation on the server side either
- The password regex requires at least one whitespace character (\s) and does not allow special characters like `!@#`, despite the error message saying "KÝ TỰ ĐẶC BIỆT" (Bug-011)

---
