from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import sys
import os

# Add parent directory to path to allow relative imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
import models, schemas, auth

router = APIRouter(
    prefix="/api/user",
    tags=["user"]
)

@router.get("/profile", response_model=schemas.User)
def get_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.User)
def update_profile(
    user_update: schemas.UserUpdate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
