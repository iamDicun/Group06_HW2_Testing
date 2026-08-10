# AI Critique (200-300 words)

**Student:** 23127459 - Group 06

---

The original AI-generated FR-05 test suite contained **systematic false positives** caused by assertion patterns that were too lenient. The most critical failure was in **assertion specificity** — the AI used `toContainText("₫")` on the entire product card instead of targeting the price element directly, and `toHaveAttribute("alt")` which passes for empty strings. These weak assertions created a dangerous illusion of correctness: 42 out of 42 FR-05 tests passed on all 3 browsers, yet the SUT had at least 5 real bugs.

The root cause was that the AI **tested against specs rather than reality**. It wrote assertions assuming the SUT complied with FR-05 ("dùng ký hiệu ₫"), without verifying what the frontend actually renders. The AI never inspected `Home.jsx` to discover that the price element uses `"VND"` text, that `alt=""` is empty, or that `dangerouslySetInnerHTML` creates XSS vectors. This reveals a fundamental limitation: AI generates tests from *specifications*, but specifications describe *desired behavior*, not *actual implementation*.

After human review identified these gaps, I refactored with **targeted selectors** (`home.priceElements.first().textContent()` instead of `card`), **explicit value checks** (`altValue.trim() !== ""` instead of `toHaveAttribute("alt")`), and **regex pattern matching** (`/^[\d,]+ ₫$/` for price format). The refactored tests immediately caught 10 SUT bugs across 3 browsers that the original tests completely missed. The lesson: AI excels at generating test *structure* and *coverage matrices*, but human engineers must validate assertion *precision* — the difference between a test that runs and a test that actually catches bugs.
