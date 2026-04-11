from sqlalchemy import Column, Integer, String, Float, Boolean, Text, JSON, ForeignKey, DateTime, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    weight_kg = Column(Float)
    height_cm = Column(Float)
    fitness_goal = Column(Text)
    biometric_source = Column(String) # For 'garmin', 'whoop', etc.
    sync_active = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    workout_plans = relationship("WorkoutPlan", back_populates="user")
    nutrition_plans = relationship("NutritionPlan", back_populates="user")
    progress_logs = relationship("ProgressLog", back_populates="user")

class WorkoutPlan(Base):
    __tablename__ = "workout_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_json = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="workout_plans")

class NutritionPlan(Base):
    __tablename__ = "nutrition_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    daily_calories = Column(Integer)
    protein_g = Column(Integer)
    carbs_g = Column(Integer)
    fats_g = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="nutrition_plans")

class ProgressLog(Base):
    __tablename__ = "progress_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    log_date = Column(Date, server_default=func.current_date())
    weight_kg = Column(Float)
    workout_completed = Column(Boolean, default=False)
    calories_consumed = Column(Integer)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="progress_logs")
