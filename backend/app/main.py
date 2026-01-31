from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import (
    aqi,
    forecast,
    map,
    explainability,
    persona,
    analytics
)

app = FastAPI(
    title="AI Air Quality Intelligence API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aqi.router, prefix="/api/v1/aqi")
app.include_router(forecast.router, prefix="/api/v1/forecast")
app.include_router(map.router, prefix="/api/v1/map")
app.include_router(explainability.router, prefix="/api/v1/explain")
app.include_router(persona.router, prefix="/api/v1/persona")
app.include_router(analytics.router, prefix="/api/v1/analytics")
