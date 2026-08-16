# [BUG][Performance] Server nghẽn luồng và treo thread khi dội Spike Test 200 VUs

## Found by Test Case
TC-PERF-001

## Requirement Related
FR-PERF-01: He thong phai xu ly on dinh voi 200 VUs dong thoi

## Severity / Priority
Critical / P1

## Environment
- **Browser:** JMeter GUI 5.6.3
- **OS:** Windows 11 Pro
- **URL:** http://localhost:3000
- **Version/Commit:** HW05-23127459 (commit edf89d6)
- **Test Account:** test@eshop.com / Test1234!

## Steps to Reproduce
1. Khoi dong EShop Backend Server tai port 3000
2. Mo JMeter va tai file `23127459_Spike_20260816.jmx`
3. Chay JMeter Non-GUI mode: `jmeter -n -t 23127459_Spike_20260816.jmx -l results.jtl`
4. Doi qua trinh test hoan tat (khoang 2 phut)
5. Kiem tra file `results.jtl` va report HTML

## Expected Result
- Tat ca requests hoan thanh trong thoi gian hop ly (< 1000ms)
- Khong co request bi timeout hay treo
- Error rate < 5%
- p99 response time < 1000ms

## Actual Result
- **p99 response time = 2,075ms** (vuot nguong 1000ms gap 2 lan)
- **Max response time = 2,961ms** (gan 3 giay)
- **p99 tu 29ms (median) tang len 2,075ms** - tang gap 71 lan
- Server bi nghẽn luồng khi 200 VUs cung thuc thi checkout
- SQLite database bi "database locked" vi chi ho tro 1 writer

## Evidence
- File JTL: `scripts/23127459_Spike_results.jtl`
- Report HTML: `reports/Report_Spike/index.html`
- Statistics: `reports/Report_Spike/statistics.json`

```
Total Samples: 10,234
Avg Response Time: 53.82ms
p95: 29.00ms
p99: 2,075.45ms
Max: 2,961.00ms
Error Rate: 0.00%
Throughput: 84.74 req/s
```

## Labels
- `type: bug`
- `module: performance`
- `severity: critical`
- `priority: p1`
- `status: new`
- `found-by: test-case`
