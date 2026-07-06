# State Transition Testing — Khái niệm & Ví dụ chi tiết

## 1. Vì sao cần State Transition Testing

Nhiều chức năng có hành vi phụ thuộc vào **trạng thái hiện tại**, không chỉ
input hiện tại: cùng một thao tác có thể hợp lệ ở trạng thái này nhưng vô lý
ở trạng thái khác (vd "hủy đơn" chỉ hợp lệ khi đơn chưa giao). Kiểm thử theo
Equivalence Partitioning / Boundary Value đơn thuần dễ bỏ sót các lỗi kiểu
này vì chúng không nhìn vào *lịch sử* của đối tượng.

## 2. Các mức độ phủ

| Mức | Ý nghĩa | Script tương ứng |
|---|---|---|
| **0-switch** | Mọi trạng thái đều được hệ thống đạt tới ít nhất một lần. | `gen_0switch` |
| **1-switch** | Mọi **transition hợp lệ** (một cặp trạng thái–sự kiện có định nghĩa) đều được kích hoạt ít nhất một lần. | `gen_1switch` |
| **N-switch** | Mọi **chuỗi N transition liên tiếp** hợp lệ đều được thử. N=2 tức là mọi cặp transition nối tiếp nhau. Phủ N cao hơn bắt được lỗi phụ thuộc lịch sử sâu hơn, nhưng số ca tăng theo cấp số nhân. | `gen_nswitch` |
| **Chuyển tiếp không hợp lệ** | Mọi tổ hợp (trạng thái, sự kiện) KHÔNG có transition định nghĩa phải được xác nhận là bị từ chối đúng cách. | `gen_invalid` |

Thứ tự ưu tiên đầu tư công sức thường là: 1-switch trước (bắt lỗi cơ bản nhất
và số lượng vừa phải), sau đó tổ hợp không hợp lệ (an toàn/bảo mật), rồi mới
tới N-switch nếu ngân sách test cho phép.

## 3. Guard và Action

- **Guard**: điều kiện phụ phải đúng để transition xảy ra (vd "số dư đủ").
  Khi một transition có guard, luôn cân nhắc thêm test case ở **biên của
  guard** — đây là chỗ giao thoa tự nhiên với Boundary Value Analysis. Ví dụ
  guard "số lần nhập sai < 5": cần test tại lần thứ 4 (guard đúng, chưa khóa)
  và lần thứ 5 (guard sai, kích hoạt transition khác — khóa tài khoản).
- **Action**: hành động hệ thống thực hiện khi transition xảy ra (vd "gửi
  email xác nhận"). Action nên được liệt kê rõ trong "Kết quả mong đợi" của
  test case, không chỉ trạng thái đích — bug thường nằm ở action bị thiếu dù
  trạng thái vẫn chuyển đúng.

## 4. Trạng thái composite / trạng thái con

Nếu hệ thống có trạng thái lồng nhau (vd "Đang xử lý" gồm các trạng thái con
"Đang xác thực", "Đang tính phí"), cách xử lý đơn giản và đủ dùng trong hầu
hết trường hợp: **làm phẳng (flatten)** thành các trạng thái lá riêng biệt
trong spec JSON (vd `S_dang_xu_ly_xac_thuc`, `S_dang_xu_ly_tinh_phi`), rồi
áp dụng quy trình như bình thường. Chỉ khi thực sự cần mô hình hóa hành vi
chung của nhóm trạng thái cha (vd "bất kỳ lỗi nào trong nhóm 'Đang xử lý' đều
quay về 'Thất bại'"), hãy thêm transition đó lặp lại cho từng trạng thái lá
con tương ứng.

## 5. Ví dụ end-to-end: Vòng đời đơn hàng

Mô tả nghiệp vụ (rút gọn):
> Đơn hàng mới tạo ở trạng thái "Chờ xác nhận". Nhân viên xác nhận → "Đã xác
> nhận". Khách có thể hủy đơn khi đơn đang "Chờ xác nhận" hoặc "Đã xác nhận"
> → "Đã hủy". Khi đơn "Đã xác nhận", kho đóng gói xong → "Đang giao". Giao
> thành công → "Hoàn tất". Giao thất bại (3 lần) → "Đã hủy". Không thể hủy
> đơn khi đã "Đang giao" hoặc "Hoàn tất".

Spec JSON tương ứng:

```json
{
  "title": "Vòng đời đơn hàng",
  "initial_state": "S1",
  "states": [
    {"id": "S1", "name": "Chờ xác nhận"},
    {"id": "S2", "name": "Đã xác nhận"},
    {"id": "S3", "name": "Đang giao"},
    {"id": "S4", "name": "Hoàn tất"},
    {"id": "S5", "name": "Đã hủy"}
  ],
  "events": [
    {"id": "E1", "name": "Xác nhận đơn"},
    {"id": "E2", "name": "Hủy đơn"},
    {"id": "E3", "name": "Đóng gói xong"},
    {"id": "E4", "name": "Giao thành công"},
    {"id": "E5", "name": "Giao thất bại 3 lần"}
  ],
  "transitions": [
    {"from": "S1", "event": "E1", "to": "S2"},
    {"from": "S1", "event": "E2", "to": "S5"},
    {"from": "S2", "event": "E2", "to": "S5"},
    {"from": "S2", "event": "E3", "to": "S3"},
    {"from": "S3", "event": "E4", "to": "S4"},
    {"from": "S3", "event": "E5", "to": "S5"}
  ]
}
```

Chạy `python3 scripts/gen_state_transition_testcases.py order.json` sẽ tự
sinh: 5 test case 0-switch, 6 test case 1-switch, và test case chuyển tiếp
không hợp lệ đáng chú ý nhất — **"Hủy đơn" khi đang ở "Đang giao" hoặc "Hoàn
tất"** — đúng ngay điều mô tả nghiệp vụ nhấn mạnh là KHÔNG được phép.