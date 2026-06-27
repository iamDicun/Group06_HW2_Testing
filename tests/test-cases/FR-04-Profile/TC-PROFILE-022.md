# TC-PROFILE-022: Kiểm tra chặn nhập quá 11 ký tự số điện thoại tại Client Mobile App (Domain Testing)

## Requirement ID
FR-04

## Feature
Quản lý hồ sơ cá nhân

## Module / Test Type / Technique
Profile / UI/UX / Positive / Boundary Value Analysis

## Priority
Medium

## Preconditions
- Thiết bị di động hoặc trình giả lập đang chạy ứng dụng EShop.
- Người dùng đang ở màn hình Hồ sơ cá nhân trên Mobile App.

## Test Data
| Field | Value |
|---|---|
| Thao tác | Nhập 12 chữ số |

## Test Steps
1. Nhấn chạm vào trường nhập Số điện thoại.
2. Cố gắng nhập chuỗi số có độ dài 12 chữ số (ví dụ: "091234567890").

## Expected Result
- Ô nhập chỉ cho phép hiển thị tối đa 11 ký tự số.
- Ký tự thứ 12 không thể nhập được vào ô input (do TextInput có thuộc tính maxLength={11}).

## Actual Result (filled after execution)


## Status
Not Run

## Related Bugs
None

## Notes
- Kiểm thử giá trị biên trên bằng cách triệt tiêu nhập liệu ở client di động.
