from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas, auth as auth_utils
from ai.recommender import generate_workout_plan

router = APIRouter(
    prefix="/api/workout",
    tags=["workout"]
)

@router.get("/plan", response_model=schemas.WorkoutPlan)
def get_personal_plan(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_utils.get_current_user)
):
    # Check if user already has a plan
    plan = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.user_id == current_user.id).order_by(models.WorkoutPlan.created_at.desc()).first()
    
    if not plan:
        # Generate new plan using AI
        user_profile = {
            "age": current_user.age,
            "gender": current_user.gender,
            "weight_kg": current_user.weight_kg,
            "height_cm": current_user.height_cm,
            "fitness_goal": current_user.fitness_goal
        }
        
        try:
            ai_plan = generate_workout_plan(user_profile)
            new_plan = models.WorkoutPlan(
                user_id=current_user.id,
                plan_json=ai_plan
            )
            db.add(new_plan)
            db.commit()
            db.refresh(new_plan)
            return new_plan
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to generate plan: {str(e)}")
            
    return plan

@router.post("/log")
def log_session(
    log: schemas.ProgressLogCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_utils.get_current_user)
):
    new_log = models.ProgressLog(
        user_id=current_user.id,
        **log.dict()
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log
