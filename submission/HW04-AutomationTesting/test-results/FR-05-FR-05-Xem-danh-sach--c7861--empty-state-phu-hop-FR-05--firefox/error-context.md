# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-05.spec.ts >> FR-05: Xem danh sach & Tim kiem san pham >> FR05-TC011 - Khong co ket qua thi hien thi thong bao empty state phu hop (FR-05)
- Location: tests\FR-05.spec.ts:51:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Không tìm thấy sản phẩm')
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for getByText('Không tìm thấy sản phẩm')

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Danh sách sản phẩm" [level=1]
  - textbox "Tìm kiếm...": zzzzzzzzzz
  - button "Tìm"
  - text: "Kết quả tìm kiếm cho: zzzzzzzzzz"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  36  |   expectedMinResults?: number;
  37  |   expectedEmptyStateText?: string;
  38  |   expectedRenderedBoldTags?: number;
  39  |   expectedAltNonEmpty?: boolean;
  40  |   expectedKeywordText?: string;
  41  |   forbiddenText?: string;
  42  |   expectedMinImages?: number;
  43  |   expectedNoScriptTags?: boolean;
  44  |   expectedPriceRegex?: string;
  45  | }
  46  | 
  47  | const data = loadTestData<FR05Case>("fr05-data.json");
  48  | 
  49  | test.describe("FR-05: Xem danh sach & Tim kiem san pham", () => {
  50  |   for (const tc of data) {
  51  |     test(`${tc.id} - ${tc.description}`, async ({ page }) => {
  52  |       const c = substituteTimestamp(tc, Date.now());
  53  |       const home = new HomePage(page);
  54  | 
  55  |       await home.goto();
  56  |       await page.waitForLoadState("domcontentloaded");
  57  |       await expect(page.locator("h1").first()).toBeVisible();
  58  | 
  59  |       switch (c.action) {
  60  |         case "verifyPageTitle": {
  61  |           await expect(page.locator("h1").first()).toHaveText(c.expectedH1Text!);
  62  |           break;
  63  |         }
  64  | 
  65  |         // SIET: Kiem tra KHONG the nao duoc render thanh HTML
  66  |         case "verifyH1Count": {
  67  |           const allH1 = page.locator("h1");
  68  |           const h1Count = await allH1.count();
  69  |           expect(
  70  |             h1Count,
  71  |             `SUT co ${h1Count} the <h1>, dac ta FR-05/FR-21 chi cho phep 1 the`,
  72  |           ).toBe(c.expectedH1Count!);
  73  |           break;
  74  |         }
  75  | 
  76  |         case "verifyGrid": {
  77  |           await expect(home.productCards.first()).toBeVisible();
  78  |           const count = await home.productCards.count();
  79  |           expect(count).toBeGreaterThanOrEqual(c.expectedMinProducts!);
  80  |           break;
  81  |         }
  82  | 
  83  |         case "verifyProductCard": {
  84  |           const card = home.productCards.nth(c.productIndex!);
  85  |           await expect(card.locator("h2")).toHaveText(c.expectedName!);
  86  |           await expect(card.locator("img")).toBeVisible();
  87  |           await expect(card.locator("p").first()).toBeVisible();
  88  |           break;
  89  |         }
  90  | 
  91  |         case "verifyPriceFormat": {
  92  |           const card = home.productCards.nth(c.productIndex!);
  93  |           await expect(card).toContainText(c.expectedPriceContains!);
  94  |           break;
  95  |         }
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
> 136 |           await expect(page.getByText(c.expectedEmptyStateText!)).toBeVisible();
      |                                                                   ^ Error: expect(locator).toBeVisible() failed
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
```