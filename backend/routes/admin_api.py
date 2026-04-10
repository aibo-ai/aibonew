import uuid
import bcrypt
import jwt
import os
import json
from datetime import datetime, timezone, timedelta
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from db.neon import get_pool

router = APIRouter(prefix='/admin')
bearer = HTTPBearer(auto_error=False)
SECRET = os.environ.get('JWT_SECRET', 'myaibo-secret-2025')

# ── Auth ────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

def make_token(user_id: str, email: str) -> str:
    payload = {'sub': user_id, 'email': email,
                'exp': datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, SECRET, algorithm='HS256')

async def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    if not creds:
        raise HTTPException(status_code=401, detail='Not authenticated')
    try:
        data = jwt.decode(creds.credentials, SECRET, algorithms=['HS256'])
        return data
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except Exception:
        raise HTTPException(status_code=401, detail='Invalid token')

@router.post('/login')
async def login(req: LoginRequest):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow('SELECT * FROM admin_users WHERE email=$1', req.email)
    if not row:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    if not bcrypt.checkpw(req.password.encode(), row['password_hash'].encode()):
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = make_token(row['id'], row['email'])
    return {'token': token, 'email': row['email'], 'id': row['id']}

# ── Blog CRUD ────────────────────────────────────────────────────────────────

class BlogCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = 'MyAibo Team'
    category: Optional[str] = None
    tags: Optional[List[str]] = []
    published: Optional[bool] = False
    featured_image: Optional[str] = None
    published_at: Optional[datetime] = None

class BlogUpdate(BlogCreate):
    pass

def row_to_blog(row):
    d = dict(row)
    for k in ['created_at', 'updated_at', 'published_at']:
        if d.get(k) and hasattr(d[k], 'isoformat'):
            d[k] = d[k].isoformat()
    return d

