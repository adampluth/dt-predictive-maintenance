from app.utils.database import SessionLocal
from sqlalchemy.orm import Session

# Dependency to get a database session
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
