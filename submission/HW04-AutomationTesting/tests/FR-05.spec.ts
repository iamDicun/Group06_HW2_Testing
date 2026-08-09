import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { HomePage } from "./pages/HomePage";
import { loadTestData, substituteTimestamp } from "./utils/dataLoader";

/**
 * FR-05: Xem danh sach & Tim kiem san pham
 * Data-driven: toan bo du lieu duoc lay tu test-data/fr05-data.json
 */
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
}

const data = loadTestData<FR05Case>("fr05-data.json");

test.describe("FR-05: Xem danh sach & Tim kiem san pham", () => {
  for (const tc of data) {
    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      const c = substituteTimestamp(tc, Date.now());
      const home = new HomePage(page);

      await home.goto();
      await expect(home.h1.first()).toBeVisible();

      switch (c.action) {
        case "verifyPageTitle": {
          await expect(home.h1.first()).toHaveText(c.expectedH1Text!);
          break;
        }

        case "verifyH1Count": {
          await expect(home.h1).toHaveCount(c.expectedH1Count!);
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
          await expect(card.locator("p")).toBeVisible();
          break;
        }

        case "verifyPriceFormat": {
          const card = home.productCards.nth(c.productIndex!);
          await expect(card.locator("p")).toContainText(c.expectedPriceContains!);
          break;
        }

        case "verifyCurrency": {
          const card = home.productCards.first();
          await expect(card.locator("p")).toContainText(c.expectedCurrencySymbol!);
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

        case "searchEmptyState": {
          await home.search(c.searchTerm!);
          await expect(home.productCards).toHaveCount(0);
          await expect(page.locator(`text=${c.expectedEmptyStateText!}`)).toBeVisible();
          break;
        }

        case "searchXss": {
          await home.search(c.searchTerm!);
          await expect(home.resultLine).toBeVisible();
          await expect(home.resultLine.locator("b")).toHaveCount(
            c.expectedRenderedBoldTags!,
          );
          break;
        }

        case "verifyImageAlt": {
          const count = await home.productCards.count();
          expect(count).toBeGreaterThanOrEqual(1);
          for (let i = 0; i < count; i++) {
            const alt = await home.productCards
              .nth(i)
              .locator("img")
              .getAttribute("alt");
            expect(alt, `product #${i} alt should not be null`).not.toBeNull();
            if (c.expectedAltNonEmpty) {
              expect((alt ?? "").trim(), `product #${i} alt is empty`).not.toBe("");
            }
          }
          break;
        }

        case "searchKeywordShown": {
          await home.search(c.searchTerm!);
          await expect(home.resultLine).toContainText(c.expectedKeywordText!);
          break;
        }

        default: {
          throw new Error(`Unhandled FR-05 action: ${c.action}`);
        }
      }
    });
  }
});
