# TC-IMPORT-SCH-005: Schema Validation cho mảng errors khi có dòng lỗi

**Kỹ thuật thiết kế**: Schema Validation Testing
**Tham chiếu test condition**: SCH-005
**Endpoint**: POST /api/admin/import-products

## Mục tiêu
Đối chiếu schema response: Schema Validation cho mảng errors khi có dòng lỗi

## Tiền điều kiện
- Admin có quyền thực thi API

## Request
- **Method**: POST
- **URL**: `{{base_url}}/api/admin/import-products`
- **Headers**:
  - `Content-Type`: `application/json`
  - `X-Student-Id`: `{{student_id}}`
  - `Authorization`: `Bearer {{admin_token}}`
- **Body (JSON)**:
```json
{
  "products": [
    {
      "price": 100000
    }
  ]
}
```

## Kết quả mong đợi
- **HTTP Status Code**: `200 OK`
- **Response Schema/Body**:
- Mảng `errors` chứa các chuỗi string mô tả: "Hàng 2: Thiếu tên sản phẩm"


## Ưu tiên
Medium
