from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse
import httpx
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

CMS_BACKEND_URL = "http://localhost:3002"

@router.api_route("/cms/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy_cms_backend(path: str, request: Request):
    """
    Proxy all requests to the CMS backend running on port 3002
    """
    try:
        # Get the full URL for the CMS backend
        cms_url = f"{CMS_BACKEND_URL}/{path}"
        
        # Get request body if present
        body = await request.body()
        
        # Forward the request to CMS backend
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.request(
                method=request.method,
                url=cms_url,
                headers={k: v for k, v in request.headers.items() 
                        if k.lower() not in ['host', 'connection']},
                content=body,
                params=request.query_params
            )
            
            # Return the response from CMS backend
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers)
            )
            
    except httpx.ConnectError:
        logger.error(f"Failed to connect to CMS backend at {CMS_BACKEND_URL}")
        return JSONResponse(
            status_code=503,
            content={"error": "CMS backend is not available"}
        )
    except Exception as e:
        logger.error(f"Error proxying request to CMS: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Proxy error: {str(e)}"}
        )
