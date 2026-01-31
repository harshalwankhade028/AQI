from fastapi import APIRouter

router = APIRouter()

@router.get("/aqi-grid")
def get_aqi_grid(bbox: str):
    return {
        "points": [
            { "lat": 40.71, "lng": -74.00, "aqi": 70 },
            { "lat": 40.72, "lng": -74.01, "aqi": 85 },
            { "lat": 40.73, "lng": -74.02, "aqi": 95 }
        ]
    }
