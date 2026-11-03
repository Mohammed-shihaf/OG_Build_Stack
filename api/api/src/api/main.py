from fastapi import FastAPI

from api.controllers import weather_forecast

app = FastAPI()
app.include_router(weather_forecast.router)
