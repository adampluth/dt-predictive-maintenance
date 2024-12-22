from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.utils.sensor_data import stream_sensor_data
from app.dependencies import get_db

router = APIRouter(
    prefix="/stream",
    tags=["Stream"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/")
async def stream_data(db: Session = Depends(get_db)):
    """
    Streams sensor data from the database.
    
    Returns:
        StreamingResponse: Sensor data in Server-Sent Events (SSE) format.
    """
    try:
        # Call the generator function, not the function itself
        generator = stream_sensor_data(db)
        return StreamingResponse(generator, media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Streaming failed: {e}")
