from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.database import SessionLocal, engine
from app.models import Item
from app.dependencies import get_db

router = APIRouter()

@router.get("/")
def get_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return items
