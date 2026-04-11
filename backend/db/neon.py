import asyncpg
import os
import logging

logger = logging.getLogger(__name__)

_pool = None


async def get_pool():
    global _pool
    if _pool == None:  # noqa: E711 — explicit equality check per lint rule
        neon_url = os.environ.get('NEON_DATABASE_URL', '')
        if not neon_url:
            raise RuntimeError('NEON_DATABASE_URL not configured')
        try:
            _pool = await asyncpg.create_pool(neon_url, min_size=1, max_size=5)
            logger.info('Neon PostgreSQL pool created')
        except Exception as exc:
            _pool = None
            raise RuntimeError(f'Failed to create Neon pool: {exc}') from exc
    if _pool == None:  # noqa: E711
        raise RuntimeError('Database pool is not available')
    return _pool


async def close_pool():
    global _pool
    if _pool:
        await _pool.close()
        _pool = None


async def _ensure_blogs_table(conn):
    """Create blogs table if it does not exist."""
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS blogs (
            id              TEXT PRIMARY KEY,
            title           TEXT NOT NULL,
            slug            TEXT UNIQUE NOT NULL,
            excerpt         TEXT,
            content         TEXT,
            author          TEXT DEFAULT 'MyAibo Team',
            category        TEXT,
            tags            TEXT[],
            published       BOOLEAN DEFAULT FALSE,
            featured_image  TEXT,
            published_at    TIMESTAMPTZ,
            created_at      TIMESTAMPTZ DEFAULT NOW(),
            updated_at      TIMESTAMPTZ DEFAULT NOW()
        );
    """)


async def _ensure_case_studies_table(conn):
    """Create case_studies table if it does not exist."""
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS case_studies (
            id              TEXT PRIMARY KEY,
            title           TEXT NOT NULL,
            client          TEXT,
            industry        TEXT,
            service         TEXT,
            excerpt         TEXT,
            challenge       TEXT,
            solution        TEXT,
            result          TEXT,
            metrics         JSONB DEFAULT '{}',
            published       BOOLEAN DEFAULT FALSE,
            featured_image  TEXT,
            created_at      TIMESTAMPTZ DEFAULT NOW(),
            updated_at      TIMESTAMPTZ DEFAULT NOW()
        );
    """)


async def _ensure_admin_users_table(conn):
    """Create admin_users table and seed default admin if empty."""
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS admin_users (
            id          TEXT PRIMARY KEY,
            email       TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at  TIMESTAMPTZ DEFAULT NOW()
        );
    """)
    existing = await conn.fetchrow("SELECT id FROM admin_users LIMIT 1")
    if not existing:
        import uuid
        import bcrypt
        pw_hash = bcrypt.hashpw(b'admin123', bcrypt.gensalt()).decode()
        await conn.execute(
            "INSERT INTO admin_users (id, email, password_hash) VALUES ($1, $2, $3)",
            str(uuid.uuid4()), 'admin@myaibo.in', pw_hash
        )
        logger.info('Default admin user created: admin@myaibo.in / admin123')


async def init_tables():
    """Ensure all tables exist with correct schema (non-destructive)."""
    pool = await get_pool()
    async with pool.acquire() as conn:
        await _ensure_admin_users_table(conn)
        await _ensure_blogs_table(conn)
        await _ensure_case_studies_table(conn)
    logger.info('Neon DB tables initialised')
