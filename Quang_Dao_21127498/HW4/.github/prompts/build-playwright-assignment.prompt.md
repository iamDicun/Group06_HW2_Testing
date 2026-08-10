---
agent: agent
name: build-playwright-assignment
description: Design and implement a submission-ready Playwright automation assignment for exactly three web features, with at least 12 test cases per feature, step-by-step AI collaboration evidence, external CSV or JSON test data, at least three assertion patterns, three-browser execution, and a separate HTML report for every feature-browser run visibly labeled with a student ID. Use when asked to convert manual cases or feature requirements into data-driven Playwright tests, complete or repair a Playwright testing assignment, run its 3x3 browser matrix, or audit the resulting scripts and reports against these requirements.
---

# Build a Playwright Automation Assignment

Produce working, evidence-backed automation rather than only sample code. Preserve the target repository's conventions when they already satisfy the requirements.

## Pacing rule — read this before doing anything else

This assignment is executed across many chat turns, not one. On every turn:

- Work on exactly ONE scope: either one ledger/contract step, or one stage
  (Analyze / Design / Review / Model data / Map automation / Generate /
  Verify-and-repair) for ONE feature. Never combine two stages, and never
  combine two features, in the same turn — even if the instructions below
  seem to invite doing more.
- Never silently move to the next stage or the next feature. After
  completing the requested scope, STOP, present the output in full, and
  explicitly ask: "Xác nhận để tiếp tục sang bước tiếp theo?" Wait for the
  user's next message before doing anything else.
- Never create files, folders, or artifacts outside the scope just
  requested (no bonus README summaries, no extra .md files, no report
  drafts) unless the user's current message asks for them by name.
- If the user's message says only "tiếp tục" or "làm bước tiếp theo",
  advance by exactly one stage for the current feature — never jump ahead
  or batch multiple stages to "save time."
- Treat any instruction elsewhere in this file that implies doing the
  whole assignment end-to-end as describing the overall goal, not
  permission to execute it in one uninterrupted run. The stop-and-wait
  rule above always takes precedence.
- Never touch, generate, or claim to have produced Task 2's demo video or
  the Agent Skill demonstration video. Playwright's own execution video
  artifacts (from `video:` in the config) are a separate, allowed thing —
  do not conflate the two or imply the execution video satisfies Task 2.

## Establish the contract

Before editing, inspect the repository, application documentation, existing manual test cases, package scripts, Playwright configuration, and relevant source or rendered UI. Determine:

- the student ID;
- exactly three in-scope features and the acceptance criteria for each;
- the application URL and startup procedure;
- credentials, seed/reset mechanisms, and feature dependencies;
- the required submission location and any existing naming convention.

Ask only for information that cannot be discovered safely. The student ID is mandatory: never invent it or leave `{StudentID}` in final artifacts. If the application cannot run, continue with design and implementation where possible, but clearly mark execution and report generation as blocked rather than claiming success.

Create a requirement ledger before implementation:

| Feature | Source | Case IDs | Count | Data file | Spec file | Browsers | Reports |
| --- | --- | --- | ---: | --- | --- | --- | --- |

Keep the ledger current. A feature is complete only when it has at least 12 distinct automated cases and has run on all three configured browsers.

## Never fabricate a substitute SUT

The System Under Test (SUT) is the actual application the student runs and
points you to — never a reconstruction, mock, mini version, or approximation
you build yourself, even partially. If the real application's source cannot
be located in the current workspace, or its running URL cannot be reached,
you MUST stop and report exactly what is missing (workspace access, URL,
startup command) rather than scaffolding any stand-in application, page,
or backend to make automation "work." Producing tests against a
self-created substitute is worse than producing no tests at all, because
it invalidates the grading requirement that reports and bugs reflect the
real application.

Before writing any test or automation code, verify the real application is
reachable (e.g., an HTTP request or browser navigation to the given URL
returns a real response) and that you can see its actual behavior. Treat an
unreachable or inaccessible application as a blocking issue to raise with
the user immediately, not a problem to route around.

