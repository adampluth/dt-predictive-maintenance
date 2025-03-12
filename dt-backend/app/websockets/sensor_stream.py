from fastapi import WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from random import uniform, choice
from time import sleep
import asyncio
import threading
from app.utils.database import SessionLocal
from app.models import Session as SessionModel

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# Stop signal for controlling sensor streaming
stop_signal = threading.Event()

def mock_sensor_data():
    """
    Generates and broadcasts mock sensor data every second.
    Stops when stop_signal is set or if no session is active.
    """
    db = SessionLocal()
    
    while not stop_signal.is_set():
        db.expire_all()  # Refreshes session data to avoid cache issues
        active_session = db.query(SessionModel).filter(SessionModel.status == "active").first()
        
        if not active_session:
            print("⏸ No active session. Sleeping...")
            sleep(1)
            continue  # Skip generating data if no active session exists

        data = {
            "id": choice(range(1, 11)),
            "product_id": f"M{choice(range(10000, 99999))}",
            "type": choice(["M", "L"]),
            "air_temperature": round(uniform(298, 310), 2),
            "process_temperature": round(uniform(305, 315), 2),
            "rotational_speed": choice(range(1400, 1600)),
            "torque": round(uniform(30, 50), 2),
            "tool_wear": choice(range(0, 100)),
            "machine_failure": choice([True, False]),
        }
        asyncio.run(manager.broadcast(data))
        sleep(1)

    print("Stopped sensor data stream")  # Log when the thread stops

async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keeps the connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)
