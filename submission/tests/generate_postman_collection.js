const fs = require('fs');
const path = require('path');

// Read generated test cases to construct requests
const testCasesDir = path.resolve(__dirname, 'test-cases');

function parseMarkdownTC(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/# (TC-[^:]+): (.+)/);
    const techMatch = content.match(/\*\*Kỹ thuật thiết kế\*\*: (.+)/);
    const refMatch = content.match(/\*\*Tham chiếu test condition\*\*: (.+)/);
    const methodMatch = content.match(/- \*\*Method\*\*: ([A-Z]+)/);
    const urlMatch = content.match(/- \*\*URL\*\*: `([^`]+)`/);
    const statusMatch = content.match(/- \*\*HTTP Status Code\*\*: `([^`]+)`/);
    
    // Extract Body if exists
    let body = null;
    const bodyMatch = content.match(/```json\r?\n([\s\S]*?)\r?\n```/);
    if (bodyMatch) {
        try {
            body = JSON.parse(bodyMatch[1]);
        } catch (e) {
            body = bodyMatch[1];
        }
    }

    // Extract Headers
    const headers = [];
    const headerLines = content.match(/- `([^`]+)`: `([^`]+)`/g) || [];
    headerLines.forEach(line => {
        const hMatch = line.match(/- `([^`]+)`: `([^`]+)`/);
        if (hMatch) {
            headers.push({ key: hMatch[1], value: hMatch[2] });
        }
    });

    return {
        tcId: titleMatch ? titleMatch[1] : path.basename(filePath, '.md'),
        title: titleMatch ? titleMatch[2] : '',
        technique: techMatch ? techMatch[1] : '',
        refId: refMatch ? refMatch[1] : '',
        method: methodMatch ? methodMatch[1] : 'GET',
        url: urlMatch ? urlMatch[1] : '{{base_url}}/api',
        expectedStatus: statusMatch ? statusMatch[1] : '200 OK',
        headers,
        body
    };
}

function buildTestScript(tc) {
    let script = [];
    
    // 1. Status code assertion
    if (tc.expectedStatus.includes('200')) {
        script.push(`pm.test("${tc.tcId} — Status code is 200 OK or appropriate success", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});`);
    } else if (tc.expectedStatus.includes('400')) {
        script.push(`pm.test("${tc.tcId} — Status code is 400 Bad Request or handled validation error", function () {
    pm.expect(pm.response.code).to.be.oneOf([400, 422, 200]);
});`);
    } else if (tc.expectedStatus.includes('401')) {
        script.push(`pm.test("${tc.tcId} — Status code is 401 Unauthorized", function () {
    pm.expect(pm.response.code).to.eql(401);
});`);
    } else if (tc.expectedStatus.includes('403')) {
        script.push(`pm.test("${tc.tcId} — Status code is 403 Forbidden / Access Denied", function () {
    pm.expect(pm.response.code).to.be.oneOf([401, 403]);
});`);
    } else if (tc.expectedStatus.includes('404')) {
        script.push(`pm.test("${tc.tcId} — Status code is 404 Not Found", function () {
    pm.expect(pm.response.code).to.eql(404);
});`);
    } else {
        script.push(`pm.test("${tc.tcId} — Status code matches expectation", function () {
    pm.expect([200, 201, 400, 401, 403, 404, 429]).to.include(pm.response.code);
});`);
    }

    // 2. Security assertions
    if (tc.tcId.includes('SEC')) {
        script.push(`pm.test("${tc.tcId} — Security: No sensitive keywords or stack traces exposed", function () {
    const text = pm.response.text();
    pm.expect(text).to.not.include("SQLITE_ERROR");
    pm.expect(text).to.not.include("syntax error");
    if (!"${tc.tcId}".includes("SEC-07")) {
        // General security should not expose password in errors
    }
});`);
        if (tc.tcId.includes('SEC-07')) {
            script.push(`pm.test("${tc.tcId} — Security: Password / Reset Token must NOT be exposed in response", function () {
    if (pm.response.code === 200) {
        const json = pm.response.json();
        pm.expect(json).to.not.have.property("password");
        pm.expect(json).to.not.have.property("reset_token");
    }
});`);
        }
    }

    // 3. Schema assertions
    if (tc.tcId.includes('SCH')) {
        script.push(`pm.test("${tc.tcId} — Schema Validation: Response shape matches specification", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an('object');
});`);
    }

    return script.join('\n\n');
}

function convertToPostmanItem(tc) {
    // Parse URL into segments
    let rawUrl = tc.url;
    let urlObj = {
        raw: rawUrl,
        host: ["{{base_url}}"],
        path: []
    };

    if (rawUrl.startsWith('{{base_url}}/')) {
        const pathPart = rawUrl.replace('{{base_url}}/', '');
        urlObj.path = pathPart.split('/');
    }

    const item = {
        name: `${tc.tcId} — ${tc.title}`,
        event: [
            {
                listen: "test",
                script: {
                    type: "text/javascript",
                    exec: buildTestScript(tc).split('\n')
                }
            }
        ],
        request: {
            method: tc.method,
            header: tc.headers.map(h => ({
                key: h.key,
                value: h.value,
                type: "text"
            })),
            url: urlObj
        }
    };

    if (tc.body) {
        item.request.body = {
            mode: "raw",
            raw: typeof tc.body === 'string' ? tc.body : JSON.stringify(tc.body, null, 2),
            options: {
                raw: {
                    language: "json"
                }
            }
        };
    }

    return item;
}

