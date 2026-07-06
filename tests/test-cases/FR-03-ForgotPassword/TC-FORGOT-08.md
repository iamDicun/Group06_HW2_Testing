# TC-FORGOT-08: Invalid email + valid OTP + invalid password (Pairwise)

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

## Test Data
| Parameter | Value |
|-----------|-------|
| Email | Invalid (`nonexistent@test.com`) |
| Mã OTP | Valid (any 4-digit token) |
| Mật khẩu mới | Invalid (`weak`) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `nonexistent@test.com` into the email input
3. Click the "Lấy mã OTP" button
4. Observe the system's response

## Expected Result
- Step 1: The system must validate that the email exists in the database. Since `nonexistent@test.com` is not registered, the backend returns a 404 error. The frontend displays an alert: "Lỗi: User not found".
- The user remains on Step 1. There is no Step 2 to reach.

## Actual Result (filled after execution)
- Entered `nonexistent@test.com`, clicked "Lấy mã OTP". An alert appeared: "Lỗi: User not found". The page remained on Step 1 (email input form). The user could not proceed to Step 2. Backend returned HTTP 404 with `{"error":"User not found"}`.

## Status
Passed

## Related Bugs
- The error message "User not found" is displayed in English, inconsistent with the Vietnamese-language UI

## Notes
- Invalid email handling works correctly but error message is in English.
