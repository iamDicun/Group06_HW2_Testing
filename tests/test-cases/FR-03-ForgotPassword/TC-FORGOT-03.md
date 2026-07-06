# TC-FORGOT-03: Reset password – OTP valid, password invalid format (Decision Table R3)

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
| New Password | weak (does not meet complexity requirements) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green message box
3. Enter the OTP into the "Mã OTP (4 số)" field
4. Enter `weak` into the "Mật khẩu mới" field (too short, no uppercase, no digit, no whitespace)
5. Click the "Đặt lại mật khẩu" button
6. Observe the system's response

## Expected Result
- The frontend must validate the password client-side before calling the API.
- An alert message must appear: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- The password must NOT be updated in the database.
- The user must remain on Step 2.
- The API must NOT be called.

## Actual Result (filled after execution)
- Entered OTP and `weak` as the new password, clicked "Đặt lại mật khẩu". An alert dialog appeared with the message: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." The page remained on Step 2. No API call was made. Password unchanged.

## Status
Passed

## Related Bugs
- None

## Notes
- Client-side password validation works correctly.
