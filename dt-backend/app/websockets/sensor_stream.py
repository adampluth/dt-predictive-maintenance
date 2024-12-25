from fastapi import WebSocket, WebSocketDisconnect
from random import uniform, choice
from time import sleep
from threading import Thread
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
    while True:
        data = {
            "id": choice(range(1, 11)),  # Mock item IDs
            "product_id": f"M{choice(range(10000, 99999))}",
            "type": choice(["M", "L"]),
            "air_temperature": round(uniform(298, 310), 2),
            "process_temperature": round(uniform(305, 315), 2),
            "rotational_speed": choice(range(1400, 1600)),
            "torque": round(uniform(30, 50), 2),
            "tool_wear": choice(range(0, 100)),
            "machine_failure": choice([True, False]),
        }
        asyncio.run(manager.broadcast(data))  # Broadcast data to WebSocket clients
        sleep(1)

async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keep the WebSocket connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)
