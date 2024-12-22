from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import as_declarative

@as_declarative()
class Base:
    pass

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
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

    def to_dict(self):
        """
        Converts the model instance to a dictionary.
        """
        return {
            "id": self.id,
            "product_id": self.product_id,
            "type": self.type,
            "air_temperature": self.air_temperature,
            "process_temperature": self.process_temperature,
            "rotational_speed": self.rotational_speed,
            "torque": self.torque,
            "tool_wear": self.tool_wear,
            "machine_failure": self.machine_failure,
            "twf": self.twf,
            "hdf": self.hdf,
            "pwf": self.pwf,
            "osf": self.osf,
            "rnf": self.rnf,
        }
