from app.services.ai.gemini_client import GeminiClient
from app.services.ai.prompt_manager import PromptManager
from langchain_core.messages import SystemMessage, HumanMessage
import json

class AIService:
    def __init__(self):
        self.client = GeminiClient()

    def parse_json_response(self, content: str) -> dict:
        text = content.strip()
        if text.startswith("```json"):
            text = text[7:-3]
        elif text.startswith("```"):
            text = text[3:-3]
        return json.loads(text.strip())

    def assess_fraud(self, claim_details: dict) -> dict:
        prompt = PromptManager.get_fraud_assessment_prompt(claim_details)
        messages = [
            SystemMessage(content="You are a helpful assistant that outputs only JSON."),
            HumanMessage(content=prompt)
        ]
        response_content = self.client.generate_response(messages)
        try:
            result = self.parse_json_response(response_content)
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
