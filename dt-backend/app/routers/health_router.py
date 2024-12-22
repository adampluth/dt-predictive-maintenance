from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
    responses={404: {"description": "Not Found"}}
)

@router.get("/")
def health_check():
    """
    Health check endpoint to verify the service is up.
    """
    return {"status": "healthy"}
