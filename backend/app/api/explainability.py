from fastapi import APIRouter

router = APIRouter()

@router.get("/aqi")
def explain_aqi(aqi: int):
    return {
        "factors": [
            {
                "title": "Traffic Emissions",
                "impact": "High",
                "description": "Rush-hour traffic increased NO2 levels"
            },
            {
                "title": "Weather Conditions",
                "impact": "Medium",
                "description": "Low wind speed trapped pollutants"
            },
            {
                "title": "Industrial Activity",
                "impact": "Low",
                "description": "Minimal industrial contribution"
            }
        ]
    }
