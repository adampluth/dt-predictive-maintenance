from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.utils.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, comment="Primary key ID")
    product_id = Column(String(50), index=True, unique=True, comment="Unique product identifier")
    type = Column(String(20), nullable=False, comment="Type of the product")
    air_temperature = Column(Float, comment="Air temperature during operation")
    process_temperature = Column(Float, comment="Process temperature during operation")
    rotational_speed = Column(Integer, comment="Rotational speed in RPM")
    torque = Column(Float, comment="Torque applied in Nm")
    tool_wear = Column(Integer, comment="Tool wear in minutes")
    machine_failure = Column(Boolean, default=False, comment="Indicates machine failure")
    twf = Column(Boolean, default=False, comment="Tool wear failure")
    hdf = Column(Boolean, default=False, comment="Heat dissipation failure")
    pwf = Column(Boolean, default=False, comment="Power failure")
    osf = Column(Boolean, default=False, comment="Overstrain failure")
    rnf = Column(Boolean, default=False, comment="Random failure")
