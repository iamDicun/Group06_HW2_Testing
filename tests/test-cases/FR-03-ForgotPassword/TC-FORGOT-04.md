# TC-FORGOT-04: Reset password – OTP valid, password invalid + no confirm (Decision Table R4)

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
| New Password | weak (invalid format) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green message box
3. Enter the OTP into the "Mã OTP (4 số)" field
4. Enter `weak` into the "Mật khẩu mới" field
5. Observe whether a confirm password field exists
6. Click the "Đặt lại mật khẩu" button
7. Observe the system's response

## Expected Result
- The frontend client-side validation fires on the password format first. Since `weak` fails the complexity check, an alert is shown: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- The API is not called. The password is not updated.
- If both password format and confirm-mismatch were checked, the format error should take precedence.

## Actual Result (filled after execution)
- The Step 2 form does not include a confirm password field, so the mismatch condition cannot be tested. Entered `weak` (invalid format), clicked "Đặt lại mật khẩu". Alert appeared: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." No API call. Page remained on Step 2.

## Status
Passed

## Related Bugs
- Missing confirm password field (cannot verify mismatch behavior)

## Notes
- Client-side password validation works. Confirm field missing from UI.
