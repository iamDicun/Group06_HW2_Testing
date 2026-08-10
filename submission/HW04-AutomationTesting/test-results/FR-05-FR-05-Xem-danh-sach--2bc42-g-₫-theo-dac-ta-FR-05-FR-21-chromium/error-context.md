# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-05.spec.ts >> FR-05: Xem danh sach & Tim kiem san pham >> FR05-TC006 - Gia san pham su dung don vi dong (₫) theo dac ta FR-05/FR-21
- Location: tests\FR-05.spec.ts:51:9

# Error details

```
Error: Gia phai chua ky hieu '₫', thuc te: "30,000,000 VND"

expect(received).toContain(expected) // indexOf

Expected substring: "₫"
Received string:    "30,000,000 VND"
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
  3   | import { HomePage } from "./pages/HomePage";
  4   | import { loadTestData, substituteTimestamp } from "./utils/dataLoader";
  5   | 
  6   | /**
  7   |  * FR-05: Xem danh sach & Tim kiem san pham
  8   |  * Data-driven: toan bo du lieu duoc lay tu test-data/fr05-data.json
  9   |  *
  10  |  * REFACTORED: Assertions siết chặt để bắt bug hien thi SUT:
  11  |  *  - BUG-1: SUT co 2 the <h1> (vi pham FR-05/FR-21)
  12  |  *  - BUG-2: Anh san pham co alt="" trong (vi pham FR-05/FR-24)
  13  |  *  - BUG-3: Gia hien thi "VND" thay vi "₫" (vi pham FR-05/FR-21)
  14  |  *  - BUG-4: XSS via dangerouslySetInnerHTML (vi pham SEC-04)
  15  |  *  - BUG-5: Khong co empty state message
  16  |  *  - BUG-6: Khong co loading state
  17  |  */
  18  | test.beforeEach(async ({}, testInfo) => {
  19  |   testInfo.annotations.push({ type: "Run by", description: "23127459" });
  20  | });
  21  | 
  22  | interface FR05Case {
  23  |   id: string;
  24  |   action: string;
  25  |   description: string;
  26  |   expectedH1Text?: string;
  27  |   expectedH1Count?: number;
  28  |   expectedMinProducts?: number;
  29  |   productIndex?: number;
  30  |   expectedName?: string;
  31  |   expectedPriceContains?: string;
  32  |   expectedCurrencySymbol?: string;
  33  |   searchTerm?: string;
  34  |   expectedResultCount?: number;
  35  |   expectedResultName?: string;
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
> 103 |           ).toContain(c.expectedCurrencySymbol!);
      |             ^ Error: Gia phai chua ky hieu '₫', thuc te: "30,000,000 VND"
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
  196 |           expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
  197 |           for (let i = 0; i < imgCount; i++) {
  198 |             const img = home.productImages.nth(i);
  199 |             const altValue = await img.getAttribute("alt");
  200 |             expect(
  201 |               altValue?.trim(),
  202 |               `Anh san pham #${i}: alt PHAI co text mo ta, khong duoc rong (FR-05/FR-24)`,
  203 |             ).not.toBe("");
```