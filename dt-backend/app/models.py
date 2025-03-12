from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.utils.database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(TIMESTAMP, default=func.now())
    end_time = Column(TIMESTAMP, nullable=True)
    status = Column(String, default="active")  # active, completed, etc.

    # Relationships
    sensor_data = relationship("Item", back_populates="session", cascade="all, delete-orphan")
    cyber_events = relationship("CyberEvent", back_populates="session", cascade="all, delete-orphan")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)  # Unique ID
    session_id = Column(Integer, ForeignKey("sessions.id", ondelete="CASCADE"), nullable=True)
    product_id = Column(String, index=True) 
    type = Column(String)
    air_temperature = Column(Integer)
    process_temperature = Column(Integer)
    rotational_speed = Column(Integer)
    torque = Column(Integer)
    tool_wear = Column(Integer)
    machine_failure = Column(Integer)

    session = relationship("Session", back_populates="sensor_data")

class CyberEvent(Base):
    __tablename__ = "cyber_events"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id", ondelete="CASCADE"), nullable=True)
    attack_type = Column(String)  # Ex: "Denial-of-Service", "Unauthorized Control"
    description = Column(String)  # Ex: "CNC spindle RPM exceeded safe limits"
    timestamp = Column(TIMESTAMP, default=func.now())

    session = relationship("Session", back_populates="cyber_events")
