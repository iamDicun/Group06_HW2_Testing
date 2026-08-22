const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, 'test-cases');

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

// =========================================================================
// 1. FR-04: PROFILE TEST CASES (51 TCs)
// =========================================================================
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

// =========================================================================
// 2. FR-10: ORDER STATE MACHINE TEST CASES (53 TCs)
// =========================================================================
const orderDP = [
    { id: '001', ref: 'DP-001', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, role: 'admin', status: '200 OK', desc: 'Path param :id hợp lệ đang tồn tại' },
    { id: '002', ref: 'DP-002', method: 'PUT', path: '/api/admin/orders/999999/status', body: { status: 'confirmed' }, role: 'admin', status: '404 Not Found', desc: 'Path param :id không tồn tại trong CSDL' },
    { id: '003', ref: 'DP-003', method: 'PUT', path: '/api/admin/orders/-1/status', body: { status: 'confirmed' }, role: 'admin', status: '400/404', desc: 'Path param :id là số âm' },
    { id: '004', ref: 'DP-004', method: 'PUT', path: '/api/admin/orders/abc/status', body: { status: 'confirmed' }, role: 'admin', status: '400/404', desc: 'Path param :id là chuỗi ký tự' },
    { id: '005', ref: 'DP-005', method: 'PUT', path: '/api/admin/orders/1.5/status', body: { status: 'confirmed' }, role: 'admin', status: '400/404', desc: 'Path param :id là số thực' },
    { id: '006', ref: 'DP-006', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, role: 'admin', status: '200 OK', desc: 'Enum status hợp lệ: confirmed' },
    { id: '007', ref: 'DP-007', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'shipping' }, role: 'admin', status: '200 OK', desc: 'Enum status hợp lệ: shipping' },
    { id: '008', ref: 'DP-008', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'delivered' }, role: 'admin', status: '200 OK', desc: 'Enum status hợp lệ: delivered' },
    { id: '009', ref: 'DP-009', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'canceled' }, role: 'admin', status: '200 OK', desc: 'Enum status hợp lệ: canceled' },
    { id: '010', ref: 'DP-010', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'completed' }, role: 'admin', status: '400 Bad Request', desc: 'Enum status không hợp lệ: completed' },
    { id: '011', ref: 'DP-011', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: '' }, role: 'admin', status: '400 Bad Request', desc: 'Status là chuỗi rỗng' },
    { id: '012', ref: 'DP-012', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 123 }, role: 'admin', status: '400 Bad Request', desc: 'Status là kiểu số thay vì chuỗi' },
    { id: '013', ref: 'DP-013', method: 'PUT', path: '/api/orders/1/cancel', role: 'user', status: '200 OK', desc: 'User cancel đơn hàng :id hợp lệ của chính mình' },
    { id: '014', ref: 'DP-014', method: 'PUT', path: '/api/orders/999999/cancel', role: 'user', status: '404 Not Found', desc: 'User cancel đơn hàng :id không tồn tại' },
    { id: '015', ref: 'DP-015', method: 'POST', path: '/api/checkout', body: { total_amount: 200000, shipping_address: '123 Le Loi' }, role: 'user', status: '200 OK', desc: 'Checkout với total_amount dương hợp lệ' },
    { id: '016', ref: 'DP-016', method: 'POST', path: '/api/checkout', body: { total_amount: -50000, shipping_address: '123 Le Loi' }, role: 'user', status: '400 Bad Request', desc: 'Checkout với total_amount âm' },
    { id: '017', ref: 'DP-017', method: 'POST', path: '/api/checkout', body: { total_amount: 100000, shipping_address: 'Số 10 Hai Ba Trung' }, role: 'user', status: '200 OK', desc: 'Checkout với địa chỉ hợp lệ' },
    { id: '018', ref: 'DP-018', method: 'POST', path: '/api/checkout', body: { total_amount: 100000, shipping_address: '' }, role: 'user', status: '400 Bad Request', desc: 'Checkout với địa chỉ rỗng' },
    { id: '019', ref: 'DP-019', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, role: 'admin', status: '200 OK', desc: 'Authorization token hợp lệ của Admin' },
    { id: '020', ref: 'DP-020', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, role: 'user', status: '403 Forbidden', desc: 'Authorization token của User thường khi gọi API Admin' }
];

