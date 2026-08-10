import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { HomePage } from "./pages/HomePage";
import { loadTestData, substituteTimestamp } from "./utils/dataLoader";

/**
 * FR-05: Xem danh sach & Tim kiem san pham
 * Data-driven: toan bo du lieu duoc lay tu test-data/fr05-data.json
 *
 * REFACTORED: Assertions siết chặt để bắt bug hien thi SUT:
 *  - BUG-1: SUT co 2 the <h1> (vi pham FR-05/FR-21)
 *  - BUG-2: Anh san pham co alt="" trong (vi pham FR-05/FR-24)
 *  - BUG-3: Gia hien thi "VND" thay vi "₫" (vi pham FR-05/FR-21)
 *  - BUG-4: XSS via dangerouslySetInnerHTML (vi pham SEC-04)
 *  - BUG-5: Khong co empty state message
 *  - BUG-6: Khong co loading state
 */
test.beforeEach(async ({}, testInfo) => {
  testInfo.annotations.push({ type: "Run by", description: "23127459" });
});

interface FR05Case {
  id: string;
  action: string;
  description: string;
  expectedH1Text?: string;
  expectedH1Count?: number;
  expectedMinProducts?: number;
  productIndex?: number;
  expectedName?: string;
  expectedPriceContains?: string;
  expectedCurrencySymbol?: string;
  searchTerm?: string;
  expectedResultCount?: number;
  expectedResultName?: string;
  expectedMinResults?: number;
  expectedEmptyStateText?: string;
  expectedRenderedBoldTags?: number;
  expectedAltNonEmpty?: boolean;
  expectedKeywordText?: string;
  forbiddenText?: string;
  expectedMinImages?: number;
  expectedNoScriptTags?: boolean;
  expectedPriceRegex?: string;
}

const data = loadTestData<FR05Case>("fr05-data.json");

