# TC-FORGOT-DT-04: Reset password – OTP valid, password invalid + no confirm match (Decision Table R4)

## Requirement ID
FR-03

## Feature
Forgot Password & Reset Password

## Module / Test Type / Technique
Forgot Password / Functional / Decision Table Testing

## Priority
Medium

## Preconditions
- A valid user account exists with email `test@eshop.com`
- User has completed Step 1 (requested OTP) and is on Step 2 of the Forgot Password page

## Test Data
| Field | Value |
|-------|-------|
| Email | test@eshop.com |
| OTP / Reset Token | (obtained from Step 1) |
| New Password | weak (invalid format: too short, no uppercase, no digit, no whitespace) |
| Confirm Password | WEAK123 (does not match but would also fail format check) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green message box
3. Enter the OTP into the "Mã OTP (4 số)" field
4. Enter `weak` into the "Mật khẩu mới" field
5. Observe whether a confirm password field exists
6. If it exists, enter a non-matching value
7. Click the "Đặt lại mật khẩu" button
8. Observe the system's response

## Expected Result
- The frontend client-side validation fires on the password format first. Since `weak` fails the complexity check, an alert is shown: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- The API is not called on the client-side. The password is not updated.
- If both password format and confirm-mismatch were checked, the format error should take precedence.

## Actual Result (filled after execution)
- The Step 2 form does not include a confirm password field, so the mismatch condition cannot be triggered.
- Entered `weak` into the "Mật khẩu mới" field and clicked "Đặt lại mật khẩu". An alert dialog appeared: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- The page remained on Step 2. No API call was made. The password in the database was unchanged.
- Since the confirm password field is missing from the UI, the mismatch aspect of this test (R4) cannot be fully verified.

## Status
Fail

## Related Bugs
- Bug-011: Password regex requires a whitespace character (`\s`) instead of a special character, despite the error message saying "KÝ TỰ ĐẶC BIỆT"
- Bug-012: Missing "Xác nhận mật khẩu mới" (Confirm new password) field on Step 2

## Notes
- This test maps to Decision Table R4 where both C2 (password valid) = N and C3 (confirm match) = N
- Since the confirm password field does not exist in the actual UI, the test's mismatch aspect is blocked by Bug-012
- The password format validation (`ForgotPassword.jsx:26`) correctly blocks invalid passwords before any API call

---