orderDP.forEach(item => {
    const tcId = `TC-ORDER-DP-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (item.role === 'admin') headers['Authorization'] = 'Bearer {{admin_token}}';
    if (item.role === 'user') headers['Authorization'] = 'Bearer {{user_token}}';

    writeTC('FR-10-OrderState', tcId, {
        title: item.desc,
        technique: 'Domain Partition / Boundary Value Analysis',
        refId: item.ref,
        endpoint: `${item.method} ${item.path}`,
        objective: `Kiểm tra domain partition: ${item.desc}`,
        preconditions: [`User/Admin đã xác thực với vai trò ${item.role}`],
        method: item.method,
        url: `{{base_url}}${item.path}`,
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: item.status.startsWith('200') ? '- Xử lý thành công' : '- Bị từ chối với mã lỗi và message phù hợp',
        priority: 'Medium'
    });
});

const orderST = [
    { id: '001', ref: 'ST-001', from: 'pending', to: 'confirmed', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'confirmed' }, status: '200 OK', type: 'Valid', desc: 'Admin chuyển pending -> confirmed' },
    { id: '002', ref: 'ST-002', from: 'pending', to: 'canceled', role: 'user', method: 'PUT', path: '/api/orders/{{order_id}}/cancel', status: '200 OK', type: 'Valid', desc: 'User hủy đơn pending -> canceled' },
    { id: '003', ref: 'ST-003', from: 'pending', to: 'canceled', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'canceled' }, status: '200 OK', type: 'Valid', desc: 'Admin hủy đơn pending -> canceled' },
    { id: '004', ref: 'ST-004', from: 'confirmed', to: 'shipping', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'shipping' }, status: '200 OK', type: 'Valid', desc: 'Admin giao hàng confirmed -> shipping' },
    { id: '005', ref: 'ST-005', from: 'confirmed', to: 'canceled', role: 'user', method: 'PUT', path: '/api/orders/{{order_id}}/cancel', status: '200 OK', type: 'Valid', desc: 'User hủy đơn confirmed -> canceled' },
    { id: '006', ref: 'ST-006', from: 'confirmed', to: 'canceled', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'canceled' }, status: '200 OK', type: 'Valid', desc: 'Admin hủy đơn confirmed -> canceled' },
    { id: '007', ref: 'ST-007', from: 'shipping', to: 'delivered', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'delivered' }, status: '200 OK', type: 'Valid', desc: 'Admin hoàn tất giao hàng shipping -> delivered' },
    { id: '008', ref: 'ST-008', from: 'shipping', to: 'canceled', role: 'user', method: 'PUT', path: '/api/orders/{{order_id}}/cancel', status: '400 Bad Request', type: 'Invalid', desc: 'User cố hủy đơn khi đang shipping (Bị cấm)' },
    { id: '009', ref: 'ST-009', from: 'shipping', to: 'pending', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'pending' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển lùi trạng thái shipping -> pending' },
    { id: '010', ref: 'ST-010', from: 'shipping', to: 'confirmed', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'confirmed' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển lùi trạng thái shipping -> confirmed' },
    { id: '011', ref: 'ST-011', from: 'delivered', to: 'pending', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'pending' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển đổi từ Final State delivered -> pending' },
    { id: '012', ref: 'ST-012', from: 'delivered', to: 'shipping', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'shipping' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển đổi từ Final State delivered -> shipping' },
    { id: '013', ref: 'ST-013', from: 'delivered', to: 'canceled', role: 'user', method: 'PUT', path: '/api/orders/{{order_id}}/cancel', status: '400 Bad Request', type: 'Invalid', desc: 'Hủy đơn từ Final State delivered -> canceled' },
    { id: '014', ref: 'ST-014', from: 'canceled', to: 'delivered', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'delivered' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển đổi từ Final State canceled -> delivered (Bug kiểm thử)' },
    { id: '015', ref: 'ST-015', from: 'canceled', to: 'pending', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'pending' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển đổi từ Final State canceled -> pending' },
    { id: '016', ref: 'ST-016', from: 'canceled', to: 'confirmed', role: 'admin', method: 'PUT', path: '/api/admin/orders/{{order_id}}/status', body: { status: 'confirmed' }, status: '400 Bad Request', type: 'Invalid', desc: 'Chuyển đổi từ Final State canceled -> confirmed' }
];

orderST.forEach(item => {
    const tcId = `TC-ORDER-ST-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (item.role === 'admin') headers['Authorization'] = 'Bearer {{admin_token}}';
    if (item.role === 'user') headers['Authorization'] = 'Bearer {{user_token}}';

    writeTC('FR-10-OrderState', tcId, {
        title: item.desc,
        technique: 'State Transition Testing',
        refId: item.ref,
        endpoint: `${item.method} ${item.path}`,
        objective: `Kiểm tra chuyển đổi trạng thái đơn hàng từ '${item.from}' sang '${item.to}' (${item.type})`,
        preconditions: [`Đơn hàng đang ở trạng thái '${item.from}'`, `Tài khoản thực hiện có quyền ${item.role}`],
        method: item.method,
        url: `{{base_url}}${item.path}`,
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: item.type === 'Valid' ? `- Chuyển trạng thái thành công sang '${item.to}'` : `- Bị từ chối (400 Bad Request), trạng thái đơn hàng giữ nguyên '${item.from}'`,
        priority: 'High'
    });
});

