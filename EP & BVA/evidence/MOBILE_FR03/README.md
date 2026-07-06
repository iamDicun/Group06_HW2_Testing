# Mobile FR-03 Evidence

Place mobile screenshots here after manual black-box UI execution.

Required for confirmed `BUG-MOBILE-FR03-001`:

- `BUG-MOBILE-FR03-001-otp-not-shown.png` - registered email request moves to reset step but no usable demo OTP is shown.
- `BUG-MOBILE-FR03-001-missing-confirm-password.png` - reset screen has no confirm password field.
- `BUG-MOBILE-FR03-001-missing-back-to-login.png` - forgot/reset screen has no clear return-to-login action.

Optional screenshots:

- `BUG-MOBILE-FR03-001-api-not-connected.png` - app cannot request OTP because mobile cannot reach backend.
- `BUG-MOBILE-FR03-001-otp-label-four-digits.png` - reset screen shows `Mã OTP (4 số)` instead of 6-digit OTP requirement.
- `TC-MOBILE_FORGOT_PW-003-empty-email-validation.png`
- `TC-MOBILE_FORGOT_PW-004-malformed-email-validation.png`
- `TC-MOBILE_FORGOT_PW-008-password-min-minus-1-validation.png`
