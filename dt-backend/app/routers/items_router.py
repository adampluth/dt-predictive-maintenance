from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Item
from app.schemas import ItemResponse
from app.dependencies import get_db

router = APIRouter(
    prefix="/items",
    tags=["Items"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/", response_model=list[ItemResponse])
def get_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieves a paginated list of items.
    """
    items = db.query(Item).offset(skip).limit(limit).all()
    if not items:
        raise HTTPException(status_code=404, detail="No items found")
    return items

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a single item by its ID.
    """
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail=f"Item with ID {item_id} not found.")
    return item
