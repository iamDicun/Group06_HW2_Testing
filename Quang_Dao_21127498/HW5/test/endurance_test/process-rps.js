/**
 * process-rps.js
 *
 * MỤC ĐÍCH: Xử lý file raw JSON của k6 (--out json) theo kiểu streaming
 * (đọc từng dòng một, không load hết file vào RAM) để tính RPS theo từng
 * giây - dùng cho việc xác định "maximum stable RPS" của Endurance Test.
 * Chạy được với file dung lượng bất kỳ (900MB, 5GB... đều không vấn đề).
 *
 * CÁCH DÙNG:
 *   node process-rps.js <file-json-dau-vao> <file-csv-dau-ra>
 *
 * VÍ DỤ:
 *   node process-rps.js endurance-test-raw.json rps-per-second.csv
 */

const fs = require('fs');
const readline = require('readline');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'rps-per-second.csv';

if (!inputFile) {
  console.error('Thiếu tên file đầu vào. Cách dùng: node process-rps.js <input.json> [output.csv]');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Không tìm thấy file: ${inputFile}`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(inputFile), // stream - đọc từng khối nhỏ, không load hết file
  crlfDelay: Infinity,
});

const countsPerSecond = new Map(); // key: "YYYY-MM-DDTHH:mm:ss", value: số request trong giây đó
let lineCount = 0;
let matchedCount = 0;
const startTime = Date.now();

rl.on('line', (line) => {
  lineCount++;
  if (!line) return;

  let obj;
  try {
    obj = JSON.parse(line);
  } catch (e) {
    return; // bỏ qua dòng lỗi định dạng (hiếm khi xảy ra, an toàn để bỏ qua)
  }

  // Chỉ đếm metric "http_reqs" - mỗi Point ở metric này = đúng 1 request thật
  if (obj.metric !== 'http_reqs') return;

  const time = obj.data && obj.data.time;
  if (!time) return;

  const secondKey = time.slice(0, 19); // cắt đến độ chính xác giây (bỏ mili giây)
  countsPerSecond.set(secondKey, (countsPerSecond.get(secondKey) || 0) + 1);
  matchedCount++;

  if (lineCount % 2000000 === 0) {
    console.log(`Đã xử lý ${(lineCount / 1000000).toFixed(1)}M dòng...`);
  }
});

rl.on('close', () => {
  const rows = Array.from(countsPerSecond.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const csvLines = ['timestamp,requests_per_second', ...rows.map(([t, c]) => `${t},${c}`)];
  fs.writeFileSync(outputFile, csvLines.join('\n'));

  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const rpsValues = rows.map(([, c]) => c);
  const avg = rpsValues.length ? (rpsValues.reduce((a, b) => a + b, 0) / rpsValues.length).toFixed(1) : 0;
  const max = rpsValues.length ? Math.max(...rpsValues) : 0;
  const min = rpsValues.length ? Math.min(...rpsValues) : 0;

  console.log(`\nHoàn tất trong ${elapsedSec}s.`);
  console.log(`Tổng số dòng đọc: ${lineCount.toLocaleString()}`);
  console.log(`Số request (http_reqs) tìm thấy: ${matchedCount.toLocaleString()}`);
  console.log(`Số giây có dữ liệu: ${rows.length}`);
  console.log(`RPS trung bình: ${avg} req/s | Min: ${min} | Max: ${max}`);
  console.log(`\nKết quả chi tiết theo từng giây đã lưu tại: ${outputFile}`);
  console.log(`Mở file này bằng Excel để: (1) bỏ 60 giây đầu + 60 giây cuối (ramp-up/down),`);
  console.log(`(2) tính trung bình phần còn lại = "maximum stable RPS", (3) vẽ biểu đồ xem có xu hướng giảm dần không.`);
});
