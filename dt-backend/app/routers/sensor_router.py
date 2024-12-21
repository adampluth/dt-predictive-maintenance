from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from app.utils.sensor_data import import_sensor_data, stream_sensor_data
import io

router = APIRouter()

@router.post("/import")
async def import_data(file: UploadFile):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV is allowed.")
    
    # Read the file content
    content = await file.read()
    csv_data = io.StringIO(content.decode("utf-8"))
    
    # Import the data
    try:
        import_sensor_data(csv_data)
        return {"message": "Data imported successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stream")
async def stream_data():
    try:
        return StreamingResponse(stream_sensor_data(), media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
