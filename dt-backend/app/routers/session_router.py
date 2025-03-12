import logging
import threading
from threading import Thread
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.database import get_db, SessionLocal
from app.models import Session as SessionModel
from app.websockets.sensor_stream import mock_sensor_data, stop_signal

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)

logging.basicConfig(level=logging.INFO)

# Track the running sensor thread
sensor_thread = None

# Function to start the sensor thread
def start_sensor_thread():
    global sensor_thread
    logging.info("Starting sensor data thread...")

    stop_signal.clear()  # Allow streaming again
    sensor_thread = Thread(target=mock_sensor_data, daemon=True)
    sensor_thread.start()
    logging.info("Sensor data thread started.")

@router.post("/start")
def start_session(db: Session = Depends(get_db)):
    """
    Creates a new active session.
    If a session already exists, it does nothing.
    """
    global stop_signal
    # Ensure streaming can start
    stop_signal.clear() 

    existing_session = db.query(SessionModel).filter(SessionModel.status == "active").first()
    
    if existing_session:
        logging.info(f"Session already active: {existing_session.id}")
        return {"message": "Session already active", "session_id": existing_session.id}

    new_session = SessionModel(status="active")
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    logging.info(f"New session created: {new_session.id}")

    # Start sensor streaming
    start_sensor_thread()

    return {"message": "Session started", "session_id": new_session.id}

@router.post("/end/{session_id}")
def end_session(session_id: int, db: Session = Depends(get_db)):
    """
    Ends an active session by setting its status to 'inactive' and stopping the mock sensor data stream.
    """
    global stop_signal
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()

    if not session:
        return {"message": "Session not found"}

    session.status = "inactive"
    db.commit()

    # Stop the sensor data thread
    stop_signal.set()
    
    logging.info(f"Session {session_id} ended. Sensor stream stopped.")

    return {"message": "Session ended"}
