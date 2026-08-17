import json

input_json = 'stress-test-raw.json'
output_html = 'view_result_tree.html'

requests_data = []

with open(input_json, 'r', encoding='utf-8') as f:
    for line in f:
        record = json.loads(line.strip())
        if record.get('type') == 'Point' and record.get('metric') == 'http_req_duration':
            data = record.get('data', {})
            tags = data.get('tags', {})
            
            status = tags.get('status', '200')
            is_success = status.startswith(('2', '3'))
            
            requests_data.append({
                'time': data.get('time'),
                'url': tags.get('url', 'N/A'),
                'method': tags.get('method', 'GET'),
                'name': tags.get('name', tags.get('url', 'Sample')),
                'status': status,
                'duration': round(data.get('value', 0), 2),
                'success': is_success
            })

html_content = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>k6 View Result Tree</title>
    <style>
        body {{ font-family: Segoe UI, Tahoma, sans-serif; margin: 0; display: flex; height: 100vh; background: #f0f0f0; }}
        #sidebar {{ width: 35%; border-right: 1px solid #ccc; background: #fff; overflow-y: auto; }}
        #details {{ width: 65%; padding: 20px; background: #fafafa; overflow-y: auto; }}
        .item {{ padding: 8px 12px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 13px; display: flex; align-items: center; }}
        .item:hover {{ background: #e8f4fe; }}
        .item.active {{ background: #d0e7ff; font-weight: bold; }}
        .icon {{ margin-right: 8px; font-size: 12px; }}
        .success {{ color: green; }}
        .fail {{ color: red; }}
        table {{ border-collapse: collapse; width: 100%; background: #fff; border: 1px solid #ddd; }}
        th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 13px; }}
        th {{ background-color: #f2f2f2; }}
        .badge {{ padding: 2px 6px; border-radius: 3px; font-size: 11px; color: #fff; font-weight: bold; }}
        .badge-success {{ background: #28a745; }}
        .badge-fail {{ background: #dc3545; }}
    </style>
</head>
<body>
    <div id="sidebar">
        <h4 style="padding: 10px; margin: 0; background: #e0e0e0; border-bottom: 1px solid #ccc;">View Result Tree ({len(requests_data)} samples)</h4>
        <div id="list"></div>
    </div>
    <div id="details">
        <h3>Sampler Result</h3>
        <p>Chọn một request ở danh sách bên trái để xem chi tiết.</p>
    </div>

    <script>
        const data = {json.dumps(requests_data)};
        const listEl = document.getElementById('list');
        const detailsEl = document.getElementById('details');

        data.forEach((item, index) => {{
            const div = document.createElement('div');
            div.className = 'item';
            div.onclick = () => showDetail(index, div);
            div.innerHTML = `<span class="icon ${{item.success ? 'success' : 'fail'}}">${{item.success ? '✔' : '✘'}}</span>
                             <span>${{item.name}}</span>`;
            listEl.appendChild(div);
        }});

        function showDetail(index, element) {{
            document.querySelectorAll('.item').forEach(el => el.classList.remove('active'));
            element.classList.add('active');
            const item = data[index];
            
            detailsEl.innerHTML = `
                <h2>${{item.name}}</h2>
                <table>
                    <tr><th>URL</th><td>${{item.url}}</td></tr>
                    <tr><th>HTTP Method</th><td>${{item.method}}</td></tr>
                    <tr><th>Response Code</th><td><span class="badge ${{item.success ? 'badge-success' : 'badge-fail'}}">${{item.status}}</span></td></tr>
                    <tr><th>Load Time (http_req_duration)</th><td>${{item.duration}} ms</td></tr>
                    <tr><th>Timestamp</th><td>${{item.time}}</td></tr>
                </table>
            `;
        }}
    </script>
</body>
</html>
"""

with open(output_html, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Đã tạo báo cáo HTML View Result Tree thành công: {output_html}")