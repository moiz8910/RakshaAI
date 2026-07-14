from qdrant_client import QdrantClient
from langchain_qdrant import QdrantVectorStore
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import settings
import os

QDRANT_PATH = os.path.join(os.path.dirname(__file__), 'qdrant_storage')
os.makedirs(QDRANT_PATH, exist_ok=True)

# Using local persistent storage
qdrant = QdrantClient(path=QDRANT_PATH)

def get_vector_store(collection_name: str) -> QdrantVectorStore:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004", 
        google_api_key=settings.google_api_key
    )
    
    store = QdrantVectorStore(
        client=qdrant,
        collection_name=collection_name,
        embedding=embeddings,
    )
    return store
