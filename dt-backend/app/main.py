from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi import FastAPI, Depends

# Load environment variables
load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# SQLAlchemy Engine, Session, and Base
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Example SQLAlchemy Model
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

# Create Tables
Base.metadata.create_all(bind=engine)

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize FastAPI app
app = FastAPI()

# API Endpoints
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI with PostgreSQL via Docker!"}

@app.get("/items/")
def get_items(db: Session = Depends(get_db)):
    # Example function to fetch items from the database
    items = db.query(Item).all()
    return items

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    return {"message": "Database connection successful"}
