# TC-FORGOT-09: Invalid email + invalid OTP + valid password (Pairwise)

## Requirement ID
FR-03

## Feature
Forgot Password & Reset Password

## Module / Test Type / Technique
Forgot Password / Functional / Pairwise Testing

## Priority
Medium

## Preconditions
- An unregistered email address exists: `nonexistent@test.com`
- A valid user account exists with email `test@eshop.com`

## Test Data
| Parameter | Value |
|-----------|-------|
| Email | Invalid (`nonexistent@test.com`) |
| Mã OTP | Invalid (`0000`) |
| Mật khẩu mới | Valid (`Test123 4`) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `nonexistent@test.com` into the email input
3. Click the "Lấy mã OTP" button
4. Observe the system's response

## Expected Result
- Step 1: Since `nonexistent@test.com` is not registered, the backend returns 404. The frontend displays an alert: "Lỗi: User not found".
- The user remains on Step 1. Step 2 is never reached. The OTP, password, and confirm fields are never shown.

## Actual Result (filled after execution)
- Entered `nonexistent@test.com`, clicked "Lấy mã OTP". An alert appeared: "Lỗi: User not found". The page remained on Step 1 with only the email input form visible. Backend returned HTTP 404 with `{"error":"User not found"}`. The OTP and password fields on Step 2 were never rendered.

## Status
Passed

## Related Bugs
- The error message "User not found" is displayed in English, inconsistent with the Vietnamese-language UI

## Notes
- Invalid email handling works correctly. Error message language inconsistency persists.
