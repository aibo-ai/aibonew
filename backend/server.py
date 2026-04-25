from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from routes.cms_proxy import router as cms_proxy_router
from routes.admin_api import router as admin_router
from db.neon import init_tables, close_pool, get_connection


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'noreply@myaibo.in')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'info@myaibo.in')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# ── Contact Form Models ──────────────────────────────────────────────────────

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    service_interest: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    service_interest: Optional[str] = None
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    async with get_connection() as conn:
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS status_checks (
                id TEXT PRIMARY KEY,
                client_name TEXT NOT NULL,
                timestamp TIMESTAMPTZ NOT NULL
            )
            """
        )
        await conn.execute(
            "INSERT INTO status_checks (id, client_name, timestamp) VALUES ($1, $2, $3)",
            status_obj.id,
            status_obj.client_name,
            status_obj.timestamp,
        )
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    async with get_connection() as conn:
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS status_checks (
                id TEXT PRIMARY KEY,
                client_name TEXT NOT NULL,
                timestamp TIMESTAMPTZ NOT NULL
            )
            """
        )
        rows = await conn.fetch(
            "SELECT id, client_name, timestamp FROM status_checks ORDER BY timestamp DESC LIMIT 1000"
        )

    return [
        StatusCheck(id=row["id"], client_name=row["client_name"], timestamp=row["timestamp"])
        for row in rows
    ]

# ── Contact Form Helpers ──────────────────────────────────────────────────────

def _build_notification_html(submission: ContactSubmission, submitted_at_str: str) -> str:
    """Build the HTML email body for a new contact form submission."""
    service_line = (
        f"<tr><td style='padding:8px 0;color:#666;'>Service Interest</td>"
        f"<td style='padding:8px 0;font-weight:600;color:#1a1a1a;'>"
        f"{submission.service_interest or 'Not specified'}</td></tr>"
        if submission.service_interest else ""
    )
    company_line = (
        f"<tr><td style='padding:8px 0;color:#666;'>Company</td>"
        f"<td style='padding:8px 0;font-weight:600;color:#1a1a1a;'>"
        f"{submission.company}</td></tr>"
        if submission.company else ""
    )
    date_display = (
        submission.submitted_at.strftime('%d %b %Y, %H:%M UTC')
        if hasattr(submission.submitted_at, 'strftime')
        else submitted_at_str
    )
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
      <div style="background:#7c3bed;padding:24px 32px;">
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600;">New Contact Form Submission</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">myaibo.in — {date_display}</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">{submission.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;"><a href="mailto:{submission.email}" style="color:#7c3bed;">{submission.email}</a></td></tr>
          {company_line}
          {service_line}
        </table>
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e5e5;">
          <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
          <p style="margin:0;color:#1a1a1a;line-height:1.7;white-space:pre-line;">{submission.message}</p>
        </div>
        <div style="margin-top:24px;">
          <a href="mailto:{submission.email}" style="display:inline-block;background:#7c3bed;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">Reply to {submission.name}</a>
        </div>
      </div>
    </div>
    """


async def _send_contact_notification(submission: ContactSubmission, notification_html: str) -> None:
    """Attempt to send email notification via Resend (non-blocking)."""
    try:
        params: resend.Emails.SendParams = {
            "from": f"MyAibo <{SENDER_EMAIL}>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New enquiry from {submission.name} — MyAibo",
            "html": notification_html,
        }
        email_response = await resend.Emails.send_async(params)
        logger.info(f"Contact notification sent for {submission.email}, id={email_response.get('id')}")
    except Exception as e:
        logger.error(f"Resend error: {type(e).__name__}: {str(e)}")


# ── Contact Form Endpoint ────────────────────────────────────────────────────

@api_router.post("/contact")
async def submit_contact(input: ContactSubmissionCreate):
    submission = ContactSubmission(**input.model_dump())
    try:
        async with get_connection() as conn:
            await conn.execute(
                """
                CREATE TABLE IF NOT EXISTS contact_submissions (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    company TEXT,
                    service_interest TEXT,
                    message TEXT NOT NULL,
                    submitted_at TIMESTAMPTZ NOT NULL
                )
                """
            )
            await conn.execute(
                """
                INSERT INTO contact_submissions
                (id, name, email, company, service_interest, message, submitted_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                """,
                submission.id,
                submission.name,
                submission.email,
                submission.company,
                submission.service_interest,
                submission.message,
                submission.submitted_at,
            )
    except Exception as e:
        logger.error(f"Contact DB write failed (continuing with notification): {e}")

    notification_html = _build_notification_html(submission, submission.submitted_at.isoformat())
    await _send_contact_notification(submission, notification_html)

    return {"status": "success", "id": submission.id}

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    async with get_connection() as conn:
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT,
                service_interest TEXT,
                message TEXT NOT NULL,
                submitted_at TIMESTAMPTZ NOT NULL
            )
            """
        )
        rows = await conn.fetch(
            """
            SELECT id, name, email, company, service_interest, message, submitted_at
            FROM contact_submissions
            ORDER BY submitted_at DESC
            LIMIT 1000
            """
        )

    return [
        ContactSubmission(
            id=row["id"],
            name=row["name"],
            email=row["email"],
            company=row["company"],
            service_interest=row["service_interest"],
            message=row["message"],
            submitted_at=row["submitted_at"],
        )
        for row in rows
    ]

# Include the router in the main app
app.include_router(api_router)
app.include_router(cms_proxy_router, prefix="/api")
app.include_router(admin_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_pool()

@app.on_event("startup")
async def startup():
    try:
        await init_tables()
    except Exception as e:
        logger.error(f"Neon DB init error (non-fatal): {e}")