const orderSEC = [
    { id: '001', ref: 'SEC-01-001', sec: 'SEC-01', title: 'SQL Injection trên :id khi User cancel đơn hàng', method: 'PUT', path: '/api/orders/1%20OR%201=1/cancel', role: 'user', status: '400/404', desc: 'Không làm lộ cú pháp lỗi SQL, parameterized query an toàn' },
    { id: '002', ref: 'SEC-01-002', sec: 'SEC-01', title: 'SQL Injection trong body status khi Admin update', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: "confirmed'; DROP TABLE orders; --" }, role: 'admin', status: '400 Bad Request', desc: 'Không drop table, sanitize enum hợp lệ' },
    { id: '003', ref: 'SEC-02-001', sec: 'SEC-02', title: 'IDOR - User A hủy đơn hàng của User B', method: 'PUT', path: '/api/orders/2/cancel', role: 'user_a', status: '404/403', desc: 'Chỉ hủy được đơn thuộc quyền sở hữu của User A' },
    { id: '004', ref: 'SEC-02-002', sec: 'SEC-02', title: 'IDOR - User A xem chi tiết đơn hàng của User B', method: 'GET', path: '/api/orders/2', role: 'user_a', status: '403/404', desc: 'Không xem được dữ liệu đơn hàng người khác' },
    { id: '005', ref: 'SEC-03-001', sec: 'SEC-03', title: 'Role Escalation - Regular User gọi API Admin update order status', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'delivered' }, role: 'user', status: '403 Forbidden', desc: 'Yêu cầu role admin, user thường bị từ chối' },
    { id: '006', ref: 'SEC-03-002', sec: 'SEC-03', title: 'Role Escalation - Regular User gọi API Admin xem toàn bộ đơn hàng', method: 'GET', path: '/api/admin/orders', role: 'user', status: '403 Forbidden', desc: 'User thường bị từ chối truy cập danh sách quản trị' },
    { id: '007', ref: 'SEC-04-001', sec: 'SEC-04', title: 'Auth Bypass - Gọi hủy đơn hàng không có token', method: 'PUT', path: '/api/orders/1/cancel', noAuth: true, status: '401 Unauthorized', desc: 'Từ chối khi thiếu header Authorization' },
    { id: '008', ref: 'SEC-04-002', sec: 'SEC-04', title: 'Auth Bypass - Gọi Admin update status không có token', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, noAuth: true, status: '401 Unauthorized', desc: 'Từ chối khi thiếu JWT' },
    { id: '009', ref: 'SEC-05-001', sec: 'SEC-05', title: 'Stored XSS trong shipping_address khi tạo đơn checkout', method: 'POST', path: '/api/checkout', body: { total_amount: 100000, shipping_address: "<script>alert('OrderXSS')</script>" }, role: 'user', status: '200 OK', desc: 'Địa chỉ được lưu và hiển thị an toàn, không render script' },
    { id: '010', ref: 'SEC-06-001', sec: 'SEC-06', title: 'Concurrency / Race Condition - Gửi 2 request hủy đơn liên tiếp', method: 'PUT', path: '/api/orders/1/cancel', role: 'user', status: '200/400', desc: 'Request 1 hủy thành công, request 2 bị từ chối do đơn đã canceled' },
    { id: '011', ref: 'SEC-07-001', sec: 'SEC-07', title: 'Sensitive Data Exposure - Kiểm tra dữ liệu lộ trong GET /api/admin/orders', method: 'GET', path: '/api/admin/orders', role: 'admin', status: '200 OK', desc: 'Không làm lộ mật khẩu, reset_token của user liên kết trong đơn' }
];

