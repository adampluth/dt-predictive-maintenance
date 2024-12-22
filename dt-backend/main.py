from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items_router, health_router, db_router, stream_router
from app.utils.database import Base, engine

# Initialize FastAPI app
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items_router)
app.include_router(db_router)
app.include_router(stream_router)
app.include_router(health_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Digital Twin Backend!"}
