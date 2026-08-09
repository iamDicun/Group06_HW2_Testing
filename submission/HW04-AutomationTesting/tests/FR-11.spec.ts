import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { loadJsonObject, loadTestData, substituteTimestamp } from "./utils/dataLoader";
import { Account, seedOrdersForUser } from "./utils/apiSeed";

/**
 * FR-11: Xem lich su don hang (User)
 * Data-driven: du lieu lay tu test-data/fr11-data.json.
 * Don hang duoc seed truoc qua API (tests/utils/apiSeed.ts).
 */


interface FR11Case {
  id: string;
  action: string;
  description: string;
  user?: Account;
  otherUser?: Account;
  seedStatuses?: string[];
  otherUserStatuses?: string[];
  seedTotals?: number[];
  expect?: {
    sectionHeading?: string;
    headers?: string[];
    idRegex?: string;
    dateRegex?: string;
    totalText?: string;
    statusLabel?: string;
    statuses?: Array<{ label: string; colorClass: string }>;
    firstRowLabel?: string;
    cancelButtonCount?: number;
    rowCount?: number;
    notVisibleLabel?: string;
    emptyText?: string;
    loginRequiredText?: string;
  };
}

const data = loadTestData<FR11Case>("fr11-data.json");
const accounts = loadJsonObject<{ admin: Account }>("accounts.json");

test.describe("FR-11: Xem lich su don hang (User)", () => {
  for (const tc of data) {
    test(`${tc.id} - ${tc.description}`, async ({ page, request }) => {
      const ts = Date.now();
      const c = substituteTimestamp(tc, ts);
      const profile = new ProfilePage(page);

      if (c.action !== "verifyRequireLogin" && c.user) {
        await seedOrdersForUser(
          request,
          c.user,
          c.seedStatuses || [],
          accounts.admin,
          c.seedTotals,
        );

        if (c.otherUser && c.otherUserStatuses) {
          const other = substituteTimestamp(c.otherUser, ts + 1000);
          await seedOrdersForUser(request, other, c.otherUserStatuses, accounts.admin);
        }

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(c.user.email, c.user.password);
        // Đợi chuyển trang thành công sau khi login để lưu auth token
        await page.waitForURL((url) => !url.pathname.includes("/login"));
      }

      await profile.goto();

      switch (c.action) {
        case "verifySectionVisible": {
          await expect(profile.heading).toBeVisible();
          await expect(profile.heading).toHaveText(c.expect!.sectionHeading!);
          break;
        }

        case "verifyColumnHeaders": {
          await expect(profile.rows.first()).toBeVisible();
          const headers = await profile.table.locator("thead th").allTextContents();
          expect(headers).toEqual(c.expect!.headers!);
          break;
        }

        case "verifyOrderIdFormat": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.rows.first().locator("td").first()).toHaveText(
            new RegExp(c.expect!.idRegex!),
          );
          break;
        }

        case "verifyOrderDate": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.rows.first().locator("td").nth(1)).toHaveText(
            new RegExp(c.expect!.dateRegex!),
          );
          break;
        }

        case "verifyTotalAmountFormat": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.rows.first().locator("td").nth(2)).toHaveText(
            c.expect!.totalText!,
          );
          break;
        }

        case "verifyStatusPendingLabel":
        case "verifyStatusConfirmedLabel":
        case "verifyStatusShippingLabel":
        case "verifyStatusDeliveredLabel":
        case "verifyStatusCanceledLabel": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.rows.first()).toContainText(c.expect!.statusLabel!);
          break;
        }

        case "verifyStatusColorCoded": {
          await expect(profile.rows.first()).toBeVisible();
          for (const item of c.expect!.statuses!) {
            const row = profile.rowContaining(item.label);
            // Chỉ định rõ thẻ badge/status class cụ thể thay vì span chung chung
            const statusBadge = row.locator(".badge, .status, span[class*='status'], span[class*='badge']").first();
            await expect(statusBadge).toHaveClass(new RegExp(item.colorClass));
          }
          break;
        }

        case "verifyNewestFirst": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.rows.first()).toContainText(c.expect!.firstRowLabel!);
          break;
        }

        case "verifyCancelHiddenForFinalStates":
        case "verifyNoCancelForShipping": {
          await expect(profile.rows.first()).toBeVisible();
          await expect(profile.cancelButtons).toHaveCount(c.expect!.cancelButtonCount!);
          break;
        }

        case "verifyOnlyOwnOrders": {
          await expect(profile.rows).toHaveCount(c.expect!.rowCount!);
          await expect(profile.rowContaining(c.expect!.notVisibleLabel!)).toHaveCount(0);
          break;
        }

        case "verifyEmptyHistory": {
          await expect(profile.emptyMessage).toBeVisible();
          await expect(profile.emptyMessage).toHaveText(c.expect!.emptyText!);
          break;
        }

        case "verifyRequireLogin": {
          await expect(profile.loginRequired).toBeVisible();
          await expect(profile.loginRequired).toHaveText(c.expect!.loginRequiredText!);
          break;
        }

        default: {
          throw new Error(`Unhandled FR-11 action: ${c.action}`);
        }
      }
    });
  }
});