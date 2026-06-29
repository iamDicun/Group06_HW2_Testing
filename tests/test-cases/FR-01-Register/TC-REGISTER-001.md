# TC-REGISTER-001: Register with valid data (Equivalence Partitioning)

## Requirement ID
FR-01

## Feature
Account Registration

## Module / Test Type / Technique
Register / Functional / Equivalence Partitioning (Domain Testing)

## Priority
High

## Preconditions
- User is on the Registration page
- User has NOT registered before with this email

## Test Data
| Field | Value |
|-------|-------|
| Email | user01@gmail.com |
| Password | Abc@123456 |
| Confirm Password | Abc@123456 |
| Full Name | Nguyen Van A |

## Test Steps
1. Navigate to Registration page
2. Enter valid email: `user01@gmail.com`
3. Enter valid password: `Abc@123456`
4. Re-enter password: `Abc@123456`
5. Enter full name: `Nguyen Van A`
6. Click Register button

## Expected Result
- Registration successful
- Redirect to Login page or Home page
- Success message displayed

## Actual Result (filled after execution)
- Failed login, notification poped up, said that the password was weak, though, I followed the password rule.

## Status
Run

## Related Bugs
None

## Notes
- This is a Domain Testing (Equivalence Partitioning) test case for valid input partition
- Should be complemented with TC-REGISTER-002, TC-REGISTER-003 for invalid partitions
