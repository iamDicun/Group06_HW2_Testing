# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-05.spec.ts >> FR-05: Xem danh sach & Tim kiem san pham >> FR05-TC016 - Anh san pham PHAI co alt text mo ta, khong duoc de trong (FR-05/FR-24)
- Location: tests\FR-05.spec.ts:51:9

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 1
Received:    0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5] [cursor=pointer]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7] [cursor=pointer]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8] [cursor=pointer]:
        - /url: /login
      - link "Đăng ký" [ref=e9] [cursor=pointer]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - heading "Danh sách sản phẩm" [level=1] [ref=e13]
        - generic [ref=e14]:
          - textbox "Tìm kiếm..." [ref=e15]
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - heading "iPhone 15 Pro Max" [level=2] [ref=e19]
          - paragraph [ref=e20]: 30,000,000 VND
          - generic [ref=e21]:
            - link "Xem chi tiết" [ref=e22] [cursor=pointer]:
              - /url: /product/1
            - button "Thêm vào giỏ" [ref=e23] [cursor=pointer]
        - generic [ref=e24]:
          - heading "Samsung Galaxy S24 Ultra" [level=2] [ref=e25]
          - paragraph [ref=e26]: 28,000,000 VND
          - generic [ref=e27]:
            - link "Xem chi tiết" [ref=e28] [cursor=pointer]:
              - /url: /product/2
            - button "Thêm vào giỏ" [ref=e29] [cursor=pointer]
        - generic [ref=e30]:
          - heading "MacBook Pro M3" [level=2] [ref=e31]
          - paragraph [ref=e32]: 45,000,000 VND
          - generic [ref=e33]:
            - link "Xem chi tiết" [ref=e34] [cursor=pointer]:
              - /url: /product/3
            - button "Thêm vào giỏ" [ref=e35] [cursor=pointer]
        - generic [ref=e36]:
          - heading "Tai nghe AirPods Pro 2" [level=2] [ref=e37]
          - paragraph [ref=e38]: 6,000,000 VND
          - generic [ref=e39]:
            - link "Xem chi tiết" [ref=e40] [cursor=pointer]:
              - /url: /product/4
            - button "Thêm vào giỏ" [ref=e41] [cursor=pointer]
        - generic [ref=e42]:
          - heading "Bàn phím cơ Keychron Q1" [level=2] [ref=e43]
          - paragraph [ref=e44]: 4,000,000 VND
          - generic [ref=e45]:
            - link "Xem chi tiết" [ref=e46] [cursor=pointer]:
              - /url: /product/5
            - button "Thêm vào giỏ" [ref=e47] [cursor=pointer]
      - heading "Hiển thị 5 sản phẩm" [level=1] [ref=e48]
  - contentinfo [ref=e49]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  96  | 
  97  |         // SIET: Kiem tra CHINH XAC ky hieu tien te, khong chi "chua"
  98  |         case "verifyCurrency": {
  99  |           const priceText = await home.priceElements.first().textContent();
  100 |           expect(
  101 |             priceText,
  102 |             `Gia phai chua ky hieu '₫', thuc te: "${priceText}"`,
  103 |           ).toContain(c.expectedCurrencySymbol!);
  104 |           break;
  105 |         }
  106 | 
  107 |         case "searchExactMatch": {
  108 |           await home.search(c.searchTerm!);
  109 |           await expect(home.productCards).toHaveCount(c.expectedResultCount!);
  110 |           await expect(home.productCards.first().locator("h2")).toHaveText(
  111 |             c.expectedResultName!,
  112 |           );
  113 |           break;
  114 |         }
  115 | 
  116 |         case "searchPartialKeyword":
  117 |         case "searchCaseInsensitive": {
  118 |           await home.search(c.searchTerm!);
  119 |           await expect(home.productCards.first()).toBeVisible();
  120 |           const count = await home.productCards.count();
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
> 196 |           expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
      |                            ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
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
  221 |           ).toBe(false);
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