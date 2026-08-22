# Postman + Newman Guide

Dùng khi thực hiện Giai đoạn 2 trong `SKILL.md`.

## 1. Cấu trúc Collection

- 1 collection duy nhất cho 1 API/SUT.
- Folder cấp 1 = nhóm test: `Domain Partition`, `State Transition`, `Security`, `Schema Validation`.
- Trong mỗi folder, mỗi TC `.md` tương ứng 1 request, đặt tên request đúng theo TC ID (`TC-[API-NAME]-[NHÓM]-NNN — [mô tả ngắn]`).

## 2. Pre-request script gắn X-Student-Id

Đặt script này ở **collection-level** (tab Pre-request Script của collection, không đặt lặp lại ở từng request) để áp dụng cho mọi request:

```javascript
// Gắn header X-Student-Id cho mọi request trong collection
pm.request.headers.upsert({
    key: "X-Student-Id",
    value: pm.collectionVariables.get("student_id")
});
```

Lưu `student_id` làm collection variable, hỏi người dùng giá trị thật trước khi xuất file (không tự bịa Student ID).

## 3. Test script mẫu theo loại TC

### Domain Partition / Schema Validation
```javascript
pm.test("Status code đúng mong đợi", function () {
    pm.response.to.have.status(EXPECTED_STATUS);
});

pm.test("Response schema đúng field bắt buộc", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.all.keys(EXPECTED_KEYS); // liệt kê đúng field theo spec
});
```

### State Transition
```javascript
pm.test("Resource chuyển đúng state mong đợi", function () {
    const json = pm.response.json();
    pm.expect(json.status).to.eql("EXPECTED_STATE");
});
```

### Security (SEC-01–SEC-07)
```javascript
pm.test("Request bị từ chối / không lộ dữ liệu nhạy cảm", function () {
    pm.response.to.have.status(EXPECTED_DENY_STATUS); // 400/401/403/429 tùy nhóm SEC
    pm.expect(pm.response.text()).to.not.include("SENSITIVE_KEYWORD");
});
```

Điền `EXPECTED_STATUS` / `EXPECTED_KEYS` / `EXPECTED_STATE` / `EXPECTED_DENY_STATUS` theo đúng "Kết quả mong đợi" đã viết trong từng file TC — không tự đặt giá trị mặc định chung cho mọi request.

## 4. Xuất file collection

Đặt tên: `[API-NAME]-collection.postman_collection.json`, dùng `assets/collection-template.json` làm khung base (thay `info`, `variable`, và mảng `item` theo cấu trúc folder ở mục 1).

## 5. Lệnh chạy Newman + HTML report

Cần cài thêm reporter HTML (`newman-reporter-htmlextra`) nếu muốn report đẹp hơn mặc định:

```bash
npm install -g newman newman-reporter-htmlextra

newman run [API-NAME]-collection.postman_collection.json \
  --environment [API-NAME].postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export ./reports/[API-NAME]-report.html
```

Nếu API cần environment variable (base URL, token đăng nhập...), tạo kèm file `[API-NAME].postman_environment.json` tương ứng, hỏi người dùng giá trị thật thay vì tự bịa base URL/token.

Không tự chạy lệnh `newman run` thay người dùng nếu không có quyền truy cập mạng tới SUT thực tế (SUT thường là server nội bộ/localhost của người dùng) — chỉ sinh sẵn file collection + lệnh để người dùng tự chạy trên máy của họ.
