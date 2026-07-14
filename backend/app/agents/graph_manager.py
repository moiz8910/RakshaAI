from langgraph.graph import StateGraph, END
from typing import TypedDict
from app.agents.nodes.agent_nodes import (
    claim_summary_node,
    medical_analysis_node,
    timeline_reconstruction_node,
    evidence_extraction_node,
    fraud_detection_node,
    risk_scoring_node,
    recommendation_node
)

class AgentState(TypedDict):
    claim_id: str
    raw_data: str
    claim_summary: str
    medical_analysis: str
    timeline: str
    evidence: str
    fraud_indicators: str
    risk_score_explanation: str
    recommendation: str

class GraphManager:
    def __init__(self):
        self.graph = self._build_graph()

    def _build_graph(self):
        workflow = StateGraph(AgentState)
        
        # Add nodes
        workflow.add_node("claim_summary", claim_summary_node)
        workflow.add_node("medical_analysis", medical_analysis_node)
        workflow.add_node("timeline_reconstruction", timeline_reconstruction_node)
        workflow.add_node("evidence_extraction", evidence_extraction_node)
        workflow.add_node("fraud_detection", fraud_detection_node)
        workflow.add_node("risk_scoring", risk_scoring_node)
        workflow.add_node("recommendation", recommendation_node)
        
        # Parallel execution from start
        workflow.set_entry_point("claim_summary") # Using this as a dummy entry, real parallel needs fan-out
        # Actually LangGraph allows proper parallel via edges if starting from a dummy node
        # Let's create a fan-out from start to the 4 parallel agents
        workflow.add_node("start_parallel", lambda state: state)
        workflow.set_entry_point("start_parallel")
        
        workflow.add_edge("start_parallel", "claim_summary")
        workflow.add_edge("start_parallel", "medical_analysis")
        workflow.add_edge("start_parallel", "timeline_reconstruction")
        workflow.add_edge("start_parallel", "evidence_extraction")
        
        # Fan-in to fraud_detection
        # Fraud detection waits for all 4 to complete
        workflow.add_edge("claim_summary", "fraud_detection")
        workflow.add_edge("medical_analysis", "fraud_detection")
        workflow.add_edge("timeline_reconstruction", "fraud_detection")
        workflow.add_edge("evidence_extraction", "fraud_detection")
        
        # Sequential pipeline
        workflow.add_edge("fraud_detection", "risk_scoring")
        workflow.add_edge("risk_scoring", "recommendation")
        workflow.add_edge("recommendation", END)
        
        return workflow.compile()

    def analyze_claim(self, claim_data: str):
        initial_state = AgentState(
            claim_id="TEST-001",
            raw_data=claim_data,
            claim_summary="",
            medical_analysis="",
            timeline="",
            evidence="",
            fraud_indicators="",
            risk_score_explanation="",
            recommendation=""
        )
        return self.graph.invoke(initial_state)

graph_manager = GraphManager()
