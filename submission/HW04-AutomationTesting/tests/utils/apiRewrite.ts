import { Page } from "@playwright/test";
import { ENV } from "./config";

const originalUrl = new URL(ENV.API_ORIGINAL_HOST);
const targetUrl = new URL(ENV.API_BASE_URL);

/**
 * Intercept tat ca request API ma frontend gui toi host remote
 * (eshop-sut-clone-ktpm.onrender.com) va chuyen huong ve backend local.
 */
export async function installApiRewrite(page: Page): Promise<void> {
  if (originalUrl.host === targetUrl.host) {
    return;
  }

  await page.route(`${ENV.API_ORIGINAL_HOST}/**`, async (route) => {
    const url = new URL(route.request().url());
    url.protocol = targetUrl.protocol;
    url.host = targetUrl.host;
    url.port = targetUrl.port;
    const response = await route.fetch({ url: url.toString() });
    await route.fulfill({ response });
  });
}
