import os
import sys
from pathlib import Path
from mangum import Mangum


CURRENT_DIR = Path(__file__).resolve().parent
BACKEND_ROOT = CURRENT_DIR.parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

# Ensure serverless runs in production mode
os.environ.setdefault("NODE_ENV", "production")

from server import app  # noqa: E402


handler = Mangum(app)