@router.get('/blogs')
async def list_blogs(_: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch('SELECT * FROM blogs ORDER BY created_at DESC')
    return [row_to_blog(r) for r in rows]

@router.post('/blogs', status_code=201)
async def create_blog(data: BlogCreate, _: dict = Depends(require_admin)):
    pool = await get_pool()
    blog_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    async with pool.acquire() as conn:
        await conn.execute("""
            INSERT INTO blogs (id,title,slug,excerpt,content,author,category,tags,
                               published,featured_image,published_at,created_at,updated_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        """, blog_id, data.title, data.slug, data.excerpt, data.content,
             data.author or 'MyAibo Team', data.category, data.tags or [],
             data.published, data.featured_image, data.published_at, now, now)
        row = await conn.fetchrow('SELECT * FROM blogs WHERE id=$1', blog_id)
    return row_to_blog(row)

@router.get('/blogs/{blog_id}')
async def get_blog(blog_id: str, _: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow('SELECT * FROM blogs WHERE id=$1', blog_id)
    if not row:
        raise HTTPException(404, 'Blog not found')
    return row_to_blog(row)

@router.put('/blogs/{blog_id}')
async def update_blog(blog_id: str, data: BlogUpdate, _: dict = Depends(require_admin)):
    pool = await get_pool()
    now = datetime.now(timezone.utc)
    async with pool.acquire() as conn:
        await conn.execute("""
            UPDATE blogs SET title=$2,slug=$3,excerpt=$4,content=$5,author=$6,
                category=$7,tags=$8,published=$9,featured_image=$10,
                published_at=$11,updated_at=$12 WHERE id=$1
        """, blog_id, data.title, data.slug, data.excerpt, data.content,
             data.author or 'MyAibo Team', data.category, data.tags or [],
             data.published, data.featured_image, data.published_at, now)
        row = await conn.fetchrow('SELECT * FROM blogs WHERE id=$1', blog_id)
    if not row:
        raise HTTPException(404, 'Blog not found')
    return row_to_blog(row)

@router.delete('/blogs/{blog_id}', status_code=204)
async def delete_blog(blog_id: str, _: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute('DELETE FROM blogs WHERE id=$1', blog_id)

# ── Case Study CRUD ──────────────────────────────────────────────────────────

class CaseStudyCreate(BaseModel):
    title: str
    client: Optional[str] = None
    industry: Optional[str] = None
    service: Optional[str] = None
    excerpt: Optional[str] = None
    challenge: Optional[str] = None
    solution: Optional[str] = None
    result: Optional[str] = None
    metrics: Optional[dict] = {}
    published: Optional[bool] = False
    featured_image: Optional[str] = None

class CaseStudyUpdate(CaseStudyCreate):
    pass

def row_to_cs(row):
    d = dict(row)
    for k in ['created_at', 'updated_at']:
        if d.get(k) and hasattr(d[k], 'isoformat'):
            d[k] = d[k].isoformat()
    if d.get('metrics') and isinstance(d['metrics'], str):
        d['metrics'] = json.loads(d['metrics'])
    return d

@router.get('/case-studies')
async def list_case_studies(_: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch('SELECT * FROM case_studies ORDER BY created_at DESC')
    return [row_to_cs(r) for r in rows]

@router.post('/case-studies', status_code=201)
async def create_case_study(data: CaseStudyCreate, _: dict = Depends(require_admin)):
    pool = await get_pool()
    cs_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    metrics_json = json.dumps(data.metrics or {})
    async with pool.acquire() as conn:
        await conn.execute("""
            INSERT INTO case_studies (id,title,client,industry,service,excerpt,
                challenge,solution,result,metrics,published,featured_image,created_at,updated_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,$12,$13,$14)
        """, cs_id, data.title, data.client, data.industry, data.service,
             data.excerpt, data.challenge, data.solution, data.result,
             metrics_json, data.published, data.featured_image, now, now)
        row = await conn.fetchrow('SELECT * FROM case_studies WHERE id=$1', cs_id)
    return row_to_cs(row)

@router.get('/case-studies/{cs_id}')
async def get_case_study(cs_id: str, _: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow('SELECT * FROM case_studies WHERE id=$1', cs_id)
    if not row:
        raise HTTPException(404, 'Case study not found')
    return row_to_cs(row)

@router.put('/case-studies/{cs_id}')
async def update_case_study(cs_id: str, data: CaseStudyUpdate, _: dict = Depends(require_admin)):
    pool = await get_pool()
    now = datetime.now(timezone.utc)
    metrics_json = json.dumps(data.metrics or {})
    async with pool.acquire() as conn:
        await conn.execute("""
            UPDATE case_studies SET title=$2,client=$3,industry=$4,service=$5,
                excerpt=$6,challenge=$7,solution=$8,result=$9,
                metrics=$10::jsonb,published=$11,featured_image=$12,updated_at=$13
            WHERE id=$1
        """, cs_id, data.title, data.client, data.industry, data.service,
             data.excerpt, data.challenge, data.solution, data.result,
             metrics_json, data.published, data.featured_image, now)
        row = await conn.fetchrow('SELECT * FROM case_studies WHERE id=$1', cs_id)
    if not row:
        raise HTTPException(404, 'Case study not found')
    return row_to_cs(row)

@router.delete('/case-studies/{cs_id}', status_code=204)
async def delete_case_study(cs_id: str, _: dict = Depends(require_admin)):
    pool = await get_pool()
    async with pool.acquire() as conn:
        await conn.execute('DELETE FROM case_studies WHERE id=$1', cs_id)

# ── Public endpoints (no auth) ───────────────────────────────────────────────

@router.get('/public/blogs')
async def public_blogs():
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            'SELECT * FROM blogs WHERE published=TRUE ORDER BY COALESCE(published_at,created_at) DESC'
        )
    return [row_to_blog(r) for r in rows]

@router.get('/public/blogs/{slug}')
async def public_blog_by_slug(slug: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow('SELECT * FROM blogs WHERE slug=$1 AND published=TRUE', slug)
    if not row:
        raise HTTPException(404, 'Blog not found')
    return row_to_blog(row)

@router.get('/public/case-studies')
async def public_case_studies():
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            'SELECT * FROM case_studies WHERE published=TRUE ORDER BY created_at DESC'
        )
    return [row_to_cs(r) for r in rows]
