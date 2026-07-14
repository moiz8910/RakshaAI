from fastapi import APIRouter

router = APIRouter()

mock_cases = [
    {
        "id": "1",
        "claimantName": "Rajesh Kumar Verma",
        "policyNumber": "POL-LI-2024-887341",
        "summary": "Revival 71 days pre-death - cause-of-death mismatch",
        "amount": "25,00,000",
        "slaDay": 9,
        "slaTotal": 30,
        "riskScore": 78,
        "priorityColor": "#991B1B",
        "slaBgColor": "#FEE2E2",
        "slaTextColor": "#991B1B",
        "riskColor": "#991B1B"
    },
    {
        "id": "2",
        "claimantName": "Meena Iyer",
        "policyNumber": "POL-LI-2023-661205",
        "summary": "Multi-policy stacking across 3 insurers in 6 months",
        "amount": "40,00,000",
        "slaDay": 18,
        "slaTotal": 30,
        "riskScore": 71,
        "priorityColor": "#991B1B",
        "slaBgColor": "#FFEDD5",
        "slaTextColor": "#C2410C",
        "riskColor": "#991B1B"
    },
    {
        "id": "3",
        "claimantName": "Faisal Sheikh",
        "policyNumber": "POL-LI-2022-119087",
        "summary": "Early death claim, 8 months inside contestability window",
        "amount": "12,00,000",
        "slaDay": 6,
        "slaTotal": 30,
        "riskScore": 54,
        "priorityColor": "#CA8A04",
        "slaBgColor": "#FEF9C3",
        "slaTextColor": "#A16207",
        "riskColor": "#CA8A04"
    },
    {
        "id": "4",
        "claimantName": "Lakshmi Narayanan",
        "policyNumber": "POL-LI-2011-038821",
        "summary": "12-year policy, consistent premium history, no anomalies",
        "amount": "8,00,000",
        "slaDay": 24,
        "slaTotal": 30,
        "riskScore": 12,
        "priorityColor": "#059669",
        "slaBgColor": "#D1FAE5",
        "slaTextColor": "#047857",
        "riskColor": "#059669"
    }
]

@router.get("/")
def get_cases():
    return {
        "cases": mock_cases,
        "pagination": {
            "total": len(mock_cases),
            "page": 1,
            "pages": 1
        }
    }
