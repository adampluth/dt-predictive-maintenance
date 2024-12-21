from pydantic import BaseModel, Field

# Base schema shared by create and response
class ItemBase(BaseModel):
    product_id: str = Field(..., example="12345")
    type: str | None = Field(None, example="Type A")
    air_temperature: float | None = Field(None, example=20.5)
    process_temperature: float | None = Field(None, example=25.0)
    rotational_speed: int | None = Field(None, example=1500)
    torque: float | None = Field(None, example=50.0)
    tool_wear: int | None = Field(None, example=300)
    machine_failure: bool | None = Field(None, example=False)
    twf: bool | None = Field(None, example=False)
    hdf: bool | None = Field(None, example=False)
    pwf: bool | None = Field(None, example=False)
    osf: bool | None = Field(None, example=False)
    rnf: bool | None = Field(None, example=False)

# Schema for creating items
class ItemCreate(ItemBase):
    pass

# Schema for response
class ItemResponse(ItemBase):
    id: int = Field(..., example=1)

    class Config:
        orm_mode = True
