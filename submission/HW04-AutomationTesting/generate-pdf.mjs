import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const mdPath = resolve(process.argv[2] || 'HW04_Report_23127459.md');
const pdfPath = mdPath.replace('.md', '.pdf');

const md = readFileSync(mdPath, 'utf-8');

// Simple markdown to HTML conversion
function mdToHtml(content) {
  let html = content
    // Headers
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => c.trim().match(/^-+$/))) return ''; // separator row
    const isHeader = match.includes('---');
    const tag = isHeader ? 'th' : 'td';
    return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
  });

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<hr') || p.startsWith('<blockquote') || p.startsWith('<pre') || p.startsWith('<table') || p.startsWith('<tr')) return p;
    if (p.includes('<tr>')) return '<table>' + p + '</table>';
    return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
  }).join('\n');

  return html;
}

const html = mdToHtml(md);

const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 5px; }
    h3 { color: #34495e; }
    table { border-collapse: collapse; width: 100%; margin: 15px 0; }
    th, td { border: 1px solid #bdc3c7; padding: 8px 12px; text-align: left; }
    th { background-color: #ecf0f1; font-weight: bold; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    code { background-color: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    pre { background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #3498db; margin: 15px 0; padding: 10px 20px; background: #f8f9fa; }
    hr { border: none; border-top: 1px solid #bdc3c7; margin: 20px 0; }
    strong { color: #c0392b; }
    a { color: #2980b9; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
${html}
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(fullHtml, { waitUntil: 'networkidle' });
await page.pdf({ path: pdfPath, format: 'A4', margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
await browser.close();
console.log(`PDF generated: ${pdfPath}`);