## Drive the AI conversion step by step

For each feature independently, perform and preserve a trace of these stages. Do not replace them with one generic prompt.

1. **Analyze** — extract rules, actors, preconditions, state transitions, inputs, outputs, and ambiguities from the feature source.
2. **Design** — propose at least 12 uniquely identified cases with a useful mix of positive, negative, boundary, validation, and state/error cases where applicable.
3. **Review** — check coverage, remove semantic duplicates, resolve unsupported assumptions against the source or application, and map every expected result to an observable oracle.
4. **Model data** — define the external CSV or JSON schema and map every case ID to one record.
5. **Map automation** — choose stable locators, setup/cleanup, actions, assertions, and isolation strategy for every case.
6. **Generate** — implement the data file, loader/helper code, and Playwright spec for this feature.
7. **Verify and repair** — list/discover tests, execute them, diagnose failures from evidence, and make targeted corrections without weakening valid expectations.

Record the actual stage prompts and concise outcomes in one existing assignment log if the repository has one; otherwise create a single `docs/ai-conversion-log.md`. Include feature, stage, prompt, relevant inputs, output/decision, and affected files. Never fabricate tool transcripts or claim an execution that did not occur.

## Design the test cases

Treat “at least 12” as applying to each feature, not to the suite total. The minimum logical suite is therefore 36 cases before browser expansion.

For every case, retain:

- stable ID such as `F1-TC-001`;
- category;
- purpose or covered rule;
- preconditions;
- input data reference;
- steps;
- precise expected result;
- cleanup or reset requirement.

Count logical cases, not browser repetitions, retries, assertion calls, or rows that differ only cosmetically. Do not pad the count with meaningless variants. Assert the stated requirement even when the current application is defective; do not change an oracle merely to make a test pass.

Use a traceability table when requirements have explicit IDs:

| Requirement | Case IDs | Automated test title |
| --- | --- | --- |

## Make the suite genuinely data-driven

Store case data in separate `.json` or `.csv` files, normally one file per feature under `test-data/`. Do not put case arrays or case objects inline in a spec, helper, fixture, or config.

The external record should contain the case ID, category, inputs, and primitive expected values needed by the test. Keep selectors, executable functions, and secrets out of data files. Read secrets from environment variables and document their names.

Load and validate the data at runtime. Fail early with an actionable message for:

- an unreadable or malformed data file;
- duplicate or missing case IDs;
- missing required fields;
- fewer than 12 records for a feature;
- unknown action or expectation keys.

Use typed data models in TypeScript and reject unsafe `any`. A generated test must include its case ID in the title. Do not branch on individual case IDs; dispatch through a small, documented action/expectation vocabulary or split materially different journeys into focused describes/specs that still consume external records.

Avoid shared mutable state. Create unique entities where needed and clean them up. Use API or fixtures for deterministic setup when permitted, while keeping the feature behavior itself exercised through the intended UI unless the assignment says otherwise.

## Implement maintainable Playwright tests

Prefer TypeScript with `@playwright/test`. Reuse the repository's page objects and fixtures if they are sound; add abstractions only when they remove real duplication.

Use resilient, user-facing locators in this order:

1. `getByRole` with accessible name;
2. `getByLabel`, `getByPlaceholder`, or `getByText`;
3. explicit test IDs;
4. CSS only when no stable semantic locator exists.

Avoid XPath, positional selectors, arbitrary sleeps, tests dependent on execution order, swallowed errors, and conditional assertions that silently skip verification. Use Playwright's web-first waiting and assertions.

Across the suite use at least three distinct meaningful assertion patterns. Prefer more when justified, for example:

- visibility or hidden state: `toBeVisible`, `toBeHidden`;
- text or accessible state: `toHaveText`, `toContainText`, `toHaveAccessibleName`;
- value or attribute: `toHaveValue`, `toHaveAttribute`, `toBeChecked`;
- URL or navigation: `toHaveURL`;
- collection size: `toHaveCount`;
- response or plain value: `expect(status).toBe(...)`, `toEqual`, `toMatchObject`.

