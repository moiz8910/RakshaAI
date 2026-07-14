from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.claim import Claim

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    active_cases = db.query(Claim).filter(Claim.status.in_(["Pending", "Flagged"])).count()
    high_risk_flags = db.query(Claim).filter(Claim.is_high_risk == True).count()
    resolved = db.query(Claim).filter(Claim.status.in_(["Approved", "Rejected"])).count()
    
    return {
        "active_cases": active_cases,
        "high_risk_flags": high_risk_flags,
        "resolved": resolved
    }
