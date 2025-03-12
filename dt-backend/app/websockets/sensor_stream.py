# from fastapi import WebSocket, WebSocketDisconnect
# from sqlalchemy.orm import Session
# from random import uniform, choice
# from time import sleep
# import asyncio
# import threading
# from app.utils.database import SessionLocal
# from app.models import Session as SessionModel

# class ConnectionManager:
#     def __init__(self):
#         self.active_connections: list[WebSocket] = []

#     async def connect(self, websocket: WebSocket):
#         await websocket.accept()
#         self.active_connections.append(websocket)

#     def disconnect(self, websocket: WebSocket):
#         self.active_connections.remove(websocket)

#     async def broadcast(self, message: dict):
#         for connection in self.active_connections:
#             await connection.send_json(message)

# manager = ConnectionManager()

# # Stop signal for controlling sensor streaming
# stop_signal = threading.Event()

# def mock_sensor_data():
#     """
#     Generates and broadcasts mock sensor data every second.
#     Stops when stop_signal is set or if no session is active.
#     """
#     db = SessionLocal()
    
#     while not stop_signal.is_set():
#         db.expire_all()  # Refreshes session data to avoid cache issues
#         active_session = db.query(SessionModel).filter(SessionModel.status == "active").first()
        
#         if not active_session:
#             print("⏸ No active session. Sleeping...")
#             sleep(1)
#             continue  # Skip generating data if no active session exists

#         data = {
#             "id": choice(range(1, 11)),
#             "product_id": f"M{choice(range(10000, 99999))}",
#             "type": choice(["M", "L"]),
#             "air_temperature": round(uniform(298, 310), 2),
#             "process_temperature": round(uniform(305, 315), 2),
#             "rotational_speed": choice(range(1400, 1600)),
#             "torque": round(uniform(30, 50), 2),
#             "tool_wear": choice(range(0, 100)),
#             "machine_failure": choice([True, False]),
#         }
#         asyncio.run(manager.broadcast(data))
#         sleep(1)

#     print("Stopped sensor data stream")  # Log when the thread stops

# async def websocket_endpoint(websocket: WebSocket):
#     await manager.connect(websocket)
#     try:
#         while True:
#             await websocket.receive_text()  # Keeps the connection alive
#     except WebSocketDisconnect:
#         manager.disconnect(websocket)

from fastapi import WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from random import uniform, choice, random
from time import sleep
import asyncio
import threading
import math
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

# Initialize variables dynamically each session
def initialize_machine():
    return {
        "air_temperature": uniform(298, 303),  # 25-30°C
        "process_temperature": uniform(305, 310),
        "rotational_speed": choice(range(1400, 1600)),
        "torque": uniform(30, 50),
        "tool_wear": choice(range(0, 30)),  # Randomized start for variety
        "machine_failure": False,
        "mode": choice(["normal", "high-load", "near-failure"]),
        "cycle_count": 0,  # Track operational cycles
    }

previous_values = initialize_machine()

def mock_sensor_data():
    """
    Generates and broadcasts refined mock sensor data with anomalies every second.
    Stops when stop_signal is set or if no session is active.
    """
    db = SessionLocal()
    time_factor = 0  # Used for cyclic variations

    while not stop_signal.is_set():
        db.expire_all()
        active_session = db.query(SessionModel).filter(SessionModel.status == "active").first()
        
        if not active_session:
            print("⏸ No active session. Sleeping...")
            sleep(1)
            continue  # Skip generating data if no active session exists

        global previous_values
        time_factor += 0.1  # Simulate gradual time progression
        previous_values["cycle_count"] += 1  # Increment cycle count

        # Introduce small fluctuations
        previous_values["air_temperature"] += uniform(-0.2, 0.2)
        previous_values["process_temperature"] += uniform(-0.3, 0.3)

        # Rotational speed follows cyclic pattern with occasional disturbances
        previous_values["rotational_speed"] = 1500 + int(100 * math.sin(time_factor))

        # Torque changes with operational mode
        if previous_values["mode"] == "high-load":
            previous_values["torque"] += uniform(-5, 5)
        else:
            previous_values["torque"] += uniform(-3, 3)

        # Tool wear generally increases
        previous_values["tool_wear"] = min(previous_values["tool_wear"] + choice([0, 1, 2]), 100)

        # Failure probability based on multiple factors
        failure_probability = (previous_values["tool_wear"] / 100) * 0.05
        if previous_values["mode"] == "near-failure":
            failure_probability += 0.05  # Higher failure rate
        previous_values["machine_failure"] = random() < failure_probability

        # Introduce anomalies randomly
        if previous_values["cycle_count"] % 50 == 0 and random() < 0.15:
            anomaly_type = choice(["torque_spike", "temp_surge", "speed_dip"])
            print(f"Injecting anomaly: {anomaly_type}")

            if anomaly_type == "torque_spike":
                previous_values["torque"] += 15  # Sudden jump in torque
            elif anomaly_type == "temp_surge":
                previous_values["process_temperature"] += 5  # Temperature spikes
            elif anomaly_type == "speed_dip":
                previous_values["rotational_speed"] -= 500  # Sharp drop in speed

        # Randomly change machine mode
        if random() < 0.02:  # 2% chance to switch modes
            previous_values["mode"] = choice(["normal", "high-load", "near-failure"])
            print(f"Machine mode changed to {previous_values['mode']}")

        # Construct the new data packet
        data = {
            "id": choice(range(1, 11)),
            "product_id": f"M{choice(range(10000, 99999))}",
            "type": choice(["M", "L"]),
            "air_temperature": round(previous_values["air_temperature"], 2),
            "process_temperature": round(previous_values["process_temperature"], 2),
            "rotational_speed": previous_values["rotational_speed"],
            "torque": round(previous_values["torque"], 2),
            "tool_wear": previous_values["tool_wear"],
            "machine_failure": previous_values["machine_failure"],
            "mode": previous_values["mode"],
            "cycle_count": previous_values["cycle_count"]
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
