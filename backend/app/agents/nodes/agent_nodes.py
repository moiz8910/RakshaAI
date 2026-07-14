import os
from langchain_core.messages import HumanMessage, SystemMessage
from app.services.ai.llm_factory import LLMFactory

def load_prompt(filename: str) -> str:
    path = os.path.join(os.path.dirname(__file__), '..', '..', 'prompts', filename)
    with open(path, 'r') as f:
        return f.read()

def run_agent(state: dict, prompt_file: str, state_key: str, input_context: str):
    llm = LLMFactory.get_gemini_model()
    system_prompt = load_prompt(prompt_file)
    
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=input_context)
    ]
    
    response = llm.invoke(messages)
    return {state_key: response.content}

def claim_summary_node(state: dict):
    context = f"Claim ID: {state.get('claim_id')}\nData: {state.get('raw_data')}"
    return run_agent(state, "claim_summary.md", "claim_summary", context)

def medical_analysis_node(state: dict):
    context = f"Medical Data: {state.get('raw_data')}"
    return run_agent(state, "medical_analysis.md", "medical_analysis", context)

def timeline_reconstruction_node(state: dict):
    context = f"All Claim Documents: {state.get('raw_data')}"
    return run_agent(state, "timeline_reconstruction.md", "timeline", context)

def evidence_extraction_node(state: dict):
    context = f"Claim Data: {state.get('raw_data')}"
    return run_agent(state, "evidence_extraction.md", "evidence", context)

def fraud_detection_node(state: dict):
    # Fraud detection uses the outputs of the parallel nodes
    context = f"Summary: {state.get('claim_summary')}\nMedical: {state.get('medical_analysis')}\nTimeline: {state.get('timeline')}\nEvidence: {state.get('evidence')}"
    return run_agent(state, "fraud_detection.md", "fraud_indicators", context)

def risk_scoring_node(state: dict):
    context = f"Fraud Indicators: {state.get('fraud_indicators')}"
    return run_agent(state, "risk_scoring.md", "risk_score_explanation", context)

def recommendation_node(state: dict):
    context = f"Risk Score: {state.get('risk_score_explanation')}\nFraud Indicators: {state.get('fraud_indicators')}"
    return run_agent(state, "recommendation.md", "recommendation", context)
