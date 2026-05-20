"""Backend tests for admin httpOnly cookie authentication.

Verifies:
- POST /api/admin/login sets HttpOnly+Secure+SameSite=None cookie
- GET /api/admin/me works with cookie alone
- Blog/Case Study CRUD work with cookie auth
- POST /api/admin/logout clears cookie
- Wrong credentials yield 401
- Missing auth yields 401
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
ADMIN_EMAIL = "admin@myaibo.in"
ADMIN_PASSWORD = "admin123"


@pytest.fixture
def fresh_session():
    return requests.Session()


@pytest.fixture
def logged_in_session():
    s = requests.Session()
    r = s.post(
        f"{BASE_URL}/api/admin/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=15,
    )
    if r.status_code != 200:
        pytest.skip(f"Login failed: {r.status_code} {r.text}")
    return s


# ── Auth flow ───────────────────────────────────────────────────────────────


class TestAdminAuth:
    def test_login_success_sets_httponly_cookie(self, fresh_session):
        r = fresh_session.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=15,
        )
        assert r.status_code == 200, f"body={r.text}"
        body = r.json()
        assert body.get("email") == ADMIN_EMAIL
        assert "id" in body

        # Check Set-Cookie raw header for HttpOnly+Secure+SameSite=None
        set_cookie = r.headers.get("set-cookie") or ""
        assert "admin_token=" in set_cookie.lower(), f"no admin_token cookie: {set_cookie}"
        lc = set_cookie.lower()
        assert "httponly" in lc, f"HttpOnly missing: {set_cookie}"
        assert "secure" in lc, f"Secure missing: {set_cookie}"
        assert "samesite=none" in lc, f"SameSite=None missing: {set_cookie}"

        # Session must now hold the cookie
        assert "admin_token" in fresh_session.cookies.get_dict()

    def test_login_wrong_password(self, fresh_session):
        r = fresh_session.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": ADMIN_EMAIL, "password": "wrong-pw"},
            timeout=15,
        )
        assert r.status_code == 401
        assert "admin_token" not in fresh_session.cookies.get_dict()

    def test_login_unknown_email(self, fresh_session):
        r = fresh_session.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "nobody@example.com", "password": "whatever"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_me_requires_auth(self, fresh_session):
        r = fresh_session.get(f"{BASE_URL}/api/admin/me", timeout=10)
        assert r.status_code == 401

    def test_me_with_cookie(self, logged_in_session):
        r = logged_in_session.get(f"{BASE_URL}/api/admin/me", timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0

    def test_logout_clears_cookie_and_blocks_further_access(self, logged_in_session):
        r = logged_in_session.post(f"{BASE_URL}/api/admin/logout", timeout=10)
        assert r.status_code == 200
        # Server must send a deletion Set-Cookie (Max-Age=0 or expired)
        sc = (r.headers.get("set-cookie") or "").lower()
        assert "admin_token=" in sc, f"no clear-cookie header: {sc}"
        # After logout, /me should 401 (requests session drops expired cookie)
        r2 = logged_in_session.get(f"{BASE_URL}/api/admin/me", timeout=10)
        assert r2.status_code == 401, f"still authed: {r2.status_code}"

    def test_blogs_endpoint_requires_auth(self, fresh_session):
        r = fresh_session.get(f"{BASE_URL}/api/admin/blogs", timeout=10)
        assert r.status_code == 401

    def test_case_studies_endpoint_requires_auth(self, fresh_session):
        r = fresh_session.get(f"{BASE_URL}/api/admin/case-studies", timeout=10)
        assert r.status_code == 401


# ── Blog CRUD via cookie ─────────────────────────────────────────────────────


class TestBlogCrudWithCookie:
    def test_list_blogs(self, logged_in_session):
        r = logged_in_session.get(f"{BASE_URL}/api/admin/blogs", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_blog_create_update_delete_persists(self, logged_in_session):
        slug = f"test-slug-{uuid.uuid4().hex[:8]}"
        payload = {
            "title": "TEST_ Cookie Auth Blog",
            "slug": slug,
            "excerpt": "test excerpt",
            "content": "test content",
            "category": "tech",
            "tags": ["test"],
            "published": False,
        }
        c = logged_in_session.post(f"{BASE_URL}/api/admin/blogs", json=payload, timeout=15)
        assert c.status_code == 201, c.text
        created = c.json()
        bid = created["id"]
        assert created["title"] == payload["title"]
        assert created["slug"] == slug

        g = logged_in_session.get(f"{BASE_URL}/api/admin/blogs/{bid}", timeout=10)
        assert g.status_code == 200
        assert g.json()["slug"] == slug

        payload["title"] = "TEST_ Cookie Auth Blog UPDATED"
        payload["published"] = True
        u = logged_in_session.put(f"{BASE_URL}/api/admin/blogs/{bid}", json=payload, timeout=15)
        assert u.status_code == 200
        assert u.json()["title"] == "TEST_ Cookie Auth Blog UPDATED"
        assert u.json()["published"] is True

        d = logged_in_session.delete(f"{BASE_URL}/api/admin/blogs/{bid}", timeout=10)
        assert d.status_code == 204
        gone = logged_in_session.get(f"{BASE_URL}/api/admin/blogs/{bid}", timeout=10)
        assert gone.status_code == 404


# ── Case Study CRUD via cookie ───────────────────────────────────────────────


class TestCaseStudyCrudWithCookie:
    def test_list_case_studies(self, logged_in_session):
        r = logged_in_session.get(f"{BASE_URL}/api/admin/case-studies", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_case_study_create_update_delete(self, logged_in_session):
        payload = {
            "title": f"TEST_ CS {uuid.uuid4().hex[:6]}",
            "client": "Acme",
            "industry": "SaaS",
            "service": "SEO",
            "excerpt": "x",
            "challenge": "c",
            "solution": "s",
            "result": "r",
            "metrics": {"roi": "200%"},
            "published": False,
        }
        c = logged_in_session.post(f"{BASE_URL}/api/admin/case-studies", json=payload, timeout=15)
        assert c.status_code == 201, c.text
        cs = c.json()
        cid = cs["id"]
        assert cs["title"] == payload["title"]

        payload["title"] = payload["title"] + " UPDATED"
        payload["published"] = True
        u = logged_in_session.put(f"{BASE_URL}/api/admin/case-studies/{cid}", json=payload, timeout=15)
        assert u.status_code == 200
        assert "UPDATED" in u.json()["title"]
        assert u.json()["published"] is True

        d = logged_in_session.delete(f"{BASE_URL}/api/admin/case-studies/{cid}", timeout=10)
        assert d.status_code == 204
        gone = logged_in_session.get(f"{BASE_URL}/api/admin/case-studies/{cid}", timeout=10)
        assert gone.status_code == 404


# ── Misc public surfaces still working ───────────────────────────────────────


class TestPublicSurfaces:
    def test_contact_post(self):
        r = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_ Contact",
                "email": "test@example.com",
                "company": "Acme",
                "service": "SEO",
                "message": "Hi from automated test",
            },
            timeout=20,
        )
        # Accept 200/201/202 success codes
        assert r.status_code in (200, 201, 202), f"{r.status_code}: {r.text}"
