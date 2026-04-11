from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas, auth as auth_utils
from ai.recommender import generate_nutrition_plan

router = APIRouter(
    prefix="/api/nutrition",
    tags=["nutrition"]
)

@router.get("/plan", response_model=schemas.NutritionPlan)
def get_nutrition_target(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_utils.get_current_user)
):
    plan = db.query(models.NutritionPlan).filter(models.NutritionPlan.user_id == current_user.id).order_by(models.NutritionPlan.created_at.desc()).first()
    
    if not plan:
        user_profile = {
            "age": current_user.age,
            "gender": current_user.gender,
            "weight_kg": current_user.weight_kg,
            "height_cm": current_user.height_cm,
            "fitness_goal": current_user.fitness_goal
        }
        
        try:
            ai_data = generate_nutrition_plan(user_profile)
            new_plan = models.NutritionPlan(
                user_id=current_user.id,
                daily_calories=ai_data["daily_calories"],
                protein_g=ai_data["protein_g"],
                carbs_g=ai_data["carbs_g"],
                fats_g=ai_data["fats_g"]
            )
            db.add(new_plan)
            db.commit()
            db.refresh(new_plan)
            return new_plan
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to generate nutrition plan: {str(e)}")
            
    return plan
