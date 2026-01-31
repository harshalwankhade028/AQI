from pydantic import BaseModel
from typing import Optional

class Location(BaseModel):
    lat: float
    lng: float
    name: Optional[str] = None