orderSEC.forEach(item => {
    const tcId = `TC-ORDER-SEC-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (item.role === 'admin') headers['Authorization'] = 'Bearer {{admin_token}}';
    if (item.role === 'user' || item.role === 'user_a') headers['Authorization'] = 'Bearer {{user_token}}';

    writeTC('FR-10-OrderState', tcId, {
        title: item.title,
        technique: `Security Testing (${item.sec})`,
        refId: item.ref,
        endpoint: `${item.method} ${item.path}`,
        objective: `Kiểm tra an ninh bảo mật: ${item.title}`,
        preconditions: ['Hệ thống đang hoạt động'],
        method: item.method,
        url: `{{base_url}}${item.path}`,
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- Response tuân thủ an toàn bảo mật: ${item.desc}`,
        securityBehavior: item.desc,
        priority: 'High'
    });
});

const orderSCH = [
    { id: '001', ref: 'SCH-001', title: 'Schema Validation cho POST /api/checkout (200 OK)', method: 'POST', path: '/api/checkout', body: { total_amount: 100000, shipping_address: '123 Le Loi' }, role: 'user', status: '200 OK', desc: 'JSON object có key `message` (string), `orderId` (number)' },
    { id: '002', ref: 'SCH-002', title: 'Schema Validation cho PUT /api/admin/orders/:id/status (200 OK)', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'confirmed' }, role: 'admin', status: '200 OK', desc: 'JSON object có key `message` (string: "Order status updated")' },
    { id: '003', ref: 'SCH-003', title: 'Schema Validation cho PUT /api/orders/:id/cancel (200 OK)', method: 'PUT', path: '/api/orders/1/cancel', role: 'user', status: '200 OK', desc: 'JSON object có key `message` (string: "Order canceled successfully")' },
    { id: '004', ref: 'SCH-004', title: 'Schema Validation khi chuyển trạng thái sai (400 Bad Request)', method: 'PUT', path: '/api/admin/orders/1/status', body: { status: 'unknown' }, role: 'admin', status: '400 Bad Request', desc: 'JSON object có key `error` (string)' },
    { id: '005', ref: 'SCH-005', title: 'Schema Validation khi không tìm thấy đơn hàng (404 Not Found)', method: 'PUT', path: '/api/orders/999999/cancel', role: 'user', status: '404 Not Found', desc: 'JSON object có key `error` (string)' },
    { id: '006', ref: 'SCH-006', title: 'Schema Validation cho GET /api/orders/my-orders (200 OK)', method: 'GET', path: '/api/orders/my-orders', role: 'user', status: '200 OK', desc: 'Mảng các objects với các trường `id`, `user_id`, `total_amount`, `status`, `shipping_address`, `created_at`' }
];

orderSCH.forEach(item => {
    const tcId = `TC-ORDER-SCH-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (item.role === 'admin') headers['Authorization'] = 'Bearer {{admin_token}}';
    if (item.role === 'user') headers['Authorization'] = 'Bearer {{user_token}}';

    writeTC('FR-10-OrderState', tcId, {
        title: item.title,
        technique: 'Schema Validation Testing',
        refId: item.ref,
        endpoint: `${item.method} ${item.path}`,
        objective: `Kiểm tra schema response: ${item.title}`,
        preconditions: ['Hệ thống có dữ liệu tương ứng'],
        method: item.method,
        url: `{{base_url}}${item.path}`,
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- ${item.desc}`,
        priority: 'Medium'
    });
});

