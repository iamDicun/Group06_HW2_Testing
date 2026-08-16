# Đề xuất mô hình Continuous Performance Testing cho EShop

## Bối cảnh và mục tiêu

Toàn bộ performance test trong báo cáo này (Load/Stress/Spike/Endurance) là
các lần chạy **thủ công, một lần** để phục vụ assignment. Trong thực tế vận
hành, hệ thống cần được kiểm tra hiệu năng **liên tục** mỗi khi có code mới,
để phát hiện sớm các thay đổi làm chậm hệ thống (performance regression)
trước khi chúng lọt vào production. Đây là mục tiêu của Continuous
Performance Testing (CPT).

Mô hình đề xuất dưới đây tận dụng lại chính bộ script k6 đã xây dựng
(`load-test/`, `stress-test/`, `spike-test/`), tích hợp vào pipeline CI/CD
dùng GitHub Actions — công cụ đã quen thuộc từ seminar CI/CD trước đó cho
chính repo EShop.

## Mô hình đề xuất — 3 giai đoạn

### Giai đoạn 1: Trigger & quyết định có test hay không

Mỗi commit/PR vào repo `eshop-sut` kích hoạt GitHub Actions. Bước đầu tiên
kiểm tra: **thay đổi có chạm vào code backend không** (dùng `paths:` filter
của GitHub Actions trên `server.js`, `database.js`, các file route). Nếu
không (vd: chỉ sửa docs, frontend, README), bỏ qua performance test hoàn
toàn — chỉ chạy unit/lint test thông thường. Đây là bước lọc chi phí đầu
tiên: phần lớn commit không cần chạy performance test.

### Giai đoạn 2: Chọn loại test theo mức độ rủi ro

Nếu có chạm backend, hệ thống phân biệt tiếp:
- **PR thường** (vào feature branch): chạy **Smoke Test** — 1 bản Load Test
  rút gọn (20 VU, 2 phút) — đủ để phát hiện lỗi hiệu năng rõ ràng, phản hồi
  nhanh trong vài phút, không chặn tiến độ dev.
- **Merge vào `main` hoặc trước release**: chạy **Full Suite** — Load +
  Stress + Spike đầy đủ như đã thiết kế, chạy theo lịch (nightly/scheduled
  job) hoặc trigger riêng, không chặn mọi PR.

### Giai đoạn 3: So sánh p95 với baseline và gắn cờ regression

Sau khi test chạy xong, hệ thống so sánh **p95 theo từng nhóm endpoint**
(auth-heavy/read-heavy/transactional — đúng 3 nhóm đã dùng xuyên suốt báo
cáo) với baseline lưu trữ (từ lần chạy thành công gần nhất trên `main`).

- Nếu p95 tăng vượt ngưỡng (vd: >20% so với baseline) → **gắn cờ
  regression**: comment chi tiết vào PR (endpoint nào, tăng bao nhiêu),
  không tự động chặn merge — để người review quyết định.
- Nếu không vượt ngưỡng → cập nhật baseline mới (chỉ khi merge vào `main`,
  tránh baseline bị "trôi" bởi dữ liệu từ feature branch chưa ổn định).

## Trade-offs

### Chi phí (cost)

Chạy Full Suite (~40-60 phút) trên **mọi** commit là không khả thi — tốn
phút CI (GitHub Actions giới hạn phút/tháng cho private repo) và tốn VUh
nếu dùng k6 Cloud cho Spike Test (gói free 500 VUh cạn nhanh nếu lặp lại
liên tục). Đánh đổi khi chỉ chạy Full Suite theo lịch/lúc merge: 1 regression
xuất hiện giữa chừng ở feature branch có thể không bị phát hiện ngay, chỉ
lộ ra ở lần chạy Full Suite tiếp theo — phát hiện trễ hơn đồng nghĩa sửa tốn
công hơn.

### Báo động giả (false alarms)

Rủi ro này đã thấy ngay trong chính EShop: nếu CI không reset DB đúng quy
trình (`node database.js` + restart server) trước mỗi lần chạy, bảng
`orders` tích lũy dần qua các lần chạy sẽ làm p95 tăng dần theo thời gian —
không liên quan gì đến code mới, nhưng hệ thống sẽ báo "regression" sai.
GitHub-hosted runner (máy ảo dùng chung) cũng có độ nhiễu cao hơn máy
chuyên dụng, dễ tạo dao động p95 ngẫu nhiên không phản ánh code thật.

Đánh đổi ở ngưỡng regression: đặt quá chặt (vd: >5%) bắt được nhiều vấn đề
thật nhưng báo động giả liên tục, gây "alert fatigue" khiến dev bắt đầu lờ
cảnh báo; đặt quá lỏng (vd: >50%) giảm báo động giả nhưng bỏ sót regression
thật ở mức vừa phải.

### Chặn merge hay chỉ cảnh báo

Mô hình đề xuất **không tự động chặn merge** khi phát hiện regression — chỉ
comment/gắn nhãn để người review tự quyết. Đây là lựa chọn an toàn hơn
(tránh chặn nhầm 1 merge khẩn cấp vì báo động giả), nhưng đổi lại: nếu team
quen bỏ qua cảnh báo, regression thật vẫn có thể lọt qua. Một phương án
trung gian: chỉ tự động chặn khi regression rất nghiêm trọng (vd: >50%),
còn lại chỉ cảnh báo.

## Giới hạn của đề xuất

Đây là thiết kế ở mức khái niệm, chưa triển khai thật — một số chi tiết cần
xác định thêm khi hiện thực hóa: nơi lưu trữ baseline lịch sử (file JSON
trong repo, hay dịch vụ ngoài như k6 Cloud's trend history), cơ chế xử lý
khi baseline chưa tồn tại (lần chạy đầu tiên), và số lượng lần chạy cần lấy
trung bình để giảm nhiễu thay vì so sánh 1-lần-với-1-lần.
