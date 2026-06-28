# Mobile FR-03 Quên Mật Khẩu - Báo Cáo Boundary Value Analysis

**Chức năng:** Mobile Forgot Password & Reset  
**Mã module:** `MOBILE_FORGOT_PW`  
**Kỹ thuật:** Boundary Value Analysis

---

## Biến Biên

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| OTP length | Đúng 6 chữ số | 5, 6, 7 chữ số | 5 chữ số bị reject; 6 và 7 chữ số blocked do không có OTP demo/reset flow issue |
| Password length/composition | Min 8 + đủ nhóm ký tự | 7, 8 ký tự | 7 bị reject; case 8 ký tự hợp lệ blocked do không có OTP demo |

## BVA Test Cases

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-MOBILE_FORGOT_PW-005 | OTP length 5 | Reject | Pass | |
| TC-MOBILE_FORGOT_PW-006 | OTP length 6 | Accept correct OTP | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-007 | OTP length 7 | Reject | Blocked | BUG-MOBILE-FR03-001 |
| TC-MOBILE_FORGOT_PW-008 | Password length 7 | Reject | Pass | |
| TC-MOBILE_FORGOT_PW-009 | Password length 8 | Accept nếu field khác hợp lệ | Blocked | BUG-MOBILE-FR03-001 |

## Non-BVA Cases

| Test Case ID | Lý do BVA không áp dụng |
|--------------|-------------------------|
| TC-MOBILE_FORGOT_PW-001 | Mở màn hình là navigation, không có boundary số. |
| TC-MOBILE_FORGOT_PW-002 | OTP demo/instruction là hành vi domain/UI. |
| TC-MOBILE_FORGOT_PW-003 | Email trống là equivalence partition. |
| TC-MOBILE_FORGOT_PW-004 | Email sai format là equivalence partition. |
| TC-MOBILE_FORGOT_PW-010 | Confirm field và mismatch validation là hành vi UI bắt buộc. |
| TC-MOBILE_FORGOT_PW-011 | Back-to-login là hành vi navigation. |
