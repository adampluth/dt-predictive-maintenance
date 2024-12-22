from sqlalchemy.orm import Session
from app.models import Item
import csv

def import_sensor_data(file_content: str, db: Session, truncate: bool = False):
    """
    Imports sensor data from a CSV file into the database.
    
    Args:
        file_content (str): The content of the CSV file as a string.
        db (Session): SQLAlchemy database session.
        truncate (bool): If True, truncates the `items` table before import.
    """
    if truncate:
        db.query(Item).delete()
        db.commit()

    try:
        # Read the CSV content
        csv_reader = csv.DictReader(file_content.splitlines())

        for row in csv_reader:
            # Create or update an item object from the row
            item = Item(
                product_id=row["Product ID"],
                type=row["Type"],
                air_temperature=float(row["Air temperature [K]"]),
                process_temperature=float(row["Process temperature [K]"]),
                rotational_speed=int(row["Rotational speed [rpm]"]),
                torque=float(row["Torque [Nm]"]),
                tool_wear=int(row["Tool wear [min]"]),
                machine_failure=bool(int(row["Machine failure"])),
                twf=bool(int(row["TWF"])),
                hdf=bool(int(row["HDF"])),
                pwf=bool(int(row["PWF"])),
                osf=bool(int(row["OSF"])),
                rnf=bool(int(row["RNF"])),
            )
            db.merge(item)

        db.commit()

    except Exception as e:
        db.rollback()
        raise Exception(f"Failed to import CSV data: {e}")


def stream_sensor_data(db: Session, batch_size: int = 100):
    """
    Streams sensor data from the database in batches.

    Args:
        db (Session): SQLAlchemy database session.
        batch_size (int): The number of rows to stream at a time.

    Returns:
        generator: A generator yielding database rows in Server-Sent Events (SSE) format.
    """
    def data_generator():
        offset = 0
        while True:
            items = db.query(Item).offset(offset).limit(batch_size).all()
            if not items:
                break  # Stop streaming when there are no more rows
            for item in items:
                yield f"data: {item.to_dict()}\n\n"  # SSE format
            offset += batch_size

    return data_generator()
