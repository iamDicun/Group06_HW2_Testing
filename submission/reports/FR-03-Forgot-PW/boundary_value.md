# FR-03 Quên Mật Khẩu - Báo Cáo Boundary Value Analysis

**Chức năng:** Forgot Password & Reset  
**Mã module:** `FORGOT_PW`  
**Kỹ thuật:** Boundary Value Analysis

---

## Biến Biên

| Biến | Quy tắc biên | Giá trị test | Kết quả |
|------|--------------|--------------|---------|
| OTP length | Đúng 6 chữ số | 5, 6, 7 chữ số | Bị blocked vì password hợp lệ bị reject trước |
| Password length | Tối thiểu 8 ký tự | 7, 8, 9 ký tự | 7 bị reject đúng; 8 và 9 ký tự hợp lệ bị reject sai |

## BVA Test Cases

| Test Case ID | Boundary | Expected | Actual | Bug liên quan |
|--------------|----------|----------|--------|---------------|
| TC-FORGOT_PW-005 | OTP length 5 | Reject | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-006 | OTP length 6 | Accept nếu OTP đúng | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-007 | OTP length 7 | Reject | Blocked | BUG-FR03-005 |
| TC-FORGOT_PW-009 | Password length 7 | Reject | Pass | |
| TC-FORGOT_PW-010 | Password length 8 | Accept nếu các field khác hợp lệ | Fail | BUG-FR03-005 |
| TC-FORGOT_PW-015 | Password length 9 | Accept nếu các field khác hợp lệ | Fail | BUG-FR03-005 |

## Kết Luận

OTP BVA bị blocked vì reset form reject password hợp lệ trước khi có thể cô lập hành vi OTP. Password BVA phát hiện bug confirmed: password mạnh ở độ dài min và min+1 bị từ chối.
