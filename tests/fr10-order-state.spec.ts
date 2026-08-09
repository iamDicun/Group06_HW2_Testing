import { test, expect } from '@playwright/test';
import { AdminOrdersPage } from '../pages/AdminOrdersPage';
import { ProfilePage } from '../pages/ProfilePage';
import { AuthHelper } from '../pages/AuthHelper';
import orderStateTestData from '../data/fr10-order-state-data.json';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

/**
 * Helper to create a test order in database with a specific status
 */
async function createTestOrder(status: string = 'pending'): Promise<number> {
  const loginRes = await axios.post(`${API_URL}/login`, { email: 'test@eshop.com', password: 'Test1234!' });
  const token = loginRes.data.token;

  const checkoutRes = await axios.post(
    `${API_URL}/checkout`,
    { total_amount: 1500000, shipping_address: '123 Test Street' },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const orderId = checkoutRes.data.orderId;

  if (status !== 'pending') {
    const adminLogin = await axios.post(`${API_URL}/login`, { email: 'admin@eshop.com', password: 'Admin123!' });
    const adminToken = adminLogin.data.token;

    // Follow state machine transitions up to requested status
    if (status === 'confirmed') {
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'confirmed' }, { headers: { Authorization: `Bearer ${adminToken}` } });
    } else if (status === 'shipping') {
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'confirmed' }, { headers: { Authorization: `Bearer ${adminToken}` } });
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'shipping' }, { headers: { Authorization: `Bearer ${adminToken}` } });
    } else if (status === 'delivered') {
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'confirmed' }, { headers: { Authorization: `Bearer ${adminToken}` } });
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'shipping' }, { headers: { Authorization: `Bearer ${adminToken}` } });
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'delivered' }, { headers: { Authorization: `Bearer ${adminToken}` } });
    } else if (status === 'canceled') {
      await axios.put(`${API_URL}/admin/orders/${orderId}/status`, { status: 'canceled' }, { headers: { Authorization: `Bearer ${adminToken}` } });
    }
  }

  return orderId;
}

/**
 * FR-10: Order State Machine — Data-Driven Test Suite
 * Run by: 23127391
 * Task 1: Cross-Browser Testing (Chromium, Firefox, WebKit)
 */
test.describe('FR-10: Order State Machine [Run by: 23127391]', () => {
  test.beforeEach(async ({ page }) => {
    test.info().annotations.push({ type: 'Run by', description: '23127391' });
    test.info().annotations.push({ type: 'Feature', description: 'FR-10 Order State Machine' });
  });

  for (const data of orderStateTestData) {
    test(`${data.scenarioId}: ${data.description}`, async ({ page }) => {
      const auth = new AuthHelper(page);
      const adminOrdersPage = new AdminOrdersPage(page);
      const profilePage = new ProfilePage(page);

      if (data.testType === 'ui_localization_badges') {
        await auth.injectAdminSession();
        await adminOrdersPage.goto();
        await expect(adminOrdersPage.ordersTable).toBeVisible();
        return;
      }

      if (data.testType === 'invalid_skip_transition' || data.testType === 'invalid_reverse_transition') {
        const orderId = await createTestOrder(data.initialStatus);
        const adminLogin = await axios.post(`${API_URL}/login`, { email: 'admin@eshop.com', password: 'Admin123!' });
        const adminToken = adminLogin.data.token;

        try {
          await axios.put(
            `${API_URL}/admin/orders/${orderId}/status`,
            { status: (data as any).attemptedStatus },
            { headers: { Authorization: `Bearer ${adminToken}` } }
          );
          expect(data.isAllowed).toBe(true);
        } catch (err: any) {
          expect(data.isAllowed).toBe(false);
          expect(err.response?.status).toBe(400);
          expect(err.response?.data?.error).toContain(data.expectedError);
        }
        return;
      }

      if (data.actor === 'customer') {
        const orderId = await createTestOrder(data.initialStatus);
        await auth.injectCustomerSession();
        await profilePage.goto();

        if (data.testType === 'security_customer_shipping_lock') {
          const row = profilePage.getOrderRow(orderId);
          const cancelBtn = row.getByRole('button', { name: data.targetAction! });
          if (await cancelBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
            await profilePage.cancelOrder(orderId);
            // Verify order status was not changed from shipping
            const currentStatus = await profilePage.getOrderStatus(orderId);
            expect(currentStatus).toContain('Đang giao');
          } else {
            expect(await cancelBtn.isVisible()).toBe(false);
          }
          return;
        }

        // Customer cancels order
        await profilePage.cancelOrder(orderId);
        await page.reload();
        const status = await profilePage.getOrderStatus(orderId);
        expect(status).toContain(data.expectedStatusLabel);
        return;
      }

      if (data.actor === 'admin') {
        const orderId = await createTestOrder(data.initialStatus);
        await auth.injectAdminSession();
        await adminOrdersPage.goto();

        if (data.testType.startsWith('final_state_')) {
          const availableActions = await adminOrdersPage.getAllAvailableActions(orderId);
          // Both delivered and canceled are terminal states with 0 allowed transitions
          expect(availableActions.length).toBe(0);
          return;
        }

        // Execute state transition
        await adminOrdersPage.clickOrderAction(orderId, data.targetAction!);
        const updatedStatus = await adminOrdersPage.getOrderStatus(orderId);
        expect(updatedStatus).toContain(data.expectedStatusLabel);
      }
    });
  }
});
