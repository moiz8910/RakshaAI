from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.claim import Claim

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    # For now, return exactly the data required by the UI specification
    # In a full implementation, this would dynamically aggregate from the `Claim` table
    # and decode the user from the Bearer Token.
    
    return {
        "user": {
            "name": "Priya Sharma",
            "employee_id": "EMP10234",
            "role": "Claims Assessor",
            "branch": "Pune-Kothrud"
        },
        "summary": {
            "critical_cases": 6,
            "open_cases": 23,
            "due_today": 2
        }
    }
