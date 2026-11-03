import random
from datetime import date, timedelta

from fastapi import APIRouter

from api.models import WeatherForecast

router = APIRouter(prefix="/weatherforecast")

SUMMARIES = [
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
]


@router.get("", name="GetWeatherForecast")
def get() -> list[WeatherForecast]:
    return [
        WeatherForecast(
            date=date.today() + timedelta(days=index),
            temperatureC=random.randint(-20, 54),
            summary=random.choice(SUMMARIES),
        )
        for index in range(1, 6)
    ]