// =========================================================================
// 3. FR-16: PRODUCT IMPORT TEST CASES (49 TCs)
// =========================================================================
const importDP = [
    { id: '001', ref: 'DP-001', body: { products: [{ name: 'SP 1', price: 10000, description: 'Mo ta 1', imageUrl: '', category_id: 1 }] }, status: '200 OK', desc: 'Import mảng 1 sản phẩm hợp lệ' },
    { id: '002', ref: 'DP-002', body: { products: [{ name: 'SP A', price: 10000 }, { name: 'SP B', price: 20000 }, { name: 'SP C', price: 30000 }] }, status: '200 OK', desc: 'Import mảng nhiều sản phẩm hợp lệ' },
    { id: '003', ref: 'DP-003', body: { products: [] }, status: '400 Bad Request', desc: 'Import mảng rỗng []' },
    { id: '004', ref: 'DP-004', body: {}, status: '400 Bad Request', desc: 'Thiếu key products hoặc body rỗng' },
    { id: '005', ref: 'DP-005', body: { products: 'not_an_array' }, status: '400 Bad Request', desc: 'Key products không phải dạng mảng (chuỗi)' },
    { id: '006', ref: 'DP-006', body: { products: null }, status: '400 Bad Request', desc: 'Key products có giá trị null' },
    { id: '007', ref: 'DP-007', body: { products: [{ name: 'iPhone 16 Pro Max', price: 35000000, category_id: 1 }] }, status: '200 OK', desc: 'Tên sản phẩm chữ cái và số chuẩn' },
    { id: '008', ref: 'DP-008', body: { products: [{ name: 'Ốp lưng da chống sốc', price: 250000, category_id: 3 }] }, status: '200 OK', desc: 'Tên sản phẩm tiếng Việt có dấu' },
    { id: '009', ref: 'DP-009', body: { products: [{ name: '', price: 100000, category_id: 1 }] }, status: '400/200 Error', desc: 'Tên sản phẩm là chuỗi rỗng' },
    { id: '010', ref: 'DP-010', body: { products: [{ name: '   ', price: 100000, category_id: 1 }] }, status: '400/200 Error', desc: 'Tên sản phẩm chỉ chứa khoảng trắng' },
    { id: '011', ref: 'DP-011', body: { products: [{ price: 100000, category_id: 1 }] }, status: '400/200 Error', desc: 'Thiếu trường name trong item' },
    { id: '012', ref: 'DP-012', body: { products: [{ name: 'S'.repeat(255), price: 100000, category_id: 1 }] }, status: '200 OK', desc: 'Biên trên độ dài tên sản phẩm: 255 ký tự' },
    { id: '013', ref: 'DP-013', body: { products: [{ name: 'S'.repeat(256), price: 100000, category_id: 1 }] }, status: '400/200 Error', desc: 'Vượt biên độ dài tên sản phẩm: 256 ký tự' },
    { id: '014', ref: 'DP-014', body: { products: [{ name: 'SP Test', price: 100000, category_id: 1 }] }, status: '200 OK', desc: 'Giá sản phẩm là số nguyên dương hợp lệ' },
    { id: '015', ref: 'DP-015', body: { products: [{ name: 'SP Test', price: 1, category_id: 1 }] }, status: '200 OK', desc: 'Biên dưới giá sản phẩm: 1 ₫' },
    { id: '016', ref: 'DP-016', body: { products: [{ name: 'SP Test', price: 0, category_id: 1 }] }, status: '400/200 Error', desc: 'Giá sản phẩm bằng 0 (Vi phạm price > 0)' },
    { id: '017', ref: 'DP-017', body: { products: [{ name: 'SP Test', price: -50000, category_id: 1 }] }, status: '400/200 Error', desc: 'Giá sản phẩm là số âm' },
    { id: '018', ref: 'DP-018', body: { products: [{ name: 'SP Test', price: 'free', category_id: 1 }] }, status: '400/200 Error', desc: 'Giá sản phẩm là chuỗi ký tự' },
    { id: '019', ref: 'DP-019', body: { products: [{ name: 'SP Test', category_id: 1 }] }, status: '400/200 Error', desc: 'Thiếu trường price trong item' },
    { id: '020', ref: 'DP-020', body: { products: [{ name: 'SP Test', price: 100000, category_id: 1 }] }, status: '200 OK', desc: 'category_id hợp lệ tồn tại trong CSDL' },
    { id: '021', ref: 'DP-021', body: { products: [{ name: 'SP Test', price: 100000, category_id: 9999 }] }, status: '400/200 Error', desc: 'category_id không tồn tại trong CSDL' },
    { id: '022', ref: 'DP-022', body: { products: [{ name: 'SP Test', price: 100000, category_id: -1 }] }, status: '400/200 Error', desc: 'category_id là số âm' },
    { id: '023', ref: 'DP-023', body: { products: [{ name: 'SP Test', price: 100000, imageUrl: 'https://placehold.co/300.png' }] }, status: '200 OK', desc: 'imageUrl hợp lệ' },
    { id: '024', ref: 'DP-024', body: { products: [{ name: 'SP Test', price: 100000, description: 'Mô tả chi tiết sản phẩm\nNhiều dòng' }] }, status: '200 OK', desc: 'Mô tả sản phẩm có xuống dòng' },
    { id: '025', ref: 'DP-025', customAuth: 'admin', status: '200 OK', desc: 'Header Authorization hợp lệ của Admin' },
    { id: '026', ref: 'DP-026', customAuth: 'user', status: '403 Forbidden', desc: 'Header Authorization của User thường (Không có quyền admin)' },
    { id: '027', ref: 'DP-027', customAuth: 'none', status: '401 Unauthorized', desc: 'Không truyền Header Authorization' }
];