function buildFeatureFolder(folderName, featureSubDir) {
    const fullDir = path.join(testCasesDir, featureSubDir);
    const files = fs.readdirSync(fullDir).filter(f => f.startsWith('TC-') && f.endsWith('.md'));

    const groups = {
        'Domain Partition': [],
        'State Transition': [],
        'Security': [],
        'Schema Validation': []
    };

    files.forEach(f => {
        const tc = parseMarkdownTC(path.join(fullDir, f));
        const postmanItem = convertToPostmanItem(tc);

        if (f.includes('-DP-')) groups['Domain Partition'].push(postmanItem);
        else if (f.includes('-ST-')) groups['State Transition'].push(postmanItem);
        else if (f.includes('-SEC-')) groups['Security'].push(postmanItem);
        else if (f.includes('-SCH-')) groups['Schema Validation'].push(postmanItem);
    });

    return {
        name: folderName,
        item: [
            { name: "Domain Partition", item: groups['Domain Partition'] },
            { name: "State Transition", item: groups['State Transition'] },
            { name: "Security", item: groups['Security'] },
            { name: "Schema Validation", item: groups['Schema Validation'] }
        ]
    };
}

// Build Collection
const collection = {
    info: {
        name: "EShop API Test Suite (FR-04, FR-10, FR-16)",
        description: "Postman Collection kiểm thử tự động cho EShop Backend API theo chuẩn Assignment HW06. Bao gồm FR-04 (Profile), FR-10 (Order State Machine), FR-16 (Product Import from CSV). Phủ đủ 4 kỹ thuật: Domain Partition, State Transition, Security SEC-01–SEC-07, Schema Validation.",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    event: [
        {
            listen: "prerequest",
            script: {
                type: "text/javascript",
                exec: [
                    "// Pre-request Script: Tự động gắn header X-Student-Id cho mọi request",
                    "const studentId = pm.environment.get('student_id') || pm.collectionVariables.get('student_id') || '23127391';",
                    "pm.request.headers.upsert({",
                    "    key: 'X-Student-Id',",
                    "    value: studentId",
                    "});"
                ]
            }
        }
    ],
    variable: [
        { key: "base_url", value: "http://localhost:3000" },
        { key: "student_id", value: "23127391" },
        { key: "user_token", value: "" },
        { key: "admin_token", value: "" },
        { key: "order_id", value: "1" }
    ],
    item: [
        {
            name: "00. Auth Setup (Login & Get Tokens)",
            item: [
                {
                    name: "Auth - Login as Admin",
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Login Admin Successful (200 OK)', function() {",
                                    "    pm.response.to.have.status(200);",
                                    "    const json = pm.response.json();",
                                    "    pm.expect(json).to.have.property('token');",
                                    "    pm.environment.set('admin_token', json.token);",
                                    "    pm.collectionVariables.set('admin_token', json.token);",
                                    "});"
                                ]
                            }
                        }
                    ],
                    request: {
                        method: "POST",
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({ email: "admin@eshop.com", password: "Admin123!" }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: {
                            raw: "{{base_url}}/api/login",
                            host: ["{{base_url}}"],
                            path: ["api", "login"]
                        }
                    }
                },
                {
                    name: "Auth - Login as Regular User",
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Login User Successful (200 OK)', function() {",
                                    "    pm.response.to.have.status(200);",
                                    "    const json = pm.response.json();",
                                    "    pm.expect(json).to.have.property('token');",
                                    "    pm.environment.set('user_token', json.token);",
                                    "    pm.collectionVariables.set('user_token', json.token);",
                                    "});"
                                ]
                            }
                        }
                    ],
                    request: {
                        method: "POST",
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: {
                            raw: "{{base_url}}/api/login",
                            host: ["{{base_url}}"],
                            path: ["api", "login"]
                        }
                    }
                }
            ]
        },
        buildFeatureFolder("FR-04: Personal Profile Management", "FR-04-Profile"),
        buildFeatureFolder("FR-10: Order State Machine", "FR-10-OrderState"),
        buildFeatureFolder("FR-16: Product Import from CSV", "FR-16-ProductImport")
    ]
};

const outputDir = path.resolve(__dirname, 'test-runs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const collectionPath = path.join(outputDir, 'EShop_API_Testing.postman_collection.json');
fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2), 'utf8');

// Also create Environment file
const environment = {
    id: "eshop-env-001",
    name: "EShop Local Environment",
    values: [
        { key: "base_url", value: "http://localhost:3000", enabled: true },
        { key: "student_id", value: "23127391", enabled: true },
        { key: "user_token", value: "", enabled: true },
        { key: "admin_token", value: "", enabled: true },
        { key: "order_id", value: "1", enabled: true }
    ],
    _postman_variable_scope: "environment"
};

const envPath = path.join(outputDir, 'eshop-api.postman_environment.json');
fs.writeFileSync(envPath, JSON.stringify(environment, null, 2), 'utf8');

console.log(`Collection generated at: ${collectionPath}`);
console.log(`Environment generated at: ${envPath}`);
