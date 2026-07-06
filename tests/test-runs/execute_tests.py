import os
import sqlite3
import subprocess
import json
import urllib.request
import urllib.error

# Paths
backend_dir = r"E:\Users\Admin\Documents\GitHub\eshop-sut\backend"
db_path = os.path.join(backend_dir, "database.sqlite")
base_url = "http://localhost:3000"

def reset_db():
    # Run database.js to reset database to default seed
    print("Resetting database...")
    result = subprocess.run(["node", "database.js"], cwd=backend_dir, capture_output=True, text=True, shell=True)
    if result.returncode != 0:
        print("Error resetting database:", result.stderr)
        raise RuntimeError("Failed to reset database")
    print("Database reset successful.")

def seed_test_data():
    print("Seeding test data...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if test users exist, if not insert them
    # Users:
    # 42: user42@eshop.com, Password123!, user
    # 99: user99@eshop.com, Password123!, user
    # 100: normal user test@eshop.com (created by seed, but let's make sure or insert if needed)
    
    cursor.execute("INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (42, 'Test User 42', 'user42@eshop.com', 'Password123!', 'user')")
    cursor.execute("INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (99, 'Test User 99', 'user99@eshop.com', 'Password123!', 'user')")
    
    # Orders:
    # Order 1: pending
    # Order 2: confirmed
    # Order 3: shipping
    # Order 4: delivered
    # Order 5: canceled
    # Order 10: pending (user 42)
    # Order 11: confirmed (user 42)
    # Order 12: shipping (user 42)
    # Order 13: pending (user 99)
    # Order 14: pending (user 99)
    # Order 15: confirmed (user 99)
    # Order 16: shipping (user 99)
    
    orders = [
        (1, 42, 100000, "pending", "Address 1"),
        (2, 42, 200000, "confirmed", "Address 2"),
        (3, 42, 300000, "shipping", "Address 3"),
        (4, 42, 400000, "delivered", "Address 4"),
        (5, 42, 500000, "canceled", "Address 5"),
        (10, 42, 100000, "pending", "Address 10"),
        (11, 42, 200000, "confirmed", "Address 11"),
        (12, 42, 300000, "shipping", "Address 12"),
        (13, 99, 100000, "pending", "Address 13"),
        (14, 99, 100000, "pending", "Address 14"),
        (15, 99, 200000, "confirmed", "Address 15"),
        (16, 99, 300000, "shipping", "Address 16"),
    ]
    
    for order in orders:
        cursor.execute("INSERT OR REPLACE INTO orders (id, user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?, ?)", order)
        
    conn.commit()
    conn.close()
    print("Test data seeded successfully.")

def make_request(method, path, body=None, headers=None):
    url = f"{base_url}{path}"
    req_headers = {"Content-Type": "application/json"}
    if headers:
        req_headers.update(headers)
        
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        
    req = urllib.request.Request(url, data=data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            status_code = res.status
            response_body = res.read().decode("utf-8")
            try:
                response_json = json.loads(response_body)
            except:
                response_json = response_body
            return status_code, response_json
    except urllib.error.HTTPError as e:
        status_code = e.code
        response_body = e.read().decode("utf-8")
        try:
            response_json = json.loads(response_body)
        except:
            response_json = response_body
        return status_code, response_json
    except Exception as e:
        return 500, str(e)

def get_order_status_db(order_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT status FROM orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

def login(email, password):
    status, res = make_request("POST", "/api/login", {"email": email, "password": password})
    if status == 200:
        return res["token"]
    else:
        raise RuntimeError(f"Login failed for {email}: {res}")

def run_tests():
    # Reset and seed before test suite
    reset_db()
    seed_test_data()

    # Login and get tokens
    admin_token = login("admin@eshop.com", "Admin123!")
    user42_token = login("user42@eshop.com", "Password123!")
    
    results = {}
    
    def test_log(tc_id, success, actual_status, actual_body, db_status, expected_notes):
        results[tc_id] = {
            "success": success,
            "actual_status": actual_status,
            "actual_body": actual_body,
            "db_status": db_status,
            "expected_notes": expected_notes
        }
        print(f"{tc_id}: {'PASS' if success else 'FAIL'} (HTTP {actual_status}, DB {db_status})")
        if not success:
            print(f"  Details: {actual_body}")
    
    # TC-ORDERSTATE-001: PUT /api/admin/orders/1/status, {"status": "confirmed"} (Admin)
    # Expected: 200 OK, DB confirmed
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-001", status == 200 and db_status == "confirmed", status, body, db_status, "Mã phản hồi HTTP trả về là 200 OK và trạng thái là confirmed")

    # TC-ORDERSTATE-002: PUT /api/admin/orders/999999/status, {"status": "confirmed"} (Admin)
    # Expected: 404 Not Found
    status, body = make_request("PUT", "/api/admin/orders/999999/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    test_log("TC-ORDERSTATE-002", status == 404, status, body, None, "Mã phản hồi HTTP trả về là 404 Not Found")

    # TC-ORDERSTATE-003: PUT /api/admin/orders/0/status, {"status": "confirmed"} (Admin)
    # Expected: 400 Bad Request
    status, body = make_request("PUT", "/api/admin/orders/0/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    test_log("TC-ORDERSTATE-003", status == 400, status, body, None, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-004: PUT /api/admin/orders/-1/status, {"status": "confirmed"} (Admin)
    # Expected: 400 Bad Request
    status, body = make_request("PUT", "/api/admin/orders/-1/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    test_log("TC-ORDERSTATE-004", status == 400, status, body, None, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-005: PUT /api/admin/orders/abc/status, {"status": "confirmed"} (Admin)
    # Expected: 400 Bad Request
    status, body = make_request("PUT", "/api/admin/orders/abc/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    test_log("TC-ORDERSTATE-005", status == 400, status, body, None, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # Reset and seed for subsequent state transition tests
    reset_db()
    seed_test_data()

    # TC-ORDERSTATE-006: PUT /api/admin/orders/1/status, {"status": "processing"} (Admin)
    # Expected: 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "processing"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-006", status == 400 and db_status == "pending", status, body, db_status, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-007: PUT /api/admin/orders/1/status, {"status": ""} (Admin)
    # Expected: 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": ""}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-007", status == 400 and db_status == "pending", status, body, db_status, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-008: PUT /api/admin/orders/1/status, {} (Admin)
    # Expected: 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/admin/orders/1/status", {}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-008", status == 400 and db_status == "pending", status, body, db_status, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-009: PUT /api/admin/orders/1/status, {"status": 123} (Admin)
    # Expected: 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": 123}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-009", status == 400 and db_status == "pending", status, body, db_status, "Mã phản hồi HTTP trả về là 400 Bad Request")

    # TC-ORDERSTATE-010: PUT /api/admin/orders/1/status, {"status": "confirmed"} (Admin)
    # Expected: 200 OK, DB confirmed
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-010", status == 200 and db_status == "confirmed", status, body, db_status, "Chuyển thành công từ pending sang confirmed")

    # TC-ORDERSTATE-011: PUT /api/admin/orders/2/status, {"status": "shipping"} (Admin)
    # Expected: 200 OK, DB shipping
    status, body = make_request("PUT", "/api/admin/orders/2/status", {"status": "shipping"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(2)
    test_log("TC-ORDERSTATE-011", status == 200 and db_status == "shipping", status, body, db_status, "Chuyển thành công từ confirmed sang shipping")

    # TC-ORDERSTATE-012: PUT /api/admin/orders/3/status, {"status": "delivered"} (Admin)
    # Expected: 200 OK, DB delivered
    status, body = make_request("PUT", "/api/admin/orders/3/status", {"status": "delivered"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(3)
    test_log("TC-ORDERSTATE-012", status == 200 and db_status == "delivered", status, body, db_status, "Chuyển thành công từ shipping sang delivered")

    # TC-ORDERSTATE-013: Reset DB then pending -> canceled (Admin)
    # Expected: 200 OK, DB canceled
    reset_db()
    seed_test_data()
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "canceled"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-013", status == 200 and db_status == "canceled", status, body, db_status, "Chuyển thành công từ pending sang canceled")

    # TC-ORDERSTATE-014: confirmed -> canceled (Admin)
    status, body = make_request("PUT", "/api/admin/orders/2/status", {"status": "canceled"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(2)
    test_log("TC-ORDERSTATE-014", status == 200 and db_status == "canceled", status, body, db_status, "Chuyển thành công từ confirmed sang canceled")

    # TC-ORDERSTATE-015: pending -> shipping (Admin)
    # Expected: 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "shipping"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1) # Note: order 1 was canceled in TC-013, let's use another one or reset if needed, but wait! Order 1 status is canceled, so canceled -> shipping is invalid.
    # Let's do a reset to test state transition rules accurately
    reset_db()
    seed_test_data()
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "shipping"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(1)
    test_log("TC-ORDERSTATE-015", status == 400 and db_status == "pending", status, body, db_status, "Không cho nhảy bước từ pending sang shipping")

    # TC-ORDERSTATE-016: confirmed -> pending (Admin)
    # Expected: 400 Bad Request, DB confirmed
    status, body = make_request("PUT", "/api/admin/orders/2/status", {"status": "pending"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(2)
    test_log("TC-ORDERSTATE-016", status == 400 and db_status == "confirmed", status, body, db_status, "Không cho đi ngược từ confirmed sang pending")

    # TC-ORDERSTATE-017: shipping -> confirmed (Admin)
    # Expected: 400 Bad Request, DB shipping
    status, body = make_request("PUT", "/api/admin/orders/3/status", {"status": "confirmed"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(3)
    test_log("TC-ORDERSTATE-017", status == 400 and db_status == "shipping", status, body, db_status, "Không cho đi ngược từ shipping sang confirmed")

    # TC-ORDERSTATE-018: delivered -> canceled (Admin)
    # Expected: 400 Bad Request, DB delivered
    status, body = make_request("PUT", "/api/admin/orders/4/status", {"status": "canceled"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(4)
    test_log("TC-ORDERSTATE-018", status == 400 and db_status == "delivered", status, body, db_status, "Không cho hủy đơn delivered")

    # TC-ORDERSTATE-019: canceled -> pending (Admin)
    # Expected: 400 Bad Request, DB canceled
    status, body = make_request("PUT", "/api/admin/orders/5/status", {"status": "pending"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(5)
    test_log("TC-ORDERSTATE-019", status == 400 and db_status == "canceled", status, body, db_status, "Không cho phục hồi đơn canceled về pending")

    # TC-ORDERSTATE-020: shipping -> canceled (Admin)
    # Expected: 400 Bad Request, DB shipping
    status, body = make_request("PUT", "/api/admin/orders/3/status", {"status": "canceled"}, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(3)
    test_log("TC-ORDERSTATE-020", status == 400 and db_status == "shipping", status, body, db_status, "Không cho Admin hủy đơn shipping")

    # TC-ORDERSTATE-021: User cancels own pending order (User 42)
    # Expected: 200 OK, DB canceled
    status, body = make_request("PUT", "/api/orders/10/cancel", None, {"Authorization": f"Bearer {user42_token}"})
    db_status = get_order_status_db(10)
    test_log("TC-ORDERSTATE-021", status == 200 and db_status == "canceled", status, body, db_status, "User hủy đơn pending của chính mình thành công")

    # TC-ORDERSTATE-022: User cancels own confirmed order (User 42)
    # Expected: 200 OK, DB canceled
    status, body = make_request("PUT", "/api/orders/11/cancel", None, {"Authorization": f"Bearer {user42_token}"})
    db_status = get_order_status_db(11)
    test_log("TC-ORDERSTATE-022", status == 200 and db_status == "canceled", status, body, db_status, "User hủy đơn confirmed của chính mình thành công")

    # TC-ORDERSTATE-023: User cancels own shipping order (User 42)
    # Expected: 400 Bad Request, DB shipping
    status, body = make_request("PUT", "/api/orders/12/cancel", None, {"Authorization": f"Bearer {user42_token}"})
    db_status = get_order_status_db(12)
    test_log("TC-ORDERSTATE-023", status == 400 and db_status == "shipping", status, body, db_status, "User không được hủy đơn shipping của chính mình")

    # TC-ORDERSTATE-024: User cancels another user's order (User 42 tries to cancel Order 13 belonging to User 99)
    # Expected: 403 Forbidden / 400 Bad Request, DB pending
    status, body = make_request("PUT", "/api/orders/13/cancel", None, {"Authorization": f"Bearer {user42_token}"})
    db_status = get_order_status_db(13)
    test_log("TC-ORDERSTATE-024", (status == 403 or status == 400) and db_status == "pending", status, body, db_status, "Không cho phép user hủy đơn của người khác")

    # TC-ORDERSTATE-025: Admin cancels another user's pending order (Admin cancels Order 14 belonging to User 99)
    # Expected: 200 OK, DB canceled
    status, body = make_request("PUT", "/api/orders/14/cancel", None, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(14)
    test_log("TC-ORDERSTATE-025", status == 200 and db_status == "canceled", status, body, db_status, "Admin hủy đơn pending của người khác thành công")

    # TC-ORDERSTATE-026: Admin cancels another user's confirmed order (Admin cancels Order 15 belonging to User 99)
    # Expected: 200 OK, DB canceled
    status, body = make_request("PUT", "/api/orders/15/cancel", None, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(15)
    test_log("TC-ORDERSTATE-026", status == 200 and db_status == "canceled", status, body, db_status, "Admin hủy đơn confirmed của người khác thành công")

    # TC-ORDERSTATE-027: Admin cancels another user's shipping order (Admin cancels Order 16 belonging to User 99)
    # Expected: 400 Bad Request, DB shipping
    status, body = make_request("PUT", "/api/orders/16/cancel", None, {"Authorization": f"Bearer {admin_token}"})
    db_status = get_order_status_db(16)
    test_log("TC-ORDERSTATE-027", status == 400 and db_status == "shipping", status, body, db_status, "Admin không được hủy đơn shipping của người khác")

    # TC-ORDERSTATE-028: Update status without auth header
    # Expected: 401 Unauthorized
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"})
    test_log("TC-ORDERSTATE-028", status == 401, status, body, None, "Không truyền Auth header")

    # TC-ORDERSTATE-029: Update status with token without Bearer prefix
    # Expected: 401 Unauthorized
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"}, {"Authorization": admin_token})
    test_log("TC-ORDERSTATE-029", status == 401, status, body, None, "Token không có Bearer prefix")

    # TC-ORDERSTATE-030: Update status with invalid token
    # Expected: 401 Unauthorized
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"}, {"Authorization": "Bearer invalid_token_123"})
    test_log("TC-ORDERSTATE-030", status == 401, status, body, None, "Token không hợp lệ")

    # TC-ORDERSTATE-031: Normal user updates admin order status
    # Expected: 403 Forbidden
    status, body = make_request("PUT", "/api/admin/orders/1/status", {"status": "confirmed"}, {"Authorization": f"Bearer {user42_token}"})
    test_log("TC-ORDERSTATE-031", status == 403, status, body, None, "User bình thường truy cập API Admin")
    
    # Save test execution detail logs for reference
    with open(os.path.join(r"e:\Users\Admin\Documents\GitHub\Group06_HW2_Testing\tests\test-runs", "raw_execution_results.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    run_tests()
