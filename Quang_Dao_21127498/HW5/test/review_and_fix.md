# Review and fix AI-generated test plan (test script)
## Load-test
Trong file đề xuất Load Test, AI đề xuất chỉ có 50 VUs (Virtual User), sau khi chạy thử và nhận thấy, 50 VUs ít, nên tôi cân nhắc có thể tăng thành 100 VUs, 200 VUs, tùy vào kết quả chạy thực tế. Có thể AI đã đưa ra con số 50 để an toàn, tránh trường hợp nhầm sang stress test.

## Spike test
Sau khi chạy Spike test thì file monitor resource laptop đang ghi nhận CPU = 0% khi đang chạy test. Mình nghĩ đây là bug, cần tìm hiểu nguyên nhân và fix bug.

Tương tự load test, Spike Test AI gợi ý chỉ lên đỉnh là 400VUs, sau khi chạy, mình thấy tỷ lệ lỗi khá thấp, nên mình tin rằng có thể tăng đỉnh spike lên thành 500VUs, thậm chí 600VUs.

## Stress test
Vẫn chưa xác định được rằng máy mạnh hay do 800VUs vẫn còn ít. Tuy nhiên, điều đó cho thấy tiềm năng của 1 chiếc laptop bình thường, có thể hơn AI nghĩ.

## Endurance

## Monitoring system PowerShell (khác test script nhưng có tác động vào bài)
Sau khi chạy script Powershell Monitoring CPU và RAM cũ, nhận ra một vấn đề là PID không cố định, nên script cũ lấy process node đứng đầu (Select-Object -First 1), nhưng có thể lần này chạy hệ thống, ở node chạy ở PID này, lần sau chạy hệ thống in ra $proc.Id (đã thêm ở trên) và đối chiếu bằng tay với tasklist | findstr node hoặc Task Manager > Details để chắc chắn đúng PID của server đang test. Ngay cả AI fix cho tôi script cũ cũng nói rằng: "Cách cũ (Get-Counter "\Process(node)\...") chỉ an toàn khi bạn chắc chắn 100% máy chỉ có đúng 1 node.exe tại thời điểm chạy — điều này rủi ro trong môi trường thực tế, nên cách theo PID ở trên đáng tin cậy hơn nhiều cho việc thu thập evidence phục vụ báo cáo."


