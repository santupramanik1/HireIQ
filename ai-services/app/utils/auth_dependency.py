import jwt
import os
from fastapi import Request, HTTPException, status

async def require_auth(request: Request):
    """
    This function acts as targeted middleware. 
    It checks the token and attaches the user to request.state.
    """
    # 1. READ THE COOKIE
    token = request.cookies.get("access_token")

    # 2. FALLBACK TO HEADER
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    # 3. IF NO TOKEN, REJECT IMMEDIATELY
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access denied. No token provided."
        )

    # 4. VALIDATE AND ATTACH TO REQUEST STATE
    try:
        secret_key = os.getenv("JWT_ACCESS_SECRET") 
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        
        # This keeps your Express.js pattern exactly the same!
        request.state.user = payload 
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Session expired."
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid token."
        )