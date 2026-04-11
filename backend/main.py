from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from .database import engine, Base
from .routers import auth, users, workout, nutrition, ai, biometric

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ApexAI Fitness Assistant API")

# CORS configuration
ALLOWED_ORIGINS = [origin.strip().strip('"') for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(workout.router)
app.include_router(nutrition.router)
app.include_router(ai.router)
app.include_router(biometric.router)

@app.get("/")
async def root():
    return {"message": "Welcome to ApexAI Fitness Assistant API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
