from fastapi import APIRouter
from app.data.external.openweather import fetch_current_air_pollution

router = APIRouter()

@router.get("/current")
async def get_current_aqi(lat: float, lng: float):
    raw_data = await fetch_current_air_pollution(lat, lng)

    # TEMP: return raw data directly
    # Later: normalize + ML logic
    return raw_data