importDP.forEach(item => {
    const tcId = `TC-IMPORT-DP-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (item.customAuth === 'admin' || !item.customAuth) headers['Authorization'] = 'Bearer {{admin_token}}';
    if (item.customAuth === 'user') headers['Authorization'] = 'Bearer {{user_token}}';
    
    const reqBody = item.body || { products: [{ name: 'Sample', price: 10000 }] };

    writeTC('FR-16-ProductImport', tcId, {
        title: item.desc,
        technique: 'Domain Partition / Boundary Value Analysis',
        refId: item.ref,
        endpoint: 'POST /api/admin/import-products',
        objective: `Kiểm tra domain partition import: ${item.desc}`,
        preconditions: ['Admin đã đăng nhập với Bearer token'],
        method: 'POST',
        url: '{{base_url}}/api/admin/import-products',
        headers: headers,
        body: reqBody,
        expectedStatus: item.status,
        expectedBodyDesc: item.status.startsWith('200') ? '- Import xử lý thành công hoặc báo cáo kết quả tương ứng' : '- Bị từ chối với lỗi phù hợp',
        priority: 'Medium'
    });
});

const importST = [
    { id: '001', ref: 'ST-001', title: 'Import danh sách 3 sản phẩm hợp lệ toàn bộ', body: { products: [{ name: 'SP Import 1', price: 100000, category_id: 1 }, { name: 'SP Import 2', price: 200000, category_id: 2 }, { name: 'SP Import 3', price: 300000, category_id: 3 }] }, status: '200 OK', desc: 'CSDL tăng chính xác 3 sản phẩm mới' },
    { id: '002', ref: 'ST-002', title: 'Rollback nguyên tử khi SP số 2 có giá âm (-100000)', body: { products: [{ name: 'SP Hop Le 1', price: 100000, category_id: 1 }, { name: 'SP Loi 2', price: -100000, category_id: 1 }, { name: 'SP Hop Le 3', price: 200000, category_id: 1 }] }, status: '400/200 Error', desc: 'All-or-Nothing Rollback: CSDL KHÔNG được chèn bất kỳ sản phẩm nào trong lô này' },
    { id: '003', ref: 'ST-003', title: 'Rollback nguyên tử khi SP số 2 thiếu trường name', body: { products: [{ name: 'SP Hop Le 1', price: 100000, category_id: 1 }, { price: 200000, category_id: 1 }, { name: 'SP Hop Le 3', price: 300000, category_id: 1 }] }, status: '400/200 Error', desc: 'All-or-Nothing Rollback: Toàn bộ lô import bị hủy, CSDL giữ nguyên vẹn' },
    { id: '004', ref: 'ST-004', title: 'Rollback nguyên tử khi category_id không tồn tại (9999)', body: { products: [{ name: 'SP Hop Le 1', price: 100000, category_id: 1 }, { name: 'SP Sai Category', price: 200000, category_id: 9999 }] }, status: '400/200 Error', desc: 'Rollback toàn bộ lô import do vi phạm ràng buộc' },
    { id: '005', ref: 'ST-005', title: 'Import lại thành công sau khi sửa toàn bộ dữ liệu lỗi', body: { products: [{ name: 'SP Da Sua 1', price: 100000, category_id: 1 }, { name: 'SP Da Sua 2', price: 200000, category_id: 1 }] }, status: '200 OK', desc: 'Import thành công trọn vẹn lô mới' }
];

importST.forEach(item => {
    const tcId = `TC-IMPORT-ST-${item.id}`;
    writeTC('FR-16-ProductImport', tcId, {
        title: item.title,
        technique: 'State Transition & Transactional Integrity Testing',
        refId: item.ref,
        endpoint: 'POST /api/admin/import-products',
        objective: `Kiểm tra tính toàn vẹn giao dịch nguyên tử (Atomic Rollback): ${item.title}`,
        preconditions: ['Admin có quyền quản trị'],
        method: 'POST',
        url: '{{base_url}}/api/admin/import-products',
        headers: {
            'Authorization': 'Bearer {{admin_token}}',
            'Content-Type': 'application/json',
            'X-Student-Id': '{{student_id}}'
        },
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- ${item.desc}`,
        priority: 'High'
    });
});

