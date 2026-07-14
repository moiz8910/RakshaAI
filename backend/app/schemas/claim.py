from pydantic import BaseModel
from typing import Optional

class ClaimCreate(BaseModel):
    claim_id: str
    policy_holder_name: str
    claim_amount: float
    policy_age_years: float
    medical_history: str
    incident_details: str

class ClaimResponse(ClaimCreate):
    id: int
    status: str
    fraud_score: Optional[float] = None
    is_high_risk: bool
    fraud_reasoning: Optional[str] = None
    
    class Config:
        from_attributes = True
