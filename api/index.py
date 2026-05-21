"""Vercel Python serverless entrypoint."""
import os
import sys
import traceback
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse

BACKEND_ROOT = Path(__file__).resolve().parent.parent / "backend"
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

# Top-level app required by Vercel's static analyzer
app = FastAPI()

try:
    from server import app  # noqa: F811 - overrides the placeholder above
except Exception as _err:
    _tb = traceback.format_exc()
    _msg = f"{type(_err).__name__}: {_err}"

    @app.get("/api/health")
    @app.get("/api/")
    async def _diagnostic():
        return JSONResponse(status_code=500, content={
            "status": "import_failed",
            "error": _msg,
            "backend_root_exists": BACKEND_ROOT.exists(),
            "backend_listing": (
                [p.name for p in BACKEND_ROOT.iterdir()][:30]
                if BACKEND_ROOT.exists() else []
            ),
            "env_vars": {
                "NEON_DATABASE_URL": bool(os.environ.get("NEON_DATABASE_URL")),
                "JWT_SECRET": bool(os.environ.get("JWT_SECRET")),
            },
            "traceback": _tb.splitlines()[-15:],
        })

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
    async def _catch_all(path: str):
        return JSONResponse(status_code=500, content={
            "status": "import_failed", "error": _msg
        })