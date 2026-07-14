from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from typing import TypedDict
import json
from app.core.config import settings
from langchain_core.messages import SystemMessage, HumanMessage

class AgentState(TypedDict):
    claim_id: str
    policy_age_years: float
    claim_amount: float
    medical_history: str
    incident_details: str
    fraud_score: float
    is_high_risk: bool
    fraud_reasoning: str

class GraphManager:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model=settings.model_name,
            google_api_key=settings.google_api_key,
            temperature=0.1
        )
        self.graph = self._build_graph()

    def _build_graph(self):
        workflow = StateGraph(AgentState)
        
        def assess_fraud(state: AgentState):
            prompt = f"""
You are an expert Life Insurance Fraud Investigator.
Assess the following claim for fraud probability.

Claim Details:
- Policy Age (Years): {state['policy_age_years']}
- Claim Amount: ${state['claim_amount']}
- Medical History: {state['medical_history']}
- Incident Details: {state['incident_details']}

Analyze the details for inconsistencies or red flags (e.g. policy is very new, high amount, suspicious incident vs medical history).
Respond EXACTLY with a valid JSON object in this format:
{{
  "fraud_score": <number between 0 and 100>,
  "reasoning": "<your detailed reasoning>"
}}
"""
            messages = [
                SystemMessage(content="You are a helpful assistant that outputs only JSON."),
                HumanMessage(content=prompt)
            ]
            response = self.llm.invoke(messages)
            
            try:
                # Basic parsing to extract json
                text = response.content.strip()
                if text.startswith("```json"):
                    text = text[7:-3]
                elif text.startswith("```"):
                    text = text[3:-3]
                    
                result = json.loads(text.strip())
                score = float(result.get("fraud_score", 0))
                
                return {
                    "fraud_score": score,
                    "is_high_risk": score > 70,
                    "fraud_reasoning": result.get("reasoning", "No reasoning provided.")
                }
            except Exception as e:
                return {
                    "fraud_score": 50.0,
                    "is_high_risk": False,
                    "fraud_reasoning": f"Error parsing AI response: {str(e)}"
                }
            
        workflow.add_node("assess", assess_fraud)
        workflow.set_entry_point("assess")
        workflow.add_edge("assess", END)
        
        return workflow.compile()

    def analyze_claim(self, claim_data: dict):
        initial_state = AgentState(
            claim_id=claim_data.get("claim_id", ""),
            policy_age_years=claim_data.get("policy_age_years", 0.0),
            claim_amount=claim_data.get("claim_amount", 0.0),
            medical_history=claim_data.get("medical_history", ""),
            incident_details=claim_data.get("incident_details", ""),
            fraud_score=0.0,
            is_high_risk=False,
            fraud_reasoning=""
        )
        final_state = self.graph.invoke(initial_state)
        return final_state

graph_manager = GraphManager()
