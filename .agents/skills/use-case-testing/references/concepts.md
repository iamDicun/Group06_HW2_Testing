# Use Case Testing — Khái niệm & Ví dụ chi tiết

## 1. Luồng thay thế vs luồng ngoại lệ — phân biệt cho đúng

Hai loại này dễ bị nhầm nhưng ý nghĩa test khác nhau:

- **Luồng thay thế (alternate flow):** một cách khác để **vẫn đạt được mục
  tiêu** của use case, thường quay lại (rejoin) luồng chính sau đó. Test case
  tương ứng mong đợi **postcondition thành công** giống luồng chính (hoặc một
  biến thể hợp lệ của nó).
- **Luồng ngoại lệ (exception flow):** một tình huống khiến use case **không
  đạt được mục tiêu**, luôn kết thúc riêng (không rejoin). Test case tương
  ứng mong đợi **postcondition thất bại** cùng thông báo lỗi cụ thể.

Nếu một "luồng thay thế" mà người dùng mô tả thực chất kết thúc bằng lỗi/
không tạo được kết quả mong muốn, hãy xếp nó vào `exception_flows`, không
phải `alternate_flows` — kết quả mong đợi trong test case sẽ khác nhau.

## 2. Use case có nhiều actor

Khi use case có nhiều actor tương tác xen kẽ (vd "Khách hàng" và "Nhân viên
kho"), ghi actor thực hiện ngay trong `text` của từng bước (vd "Nhân viên kho
xác nhận đã đóng gói xong") thay vì tách thành spec riêng — luồng vẫn là một
chuỗi bước tuyến tính, chỉ khác *ai* thực hiện mỗi bước. Điều này giữ script
đơn giản mà vẫn đủ thông tin để viết test case rõ ràng.

## 3. Include / Extend use case khác

- **Include** (use case A luôn gọi use case B như một bước con): coi bước gọi
  đó là một bước bình thường trong `main_flow` của A (vd "Hệ thống thực hiện
  use case 'Xác thực OTP'"), và test use case B riêng bằng một spec khác. Chỉ
  cần đảm bảo test case của A có precondition rằng B chạy thành công; không
  cần lặp lại chi tiết các bước của B trong spec của A.
- **Extend** (use case B là hành vi *tùy chọn*, chỉ chạy khi có điều kiện đặc
  biệt xảy ra trong A): mô hình hóa B như một **alternate flow hoặc exception
  flow** của A tùy vào B có dẫn tới thành công hay thất bại.

## 4. Ví dụ end-to-end: Đặt lại mật khẩu

Mô tả nghiệp vụ (rút gọn):
> Khách chọn "Quên mật khẩu", nhập email, hệ thống gửi mã OTP. Khách nhập mã
> OTP, hệ thống xác thực, khách đặt mật khẩu mới, hệ thống lưu và thông báo
> thành công. Khách có thể chọn "Gửi lại mã" nếu chưa nhận được OTP, sau đó
> tiếp tục nhập mã OTP như luồng chính. Nếu khách nhập sai OTP quá 5 lần,
> hệ thống khóa yêu cầu đặt lại mật khẩu trong 15 phút. Nếu email không tồn
> tại trong hệ thống, hệ thống báo lỗi ngay từ bước nhập email.

Spec JSON tương ứng:

```json
{
  "title": "Đặt lại mật khẩu",
  "actors": ["Khách hàng"],
  "preconditions": ["Khách chưa đăng nhập", "Khách đã có tài khoản"],
  "postconditions": {
    "success": ["Mật khẩu mới được lưu", "Khách có thể đăng nhập bằng mật khẩu mới"],
    "failure": ["Mật khẩu cũ vẫn còn hiệu lực"]
  },
  "main_flow": [
    {"id": "1", "text": "Khách chọn 'Quên mật khẩu'"},
    {"id": "2", "text": "Khách nhập email"},
    {"id": "3", "text": "Hệ thống gửi mã OTP tới email"},
    {"id": "4", "text": "Khách nhập mã OTP"},
    {"id": "5", "text": "Hệ thống xác thực mã OTP"},
    {"id": "6", "text": "Khách nhập mật khẩu mới"},
    {"id": "7", "text": "Hệ thống lưu mật khẩu mới và thông báo thành công"}
  ],
  "alternate_flows": [
    {
      "id": "AF1",
      "name": "Gửi lại mã OTP",
      "branch_at": "3",
      "steps": [{"text": "Khách chọn 'Gửi lại mã'"}, {"text": "Hệ thống gửi mã OTP mới"}],
      "rejoin_at": "4"
    }
  ],
  "exception_flows": [
    {
      "id": "EF1",
      "name": "Email không tồn tại",
      "branch_at": "2",
      "steps": [{"text": "Hệ thống không tìm thấy tài khoản khớp email"}],
      "result": "Hệ thống báo lỗi 'Email không tồn tại', không gửi OTP"
    },
    {
      "id": "EF2",
      "name": "Nhập sai OTP quá 5 lần",
      "branch_at": "5",
      "steps": [{"text": "Khách nhập sai OTP lần thứ 5"}],
      "result": "Hệ thống khóa yêu cầu đặt lại mật khẩu trong 15 phút, mật khẩu cũ vẫn hiệu lực"
    }
  ]
}
```

Chạy `python3 scripts/gen_usecase_testcases.py reset_password.json` sẽ sinh 4
test case: 1 happy path, 1 luồng thay thế (gửi lại OTP rồi vẫn thành công),
2 luồng ngoại lệ (email sai, OTP sai quá số lần) — mỗi test case là một kịch
bản đầy đủ có thể giao trực tiếp cho tester thực thi.