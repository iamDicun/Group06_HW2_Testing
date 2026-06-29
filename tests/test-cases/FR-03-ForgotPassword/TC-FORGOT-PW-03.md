# TC-FORGOT-PW-03: Invalid email + valid OTP + invalid password + match (Pairwise)

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
- An unregistered email address exists: `nonexistent@test.com`

## Test Data
| Parameter | Value |
|-----------|-------|
| Email (B1) | Invalid (`nonexistent@test.com`) |
| Mã OTP (B2) | Valid (any 4-digit token) |
| Mật khẩu mới (B2) | Invalid (`weak`) |
| Xác nhận MK (B2) | Match (N/A — field missing) |

## Test Steps
1. Navigate to the Forgot Password page at http://localhost:5173/forgot-password
2. Enter `nonexistent@test.com` into the email input
3. Click the "Lấy mã OTP" button
4. Observe the system's response

## Expected Result
- Step 1: The system must validate that the email exists in the database. Since `nonexistent@test.com` is not registered, the backend returns a 404 error. The frontend displays an alert: "Lỗi: User not found" (or the appropriate Vietnamese translation).
- The user remains on Step 1. There is no Step 2 to reach.

## Actual Result (filled after execution)
- Entered `nonexistent@test.com`, clicked "Lấy mã OTP". An alert appeared: "Lỗi: User not found". The page remained on Step 1 (email input form). The user could not proceed to Step 2.
- Backend returned HTTP 404 with `{"error":"User not found"}`.

## Status
Pass

## Related Bugs
- The error message "User not found" is displayed in English, inconsistent with the Vietnamese-language UI

## Notes
- Pairwise scenario TC-PW-03: the system correctly blocks at Step 1 for an invalid email
- Since the user never reaches Step 2, the OTP and password parameters become irrelevant
- Backend: `server.js:70-71` — checks `SELECT * FROM users WHERE email = ?`, returns 404 if no user found
- Frontend: `ForgotPassword.jsx:19-21` — catches error and shows `alert("Lỗi: " + (err.response?.data?.error || err.message))`
- The error message is a direct translation from the backend and is not localised to Vietnamese

---
