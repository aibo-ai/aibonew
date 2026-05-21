"""Vercel Python serverless entrypoint.

Vercel's Python runtime expects a top-level ASGI variable named `app`.
We import the FastAPI instance from the bundled `backend/` directory
(included via `includeFiles` in vercel.json).

If the import fails (missing env var, missing module, etc.), we fall
back to a minimal diagnostic app so the user sees the real error
instead of an opaque `FUNCTION_INVOCATION_FAILED`.
"""
import os
import sys
import traceback
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parent.parent / "backend"
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

_import_error = None
_import_traceback = ""

try:
    from server import app  # noqa: F401  (re-exported for Vercel)
except Exception as err:  # pragma: no cover - diagnostic fallback
    _import_error = err
    _import_traceback = "".join(traceback.format_exception(type(err), err, err.__traceback__))

if _import_error is not None:
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI()
    _err_summary = f"{type(_import_error).__name__}: {_import_error}"

    @app.get("/api/")
    @app.get("/api/health")
    async def diagnostic_root():
        return JSONResponse(
            status_code=500,
            content={
                "status": "import_failed",
                "error": _err_summary,
                "backend_root_exists": BACKEND_ROOT.exists(),
                "backend_root_listing": (
                    [p.name for p in BACKEND_ROOT.iterdir()][:30]
                    if BACKEND_ROOT.exists() else []
                ),
                "cwd_listing": os.listdir(".")[:30],
                "python_path": sys.path[:5],
                "env_vars_present": {
                    "NEON_DATABASE_URL": bool(os.environ.get("NEON_DATABASE_URL")),
                    "JWT_SECRET": bool(os.environ.get("JWT_SECRET")),
                    "RESEND_API_KEY": bool(os.environ.get("RESEND_API_KEY")),
                },
                "traceback": _import_traceback.splitlines()[-15:],
            },
        )

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
    async def diagnostic_catch_all(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "status": "import_failed",
                "error": _err_summary,
                "hint": "Hit /api/health for a full diagnostic dump.",
            },
        )
