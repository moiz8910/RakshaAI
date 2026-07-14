from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from app.db.session import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, unique=True, index=True)
    policy_holder_name = Column(String, index=True)
    claim_amount = Column(Float)
    policy_age_years = Column(Float)
    medical_history = Column(Text)
    incident_details = Column(Text)
    status = Column(String, default="Pending") # Pending, Approved, Rejected

    # Fraud Analysis Result
    fraud_score = Column(Float, nullable=True) # 0 to 100
    is_high_risk = Column(Boolean, default=False)
    fraud_reasoning = Column(Text, nullable=True)
