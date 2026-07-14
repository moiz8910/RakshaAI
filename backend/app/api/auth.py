from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from jose import jwt
from app.schemas.auth import LoginRequest, LoginResponse
from app.core.config import settings

router = APIRouter()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return encoded_jwt

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    # Dummy authentication logic - accepts any employee ID and password
    if not request.employee_id or not request.password:
        raise HTTPException(status_code=400, detail="Employee ID and password required")
    
    # Generate mock token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": request.employee_id, "role": request.role},
        expires_delta=access_token_expires
    )
    
    permissions = ["read:dashboard"]
    if request.role == "Admin" or request.role == "CRO / Admin":
        permissions.append("write:settings")
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user_name=f"User {request.employee_id}",
        role=request.role,
        permissions=permissions
    )
