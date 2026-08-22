# Sơ đồ kiến trúc — `api-test-generator`

```mermaid
flowchart TD
    A["Input Spec<br/>(.md tự do hoặc OpenAPI .json/.yaml)"] --> B["Spec Parser<br/>(Intermediate Spec Model - ISM)"]

    B --> B1["Endpoints<br/>path, method, summary"]
    B --> B2["Parameters &<br/>Request Body Schema"]
    B --> B3["Auth / Role Requirements"]
    B --> B4["Business Rules /<br/>State Definitions"]

    B1 --> C{4 Rule Engines}
    B2 --> C
    B3 --> C
    B4 --> C

    C --> E1["Engine 1:<br/>Domain Partition &<br/>Boundary Value"]
    C --> E2["Engine 2:<br/>Security Rules<br/>SEC-01..SEC-07"]
    C --> E3["Engine 3:<br/>State Machine<br/>Transition"]
    C --> E4["Engine 4:<br/>Schema / Header /<br/>Latency Validation"]

    E1 --> F["Test Synthesizer<br/>(gộp, khử trùng lặp,<br/>gán tc_id chuẩn hoá)"]
    E2 --> F
    E3 --> F
    E4 --> F

    F --> G1["Markdown Exporter<br/>Test Case Matrix<br/>(.md)"]
    F --> G2["Postman Exporter<br/>Collection v2.1<br/>(.json)<br/>+ Pre-request Script<br/>+ Test Script Assertions"]
    F --> G3["Data-driven Exporter<br/>Data Matrix<br/>(.json / .csv)"]

    G1 --> H["Deliverables"]
    G2 --> H
    G3 --> H

    subgraph Runtime["Chạy thử nghiệm (ngoài phạm vi Skill)"]
        H --> I["Newman / Postman Runner"]
        I --> J["Test Report"]
    end
```

## Giải thích luồng

| Module | Vai trò | Đầu vào | Đầu ra |
|---|---|---|---|
| Spec Parser | Chuẩn hoá spec bất kỳ thành ISM (Intermediate Spec Model) | Markdown / OpenAPI | Dict/JSON nội bộ |
| Engine 1 — Boundary | Sinh test partition & boundary cho từng field | ISM.parameters | List[TestCase] |
| Engine 2 — Security | Sinh SEC-01..SEC-07 cho từng endpoint có auth/role | ISM.auth, ISM.endpoints | List[TestCase] |
| Engine 3 — State Machine | Sinh chuyển trạng thái hợp lệ/bất hợp lệ | ISM.business_rules | List[TestCase] |
| Engine 4 — Schema/Header/Latency | Kiểm tra hợp đồng response | ISM.responses | List[TestCase] |
| Test Synthesizer | Hợp nhất, khử trùng, đánh `tc_id` | 4 danh sách TestCase | List[TestCase] thống nhất |
| Markdown Exporter | Xuất bảng thiết kế test case | List[TestCase] | `test_case_matrix.md` |
| Postman Exporter | Xuất Collection v2.1 kèm script | List[TestCase] | `postman_collection.json` |
| Data-driven Exporter | Tách input data khỏi logic | List[TestCase] | `data_matrix.json/.csv` |
