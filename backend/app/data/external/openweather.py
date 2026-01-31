import httpx
from app.config import OPENWEATHER_API_KEY

BASE_URL = "https://api.openweathermap.org/data/2.5"

async def fetch_current_air_pollution(lat: float, lng: float):
    url = f"{BASE_URL}/air_pollution"
    params = {
        "lat": lat,
        "lon": lng,
        "appid": OPENWEATHER_API_KEY
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()
