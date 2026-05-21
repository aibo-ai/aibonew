"""Vercel Python serverless entrypoint.

Vercel's Python runtime expects a top-level ASGI variable named `app`.
We import the FastAPI instance from the bundled `backend/` directory
(included via `includeFiles` in vercel.json).
"""
import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parent.parent / "backend"
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from server import app  # noqa: F401,E402  (re-exported for Vercel)
