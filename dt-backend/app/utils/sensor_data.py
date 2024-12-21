from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models import Item
from app.schemas import ItemCreate
import csv

router = APIRouter()

# Stream sensor data endpoint
@router.post("/stream")
def stream_sensor_data(sensor_data: ItemCreate, db: Session = Depends(get_db)):
    # Insert the sensor data into the database
    item = Item(**sensor_data.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"status": "success", "data": item}


# Import sensor data from CSV
@router.post("/import")
def import_sensor_data(file: UploadFile, db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file format. Only CSV files are allowed.")

    try:
        contents = file.file.read().decode("utf-8")
        reader = csv.DictReader(contents.splitlines())
        for row in reader:
            # Ensure all required fields are present in each row
            item = Item(
                product_id=row["product_id"],
                type=row["type"],
                air_temperature=float(row["air_temperature"]),
                process_temperature=float(row["process_temperature"]),
                rotational_speed=int(row["rotational_speed"]),
                torque=float(row["torque"]),
                tool_wear=int(row["tool_wear"]),
                machine_failure=bool(row["machine_failure"]),
                twf=bool(row["twf"]),
                hdf=bool(row["hdf"]),
                pwf=bool(row["pwf"]),
                osf=bool(row["osf"]),
                rnf=bool(row["rnf"]),
            )
            db.add(item)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        file.file.close()

    return {"status": "success", "message": "File imported successfully."}
