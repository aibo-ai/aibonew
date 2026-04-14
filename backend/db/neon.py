import asyncpg
import os
import logging
from typing import AsyncIterator
from contextlib import asynccontextmanager

logger: logging.Logger = logging.getLogger(__name__)


def _get_neon_url() -> str:
    neon_url: str = os.environ.get('NEON_DATABASE_URL', '')
    if not neon_url:
        raise RuntimeError('NEON_DATABASE_URL not configured')
    return neon_url


@asynccontextmanager
async def get_connection() -> AsyncIterator[asyncpg.Connection]:
    """Open and close a Neon connection per operation (serverless-safe)."""
    conn = await asyncpg.connect(_get_neon_url())
    try:
        yield conn
    finally:
        await conn.close()


class _ServerlessPoolCompat:
    """Compatibility layer for existing code using pool.acquire()."""

    @asynccontextmanager
    async def acquire(self) -> AsyncIterator[asyncpg.Connection]:
        async with get_connection() as conn:
            yield conn


async def get_pool() -> _ServerlessPoolCompat:
    """Return a lightweight compatibility wrapper (no shared pool)."""
    return _ServerlessPoolCompat()


async def close_pool() -> None:
    """No-op in serverless mode where connections are per request."""
    return None


async def _ensure_blogs_table(conn: asyncpg.Connection) -> None:
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


async def _ensure_case_studies_table(conn: asyncpg.Connection) -> None:
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


async def _ensure_admin_users_table(conn: asyncpg.Connection) -> None:
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
    if existing is None:
        import uuid
        import bcrypt
        pw_hash: str = bcrypt.hashpw(b'admin123', bcrypt.gensalt()).decode()
        await conn.execute(
            "INSERT INTO admin_users (id, email, password_hash) VALUES ($1, $2, $3)",
            str(uuid.uuid4()), 'admin@myaibo.in', pw_hash,
        )
        logger.info('Default admin user created: admin@myaibo.in / admin123')


async def init_tables() -> None:
    """Ensure all tables exist with correct schema (non-destructive)."""
    async with get_connection() as conn:
        await _ensure_admin_users_table(conn)
        await _ensure_blogs_table(conn)
        await _ensure_case_studies_table(conn)
    logger.info('Neon DB tables initialised')