const importSEC = [
    { id: '001', ref: 'SEC-01-001', sec: 'SEC-01', title: 'SQL Injection trong trường name sản phẩm', body: { products: [{ name: "iPhone 16', 1000, '', '', 1); DROP TABLE products; --", price: 100000, category_id: 1 }] }, status: '200/400', desc: 'Không làm drop table hoặc hỏng cấu trúc SQL' },
    { id: '002', ref: 'SEC-01-002', sec: 'SEC-01', title: 'SQL Injection trong description', body: { products: [{ name: 'SP Test', price: 100000, description: "Mo ta' OR '1'='1", category_id: 1 }] }, status: '200/400', desc: 'Lưu an toàn dạng text, không làm sai lệch truy vấn' },
    { id: '003', ref: 'SEC-01-003', sec: 'SEC-01', title: 'SQL Injection trong imageUrl', body: { products: [{ name: 'SP Test', price: 100000, imageUrl: "http://test.com' UNION SELECT 1,2,3--", category_id: 1 }] }, status: '200/400', desc: 'Sanitize an toàn' },
    { id: '004', ref: 'SEC-02-001', sec: 'SEC-02', title: 'IDOR - Thử ghi đè thông tin sản phẩm hoặc danh mục trái phép', body: { products: [{ id: 1, name: 'Overwrite Attempt', price: 100000, category_id: 1 }] }, status: '200 OK', desc: 'Chỉ thực hiện thêm mới theo logic import' },
    { id: '005', ref: 'SEC-03-001', sec: 'SEC-03', title: 'Role Escalation - User thường gọi API Import của Admin', role: 'user', body: { products: [{ name: 'Hacked Product', price: 1000 }] }, status: '403 Forbidden', desc: 'Chặn truy cập đối với tài khoản không phải Admin' },
    { id: '006', ref: 'SEC-03-002', sec: 'SEC-03', title: 'Role Escalation - Giả mạo quyền Admin trong body hoặc header', role: 'user', body: { products: [{ name: 'Hacked Product', price: 1000 }], isAdmin: true }, status: '403 Forbidden', desc: 'Không thể bypass kiểm tra phân quyền' },
    { id: '007', ref: 'SEC-04-001', sec: 'SEC-04', title: 'Auth Bypass - Gọi POST /api/admin/import-products không có token', noAuth: true, body: { products: [{ name: 'SP 1', price: 10000 }] }, status: '401 Unauthorized', desc: 'Chặn truy cập khi thiếu Authorization header' },
    { id: '008', ref: 'SEC-04-002', sec: 'SEC-04', title: 'Auth Bypass - Gọi API với Token chữ ký giả mạo', fakeToken: true, body: { products: [{ name: 'SP 1', price: 10000 }] }, status: '403 Forbidden', desc: 'Chặn truy cập khi JWT Signature sai' },
    { id: '009', ref: 'SEC-05-001', sec: 'SEC-05', title: 'Stored XSS trong trường name sản phẩm', body: { products: [{ name: "<script>alert('XSS_Product')</script>", price: 100000, category_id: 1 }] }, status: '200/400', desc: 'Tên được sanitize/escape khi hiển thị trên giao diện' },
    { id: '010', ref: 'SEC-05-002', sec: 'SEC-05', title: 'Stored XSS trong trường description', body: { products: [{ name: 'SP XSS', price: 100000, description: "<svg/onload=alert('XSS_Desc')>", category_id: 1 }] }, status: '200/400', desc: 'Mô tả được sanitize an toàn' },
    { id: '011', ref: 'SEC-06-001', sec: 'SEC-06', title: 'DoS / Bulk Payload Exhaustion - Gửi mảng 10,000 items', isLarge: true, status: '413/400/200', desc: 'Server kiểm soát kích thước payload hoặc từ chối an toàn, không tràn bộ nhớ' },
    { id: '012', ref: 'SEC-07-001', sec: 'SEC-07', title: 'Sensitive Data Exposure - Báo cáo lỗi không làm lộ chi tiết SQL', body: { products: [{ name: 'Test', price: 'invalid_price' }] }, status: '200/400', desc: 'Thông báo lỗi thân thiện, không làm lộ stack trace nội bộ của SQLite' }
];

