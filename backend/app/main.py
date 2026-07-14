from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, claims, dashboard
from app.db.session import engine, Base

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="RakshaAI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(claims.router, prefix="/api/claims", tags=["claims"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/")
def read_root():
    return {"message": "Welcome to RakshaAI API"}
