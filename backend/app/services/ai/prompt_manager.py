class PromptManager:
    @staticmethod
    def get_fraud_assessment_prompt(claim_details: dict) -> str:
        return f"""
You are an expert Life Insurance Fraud Investigator.
Assess the following claim for fraud probability.

Claim Details:
- Policy Age (Years): {claim_details.get('policy_age_years')}
- Claim Amount: ${claim_details.get('claim_amount')}
- Medical History: {claim_details.get('medical_history')}
- Incident Details: {claim_details.get('incident_details')}

Analyze the details for inconsistencies or red flags.
Respond EXACTLY with a valid JSON object in this format:
{{
  "fraud_score": <number between 0 and 100>,
  "reasoning": "<your detailed reasoning>"
}}
"""
