from app.services.ai.llm_factory import LLMFactory

class GeminiClient:
    def __init__(self):
        self.llm = LLMFactory.get_gemini_model()
        
    def generate_response(self, messages: list) -> str:
        response = self.llm.invoke(messages)
        return response.content
