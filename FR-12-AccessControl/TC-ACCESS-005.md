# TC-ACCESS-005: Truy cập API được bảo vệ với token hết hạn / sai chữ ký

## Requirement ID
FR-12

## Feature
Access Control (Kiểm soát truy cập)

## Module / Test Type / Technique
Access Control / Functional / Decision Table Testing

## Priority
High

## Preconditions
- Có sẵn một chuỗi JWT token không hợp lệ (ví dụ: đã hết hạn, hoặc bị sửa đổi chữ ký, hoặc chuỗi ngẫu nhiên không đúng định dạng JWT).

## Test Data
| Field | Value |
|-------|-------|
| Method | POST |
| Endpoint | /api/coupons |
| Header: Authorization | Bearer <invalid_or_expired_token> |
| Body (JSON) | `{"code": "FAKE50", "type": "percent", "discount_value": 50, "expired_at": "2099-12-31", "min_order_amount": 100000, "max_uses_per_user": 1}` |

## Test Steps
1. Gửi yêu cầu `POST /api/coupons` với body tạo mã giảm giá.
2. Thiết lập header `Authorization: Bearer <chuỗi token không hợp lệ>`.

## Expected Result
- HTTP Status Code trả về là `401 Unauthorized`.
- Mã giảm giá mới không được tạo trong cơ sở dữ liệu.

## Actual Result (filled after execution)
- API trả về HTTP 403 Forbidden đúng như mong đợi do token hết hạn hoặc chữ ký không hợp lệ.

## Status
PASSED

## Related Bugs
None

## Notes
Yêu cầu xác thực phải từ chối ngay ở lớp middleware JWT khi token không hợp lệ (trước khi kiểm tra role).
