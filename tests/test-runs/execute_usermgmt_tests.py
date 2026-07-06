import os
import sqlite3
import subprocess
import json
import urllib.request
import urllib.error

backend_dir = r"E:\Users\Admin\Documents\GitHub\eshop-sut\backend"
db_path = os.path.join(backend_dir, "database.sqlite")
base_url = "http://localhost:3000"

def reset_db():
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
    # Ensure standard seed has user 1 as admin, user 2 as user, user 3 as user
    cursor.execute("INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (1, 'Admin User', 'admin@eshop.com', 'Admin123!', 'admin')")
    cursor.execute("INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (2, 'User Two', 'user2@eshop.com', 'User123!', 'user')")
    cursor.execute("INSERT OR REPLACE INTO users (id, name, email, password, role) VALUES (3, 'User Three', 'user3@eshop.com', 'User123!', 'user')")
    conn.commit()
    conn.close()
    print("Test data seeded successfully.")

def get_token(user_id, role):
    # Use node to sign token
    script = f"console.log(require('jsonwebtoken').sign({{ id: {user_id}, role: '{role}' }}, 'super_secret_key_that_should_not_be_here'))"
    result = subprocess.run(["node", "-e", script], cwd=backend_dir, capture_output=True, text=True, shell=True)
    return result.stdout.strip()

def make_request(method, path, headers=None, body=None):
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
        return 999, str(e)

