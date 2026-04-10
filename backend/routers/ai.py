from fastapi import APIRouter, Depends, Body
from typing import List, Dict, Any
import sys
import os

from .. import auth as auth_utils, models
from ai.recommender import get_ai_chat_response

router = APIRouter(
    prefix="/api/ai",
    tags=["ai"]
)

@router.post("/chat")
def chat_with_ai(
    query: str = Body(..., embed=True),
    history: List[Dict[str, str]] = Body([], embed=True),
    current_user: models.User = Depends(auth_utils.get_current_user)
):
    response = get_ai_chat_response(query, history)
    return {"response": response}