An assertion pattern counts only when it verifies a meaningful expected result. Track at least three patterns in the ledger and identify the tests that demonstrate them.

Enable useful failure artifacts such as screenshot on failure, trace on first retry, and retained video when storage permits. Keep retries low locally so defects remain visible.

## Configure the three-browser matrix

Configure three explicit Playwright projects:

- Chromium;
- Firefox;
- WebKit.

Use Chrome or Edge only if the assignment explicitly allows installed branded browsers and the execution environment supports them. Do not fake browser coverage by renaming identical projects.

Ensure every feature is selected in every project. Verify discovery before a full run:

```powershell
npx playwright test --list
```

The acceptance matrix has nine cells:

|  | Chromium | Firefox | WebKit |
| --- | --- | --- | --- |
| Feature 1 | required | required | required |
| Feature 2 | required | required | required |
| Feature 3 | required | required | required |

## Produce one labeled HTML report per run

Do not rely on a single combined report when the rubric requires each run to produce one. Execute each feature-browser pair separately and write to a unique stable directory, for example:

```text
reports/html/<feature-slug>/<browser>/
```

Configure the Playwright HTML reporter with `open: 'never'`, a per-run `outputFolder`, and a visible title containing:

```text
Run by: <actual-student-id> | <feature-name> | <browser>
```

Pass the feature, browser, student ID, and report directory through a small matrix runner or environment variables consumed by `playwright.config.ts`. Keep the exact label `Run by:`. Ensure repeated runs do not overwrite other matrix cells.

Prefer a deterministic runner that iterates the nine cells and invokes Playwright once per cell. It must:

- stop or record a nonzero exit for failed cells while still preserving their reports;
- produce all possible reports, including reports containing failed tests;
- print a summary containing feature, browser, exit status, and report path;
- return nonzero if any cell failed;
- avoid starting multiple cells concurrently if they share mutable test state.

Do not use `--reporter=html` in a way that discards the configured dynamic title or output folder.

After execution, inspect each report's `index.html` or open the report and confirm the exact `Run by: <student-id>` text is visible. File existence alone is insufficient. Record all nine report paths and statuses in a compact run manifest.

## Validate in increasing scope

Run the cheapest useful checks first:

1. install or confirm dependencies without unnecessary upgrades;
2. run type checking or the repository's static validation;
3. list tests for all three projects and confirm at least 12 per feature per project;
4. run one representative case per feature on Chromium;
5. run the full nine-cell matrix;
6. inspect counts, browser identity, failures, artifacts, and the visible student label in all reports.

Expected minimum discovery is 108 test executions: `3 features × 12 cases × 3 browsers`. Additional setup or API tests do not compensate for a feature below 12.

When a run fails, distinguish among:

- product defect;
- incorrect or unstable automation;
- invalid test data;
- environment or dependency failure.

Repair automation and data defects. Preserve legitimate product failures and their evidence. Never delete tests, loosen assertions, add broad skips, or increase retries merely to obtain green output.

## Completion gate

Do not call the assignment complete until all applicable boxes are evidenced:

- [ ] Exactly three features are identified.
- [ ] Each feature has at least 12 distinct cases.
- [ ] Step-by-step AI conversion evidence exists for each feature.
- [ ] Every automated case reads inputs/expectations from external JSON or CSV.
- [ ] At least three meaningful assertion patterns are present.
- [ ] Chromium, Firefox, and WebKit projects are configured.
- [ ] Every feature ran in all three browsers.
- [ ] Nine separate HTML reports exist.
- [ ] Every report visibly contains `Run by: <actual-student-id>`.
- [ ] The run manifest records all cells and honest statuses.
- [ ] Commands and file paths needed to reproduce the result are documented.

In the final handoff, state the case count per feature, assertion patterns, browser matrix result, report paths, student-label verification, failed tests or blockers, and the exact rerun command. Separate “implemented” from “executed and verified.”
