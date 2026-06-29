> Đây là template tham khảo để điền nội dung bug. Còn template trên GitHub Issues nằm ở `.github/ISSUE_TEMPLATE/bug-report.md`.

# [BUG][REGISTER] Password Validation in Login page not working properly

## Found by Test Case
TC-[REGISTER]-[001]

## Requirement Related
FR-01-Register

## Severity / Priority
Critical / P0

## Environment
- **Browser:** Brave
- **OS:** Windows
- **URL:** http://localhost:5173/register
- **Version/Commit:** test(register): Unsuccessful login with correct password format
- **Test Account:** [email/password if applicable]

## Steps to Reproduce
1. Access the URL
2. Go to Register page
3. Enter: "Nguyen Van A" to Họ Tên field
4. Enter: "user01@gmail.com" to Email field
5. Enter: "Abc@123456" to Password field
6. Click Register

## Expected Result
Register successfully with notification and redirected to the homepage

## Actual Result
Test failed with notification: "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."

## Evidence
https://drive.google.com/file/d/1nWm8ayYg4yf04qMhAgBYjbuTMnKFrESP/view?usp=sharing

## Labels
- `type: bug`
- `module: [register]`
- `severity: critical`
- `priority: P0`
- `status: new`
- `found-by: test-case`
- `technique: EP `
