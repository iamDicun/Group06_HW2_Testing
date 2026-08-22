# Bug Report: BUG-API-03

**Mã Lỗi:** `BUG-API-03`  
**Tiêu Đề:** Công thức tính giảm giá mã Coupon phần trăm bị sai dẫn đến tiền giảm bị âm và tổng tiền thanh toán tăng gấp nhiều lần  
**Chức Năng:** `FR-09` Discount Coupons  
**Endpoint Bị Ảnh Hưởng:** `POST /api/apply-coupon`  
**Mức Độ Nghiêm Trọng (Severity):** Critical  
**Độ Ưu Tiên (Priority):** P1  
**Môi Trường:** Backend Node.js / Express SUT (`application/backend/server.js`)  
**Liên Kết GitHub Issue:** https://github.com/iamDicun/Group06_HW2_Testing/issues/163  

---

## 1. Mô Tả Chi Tiết (Description)
Khi người dùng áp dụng mã giảm giá dạng phần trăm (ví dụ mã `SAVE10` có `discount_value = 10` biểu thị giảm 10%), công thức tính toán trong mã nguồn backend bị viết nhầm thành:
$$\text{discount\_amount} = \text{Math.floor}(\text{total\_amount} \times (1 - \text{coupon.discount\_value}))$$

Do `discount_value` được lưu trong DB là số nguyên `10` (chứ không phải `0.1`), phép tính $(1 - 10) = -9$ dẫn đến số tiền giảm giá là một số âm cực lớn, và $\text{final\_amount} = \text{total\_amount} - (-9 \times \text{total\_amount}) = 10 \times \text{total\_amount}$.

---

## 2. Các Bước Tái Hiện Lỗi (Steps to Reproduce)
1. Gửi request `POST /api/apply-coupon` với JSON body:
   ```json
   {
     "code": "SAVE10",
     "total_amount": 500000,
     "user_id": 1
   }
   ```
2. Quan sát kết quả trả về trong JSON response.

---

## 3. Kết Quả Thực Tế (Actual Result)
```json
{
  "success": true,
  "coupon_id": 1,
  "discount_amount": -4500000,
  "final_amount": 5000000,
  "message": "Áp dụng thành công! Giảm 10%"
}
```
* Số tiền giảm giá bị âm: `-4,500,000 ₫`.
* Số tiền cần thanh toán tăng từ `500,000 ₫` lên `5,000,000 ₫` (gấp 10 lần).

---

## 4. Kết Quả Kỳ Vọng (Expected Result)
* Với mã giảm 10% cho đơn 500,000 ₫:
  * `discount_amount`: `50,000` ₫
  * `final_amount`: `450,000` ₫

---

## 5. Minh Chứng Đoạn Code Lỗi Trong SUT (`server.js`)
```javascript
// server.js (Dòng 398-401)
if (coupon.type === "percent") {
  discount_amount = Math.floor(
    total_amount * (1 - coupon.discount_value), // <-- LỖI: (1 - 10) = -9
  );
}
// SỬA ĐÚNG: discount_amount = Math.floor(total_amount * (coupon.discount_value / 100));
```
