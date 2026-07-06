# TC-FORGOT-07: Valid email + invalid OTP + invalid password (Pairwise)

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
| Email | Valid (`test@eshop.com`) |
| Mã OTP | Invalid (`0000` — does not match actual token) |
| Mật khẩu mới | Invalid (`weak`) |

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
- Entered `0000` (wrong OTP) and `weak` (invalid password), clicked "Đặt lại mật khẩu". An alert dialog appeared: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." No API call. Page remained on Step 2.

## Status
Passed

## Related Bugs
- None

## Notes
- Client-side password validation correctly blocks the request before API call.
