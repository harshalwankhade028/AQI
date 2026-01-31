from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PersonaRequest(BaseModel):
    aqi: int
    persona: str
    ageGroup: str
    healthSensitive: bool

@router.post("/advice")
def get_persona_advice(data: PersonaRequest):
    return {
        "risk_level": "Medium",
        "recommendations": [
            "Limit outdoor activities",
            "Wear a mask",
            "Avoid peak pollution hours"
        ]
    }
