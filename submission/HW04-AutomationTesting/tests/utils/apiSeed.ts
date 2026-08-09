import { APIRequestContext } from "@playwright/test";
import { ENV } from "./config";

export interface Account {
  name: string;
  email: string;
  password: string;
}

const DEFAULT_TOTAL = 500000;
const DEFAULT_ADDRESS = "123 Le Loi, Q1, TP.HCM";

export async function apiUrl(pathname: string): Promise<string> {
  const url = new URL(ENV.API_BASE_URL);
  url.pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return url.toString();
}

/** Dang ky user moi qua API (dung de seed du lieu test). */
export async function registerUser(
  request: APIRequestContext,
  account: Account,
): Promise<void> {
  const res = await request.post(await apiUrl("/api/register"), {
    data: { name: account.name, email: account.email, password: account.password },
  });
  if (!res.ok()) {
    throw new Error(
      `[registerUser] failed for ${account.email}: ${res.status()} ${await res.text()}`,
    );
  }
}

/** Dang nhap qua API, tra ve JWT token. */
export async function apiLogin(
  request: APIRequestContext,
  account: Account,
): Promise<string> {
  const res = await request.post(await apiUrl("/api/login"), {
    data: { email: account.email, password: account.password },
  });
  if (!res.ok()) {
    throw new Error(
      `[apiLogin] failed for ${account.email}: ${res.status()} ${await res.text()}`,
    );
  }
  const body = await res.json();
  return body.token as string;
}

/** Tao don hang (checkout) cho user qua API, tra ve orderId. */
export async function createOrder(
  request: APIRequestContext,
  userToken: string,
  totalAmount: number,
): Promise<number> {
  const res = await request.post(await apiUrl("/api/checkout"), {
    data: { total_amount: totalAmount, shipping_address: DEFAULT_ADDRESS },
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!res.ok()) {
    throw new Error(`[createOrder] failed: ${res.status()} ${await res.text()}`);
  }
  const body = await res.json();
  return body.orderId as number;
}

/** Cap nhat trang thai don hang (admin). */
export async function setOrderStatus(
  request: APIRequestContext,
  adminToken: string,
  orderId: number,
  status: string,
): Promise<void> {
  const res = await request.put(
    await apiUrl(`/api/admin/orders/${orderId}/status`),
    {
      data: { status },
      headers: { Authorization: `Bearer ${adminToken}` },
    },
  );
  if (!res.ok()) {
    throw new Error(
      `[setOrderStatus] ${orderId} -> ${status} failed: ${res.status()} ${await res.text()}`,
    );
  }
}

/** Day du cac trang thai trung gian can chuyen de dat trang thai dich. */
export function transitionsForStatus(target: string): string[] {
  switch (target) {
    case "pending":
      return [];
    case "confirmed":
      return ["confirmed"];
    case "shipping":
      return ["confirmed", "shipping"];
    case "delivered":
      return ["confirmed", "shipping", "delivered"];
    case "canceled":
      return ["canceled"];
    default:
      return [];
  }
}

/**
 * Seed mot user moi kem theo cac don hang co trang thai chi dinh.
 * Dung cho FR-11 (lich su don hang). Tra ve danh sach orderId da tao.
 */
export async function seedOrdersForUser(
  request: APIRequestContext,
  account: Account,
  statuses: string[],
  adminAccount: Account,
  totals?: number[],
): Promise<number[]> {
  await registerUser(request, account);
  const userToken = await apiLogin(request, account);
  const adminToken = await apiLogin(request, adminAccount);

  const orderIds: number[] = [];
  for (let i = 0; i < statuses.length; i++) {
    const total = totals && totals[i] != null ? totals[i] : DEFAULT_TOTAL;
    const orderId = await createOrder(request, userToken, total);
    for (const status of transitionsForStatus(statuses[i])) {
      await setOrderStatus(request, adminToken, orderId, status);
    }
    orderIds.push(orderId);
  }
  return orderIds;
}
