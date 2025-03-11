from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items_router, health_router, db_router, stream_router, session_router
from app.utils.database import Base, engine

from app.websockets.sensor_stream import websocket_endpoint, mock_sensor_data
from threading import Thread

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

@app.get("/")
def read_root():
    return {"message": "Welcome to the Digital Twin Backend!"}

@app.on_event("startup")
def start_mock_stream():
    thread = Thread(target=mock_sensor_data, daemon=True)
    thread.start()

@app.websocket("/ws/sensor-stream/")
async def sensor_stream(websocket: WebSocket):
    await websocket_endpoint(websocket)
