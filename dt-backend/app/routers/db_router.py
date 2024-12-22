from fastapi import APIRouter, UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from app.utils.sensor_data import import_sensor_data
from app.models import Item
from app.dependencies import get_db

router = APIRouter(
    prefix="/db",
    tags=["Database Operations"],
    responses={404: {"description": "Not Found"}}
)

@router.post("/import")
async def import_data(file: UploadFile, db: Session = Depends(get_db)):
    """
    Imports sensor data from a CSV file into the database.
    """
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV is allowed.")
    try:
        content = await file.read()
        decoded_content = content.decode("utf-8")
        import_sensor_data(decoded_content, db)
        return {"message": "Data imported successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/clear")
async def clear_table(db: Session = Depends(get_db)):
    """
    Clears all data from the items table.
    """
    try:
        if not db.query(Item).first():
            return {"message": "Table is already empty"}
        db.query(Item).delete()
        db.commit()
        return {"message": "Table cleared successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to clear table: {e}")
