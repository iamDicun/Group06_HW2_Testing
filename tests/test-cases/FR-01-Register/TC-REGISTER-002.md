# TC-REGISTER-002: Register with boundary values for password (Boundary Value Analysis)

## Requirement ID
FR-01

## Feature
Account Registration — Password validation boundaries

## Module / Test Type / Technique
Register / Functional / Boundary Value Analysis

## Priority
High

## Preconditions
- User is on the Registration page
- Password requirement: 8-32 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character

## Test Data
| Field | Boundary | Value |
|-------|----------|-------|
| Email | valid | test@example.com |
| Password | min-1 (7 chars) | Abc@123 |
| Password | min (8 chars) | Abc@1234 |
| Password | min+1 (9 chars) | Abc@12345 |
| Password | max-1 (31 chars) | Abc@1234567890123456789012345678901 |
| Password | max (32 chars) | Abc@12345678901234567890123456789012 |
| Password | max+1 (33 chars) | Abc@123456789012345678901234567890123 |

## Test Steps
For each boundary value above:
1. Navigate to Registration page
2. Enter valid email
3. Enter the boundary password value
4. Re-enter the same password
5. Enter valid full name
6. Click Register

## Expected Result
- `min-1` (7 chars): Registration fails, error message "Password must be at least 8 characters"
- `min` (8 chars): Registration succeeds
- `min+1` (9 chars): Registration succeeds
- `max-1` (31 chars): Registration succeeds
- `max` (32 chars): Registration succeeds
- `max+1` (33 chars): Registration fails, error message "Password must not exceed 32 characters"

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- This covers BVA on both lower and upper boundaries of password length
- Additional BVA test cases for other fields (Name length, Email format) should be in separate TC files
