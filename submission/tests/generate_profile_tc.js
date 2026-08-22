const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, 'test-cases');

// Helper to write file
function writeTC(subDir, tcId, data) {
    const dir = path.join(baseDir, subDir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, `${tcId}.md`);
    
    const content = `# ${tcId}: ${data.title}

**Kỹ thuật thiết kế**: ${data.technique}
**Tham chiếu test condition**: ${data.refId}
**Endpoint**: ${data.endpoint}

## Mục tiêu
${data.objective}

## Tiền điều kiện
${data.preconditions.map(p => `- ${p}`).join('\n')}

## Request
- **Method**: ${data.method}
- **URL**: \`${data.url}\`
- **Headers**:
${Object.entries(data.headers || {}).map(([k, v]) => `  - \`${k}\`: \`${v}\``).join('\n')}
${data.body ? `- **Body (JSON)**:\n\`\`\`json\n${JSON.stringify(data.body, null, 2)}\n\`\`\`` : '- **Body**: None'}

## Kết quả mong đợi
- **HTTP Status Code**: \`${data.expectedStatus}\`
- **Response Schema/Body**:
${data.expectedBodyDesc}
${data.securityBehavior ? `- **Xử lý An ninh/Bảo mật**: ${data.securityBehavior}` : ''}

## Ưu tiên
${data.priority}
`;

    fs.writeFileSync(filePath, content, 'utf8');
}

