const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_OWNER = 'iamDicun';
const REPO_NAME = 'Group06_HW2_Testing';
const TOKEN = process.argv[2] || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!TOKEN) {
  console.log('\x1b[33m%s\x1b[0m', 'Chưa có GitHub Token!');
  console.log('Bạn có thể chạy script bằng một trong hai cách:');
  console.log('  1. Truyền token trực tiếp: node push_issues_to_github.js <GITHUB_TOKEN>');
  console.log('  2. Set biến môi trường: $env:GITHUB_TOKEN="ghp_..."; node push_issues_to_github.js');
  console.log('  3. Hoặc dùng GitHub CLI: gh auth login rồi chạy .\\push_issues_to_github.ps1\n');
  process.exit(1);
}

const issues = [
  {
    bugId: 'BUG-01',
    file: path.join(__dirname, '.github', 'issues', 'BUG-01-role-escalation.md'),
    title: '[BUG][FR-04]: Privilege Escalation via Mass Assignment on User Profile Update',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-02',
    file: path.join(__dirname, '.github', 'issues', 'BUG-02-sensitive-data-exposure.md'),
    title: '[BUG][FR-04]: Sensitive Data Exposure Leaking Plaintext Passwords and Reset Tokens via GET /api/users/me',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-03',
    file: path.join(__dirname, '.github', 'issues', 'BUG-03-final-state-violation.md'),
    title: '[BUG][FR-10]: State Machine Violation Allowing Invalid Transition from Final State Canceled to Delivered',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-04',
    file: path.join(__dirname, '.github', 'issues', 'BUG-04-shipping-cancel-logic.md'),
    title: '[BUG][FR-10]: Broken Cancellation Logic Permitting Regular Users to Cancel In-Transit (Shipping) Orders',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-05',
    file: path.join(__dirname, '.github', 'issues', 'BUG-05-broken-access-control.md'),
    title: '[BUG][FR-10/FR-16]: Broken Access Control on Administrative Endpoints Due to Missing Role Authorization',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-06',
    file: path.join(__dirname, '.github', 'issues', 'BUG-06-atomic-rollback-violation.md'),
    title: '[BUG][FR-16]: Violation of Atomic All-or-Nothing Transaction on Product CSV Batch Import',
    labels: ['type: bug', 'status: new']
  },
  {
    bugId: 'BUG-07',
    file: path.join(__dirname, '.github', 'issues', 'BUG-07-missing-price-validation.md'),
    title: '[BUG][FR-16]: Missing Validation on Product Price Permitting Negative or Zero Price Import',
    labels: ['type: bug', 'status: new']
  }
];

function createIssue(item) {
  return new Promise((resolve, reject) => {
    let content = fs.readFileSync(item.file, 'utf8');
    // Bỏ frontmatter nếu có
    const body = content.replace(/^---[\s\S]*?---\s*/, '').trim();

    const postData = JSON.stringify({
      title: item.title,
      body: body,
      labels: item.labels
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      method: 'POST',
      headers: {
        'User-Agent': 'NodeJS-GitHub-Issue-Creator',
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const resJson = JSON.parse(data);
          resolve({ bugId: item.bugId, url: resJson.html_url, number: resJson.number });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log(`Đang đẩy 7 Bug Reports lên GitHub repo: ${REPO_OWNER}/${REPO_NAME}...\n`);
  const results = [];
  for (const item of issues) {
    try {
      console.log(`Đang tạo ${item.bugId}: ${item.title}...`);
      const res = await createIssue(item);
      console.log(`  => Thành công: ${res.url}`);
      results.push(res);
    } catch (err) {
      console.error(`  => Thất bại: ${err.message}`);
    }
  }

  console.log('\n==========================================');
  console.log('Tổng kết kết quả tạo GitHub Issues:');
  results.forEach(r => console.log(`${r.bugId}: ${r.url}`));
}

main();
