from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.models import CyberEvent
from app.schemas import CyberEventCreate, CyberEventResponse

router = APIRouter(prefix="/cyber-events", tags=["Cyber Events"])

# Get all cyber events
@router.get("/", response_model=list[CyberEventResponse])
def get_cyber_events(db: Session = Depends(get_db)):
    return db.query(CyberEvent).all()

# Create a new cyber event
@router.post("/", response_model=CyberEventResponse)
def create_cyber_event(event: CyberEventCreate, db: Session = Depends(get_db)):
    new_event = CyberEvent(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event
