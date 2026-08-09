import { test as base } from "@playwright/test";
import { installApiRewrite } from "./utils/apiRewrite";

/**
 * Fixture mo rong: tu dong cai dat interceptor chuyen API remote
 * ve backend local cho MOI test.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await installApiRewrite(page);
    await use(page);
  },
});
