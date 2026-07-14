from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.claim import Claim
from app.schemas.claim import ClaimCreate, ClaimResponse
from app.agents.graph_manager import graph_manager

router = APIRouter()

@router.post("/analyze", response_model=ClaimResponse)
def analyze_claim(claim_data: ClaimCreate, db: Session = Depends(get_db)):
    # Check if claim exists
    existing = db.query(Claim).filter(Claim.claim_id == claim_data.claim_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Claim already exists")

    # Create claim record
    db_claim = Claim(**claim_data.model_dump())
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    
    # Run Agent
    agent_result = graph_manager.analyze_claim(claim_data.model_dump())
    
    # Update claim with agent result
    db_claim.fraud_score = agent_result["fraud_score"]
    db_claim.is_high_risk = agent_result["is_high_risk"]
    db_claim.fraud_reasoning = agent_result["fraud_reasoning"]
    
    if db_claim.is_high_risk:
        db_claim.status = "Flagged"
        
    db.commit()
    db.refresh(db_claim)
    return db_claim

@router.get("/", response_model=list[ClaimResponse])
def get_claims(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    claims = db.query(Claim).offset(skip).limit(limit).all()
    return claims
