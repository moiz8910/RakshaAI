from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

class LLMFactory:
    @staticmethod
    def get_gemini_model(temperature: float = 0.1):
        return ChatGoogleGenerativeAI(
            model=settings.model_name,
            google_api_key=settings.google_api_key,
            temperature=temperature
        )
