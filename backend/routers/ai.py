from fastapi import APIRouter, Depends, Body
from typing import List, Dict, Any
import sys
import os

# Add parent directory to path to allow relative imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import auth, models
from ai.recommender import get_ai_chat_response

router = APIRouter(
    prefix="/api/ai",
    tags=["ai"]
)

@router.post("/chat")
def chat_with_ai(
    query: str = Body(..., embed=True),
    history: List[Dict[str, str]] = Body([], embed=True),
    current_user: models.User = Depends(auth.get_current_user)
):
    response = get_ai_chat_response(query, history)
    return {"response": response}
