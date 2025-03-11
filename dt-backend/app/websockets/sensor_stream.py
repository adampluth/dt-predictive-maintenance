from fastapi import WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from app.utils.database import SessionLocal  # Import database session
from app.models import Item, Session as SessionModel
from random import uniform, choice
from time import sleep
import asyncio

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

def mock_sensor_data():
    db = SessionLocal()  # Start a new database session

    # Create a new session for this data stream
    session = SessionModel(status="active")
    db.add(session)
    db.commit()
    session_id = session.id

    while True:
        data = {
            "session_id": session_id,
            "product_id": f"M{choice(range(10000, 99999))}",
            "type": choice(["M", "L"]),
            "air_temperature": round(uniform(298, 310), 2),
            "process_temperature": round(uniform(305, 315), 2),
            "rotational_speed": choice(range(1400, 1600)),
            "torque": round(uniform(30, 50), 2),
            "tool_wear": choice(range(0, 100)),
            "machine_failure": choice([True, False]),
        }

        # Save to database
        sensor_entry = Item(**data)
        db.add(sensor_entry)
        db.commit()

        # Broadcast to WebSocket clients
        asyncio.run(manager.broadcast(data))

        sleep(1)

async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keep the WebSocket connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)
