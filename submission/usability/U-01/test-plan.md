# Kế hoạch usability test U-01

- Ngày: 2026-07-20
- Website: https://lumierecinema-testing-demo-ui.vercel.app/
- Flow: U-01
- FR: FR-14, FR-15, FR-18, FR-19, FR-20, FR-35, FR-37
- Timebox: 10 phút
- Người điều phối: Nhóm thực hiện
- Thiết bị/trình duyệt test chính: Laptop Windows 11, Google Chrome, desktop viewport

## Mục tiêu

Đánh giá liệu user có thể tự tìm phim đang chiếu, chọn rạp, chọn suất chiếu, chọn đúng 2 ghế và đi đến màn hình hiển thị thông tin vé hay không.

## Task scenario

> Bạn muốn xem một phim đang chiếu tại Lumiere Cinema vào cuối tuần này. Hãy tìm một phim phù hợp, chọn rạp, chọn suất chiếu, chọn ghế cho 2 người và hoàn tất đến khi thấy thông tin vé.

## Điều kiện

- Bắt đầu: Home page đã tải, chưa mở menu, chưa chọn phim.
- Thành công: đã chọn movie, cinema, showtime, đúng 2 seats và thấy màn hình `TICKET DETAILS`.
- Thất bại: bỏ cuộc, hết timebox, bị kẹt không phục hồi hoặc không đến được trạng thái thành công.
- Participant: P01 - MSSV 23127391.

## Flow được dùng trong phiên test

- Movie: `Five Nights at Freddy's 2`
- Cinema: `Saigon Opera House`
- Showtime: `Wednesday, July 22, 2026, 16:00`
- Ticket type: `2 Adult Ticket(s)`
- Seats: `A1, A2`
- Expected end state: màn hình `TICKET DETAILS` hiển thị movie, address, date, tickets, seats, time, screen và total.

## Checklist trước phiên

- [x] Website deploy truy cập được.
- [x] Chuẩn hóa start state từ Home page.
- [x] Không dùng hướng dẫn từng click trong task scenario.
- [x] Ghi nhận hesitation, wrong turn và các điểm chưa rõ trong quá trình thao tác.
