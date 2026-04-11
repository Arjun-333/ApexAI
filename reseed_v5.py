from backend.database import SessionLocal, engine, Base
from backend import models, auth
from datetime import date, datetime

def reseed():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Create User
    hashed_password = auth.get_password_hash("password")
    user = models.User(
        email="arjun@example.com",
        hashed_password=hashed_password,
        full_name="Arjun",
        age=28,
        gender="Male",
        weight_kg=78.5,
        height_cm=182.0,
        fitness_goal="Muscle gain and neural optimization",
        biometric_source=None,
        sync_active=False
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    print(f"User {user.email} created with ID {user.id}")
    db.close()

if __name__ == "__main__":
    reseed()
