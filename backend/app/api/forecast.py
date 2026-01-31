from fastapi import APIRouter

router = APIRouter()

@router.get("/short-term")
def get_forecast(lat: float, lng: float):
    return {
        "forecast": [
            { "hour": "+1h", "aqi": 75, "risk": "Moderate" },
            { "hour": "+2h", "aqi": 80, "risk": "Moderate" },
            { "hour": "+3h", "aqi": 88, "risk": "Unhealthy for Sensitive" },
            { "hour": "+4h", "aqi": 92, "risk": "Unhealthy for Sensitive" },
            { "hour": "+5h", "aqi": 85, "risk": "Moderate" },
            { "hour": "+6h", "aqi": 78, "risk": "Moderate" }
        ]
    }
