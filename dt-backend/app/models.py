from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.utils.database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(TIMESTAMP, default=func.now())
    end_time = Column(TIMESTAMP, nullable=True)
    status = Column(String, default="active")  # active, completed, etc.

    # Relationship to sensor data
    sensor_data = relationship("Item", back_populates="session", cascade="all, delete-orphan")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id", ondelete="CASCADE"), nullable=True)
    product_id = Column(String, index=True)
    type = Column(String)
    air_temperature = Column(Float)
    process_temperature = Column(Float)
    rotational_speed = Column(Integer)
    torque = Column(Float)
    tool_wear = Column(Integer)
    machine_failure = Column(Boolean)
    twf = Column(Boolean)
    hdf = Column(Boolean)
    pwf = Column(Boolean)
    osf = Column(Boolean)
    rnf = Column(Boolean)

    # Define relationship back to Session
    session = relationship("Session", back_populates="sensor_data")
