from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime, date

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    weight_kg: Optional[float] = None
    height_cm: Optional[float] = None
    fitness_goal: Optional[str] = None

class User(UserBase):
    id: int
    age: Optional[int] = None
    gender: Optional[str] = None
    weight_kg: Optional[float] = None
    height_cm: Optional[float] = None
    fitness_goal: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Workout Plan Schemas
class WorkoutPlanBase(BaseModel):
    plan_json: Any

class WorkoutPlan(WorkoutPlanBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Nutrition Plan Schemas
class NutritionPlanBase(BaseModel):
    daily_calories: int
    protein_g: int
    carbs_g: int
    fats_g: int

class NutritionPlan(NutritionPlanBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Progress Log Schemas
class ProgressLogBase(BaseModel):
    log_date: Optional[date] = None
    weight_kg: Optional[float] = None
    workout_completed: Optional[bool] = False
    calories_consumed: Optional[int] = None
    notes: Optional[str] = None

class ProgressLogCreate(ProgressLogBase):
    pass

class ProgressLog(ProgressLogBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