importSEC.forEach(item => {
    const tcId = `TC-IMPORT-SEC-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (!item.noAuth && !item.fakeToken) {
        headers['Authorization'] = item.role === 'user' ? 'Bearer {{user_token}}' : 'Bearer {{admin_token}}';
    }
    if (item.fakeToken) headers['Authorization'] = 'Bearer forged.admin.token';

    let reqBody = item.body;
    if (item.isLarge) {
        reqBody = { products: Array.from({ length: 500 }, (_, i) => ({ name: `Bulk SP ${i}`, price: 10000, category_id: 1 })) };
    }

    writeTC('FR-16-ProductImport', tcId, {
        title: item.title,
        technique: `Security Testing (${item.sec})`,
        refId: item.ref,
        endpoint: 'POST /api/admin/import-products',
        objective: `Kiểm tra an ninh bảo mật import: ${item.title}`,
        preconditions: ['Hệ thống đang hoạt động'],
        method: 'POST',
        url: '{{base_url}}/api/admin/import-products',
        headers: headers,
        body: reqBody,
        expectedStatus: item.status,
        expectedBodyDesc: `- Response tuân thủ an toàn bảo mật: ${item.desc}`,
        securityBehavior: item.desc,
        priority: 'High'
    });
});

const importSCH = [
    { id: '001', ref: 'SCH-001', title: 'Schema Validation khi Import thành công (200 OK)', body: { products: [{ name: 'SP Test Schema', price: 100000, category_id: 1 }] }, status: '200 OK', desc: 'JSON object có `message` (string), `inserted` (number), `errors` (array)' },
    { id: '002', ref: 'SCH-002', title: 'Schema Validation khi Body rỗng (400 Bad Request)', body: {}, status: '400 Bad Request', desc: 'JSON object có key `error` (string: "Không có dữ liệu để import")' },
    { id: '003', ref: 'SCH-003', title: 'Schema Validation khi chưa xác thực (401 Unauthorized)', noAuth: true, body: { products: [{ name: 'SP', price: 1000 }] }, status: '401 Unauthorized', desc: 'JSON object có key `error` (string: "Unauthorized")' },
    { id: '004', ref: 'SCH-004', title: 'Schema Validation khi không có quyền Admin (403 Forbidden)', role: 'user', body: { products: [{ name: 'SP', price: 1000 }] }, status: '403 Forbidden', desc: 'JSON object có key `error` (string)' },
    { id: '005', ref: 'SCH-005', title: 'Schema Validation cho mảng errors khi có dòng lỗi', body: { products: [{ price: 100000 }] }, status: '200 OK', desc: 'Mảng `errors` chứa các chuỗi string mô tả: "Hàng 2: Thiếu tên sản phẩm"' }
];

importSCH.forEach(item => {
    const tcId = `TC-IMPORT-SCH-${item.id}`;
    let headers = { 'Content-Type': 'application/json', 'X-Student-Id': '{{student_id}}' };
    if (!item.noAuth) headers['Authorization'] = item.role === 'user' ? 'Bearer {{user_token}}' : 'Bearer {{admin_token}}';

    writeTC('FR-16-ProductImport', tcId, {
        title: item.title,
        technique: 'Schema Validation Testing',
        refId: item.ref,
        endpoint: 'POST /api/admin/import-products',
        objective: `Đối chiếu schema response: ${item.title}`,
        preconditions: ['Admin có quyền thực thi API'],
        method: 'POST',
        url: '{{base_url}}/api/admin/import-products',
        headers: headers,
        body: item.body,
        expectedStatus: item.status,
        expectedBodyDesc: `- ${item.desc}`,
        priority: 'Medium'
    });
});

console.log('ALL TEST CASES GENERATED SUCCESSFULLY.');
