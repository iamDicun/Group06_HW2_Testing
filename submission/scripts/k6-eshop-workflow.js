import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Environment configurations
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// 1. Load Data-Driven CSV Datasets using SharedArray (Memory Efficient for high VU counts)
export const usersData = new SharedArray('users_dataset', function () {
  return papaparse.parse(open('./data/users.csv'), { header: true }).data;
});

export const productsData = new SharedArray('products_dataset', function () {
  return papaparse.parse(open('./data/products.csv'), { header: true }).data;
});

export const ordersData = new SharedArray('orders_dataset', function () {
  return papaparse.parse(open('./data/orders.csv'), { header: true }).data;
});

// Helper for random integer between min and max (inclusive)
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Think-time simulation according to endpoint complexity
export function thinkAuth() {
  sleep(randomBetween(1, 2));
}

export function thinkRead() {
  sleep(randomBetween(2, 4));
}

export function thinkTransactional() {
  sleep(randomBetween(3, 5));
}

/**
 * Shared End-to-End User Journey Workflow
 * Covers all 3 endpoint groups: Auth-heavy, Read-heavy, Transactional
 */
export function runEShopWorkflow() {
  // Select user based on virtual user ID to ensure unique session and prevent lockout collision
  const userIndex = (__VU > 0 ? __VU - 1 : 0) % usersData.length;
  const user = usersData[userIndex] || {
    email: 'perf_user_0001@eshop.local',
    password: 'Password123!',
    name: 'Perf User 0001'
  };

  // Select dynamic product & order parameters
  const prodIndex = randomBetween(0, productsData.length - 1);
  const selectedProd = productsData[prodIndex] || {
    search_query: 'iPhone',
    expected_id: '1',
    expected_name: 'iPhone 15 Pro Max',
    price: '30000000'
  };

  const orderIndex = randomBetween(0, ordersData.length - 1);
  const selectedOrder = ordersData[orderIndex] || {
    shipping_address: '123 Le Loi St, District 1, Ho Chi Minh City',
    quantity: '1'
  };

  let token = null;
  let userId = null;

  // -------------------------------------------------------------
  // Group 1: AUTH-HEAVY (Login & Token generation)
  // -------------------------------------------------------------
  group('auth', function () {
    const loginPayload = JSON.stringify({
      email: user.email,
      password: user.password
    });

    const loginRes = http.post(`${BASE_URL}/api/login`, loginPayload, {
      headers: { 'Content-Type': 'application/json' },
      tags: { name: 'POST /api/login' }
    });

    const isLoginOk = check(loginRes, {
      'login status is 200': (r) => r.status === 200,
      'login token exists': (r) => {
        try {
          const body = r.json();
          return body && typeof body.token === 'string' && body.token.length > 0;
        } catch (e) {
          return false;
        }
      }
    });

    if (isLoginOk) {
      try {
        const body = loginRes.json();
        token = body.token;
        if (body.user && body.user.id) {
          userId = body.user.id;
        }
      } catch (e) {}
    }
  });

  thinkAuth();

  if (!token) {
    // If login failed (e.g. server overloaded or locked), terminate iteration early
    return;
  }

  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  // -------------------------------------------------------------
  // Group 2: READ-HEAVY (Product Search & Product Details)
  // -------------------------------------------------------------
  let targetProductId = selectedProd.expected_id || '1';
  let targetProductName = selectedProd.expected_name || 'iPhone 15 Pro Max';
  let targetProductPrice = parseInt(selectedProd.price, 10) || 30000000;

  group('read', function () {
    // Step 2.1: Search products with keyword
    const searchRes = http.get(
      `${BASE_URL}/api/products?search=${encodeURIComponent(selectedProd.search_query)}`,
      { tags: { name: 'GET /api/products?search' } }
    );

    check(searchRes, {
      'search status is 200': (r) => r.status === 200,
      'search returns array': (r) => {
        try {
          const items = r.json();
          return Array.isArray(items);
        } catch (e) {
          return false;
        }
      }
    });

    try {
      const items = searchRes.json();
      if (Array.isArray(items) && items.length > 0) {
        targetProductId = items[0].id;
        targetProductName = items[0].name;
        targetProductPrice = items[0].price;
      }
    } catch (e) {}

    // Step 2.2: View product details
    const detailRes = http.get(
      `${BASE_URL}/api/products/${targetProductId}`,
      { tags: { name: 'GET /api/products/:id' } }
    );

    check(detailRes, {
      'detail status is 200': (r) => r.status === 200,
      'detail returns product object': (r) => {
        try {
          const data = r.json();
          return data && (data.id == targetProductId || data.name !== undefined);
        } catch (e) {
          return false;
        }
      }
    });
  });

  thinkRead();

  // -------------------------------------------------------------
  // Group 3: TRANSACTIONAL (Add To Cart & Checkout)
  // -------------------------------------------------------------
  group('transactional', function () {
    const qty = parseInt(selectedOrder.quantity, 10) || 1;
    const itemPrice = parseInt(targetProductPrice, 10) || 100000;
    const totalAmount = itemPrice * qty;

    // Step 3.1: Add item to cart
    const cartPayload = JSON.stringify({
      id: targetProductId,
      name: targetProductName,
      price: itemPrice,
      quantity: qty
    });

    const cartRes = http.post(`${BASE_URL}/api/cart`, cartPayload, {
      headers: authHeaders.headers,
      tags: { name: 'POST /api/cart' }
    });

    check(cartRes, {
      'add to cart status is 200': (r) => r.status === 200
    });

    // Step 3.2: Complete checkout
    const checkoutPayload = JSON.stringify({
      total_amount: totalAmount,
      shipping_address: selectedOrder.shipping_address || '123 Test St, District 1, HCMC'
    });

    const checkoutRes = http.post(`${BASE_URL}/api/checkout`, checkoutPayload, {
      headers: authHeaders.headers,
      tags: { name: 'POST /api/checkout' }
    });

    check(checkoutRes, {
      'checkout status is 200': (r) => r.status === 200,
      'checkout returns orderId': (r) => {
        try {
          const body = r.json();
          return body && body.orderId !== undefined;
        } catch (e) {
          return false;
        }
      }
    });
  });

  thinkTransactional();

  // -------------------------------------------------------------
  // Group 4: READ-HEAVY (Order History Confirmation)
  // -------------------------------------------------------------
  group('read', function () {
    const orderHistRes = http.get(`${BASE_URL}/api/orders/my-orders`, {
      headers: authHeaders.headers,
      tags: { name: 'GET /api/orders/my-orders' }
    });

    check(orderHistRes, {
      'orders history status is 200': (r) => r.status === 200,
      'orders history is array': (r) => {
        try {
          return Array.isArray(r.json());
        } catch (e) {
          return false;
        }
      }
    });
  });

  thinkRead();
}
