# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-05.spec.ts >> FR-05: Xem danh sach & Tim kiem san pham >> FR05-TC017 - Tim kiem voi XSS payload khong duoc render HTML (SEC-04/FR-05)
- Location: tests\FR-05.spec.ts:51:9

# Error details

```
Error: XSS: trang chua 'alert(' sau khi tim kiem '<script>alert('xss')</script>' - SEC-04 vi pham

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - heading "Danh sách sản phẩm" [level=1] [ref=e13]
        - generic [ref=e14]:
          - textbox "Tìm kiếm..." [ref=e15]: <script>alert('xss')</script>
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]:
        - heading "Database Error" [level=1] [ref=e18]
        - paragraph [ref=e19]: "SQLITE_ERROR: near \"xss\": syntax error"
      - heading "Hiển thị 5 sản phẩm" [level=1] [ref=e20]
  - contentinfo [ref=e21]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  121 |           expect(count).toBeGreaterThanOrEqual(c.expectedMinResults!);
  122 |           break;
  123 |         }
  124 | 
  125 |         case "searchNoResult": {
  126 |           await home.search(c.searchTerm!);
  127 |           await expect(home.productCards).toHaveCount(c.expectedResultCount!);
  128 |           break;
  129 |         }
  130 | 
  131 |         // SIET: Empty state PHAI co text that bai, khong chi dem 0 product
  132 |         case "searchEmptyState": {
  133 |           await home.search(c.searchTerm!);
  134 |           await page.waitForLoadState("networkidle");
  135 |           await expect(home.productCards).toHaveCount(0);
  136 |           await expect(page.getByText(c.expectedEmptyStateText!)).toBeVisible();
  137 |           break;
  138 |         }
  139 | 
  140 |         // SIET: XSS - kiem tra KHONG co the HTML nao duoc render
  141 |         case "searchXss": {
  142 |           await home.search(c.searchTerm!);
  143 |           await expect(home.resultLine).toBeVisible();
  144 |           const boldCount = await home.resultLine.locator("b").count();
  145 |           expect(
  146 |             boldCount,
  147 |             `XSS: tim kiem '${c.searchTerm}' da render ${boldCount} the <b>, dac ta SEC-04 cam render HTML`,
  148 |           ).toBe(c.expectedRenderedBoldTags!);
  149 |           break;
  150 |         }
  151 | 
  152 |         // SIET: Alt phai co gia tri MO TA, khong chi ton tai attribute
  153 |         case "verifyImageAlt": {
  154 |           const count = await home.productImages.count();
  155 |           expect(count).toBeGreaterThanOrEqual(1);
  156 |           for (let i = 0; i < count; i++) {
  157 |             const img = home.productImages.nth(i);
  158 |             const altValue = await img.getAttribute("alt");
  159 |             expect(
  160 |               altValue,
  161 |               `Anh san pham #${i}: alt attribute phai ton tai`,
  162 |             ).not.toBeNull();
  163 |             expect(
  164 |               altValue?.trim(),
  165 |               `Anh san pham #${i}: alt KHONG duoc rỗng (FR-05/FR-24 yeu cau alt text mo ta)`,
  166 |             ).not.toBe("");
  167 |           }
  168 |           break;
  169 |         }
  170 | 
  171 |         case "searchKeywordShown": {
  172 |           await home.search(c.searchTerm!);
  173 |           await expect(home.resultLine).toContainText(c.expectedKeywordText!);
  174 |           break;
  175 |         }
  176 | 
  177 |         // NEW: Kiem tra CHINH XAC ky hieu "₫", cam dung "VND"
  178 |         case "verifyExactCurrencySymbol": {
  179 |           const firstPrice = await home.priceElements.first().textContent();
  180 |           expect(
  181 |             firstPrice,
  182 |             `Gia PHAI chua '₫', thuc te: "${firstPrice}"`,
  183 |           ).toContain(c.expectedCurrencySymbol!);
  184 |           if (c.forbiddenText) {
  185 |             expect(
  186 |               firstPrice,
  187 |               `Gia KHONG duoc chua '${c.forbiddenText}', thuc te: "${firstPrice}"`,
  188 |             ).not.toContain(c.forbiddenText);
  189 |           }
  190 |           break;
  191 |         }
  192 | 
  193 |         // NEW: Kiem tra alt text khong rong cho TAT CA anh
  194 |         case "verifyImageAltNotEmpty": {
  195 |           const imgCount = await home.productImages.count();
  196 |           expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
  197 |           for (let i = 0; i < imgCount; i++) {
  198 |             const img = home.productImages.nth(i);
  199 |             const altValue = await img.getAttribute("alt");
  200 |             expect(
  201 |               altValue?.trim(),
  202 |               `Anh san pham #${i}: alt PHAI co text mo ta, khong duoc rong (FR-05/FR-24)`,
  203 |             ).not.toBe("");
  204 |           }
  205 |           break;
  206 |         }
  207 | 
  208 |         // NEW: XSS - kiem tra KHONG co the script/html nao duoc render
  209 |         case "verifyNoXssInSearch": {
  210 |           await home.search(c.searchTerm!);
  211 |           await page.waitForLoadState("networkidle");
  212 |           const scriptTags = await page.locator("script").count();
  213 |           const bodyHtml = await page.locator("body").innerHTML();
  214 |           expect(
  215 |             bodyHtml.includes("<script>"),
  216 |             `XSS: trang chua the <script> sau khi tim kiem '${c.searchTerm}' - SEC-04 vi pham`,
  217 |           ).toBe(false);
  218 |           expect(
  219 |             bodyHtml.includes("alert("),
  220 |             `XSS: trang chua 'alert(' sau khi tim kiem '${c.searchTerm}' - SEC-04 vi pham`,
> 221 |           ).toBe(false);
      |             ^ Error: XSS: trang chua 'alert(' sau khi tim kiem '<script>alert('xss')</script>' - SEC-04 vi pham
  222 |           break;
  223 |         }
  224 | 
  225 |         // NEW: Kiem tra KHONG co nhieu hon 1 the h1
  226 |         case "verifyNoDuplicateH1": {
  227 |           const allH1 = page.locator("h1");
  228 |           const totalH1 = await allH1.count();
  229 |           expect(
  230 |             totalH1,
  231 |             `SUT co ${totalH1} the <h1>, FR-05/FR-21 chi cho phep DUNG 1 the`,
  232 |           ).toBe(c.expectedH1Count!);
  233 |           break;
  234 |         }
  235 | 
  236 |         // NEW: Kiem tra dinh dang gia chinh xac: "XX,XXX,XXX ₫"
  237 |         case "verifyPriceExactFormat": {
  238 |           const priceEl = home.priceElements.nth(c.productIndex!);
  239 |           const priceText = await priceEl.textContent();
  240 |           const regex = new RegExp(c.expectedPriceRegex!);
  241 |           expect(
  242 |             priceText,
  243 |             `Gia phai co dinh dang '${c.expectedPriceRegex}', thuc te: "${priceText}"`,
  244 |           ).toMatch(regex);
  245 |           break;
  246 |         }
  247 | 
  248 |         // NEW: Kiem tra anh co src hop le
  249 |         case "verifyImageSrcValid": {
  250 |           const imgCount = await home.productImages.count();
  251 |           expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
  252 |           for (let i = 0; i < imgCount; i++) {
  253 |             const img = home.productImages.nth(i);
  254 |             const src = await img.getAttribute("src");
  255 |             expect(src, `Anh san pham #${i}: src KHONG duoc rong`).not.toBe("");
  256 |             expect(
  257 |               src,
  258 |               `Anh san pham #${i}: src phai bat dau bang http hoac /`,
  259 |             ).toMatch(/^(https?:\/\/|\/)/);
  260 |           }
  261 |           break;
  262 |         }
  263 | 
  264 |         default: {
  265 |           throw new Error(`Unhandled FR-05 action: ${c.action}`);
  266 |         }
  267 |       }
  268 |     });
  269 |   }
  270 | });
  271 | 
```