// -------------------------------------------------------------
// 1. FR-04: PROFILE TEST CASES (51 TCs)
// -------------------------------------------------------------
const profileDP = [
    { id: '001', ref: 'DP-001', name: 'Nguyen Van A', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'Cập nhật tên hợp lệ chữ cái chuẩn' },
    { id: '002', ref: 'DP-002', name: 'Trần Thị Bích Hạnh', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'Cập nhật tên tiếng Việt có dấu' },
    { id: '003', ref: 'DP-003', name: '', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Tên là chuỗi rỗng' },
    { id: '004', ref: 'DP-004', name: '   ', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Tên chỉ chứa khoảng trắng' },
    { id: '005', ref: 'DP-005', name: 'A', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'Biên dưới độ dài tên: 1 ký tự' },
    { id: '006', ref: 'DP-006', name: 'A'.repeat(255), phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'Biên trên độ dài tên: 255 ký tự' },
    { id: '007', ref: 'DP-007', name: 'A'.repeat(256), phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Vượt biên độ dài tên: 256 ký tự' },
    { id: '008', ref: 'DP-008', name: 'Nguyen Van 123', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Tên chứa ký tự số không hợp lệ' },
    { id: '009', ref: 'DP-009', name: null, phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Thiếu trường name hoặc name = null' },
    { id: '010', ref: 'DP-010', name: 'Nguyen Van A', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'SĐT 10 chữ số bắt đầu bằng số 0' },
    { id: '011', ref: 'DP-011', name: 'Nguyen Van A', phone: '01234567890', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'SĐT 11 chữ số bắt đầu bằng số 0' },
    { id: '012', ref: 'DP-012', name: 'Nguyen Van A', phone: '091234567', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Biên dưới SĐT không hợp lệ: 9 chữ số' },
    { id: '013', ref: 'DP-013', name: 'Nguyen Van A', phone: '0912345678901', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Biên trên SĐT không hợp lệ: 12 chữ số' },
    { id: '014', ref: 'DP-014', name: 'Nguyen Van A', phone: '1912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'SĐT không bắt đầu bằng số 0' },
    { id: '015', ref: 'DP-015', name: 'Nguyen Van A', phone: '0912345abc', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'SĐT chứa ký tự chữ cái' },
    { id: '016', ref: 'DP-016', name: 'Nguyen Van A', phone: '0912-345-678', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'SĐT chứa ký tự đặc biệt' },
    { id: '017', ref: 'DP-017', name: 'Nguyen Van A', phone: '', addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'SĐT là chuỗi rỗng' },
    { id: '018', ref: 'DP-018', name: 'Nguyen Van A', phone: null, addr: '123 Le Loi, Q1, TP.HCM', status: '400 Bad Request', valid: false, desc: 'Thiếu trường SĐT hoặc SĐT = null' },
    { id: '019', ref: 'DP-019', name: 'Nguyen Van A', phone: '0912345678', addr: '123 Le Loi, Q1, TP.HCM', status: '200 OK', valid: true, desc: 'Địa chỉ giao hàng chuẩn' },
    { id: '020', ref: 'DP-020', name: 'Nguyen Van A', phone: '0912345678', addr: 'Số 45/12, Hẻm 3, Đường CMT8, P.10, Q.3, TP.HCM', status: '200 OK', valid: true, desc: 'Địa chỉ có dấu phẩy, gạch chéo, số nhà' },
    { id: '021', ref: 'DP-021', name: 'Nguyen Van A', phone: '0912345678', addr: '', status: '400 Bad Request', valid: false, desc: 'Địa chỉ giao hàng rỗng' },
    { id: '022', ref: 'DP-022', name: 'Nguyen Van A', phone: '0912345678', addr: 'X'.repeat(500), status: '200 OK', valid: true, desc: 'Biên trên độ dài địa chỉ: 500 ký tự' },
    { id: '023', ref: 'DP-023', name: 'Nguyen Van A', phone: '0912345678', addr: 'X'.repeat(501), status: '400 Bad Request', valid: false, desc: 'Vượt biên độ dài địa chỉ: 501 ký tự' },
    { id: '024', ref: 'DP-024', customReq: { method: 'GET', url: '{{base_url}}/api/users/me', headers: { 'Authorization': 'Bearer {{user_token}}', 'X-Student-Id': '{{student_id}}' }, status: '200 OK', desc: 'Token Bearer hợp lệ của User' } },
    { id: '025', ref: 'DP-025', customReq: { method: 'GET', url: '{{base_url}}/api/users/me', headers: { 'X-Student-Id': '{{student_id}}' }, status: '401 Unauthorized', desc: 'Thiếu header Authorization' } },
    { id: '026', ref: 'DP-026', customReq: { method: 'PUT', url: '{{base_url}}/api/users/me', headers: { 'Authorization': 'InvalidPrefix {{user_token}}', 'X-Student-Id': '{{student_id}}' }, body: { name: 'A', phone: '0912345678', shipping_address: 'HCM' }, status: '401 Unauthorized', desc: 'Token không có tiền tố Bearer' } },
    { id: '027', ref: 'DP-027', customReq: { method: 'PUT', url: '{{base_url}}/api/users/me', headers: { 'Authorization': 'Bearer fake_jwt_token_tampered', 'X-Student-Id': '{{student_id}}' }, body: { name: 'A', phone: '0912345678', shipping_address: 'HCM' }, status: '403 Forbidden', desc: 'Token chữ ký không hợp lệ' } }
];

profileDP.forEach(item => {
    const tcId = `TC-PROFILE-DP-${item.id}`;
    if (item.customReq) {
        writeTC('FR-04-Profile', tcId, {
            title: item.customReq.desc,
            technique: 'Domain Partition / Boundary Value Analysis',
            refId: item.ref,
            endpoint: `${item.customReq.method} ${item.customReq.url}`,
            objective: `Kiểm tra hành vi endpoint khi truyền ${item.customReq.desc}`,
            preconditions: ['Server backend đang hoạt động'],
            method: item.customReq.method,
            url: item.customReq.url,
            headers: item.customReq.headers,
            body: item.customReq.body,
            expectedStatus: item.customReq.status,
            expectedBodyDesc: item.customReq.status.startsWith('200') ? '- Trả về JSON thành công' : '- Trả về JSON chứa field `error`',
            priority: 'Medium'
        });
    } else {
        writeTC('FR-04-Profile', tcId, {
            title: item.desc,
            technique: 'Domain Partition / Boundary Value Analysis',
            refId: item.ref,
            endpoint: 'PUT /api/users/me',
            objective: `Kiểm tra cập nhật thông tin hồ sơ với điều kiện: ${item.desc}`,
            preconditions: ['User đã đăng nhập và có Bearer token hợp lệ'],
            method: 'PUT',
            url: '{{base_url}}/api/users/me',
            headers: {
                'Authorization': 'Bearer {{user_token}}',
                'Content-Type': 'application/json',
                'X-Student-Id': '{{student_id}}'
            },
            body: {
                name: item.name,
                shipping_address: item.addr,
                phone: item.phone
            },
            expectedStatus: item.status,
            expectedBodyDesc: item.valid ? '- `{"message": "Profile updated"}`' : '- `{"error": "..."}` mô tả lý do dữ liệu không hợp lệ',
            priority: item.valid ? 'Medium' : 'High'
        });
    }
});

// Profile ST
const profileST = [
    { id: '001', ref: 'ST-001', title: 'Cập nhật hồ sơ lần đầu từ tài khoản mới', pre: 'User vừa đăng ký tài khoản mới', body: { name: 'Nguyen Van A', phone: '0912345678', shipping_address: '123 Le Loi, Q1, TP.HCM' }, status: '200 OK', priority: 'High' },
    { id: '002', ref: 'ST-002', title: 'Cập nhật đè dữ liệu mới lên hồ sơ đã tồn tại', pre: 'User đã có hồ sơ thông tin trước đó', body: { name: 'Nguyen Van B', phone: '0987654321', shipping_address: '456 Nguyen Hue, Q1, TP.HCM' }, status: '200 OK', priority: 'Medium' },
    { id: '003', ref: 'ST-003', title: 'Cập nhật thất bại do SĐT sai - Giữ nguyên trạng thái cũ', pre: 'User có hồ sơ hợp lệ đang lưu trong DB', body: { name: 'Nguyen Van C', phone: '12345', shipping_address: '789 Vo Van Tan' }, status: '400 Bad Request', priority: 'High' },
    { id: '004', ref: 'ST-004', title: 'Cập nhật khi Token hết hạn - Từ chối và không đổi DB', pre: 'Token của user đã hết hạn', body: { name: 'New Name', phone: '0912345678', shipping_address: 'New Addr' }, status: '401/403', priority: 'High' }
];

profileST.forEach(item => {
    const tcId = `TC-PROFILE-ST-${item.id}`;
    writeTC('FR-04-Profile', tcId, {
        title: item.title,
        technique: 'State Transition Testing',
        refId: item.ref,
        endpoint: 'PUT /api/users/me',
        objective: `Kiểm tra chuyển đổi trạng thái hồ sơ người dùng: ${item.title}`,
        preconditions: [item.pre],
        method: 'PUT',
        url: '{{base_url}}/api/users/me',
        headers: {
            'Authorization': 'Bearer {{user_token}}',
            'Content-Type': 'application/json',
            'X-Student-Id': '{{student_id}}'
        },
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: item.status.startsWith('200') ? '- Cập nhật thành công, GET lại trả đúng thông tin mới' : '- Bị từ chối, dữ liệu trong CSDL giữ nguyên trạng thái trước đó',
        priority: item.priority
    });
});

// Profile SEC
const profileSEC = [
    { id: '001', ref: 'SEC-01-001', sec: 'SEC-01', title: 'SQL Injection trong trường name', body: { name: "' OR '1'='1", phone: '0912345678', shipping_address: 'HCM' }, status: '400/200', desc: 'Không thực thi câu lệnh SQLi, không lộ lỗi SQL syntax 500' },
    { id: '002', ref: 'SEC-01-002', sec: 'SEC-01', title: 'SQL Injection trong trường shipping_address', body: { name: 'Test', phone: '0912345678', shipping_address: "'; DROP TABLE users; --" }, status: '400/200', desc: 'Không làm drop table hoặc crash DB, sanitize an toàn' },
    { id: '003', ref: 'SEC-01-003', sec: 'SEC-01', title: 'SQL Injection trong trường phone', body: { name: 'Test', phone: "' UNION SELECT id, email, password FROM users --", shipping_address: 'HCM' }, status: '400 Bad Request', desc: 'Validate SĐT từ chối chuỗi chứa payload SQLi' },
    { id: '004', ref: 'SEC-02-001', sec: 'SEC-02', title: 'IDOR - Thử cập nhật profile của user khác bằng cách gán id trong body', body: { id: 1, name: 'Hacked Name', phone: '0912345678', shipping_address: 'HCM' }, status: '200 OK', desc: 'Chỉ cập nhật cho user tương ứng token (req.user.id), không ghi đè user 1' },
    { id: '005', ref: 'SEC-02-002', sec: 'SEC-02', title: 'IDOR - Đọc thông tin user khác qua GET /api/users/me', method: 'GET', endpoint: 'GET /api/users/me', status: '200 OK', desc: 'Chỉ trả thông tin của chính user trong token' },
    { id: '006', ref: 'SEC-03-001', sec: 'SEC-03', title: 'Role Escalation - Regular User gửi field role=admin để tự thăng quyền', body: { name: 'User Test', phone: '0912345678', shipping_address: 'HCM', role: 'admin' }, status: '400/403/200', desc: 'Bỏ qua field role hoặc từ chối; DB vẫn giữ nguyên role=user' },
    { id: '007', ref: 'SEC-03-002', sec: 'SEC-03', title: 'Role Escalation - Regular User gửi field isAdmin=true', body: { name: 'User Test', phone: '0912345678', shipping_address: 'HCM', isAdmin: true }, status: '200 OK', desc: 'Không cấp quyền Admin trái phép' },
    { id: '008', ref: 'SEC-04-001', sec: 'SEC-04', title: 'Auth Bypass - Gọi GET /api/users/me không có Token', method: 'GET', endpoint: 'GET /api/users/me', noAuth: true, status: '401 Unauthorized', desc: 'Chặn truy cập khi thiếu JWT Token' },
    { id: '009', ref: 'SEC-04-002', sec: 'SEC-04', title: 'Auth Bypass - Gọi PUT /api/users/me với JWT Token giả mạo', fakeToken: true, body: { name: 'Hacker' }, status: '403 Forbidden', desc: 'Chặn truy cập khi JWT Signature sai' },
    { id: '010', ref: 'SEC-05-001', sec: 'SEC-05', title: 'Stored XSS trong trường name', body: { name: "<script>alert('XSS')</script>", phone: '0912345678', shipping_address: 'HCM' }, status: '400/200', desc: 'Chuỗi được encode/escape, không thực thi mã JavaScript' },
    { id: '011', ref: 'SEC-05-002', sec: 'SEC-05', title: 'Stored XSS trong trường shipping_address', body: { name: 'Test', phone: '0912345678', shipping_address: "<img src=x onerror=alert('XSS')>" }, status: '400/200', desc: 'Chuỗi được escape hoặc lưu an toàn' },
    { id: '012', ref: 'SEC-06-001', sec: 'SEC-06', title: 'Rate Limiting - Gửi 50 request cập nhật liên tục', loop: 50, body: { name: 'Rapid Update' }, status: '429/200', desc: 'Hệ thống giới hạn tần suất request (Rate Limiting) hoặc xử lý ổn định không crash' },
    { id: '013', ref: 'SEC-07-001', sec: 'SEC-07', title: 'Sensitive Data Exposure - Kiểm tra rò rỉ trường password trong GET /api/users/me', method: 'GET', endpoint: 'GET /api/users/me', status: '200 OK', desc: 'Response KHÔNG được chứa trường password / hash mật khẩu' },
    { id: '014', ref: 'SEC-07-002', sec: 'SEC-07', title: 'Sensitive Data Exposure - Kiểm tra rò rỉ trường reset_token trong GET /api/users/me', method: 'GET', endpoint: 'GET /api/users/me', status: '200 OK', desc: 'Response KHÔNG được chứa trường reset_token' }
];

profileSEC.forEach(item => {
    const tcId = `TC-PROFILE-SEC-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (!item.noAuth && !item.fakeToken) headers['Authorization'] = 'Bearer {{user_token}}';
    if (item.fakeToken) headers['Authorization'] = 'Bearer forged.jwt.token';

    writeTC('FR-04-Profile', tcId, {
        title: item.title,
        technique: `Security Testing (${item.sec})`,
        refId: item.ref,
        endpoint: item.endpoint || 'PUT /api/users/me',
        objective: `Kiểm tra lỗ hổng bảo mật: ${item.title}`,
        preconditions: ['Server backend đang hoạt động'],
        method: item.method || 'PUT',
        url: item.endpoint ? `{{base_url}}${item.endpoint.split(' ')[1]}` : '{{base_url}}/api/users/me',
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- Response tuân thủ chính sách bảo mật: ${item.desc}`,
        securityBehavior: item.desc,
        priority: 'High'
    });
});

// Profile SCH
const profileSCH = [
    { id: '001', ref: 'SCH-001', title: 'Schema Validation cho GET /api/users/me (200 OK)', method: 'GET', endpoint: 'GET /api/users/me', status: '200 OK', desc: 'Response chứa đúng các key: id (int), name (string), email (string), role (string), shipping_address (string|null), phone (string|null)' },
    { id: '002', ref: 'SCH-002', title: 'Schema Validation cho GET /api/users/me (401 Unauthorized)', method: 'GET', endpoint: 'GET /api/users/me', noAuth: true, status: '401 Unauthorized', desc: 'Response chứa key `error` (string)' },
    { id: '003', ref: 'SCH-003', title: 'Schema Validation cho PUT /api/users/me (200 OK)', method: 'PUT', body: { name: 'A', phone: '0912345678', shipping_address: 'HCM' }, status: '200 OK', desc: 'Response chứa key `message` (string: "Profile updated")' },
    { id: '004', ref: 'SCH-004', title: 'Schema Validation cho PUT /api/users/me khi dữ liệu lỗi (400 Bad Request)', method: 'PUT', body: { name: '', phone: '123' }, status: '400 Bad Request', desc: 'Response chứa key `error` (string)' },
    { id: '005', ref: 'SCH-005', title: 'Schema Validation cho PUT /api/users/me khi token sai (403 Forbidden)', method: 'PUT', fakeToken: true, body: { name: 'A' }, status: '403 Forbidden', desc: 'Response chứa key `error` (string)' },
    { id: '006', ref: 'SCH-006', title: 'Kiểm tra tính toàn vẹn kiểu dữ liệu phone (string)', method: 'GET', endpoint: 'GET /api/users/me', status: '200 OK', desc: 'Kiểm tra trường phone luôn ở dạng string để không mất số 0 ở đầu' }
];

profileSCH.forEach(item => {
    const tcId = `TC-PROFILE-SCH-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (!item.noAuth && !item.fakeToken) headers['Authorization'] = 'Bearer {{user_token}}';
    if (item.fakeToken) headers['Authorization'] = 'Bearer invalid.token';

    writeTC('FR-04-Profile', tcId, {
        title: item.title,
        technique: 'Schema Validation Testing',
        refId: item.ref,
        endpoint: item.endpoint || 'PUT /api/users/me',
        objective: `Đối chiếu cấu trúc response JSON với API Spec: ${item.title}`,
        preconditions: ['User có phiên làm việc tương ứng'],
        method: item.method,
        url: item.endpoint ? `{{base_url}}${item.endpoint.split(' ')[1]}` : '{{base_url}}/api/users/me',
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- ${item.desc}`,
        priority: 'Medium'
    });
});

console.log('FR-04 test cases generated successfully.');
