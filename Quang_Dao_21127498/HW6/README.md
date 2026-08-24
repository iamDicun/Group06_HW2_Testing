## 3 APIS 
1. **FR-06: Xem chi tiết sản phẩm**
    - *Endpoint:* `GET /api/products/:id`
2. **FR-07: Giỏ hàng (Shopping Cart)**
    - *Endpoint:* `POST /api/cart`
    - *Body (JSON):*
    ```json
    {
        "id": 1,
        "name": "Sản phẩm A",
        "price": 100000,
        "quantity": 2
    }
    ```
3. **FR-19: Quản lý Người dùng (Admin)**
    - *Lấy danh sách người dùng:* `GET /api/admin/users`
