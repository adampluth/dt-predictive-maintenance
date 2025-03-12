from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items_router, health_router, db_router, stream_router, session_router, cyber_events
from app.utils.database import Base, engine, SessionLocal
from app.websockets.sensor_stream import websocket_endpoint, mock_sensor_data, stop_signal
import threading
from threading import Thread
from app.models import Session as SessionModel

# Initialize FastAPI app
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items_router)
app.include_router(db_router)
app.include_router(stream_router)
app.include_router(health_router)
app.include_router(session_router.router)
app.include_router(cyber_events.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Digital Twin Backend!"}

# Ensure all sessions are set to inactive on startup
@app.on_event("startup")
def reset_sessions():
    db = SessionLocal()
    db.query(SessionModel).filter(SessionModel.status == "active").update({"status": "inactive"})
    db.commit()
    db.close()
    stop_signal.set()  # Ensure sensor thread is stopped
    print("All active sessions marked as inactive. Sensor streaming prevented until explicitly started.")

@app.websocket("/ws/sensor-stream/")
async def sensor_stream(websocket: WebSocket):
    await websocket_endpoint(websocket)
