from fastapi import APIRouter

router = APIRouter()

@router.get("/trends")
def get_trends(days: int = 7):
    return {
        "history": [
            { "date": "2026-01-26", "avg_aqi": 65 },
            { "date": "2026-01-27", "avg_aqi": 70 },
            { "date": "2026-01-28", "avg_aqi": 78 },
            { "date": "2026-01-29", "avg_aqi": 82 },
            { "date": "2026-01-30", "avg_aqi": 75 }
        ]
    }
