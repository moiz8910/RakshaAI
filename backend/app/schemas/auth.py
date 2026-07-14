from pydantic import BaseModel

class LoginRequest(BaseModel):
    employee_id: str
    password: str
    role: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user_name: str
    employee_id: str
    branch: str
    role: str
    permissions: list[str]
