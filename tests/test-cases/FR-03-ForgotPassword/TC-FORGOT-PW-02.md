# TC-FORGOT-PW-02: Valid email + invalid OTP + invalid password + mismatch (Pairwise)

## Requirement ID
FR-03

## Feature
Forgot Password & Reset Password

## Module / Test Type / Technique
Forgot Password / Functional / Pairwise Testing

## Priority
Medium

## Preconditions
- A valid user account exists with email `test@eshop.com`
- User has completed Step 1 (requested OTP) and is on Step 2 of the Forgot Password page

## Test Data
| Parameter | Value |
|-----------|-------|
| Email (B1) | Valid (`test@eshop.com`) |
| Mã OTP (B2) | Invalid (`0000` — does not match actual token) |
| Mật khẩu mới (B2) | Invalid (`weak`) |
| Xác nhận MK (B2) | Mismatch (N/A — field missing) |

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green box (the real token)
3. Enter `0000` (wrong OTP) into the "Mã OTP (4 số)" field
4. Enter `weak` (invalid format) into the "Mật khẩu mới" field
5. Click the "Đặt lại mật khẩu" button
6. Observe the system's response

## Expected Result
- The client-side password validation fires first (before any API call). Since `weak` fails the complexity check, an alert appears: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- The API is not called. The password is not updated.
- The user remains on Step 2.

## Actual Result (filled after execution)
- Entered `0000` (wrong OTP) and `weak` (invalid password), clicked "Đặt lại mật khẩu". An alert dialog appeared: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."
- No API call was made to `/api/reset-password`. The page remained on Step 2.

## Status
Pass

## Related Bugs
- Bug-011: Password regex requires a whitespace character (`\s`) instead of a special character, despite the error message saying "KÝ TỰ ĐẶC BIỆT"
- Bug-012: Missing "Xác nhận mật khẩu mới" (Confirm new password) field on Step 2

## Notes
- Pairwise scenario TC-PW-02 validates the interaction of invalid OTP + invalid password
- Client-side password format validation at `ForgotPassword.jsx:26` takes precedence and blocks the API call before any OTP validation occurs
- Since the confirm password field does not exist (Bug-012), the mismatch aspect cannot be tested
- The system only validates one error at a time (password format) and never reaches the OTP validation

---
