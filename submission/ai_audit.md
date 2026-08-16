# AI Audit Report


I use AI tools for the following tasks:

| # | Agent | Date & Time (UTC+7) | Assignment | Your Prompt | AI Output (summary) | Verdict | Student Fix |
|---|-------|---------------------|------------|-------------|---------------------|:-------:|-------------|
| 1 | Gemini 3.7 | 2026-08-15 18:48 | HW05 – Performance Testing | đọc skill và thực hiện các phần tự động được, đảm bảo Read-heavy, Auth-heavy, Transactional, và Task 1 — AI-assisted test design and execution... | Designed and generated 3 k6 test plans (Load, Stress, Spike), shared data-driven CSV workflow covering 3 endpoint groups, account lockout handler, 3 report views, and AI critique review report. | INCOMPLETE | Hiệu chỉnh khắc phục lỗi account lockout bằng pool 500 users CSV độc lập; phân hóa randomized think-time theo 3 nhóm; bổ sung Phase 5 đo độ trễ phục hồi trong Spike test; thắt chặt assertions sâu trên payload JSON. |
| 2 | Gemini 3.7 | 2026-08-15 21:11 | HW05 – Performance Testing | Từ những file report tạo báo cáo đánh giá những tốt, xấu, điểm nghẽn, gợi ý chỉnh sửa vào report, không làm các phần khác của task 2 | Extracted empirical metrics across 4 test reports, generated comprehensive analysis in Task 2 Section 1 covering Strengths, Weaknesses, Bottlenecks, and Optimization recommendations without touching other Task 2 sections. | INCOMPLETE | Bổ sung bảng đối chứng Misinterpretation Hunt từ raw logs; phân loại phản biện Feasible vs Hallucinated (vạch trần ảo giác Connection Pool và B-Tree Index trên SQLite LIKE query); hiệu chỉnh SLA thresholds sát thực tế. |