def check_user_exists(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    return row is not None

# Generate tokens
admin_token = get_token(1, "admin")
user_token = get_token(2, "user")
guest_token = get_token(4, "guest")

# Token missing role
script_no_role = "console.log(require('jsonwebtoken').sign({ id: 5 }, 'super_secret_key_that_should_not_be_here'))"
token_no_role = subprocess.run(["node", "-e", script_no_role], cwd=backend_dir, capture_output=True, text=True, shell=True).stdout.strip()

results = {}

# Test Case 1: DELETE /api/admin/users/2 with Admin token
reset_db()
seed_test_data()
status, body = make_request("DELETE", "/api/admin/users/2", {"Authorization": f"Bearer {admin_token}"})
user_exists = check_user_exists(2)
if status == 200 and not user_exists:
    results["TC-USERMGMT-001"] = {"status": "PASSED", "detail": f"HTTP {status}, user 2 deleted: {body}"}
else:
    results["TC-USERMGMT-001"] = {"status": "FAILED", "detail": f"HTTP {status}, user_exists: {user_exists}, response: {body}"}

# Test Case 2: DELETE /api/admin/users/999999 with Admin token
status, body = make_request("DELETE", "/api/admin/users/999999", {"Authorization": f"Bearer {admin_token}"})
if status == 404:
    results["TC-USERMGMT-002"] = {"status": "PASSED", "detail": f"HTTP {status}, body: {body}"}
else:
    results["TC-USERMGMT-002"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 404), response: {body}"}

# Test Case 3: DELETE /api/admin/users/0 with Admin token
status, body = make_request("DELETE", "/api/admin/users/0", {"Authorization": f"Bearer {admin_token}"})
if status == 400:
    results["TC-USERMGMT-003"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-003"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 400), response: {body}"}

# Test Case 4: DELETE /api/admin/users/-1 with Admin token
status, body = make_request("DELETE", "/api/admin/users/-1", {"Authorization": f"Bearer {admin_token}"})
if status == 400:
    results["TC-USERMGMT-004"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-004"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 400), response: {body}"}

# Test Case 5: DELETE /api/admin/users/abc with Admin token
status, body = make_request("DELETE", "/api/admin/users/abc", {"Authorization": f"Bearer {admin_token}"})
if status == 400:
    results["TC-USERMGMT-005"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-005"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 400), response: {body}"}

# Test Case 6: DELETE /api/admin/users/2 without auth
reset_db()
seed_test_data()
status, body = make_request("DELETE", "/api/admin/users/2")
if status == 401:
    results["TC-USERMGMT-006"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-006"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 7: DELETE /api/admin/users/2 with bad format token
status, body = make_request("DELETE", "/api/admin/users/2", {"Authorization": f"Token {admin_token}"})
if status == 401:
    results["TC-USERMGMT-007"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-007"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 8: DELETE /api/admin/users/2 with invalid/expired token
status, body = make_request("DELETE", "/api/admin/users/2", {"Authorization": "Bearer invalid_token"})
if status == 401:
    results["TC-USERMGMT-008"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-008"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 9: DELETE /api/admin/users/3 with User token
reset_db()
seed_test_data()
status, body = make_request("DELETE", "/api/admin/users/3", {"Authorization": f"Bearer {user_token}"})
user3_exists = check_user_exists(3)
if status == 403 and user3_exists:
    results["TC-USERMGMT-009"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-009"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 403), user3_exists: {user3_exists}, response: {body}"}

# Test Case 10: DELETE /api/admin/users/2 with guest token
status, body = make_request("DELETE", "/api/admin/users/2", {"Authorization": f"Bearer {guest_token}"})
if status == 403:
    results["TC-USERMGMT-010"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-010"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 403), response: {body}"}

# Test Case 11: DELETE /api/admin/users/2 with missing role claim
status, body = make_request("DELETE", "/api/admin/users/2", {"Authorization": f"Bearer {token_no_role}"})
if status == 403:
    results["TC-USERMGMT-011"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-011"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 403), response: {body}"}

# Test Case 12: GET /api/admin/users with Admin token
status, body = make_request("GET", "/api/admin/users", {"Authorization": f"Bearer {admin_token}"})
if status == 200 and isinstance(body, list):
    results["TC-USERMGMT-012"] = {"status": "PASSED", "detail": f"HTTP {status}, users count: {len(body)}"}
else:
    results["TC-USERMGMT-012"] = {"status": "FAILED", "detail": f"HTTP {status}, response: {body}"}

# Test Case 13: GET /api/admin/users without Authorization
status, body = make_request("GET", "/api/admin/users")
if status == 401:
    results["TC-USERMGMT-013"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-013"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 14: GET /api/admin/users with Token no Bearer
status, body = make_request("GET", "/api/admin/users", {"Authorization": f"Token {admin_token}"})
if status == 401:
    results["TC-USERMGMT-014"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-014"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 15: GET /api/admin/users with invalid/expired token
status, body = make_request("GET", "/api/admin/users", {"Authorization": "Bearer invalid_token"})
if status == 401:
    results["TC-USERMGMT-015"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-015"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 401), response: {body}"}

# Test Case 16: GET /api/admin/users with User token
status, body = make_request("GET", "/api/admin/users", {"Authorization": f"Bearer {user_token}"})
if status == 403:
    results["TC-USERMGMT-016"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-016"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 403), response: {body}"}

# Test Case 17: GET /api/admin/users with guest token
status, body = make_request("GET", "/api/admin/users", {"Authorization": f"Bearer {guest_token}"})
if status == 403:
    results["TC-USERMGMT-017"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-017"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 403), response: {body}"}

# Test Case 18: DELETE /api/admin/users/1 with Admin token (Self-deletion)
reset_db()
seed_test_data()
status, body = make_request("DELETE", "/api/admin/users/1", {"Authorization": f"Bearer {admin_token}"})
admin_exists = check_user_exists(1)
if status == 400 and admin_exists:
    results["TC-USERMGMT-018"] = {"status": "PASSED", "detail": f"HTTP {status}"}
else:
    results["TC-USERMGMT-018"] = {"status": "FAILED", "detail": f"HTTP {status} (Expected 400), admin_exists: {admin_exists}, response: {body}"}

# Print results in human readable format
print("\n=== USER MANAGEMENT TEST RESULTS ===")
for tc, res in sorted(results.items()):
    print(f"{tc}: {res['status']}")
    if res['status'] == "FAILED":
        print(f"  Details: {res['detail']}")

# Write to raw_execution_results.json
with open("raw_usermgmt_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nSaved raw results to raw_usermgmt_results.json")
