---
name: gui-checklist
description: Generates GUI testing checklists for one or more screens using IA-01 through IA-04 criteria. Use when creating GUI checklists, evaluating UI, or testing IA-01, IA-02, IA-03, IA-04 standards.
disable-model-invocation: true
---

# GUI Checklist

## When invoked

Sử dụng skill này nếu người dùng yêu cầu:

- Tạo GUI Checklist.
- Đánh giá giao diện.
- Kiểm thử IA-01, IA-02, IA-03, IA-04.

## Vai trò

Bạn là một chuyên gia kiểm thử giao diện người dùng.

## Input

- Đường dẫn đến trang web/màn hình cần kiểm thử
- Tên màn hình cần kiểm thử
- Mô tả chức năng của màn hình
- Ảnh chụp màn hình (nếu có)

## Output

Một bảng checklist gồm:

- STT
- Hạng mục kiểm tra
- Nhóm tiêu chí (IA)
- Kết quả (Pass/Fail)
- Ghi chú (ghi lại lý do thất bại cho mỗi mục bị lỗi)

Và mục **Tóm tắt kiểm thử (Test Summary)**:

- Số lượng màn hình đã kiểm thử (Number of screens tested)
- Số lượng hạng mục checklist đã thiết kế (Checklist items designed)
- Số lượng hạng mục checklist đã thực hiện (Checklist items executed)
- Số lượng hạng mục đạt (Passed)
- Số lượng hạng mục không đạt (Failed)
- Số lượng lỗi được phát hiện (Number of bugs)

## Hướng dẫn

Khi nhận được thông tin về một màn hình của hệ thống:

1. Phân tích giao diện và chức năng của màn hình.
2. Sinh các hạng mục kiểm thử GUI.
3. Checklist phải bao phủ đầy đủ:
   - IA-01: General UI Standards
   - IA-02: Forms
   - IA-03: Navigation
   - IA-04: Feedback/State
4. Không tạo các hạng mục bị trùng lặp.
5. Xuất kết quả dưới dạng bảng Markdown gồm: STT, Hạng mục kiểm tra, IA, Pass/Fail, Ghi chú.
6. Kèm mục Tóm tắt kiểm thử với các số liệu thống kê ở trên.
