from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Item
from app.schemas import ItemResponse  # Ensure this exists in your schemas file
from app.dependencies import get_db

router = APIRouter()

# Get all items with optional pagination
@router.get("/", response_model=list[ItemResponse])
def get_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    items = db.query(Item).offset(skip).limit(limit).all()
    if not items:
        raise HTTPException(status_code=404, detail="No items found")
    return items

# Get a single item by ID
@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
