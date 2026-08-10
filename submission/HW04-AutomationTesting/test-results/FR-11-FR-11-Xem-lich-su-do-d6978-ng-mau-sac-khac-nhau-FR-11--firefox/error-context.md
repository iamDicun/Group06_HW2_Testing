# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-11.spec.ts >> FR-11: Xem lich su don hang (User) >> FR11-TC011 - Trang thai duoc phan biet bang mau sac khac nhau (FR-11)
- Location: tests\FR-11.spec.ts:50:9

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('table tbody tr').filter({ hasText: 'Chờ xác nhận' }).locator('.badge, .status, span[class*=\'status\'], span[class*=\'badge\']').first()
Expected pattern: /yellow/
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toHaveClass" with timeout 8000ms
  - waiting for locator('table tbody tr').filter({ hasText: 'Chờ xác nhận' }).locator('.badge, .status, span[class*=\'status\'], span[class*=\'badge\']').first()

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Chào, User 1786324786246":
      - /url: /profile
    - button "Thoát"
- main:
  - heading "Hồ sơ của bạn" [level=2]
  - text: Email (Không đổi)
  - textbox [disabled]: user1786324786246@test.com
  - text: Họ Tên
  - textbox: User 1786324786246
  - text: Số điện thoại
  - 'textbox "VD: 0912345678"'
  - text: Địa chỉ giao hàng
  - textbox "Nhập địa chỉ của bạn"
  - button "Cập nhật"
  - heading "Lịch sử đơn hàng" [level=2]
  - table:
    - rowgroup:
      - row "Mã ĐH Ngày đặt Tổng tiền Trạng thái Thao tác":
        - columnheader "Mã ĐH"
        - columnheader "Ngày đặt"
        - columnheader "Tổng tiền"
        - columnheader "Trạng thái"
        - columnheader "Thao tác"
    - rowgroup:
      - row "#223 8/10/2026 500,000 ₫ Đã hủy":
        - cell "#223"
        - cell "8/10/2026"
        - cell "500,000 ₫"
        - cell "Đã hủy"
        - cell
      - row "#222 8/10/2026 500,000 ₫ Đã giao":
        - cell "#222"
        - cell "8/10/2026"
        - cell "500,000 ₫"
        - cell "Đã giao"
        - cell
      - row "#221 8/10/2026 500,000 ₫ Đang giao Hủy đơn":
        - cell "#221"
        - cell "8/10/2026"
        - cell "500,000 ₫"
        - cell "Đang giao"
        - cell "Hủy đơn":
          - button "Hủy đơn"
      - row "#220 8/10/2026 500,000 ₫ Đã xác nhận Hủy đơn":
        - cell "#220"
        - cell "8/10/2026"
        - cell "500,000 ₫"
        - cell "Đã xác nhận"
        - cell "Hủy đơn":
          - button "Hủy đơn"
      - row "#219 8/10/2026 500,000 ₫ Chờ xác nhận Hủy đơn":
        - cell "#219"
        - cell "8/10/2026"
        - cell "500,000 ₫"
        - cell "Chờ xác nhận"
        - cell "Hủy đơn":
          - button "Hủy đơn"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  32  |     dateRegex?: string;
  33  |     totalText?: string;
  34  |     statusLabel?: string;
  35  |     statuses?: Array<{ label: string; colorClass: string }>;
  36  |     firstRowLabel?: string;
  37  |     cancelButtonCount?: number;
  38  |     rowCount?: number;
  39  |     notVisibleLabel?: string;
  40  |     emptyText?: string;
  41  |     loginRequiredText?: string;
  42  |   };
  43  | }
  44  | 
  45  | const data = loadTestData<FR11Case>("fr11-data.json");
  46  | const accounts = loadJsonObject<{ admin: Account }>("accounts.json");
  47  | 
  48  | test.describe("FR-11: Xem lich su don hang (User)", () => {
  49  |   for (const tc of data) {
  50  |     test(`${tc.id} - ${tc.description}`, async ({ page, request }) => {
  51  |       const ts = Date.now();
  52  |       const c = substituteTimestamp(tc, ts);
  53  |       const profile = new ProfilePage(page);
  54  | 
  55  |       if (c.action !== "verifyRequireLogin" && c.user) {
  56  |         await seedOrdersForUser(
  57  |           request,
  58  |           c.user,
  59  |           c.seedStatuses || [],
  60  |           accounts.admin,
  61  |           c.seedTotals,
  62  |         );
  63  | 
  64  |         if (c.otherUser && c.otherUserStatuses) {
  65  |           const other = substituteTimestamp(c.otherUser, ts + 1000);
  66  |           await seedOrdersForUser(request, other, c.otherUserStatuses, accounts.admin);
  67  |         }
  68  | 
  69  |         const loginPage = new LoginPage(page);
  70  |         await loginPage.goto();
  71  |         await loginPage.login(c.user.email, c.user.password);
  72  |         // Đợi chuyển trang thành công sau khi login để lưu auth token
  73  |         await page.waitForURL((url) => !url.pathname.includes("/login"));
  74  |       }
  75  | 
  76  |       await profile.goto();
  77  | 
  78  |       switch (c.action) {
  79  |         case "verifySectionVisible": {
  80  |           await expect(profile.heading).toBeVisible();
  81  |           await expect(profile.heading).toHaveText(c.expect!.sectionHeading!);
  82  |           break;
  83  |         }
  84  | 
  85  |         case "verifyColumnHeaders": {
  86  |           await expect(profile.rows.first()).toBeVisible();
  87  |           const headers = await profile.table.locator("thead th").allTextContents();
  88  |           expect(headers).toEqual(c.expect!.headers!);
  89  |           break;
  90  |         }
  91  | 
  92  |         case "verifyOrderIdFormat": {
  93  |           await expect(profile.rows.first()).toBeVisible();
  94  |           await expect(profile.rows.first().locator("td").first()).toHaveText(
  95  |             new RegExp(c.expect!.idRegex!),
  96  |           );
  97  |           break;
  98  |         }
  99  | 
  100 |         case "verifyOrderDate": {
  101 |           await expect(profile.rows.first()).toBeVisible();
  102 |           await expect(profile.rows.first().locator("td").nth(1)).toHaveText(
  103 |             new RegExp(c.expect!.dateRegex!),
  104 |           );
  105 |           break;
  106 |         }
  107 | 
  108 |         case "verifyTotalAmountFormat": {
  109 |           await expect(profile.rows.first()).toBeVisible();
  110 |           await expect(profile.rows.first().locator("td").nth(2)).toHaveText(
  111 |             c.expect!.totalText!,
  112 |           );
  113 |           break;
  114 |         }
  115 | 
  116 |         case "verifyStatusPendingLabel":
  117 |         case "verifyStatusConfirmedLabel":
  118 |         case "verifyStatusShippingLabel":
  119 |         case "verifyStatusDeliveredLabel":
  120 |         case "verifyStatusCanceledLabel": {
  121 |           await expect(profile.rows.first()).toBeVisible();
  122 |           await expect(profile.rows.first()).toContainText(c.expect!.statusLabel!);
  123 |           break;
  124 |         }
  125 | 
  126 |         case "verifyStatusColorCoded": {
  127 |           await expect(profile.rows.first()).toBeVisible();
  128 |           for (const item of c.expect!.statuses!) {
  129 |             const row = profile.rowContaining(item.label);
  130 |             // Chỉ định rõ thẻ badge/status class cụ thể thay vì span chung chung
  131 |             const statusBadge = row.locator(".badge, .status, span[class*='status'], span[class*='badge']").first();
> 132 |             await expect(statusBadge).toHaveClass(new RegExp(item.colorClass));
      |                                       ^ Error: expect(locator).toHaveClass(expected) failed
  133 |           }
  134 |           break;
  135 |         }
  136 | 
  137 |         case "verifyNewestFirst": {
  138 |           await expect(profile.rows.first()).toBeVisible();
  139 |           await expect(profile.rows.first()).toContainText(c.expect!.firstRowLabel!);
  140 |           break;
  141 |         }
  142 | 
  143 |         case "verifyCancelHiddenForFinalStates":
  144 |         case "verifyNoCancelForShipping": {
  145 |           await expect(profile.rows.first()).toBeVisible();
  146 |           await expect(profile.cancelButtons).toHaveCount(c.expect!.cancelButtonCount!);
  147 |           break;
  148 |         }
  149 | 
  150 |         case "verifyOnlyOwnOrders": {
  151 |           await expect(profile.rows).toHaveCount(c.expect!.rowCount!);
  152 |           await expect(profile.rowContaining(c.expect!.notVisibleLabel!)).toHaveCount(0);
  153 |           break;
  154 |         }
  155 | 
  156 |         case "verifyEmptyHistory": {
  157 |           await expect(profile.emptyMessage).toBeVisible();
  158 |           await expect(profile.emptyMessage).toHaveText(c.expect!.emptyText!);
  159 |           break;
  160 |         }
  161 | 
  162 |         case "verifyRequireLogin": {
  163 |           await expect(profile.loginRequired).toBeVisible();
  164 |           await expect(profile.loginRequired).toHaveText(c.expect!.loginRequiredText!);
  165 |           break;
  166 |         }
  167 | 
  168 |         default: {
  169 |           throw new Error(`Unhandled FR-11 action: ${c.action}`);
  170 |         }
  171 |       }
  172 |     });
  173 |   }
  174 | });
```