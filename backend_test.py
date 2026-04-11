#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form and Admin APIs
Tests the FastAPI backend contact form and admin endpoints
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://content-manager-134.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

# Global variable to store admin token
admin_token = None
created_blog_id = None

def test_root_endpoint():
    """Test GET /api/ - Root endpoint"""
    print("\n=== Testing Root Endpoint ===")
    try:
        response = requests.get(f"{API_BASE}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200 and response.json().get("message") == "Hello World":
            print("✅ Root endpoint working correctly")
            return True
        else:
            print("❌ Root endpoint failed - unexpected response")
            return False
    except Exception as e:
        print(f"❌ Root endpoint failed with error: {str(e)}")
        return False

def test_contact_form_valid_all_fields():
    """Test POST /api/contact with all fields filled"""
    print("\n=== Testing Contact Form - All Fields ===")
    
    test_data = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "company": "Tech Solutions Inc",
        "service_interest": "AI Automations",
        "message": "I'm interested in learning more about your AI automation services for our e-commerce platform."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("status") == "success" and "id" in result:
                print("✅ Contact form submission with all fields successful")
                return True, result.get("id")
            else:
                print("❌ Contact form submission failed - invalid response format")
                return False, None
        else:
            print(f"❌ Contact form submission failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Contact form submission failed with error: {str(e)}")
        return False, None

def test_contact_form_required_fields_only():
    """Test POST /api/contact with only required fields"""
    print("\n=== Testing Contact Form - Required Fields Only ===")
    
    test_data = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "message": "This is a test message with only required fields."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("status") == "success" and "id" in result:
                print("✅ Contact form submission with required fields only successful")
                return True, result.get("id")
            else:
                print("❌ Contact form submission failed - invalid response format")
                return False, None
        else:
            print(f"❌ Contact form submission failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Contact form submission failed with error: {str(e)}")
        return False, None

def test_contact_form_invalid_email():
    """Test POST /api/contact with invalid email"""
    print("\n=== Testing Contact Form - Invalid Email ===")
    
    test_data = {
        "name": "Test User",
        "email": "invalid-email-format",
        "message": "This should fail due to invalid email format."
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 422:
            print("✅ Contact form correctly rejected invalid email with 422 validation error")
            return True
        else:
            print(f"❌ Contact form should have returned 422 for invalid email, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact form invalid email test failed with error: {str(e)}")
        return False

def test_get_contact_submissions():
    """Test GET /api/contact - Get all contact submissions"""
    print("\n=== Testing Get Contact Submissions ===")
    
    try:
        response = requests.get(f"{API_BASE}/contact")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            submissions = response.json()
            print(f"Number of submissions retrieved: {len(submissions)}")
            
            if len(submissions) > 0:
                print("Sample submission structure:")
                sample = submissions[0]
                for key, value in sample.items():
                    print(f"  {key}: {value}")
            
            print("✅ Contact submissions retrieval successful")
            return True
        else:
            print(f"❌ Contact submissions retrieval failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Contact submissions retrieval failed with error: {str(e)}")
        return False

def test_admin_login():
    """Test POST /api/admin/login with admin credentials"""
    global admin_token
    print("\n=== Testing Admin Login ===")
    
    login_data = {
        "email": "admin@myaibo.in",
        "password": "admin123"
    }
    
    try:
        response = requests.post(f"{API_BASE}/admin/login", json=login_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if "token" in result and "email" in result and "id" in result:
                admin_token = result["token"]
                print("✅ Admin login successful")
                return True
            else:
                print("❌ Admin login failed - missing required fields in response")
                return False
        else:
            print(f"❌ Admin login failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin login failed with error: {str(e)}")
        return False

def test_admin_get_blogs():
    """Test GET /api/admin/blogs with authorization"""
    print("\n=== Testing Admin Get Blogs ===")
    
    if not admin_token:
        print("❌ No admin token available - login test must pass first")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    try:
        response = requests.get(f"{API_BASE}/admin/blogs", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            blogs = response.json()
            if isinstance(blogs, list):
                print(f"✅ Admin get blogs successful - returned {len(blogs)} blogs")
                return True
            else:
                print("❌ Admin get blogs failed - response is not a list")
                return False
        else:
            print(f"❌ Admin get blogs failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin get blogs failed with error: {str(e)}")
        return False

def test_admin_create_blog():
    """Test POST /api/admin/blogs with authorization"""
    global created_blog_id
    print("\n=== Testing Admin Create Blog ===")
    
    if not admin_token:
        print("❌ No admin token available - login test must pass first")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    blog_data = {
        "title": "Test Post",
        "slug": "test-post",
        "excerpt": "Test",
        "content": "Hello World",
        "published": False
    }
    
    try:
        response = requests.post(f"{API_BASE}/admin/blogs", json=blog_data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            result = response.json()
            if "id" in result and result.get("title") == "Test Post":
                created_blog_id = result["id"]
                print("✅ Admin create blog successful")
                return True
            else:
                print("❌ Admin create blog failed - missing id or incorrect title in response")
                return False
        else:
            print(f"❌ Admin create blog failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin create blog failed with error: {str(e)}")
        return False

def test_admin_get_case_studies():
    """Test GET /api/admin/case-studies with authorization"""
    print("\n=== Testing Admin Get Case Studies ===")
    
    if not admin_token:
        print("❌ No admin token available - login test must pass first")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    try:
        response = requests.get(f"{API_BASE}/admin/case-studies", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            case_studies = response.json()
            if isinstance(case_studies, list):
                print(f"✅ Admin get case studies successful - returned {len(case_studies)} case studies")
                return True
            else:
                print("❌ Admin get case studies failed - response is not a list")
                return False
        else:
            print(f"❌ Admin get case studies failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin get case studies failed with error: {str(e)}")
        return False

def test_admin_public_blogs():
    """Test GET /api/admin/public/blogs (no auth needed)"""
    print("\n=== Testing Admin Public Blogs ===")
    
    try:
        response = requests.get(f"{API_BASE}/admin/public/blogs")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            blogs = response.json()
            if isinstance(blogs, list):
                print(f"✅ Admin public blogs successful - returned {len(blogs)} published blogs")
                return True
            else:
                print("❌ Admin public blogs failed - response is not a list")
                return False
        else:
            print(f"❌ Admin public blogs failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin public blogs failed with error: {str(e)}")
        return False

def test_admin_delete_blog():
    """Test DELETE /api/admin/blogs/{id} with authorization"""
    print("\n=== Testing Admin Delete Blog ===")
    
    if not admin_token:
        print("❌ No admin token available - login test must pass first")
        return False
    
    if not created_blog_id:
        print("❌ No blog ID available - create blog test must pass first")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    try:
        response = requests.delete(f"{API_BASE}/admin/blogs/{created_blog_id}", headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 204:
            print("✅ Admin delete blog successful")
            return True
        else:
            print(f"❌ Admin delete blog failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Admin delete blog failed with error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests and return summary"""
    print("🚀 Starting Backend API Tests")
    print(f"Testing against: {API_BASE}")
    
    results = {}
    
    # Contact Form Tests (existing)
    # Test 1: Root endpoint
    results['root_endpoint'] = test_root_endpoint()
    
    # Test 2: Contact form with all fields
    success, submission_id = test_contact_form_valid_all_fields()
    results['contact_all_fields'] = success
    
    # Test 3: Contact form with required fields only
    success, submission_id2 = test_contact_form_required_fields_only()
    results['contact_required_only'] = success
    
    # Test 4: Contact form with invalid email
    results['contact_invalid_email'] = test_contact_form_invalid_email()
    
    # Test 5: Get contact submissions
    results['get_submissions'] = test_get_contact_submissions()
    
    # Admin API Tests (new)
    # Test 6: Admin login
    results['admin_login'] = test_admin_login()
    
    # Test 7: Admin get blogs
    results['admin_get_blogs'] = test_admin_get_blogs()
    
    # Test 8: Admin create blog
    results['admin_create_blog'] = test_admin_create_blog()
    
    # Test 9: Admin get case studies
    results['admin_get_case_studies'] = test_admin_get_case_studies()
    
    # Test 10: Admin public blogs
    results['admin_public_blogs'] = test_admin_public_blogs()
    
    # Test 11: Admin delete blog
    results['admin_delete_blog'] = test_admin_delete_blog()
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return True
    else:
        print("⚠️  Some tests failed - check details above")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)