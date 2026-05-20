#!/usr/bin/env python3
"""
Backend API Testing Script - Admin Auth & Listing Verification
Focused on verifying admin login, auth flows, and listing endpoints after recent fixes.
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "https://runtime-error-fix-5.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@myaibo.in"
ADMIN_PASSWORD = "admin123"

class APITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token = None
        self.headers = {"Content-Type": "application/json"}
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        print()
    
    def test_admin_login_success(self):
        """Test 1: POST /api/admin/login with correct credentials → 200 with {token, email, id}"""
        print("=== TEST 1: Admin Login (Correct Credentials) ===")
        try:
            response = requests.post(
                f"{self.base_url}/admin/login",
                json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if "token" in data and "email" in data and "id" in data:
                    self.token = data["token"]
                    self.headers["Authorization"] = f"Bearer {self.token}"
                    self.log_test(
                        "Admin Login - Correct Credentials", 
                        True, 
                        f"Status: 200, Token received, Email: {data.get('email')}, ID: {data.get('id')}"
                    )
                    return True
                else:
                    self.log_test(
                        "Admin Login - Correct Credentials", 
                        False, 
                        f"Status: 200 but missing required fields. Response: {json.dumps(data)}"
                    )
                    return False
            else:
                self.log_test(
                    "Admin Login - Correct Credentials", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                return False
                
        except Exception as e:
            self.log_test("Admin Login - Correct Credentials", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_login_wrong_password(self):
        """Test 2: POST /api/admin/login with WRONG password → 401 (not 500, not 405)"""
        print("=== TEST 2: Admin Login (Wrong Password) ===")
        try:
            response = requests.post(
                f"{self.base_url}/admin/login",
                json={"email": ADMIN_EMAIL, "password": "wrongpassword123"},
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 401:
                self.log_test(
                    "Admin Login - Wrong Password", 
                    True, 
                    f"Status: 401 (Unauthorized) as expected. Response: {response.text}"
                )
            else:
                self.log_test(
                    "Admin Login - Wrong Password", 
                    False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Admin Login - Wrong Password", False, f"Exception: {str(e)}")
    
    def test_get_blogs_with_token(self):
        """Test 3: GET /api/admin/blogs with Bearer token → 200 with array"""
        print("=== TEST 3: Get Blogs (With Auth Token) ===")
        try:
            response = requests.get(
                f"{self.base_url}/admin/blogs",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Get Blogs - With Token", 
                        True, 
                        f"Status: 200, Retrieved {len(data)} blogs"
                    )
                else:
                    self.log_test(
                        "Get Blogs - With Token", 
                        False, 
                        f"Status: 200 but response is not an array. Type: {type(data)}"
                    )
            else:
                self.log_test(
                    "Get Blogs - With Token", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Get Blogs - With Token", False, f"Exception: {str(e)}")
    
    def test_get_blogs_without_token(self):
        """Test 4: GET /api/admin/blogs WITHOUT token → 401 (not 500)"""
        print("=== TEST 4: Get Blogs (Without Auth Token) ===")
        try:
            response = requests.get(
                f"{self.base_url}/admin/blogs",
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 401:
                self.log_test(
                    "Get Blogs - Without Token", 
                    True, 
                    f"Status: 401 (Unauthorized) as expected. Response: {response.text}"
                )
            else:
                self.log_test(
                    "Get Blogs - Without Token", 
                    False, 
                    f"Expected 401, got {response.status_code}. Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Get Blogs - Without Token", False, f"Exception: {str(e)}")
    
    def test_get_case_studies_with_token(self):
        """Test 5: GET /api/admin/case-studies with Bearer token → 200 with array"""
        print("=== TEST 5: Get Case Studies (With Auth Token) ===")
        try:
            response = requests.get(
                f"{self.base_url}/admin/case-studies",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Get Case Studies - With Token", 
                        True, 
                        f"Status: 200, Retrieved {len(data)} case studies"
                    )
                else:
                    self.log_test(
                        "Get Case Studies - With Token", 
                        False, 
                        f"Status: 200 but response is not an array. Type: {type(data)}"
                    )
            else:
                self.log_test(
                    "Get Case Studies - With Token", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Get Case Studies - With Token", False, f"Exception: {str(e)}")
    
    def test_get_public_blogs(self):
        """Test 6: GET /api/admin/public/blogs (no auth) → 200 with array"""
        print("=== TEST 6: Get Public Blogs (No Auth Required) ===")
        try:
            response = requests.get(
                f"{self.base_url}/admin/public/blogs",
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Get Public Blogs - No Auth", 
                        True, 
                        f"Status: 200, Retrieved {len(data)} public blogs"
                    )
                else:
                    self.log_test(
                        "Get Public Blogs - No Auth", 
                        False, 
                        f"Status: 200 but response is not an array. Type: {type(data)}"
                    )
            else:
                self.log_test(
                    "Get Public Blogs - No Auth", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Get Public Blogs - No Auth", False, f"Exception: {str(e)}")
    
    def test_get_public_case_studies(self):
        """Test 7: GET /api/admin/public/case-studies (no auth) → 200 with array"""
        print("=== TEST 7: Get Public Case Studies (No Auth Required) ===")
        try:
            response = requests.get(
                f"{self.base_url}/admin/public/case-studies",
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "Get Public Case Studies - No Auth", 
                        True, 
                        f"Status: 200, Retrieved {len(data)} public case studies"
                    )
                else:
                    self.log_test(
                        "Get Public Case Studies - No Auth", 
                        False, 
                        f"Status: 200 but response is not an array. Type: {type(data)}"
                    )
            else:
                self.log_test(
                    "Get Public Case Studies - No Auth", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("Get Public Case Studies - No Auth", False, f"Exception: {str(e)}")
    
    def test_cors_preflight(self):
        """Test 8: OPTIONS /api/admin/login (CORS preflight) → 200/204 with CORS headers"""
        print("=== TEST 8: CORS Preflight (OPTIONS Request) ===")
        try:
            response = requests.options(
                f"{self.base_url}/admin/login",
                headers={
                    "Origin": "https://myaibo.in",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "content-type"
                },
                timeout=30
            )
            
            # Check if CORS headers are present
            cors_headers = {
                "access-control-allow-origin": response.headers.get("access-control-allow-origin", ""),
                "access-control-allow-methods": response.headers.get("access-control-allow-methods", ""),
                "access-control-allow-headers": response.headers.get("access-control-allow-headers", "")
            }
            
            has_cors = any(cors_headers.values())
            
            # Accept both 200 and 204 as valid OPTIONS responses
            if response.status_code in [200, 204] and has_cors:
                self.log_test(
                    "CORS Preflight - OPTIONS", 
                    True, 
                    f"Status: {response.status_code}, CORS headers present: {json.dumps(cors_headers, indent=2)}"
                )
            elif response.status_code in [200, 204]:
                self.log_test(
                    "CORS Preflight - OPTIONS", 
                    False, 
                    f"Status: {response.status_code} but missing CORS headers. All headers: {dict(response.headers)}"
                )
            else:
                self.log_test(
                    "CORS Preflight - OPTIONS", 
                    False, 
                    f"Status: {response.status_code}, Response: {response.text}"
                )
                
        except Exception as e:
            self.log_test("CORS Preflight - OPTIONS", False, f"Exception: {str(e)}")
    
    def print_summary(self):
        """Print test summary"""
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if failed_tests > 0:
            print("FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['details']}")
            print()
        
        print("ALL TEST RESULTS:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}")
        
        return failed_tests == 0

def main():
    """Main test execution"""
    print("=" * 60)
    print("Admin API Auth & Listing Verification Tests")
    print("=" * 60)
    print(f"Backend URL: {BASE_URL}")
    print(f"Admin Email: {ADMIN_EMAIL}")
    print("=" * 60)
    print()
    
    tester = APITester()
    
    # Test 1: Login with correct credentials (must pass to get token for other tests)
    if not tester.test_admin_login_success():
        print("❌ CRITICAL: Admin login failed. Some authenticated tests will be skipped.")
    
    # Test 2: Login with wrong password
    tester.test_admin_login_wrong_password()
    
    # Test 3: Get blogs with token (only if login succeeded)
    if tester.token:
        tester.test_get_blogs_with_token()
    else:
        print("⚠️  SKIPPED: Get Blogs With Token (no token available)")
    
    # Test 4: Get blogs without token
    tester.test_get_blogs_without_token()
    
    # Test 5: Get case studies with token (only if login succeeded)
    if tester.token:
        tester.test_get_case_studies_with_token()
    else:
        print("⚠️  SKIPPED: Get Case Studies With Token (no token available)")
    
    # Test 6: Get public blogs (no auth)
    tester.test_get_public_blogs()
    
    # Test 7: Get public case studies (no auth)
    tester.test_get_public_case_studies()
    
    # Test 8: CORS preflight
    tester.test_cors_preflight()
    
    # Print summary
    print()
    success = tester.print_summary()
    
    if success:
        print()
        print("🎉 All tests passed successfully!")
        sys.exit(0)
    else:
        print()
        print("⚠️  Some tests failed. Check the details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
