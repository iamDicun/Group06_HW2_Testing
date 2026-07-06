# TC-FORGOT-02: Reset password – OTP valid, password no confirm field (Decision Table R2)

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

## Test Steps
1. Complete Step 1 by entering `test@eshop.com` and clicking "Lấy mã OTP"
2. Note the OTP displayed in the green message box
3. Enter the OTP into the "Mã OTP (4 số)" field
4. Enter `Test123 4` into the "Mật khẩu mới" field
5. Observe whether a "Xác nhận mật khẩu" (confirm password) field exists on the Step 2 form
6. Click the "Đặt lại mật khẩu" button
7. Observe the system's response

## Expected Result
- The Step 2 form SHOULD include a "Xác nhận mật khẩu mới" (Confirm new password) field per the requirements specification.
- When the confirm password does not match the new password, the system must display an inline validation error: "Xác nhận mật khẩu không trùng khớp".
- The password must NOT be updated in the database.
- The user must remain on Step 2 to correct the input.

## Actual Result (filled after execution)
- The Step 2 form does NOT include a "Xác nhận mật khẩu" field. The actual UI only has two inputs: "Mã OTP (4 số)" and "Mật khẩu mới", plus the "Đặt lại mật khẩu" button.
- Since there is no confirm field, the password was updated successfully without any mismatch check.
- **BUG:** Missing confirm password field prevents mismatch validation.

## Status
Failed

## Related Bugs
- Missing confirm password field on Step 2 form

## Notes
- The confirm password field is absent from the Step 2 UI. The requirements specify a confirm password field for security.
