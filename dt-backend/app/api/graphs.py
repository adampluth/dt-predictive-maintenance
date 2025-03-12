from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

# Define the Graph Config Schema
class GraphConfig(BaseModel):
    id: str
    title: str
    type: str  # e.g., "scatter", "line", "bar"
    x_data: List[float]
    y_data: List[float]
    layout: Dict  # Custom Plotly layout options

# In-memory storage for graph configurations (temporary, replace with DB later)
graph_store = [
    GraphConfig(
        id="temp_trend",
        title="Temperature Over Time",
        type="line",
        x_data=[1, 2, 3, 4, 5],
        y_data=[100, 102, 104, 103, 105],
        layout={"xaxis": {"title": "Time"}, "yaxis": {"title": "Temperature"}}
    )
]

@router.get("/graphs", response_model=List[GraphConfig])
def get_graphs():
    """Fetch all available graph configurations."""
    return graph_store

@router.post("/graphs", response_model=GraphConfig)
def add_graph(graph: GraphConfig):
    """Add a new graph dynamically."""
    for g in graph_store:
        if g.id == graph.id:
            raise HTTPException(status_code=400, detail="Graph ID already exists.")
    graph_store.append(graph)
    return graph
