from fastapi import FastAPI
from app.routers import items_router, health_router
from app.utils.database import Base, engine

# Initialize FastAPI app
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(items_router, prefix="/api/items", tags=["items"])
app.include_router(health_router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI with PostgreSQL via Docker!"}
