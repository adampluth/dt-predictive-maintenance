from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.utils.database import get_db
from app.models import Session as SessionModel

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)

@router.post("/start")
def start_session(db: Session = Depends(get_db)):
    new_session = SessionModel(status="active")
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return {"session_id": new_session.id, "status": "active"}

@router.post("/end/{session_id}")
def end_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if session:
        session.status = "completed"
        session.end_time = func.now()
        db.commit()
        return {"message": "Session ended"}
    return {"error": "Session not found"}

@router.get("/")
def get_sessions(db: Session = Depends(get_db)):
    return db.query(SessionModel).all()
