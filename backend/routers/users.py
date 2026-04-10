from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import sys
import os

from ..database import get_db
from .. import models, schemas, auth as auth_utils

router = APIRouter(
    prefix="/api/user",
    tags=["user"]
)

@router.get("/profile", response_model=schemas.User)
def get_profile(current_user: models.User = Depends(auth_utils.get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.User)
def update_profile(
    user_update: schemas.UserUpdate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_utils.get_current_user)
):
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
