import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminCouponsPage, CouponData } from "./pages/AdminCouponsPage";
import { loadJsonObject, loadTestData, substituteTimestamp } from "./utils/dataLoader";
import { ENV } from "./utils/config";
import { Account } from "./utils/apiSeed";

/**
 * FR-17: Quan ly Ma Giam Gia (Coupon CRUD - Admin)
 * Data-driven: du lieu lay tu test-data/fr17-data.json
 */
interface FR17Case {
  id: string;
  action: string;
  description: string;
  coupon?: CouponData;
  user?: { email: string; password: string };
  expect?: {
    heading?: string;
    formVisible?: boolean;
    typeText?: string;
    valueText?: string;
    minText?: string;
    expiryText?: string;
    usesText?: string;
    rejected?: boolean;
    deleted?: boolean;
    expiredLabel?: string;
    coupons?: Array<{
      code: string;
      typeText?: string;
      valueText?: string;
      expiredLabel?: string;
    }>;
    resetFields?: string[];
    deniedMessage?: string;
  };
}

const data = loadTestData<FR17Case>("fr17-data.json");
const accounts = loadJsonObject<{ admin: Account }>("accounts.json");

test.describe("FR-17: Quan ly Ma Giam Gia (Coupon CRUD)", () => {
  for (const tc of data) {
    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      const c = substituteTimestamp(tc, Date.now());
      const loginPage = new AdminLoginPage(page);
      const coupons = new AdminCouponsPage(page);

      page.on("dialog", (dialog) => dialog.dismiss());

      if (c.action === "nonAdminCannotAccess") {
        await loginPage.goto(ENV.ADMIN_BASE_URL);
        await loginPage.login(c.user!.email, c.user!.password);
        await expect(loginPage.heading).toBeVisible();
        await expect(loginPage.sidebarHeading).toHaveCount(0);
        return;
      }

      await loginPage.goto(ENV.ADMIN_BASE_URL);
      await loginPage.login(accounts.admin.email, accounts.admin.password);
      await expect(loginPage.sidebarHeading).toBeVisible();
      await coupons.open();

      switch (c.action) {
        case "verifyCouponTabOpens": {
          await expect(coupons.heading).toBeVisible();
          await expect(coupons.heading).toHaveText(c.expect!.heading!);
          break;
        }

        case "verifyCouponFormFields": {
          await expect(coupons.codeInput).toBeVisible();
          await expect(coupons.typeSelect).toBeVisible();
          await expect(coupons.discountInput).toBeVisible();
          await expect(coupons.minOrderInput).toBeVisible();
          await expect(coupons.expiryInput).toBeVisible();
          await expect(coupons.maxUsesInput).toBeVisible();
          await expect(coupons.createButton).toBeVisible();
          break;
        }

        case "createPercentCoupon":
        case "createFixedCoupon": {
          await coupons.createCoupon(c.coupon!);
          const row = coupons.rowByCode(c.coupon!.code);
          await expect(row).toBeVisible();
          await expect(row.locator("td").nth(1)).toHaveText(c.expect!.typeText!);
          await expect(row.locator("td").nth(2)).toHaveText(c.expect!.valueText!);
          await expect(row.locator("td").nth(3)).toHaveText(c.expect!.minText!);
          await expect(row.locator("td").nth(4)).toHaveText(c.expect!.expiryText!);
          await expect(row.locator("td").nth(5)).toHaveText(c.expect!.usesText!);
          break;
        }

        case "createMissingCode":
        case "createInvalidMaxUses":
        case "createMissingExpiry": {
          await coupons.fillCoupon(c.coupon!);
          const countBefore = await coupons.tableRows.count();
          await coupons.createButton.click();
          await page.waitForTimeout(800);
          const countAfter = await coupons.tableRows.count();
          expect(countAfter).toBe(countBefore);
          break;
        }

        case "createNegativeValue": {
          await coupons.createCoupon(c.coupon!);
          await expect(coupons.rowByCode(c.coupon!.code)).toHaveCount(0);
          break;
        }

        case "createDuplicateCode": {
          await coupons.createCoupon(c.coupon!);
          await expect(coupons.rowByCode(c.coupon!.code)).toHaveCount(1);
          await coupons.createCoupon(c.coupon!);
          await page.waitForTimeout(800);
          await expect(coupons.rowByCode(c.coupon!.code)).toHaveCount(1);
          break;
        }

        case "deleteCoupon": {
          await coupons.createCoupon(c.coupon!);
          await expect(coupons.rowByCode(c.coupon!.code)).toBeVisible();
          await coupons.deleteCoupon(c.coupon!.code);
          await expect(coupons.rowByCode(c.coupon!.code)).toHaveCount(0);
          break;
        }

        case "expiredCouponShown": {
          await coupons.createCoupon(c.coupon!);
          const row = coupons.rowByCode(c.coupon!.code);
          await expect(row.locator("td").nth(4)).toHaveText(c.expect!.expiredLabel!);
          break;
        }

        case "verifySeededCoupons": {
          for (const item of c.expect!.coupons!) {
            const row = coupons.rowByCode(item.code);
            await expect(row).toBeVisible();
            if (item.typeText) {
              await expect(row.locator("td").nth(1)).toHaveText(item.typeText);
            }
            if (item.valueText) {
              await expect(row.locator("td").nth(2)).toHaveText(item.valueText);
            }
            if (item.expiredLabel) {
              await expect(row.locator("td").nth(4)).toHaveText(item.expiredLabel);
            }
          }
          break;
        }

        case "verifyFormResetAfterCreate": {
          await coupons.createCoupon(c.coupon!);
          await expect(coupons.rowByCode(c.coupon!.code)).toBeVisible();
          for (const field of c.expect!.resetFields!) {
            if (field === "code") {
              await expect(coupons.codeInput).toHaveValue("");
            } else if (field === "discount_value") {
              await expect(coupons.discountInput).toHaveValue("");
            } else if (field === "expired_at") {
              await expect(coupons.expiryInput).toHaveValue("");
            }
          }
          break;
        }

        default: {
          throw new Error(`Unhandled FR-17 action: ${c.action}`);
        }
      }
    });
  }
});