test.describe("FR-05: Xem danh sach & Tim kiem san pham", () => {
  for (const tc of data) {
    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      const c = substituteTimestamp(tc, Date.now());
      const home = new HomePage(page);

      await home.goto();
      await page.waitForLoadState("domcontentloaded");
      await expect(page.locator("h1").first()).toBeVisible();

      switch (c.action) {
        case "verifyPageTitle": {
          await expect(page.locator("h1").first()).toHaveText(c.expectedH1Text!);
          break;
        }

        // SIET: Kiem tra KHONG the nao duoc render thanh HTML
        case "verifyH1Count": {
          const allH1 = page.locator("h1");
          const h1Count = await allH1.count();
          expect(
            h1Count,
            `SUT co ${h1Count} the <h1>, dac ta FR-05/FR-21 chi cho phep 1 the`,
          ).toBe(c.expectedH1Count!);
          break;
        }

        case "verifyGrid": {
          await expect(home.productCards.first()).toBeVisible();
          const count = await home.productCards.count();
          expect(count).toBeGreaterThanOrEqual(c.expectedMinProducts!);
          break;
        }

        case "verifyProductCard": {
          const card = home.productCards.nth(c.productIndex!);
          await expect(card.locator("h2")).toHaveText(c.expectedName!);
          await expect(card.locator("img")).toBeVisible();
          await expect(card.locator("p").first()).toBeVisible();
          break;
        }

        case "verifyPriceFormat": {
          const card = home.productCards.nth(c.productIndex!);
          await expect(card).toContainText(c.expectedPriceContains!);
          break;
        }

        // SIET: Kiem tra CHINH XAC ky hieu tien te, khong chi "chua"
        case "verifyCurrency": {
          const priceText = await home.priceElements.first().textContent();
          expect(
            priceText,
            `Gia phai chua ky hieu '₫', thuc te: "${priceText}"`,
          ).toContain(c.expectedCurrencySymbol!);
          break;
        }

        case "searchExactMatch": {
          await home.search(c.searchTerm!);
          await expect(home.productCards).toHaveCount(c.expectedResultCount!);
          await expect(home.productCards.first().locator("h2")).toHaveText(
            c.expectedResultName!,
          );
          break;
        }

        case "searchPartialKeyword":
        case "searchCaseInsensitive": {
          await home.search(c.searchTerm!);
          await expect(home.productCards.first()).toBeVisible();
          const count = await home.productCards.count();
          expect(count).toBeGreaterThanOrEqual(c.expectedMinResults!);
          break;
        }

        case "searchNoResult": {
          await home.search(c.searchTerm!);
          await expect(home.productCards).toHaveCount(c.expectedResultCount!);
          break;
        }

        // SIET: Empty state PHAI co text that bai, khong chi dem 0 product
        case "searchEmptyState": {
          await home.search(c.searchTerm!);
          await page.waitForLoadState("networkidle");
          await expect(home.productCards).toHaveCount(0);
          await expect(page.getByText(c.expectedEmptyStateText!)).toBeVisible();
          break;
        }

        // SIET: XSS - kiem tra KHONG co the HTML nao duoc render
        case "searchXss": {
          await home.search(c.searchTerm!);
          await expect(home.resultLine).toBeVisible();
          const boldCount = await home.resultLine.locator("b").count();
          expect(
            boldCount,
            `XSS: tim kiem '${c.searchTerm}' da render ${boldCount} the <b>, dac ta SEC-04 cam render HTML`,
          ).toBe(c.expectedRenderedBoldTags!);
          break;
        }

        // SIET: Alt phai co gia tri MO TA, khong chi ton tai attribute
        case "verifyImageAlt": {
          const count = await home.productImages.count();
          expect(count).toBeGreaterThanOrEqual(1);
          for (let i = 0; i < count; i++) {
            const img = home.productImages.nth(i);
            const altValue = await img.getAttribute("alt");
            expect(
              altValue,
              `Anh san pham #${i}: alt attribute phai ton tai`,
            ).not.toBeNull();
            expect(
              altValue?.trim(),
              `Anh san pham #${i}: alt KHONG duoc rỗng (FR-05/FR-24 yeu cau alt text mo ta)`,
            ).not.toBe("");
          }
          break;
        }

        case "searchKeywordShown": {
          await home.search(c.searchTerm!);
          await expect(home.resultLine).toContainText(c.expectedKeywordText!);
          break;
        }

        // NEW: Kiem tra CHINH XAC ky hieu "₫", cam dung "VND"
        case "verifyExactCurrencySymbol": {
          const firstPrice = await home.priceElements.first().textContent();
          expect(
            firstPrice,
            `Gia PHAI chua '₫', thuc te: "${firstPrice}"`,
          ).toContain(c.expectedCurrencySymbol!);
          if (c.forbiddenText) {
            expect(
              firstPrice,
              `Gia KHONG duoc chua '${c.forbiddenText}', thuc te: "${firstPrice}"`,
            ).not.toContain(c.forbiddenText);
          }
          break;
        }

        // NEW: Kiem tra alt text khong rong cho TAT CA anh
        case "verifyImageAltNotEmpty": {
          const imgCount = await home.productImages.count();
          expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
          for (let i = 0; i < imgCount; i++) {
            const img = home.productImages.nth(i);
            const altValue = await img.getAttribute("alt");
            expect(
              altValue?.trim(),
              `Anh san pham #${i}: alt PHAI co text mo ta, khong duoc rong (FR-05/FR-24)`,
            ).not.toBe("");
          }
          break;
        }

        // NEW: XSS - kiem tra KHONG co the script/html nao duoc render
        case "verifyNoXssInSearch": {
          await home.search(c.searchTerm!);
          await page.waitForLoadState("networkidle");
          const scriptTags = await page.locator("script").count();
          const bodyHtml = await page.locator("body").innerHTML();
          expect(
            bodyHtml.includes("<script>"),
            `XSS: trang chua the <script> sau khi tim kiem '${c.searchTerm}' - SEC-04 vi pham`,
          ).toBe(false);
          expect(
            bodyHtml.includes("alert("),
            `XSS: trang chua 'alert(' sau khi tim kiem '${c.searchTerm}' - SEC-04 vi pham`,
          ).toBe(false);
          break;
        }

        // NEW: Kiem tra KHONG co nhieu hon 1 the h1
        case "verifyNoDuplicateH1": {
          const allH1 = page.locator("h1");
          const totalH1 = await allH1.count();
          expect(
            totalH1,
            `SUT co ${totalH1} the <h1>, FR-05/FR-21 chi cho phep DUNG 1 the`,
          ).toBe(c.expectedH1Count!);
          break;
        }

        // NEW: Kiem tra dinh dang gia chinh xac: "XX,XXX,XXX ₫"
        case "verifyPriceExactFormat": {
          const priceEl = home.priceElements.nth(c.productIndex!);
          const priceText = await priceEl.textContent();
          const regex = new RegExp(c.expectedPriceRegex!);
          expect(
            priceText,
            `Gia phai co dinh dang '${c.expectedPriceRegex}', thuc te: "${priceText}"`,
          ).toMatch(regex);
          break;
        }

        // NEW: Kiem tra anh co src hop le
        case "verifyImageSrcValid": {
          const imgCount = await home.productImages.count();
          expect(imgCount).toBeGreaterThanOrEqual(c.expectedMinImages!);
          for (let i = 0; i < imgCount; i++) {
            const img = home.productImages.nth(i);
            const src = await img.getAttribute("src");
            expect(src, `Anh san pham #${i}: src KHONG duoc rong`).not.toBe("");
            expect(
              src,
              `Anh san pham #${i}: src phai bat dau bang http hoac /`,
            ).toMatch(/^(https?:\/\/|\/)/);
          }
          break;
        }

        default: {
          throw new Error(`Unhandled FR-05 action: ${c.action}`);
        }
      }
    });
  }
});
