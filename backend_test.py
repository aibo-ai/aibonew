#!/usr/bin/env python3
"""
Backend API Testing Script for Admin Blog and Case Study CRUD Operations
Tests all endpoints with proper authentication and error handling.
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
    
    def admin_login(self):
        """Test admin login and get JWT token"""
        print("=== ADMIN LOGIN TEST ===")
        try:
            response = requests.post(
                f"{self.base_url}/admin/login",
                json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if "token" in data:
                    self.token = data["token"]
                    self.headers["Authorization"] = f"Bearer {self.token}"
                    self.log_test("Admin Login", True, f"Token received, email: {data.get('email')}")
                    return True
                else:
                    self.log_test("Admin Login", False, "No token in response")
                    return False
            else:
                self.log_test("Admin Login", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Login", False, f"Exception: {str(e)}")
            return False
    
    def test_blog_crud(self):
        """Test complete Blog CRUD operations"""
        print("=== BLOG CRUD TESTS ===")
        
        # Test data
        blog_data = {
            "title": "Test Blog Post - MyAibo AI Solutions",
            "slug": "test-blog-post-myaibo-ai",
            "excerpt": "Comprehensive testing of MyAibo's AI-powered business solutions and automation capabilities",
            "content": "This is a detailed test blog post about MyAibo's innovative AI solutions for modern businesses. Our platform provides cutting-edge automation, intelligent analytics, and seamless integration capabilities.",
            "author": "MyAibo Team",
            "category": "GEO",
            "tags": ["ai", "automation", "geo", "business-solutions"],
            "published": True,
            "featured_image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
        }
        
        blog_id = None
        
        # 1. Create Blog
        try:
            response = requests.post(
                f"{self.base_url}/admin/blogs",
                json=blog_data,
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 201:
                created_blog = response.json()
                blog_id = created_blog.get("id")
                if blog_id and created_blog.get("title") == blog_data["title"]:
                    self.log_test("Create Blog", True, f"Blog created with ID: {blog_id}")
                else:
                    self.log_test("Create Blog", False, "Blog created but missing ID or title mismatch")
            else:
                self.log_test("Create Blog", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Create Blog", False, f"Exception: {str(e)}")
        
        # 2. List Blogs
        try:
            response = requests.get(
                f"{self.base_url}/admin/blogs",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                blogs = response.json()
                if isinstance(blogs, list):
                    found_blog = any(blog.get("id") == blog_id for blog in blogs) if blog_id else False
                    self.log_test("List Blogs", True, f"Retrieved {len(blogs)} blogs, test blog found: {found_blog}")
                else:
                    self.log_test("List Blogs", False, "Response is not a list")
            else:
                self.log_test("List Blogs", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("List Blogs", False, f"Exception: {str(e)}")
        
        # 3. Update Blog (if created successfully)
        if blog_id:
            try:
                update_data = blog_data.copy()
                update_data["title"] = "Updated Test Blog Post - MyAibo AI Solutions"
                update_data["published"] = False
                
                response = requests.put(
                    f"{self.base_url}/admin/blogs/{blog_id}",
                    json=update_data,
                    headers=self.headers,
                    timeout=30
                )
                
                if response.status_code == 200:
                    updated_blog = response.json()
                    if updated_blog.get("title") == update_data["title"]:
                        self.log_test("Update Blog", True, f"Blog updated successfully, new title: {updated_blog.get('title')}")
                    else:
                        self.log_test("Update Blog", False, "Blog updated but title not changed")
                else:
                    self.log_test("Update Blog", False, f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test("Update Blog", False, f"Exception: {str(e)}")
        
        # 4. Public Blogs (no auth required)
        try:
            response = requests.get(
                f"{self.base_url}/admin/public/blogs",
                timeout=30
            )
            
            if response.status_code == 200:
                public_blogs = response.json()
                if isinstance(public_blogs, list):
                    self.log_test("Public Blogs", True, f"Retrieved {len(public_blogs)} public blogs")
                else:
                    self.log_test("Public Blogs", False, "Response is not a list")
            else:
                self.log_test("Public Blogs", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Public Blogs", False, f"Exception: {str(e)}")
        
        # 5. Delete Blog (if created successfully)
        if blog_id:
            try:
                response = requests.delete(
                    f"{self.base_url}/admin/blogs/{blog_id}",
                    headers=self.headers,
                    timeout=30
                )
                
                if response.status_code == 204:
                    self.log_test("Delete Blog", True, f"Blog {blog_id} deleted successfully")
                else:
                    self.log_test("Delete Blog", False, f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test("Delete Blog", False, f"Exception: {str(e)}")
    
    def test_case_study_crud(self):
        """Test complete Case Study CRUD operations"""
        print("=== CASE STUDY CRUD TESTS ===")
        
        # Test data
        case_study_data = {
            "title": "MyAibo AI Transformation - E-commerce Success Story",
            "client": "TechFlow Solutions",
            "industry": "D2C",
            "service": "GEO",
            "excerpt": "How MyAibo's AI-powered automation increased conversion rates by 340% for a leading D2C brand",
            "challenge": "TechFlow Solutions was struggling with manual processes, low conversion rates, and inefficient customer targeting. Their existing systems couldn't scale with growing demand.",
            "solution": "MyAibo implemented a comprehensive AI automation suite including intelligent customer segmentation, automated email campaigns, and predictive analytics for inventory management.",
            "result": "Within 6 months, TechFlow saw dramatic improvements across all key metrics. Customer engagement increased by 280%, conversion rates improved by 340%, and operational efficiency gained 150%.",
            "metrics": {
                "conversion_increase": "+340%",
                "engagement_boost": "+280%",
                "efficiency_gain": "+150%",
                "roi": "450%"
            },
            "published": True,
            "featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        }
        
        case_study_id = None
        
        # 1. Create Case Study
        try:
            response = requests.post(
                f"{self.base_url}/admin/case-studies",
                json=case_study_data,
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 201:
                created_cs = response.json()
                case_study_id = created_cs.get("id")
                if case_study_id and created_cs.get("title") == case_study_data["title"]:
                    self.log_test("Create Case Study", True, f"Case study created with ID: {case_study_id}")
                else:
                    self.log_test("Create Case Study", False, "Case study created but missing ID or title mismatch")
            else:
                self.log_test("Create Case Study", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Create Case Study", False, f"Exception: {str(e)}")
        
        # 2. List Case Studies
        try:
            response = requests.get(
                f"{self.base_url}/admin/case-studies",
                headers=self.headers,
                timeout=30
            )
            
            if response.status_code == 200:
                case_studies = response.json()
                if isinstance(case_studies, list):
                    found_cs = any(cs.get("id") == case_study_id for cs in case_studies) if case_study_id else False
                    self.log_test("List Case Studies", True, f"Retrieved {len(case_studies)} case studies, test case study found: {found_cs}")
                else:
                    self.log_test("List Case Studies", False, "Response is not a list")
            else:
                self.log_test("List Case Studies", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("List Case Studies", False, f"Exception: {str(e)}")
        
        # 3. Update Case Study (if created successfully)
        if case_study_id:
            try:
                update_data = case_study_data.copy()
                update_data["title"] = "Updated MyAibo AI Transformation - E-commerce Success Story"
                update_data["published"] = False
                update_data["metrics"]["roi"] = "500%"
                
                response = requests.put(
                    f"{self.base_url}/admin/case-studies/{case_study_id}",
                    json=update_data,
                    headers=self.headers,
                    timeout=30
                )
                
                if response.status_code == 200:
                    updated_cs = response.json()
                    if updated_cs.get("title") == update_data["title"]:
                        self.log_test("Update Case Study", True, f"Case study updated successfully, new title: {updated_cs.get('title')}")
                    else:
                        self.log_test("Update Case Study", False, "Case study updated but title not changed")
                else:
                    self.log_test("Update Case Study", False, f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test("Update Case Study", False, f"Exception: {str(e)}")
        
        # 4. Public Case Studies (no auth required)
        try:
            response = requests.get(
                f"{self.base_url}/admin/public/case-studies",
                timeout=30
            )
            
            if response.status_code == 200:
                public_cs = response.json()
                if isinstance(public_cs, list):
                    self.log_test("Public Case Studies", True, f"Retrieved {len(public_cs)} public case studies")
                else:
                    self.log_test("Public Case Studies", False, "Response is not a list")
            else:
                self.log_test("Public Case Studies", False, f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Public Case Studies", False, f"Exception: {str(e)}")
        
        # 5. Delete Case Study (if created successfully)
        if case_study_id:
            try:
                response = requests.delete(
                    f"{self.base_url}/admin/case-studies/{case_study_id}",
                    headers=self.headers,
                    timeout=30
                )
                
                if response.status_code == 204:
                    self.log_test("Delete Case Study", True, f"Case study {case_study_id} deleted successfully")
                else:
                    self.log_test("Delete Case Study", False, f"Status: {response.status_code}, Response: {response.text}")
                    
            except Exception as e:
                self.log_test("Delete Case Study", False, f"Exception: {str(e)}")
    
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
    print("Starting Admin Blog and Case Study CRUD API Tests")
    print(f"Backend URL: {BASE_URL}")
    print(f"Admin Email: {ADMIN_EMAIL}")
    print("=" * 60)
    
    tester = APITester()
    
    # Step 1: Login
    if not tester.admin_login():
        print("❌ CRITICAL: Admin login failed. Cannot proceed with authenticated tests.")
        sys.exit(1)
    
    # Step 2: Test Blog CRUD
    tester.test_blog_crud()
    
    # Step 3: Test Case Study CRUD
    tester.test_case_study_crud()
    
    # Step 4: Print summary
    success = tester.print_summary()
    
    if success:
        print("🎉 All tests passed successfully!")
        sys.exit(0)
    else:
        print("⚠️  Some tests failed. Check the details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()