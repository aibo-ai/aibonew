#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form
Tests the FastAPI backend contact form endpoints
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://myaibo-redesign.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

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

def run_all_tests():
    """Run all backend tests and return summary"""
    print("🚀 Starting Backend API Tests")
    print(f"Testing against: {API_BASE}")
    
    results = {}
    
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