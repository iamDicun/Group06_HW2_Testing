# AI Critique (200–300 words)

**Student:** 23127459 - Huỳnh Vương Thụy Quân

---

[Write your 200–300 word critique here. Address:]

- Where did the AI get something wrong, biased, or incomplete?
- Why did it fail to catch the issue?
- What principle have you learned about collaborating with AI during this assignment?
During the bug identification and usability test generation phases, the AI exhibited two notable limitations. First, when analyzing GUI bugs, the AI over-indexed on static source code rather than evaluating the rendered interface via Browser DevTools. It flagged missing HTML parameters and structural tags purely from a code perspective, missing visual and layout nuances (such as elements visually overlapping or dynamic component states) that are easily observable through DevTools. Second, when requested to duplicate and generate additional participant profiles for usability testing, the AI hallucinated non-existent user interactions and exaggerated usability friction points, generating inaccurate demographic patterns and unverified feedback.

The AI failed to catch these issues due to its fundamental nature as a Large Language Model (LLM). Lacking a real-time browser rendering engine or visual perception, it cannot "see" the actual DOM layout or CSS execution, relying solely on static text analysis. Furthermore, when tasked with data multiplication, its probabilistic token prediction mechanism prioritized generating plausible-sounding text over maintaining factual consistency with the primary user logs, leading to hallucinations.

This assignment reinforced a crucial principle regarding AI collaboration: **AI should serve as an efficiency accelerator, not an autonomous oracle.** While AI excels at structuring reports, synthesizing bulk findings, and formatting issue templates, human verification remains irreplaceable. QA engineers must actively validate AI outputs against real-world browser behavior (DevTools) and strictly audit AI-generated empirical data. Treating AI as a junior assistant that requires rigorous human oversight ensures test accuracy and maintains academic/professional integrity.