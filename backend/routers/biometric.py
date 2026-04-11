from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models
import random

router = APIRouter(prefix="/api/biometric", tags=["biometric"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/sync/{provider}")
async def start_sync(provider: str, db: Session = Depends(get_db)):
    # Mocking the OAuth Handshake
    if provider not in ["garmin", "whoop", "apple_health"]:
        raise HTTPException(status_code=400, detail="Invalid biometric provider")
    
    # In a real scenario, we would return the OAuth URL
    return {"message": f"Redirecting to {provider} authentication...", "auth_url": f"https://{provider}.com/oauth/authorize"}

@router.get("/status")
async def get_sync_status(db: Session = Depends(get_db)):
    # Mock status check
    return {
        "sync_active": True,
        "connected_source": "garmin",
        "last_sync": "2026-04-11T20:00:00Z"
    }

@router.get("/vitals")
async def get_live_vitals():
    # This endpoint would poll the actual device API
    # Currently returning randomized tactical drift for high-fidelity simulation
    return {
        "bpm": random.randint(65, 75),
        "hrv": random.randint(40, 50),
        "stress": random.randint(10, 20),
        "recovery": 88
    }
