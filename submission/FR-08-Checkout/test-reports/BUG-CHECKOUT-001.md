# BUG-CHECKOUT-001: Giỏ hàng không được xóa sạch sau khi thanh toán thành công

## Found by Test Case
TC-CHECKOUT-001, TC-CHECKOUT-009

## Requirement Related
FR-08

## Severity / Priority
Major / P2

## Environment
- **Browser:** N/A (API Test / curl Client)
- **OS:** Windows 11
- **URL:** http://localhost:3000
- **Version/Commit:** 85af3ba875c88283615e22cb108f13e2fccaf0e9
- **Test Account:** test@eshop.com

## Steps to Reproduce
1. Đăng nhập tài khoản `test@eshop.com` để nhận token xác thực.
2. Thêm sản phẩm vào giỏ hàng bằng cách gửi request `POST /api/cart` với thông tin sản phẩm.
3. Gửi request thanh toán `POST /api/checkout` kèm theo thông tin địa chỉ nhận hàng và số tiền.
4. Gửi request `GET /api/cart` để kiểm tra danh sách sản phẩm trong giỏ hàng hiện tại.

## Expected Result
- Sau khi thanh toán thành công (HTTP 200 OK), giỏ hàng của người dùng phải được xóa sạch hoàn toàn.
- Request `GET /api/cart` phải trả về mảng rỗng `[]`.

## Actual Result
- API thanh toán thành công và trả về `Checkout successful`.
- Tuy nhiên, khi truy vấn lại giỏ hàng bằng `GET /api/cart`, tất cả sản phẩm cũ vẫn tồn tại nguyên vẹn trong giỏ hàng, không hề bị xóa.

## Evidence
```bash
# 1. Thực hiện checkout
curl.exe -X POST http://localhost:3000/api/checkout \
  -H "Authorization: Bearer <user_token>" \
  -H "Content-Type: application/json" \
  -d '{"total_amount": 300000, "shipping_address": "123 Le Loi, TP.HCM"}'

# Response checkout
{
  "message": "Checkout successful",
  "orderId": 5
}

# 2. Kiểm tra lại giỏ hàng
curl.exe -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer <user_token>"

# Response giỏ hàng (vẫn còn sản phẩm)
[
  {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 30000000,
    "quantity": 1
  }
]
```

## Labels
- `type: bug`
- `module: CHECKOUT`
- `severity: Major`
- `priority: P2`
- `status: new`
- `found-by: test-case TC-CHECKOUT-001`
